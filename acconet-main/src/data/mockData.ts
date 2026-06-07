export interface Translation {
  ar: string;
  fr: string;
  en: string;
}

export interface Service {
  title: Translation;
  description: Translation;
  price: string; // e.g. "25,000 DZD"
}

export interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: Translation;
  date: string;
}

export interface Professional {
  id: string;
  name: Translation;
  initials: string;
  avatarBg: string; // Tailwind bg class
  specialty: "chartered-accountant" | "statutory-auditor" | "certified-accountant" | "tax-consultant" | "judicial-expert";
  wilayaId: number; // 1 to 48
  wilayaName: Translation;
  rating: number;
  reviewCount: number;
  hourlyRate: number; // in DZD
  available: boolean;
  yearsExperience: number;
  bio: Translation;
  services: Service[];
  reviews: Review[];
  accreditationNumber: string;
  completionRate: number;
  clientsServed: number;
  history: {
    year: string;
    title: Translation;
    description: Translation;
  }[];
}

export interface Client {
  id: string;
  companyName: string;
  sector: Translation;
  wilayaId: number;
  wilayaName: Translation;
  logoInitials: string;
  avatarBg: string;
  NIF: string;
  RC: string;
  activeContracts: string[]; // contractIds
  pendingTasks: string[]; // taskIds
}

export interface Contract {
  id: string;
  professionalId: string;
  clientId: string;
  title: Translation;
  status: "active" | "completed" | "pending";
  startDate: string;
  endDate: string;
  value: number; // DZD
  scopeDescription: Translation;
}

export interface Task {
  id: string;
  contractId: string;
  title: Translation;
  deadline: string;
  status: "todo" | "in-progress" | "done";
  type: "tax-filing" | "audit" | "bookkeeping" | "advisory" | "declaration";
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  wilayaName: Translation;
  rating: number;
  comment: Translation;
  date: string;
}

export interface Wilaya {
  id: number;
  code: string;
  name: Translation;
}

// 48 Algerian Wilayas
export const wilayas: Wilaya[] = [
  { id: 1, code: "01", name: { ar: "أدرار", fr: "Adrar", en: "Adrar" } },
  { id: 2, code: "02", name: { ar: "الشلف", fr: "Chlef", en: "Chlef" } },
  { id: 3, code: "03", name: { ar: "الأغواط", fr: "Laghouat", en: "Laghouat" } },
  { id: 4, code: "04", name: { ar: "أم البواقي", fr: "Oum El Bouaghi", en: "Oum El Bouaghi" } },
  { id: 5, code: "05", name: { ar: "باتنة", fr: "Batna", en: "Batna" } },
  { id: 6, code: "06", name: { ar: "بجاية", fr: "Béjaïa", en: "Béjaïa" } },
  { id: 7, code: "07", name: { ar: "بسكرة", fr: "Biskra", en: "Biskra" } },
  { id: 8, code: "08", name: { ar: "بشار", fr: "Béchar", en: "Béchar" } },
  { id: 9, code: "09", name: { ar: "البليدة", fr: "Blida", en: "Blida" } },
  { id: 10, code: "10", name: { ar: "البويرة", fr: "Bouira", en: "Bouira" } },
  { id: 11, code: "11", name: { ar: "تمنراست", fr: "Tamanrasset", en: "Tamanrasset" } },
  { id: 12, code: "12", name: { ar: "تبسة", fr: "Tébessa", en: "Tébessa" } },
  { id: 13, code: "13", name: { ar: "تلمسان", fr: "Tlemcen", en: "Tlemcen" } },
  { id: 14, code: "14", name: { ar: "تيارت", fr: "Tiaret", en: "Tiaret" } },
  { id: 15, code: "15", name: { ar: "تيزي وزو", fr: "Tizi Ouzou", en: "Tizi Ouzou" } },
  { id: 16, code: "16", name: { ar: "الجزائر", fr: "Alger", en: "Algiers" } },
  { id: 17, code: "17", name: { ar: "الجلفة", fr: "Djelfa", en: "Djelfa" } },
  { id: 18, code: "18", name: { ar: "جيجل", fr: "Jijel", en: "Jijel" } },
  { id: 19, code: "19", name: { ar: "سطيف", fr: "Sétif", en: "Sétif" } },
  { id: 20, code: "20", name: { ar: "سعيدة", fr: "Saïda", en: "Saïda" } },
  { id: 21, code: "21", name: { ar: "سكيكدة", fr: "Skikda", en: "Skikda" } },
  { id: 22, code: "22", name: { ar: "سيدي بلعباس", fr: "Sidi Bel Abbès", en: "Sidi Bel Abbès" } },
  { id: 23, code: "23", name: { ar: "عنابة", fr: "Annaba", en: "Annaba" } },
  { id: 24, code: "24", name: { ar: "قالمة", fr: "Guelma", en: "Guelma" } },
  { id: 25, code: "25", name: { ar: "قسنطينة", fr: "Constantine", en: "Constantine" } },
  { id: 26, code: "26", name: { ar: "المدية", fr: "Médéa", en: "Médéa" } },
  { id: 27, code: "27", name: { ar: "مستغانم", fr: "Mostaganem", en: "Mostaganem" } },
  { id: 28, code: "28", name: { ar: "المسيلة", fr: "M'Sila", en: "M'Sila" } },
  { id: 29, code: "29", name: { ar: "معسكر", fr: "Mascara", en: "Mascara" } },
  { id: 30, code: "30", name: { ar: "ورقلة", fr: "Ouargla", en: "Ouargla" } },
  { id: 31, code: "31", name: { ar: "وهران", fr: "Oran", en: "Oran" } },
  { id: 32, code: "32", name: { ar: "البيض", fr: "El Bayadh", en: "El Bayadh" } },
  { id: 33, code: "33", name: { ar: "إيليزي", fr: "Illizi", en: "Illizi" } },
  { id: 34, code: "34", name: { ar: "برج بوعريريج", fr: "Bordj Bou Arréridj", en: "Bordj Bou Arréridj" } },
  { id: 35, code: "35", name: { ar: "بومرداس", fr: "Boumerdès", en: "Boumerdès" } },
  { id: 36, code: "36", name: { ar: "الطارف", fr: "El Tarf", en: "El Tarf" } },
  { id: 37, code: "37", name: { ar: "تندوف", fr: "Tindouf", en: "Tindouf" } },
  { id: 38, code: "38", name: { ar: "تيسمسيلت", fr: "Tissemsilt", en: "Tissemsilt" } },
  { id: 39, code: "39", name: { ar: "الوادي", fr: "El Oued", en: "El Oued" } },
  { id: 40, code: "40", name: { ar: "خنشلة", fr: "Khenchela", en: "Khenchela" } },
  { id: 41, code: "41", name: { ar: "سوق أهراس", fr: "Souk Ahras", en: "Souk Ahras" } },
  { id: 42, code: "42", name: { ar: "تيبازة", fr: "Tipaza", en: "Tipaza" } },
  { id: 43, code: "43", name: { ar: "ميلة", fr: "Mila", en: "Mila" } },
  { id: 44, code: "44", name: { ar: "عين الدفلى", fr: "Aïn Defla", en: "Aïn Defla" } },
  { id: 45, code: "45", name: { ar: "النعامة", fr: "Naâma", en: "Naâma" } },
  { id: 46, code: "46", name: { ar: "عين تموشنت", fr: "Aïn Témouchent", en: "Aïn Témouchent" } },
  { id: 47, code: "47", name: { ar: "غرداية", fr: "Ghardaïa", en: "Ghardaïa" } },
  { id: 48, code: "48", name: { ar: "غليزان", fr: "Relizane", en: "Relizane" } }
];

