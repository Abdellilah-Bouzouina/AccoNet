import { Professional, Client, Translation } from '../data/mockData';
import { algerianWilayas } from '../data/algerianWilayas';

// This matches exactly the columns in your Supabase "profiles" table.
export interface DbProfile {
  id: string;
  role: 'accountant' | 'business' | 'admin';
  full_name: string;
  phone: string | null;
  wilaya_id: number | null;
  specialty: string | null;
  accreditation_number: string | null;
  years_experience: number | null;
  company_name: string | null;
  rc_number: string | null;
  nif_number: string | null;
}

const wilayaTranslation = (wilayaId: number | null): Translation => {
  const found = algerianWilayas.find((w) => w.id === wilayaId);
  return found ? found.name : { ar: 'الجزائر', fr: 'Alger', en: 'Algiers' };
};

// Turns a raw Supabase "profiles" row (role = accountant) into the
// same "Professional" shape your Search/Profile pages already expect.
//
// NOTE: fields like bio, services, reviews, and history don't exist
// in the database yet — they default to empty for now. That's the
// next thing to wire up once you're ready (a proper "professionals"
// details table, or extra columns).
export const mapToProfessional = (row: DbProfile): Professional => ({
  id: row.id,
  name: { ar: row.full_name, fr: row.full_name, en: row.full_name },
  initials: (row.full_name || '??').substring(0, 2).toUpperCase(),
  avatarBg: 'bg-indigo-700 text-white',
  specialty: (row.specialty as Professional['specialty']) || 'certified-accountant',
  wilayaId: row.wilaya_id || 16,
  wilayaName: wilayaTranslation(row.wilaya_id),
  rating: 5.0,
  reviewCount: 0,
  hourlyRate: 3500,
  available: true,
  yearsExperience: row.years_experience || 0,
  accreditationNumber: row.accreditation_number || '',
  completionRate: 100,
  clientsServed: 0,
  bio: { ar: '', fr: '', en: '' },
  services: [],
  reviews: [],
  history: [],
  phone: row.phone || undefined,
});

// Same idea, but for a "business" account.
export const mapToClient = (row: DbProfile): Client => ({
  id: row.id,
  companyName: row.company_name || row.full_name,
  sector: { ar: '', fr: '', en: '' },
  wilayaId: row.wilaya_id || 16,
  wilayaName: wilayaTranslation(row.wilaya_id),
  logoInitials: (row.company_name || row.full_name || '??').substring(0, 2).toUpperCase(),
  avatarBg: 'bg-teal-700 text-white',
  NIF: row.nif_number || '',
  RC: row.rc_number || '',
  activeContracts: [],
  pendingTasks: [],
});
