import { Professional, Client, Translation, Service } from '../data/mockData';
import { algerianWilayas } from '../data/algerianWilayas';

// Matches the columns in your Supabase "profiles" table.
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
  bio?: string | null;
  hourly_rate?: number | null;
  available?: boolean | null;
  address?: string | null;
  avatar_url?: string | null;
  history?: DbHistoryEntry[] | null;
}

// One entry of a professional's editable experience/history timeline,
// stored as a jsonb array directly on the "profiles" row (no separate
// table — it rides along with the same select('*') used everywhere).
export interface DbHistoryEntry {
  year: string;
  title: string;
  description: string;
}

// Matches the columns in your Supabase "services" table.
export interface DbService {
  id: string;
  professional_id: string;
  title: string;
  description: string | null;
  price: string | null;
}

export const wilayaTranslation = (wilayaId: number | null): Translation => {
  const found = algerianWilayas.find((w) => w.id === wilayaId);
  return found ? found.name : { ar: 'الجزائر', fr: 'Alger', en: 'Algiers' };
};

// NOTE: bios and service descriptions are written once by the
// professional, in whichever language they typed them — not
// separately translated into Arabic/French/English. This just
// echoes that same text into all three "slots" so it still works
// with pages that expect a translated {ar, fr, en} object.
export const asTranslation = (text: string | null | undefined): Translation => {
  const value = text || '';
  return { ar: value, fr: value, en: value };
};

export const mapToProfessional = (row: DbProfile, services: DbService[] = []): Professional => ({
  id: row.id,
  name: { ar: row.full_name, fr: row.full_name, en: row.full_name },
  initials: (row.full_name || '??').substring(0, 2).toUpperCase(),
  avatarBg: 'bg-indigo-700 text-white',
  specialty: (row.specialty as Professional['specialty']) || 'certified-accountant',
  wilayaId: row.wilaya_id || 16,
  wilayaName: wilayaTranslation(row.wilaya_id),
  rating: 5.0,
  reviewCount: 0,
  hourlyRate: row.hourly_rate ?? 3500,
  available: row.available ?? true,
  yearsExperience: row.years_experience || 0,
  accreditationNumber: row.accreditation_number || '',
  completionRate: 100,
  clientsServed: 0,
  bio: asTranslation(row.bio),
  address: row.address ? asTranslation(row.address) : undefined,
  services: services.map((s): Service => ({
    title: asTranslation(s.title),
    description: asTranslation(s.description),
    price: s.price || '',
  })),
  reviews: [],
  history: (row.history || []).map((h) => ({
    year: h.year,
    title: asTranslation(h.title),
    description: asTranslation(h.description),
  })),
  phone: row.phone || undefined,
  avatarUrl: row.avatar_url || undefined,
});

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