export const professionals: Professional[] = [
  {
    id: "p1",
    name: {
      ar: "سفيان بن عمار",
      fr: "Sofiane Benamara",
      en: "Sofiane Benamara"
    },
    initials: "SB",
    avatarBg: "bg-teal-700 text-white",
    specialty: "certified-accountant",
    wilayaId: 16,
    wilayaName: { ar: "الجزائر", fr: "Alger", en: "Algiers" },
    rating: 4.9,
    reviewCount: 38,
    hourlyRate: 6500,
    available: true,
    yearsExperience: 14,
    accreditationNumber: "CNEC/2012/948",
    completionRate: 98,
    clientsServed: 124,
    bio: {
      ar: "مهني محاسب معتمد يتمتع بأكثر من 14 عامًا من الخبرة في مرافقة الشركات الناشئة والمؤسسات الصغيرة والمتوسطة في الجزائر العاصمة. متخصص في الهيكلة الجبائية وإعداد الميزانيات السنوية.",
      fr: "Expert-comptable agréé avec plus de 14 ans d'expérience dans l'accompagnement des startups et PME à Alger. Spécialiste de la structuration fiscale et de la préparation des bilans annuels.",
      en: "Certified Chartered Accountant with over 14 years of experience supporting startups and SMEs in Algiers. Specialist in tax structuring and annual balance sheet preparation."
    },
    services: [
      {
        title: { ar: "إعداد الميزانية السنوية والتقارير المالية", fr: "Préparation du bilan annuel et liasse fiscale", en: "Annual balance sheet & tax pack preparation" },
        description: { ar: "مراجعة شاملة للحسابات السنوية وإعداد الملف الجبائي النهائي الخاص بمصالح الضرائب.", fr: "Audit complet des comptes annuels et dépôt réglementaire auprès de l'administration fiscale.", en: "Full audit of annual accounts and official filing with tax authorities." },
        price: "120,000 DZD"
      },
      {
        title: { ar: "نصائح وإرشادات جبائية للشركات الناشئة", fr: "Conseil fiscal ciblé pour startups", en: "Targeted tax advisory for startups" },
        description: { ar: "تحسين العبء الضريبي والاستفادة من الإعفاءات الجمركية والجبائية الخاصة بالشركات الحاصلة على علامة ناشئة.", fr: "Optimisation de la charge fiscale et bénéfice des exonérations du label Startup en Algérie.", en: "Tax load optimization and leveraging benefits of the Algerian Startup Label." },
        price: "45,000 DZD"
      },
      {
        title: { ar: "مسك الدفاتر المحوسبة الشهرية", fr: "Tenue de comptabilité mensuelle numérisée", en: "Monthly digital bookkeeping services" },
        description: { ar: "مسك الحسابات بشكل دوري عبر برامج متوافقة وتوليد التصريحات الشهرية G50.", fr: "Saisie régulière, lettrage et génération automatique des déclarations G50 mensuelles.", en: "Regular bookkeeping, matching, and automated generation of monthly G50 filings." },
        price: "35,000 DZD / Month"
      }
    ],
    reviews: [
      {
        id: "r1_1",
        clientName: "Yassine K.",
        rating: 5,
        comment: {
          ar: "الاستاذ سفيان محترف ومتمكن جداً. ساعد شركتنا الناشئة في الحصول على الإعفاءات الضريبية وتأسيس نظام محاسبي متكامل وقوي.",
          fr: "Mr. Sofiane est extrêmement professionnel. Il a guidé notre startup vers les exonérations fiscales et a établi une comptabilité solide.",
          en: "Mr. Sofiane is extremely professional. He guided our startup through the tax exemptions and set up a solid accounting system."
        },
        date: "2026-04-12"
      },
      {
        id: "r1_2",
        clientName: "Amel B.",
        rating: 4.8,
        comment: {
          ar: "نصائح دقيقة ومعرفة عميقة بالتشريعات الجزائرية. نوصي به بشدة للشركات والمصانع الصغيرة.",
          fr: "Des conseils précieux et une maîtrise parfaite des lois fiscales algériennes. Recommandé fortement pour les PME.",
          en: "Valuable advice and flawless mastery of Algerian tax regulations. Highly recommended for SMEs."
        },
        date: "2026-03-05"
      },
      {
        id: "r1_3",
        clientName: "Mourad S.",
        rating: 5,
        comment: {
          ar: "سرعة كبيرة في معالجة الملفات والرد على الاستفسارات. حل لنا مشكلة تراكم الضرائب المعلقة.",
          fr: "Une rapidité de traitement de dossiers remarquable. Il a résolu tous nos litiges fiscaux en attente.",
          en: "Remarkable speed in handling cases. He resolved all our outstanding tax disputes efficiently."
        },
        date: "2026-02-18"
      }
    ],
    history: [
      { year: "2018 - Present", title: { ar: "شريك مؤسس، مكتب بن عمار للمحاسبة", fr: "Associé Gérant, Cabinet Benamara", en: "Managing Partner, Benamara Accounting Cabinet" }, description: { ar: "تسيير محفظة تضم أزيد من 50 شركة جزائرية ناشئة وصغيرة.", fr: "Gestion d'un portefeuille de plus de 50 startups et PME algériennes.", en: "Managing a portfolio of over 50 Algerian startups and SMEs." } },
      { year: "2012 - 2018", title: { ar: "مدير مالي أول، مجموعة صناعية بالرويبة", fr: "Directeur Financier, Groupe Industriel Rouïba", en: "Senior Financial Director, Rouiba Industrial Group" }, description: { ar: "الإشراف على الميزانيات المجمعة والامتثال الضريبي.", fr: "Supervision des bilans consolidés et de la conformité fiscale.", en: "Supervision of consolidated balances and tax compliance." } }
    ]
  },
  {
    id: "p2",
    name: {
      ar: "سارة حداد",
      fr: "Sarah Haddad",
      en: "Sarah Haddad"
    },
    initials: "SH",
    avatarBg: "bg-indigo-700 text-white",
    specialty: "tax-consultant",
    wilayaId: 31,
    wilayaName: { ar: "وهران", fr: "Oran", en: "Oran" },
    rating: 4.8,
    reviewCount: 22,
    hourlyRate: 5500,
    available: true,
    yearsExperience: 9,
    accreditationNumber: "DGI/CF/31-229",
    completionRate: 95,
    clientsServed: 74,
    bio: {
      ar: "مستشارة جبائية متخصصة في التشريعات الجبائية الجزائرية والجمارك والمنازعات في الغرب الجزائري. أساعد الشركات في تقليل الأخطاء الجبائية وإجراء عمليات التدقيق الوقائي.",
      fr: "Conseillère fiscale spécialisée en droit fiscal algérien, douanes et contentieux dans l'Ouest algérien. J'aide les entreprises à minimiser les risques fiscaux par des audits préventifs.",
      en: "Tax Consultant specializing in Algerian tax law, customs, and litigation in Western Algeria. I help businesses minimize tax risks through preventative audits."
    },
    services: [
      {
        title: { ar: "التدقيق الجبائي والوقاية من المخاطر", fr: "Audit fiscal préventif", en: "Preventative tax audit" },
        description: { ar: "مراجعة ملفات السنوات السابقة للتأكد من خلوها من الأخطاء التي قد تسبب غرامات مالية عند المراقبة الجبائية.", fr: "Revue complète des comptes passés pour prévenir les redressements lors d'un contrôle fiscal.", en: "Thorough review of past records to prevent adjustments during a tax audit." },
        price: "90,000 DZD"
      },
      {
        title: { ar: "حل منازعات الضرائب والاعتراضات", fr: "Gestion des contentieux et recours", en: "Tax litigation & formal appeals" },
        description: { ar: "صياغة المذكرات الجوابية والطعون أمام اللجان الولائية والمركزية للضرائب.", fr: "Rédaction des recours et défense devant les commissions locales et centrales des impôts.", en: "Drafting appeals and defense before local and central tax commissions." },
        price: "70,000 DZD"
      }
    ],
    reviews: [
      {
        id: "r2_1",
        clientName: "Brahim S.",
        rating: 4.8,
        comment: {
          ar: "الاستفادة من مهاراتها الجبائية خفضت غرامات المراقبة بنسبة 70%. ذكاء واحترافية عالية.",
          fr: "Son intervention a réduit notre redressement fiscal de 70%. Une expertise hors pair.",
          en: "Her intervention reduced our tax audit adjustment by 70%. An unparalleled expertise."
        },
        date: "2026-04-20"
      },
      {
        id: "r2_2",
        clientName: "Nadia T.",
        rating: 5,
        comment: {
          ar: "متخصصة في القانون الجزائري ومخلصة جداً في عملها. التواصل كان ممتازاً بكلا اللغتين.",
          fr: "Experte en loi algérienne et très dévouée. Excellente communication en arabe et français.",
          en: "Expert in Algerian law and very dedicated. Excellent communication in both Arabic and French."
        },
        date: "2026-03-10"
      },
      {
        id: "r2_3",
        clientName: "Halim G.",
        rating: 4.6,
        comment: {
          ar: "قامت بمراجعة الكشوفات الشهرية وأرشدتنا لنظام جبائي أنسب لشركتنا للاستيراد والتصدير.",
          fr: "A examiné nos déclarations mensuelles et nous a orienté vers un régime plus avantageux.",
          en: "Reviewed our monthly filings and guided us to a more advantageous import/export tax regime."
        },
        date: "2026-01-29"
      }
    ],
    history: [
      { year: "2021 - Present", title: { ar: "مؤسسة مكتب حداد للاستشارات الجبائية", fr: "Fondatrice, Haddad Tax Consulting", en: "Founder, Haddad Tax Consulting" }, description: { ar: "تقديم خدمات استشارية متكاملة لشركات القطاع السياحي والصناعي بوهارن.", fr: "Services de conseil aux secteurs touristiques et industriels d'Oran.", en: "Consulting services for tourism and industrial sectors in Oran." } },
      { year: "2017 - 2021", title: { ar: "مفتشة ضرائب سابقة، مديرية الضرائب بوهران", fr: "Ancienne Inspectrice, Direction des Impôts d'Oran", en: "Former Tax Inspector, Oran Tax Directorate" }, description: { ar: "مراقبة الشركات التجارية الكبرى وإدارة النزاعات الجبائية.", fr: "Contrôle des grandes entreprises et gestion des contentieux.", en: "Auditing large corporations and managing tax litigations." } }
    ]
  },
  {
    id: "p3",
    name: {
      ar: "كريم بوقرة",
      fr: "Karim Bouguerra",
      en: "Karim Bouguerra"
    },
    initials: "KB",
    avatarBg: "bg-blue-800 text-white",
    specialty: "statutory-auditor",
    wilayaId: 25,
    wilayaName: { ar: "قسنطينة", fr: "Constantine", en: "Constantine" },
    rating: 4.7,
    reviewCount: 15,
    hourlyRate: 7000,
    available: false,
    yearsExperience: 16,
    accreditationNumber: "CNCC/2010/431",
    completionRate: 100,
    clientsServed: 82,
    bio: {
      ar: "محافظ حسابات معتمد لدى الاتحاد الوطني للمحاسبين. متخصص في تدقيق الحسابات القانوني للشركات المساهمة والمجموعات الاقتصادية الكبرى بقرون الذهب الشرقية والامتثال المالي المتقدم.",
      fr: "Commissaire aux comptes agréé. Spécialisé dans l'audit légal des sociétés par actions et grands groupes dans l'Est algérien. Expert en conformité financière et IFRS.",
      en: "Accredited Statutory Auditor. Specialized in the statutory audit of corporations and large groups in Eastern Algeria. Expert in financial compliance and IFRS."
    },
    services: [
      {
        title: { ar: "التدقيق المالي القانوني (محافظة الحسابات)", fr: "Commissariat aux comptes (Audit légal)", en: "Statutory auditing & legal audit" },
        description: { ar: "المصادقة القانونية على الحسابات السنوية وإعداد تقرير محافظة الحسابات العام والخاص للشركاء.", fr: "Certification réglementaire des états financiers et rédaction des rapports généraux et spéciaux.", en: "Regulatory certification of financial statements and drafting of general and special reports." },
        price: "200,000 DZD"
      },
      {
        title: { ar: "صياغة أنظمة الرقابة الداخلية للشركات", fr: "Mise en place de procédures de contrôle interne", en: "Internal control system implementation" },
        description: { ar: "تقييم وتأسيس هيكل رقابي يمنع حدوث ثغرات مالية أو تسريبات نقدية داخل المؤسسات.", fr: "Évaluation et implémentation de processus de contrôle pour réduire les risques opérationnels.", en: "Evaluation and implementation of control processes to reduce operational risks." },
        price: "110,000 DZD"
      }
    ],
    reviews: [
      {
        id: "r3_1",
        clientName: "Fawzi H.",
        rating: 5,
        comment: {
          ar: "محافظ حسابات رائع ودقيق جداً. كشف لنا العديد من مواطن الضعف في الرقابة الداخلية لمصنعنا وقدم حلولاً عملية لها.",
          fr: "Excellent commissaire, rigoureux. Il a détecté des failles de contrôle interne majeures dans notre usine.",
          en: "Excellent and rigorous auditor. He detected major internal control flaws in our factory and gave clear solutions."
        },
        date: "2026-05-01"
      },
      {
        id: "r3_2",
        clientName: "Lamine R.",
        rating: 4.5,
        comment: {
          ar: "عمل احترافي منظم والالتزام بالمواعيد ممتاز. التقارير المقدمة كانت ذات قيمة عالية جداً لمجلس الإدارة.",
          fr: "Travail très structuré et respect des délais. Les rapports remis ont une grande valeur pour le conseil.",
          en: "Very structured work and respect of deadlines. The reports delivered had great value for the board."
        },
        date: "2026-03-24"
      },
      {
        id: "r3_3",
        clientName: "Smail P.",
        rating: 4.6,
        comment: {
          ar: "ساعد في دمج شركتين عائليتين وقياس الأصول بدقة لضمان توازن الحصص.",
          fr: "A facilité la fusion de nos deux filiales familiales avec une évaluation d'actifs ultra-précise.",
          en: "Facilitated the merger of our two family subsidiaries with an ultra-precise asset valuation."
        },
        date: "2026-02-10"
      }
    ],
    history: [
      { year: "2010 - Present", title: { ar: "محافظ حسابات مستقل، مكتب بوقرة للتدقيق", fr: "Commissaire aux Comptes Indépendant", en: "Independent Statutory Auditor, Bouguerra Audit" }, description: { ar: "مراجعة واعتماد الحسابات لأكثر من 40 شركة مساهمة كبرى في قسنطينة وسطيف.", fr: "Audit et certification des comptes de 40 grandes sociétés à Constantine et Sétif.", en: "Audit and certification of accounts for 40 large companies in Constantine and Sétif." } }
    ]
  },
  {
    id: "p4",
    name: {
      ar: "ليلى يعقوبي",
      fr: "Layla Yakoubi",
      en: "Layla Yakoubi"
    },
    initials: "LY",
    avatarBg: "bg-emerald-700 text-white",
    specialty: "chartered-accountant",
    wilayaId: 15,
    wilayaName: { ar: "تيزي وزو", fr: "Tizi Ouzou", en: "Tizi Ouzou" },
    rating: 4.9,
    reviewCount: 30,
    hourlyRate: 4800,
    available: true,
    yearsExperience: 10,
    accreditationNumber: "CNEC/2016/1022",
    completionRate: 97,
    clientsServed: 95,
    bio: {
      ar: "محاسبة معتمدة بخبرة واسعة ومتميزة في مساعدة المؤسسات الفلاحية والتعاونيات والإنتاج المحلي بمنطقة تيزي وزو والبويرة ومومرداس. نخدمكم بالذكاء والشفافية التامة.",
      fr: "Comptable agréée spécialisée dans l'accompagnement des coopératives agricoles, PME et producteurs locaux en Kabylie (Tizi Ouzou, Bouira). Transparence et rigueur garanties.",
      en: "Accredited Accountant specializing in supporting agricultural cooperatives, SMEs, and local producers in Kabylie (Tizi Ouzou, Bouira). Guaranteed transparency and rigor."
    },
    services: [
      {
        title: { ar: "تأسيس ومرافقة التعاونيات والمؤسسات", fr: "Création et suivi de coopératives et PME", en: "Creation and follow-up of cooperatives" },
        description: { ar: "صياغة النظم الأساسية والامتيازات الجبائية والتعامل مع الغرف الفلاحية والتجارية لتسهيل الانطلاق.", fr: "Rédaction des statuts, démarches d'avantages fiscaux et d'accords avec les chambres d'agriculture.", en: "Drafting of bylaws, tax benefit processes, and agreements with chambers of agriculture." },
        price: "50,000 DZD"
      },
      {
        title: { ar: "متابعة الضمان الاجتماعي وشؤون العمال", fr: "Gestion de paie, CNAS et déclarations sociales", en: "Payroll, CNAS and social declarations" },
        description: { ar: "إعداد كشوف الرواتب الشهرية والاشتراكات للضمان الاجتماعي للعمال والمدراء (CNAS / CASNOS) بدقة.", fr: "Établissement des fiches de paie, DAS annuelle et déclarations d'impôt sur le revenu (IRG).", en: "Preparation of monthly payslips, annual DAS, and personal income tax (IRG) declarations." },
        price: "25,000 DZD / Month"
      }
    ],
    reviews: [
      {
        id: "r4_1",
        clientName: "Malek O.",
        rating: 5,
        comment: {
          ar: "الخدمة ممتازة ومثالية جداً. الآنسة ليلى على دراية مذهلة بكل القوانين والمنح والتسهيلات الممنوحة للمجال الفلاحي.",
          fr: "Service impécable. Mlle Yakoubi est très calée sur les subventions et exonérations spécifiques à l'agriculture.",
          en: "Impecable service. Ms. Yakoubi is very knowledgeable on agricultural grants and tax benefits."
        },
        date: "2026-04-18"
      },
      {
        id: "r4_2",
        clientName: "Zohra T.",
        rating: 4.8,
        comment: {
          ar: "تسير شؤون عمالنا بانتظام تام. لم نعد نعاني من أي عقوبات أو غرامات ضياع مواعيد التصريحات.",
          fr: "Gère les salaires de nos 25 employés à la perfection. Plus aucun retard de déclaration CNAS !",
          en: "Manages the salaries of our 25 employees perfectly. No more CNAS filing or payment delays!"
        },
        date: "2026-03-30"
      },
      {
        id: "r4_3",
        clientName: "Karim M.",
        rating: 5,
        comment: {
          ar: "إنسانة في قمة الأخلاق والصدق والعمل بضمير حي. وفرت لنا الكثير من المجهود والوقت المفقود.",
          fr: "Une femme travailleuse, honnête et compétente. Nous avons épargné des sommes folles d'administration.",
          en: "An honest, hardworking, and highly competent woman. Saved us so much time and public administration overhead."
        },
        date: "2026-02-14"
      }
    ],
    history: [
      { year: "2016 - Present", title: { ar: "مديرة، مكتب يعقوبي للخدمات المحاسبية", fr: "Directrice, Cabinet Yakoubi Comptabilité", en: "Director, Yakoubi Accounting Cabinet" }, description: { ar: "الشريك الأول للمربين والمنتجين والشركات الخدمية في ولاية تيزي وزو.", fr: "Partenaire de premier plan pour les éleveurs, producteurs et PME de Tizi Ouzou.", en: "Leading partner for breeders, producers, and service companies in Tizi Ouzou." } }
    ]
  },
  {
    id: "p5",
    name: {
      ar: "عبد السلام حميدي",
      fr: "Abdessalam Hamidi",
      en: "Abdessalam Hamidi"
    },
    initials: "AH",
    avatarBg: "bg-amber-800 text-white",
    specialty: "judicial-expert",
    wilayaId: 19,
    wilayaName: { ar: "سطيف", fr: "Sétif", en: "Sétif" },
    rating: 4.6,
    reviewCount: 19,
    hourlyRate: 8000,
    available: true,
    yearsExperience: 22,
    accreditationNumber: "MJ/EX-2004/79",
    completionRate: 94,
    clientsServed: 110,
    bio: {
      ar: "مهني قضائي معتمد ومحكم حسابات لدى المحاكم والمجالس القضائية الجزائرية. خبرة تمتد لأكثر من عشرين سنة في تقييم الأضرار، تفكيك الشراكات، وتوريث المؤسسات العائلية الكبرى.",
      fr: "Expert judiciaire agréé près les Cours et Tribunaux algériens. Plus de 22 ans d'expérience dans l'évaluation des préjudices, la liquidation d'entreprises et le règlement des successions complexes.",
      en: "Accredited Judicial Expert registered with Algerian Courts. Over 22 years of experience in damages valuation, corporate liquidations, and complex business succession inheritance disputes."
    },
    services: [
      {
        title: { ar: "الخبرة القضائية وحل النزاعات المالية", fr: "Expertises judiciaires et arbitrages financiers", en: "Judicial auditing & financial arbitration" },
        description: { ar: "مراجعة القيود المحاسبية محل الخلاف وصياغة تقرير الخبرة لتقديمه للمحاكم لحسم النزاع.", fr: "Analyse comptable des litiges commerciaux et rédaction des rapports d'expertise pour les tribunaux.", en: "Accounting analysis of business disputes and drafting expert witness reports for tribunals." },
        price: "150,000 DZD"
      },
      {
        title: { ar: "تدقيق الحصص وتصفية الشركات", fr: "Évaluation d'actifs et liquidation de sociétés", en: "Asset valuation & company liquidation" },
        description: { ar: "تصفية الأصول والخصوم وسداد الدائنين وتوزيع ناتج التصفية بين الشركاء بالعدل والقانون.", fr: "Audit contractuel et liquidation amiable ou judiciaire de sociétés avec partage équitable des comptes.", en: "Contractual audit and voluntary or judicial liquidation with fair capital sharing." },
        price: "130,000 DZD"
      }
    ],
    reviews: [
      {
        id: "r5_1",
        clientName: "Othmane L.",
        rating: 5,
        comment: {
          ar: "الخبرة القضائية التي قام بها كانت حاسمة في استرجاع حقوقنا المسلوبة في الشركة العائلية. جزيل الشكر والتقدير.",
          fr: "Son rapport d'expertise a été la clé pour récupérer nos droits dans la société familiale.",
          en: "His expert report was the absolute key to recovering our rights in the familial corporation."
        },
        date: "2026-04-10"
      },
      {
        id: "r5_2",
        clientName: "Salem B.",
        rating: 4.5,
        comment: {
          ar: "مهني في غاية النزاهة والحكمة. أدار النقاش والوصول للتسوية بروية واحترام كبير للطرفين.",
          fr: "Arbitre intègre et sage. Il a conduit l'arbitrage avec équité et respect envers les parties.",
          en: "Honest and wise arbitrator. He headed the dispute resolution with fairness and absolute respect."
        },
        date: "2026-03-02"
      }
    ],
    history: [
      { year: "2004 - Present", title: { ar: "مهني قضائي معتمد لدى مجلس قضاء سطيف", fr: "Expert Judiciaire Agréé, Cour de Sétif", en: "Accredited Judicial Expert, Court of Setif" }, description: { ar: "تكليف في أكثر من 180 قضية تجارية ومالية معقدة.", fr: "Désigné par la justice sur plus de 180 affaires commerciales complexes.", en: "Appointed by courts on more than 180 complex commercial disputes." } }
    ]
  },
  {
    id: "p6",
    name: {
      ar: "حمزة بن زايد",
      fr: "Hamza Benzaid",
      en: "Hamza Benzaid"
    },
    initials: "HZ",
    avatarBg: "bg-sky-800 text-white",
    specialty: "certified-accountant",
    wilayaId: 16,
    wilayaName: { ar: "الجزائر", fr: "Alger", en: "Algiers" },
    rating: 4.8,
    reviewCount: 26,
    hourlyRate: 5000,
    available: true,
    yearsExperience: 8,
    accreditationNumber: "CNEC/2018/1410",
    completionRate: 98,
    clientsServed: 63,
    bio: {
      ar: "مهني محاسب معتمد في الجزائر العاصمة، رائد في رقمنة الأنظمة المحاسبية. نسعى لتطوير نظام الشركات الجزائرية عبر دمج التكنولوجيا المتطورة والسحابة مع الكفاءة المحلية.",
      fr: "Comptable agréé basé à Alger, pionnier de la numérisation des systèmes d'information comptables. Nous intégrons les outils cloud avec l'expertise locale.",
      en: "Accredited Accountant in Algiers, pioneer in local cloud accounting. We optimize financial systems by merging state-of-the-art tech tools with local Algerian rules."
    },
    services: [
      {
        title: { ar: "التحول الرقمي وتثبيت البرامج المحاسبية", fr: "Transition numérique et intégration de logiciels ERP", en: "Digital transition & ERP cloud integration" },
        description: { ar: "تثبيت وضبط برامج ERP السحابية وتدريب الفريق الإداري لشركتكم لضمان الكفاءة والشفافية.", fr: "Implémentation de l'ERP Odoo/Sage et formation de vos équipes sur la gestion commerciale et comptable.", en: "Implementation of cloud ERP solutions like Odoo and Sage, training teams on digital transactions." },
        price: "150,000 DZD"
      }
    ],
    reviews: [
      {
        id: "r6_1",
        clientName: "Merouane K.",
        rating: 5,
        comment: {
          ar: "بفضل سفيان وحمزة انتقلت شركتنا الكهروميكانيكية لنظام فوترة سحابي متطور مريح ومحمي.",
          fr: "Grâce à Hamza, notre PME a migré sur un système de facturation digitalisé et ultra-rapide.",
          en: "Thanks to Hamza, our SMB successfully migrated to an ultra-fast digital cloud invoicing system."
        },
        date: "2026-05-15"
      }
    ],
    history: []
  },
  {
    id: "p7",
    name: {
      ar: "مراد يعمران",
      fr: "Mourad Yamrane",
      en: "Mourad Yamrane"
    },
    initials: "MY",
    avatarBg: "bg-red-800 text-white",
    specialty: "certified-accountant",
    wilayaId: 6,
    wilayaName: { ar: "بجاية", fr: "Béjaïa", en: "Béjaïa" },
    rating: 4.5,
    reviewCount: 12,
    hourlyRate: 4000,
    available: true,
    yearsExperience: 7,
    accreditationNumber: "CNEC/2019/1512",
    completionRate: 90,
    clientsServed: 40,
    bio: {
      ar: "محاسب معتمد نشط جداً في الصومام وبجاية. متخصص في محاسبة شركات التوزيع والتجارة بالتجزئة، استرداد القيمة المضافة ومسك الدفاتر المالية القانونية.",
      fr: "Comptable agréé de Béjaïa et de la vallée de la Soumman. Spécialisé dans le commerce de gros, les remboursements de TVA et le secrétariat juridique.",
      en: "Accredited Accountant in Bejaia & Soummam. Specialized in retail, wholesale distributing, VAT claims, refund audits, and corporate legal filing."
    },
    services: [
      {
        title: { ar: "متابعة واسترداد القيمة المضافة (TVA)", fr: "Demande de remboursement de TVA active", en: "In-depth VAT claims & refunds" },
        description: { ar: "تأسيس ملف المطابقة والامتثال القانوني ومتابعة مصالح الضرائب لاسترداد المبالغ المالية المستحقة.", fr: "Préparation des dossiers d'exonération ou de récupération de la TVA grevant les investissements.", en: "Preparation of VAT exemption or refund files on capital investment for businesses." },
        price: "40,000 DZD"
      }
    ],
    reviews: [],
    history: []
  },
  {
    id: "p8",
    name: {
      ar: "فتيحة بوزيدي",
      fr: "Fatiha Bouzidi",
      en: "Fatiha Bouzidi"
    },
    initials: "FB",
    avatarBg: "bg-pink-800 text-white",
    specialty: "tax-consultant",
    wilayaId: 9,
    wilayaName: { ar: "البليدة", fr: "Blida", en: "Blida" },
    rating: 4.7,
    reviewCount: 16,
    hourlyRate: 4500,
    available: false,
    yearsExperience: 11,
    accreditationNumber: "DGI/CF/09-112",
    completionRate: 96,
    clientsServed: 58,
    bio: {
      ar: "مستشارة مهنية في الضرائب بمدينة البليدة ومحيط المتيجة. أساعد المصانع وشركات الأغذية والتحويل الزراعي في مطابقة اللوائح الجبائية الجديدة في قوانين المالية السنوية.",
      fr: "Consultante fiscale à Blida. J'oriente les industries agroalimentaires et manufacturières de la Mitidja face aux fréquents changements des lois de finances.",
      en: "Tax Consultant based in Blida. I help food-processing and manufacturing businesses in Mitidja navigate the frequent updates in annually voted Algerian Finance Acts."
    },
    services: [
      {
        title: { ar: "الامتثال والتخطيط السنوي لقوانين المالية", fr: "Planification fiscale Loi de Finances", en: "Annual Finance Act compliance planning" },
        description: { ar: "تحليل معمق للأحكام الجبائية المستحدثة وتجنب تطبيق المعدلات العقابية أو الغرامات المفاجئة.", fr: "Analyse sur-mesure de la nouvelle Loi de Finances pour anticiper les impacts et restructurer au mieux.", en: "Bespoke analysis of the new annual Finance Act to mitigate tax risks and design optimal solutions." },
        price: "60,000 DZD"
      }
    ],
    reviews: [],
    history: []
  }
];

