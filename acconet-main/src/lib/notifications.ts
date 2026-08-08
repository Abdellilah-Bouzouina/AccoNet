import { supabase } from './supabaseClient';

export type NotificationType = 'contract_request' | 'contract_accepted' | 'contract_declined' | 'message';

// Matches the columns in your Supabase "notifications" table.
export interface DbNotification {
  id: string;
  user_id: string;
  type: NotificationType;
  actor_name: string;
  preview: string;
  link: string;
  read: boolean;
  created_at: string;
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  actorName: string;
  preview: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export const mapToNotification = (row: DbNotification): AppNotification => ({
  id: row.id,
  type: row.type,
  actorName: row.actor_name,
  preview: row.preview,
  link: row.link,
  read: row.read,
  createdAt: row.created_at,
});

export const markNotificationRead = async (id: string) => {
  return supabase.from('notifications').update({ read: true }).eq('id', id);
};

export const markAllNotificationsRead = async (userId: string) => {
  return supabase.from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false);
};
