import { Contract, Task, Professional } from '../data/mockData';
import { asTranslation, wilayaTranslation } from './profileMappers';

// Matches the columns in your Supabase "contracts" table, plus the
// embedded party info pulled in via the foreign-key select so dashboards
// never need a separate "all clients"/"all professionals" lookup list.
export interface DbContract {
  id: string;
  professional_id: string;
  client_id: string;
  title: string;
  scope_description: string;
  value: number;
  status: 'pending' | 'active' | 'completed' | 'declined';
  start_date: string | null;
  end_date: string | null;
  client?: {
    id: string;
    full_name: string;
    company_name: string | null;
    wilaya_id: number | null;
  } | null;
  professional?: {
    id: string;
    full_name: string;
    specialty: string | null;
    avatar_url: string | null;
  } | null;
}

// Matches the columns in your Supabase "tasks" table.
export interface DbTask {
  id: string;
  contract_id: string;
  title: string;
  deadline: string | null;
  status: 'todo' | 'in-progress' | 'done';
  type: 'tax-filing' | 'audit' | 'bookkeeping' | 'advisory' | 'declaration';
}

export const mapToContract = (row: DbContract): Contract => ({
  id: row.id,
  professionalId: row.professional_id,
  clientId: row.client_id,
  title: asTranslation(row.title),
  status: row.status,
  startDate: row.start_date,
  endDate: row.end_date,
  value: row.value,
  scopeDescription: asTranslation(row.scope_description),
  clientInfo: row.client
    ? {
        companyName: row.client.company_name || row.client.full_name,
        wilayaName: wilayaTranslation(row.client.wilaya_id),
      }
    : undefined,
  professionalInfo: row.professional
    ? {
        name: asTranslation(row.professional.full_name),
        specialty: (row.professional.specialty as Professional['specialty']) || 'certified-accountant',
        initials: (row.professional.full_name || '??').substring(0, 2).toUpperCase(),
        avatarUrl: row.professional.avatar_url || undefined,
      }
    : undefined,
});

export const mapToTask = (row: DbTask): Task => ({
  id: row.id,
  contractId: row.contract_id,
  title: asTranslation(row.title),
  deadline: row.deadline || '',
  status: row.status,
  type: row.type,
});