export const clients: Client[] = [
  {
    id: "c1",
    companyName: "Dzair Tech Link",
    sector: { ar: "تكنولوجيا المعلومات والبرمجيات", fr: "Technologies de l'information", en: "Information Technology" },
    wilayaId: 16,
    wilayaName: { ar: "الجزائر", fr: "Alger", en: "Algiers" },
    logoInitials: "DT",
    avatarBg: "bg-slate-700 text-white",
    NIF: "001816091223455",
    RC: "16/00-109432B18",
    activeContracts: ["ct1", "ct4"],
    pendingTasks: ["tk1", "tk2", "tk5"]
  },
  {
    id: "c2",
    companyName: "Mitidja Agro Export",
    sector: { ar: "الفلاحة والصناعة التحويلية", fr: "Agriculture et agroalimentaire", en: "Agriculture & Food Processing" },
    wilayaId: 9,
    wilayaName: { ar: "البليدة", fr: "Blida", en: "Blida" },
    logoInitials: "MA",
    avatarBg: "bg-emerald-800 text-white",
    NIF: "001209043224190",
    RC: "09/00-098412B20",
    activeContracts: ["ct2"],
    pendingTasks: ["tk3", "tk4"]
  },
  {
    id: "c3",
    companyName: "Constantine Pharma Trading",
    sector: { ar: "الصيدلة والأجهزة الطبية", fr: "Pharmaceutique & Médical", en: "Pharmaceuticals & MedTech" },
    wilayaId: 25,
    wilayaName: { ar: "قسنطينة", fr: "Constantine", en: "Constantine" },
    logoInitials: "CP",
    avatarBg: "bg-blue-900 text-white",
    NIF: "001625078912349",
    RC: "25/00-112345B21",
    activeContracts: ["ct3"],
    pendingTasks: ["tk6", "tk7"]
  },
  {
    id: "c4",
    companyName: "El Bahia Logistics",
    sector: { ar: "النقل واللوجستيك", fr: "Transport et Logistique", en: "Transportation & Logistics" },
    wilayaId: 31,
    wilayaName: { ar: "وهران", fr: "Oran", en: "Oran" },
    logoInitials: "EB",
    avatarBg: "bg-amber-700 text-white",
    NIF: "001431054321908",
    RC: "31/00-054321B19",
    activeContracts: ["ct5"],
    pendingTasks: ["tk8"]
  }
];

