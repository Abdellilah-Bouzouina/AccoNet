export interface FiscalDeadline {
  id: string;
  label: string;
  dueDay?: number;
  dueMonth?: number;
  dueMonths?: number[];
  frequency: "monthly" | "quarterly" | "annual" | "social";
  description: string;
  penalty: string;
}

export const algerianFiscalDeadlines: FiscalDeadline[] = [
  // Monthly
  {
    id: 'g50-jan',
    label: 'G50 — Déclaration mensuelle TVA + TAP',
    dueDay: 20,
    frequency: 'monthly',
    description: 'Taxe sur la Valeur Ajoutée (19% taux normal, 9% réduit) + Taxe sur l\'Activité Professionnelle (1.5% commerce/services, 0.5% production).',
    penalty: '10% du montant + 3% par mois de retard (Art. 193 CPF)'
  },
  // Quarterly
  {
    id: 'irg-acompte',
    label: 'IRG / IBS — Acomptes provisionnels',
    dueMonths: [3, 6, 9],
    dueDay: 20,
    frequency: 'quarterly',
    description: '30% de l\'IRG/IBS de l\'exercice précédent × 3.',
    penalty: 'Majoration 10% + intérêts de retard 3%/mois'
  },
  // Annual
  {
    id: 'bilan',
    label: 'Dépôt du Bilan Fiscal + Liasse fiscale',
    dueMonth: 4,
    dueDay: 30,
    frequency: 'annual',
    description: 'Bilan SCF + Compte de résultat + Tableau des flux + Annexes. Référence: SCF (Système Comptable Financier, décret 08-156).',
    penalty: 'Amende 100.000 DA à 500.000 DA (Art. 194 CPF)'
  },
  {
    id: 'ifu',
    label: 'IFU — Impôt Forfaitaire Unique (Auto-entrepreneurs)',
    dueMonth: 2,
    dueDay: 28,
    frequency: 'annual',
    description: 'Taux: 5% sur CA global. Seuil: CA < 30M DA/an (LF 2020).',
    penalty: 'Majoration 25%'
  },
  // Social
  {
    id: 'cnas-t1',
    label: 'CNAS — Cotisations sociales T1',
    dueMonth: 4,
    dueDay: 30,
    frequency: 'social',
    description: 'Cotisations employeur (26%) + salarié (9%) sur salaire brut. Déclaration sur imprimé CNAS-DAS.',
    penalty: 'Majoration 10% + astreinte journalière'
  },
  {
    id: 'casnos',
    label: 'CASNOS — Non-salariés',
    dueMonth: 3,
    dueDay: 31,
    frequency: 'social',
    description: 'Cotisation forfaitaire annuelle ou proportionnelle. Obligatoire pour commerçants, artisans, professions libérales.',
    penalty: 'Exclusion des prestations sociales'
  },
  {
    id: 'tap-annuel',
    label: 'TAP — Déclaration annuelle',
    dueMonth: 4,
    dueDay: 30,
    frequency: 'annual',
    description: 'Taxe sur l\'Activité Professionnelle. Taux: 1.5% (commerce/services), 0.5% (production). Base: CA TTC.',
    penalty: 'Redressement fiscal + pénalités 40%'
  }
];
