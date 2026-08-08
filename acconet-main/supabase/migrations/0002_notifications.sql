-- AccoNet: real-time notifications for contract requests, contract
-- accept/decline, and new messages.
-- Run this once in the Supabase SQL Editor, after 0001. Not auto-applied —
-- same convention as 0001: a tracked record of the schema, not a migration
-- that runs itself.

-- ─────────────────────────────────────────────────────────────
-- NOTIFICATIONS
-- ─────────────────────────────────────────────────────────────
create table public.notifications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  type        text not null check (type in ('contract_request', 'contract_accepted', 'contract_declined', 'message')),
  actor_name  text not null default '',
  preview     text not null default '',
  link        text not null default '',
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

create index notifications_user_id_idx on public.notifications (user_id, created_at desc);

alter table public.notifications enable row level security;

create policy notifications_select on public.notifications
  for select
  using (user_id = auth.uid());

-- Only the "read" flag is meant to change client-side; there's no column-level
-- restriction here (matches the looseness of the tasks_update policy in 0001),
-- but the app itself only ever sends { read: true } updates.
create policy notifications_update on public.notifications
  for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- No insert policy/grant for authenticated: rows are only ever created by the
-- SECURITY DEFINER trigger functions below, running as the table owner —
-- same pattern as touch_conversation_last_message() in migration 0001.
grant select, update on public.notifications to authenticated;

alter publication supabase_realtime add table public.notifications;

-- ─────────────────────────────────────────────────────────────
-- TRIGGER: new contract (hire) request -> notify the professional
-- ─────────────────────────────────────────────────────────────
create or replace function public.notify_contract_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  client_name text;
begin
  select coalesce(company_name, full_name) into client_name
  from public.profiles
  where id = new.client_id;

  insert into public.notifications (user_id, type, actor_name, preview, link)
  values (new.professional_id, 'contract_request', coalesce(client_name, ''), new.title, '/dashboard/professional');

  return new;
end;
$$;

create trigger contracts_notify_request
  after insert on public.contracts
  for each row
  when (new.status = 'pending')
  execute function public.notify_contract_request();

-- ─────────────────────────────────────────────────────────────
-- TRIGGER: contract accepted/declined -> notify the client
-- ─────────────────────────────────────────────────────────────
create or replace function public.notify_contract_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  pro_name text;
  notif_type text;
begin
  select full_name into pro_name
  from public.profiles
  where id = new.professional_id;

  notif_type := case new.status
    when 'active' then 'contract_accepted'
    else 'contract_declined'
  end;

  insert into public.notifications (user_id, type, actor_name, preview, link)
  values (new.client_id, notif_type, coalesce(pro_name, ''), new.title, '/dashboard/client');

  return new;
end;
$$;

create trigger contracts_notify_status_change
  after update on public.contracts
  for each row
  when (new.status is distinct from old.status and new.status in ('active', 'declined'))
  execute function public.notify_contract_status_change();

-- ─────────────────────────────────────────────────────────────
-- TRIGGER: new message -> notify the other party in the conversation
-- ─────────────────────────────────────────────────────────────
create or replace function public.notify_new_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  conv record;
  recipient_id uuid;
  sender_name text;
begin
  select professional_id, client_id into conv
  from public.conversations
  where id = new.conversation_id;

  recipient_id := case
    when new.sender_id = conv.professional_id then conv.client_id
    else conv.professional_id
  end;

  select coalesce(company_name, full_name) into sender_name
  from public.profiles
  where id = new.sender_id;

  insert into public.notifications (user_id, type, actor_name, preview, link)
  values (recipient_id, 'message', coalesce(sender_name, ''), left(new.body, 80), '/messages?c=' || new.conversation_id);

  return new;
end;
$$;

create trigger messages_notify_recipient
  after insert on public.messages
  for each row
  execute function public.notify_new_message();