export const contracts: Contract[] = [
  {
    id: "ct1",
    professionalId: "p1",
    clientId: "c1",
    title: { ar: "مرافقة محاسبية وشركة ناشئة كاملة", fr: "Accompagnement Comptabilité Annuelle & G50", en: "Full Bookkeeping & Monthly G50 Assistance" },
    status: "active",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    value: 420000,
    scopeDescription: {
      ar: "مسك الحسابات اليومية بالبرمجية السحابية وتعبئة استمارات G50 ونماذج الضرائب والضمان الاجتماعي وصياغة الميزانية السنوية ومذكرة المبيعات المعفاة.",
      fr: "Gestion de la comptabilité courante, déclarations G50 mensuelles, déclarations DAS et CNAS/CASNOS, établissement et dépôt de la liasse fiscale de clôture.",
      en: "Routine accounting records, monthly G50 filings, CNAS/CASNOS social declarations, and preparation & filing of the final corporate fiscal pack."
    }
  },
  {
    id: "ct2",
    professionalId: "p4",
    clientId: "c2",
    title: { ar: "متابعة وإدارة الأجور والاشتراكات الفلاحية", fr: "Gestion Sociale, Paie et Statuts Coopérative", en: "Coop Social Payroll and Benefits Auditing" },
    status: "active",
    startDate: "2026-02-15",
    endDate: "2027-02-14",
    value: 300000,
    scopeDescription: {
      ar: "حساب كشوف الرواتب الشهرية والاشتراكات للضمان الاجتماعي لأكثر من 30 عاملاً وتقديم التصريحات السنوية للضمان الاجتماعي والضرائب.",
      fr: "Traitement de la paie mensuelle, cotisations de sécurité sociale pour plus de 30 employés et déclarations réglementaires de fin d'année.",
      en: "Processing monthly payroll registers and social security contributions for above 30 agricultural employees and executing year-end statutory social returns."
    }
  },
  {
    id: "ct3",
    professionalId: "p3",
    clientId: "c3",
    title: { ar: "التدقيق المالي ومحافظة الحسابات القانونية", fr: "Commissariat aux Comptes & Certification légale", en: "Statutory Financial Auditing & Official Certification" },
    status: "active",
    startDate: "2026-03-01",
    endDate: "2026-08-31",
    value: 600000,
    scopeDescription: {
      ar: "مراقبة نظام الرقابة الداخلية وإجراء فحص جرد الأصول والمخزونات والصيدلانية والمصادقة على الحسابات السنوية لشركة تجارة الأدوية الجملة.",
      fr: "Audit légal complet, inventaire des stocks physiques, certification des états de synthèse de l'exercice pour une SARL pharmaceutique.",
      en: "Full legal audit, physical warehouse inventory checks, and formal certification of financial syntheses for a pharma distribution LLC."
    }
  },
  {
    id: "ct4",
    professionalId: "p2",
    clientId: "c1",
    title: { ar: "الاعتراض الجبائي ضد المراقبة والتحقق", fr: "Assistance Procédure de Vérification Fiscale", en: "Tax Audit Defense and Formal Administrative Appeals" },
    status: "pending",
    startDate: "2026-05-10",
    endDate: "2026-09-10",
    value: 250000,
    scopeDescription: {
      ar: "دراسة تقرير المفتشية وصياغة ردود الطعون الإدارية والتمثيل أمام لجان الطعن الولائية للحد من العبء الجبائي المفاجئ.",
      fr: "Revue des pièces justificatives, rédaction du mémoire de défense après fardeau fiscal et soutien actif de l'entreprise face aux inspecteurs.",
      en: "Reviewing company invoices, drafting administrative protest briefs after a tax assessment, and active delegation before the local tax panels."
    }
  },
  {
    id: "ct5",
    professionalId: "p2",
    clientId: "c4",
    title: { ar: "هيكلة الفوترة الدولية والجمارك الميسرة", fr: "Conseil Prix de Transfert et Douanes Logistique", en: "International Invoicing Strategy & Transfer Pricing" },
    status: "completed",
    startDate: "2025-06-01",
    endDate: "2025-12-31",
    value: 380000,
    scopeDescription: {
      ar: "تهيئة النماذج القانونية لأسعار التحويلات والاتفاقيات الدولية والتصدير، وتقليص أداء الجمارك لأسطول النقل اللوجستي الجزائري الكوري.",
      fr: "Optimisation de la fiscalité transfrontalière, prix de transfert, conformité douanière des cargaisons de l'Ouest vers l'Europe.",
      en: "Optimization of cross-border VAT flow, transfer pricing reports, and customs compliance for West-Algerian freight shipping to Southern Europe."
    }
  }
];

