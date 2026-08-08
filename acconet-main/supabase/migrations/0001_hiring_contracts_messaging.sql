-- AccoNet: real hiring, contracts, tasks & messaging system.
-- Run this once in the Supabase SQL Editor. Not auto-applied — this repo
-- has no Supabase CLI wired up, so this file is a tracked record of the
-- schema, not a migration that runs itself.

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────
-- CONTRACTS
-- ─────────────────────────────────────────────────────────────
create table public.contracts (
  id                 uuid primary key default gen_random_uuid(),
  professional_id    uuid not null references public.profiles(id) on delete cascade,
  client_id          uuid not null references public.profiles(id) on delete cascade,
  title              text not null,
  scope_description  text not null default '',
  value              integer not null default 0,
  status             text not null default 'pending'
                       check (status in ('pending', 'active', 'completed', 'declined')),
  start_date         date,
  end_date           date,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index contracts_professional_id_idx on public.contracts (professional_id);
create index contracts_client_id_idx      on public.contracts (client_id);

alter table public.contracts enable row level security;

-- Both parties can see their own contracts.
create policy contracts_select on public.contracts
  for select
  using (auth.uid() = client_id or auth.uid() = professional_id);

-- Only the client can create a hire request, and it must start as 'pending'.
create policy contracts_insert on public.contracts
  for insert
  with check (auth.uid() = client_id and status = 'pending');

-- Broad USING so either party can attempt an update; the trigger below
-- enforces exactly which status transitions each role may perform.
-- (Deliberately NOT split into multiple permissive UPDATE policies —
-- Postgres OR-combines permissive policies' WITH CHECK clauses, which
-- would let a client's update accidentally qualify under a professional's
-- looser WITH CHECK. A single policy + a BEFORE UPDATE trigger avoids
-- that footgun and lets us reference the OLD row, which WITH CHECK can't.)
create policy contracts_update on public.contracts
  for update
  using (auth.uid() = client_id or auth.uid() = professional_id)
  with check (auth.uid() = client_id or auth.uid() = professional_id);

create or replace function public.enforce_contract_status_transition()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at := now();

  if new.status = old.status then
    return new; -- no status change, allow (e.g. future field edits)
  end if;

  if old.status = 'pending' and new.status = 'active' and auth.uid() = old.professional_id then
    new.start_date := coalesce(new.start_date, current_date);
    return new;
  end if;

  if old.status = 'pending' and new.status = 'declined' and auth.uid() = old.professional_id then
    return new;
  end if;

  if old.status = 'active' and new.status = 'completed'
     and auth.uid() in (old.client_id, old.professional_id) then
    new.end_date := coalesce(new.end_date, current_date);
    return new;
  end if;

  raise exception 'Illegal contract status transition: % -> % by %', old.status, new.status, auth.uid();
end;
$$;

create trigger contracts_status_transition
  before update on public.contracts
  for each row execute function public.enforce_contract_status_transition();

-- ─────────────────────────────────────────────────────────────
-- TASKS (child of a contract; no client_id/professional_id of its own)
-- ─────────────────────────────────────────────────────────────
create table public.tasks (
  id           uuid primary key default gen_random_uuid(),
  contract_id  uuid not null references public.contracts(id) on delete cascade,
  title        text not null,
  deadline     date,
  status       text not null default 'todo'
                 check (status in ('todo', 'in-progress', 'done')),
  type         text not null default 'bookkeeping'
                 check (type in ('tax-filing', 'audit', 'bookkeeping', 'advisory', 'declaration')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index tasks_contract_id_idx on public.tasks (contract_id);

alter table public.tasks enable row level security;

create policy tasks_select on public.tasks
  for select
  using (
    exists (
      select 1 from public.contracts c
      where c.id = tasks.contract_id
        and (c.client_id = auth.uid() or c.professional_id = auth.uid())
    )
  );

-- Either party may dispatch a task, but only on an active engagement.
create policy tasks_insert on public.tasks
  for insert
  with check (
    exists (
      select 1 from public.contracts c
      where c.id = tasks.contract_id
        and c.status = 'active'
        and (c.client_id = auth.uid() or c.professional_id = auth.uid())
    )
  );

create policy tasks_update on public.tasks
  for update
  using (
    exists (
      select 1 from public.contracts c
      where c.id = tasks.contract_id
        and (c.client_id = auth.uid() or c.professional_id = auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.contracts c
      where c.id = tasks.contract_id
        and (c.client_id = auth.uid() or c.professional_id = auth.uid())
    )
  );

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger tasks_set_updated_at
  before update on public.tasks
  for each row execute function public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- CONVERSATIONS + MESSAGES (realtime chat)
-- ─────────────────────────────────────────────────────────────
create table public.conversations (
  id               uuid primary key default gen_random_uuid(),
  professional_id  uuid not null references public.profiles(id) on delete cascade,
  client_id        uuid not null references public.profiles(id) on delete cascade,
  last_message_at  timestamptz not null default now(),
  created_at       timestamptz not null default now(),
  unique (professional_id, client_id)
);

create index conversations_professional_id_idx on public.conversations (professional_id);
create index conversations_client_id_idx      on public.conversations (client_id);

alter table public.conversations enable row level security;

create policy conversations_select on public.conversations
  for select
  using (auth.uid() = professional_id or auth.uid() = client_id);

create policy conversations_insert on public.conversations
  for insert
  with check (auth.uid() = professional_id or auth.uid() = client_id);

-- No UPDATE policy for regular users: last_message_at is bumped only by
-- the SECURITY DEFINER trigger below, never directly by a client request.

create table public.messages (
  id               uuid primary key default gen_random_uuid(),
  conversation_id  uuid not null references public.conversations(id) on delete cascade,
  sender_id        uuid not null references public.profiles(id) on delete cascade,
  body             text not null check (char_length(trim(body)) > 0),
  created_at       timestamptz not null default now()
);

create index messages_conversation_id_idx on public.messages (conversation_id, created_at);

alter table public.messages enable row level security;

create policy messages_select on public.messages
  for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.professional_id = auth.uid() or c.client_id = auth.uid())
    )
  );

create policy messages_insert on public.messages
  for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.professional_id = auth.uid() or c.client_id = auth.uid())
    )
  );

create or replace function public.touch_conversation_last_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.conversations
     set last_message_at = new.created_at
   where id = new.conversation_id;
  return new;
end;
$$;

create trigger messages_touch_conversation
  after insert on public.messages
  for each row execute function public.touch_conversation_last_message();

-- Enable Postgres realtime replication for messages (Supabase's
-- `supabase_realtime` publication drives postgres_changes subscriptions).
alter publication supabase_realtime add table public.messages;

-- ─────────────────────────────────────────────────────────────
-- GRANTS
-- ─────────────────────────────────────────────────────────────
-- RLS policies only decide which ROWS a query can touch — Postgres still
-- checks base table-level privileges first. Tables created through the SQL
-- Editor don't automatically inherit the grants Supabase gives tables made
-- via the dashboard's Table Editor, so without this every query here fails
-- with "permission denied for table X" before RLS is ever evaluated.
grant select, insert, update on public.contracts     to authenticated;
grant select, insert, update on public.tasks         to authenticated;
grant select, insert           on public.conversations to authenticated;
grant select, insert           on public.messages       to authenticated;
