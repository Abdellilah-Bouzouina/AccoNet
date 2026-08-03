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
  // ADDED THESE TWO FIELDS TO SUPPORT PHONE AND ADDRESS DATA WITHIN THE CARD
  phone?: string;
  address?: Translation;
  avatarUrl?: string;
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
 { id: 1, code: "01", name: { ar: "أدرار", fr: "Adrar", en: "Adrar" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 2, code: "02", name: { ar: "الشلف", fr: "Chlef", en: "Chlef" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 3, code: "03", name: { ar: "الأغواط", fr: "Laghouat", en: "Laghouat" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 4, code: "04", name: { ar: "أم البواقي", fr: "Oum El Bouaghi", en: "Oum El Bouaghi" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 5, code: "05", name: { ar: "باتنة", fr: "Batna", en: "Batna" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 6, code: "06", name: { ar: "بجاية", fr: "Béjaïa", en: "Bejaia" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 7, code: "07", name: { ar: "بسكرة", fr: "Biskra", en: "Biskra" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 8, code: "08", name: { ar: "بشار", fr: "Béchar", en: "Bechar" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 9, code: "09", name: { ar: "البليدة", fr: "Blida", en: "Blida" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 10, code: "10", name: { ar: "البويرة", fr: "Bouira", en: "Bouira" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 11, code: "11", name: { ar: "تمنراست", fr: "Tamanrasset", en: "Tamanrasset" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 12, code: "12", name: { ar: "تبسة", fr: "Tébessa", en: "Tebessa" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 13, code: "13", name: { ar: "تلمسان", fr: "Tlemcen", en: "Tlemcen" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 14, code: "14", name: { ar: "تيارت", fr: "Tiaret", en: "Tiaret" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 15, code: "15", name: { ar: "تيزي وزو", fr: "Tizi Ouzou", en: "Tizi Ouzou" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 16, code: "16", name: { ar: "الجزائر", fr: "Alger", en: "Algiers" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 17, code: "17", name: { ar: "الجلفة", fr: "Djelfa", en: "Djelfa" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 18, code: "18", name: { ar: "جيجل", fr: "Jijel", en: "Jijel" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 19, code: "19", name: { ar: "سطيف", fr: "Sétif", en: "Setif" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 20, code: "20", name: { ar: "سعيدة", fr: "Saïda", en: "Saida" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 21, code: "21", name: { ar: "سكيكدة", fr: "Skikda", en: "Skikda" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 22, code: "22", name: { ar: "سيدي بلعباس", fr: "Sidi Bel Abbès", en: "Sidi Bel Abbes" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 23, code: "23", name: { ar: "عنابة", fr: "Annaba", en: "Annaba" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 24, code: "24", name: { ar: "قالمة", fr: "Guelma", en: "Guelma" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 25, code: "25", name: { ar: "قسنطينة", fr: "Constantine", en: "Constantine" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 26, code: "26", name: { ar: "المدية", fr: "Médéa", en: "Medea" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 27, code: "27", name: { ar: "مستغانم", fr: "Mostaganem", en: "Mostaganem" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 28, code: "28", name: { ar: "المسيلة", fr: "M'Sila", en: "M'Sila" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 29, code: "29", name: { ar: "معسكر", fr: "Mascara", en: "Mascara" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 30, code: "30", name: { ar: "ورقلة", fr: "Ouargla", en: "Ouargla" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 31, code: "31", name: { ar: "وهران", fr: "Oran", en: "Oran" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 32, code: "32", name: { ar: "البيض", fr: "El Bayadh", en: "El Bayadh" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 33, code: "33", name: { ar: "إليزي", fr: "Illizi", en: "Illizi" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 34, code: "34", name: { ar: "برج بوعريريج", fr: "Bordj Bou Arréridj", en: "Bordj Bou Arreridj" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 35, code: "35", name: { ar: "بومرداس", fr: "Boumerdès", en: "Boumerdes" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 36, code: "36", name: { ar: "الطارف", fr: "El Tarf", en: "El Tarf" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 37, code: "37", name: { ar: "تندوف", fr: "Tindouf", en: "Tindouf" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 38, code: "38", name: { ar: "تيسمسيلت", fr: "Tissemsilt", en: "Tissemsilt" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 39, code: "39", name: { ar: "الوادي", fr: "El Oued", en: "El Oued" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 40, code: "40", name: { ar: "خنشلة", fr: "Khenchela", en: "Khenchela" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 41, code: "41", name: { ar: "سوق أهراس", fr: "Souk Ahras", en: "Souk Ahras" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 42, code: "42", name: { ar: "تيبازة", fr: "Tipaza", en: "Tipaza" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 43, code: "43", name: { ar: "ميلة", fr: "Mila", en: "Mila" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 44, code: "44", name: { ar: "عين الدفلى", fr: "Aïn Defla", en: "Ain Defla" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 45, code: "45", name: { ar: "النعامة", fr: "Naâma", en: "Naama" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 46, code: "46", name: { ar: "عين تموشنت", fr: "Aïn Témouchent", en: "Ain Temouchent" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 47, code: "47", name: { ar: "غرداية", fr: "Ghardaïa", en: "Ghardaia" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 48, code: "48", name: { ar: "غليزان", fr: "Relizane", en: "Relizane" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 49, code: "49", name: { ar: "تيميمون", fr: "Timimoun", en: "Timimoun" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 50, code: "50", name: { ar: "برج باجي مختار", fr: "Bordj Badji Mokhtar", en: "Bordj Badji Mokhtar" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 51, code: "51", name: { ar: "أولاد جلال", fr: "Ouled Djellal", en: "Ouled Djellal" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 52, code: "52", name: { ar: "بني عباس", fr: "Béni Abbès", en: "Beni Abbes" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 53, code: "53", name: { ar: "عين صالح", fr: "In Salah", en: "In Salah" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 54, code: "54", name: { ar: "عين قزام", fr: "In Guezzam", en: "In Guezzam" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 55, code: "55", name: { ar: "تقرت", fr: "Touggourt", en: "Touggourt" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 56, code: "56", name: { ar: "جانت", fr: "Djanet", en: "Djanet" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 57, code: "57", name: { ar: "المغير", fr: "El M'Ghair", en: "El M'Ghair" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 58, code: "58", name: { ar: "المنيعة", fr: "El Meniaa", en: "El Meniaa" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 59, code: "59", name: { ar: "أولاد رشاش", fr: "Ouled Rechache", en: "Ouled Rechache" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 60, code: "60", name: { ar: "بوقطب", fr: "Bougtob", en: "Bougtob" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 61, code: "61", name: { ar: "مسعد", fr: "Messaad", en: "Messaad" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 62, code: "62", name: { ar: "العلمة", fr: "El Eulma", en: "El Eulma" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 63, code: "63", name: { ar: "بوسعادة", fr: "Bou Saâda", en: "Bou Saada" }, region: { ar: "الشمال الوسط", fr: "Nord-Centre", en: "North-Centre" } },
  { id: 64, code: "64", name: { ar: "فرندة", fr: "Frenda", en: "Frenda" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 65, code: "65", name: { ar: "مغنية", fr: "Maghnia", en: "Maghnia" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 66, code: "66", name: { ar: "عين وسارة", fr: "Aïn Oussera", en: "Ain Oussera" }, region: { ar: "الجنوب", fr: "Sud", en: "South" } },
  { id: 67, code: "67", name: { ar: "بريكة", fr: "Barika", en: "Barika" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } },
  { id: 68, code: "68", name: { ar: "قصر الشلالة", fr: "Ksar Chellala", en: "Ksar Chellala" }, region: { ar: "الشمال الغربي", fr: "Nord-Ouest", en: "North-West" } },
  { id: 69, code: "69", name: { ar: "شلوغ العيد", fr: "Chelghoum Laïd", en: "Chelghoum Laid" }, region: { ar: "الشمال الشرقي", fr: "Nord-Est", en: "North-East" } }
];

export const professionals: Professional[] = [
  {
    id: "p1",
    name: {
      ar: "مجاهد عبد الرحمان",
      fr: "Medjahed Abderrahmane",
      en: "Medjahed Abderrahmane"
    },
    initials: "MA",
    avatarBg: "bg-teal-700 text-white",
    specialty: "statutory-auditor",
    wilayaId: 16,
    wilayaName: { ar: "غليزان", fr: "Relizane", en: "Relizan" },
    rating: 4.9,
    reviewCount: 38,
    available: true,
    hourlyRate: 6500,
    yearsExperience: 20, 
    accreditationNumber: "1929",
    completionRate: 98,
    clientsServed: 124,
    
    // UPDATED PHONE NUMBER AND TRANSLATED ADDRESS OBJECT HERE
    phone: "+213 5600220683",
    address: {
      ar: "حي 121 قطعة مونفيزو رقم 06 غليزان",
      fr: "Cité 121 Lot Monviso N° 06, Relizane",
      en: "121 Monviso Allotment Quarter, No. 06, Relizane"
    },

    bio: {
      ar: "محافظ حسابات ومحاسب معتمد بخبرة تفوق 15 سنة.",
      fr: "Commissaire au comptes et comptable agréé, avec plus de 15 ans d'expérience.",
      en: "Accountant and Certified Public Accountant with over 15 years of experience."
    },
    services: [
      {
        title: { ar: "إعداد التصريحات الجبائية وشبه الجبائية", fr: "مسك المحاسبة", en: "تقديم الاستشارات الجبائية" },
      },
      {
        title: { ar: "مسك المحاسبة", fr: " Tenue de comptabilité", en: " bookkeeping services" },
      },
      {
        title: { ar: "تقديم الاستشارات الجبائية", fr: "Conseil fiscal", en: "Tax advisory"},
      }
    ],
    reviews: [
      {
        id: "r1_1",
        clientName: "Yassine K.",
        rating: 5,
        comment: {
          ar: "الاستاذ مجاهد محترف ومتمكن جداً. ساعد شركتنا في مختلف الالتزامات الجبائية .",
          fr: "Mr.Medjahed est un professionnel très compétent. Il a aidé notre entreprise à remplir diverses obligations fiscales.",
          en: "Mr. Medjahed is a highly competent professional. He has helped our company fulfill various tax obligations."
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
      {
        year: "2016",
        title: {
          ar: "أستاذ مكلف بالدروس والأعمال الموجهة - المركز الجامعي غليزان",
          fr: "Professeur Chargé de Cours / TD Module Comptabilité",
          en: "Lecturer / Seminar Instructor in Accounting"
        },
        description: {
          ar: "تقديم مقياس المحاسبة في المركز الجامعي أحمد زبانة بغليزان.",
          fr: "Enseignement du module Comptabilité au Centre Universitaire Ahmed Zabana – Relizane.",
          en: "Taught the Accounting module at the Ahmed Zabana University Center – Relizane."
        }
      },
      {
        year: "2014",
        title: {
          ar: "خبير في تقييم العتاد والمعدات",
          fr: "Expertise de matériels",
          en: "Equipment & Machinery Valuation Expert"
        },
        description: {
          ar: "تقييم عتاد شركات البناء، الأشغال العمومية، الأشغال الريفية والهيدروليكية وغيرها.",
          fr: "Expertise de matériels pour entreprises de travaux bâtiments, travaux publics, travaux hydrauliques et autres.",
          en: "Equipment valuation for building construction, public works, and hydraulic engineering companies, among others."
        }
      },
      {
        year: "2012 - 2013",
        title: {
          ar: "مرافق جبائي للشركات متعددة الجنسيات",
          fr: "Accompagnateur fiscal pour des sociétés multinationales",
          en: "Tax Advisor for Multinational Corporations"
        },
        description: {
          ar: "تقديم الاستشارات والمرافقة الجبائية لشركات متعددة الجنسيات (جزائرية-إسبانية).",
          fr: "Accompagnement et conseil fiscal pour des sociétés multinationales (Algéro-Espagnole).",
          en: "Provided tax guidance and compliance support for multinational joint ventures (Algerian-Spanish)."
        }
      },
      {
        year: "2010",
        title: {
          ar: "اعتماد محافظ حسابات / محاسب معتمد",
          fr: "Agrément N° 1929 Commissaire Aux Comptes / Comptable",
          en: "Accreditation No. 1929 Statutory Auditor / Accountant"
        },
        description: {
          ar: "الحصول على الاعتماد الرسمي من المنظمة الوطنية للخبراء المحاسبين ومحافظي الحسابات والمحاسبين المعتمدين (ONECC).",
          fr: "Obtention de l'agrément auprès المصف الوطني للخبراء المحاسبين ومحافظي الحسابات والمحاسبين المعتمدين (ONECC) Algérien.",
          en: "Obtained official certification from the Algerian National Organization of Chartered Accountants, Auditors, and Certified Accountants (ONECC)."
        }
      },
      {
        year: "2007 - 2010",
        title: {
          ar: "محاسب رئيسي - مكتب خبرة محاسبية",
          fr: "Comptable Principal, Cabinet d’expertise comptable",
          en: "Senior Accountant, Accounting & Audit Firm"
        },
        description: {
          ar: "العمل بمكتب محافظ الحسابات بشير العزار خليفة بغليزان (التدقيق، تصفية الحسابات، مسك المحاسبة، وتسيير الموظفين).",
          fr: "Poste occupé au Cabinet BACHIR ELEZAAR Khélifa (Relizane): Audit, Assainissement des Comptes, Tenue de Comptabilité, Gestion du Personnel.",
          en: "Position held at the Bachir Elezaar Khelifa Firm (Relizane): Auditing, account cleanup, bookkeeping, and personnel management."
        }
      },
      {
        year: "2006 - 2007",
        title: {
          ar: "رئيس قسم المحاسبة - المديرية الجهوية للشركة الجزائرية للتأمينات (SAA)",
          fr: "Chef de Section Comptabilité, Direction Régionale SAA",
          en: "Accounting Section Head, SAA Regional Directorate"
        },
        description: {
          ar: "رئيس قسم المحاسبة على مستوى وحدة غليزان التابعة للشركة الجزائرية للتأمينات (SAA).",
          fr: "Chef de Section Comptabilité au niveau de la Direction Régionale de la SAA, Unité de Relizane.",
          en: "Head of the Accounting Section at the SAA Regional Directorate, Relizane Unit."
        }
      }
    ]
  }
];

export const clients: Client[] = [
  {
    id: "c1",
    companyName: "Lubroil",
    sector: { ar: "تكنولوجيا المعلومات والبرمجيات", fr: "Technologies de l'information", en: "Information Technology" },
    wilayaId: 16,
    wilayaName: { ar: "غليزان", fr: "Relizane", en: "Relizan" },
    logoInitials: "LO",
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
    title: { ar: "مرافقة محاسبية وجبائية", fr: "Accompagnement comptable et fiscal ", en: "Accounting and Tax Support " },
    status: "active",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    value: 0,
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
  { id: "tk5", contractId: "ct1", title: { ar: "التعديل النهائي للميزانية وجدول حسابات النتائج", fr: "La version définitive du budget et du compte des résultats", en: "Final Amendment to the Budget and Statement of Income and Expenses" }, deadline: "2026-04-30", status: "todo", type: "tax-filing" },
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