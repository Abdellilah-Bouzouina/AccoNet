import { supabase } from './supabaseClient';

// Find-or-create: there's no RLS "update" policy on conversations (see the
// migration — last_message_at is only ever bumped by a trigger), so a plain
// upsert's ON CONFLICT DO UPDATE branch would be rejected by RLS. Instead,
// look for an existing row first, and only insert if none exists. The
// unique (professional_id, client_id) constraint still protects against a
// rare race between two near-simultaneous first messages — if the insert
// loses that race, fall back to re-selecting the row the other request created.
export const findOrCreateConversation = async (professionalId: string, clientId: string) => {
  const existing = await supabase
    .from('conversations')
    .select('*')
    .eq('professional_id', professionalId)
    .eq('client_id', clientId)
    .maybeSingle();

  if (existing.data) return existing;

  const inserted = await supabase
    .from('conversations')
    .insert({ professional_id: professionalId, client_id: clientId })
    .select()
    .single();

  if (inserted.error) {
    // Someone else created it in the meantime — fetch what they made.
    return supabase
      .from('conversations')
      .select('*')
      .eq('professional_id', professionalId)
      .eq('client_id', clientId)
      .single();
  }

  return inserted;
};

export const sendMessage = async (conversationId: string, senderId: string, body: string) => {
  return supabase
    .from('messages')
    .insert({ conversation_id: conversationId, sender_id: senderId, body })
    .select()
    .single();
};
