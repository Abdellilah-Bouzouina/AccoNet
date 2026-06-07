export interface PriceRange {
  min: number;
  max: number;
  unit: string;
}

export interface ServiceRate {
  description: string;
  priceRange: PriceRange;
  basedOn?: string;
  legalRef: string;
}

export const algerianServiceRates: Record<string, ServiceRate> = {
  'Tenue de comptabilité mensuelle': {
    description: 'Saisie des pièces comptables, lettrage, rapprochements bancaires selon le PCN/SCF',
    priceRange: { min: 15000, max: 80000, unit: 'DA/mois' },
    basedOn: 'Volume des écritures + taille de l\'entreprise',
    legalRef: 'Décret 08-156 portant SCF'
  },
  'Établissement G50 mensuel': {
    description: 'Déclaration TVA, TAP, IRG/retenues à la source. Dépôt en ligne via Jibayatic (portail DGI)',
    priceRange: { min: 3000, max: 15000, unit: 'DA/mois' },
    legalRef: 'Art. 76 et suivants du CPF'
  },
  'Établissement bilan annuel + liasse fiscale': {
    description: 'Bilan SCF complet (actif/passif), compte de résultat, tableau de flux de trésorerie, notes annexes, tableaux fiscaux (G4, G6, G11, G50 annuel)',
    priceRange: { min: 50000, max: 300000, unit: 'DA/an' },
    legalRef: 'SCF — Arrêté du 26 juillet 2008'
  },
  'Commissariat aux comptes': {
    description: 'Audit légal obligatoire pour SPA, SARL > 10M DA CA, associations (Art. 715 bis du Code de Commerce)',
    priceRange: { min: 150000, max: 800000, unit: 'DA/exercice' },
    legalRef: 'Code de Commerce Art. 715 bis 4'
  },
  'Conseil fiscal et optimisation': {
    description: 'Stratégie fiscale, choix du régime, conventions fiscales (Algeria-France, Algeria-Maroc, etc.), recours gracieux DGI',
    priceRange: { min: 20000, max: 100000, unit: 'DA/dossier' },
    legalRef: 'CPF + Conventions fiscales internationales'
  },
  'Déclaration CNAS/CASNOS': {
    description: 'Établissement DAS, calcul cotisations, régularisation annuelle, gestion des dossiers affiliés',
    priceRange: { min: 5000, max: 25000, unit: 'DA/trimestre' },
    legalRef: 'Loi 83-14 + Décret 96-430'
  },
  'Domiciliation comptable': {
    description: 'Réception et conservation des pièces comptables, archivage légal 10 ans (Art. 30 du CCF)',
    priceRange: { min: 8000, max: 30000, unit: 'DA/mois' },
    legalRef: 'Art. 30 du Code du Commerce'
  },
  'Expertise judiciaire comptable': {
    description: 'Évaluation d\'entreprise, expertise dans le cadre de litiges, rapport d\'expertise judiciaire',
    priceRange: { min: 100000, max: 500005, unit: 'DA/mission' },
    legalRef: 'Loi 04-09 relative à l\'expertise judiciaire'
  }
};

export interface OrderDetail {
  fullName: string;
  fullNameAR: string;
  website?: string;
  legalBasis: string;
  memberCount: string;
  badgeColor: string;
  verificationURL?: string;
}

export const professionalOrders: Record<string, OrderDetail> = {
  'ONEC': {
    fullName: 'Ordre National des Experts Comptables',
    fullNameAR: 'الهيئة الوطنية للخبراء المحاسبين',
    website: 'www.onec.dz',
    legalBasis: 'Loi 10-01 du 29 juin 2010',
    memberCount: '~4,500 membres',
    badgeColor: '#1D4ED8',
    verificationURL: 'www.onec.dz/tableau-national'
  },
  'ONCC': {
    fullName: 'Ordre National des Commissaires aux Comptes',
    fullNameAR: 'الهيئة الوطنية لمحافظي الحسابات',
    website: 'www.oncc.dz',
    legalBasis: 'Loi 10-01 du 29 juin 2010',
    memberCount: '~2,200 membres',
    badgeColor: '#1a3c5e',
    verificationURL: 'www.oncc.dz/annuaire'
  },
  'ONCA': {
    fullName: 'Ordre National des Comptables Agréés',
    fullNameAR: 'الهيئة الوطنية للمحاسبين المعتمدين',
    legalBasis: 'Loi 10-01 du 29 juin 2010',
    memberCount: '~8,000 membres',
    badgeColor: '#5a3e8a'
  }
};