export const tasks: Task[] = [
  { id: "tk1", contractId: "ct1", title: { ar: "إعداد وإرسال تصريح الضرائب الشهري G50", fr: "Déclaration G50 mensuelle d'Avril", en: "Monthly G50 Tax declaration for April" }, deadline: "2026-05-20", status: "done", type: "tax-filing" },
  { id: "tk2", contractId: "ct1", title: { ar: "حساب وإرسال اشتراكات الضمان الاجتماعي CNAS", fr: "Déclaration sociale CNAS mensuelle", en: "Monthly CNAS social declarations" }, deadline: "2026-05-30", status: "in-progress", type: "declaration" },
  { id: "tk3", contractId: "ct2", title: { ar: "إعداد كشوف المرتبات لعمال الحقول والتحويل", fr: "Calcul des fiches de paie mensuelles agricoles", en: "Agricultural workers monthly payroll registers" }, deadline: "2026-05-31", status: "in-progress", type: "bookkeeping" },
  { id: "tk4", contractId: "ct2", title: { ar: "تسجيل الموظفين الجدد في صندوق الضمان الاجتماعي", fr: "Immatriculation CNAS des nouveaux saisonniers", en: "CNAS social enrollment for new agricultural seasonals" }, deadline: "2026-05-25", status: "todo", type: "declaration" },
  { id: "tk5", contractId: "ct1", title: { ar: "التعديل النهائي للميزانية ودفتر الأرباح والخسائر", fr: "Clôture de la liasse fiscale annuelle 2025", en: "Finalizing 2025 annual fiscal pack and balance sheet" }, deadline: "2026-06-15", status: "todo", type: "tax-filing" },
  { id: "tk6", contractId: "ct3", title: { ar: "مراجعة جرد الأدوية والمخازن والتحقق من القيمة", fr: "Audit physique de l'inventaire pharmacie", en: "Physical pharmacy inventory validation and costing review" }, deadline: "2026-05-28", status: "in-progress", type: "audit" },
  { id: "tk7", contractId: "ct3", title: { ar: "توليد تقرير المراقبة الأولية للجنة الجرد", fr: "Rapport d'audit intermédiaire de conformité", en: "Interim compliance and internal controls audit report" }, deadline: "2026-06-10", status: "todo", type: "audit" },
  { id: "tk8", contractId: "ct5", title: { ar: "أرشفة وثائق أسعار التحويلات والاتفاقية مع الجمارك", fr: "Classement et archivage final du dossier Douanes", en: "Final sorting and archiving of customs file" }, deadline: "2025-12-28", status: "done", type: "advisory" }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    clientName: "رياض بن يعقوب",
    company: "Dzair Tech Link LLC",
    wilayaName: { ar: "الجزائر", fr: "Alger", en: "Algiers" },
    rating: 5,
    comment: {
      ar: "موقع أكونيت وفر علينا الكثير من الوقت والبحث الطويل في الجزائر العاصمة. وجدنا مهنياً محاسباً بجودة عالية جداً يفهم جيداً طبيعة شركات السحاب والتكنولوجيا.",
      fr: "La plateforme AccoNet nous a épargné de longues recherches infructueuses à Alger. Nous avons trouvé un comptable agréé qui saisit l'univers de l'IT.",
      en: "AccoNet saved us weeks of cold searching in Algiers! We matched with a brilliant certified accountant who fully understands clean cloud SaaS technology."
    },
    date: "2026-04-12"
  },
  {
    id: "t2",
    clientName: "ياسمين بلقاسم",
    company: "Belgourmet Bio Sarl",
    wilayaName: { ar: "البليدة", fr: "Blida", en: "Blida" },
    rating: 5,
    comment: {
      ar: "متابعة الضمان الاجتماعي والملفات الزراعية بمنطقة البليدة تفترض دراية محلية دقيقة. المحاسبة التي وظفناها عبر أكونيت في غاية الاحترافية.",
      fr: "Le domaine social et agricole à Blida requiert des compétences très territoriales. Notre comptable d'AccoNet est à nos côtés tous les mois.",
      en: "Agricultural taxes at Blida demand highly specialized local expertise. Our AccoNet expert is hands-on and checks in on our farm books every month."
    },
    date: "2026-05-01"
  },
  {
    id: "t3",
    clientName: "إبراهيم بوالشعير",
    company: "Pharmalife Est",
    wilayaName: { ar: "قسنطينة", fr: "Constantine", en: "Constantine" },
    rating: 5,
    comment: {
      ar: "محافظ الحسابات الذي وجدناه في قسنطينة غيّر فكرتنا عن التدقيق القانوني. أصبح التدقيق فرصة حقيقية لتقوية الرقابة ولا نخشى لقاء مصلحة الضرائب.",
      fr: "Notre commissaire aux comptes à Constantine a fluidifié notre audit légal. L'audit est devenu un atout pour consolider notre contrôle d'opérations.",
      en: "Our statutory auditor in Constantine streamlined our audit. It shifted from being a stressful checking to an asset for reinforcing operations."
    },
    date: "2025-11-20"
  },
  {
    id: "t4",
    clientName: "سمير حموش",
    company: "Oran Logistique Express",
    wilayaName: { ar: "وهران", fr: "Oran", en: "Oran" },
    rating: 4.8,
    comment: {
      ar: "أكونيت هي الحل البديل الحقيقي لكل المشاكل والشكوك الجبائية للشركات الجزائرية الناشئة والصغرى. نوصي بها.",
      fr: "AccoNet est la véritable solution alternative pour lever les doutes fiscaux des PME algériennes. Nous recommandons vivement.",
      en: "AccoNet is a real game-changer for tackling tax doubts for growing Algerian SMEs. We highly recommend this digital network."
    },
    date: "2026-03-15"
  },
  {
    id: "t5",
    clientName: "نجيب بوسالم",
    company: "Sétif Plast Industrielle",
    wilayaName: { ar: "سطيف", fr: "Sétif", en: "Sétif" },
    rating: 4.9,
    comment: {
      ar: "القدرة على مراجعة ملفات وتخصصات الخبراء والتقييم الحقيقي من عملاء سابقين تجرية لم يسبق لها مثيل في الجزائر. تطبيق ثوري بحق.",
      fr: "Pouvoir consulter le profil, l'expertise vérifiée et les vrais avis d'anciens clients est une révolution en Algérie. Une réussite totale.",
      en: "Being able to read verified reviews, active accreditation tokens, and true client reports is unprecedented in Algeria. A remarkable tool."
    },
    date: "2026-02-10"
  },
  {
    id: "t6",
    clientName: "فاطمة الزهراء عيسى",
    company: "Kabylie Olive Agronome",
    wilayaName: { ar: "تيزي وزو", fr: "Tizi Ouzou", en: "Tizi Ouzou" },
    rating: 5,
    comment: {
      ar: "تواصل ممتاز وسهولة بالغة في تغيير اللغات وتبديل الاتجاه. تطبيق أكونيت يخدم المزارعين ومسيري الأعمال بكفاءة مبهرة.",
      fr: "Une navigation intuitive et trilingue qui simplifie grandement la vie des dirigeants. Bravo pour ce joyau tech !",
      en: "A seamless, trilingually optimized experience that enormously simplifies a director's duties. Kudos for this tech jewel."
    },
    date: "2026-05-18"
  }
];
