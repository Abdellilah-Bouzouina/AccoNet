export interface TranslationDictionary {
  [key: string]: {
    ar: string;
    fr: string;
    en: string;
  };
}

export const specialtiesTranslations = {
  "chartered-accountant": {
    ar: "محاسب معتمد",
    fr: "Comptable Agréé",
    en: "Certified Accountant"
  },
  "statutory-auditor": {
    ar: "محافظ حسابات",
    fr: "Commissaire aux Comptes",
    en: "Statutory Auditor"
  },
  "certified-accountant": {
    ar: "خبير محاسب",
    fr: "Expert-Comptable",
    en: "Chartered Accountant"
  },
  "tax-consultant": {
    ar: "مستشار جبائي",
    fr: "Conseiller Fiscal",
    en: "Tax Consultant"
  },
  "judicial-expert": {
    ar: "خبير قضائي",
    fr: "Expert Judiciaire",
    en: "Judicial Expert"
  }
};

export const translations: TranslationDictionary = {
  // Navigation / AccoNet Brand
  brandName: {
    ar: "أكونيت",
    fr: "AccoNet",
    en: "AccoNet"
  },
  brandSlogan: {
    ar: "أول منصة رقمية لمهنيي المحاسبة والجباية في الجزائر",
    fr: "1ère plateforme des professionnels du chiffre et de la fiscalité en Algérie",
    en: "منصة رقمية تربط المهنيين المحاسبيين بالمتعاملين الاقتصاديين"
  },
  findProButton: {
    ar: "إيجاد مهني",
    fr: "Trouver un Professionnel",
    en: "Find a Professional"
  },
  joinAsProButton: {
    ar: "انضمام كمهني",
    fr: "Rejoindre en tant que Pro",
    en: "Join as Pro"
  },
  toolsLink: {
    ar: "الأدوات الذكية",
    fr: "Outils Intelligents",
    en: "AI Tools"
  },
  searchLink: {
    ar: "بحث",
    fr: "Recherche",
    en: "Search"
  },
  loginLink: {
    ar: "تسجيل الدخول",
    fr: "Connexion",
    en: "Log In"
  },
  registerLink: {
    ar: "فتح حساب",
    fr: "Inscription",
    en: "Register"
  },
  logout: {
    ar: "تسجيل الخروج",
    fr: "Déconnexion",
    en: "Log Out"
  },
  about: {
    ar: "حول",
    fr: "À propos",
    en: "About"
  },

  // Landing Page Hero
  heroTitle: {
    ar: "أوجد أفضل المهنيين من مجال المحاسبة في الجزائر",
    fr: "Trouvez le meilleur partenaire comptable & fiscal pour votre entreprise en Algérie",
    en: "Find the Best Accounting & Tax Partners for Your Business in Algeria"
  },
  heroSubtitle: {
    ar: "منصة تربط بين المهنيين والمتعاملين الاقتصاديين عبر 69 ولاية",
    fr: "Une plateforme d'élite reliant PME, startups et coopératives avec des experts-comptables agréés et conseillers fiscaux sur les 48 wilayas.",
    en: "An elite platform connecting SMEs, startups, and agricultural coops with certified chartered accountants and tax advisers across all 48 wilayas."
  },
  heroSearchPlaceholder: {
    ar: "مثال: ميزانية سنوية، G50، أسعار تحويل...",
    fr: "Ex: bilan annuel, audit, déclaration G50...",
    en: "Ex: annual balance sheet, G50, transfer pricing..."
  },
  allWilayas: {
    ar: "كل الولايات",
    fr: "Toutes les Wilayas",
    en: "All Wilayas"
  },
  allSpecialties: {
    ar: "كل التخصصات",
    fr: "Toutes les Spécialités",
    en: "All Specialties"
  },
  searchBtn: {
    ar: "ابحث الآن",
    fr: "Rechercher",
    en: "Search Now"
  },

  // Stats Counters
  statPros: {
    ar: "+120 مهني معتمد",
    fr: "+120 Experts Agréés",
    en: "+120 Approved Experts"
  },
  statProsSub: {
    ar: "مسجلين في المنظمات الوطنية",
    fr: "Inscrits aux conseils nationaux",
    en: "Registered in national boards"
  },
  statWilayas: {
    ar: "69 ولاية مغطاة",
    fr: "48 Wilayas Couvertes",
    en: "69 Wilayas Covered"
  },
  statWilayasSub: {
    ar: "من العاصمة إلى تمنراست",
    fr: "D'Alger à Tamanrasset",
    en: "From Algiers to Tamanrasset"
  },
  statBusinesses: {
    ar: "+450 شركة مستفيدة",
    fr: "+450 PME Accompagnées",
    en: "+450 Supported SMEs"
  },
  statBusinessesSub: {
    ar: "شركات تكنولوجية ومؤسسات صناعية",
    fr: "Startups et industries majeures",
    en: "SaaS startups and manufacturers"
  },

  // Featured Pros
  featuredTitle: {
    ar: "أبرز المهنيين المتاحين هذا الأسبوع",
    fr: "Experts vedettes disponibles cette semaine",
    en: "Featured Available Experts of the Week"
  },
  featuredSubtitle: {
    ar: "ملفات شخصية تم التحقق من أسمائها، أرقام اعتمادها، وتقييماتها الحقيقية من طرف مدراء شركات جزائرية.",
    fr: "Profils vérifiés avec numéro d'agrément officiel et notes authentiques émises par des chefs d'entreprise.",
    en: "Verified profiles with official accreditation number and genuine ratings from local company executives."
  },

  // How it works
  howTitle: {
    ar: "كيف تعمل منصة أكونيت؟",
    fr: "Comment fonctionne AccoNet ?",
    en: "How does AccoNet work?"
  },
  howStep1Title: {
    ar: "1. حدد احتياجك المحاسبي",
    fr: "1. Décrivez votre besoin",
    en: "1. Describe Your Accounting Need"
  },
  howStep1Desc: {
    ar: "اختر نوع الخدمة التي تبحث عنها: تعبئة G50 شهرية، تدقيق حسابات، أو مرافقة جبائية وقانونية.",
    fr: "Choisissez le service requis: tenue de comptes, liasse fiscale, régularisation d'impôts.",
    en: "Select the required services: monthly bookkeeping, final fiscal return, tax regularizations."
  },
  howStep2Title: {
    ar: "2. قارن بين الخبراء المعتمدين",
    fr: "2. Comparez les experts",
    en: "2. Compare Verified Experts"
  },
  howStep2Desc: {
    ar: "تصفح مكاتب الخبرة الحقيقية، قارن تكلفة الساعة، سنوات الخبرة، المراجعات، وأعداد ملفات العملاء السابقة.",
    fr: "Parcourez les agréments réels, les tarifs horaires, les années d'expérience et les avis de clients.",
    en: "Browse verified credentials, hourly rates, years in practice, and real client reviews."
  },
  howStep3Title: {
    ar: "3. تعاقد كلياً بأمان",
    fr: "3. Créez un contrat transparent",
    en: "3. Lock in Secure Contracts"
  },
  howStep3Desc: {
    ar: "وفرنا بيئة رقمية لصياغة حدود المهام وتوقيتها والالتزامات المالية بشكل رسمي ومثبت.",
    fr: "Nous générons des contrats types sécurisés avec livrables, jalons et budgets clairs.",
    en: "We deploy standard digital engagement letters with unambiguous scopes, deadlines, and project fees."
  },
  howStep4Title: {
    ar: "4. تتبع الإنجاز وادفع بسهولة",
    fr: "4. Suivez et collaborez",
    en: "4. Track Progress & Collaborate"
  },
  howStep4Desc: {
    ar: "راقب سير تسليم التصريحات قبل انقضاء المواعيد الجبائية عبر لوحة تتبع تفاعلية في غاية البساطة والذكاء.",
    fr: "Visualisez les étapes clés et échéances CNAS/G50 via votre tableau de bord interactif.",
    en: "Preview critical milestones, tax due dates, and CNAS filings through your shared smart dashboard."
  },

  // AI Tools Teaser
  toolsTitle: {
    ar: "أدوات الذكاء الاصطناعي والمحاسبة الذكية",
    fr: "Outils Intelligents & Simulateurs de Gestion",
    en: "Smart Tools & Tax Simulators"
  },
  toolsSubtitle: {
    ar: "وفرنا لك أدوات متطورة لتبسيط المهام المحاسبية اليومية محلياً. جرب محاكاة التصريحات وفحص الوثائق فورياً.",
    fr: "Découvrez nos démonstrations d'automatisation comptable adaptées à la réglementation algérienne.",
    en: "Explore custom interactive tools tuned to Algerian regulations, available exclusively online."
  },
  tryToolBtn: {
    ar: "تجربة الأداة التفاعلية",
    fr: "Démarrer l'outil Interactif",
    en: "Try Interactive Tool"
  },

  // Search screen
  searchTitle: {
    ar: "البحث عن المهنيين والمكاتب",
    fr: "Trouvez vos professionnels du chiffre",
    en: "Find Certified Financial Professionals"
  },
  resultsCount: {
    ar: "خبراء مطابقون لبحثك",
    fr: "experts correspondent à vos critères",
    en: "experts match your search filters"
  },
  filterBy: {
    ar: "تصفية النتائج",
    fr: "Filtrer les résultats",
    en: "Filter Results"
  },
  sortBy: {
    ar: "ترتيب حسب",
    fr: "Trier par",
    en: "Sort By"
  },
  sortRating: {
    ar: "التقييم (الأعلى أولاً)",
    fr: "Note (Élevée en premier)",
    en: "Rating (Highest first)"
  },
  sortPriceAsc: {
    ar: "السعر (الأقل أولاً)",
    fr: "Prix (Ordre croissant)",
    en: "Price (Lowest first)"
  },
  sortPriceDesc: {
    ar: "السعر (الأعلى أولاً)",
    fr: "Prix (Ordre décroissant)",
    en: "Price (Highest first)"
  },
  sortExperience: {
    ar: "سنوات الخبرة (الأقدم أولاً)",
    fr: "Expérience (Plus qualifiés d'abord)",
    en: "Experience (Most senior first)"
  },
  minRating: {
    ar: "الحد الأدنى للتقييم",
    fr: "Note minimale",
    en: "Minimum Rating"
  },
  priceRange: {
    ar: "مستوى السعر بالساعة",
    fr: "Tarif horaire max",
    en: "Max Hourly Rate (DZD)"
  },
  availabilityLabel: {
    ar: "متاح فوراً للعمل",
    fr: "Disponible immédiatement",
    en: "Available Immediately"
  },
  resetFilters: {
    ar: "إعادة تعيين المرشحات",
    fr: "Réinitialiser les filtres",
    en: "Reset Filters"
  },
  viewProfile: {
    ar: "عرض الملف الشخصي",
    fr: "Voir le Profil",
    en: "View Profile"
  },
  perHour: {
    ar: "ساعة / دج",
    fr: "DZD / heure",
    en: "DZD / hour"
  },
  accreditationLabel: {
    ar: "رقم الاعتماد رسمي",
    fr: "Agrément N°",
    en: "Official Accreditation N°"
  },
  expYears: {
    ar: "سنة خبرة",
    fr: "ans d'expérience",
    en: "years experience"
  },
  availableStatus: {
    ar: "متاح لاستقبال المشاريع",
    fr: "Disponible",
    en: "Available"
  },
  busyStatus: {
    ar: "مشغول حالياً بكامل الطاقة",
    fr: "Indisponible",
    en: "Fully Booked"
  },

  // Professional Profile Page
  tabAbout: {
    ar: "حول المهني",
    fr: "À propos",
    en: "About"
  },
  tabServices: {
    ar: "الخدمات والأسعار",
    fr: "Services & Tarifs",
    en: "Services & Rates"
  },
  tabReviews: {
    ar: "مراجعات العملاء",
    fr: "Avis Clients",
    en: "Client Reviews"
  },
  tabExperience: {
    ar: "المسيرة المهنية",
    fr: "Expérience & Historique",
    en: "Professional Timeline"
  },
  hireMeNow: {
    ar: "طلب توظيف المهني",
    fr: "Embaucher l'Expert",
    en: "Hire This Expert"
  },
  sendMessage: {
    ar: "إرسال رسالة استفسار",
    fr: "Envoyer un Message",
    en: "Send Message"
  },
  profileStatsCompleted: {
    ar: "معدل إنجاز المشاريع",
    fr: "Taux de complétion",
    en: "Project Completion Rate"
  },
  profileStatsServed: {
    ar: "شركات تم مرافقتها",
    fr: "Entreprises accompagnées",
    en: "Businesses Accompanied"
  },
  profileHourlyRateSpec: {
    ar: "التسعير المرجعي بالساعة",
    fr: "Tarif horaire de référence",
    en: "Standard Hourly Rate"
  },
  contactToDiscuss: {
    ar: "تواصل لمناقشة عقد مغلق مخصص",
    fr: "Contactez pour un devis forfaitaire",
    en: "Get in touch for custom monthly flat-rates"
  },
  reviewsPlaceholderNoReviews: {
    ar: "لا توجد مراجعات مكتوبة بعد لهذا الملف. كن أول من يعقد اتفاقية ويكتب تقييماً.",
    fr: "Aucun avis écrit pour le moment. Soyez la première entreprise à laisser une évaluation !",
    en: "No written reviews available yet. Be the first local company to rate and record feedback."
  },

  // Client Dashboard
  clientWelcome: {
    ar: "أهلاً بك،",
    fr: "Bienvenue, Espace Administration -",
    en: "Welcome, Corporate Administration Area -"
  },
  dashboardSidebarTitle: {
    ar: "لوحة التحكم",
    fr: "Panneau de Gestion",
    en: "Management Center"
  },
  activeContractsLabel: {
    ar: "عقود سارية المفعول",
    fr: "Contrats Actifs",
    en: "Active Service Contracts"
  },
  pendingDocumentsLabel: {
    ar: "الوثائق المعلقة",
    fr: "Documents en Attente",
    en: "Pending PDF Documents"
  },
  dashboardTasksActive: {
    ar: "التصريحات الجارية",
    fr: "Déclarations en Cours",
    en: "In-Progress Claims"
  },
  upcomingDeadlinesTitle: {
    ar: "المواعيد والآجال الجبائية القادمة",
    fr: "Échéances réglementaires à venir",
    en: "Critical Upcoming Regulatory Deadlines"
  },
  activeServiceContractsTitle: {
    ar: "العقود النشطة مع الخبراء",
    fr: "Suivi des contrats avec vos experts",
    en: "Follow-up of Active Contracts"
  },
  contractValueLabel: {
    ar: "ميزانية العقد الكلي",
    fr: "Valeur totale",
    en: "Total Contract Value"
  },
  contractTimelineLabel: {
    ar: "الفترة الزمنية",
    fr: "Période légale",
    en: "Statutory Range"
  },
  recentActionsLabel: {
    ar: "سجل العمليات الأخير",
    fr: "Historique d'activité",
    en: "Recent Activity Log"
  },

  // Professional Dashboard
  proWelcome: {
    ar: "مرحبًا بك، الأستاذ",
    fr: "Espace Professionnel - Cabinet de Me.",
    en: "Professional Workspace - Office of Mr/Ms."
  },
  proStatsClients: {
    ar: "عملاء نشطون",
    fr: "Clients Actifs",
    en: "Active Clients"
  },
  proStatsEarnings: {
    ar: "أرباح الشهر المتوقعة",
    fr: "Honoraires du Mois",
    en: "Projected Month Earnings"
  },
  taskInboxTitle: {
    ar: "مركز إدارة المهام والتصريحات للعملاء",
    fr: "Boîte de réception des tâches",
    en: "Client Tasks Inbox"
  },
  earningsBarChartTitle: {
    ar: "معدل النمو الشهري المكتسب (دج)",
    fr: "Évolution mensuelle des honoraires (DZD)",
    en: "Monthly Revenue Growth Summary (DZD)"
  },
  earningsMockDisclaimer: {
    ar: "مستخرج من التصريحات وعقود أكونيت النشطة المؤكدة.",
    fr: "Généré sur la base des contrats signés sur AccoNet.",
    en: "Derived from formally signed engagement agreements via AccoNet."
  },

  // AI Tools page
  aiToolsHeroTitle: {
    ar: "شاشات محاكاة الأدوات المحاسبية الرقمية",
    fr: "Simulateurs comptables innovants (Showcase UI)",
    en: "Interactive Accounting Simulators Showcase"
  },
  aiToolsHeroSub: {
    ar: "أدناه نموذج تفاعلي لأدواتنا الرقمية المدمجة. أدخل معطيات محاكاة لتجربة أثر الذكاء الاصطناعي مع القوانين الجزائرية.",
    fr: "Insérez de fausses variables pour exécuter et tester notre démonstrateur d'automatisation fiscale en temps réel.",
    en: "Insert sample dynamic values below to interact with and test our Algerian-tailored automation sandbox."
  },
  ocrTitle: {
    ar: "محلل الإيصالات الذكي (OCR Parser)",
    fr: "Lecteur intelligent de reçus (OCR)",
    en: "Invoice Receipt Scanner (AI OCR)"
  },
  ocrDesc: {
    ar: "رفع الفواتير باللغة العربية أو الفرنسية ليقوم الذكاء الاصطناعي باستخراج الاسم، NIF، ومعدل TVA وثبتها فورياً.",
    fr: "Extrayez automatiquement le NIF, le TVA et le total en soumettant un scan de facture algérienne.",
    en: "Submit PDF invoices in French or Arabic to extract Algerian NIF, VAT brackets, and final cash sums instantly."
  },
  g50SimTitle: {
    ar: "مساعد محاكاة تصريح G50 الذكي",
    fr: "Assistant de Saisie de Déclaration G50",
    en: "AccoNet G50 Smart Assistant"
  },
  g50SimDesc: {
    ar: "توليد تلقائي للرموز الجبائية الشهرية ومبالغ TAP والرسوم استناداً لبيانات المبيعات والمشتريات المدخلة.",
    fr: "Générez la simulation de vos droits de timbre, de TAP et de l'IRG de vos fiches de paie.",
    en: "Quickly simulate monthly Turnover Tax (TAP), Wage tax (IRG), and stamp taxes based on custom inputs."
  },
  auditSimTitle: {
    ar: "مدقق الملاحظات والحسابات الوقائي",
    fr: "Détecteur de Risques et Audit de Balance",
    en: "Algerian Financial Balance Auditor"
  },
  auditSimDesc: {
    ar: "مسح ميزانيتك وميزان المراجعة للتحقق من تطابقها مع النظام المحاسبي المالي الجزائري (SCF).",
    fr: "Contrôle automatique de votre balance comptable face aux exigences du SCF algérien.",
    en: "Automated scanner assessing your trial balance sheets against local SCF accounting standards."
  },
  executeSimulation: {
    ar: "تحليل وتوليد النماذج",
    fr: "Lancer la Simulation",
    en: "Execute Simulation"
  },
  simulatedOutput: {
    ar: "المخرجات والنتيجة المحوسبة",
    fr: "Résultat de la simulation",
    en: "Simulated Report Outflow"
  },

  // Auth pages
  loginTitle: {
    ar: "تسجيل الدخول إلى حسابك في أكونيت",
    fr: "Connexion à votre espace AccoNet",
    en: "Sign In to Your AccoNet Account"
  },
  registerTitle: {
    ar: "إنشاء حساب جديد في أكونيت",
    fr: "Créer votre profil AccoNet",
    en: "Create Your AccoNet Account"
  },
  accountTypeLabel: {
    ar: "أنت تقوم بالتسجيل كـ:",
    fr: "Vous vous inscrivez en tant que :",
    en: "You are registering as:"
  },
  isClientLabel: {
    ar: "صاحب شركة / مسير (أبحث عن محاسب)",
    fr: "Dirigeant d'entreprise (cherche un expert)",
    en: "Business/SME Director (Looking to Hire)"
  },
  isProLabel: {
    ar: "مهني معتمد ورأس مال مالي",
    fr: "Professionnel de comptabilité (offre des services)",
    en: "Certified Accounting Professional (Offering Services)"
  },
  fieldEmail: {
    ar: "البريد الإلكتروني للعمل",
    fr: "Adresse e-mail professionnelle",
    en: "Professional Email Address"
  },
  fieldPassword: {
    ar: "كلمة المرور",
    fr: "Mot de passe",
    en: "Password"
  },
  fieldCompanyName: {
    ar: "اسم الشركة والمؤسسة",
    fr: "Nom de l'entreprise",
    en: "Corporate Entity Name"
  },
  fieldWilaya: {
    ar: "الولاية المقر",
    fr: "Wilaya du siège principal",
    en: "Primary Wilaya HQ"
  },
  fieldSpecialty: {
    ar: "التخصص المهني الرئيسي",
    fr: "Spécialité comptable",
    en: "Primary Specialty Scope"
  },
  fieldAccreditation: {
    ar: "رقم قيد الاعتماد الوطني",
    fr: "Numéro d'agrément officiel",
    en: "Official Accredit Register N°"
  },
  accNumPlaceholder: {
    ar: "مثال: CNEC/2020/2210",
    fr: "Ex: CNEC/2020/2210",
    en: "Ex: CNEC/2020/2210"
  },
  authSuccessHeading: {
    ar: "مرحباً بك في أكونيت!",
    fr: "Bienvenue sur AccoNet !",
    en: "Welcome to AccoNet!"
  },
  authSuccessMsg: {
    ar: "تم محاكاة المصادقة والدخول بنجاح لدواعي العرض التقديمي.",
    fr: "La session simulée est initiée avec succès pour la démonstration.",
    en: "Simulated demonstration session successfully initialized. Welcome aboard."
  },
  dontHaveAccount: {
    ar: "ليس لديك حساب؟",
    fr: "Pas encore de compte ?",
    en: "Don't have an account?"
  },
  alreadyHaveAccount: {
    ar: "لديك حساب بالفعل؟",
    fr: "Déjà inscrit ?",
    en: "Already have an account?"
  },

  // Interactive hire triggers & alerts
  alertHireSuccessTitle: {
    ar: "تم إرسال طلب التوظيف بنجاح!",
    fr: "Demande d'embauche transmise !",
    en: "Hire Request Dispatched Successfully!"
  },
  alertHireSuccessBody: {
    ar: "لقد تم إرسال مسودة العقد المبدئية وقيمتها للمهني. سيقوم بمراجعة طلبك خلال 24 ساعة والتواصل معكم.",
    fr: "Votre brouillon de contrat a été envoyé à l'expert. Il examinera votre proposition sous 24h.",
    en: "Your draft engagement proposal has been dispatched. The expert will review and reply within 24 hours."
  },
  alertMessageSuccessTitle: {
    ar: "تم إرسال الرسالة بنجاح!",
    fr: "Message envoyé avec succès !",
    en: "Message Sent Successfully!"
  },
  alertMessageSuccessBody: {
    ar: "تم تسليم استفسارك لصندوق التراسل السريع الخاص بالمهني. ستصلك الإشعارات فور الرد.",
    fr: "Votre message est maintenant visible dans l'espace de messagerie de l'expert.",
    en: "Your query has been sent to the expert's mailbox. You'll receive real-time updates as they respond."
  },
  closeBtn: {
    ar: "إغلاق",
    fr: "Fermer",
    en: "Close"
  },
  seeDemoDashboard: {
    ar: "زيارة لوحة العمل التجريبية",
    fr: "Visiter l'espace de démonstration",
    en: "Visit Demo Workspace Dashboard"
  },
  
  // New Login Keys
  nationalGateway: {
    ar: "المنصة الوطنية الموحدة",
    fr: "Plateforme Nationale",
    en: "National Gateway Platform"
  },
  loginHeroTitle: {
    ar: "ربط الشركات بأفضل المهنيين المعتمدين في الجزائر.",
    fr: "Connecter les entreprises aux meilleurs professionels en Algérie.",
    en: "Connecting companies with authorized professionals across Algerian territory."
  },
    onccRegistered: {
    ar: "إطار تنظيمي معتمد من المنظمة الوطنية (ONCC)",
    fr: "CADRE RÉGLEMENTAIRE AGRÉÉ PAR L'ONCC",
    en: "ONCC REGISTERED AUDITING REGULATION FRAMEWORK"
  },
  secureTerminalAccess: {
    ar: "وصول آمن للعملاء",
    fr: "ACCÈS SÉCURISÉ TERMINAL",
    en: "SECURE CLIENT TERMINAL ACCESS"
  },
  forgotPassword: {
    ar: "نسيت؟",
    fr: "Oublié?",
    en: "Forgot?"
  },
  simulationTerminals: {
    ar: "نوافذ الولوج السريع للمحاكاة",
    fr: "Terminaux d'Accès Rapide de Simulation",
    en: "Simulation Quick Access Terminals"
  },
  clientBusinessLabel: {
    ar: "شركة عميلة",
    fr: "Entreprise Cliente",
    en: "Client Business"
  },
  accountantProLabel: {
    ar: "محاسب مهني",
    fr: "Expert Comptable",
    en: "Accountant Pro"
  },
  platformAdminLabel: {
    ar: "مسؤول المنصة",
    fr: "Admin Plateforme",
    en: "Platform Admin"
  },
  
  // New Landing Page Keys
  heroSlogan: {
    ar: "ربط المؤسسات بأفضل المهنيين المعتمدين في الجزائر",
    fr: " ربط المؤسسات بأفضل المهنيين المعتمدين في الجزائر",
    en: "Connecting enterprises with the best accredited professionals"
  },
  heroBadgeText: {
    ar: "منصة المحاسبة الرقمية الأولى • AccoNet",
    fr: "1ère Plateforme de Comptabilité Digitale • AccoNet",
    en: "First Digital Accounting Platform • AccoNet"
  },
  heroConsultantCard: {
    ar: "بطاقة المهني النشط",
    fr: "Fiche du Consultant Actif",
    en: "Active Consultant Card"
  },
  availableImmediately: {
    ar: "متاح فوراً للعمل",
    fr: "Disponible immédiatement",
    en: "Available Immediately"
  },
  contactThePro: {
    ar: "اتصل بالمهني",
    fr: "Contacter l'expert",
    en: "Contact the Expert"
  },
  rating: {
    ar: "التقييم",
    fr: "Évaluation",
    en: "Rating"
  },
  seniority: {
    ar: "الأقدمية",
    fr: "Séniorité",
    en: "Seniority"
  },
  seniorityYears: {
    ar: "12 سنة من الخبرة",
    fr: "12 ans d'exp.",
    en: "12 yrs exp."
  },
  fortyFiveThousand: {
    ar: "45,000 دج/شهر",
    fr: "45 000 DA/mois",
    en: "45,000 DZD/month"
  },
  verifiedOnec: {
    ar: "🛡️ ✓ معتمد من المنظمة الوطنية",
    fr: "🛡️ ✓ Vérifié ONEC",
    en: "🛡️ ✓ ONEC Verified"
  },
  certifiedDocs: {
    ar: "📋 ✓ وثائق مصادق عليها",
    fr: "📋 ✓ Documents vérifiés",
    en: "📋 ✓ Certified Documents"
  },
  securedContract: {
    ar: "🤝 ✓ عقد محمي وآمن",
    fr: "🤝 ✓ Contrat sécurisé",
    en: "🤝 ✓ Secured Contract"
  },
  allWilayasLabel: {
    ar: "📍 جميع الولايات (48)",
    fr: "📍 Toutes les wilayas (48)",
    en: "📍 All wilayas (48)"
  },
  nationalCoverage: {
    ar: "Couverture Nationale",
    fr: "Couverture Nationale",
    en: "National Coverage"
  },
  nationalCoverageTitle: {
    ar: "تغطية وطنية كاملة",
    fr: "48 Wilayas d'Algérie",
    en: "69 Wilayas Covered"
  },
  fromNorthToSouth: {
    ar: "من الشمال إلى أقصى الجنوب الجزائري",
    fr: "Du Nord au grand Sud algérien",
    en: "From North to the deep Algerian south"
  },
  nationalBoards: {
    ar: "الجداول الوطنية السنوية",
    fr: "Tableaux Nationaux",
    en: "National Boards"
  },
  automaticCheckRequired: {
    ar: "التحقق التلقائي الإلزامي",
    fr: "Vérification automatique de l'agrément",
    en: "Mandatory automated verification"
  },
  scfG50Compliance: {
    ar: "احترام النظام المحاسبي",
    fr: "Réglementation Officielle",
    en: "Official Regulations"
  },
  scfG50ComplianceSub: {
    ar: "الالتزام التام بالنظام المحاسبي المالي (SCF)",
    fr: "Système Comptable Financier respecté",
    en: "Financial Accounting System (SCF) respected"
  },
  certifiedAdmission: {
    ar: "إيداع ملفات آمن ومشفر",
    fr: "Dépôt sécurisé (Art. 222)",
    en: "Encrypted file backups"
  },
  certifiedAdmissionSub: {
    ar: "حماية تامة لسرية البيانات والموازنات",
    fr: "Dossiers d'agrément intègres cryptés",
    en: "Fully secure audit files handling"
  },
  searchTerminalHeading: {
    ar: "البحث عن شريك قضائي / جبائي / محاسبي",
    fr: "Recherche de Partenaire Judiciaire / Fiscal / Comptable",
    en: "Search for Judicial / Fiscal / Accounting Partner"
  },
    searchBtnText: {
    ar: "ابحث",
    fr: "Rechercher",
    en: "Search"
  },
  featuredProsHeading: {
    ar: "الملفات البارزة للجدول الوطني",
    fr: "Profils Vedettes de l'Ordre National",
    en: "Featured National Order Profiles"
  },
  featuredProsSub: {
    ar: "أعضاء نشطون معتمدون. يتوفر كل مهني على ملف تعريف مرخص مع رقم التوثيق وعينات مراجعات أصحاب الأعمال الصاعدة.",
    fr: "Membres actifs confirmés. Chaque professionnel dispose d'un profil d'exercice avec numéro d'accréditation vérifié et avis d'entrepreneurs locaux.",
    en: "Confirmed active professional members. Each expert has a licensed practicing profile with a verified accreditation number and client reviews."
  },
  feedbackLocalEntities: {
    ar: "تقييمات مكاتب ومؤسسات نسيجنا الاقتصادي",
    fr: "Retour d'expérience des structures locales",
    en: "Feedback from Local Algerian SME Entities"
  },
  testimonialsEditoHeading: {
    ar: "شهادات حية وحالات عملية للاستعمال",
    fr: "Témoignages et cas d'usage réglementaires",
    en: "Testimonials and Regulatory Use Cases"
  },
  testimonialsEditoSub: {
    ar: "من التدقيق الإلزامي لجمعيات وهران إلى جباية الشركات الناشئة بالعاصمة. تعرف على سبب ثقة المؤسسات.",
    fr: "De l'audit obligatoire des associations sportives à Oran, à la fiscalité des startups labellisées à Alger. Découvrez pourquoi les entreprises algériennes font confiance à nos partenaires.",
    en: "From mandatory audits of sports associations in Oran, to startup tax certifications in Algiers. Discover why Algerian companies trust AccoNet."
  },
  verifiedContractLabel: {
    ar: "عقد أكونيت مؤكد",
    fr: "Contrat AccoNet Vérifié",
    en: "Verified AccoNet Contract"
  },
  sandboxHeading: {
    ar: "المحاكاة والبيان الجبائي التجريبي — باقة التجريب",
    fr: "Simulations fiscales algériennes — Bac à Sable",
    en: "Algerian Fiscal Simulations — Sandbox Showcase"
  },
  sandboxMainHeading: {
    ar: "احسب مبالغ الضرائب TVA و TAP وهيكل تبييت SCF",
    fr: "Simulez des calculations TVA, TAP et liasse SCF",
    en: "Simulate Tax Outflows: VAT, TAP, and SCF Ledgers"
  },
  sandboxSubHeading: {
    ar: "تحقق من سلامة الميزانية الدفترية أمام متطلبات المنظمة الوطنية الجزائرية للمحاسبة واحسب مبالغ الرسوم بنقرة واحدة.",
    fr: "Vérifiez la conformité de votre balance comptable face aux exigences du Système Comptable Financier (SCF) et générez des estimations de droits d'enregistrement.",
    en: "Assess compliance of your financial balance against the national Finance Act guidelines instantly through our tools."
  },
  sandboxButton: {
    ar: "الدخول إلى أدوات المحاكاة ←",
    fr: "Accéder aux simulateurs →",
    en: "Open Sandbox Simulators →"
  },
  widgetSmeHeading: {
    ar: "أداة: تقدير مستحقات الجباية ورصيد الموازنة للشركات",
    fr: "WIDGET: ESTIMATEUR DE RETRACTATION JIBAYATIC",
    en: "WIDGET: JIBAYATIC TAX LIABILITY ESTIMATOR"
  },
  sandboxActiveLabel: {
    ar: "محاكاة نشطة",
    fr: "SANDBOX ACTIVE",
    en: "SANDBOX ACTIVE"
  },
  baseTapText: {
    ar: "وعاء جباية TAP: رقم أعمال ممارسة النشاط خارج الرسوم",
    fr: "Base d'assiette TAP : CA TTC du mois d'exercice",
    en: "TAP turnover tax base: Gross monthly revenue from exercise"
  },
  vtaStandardText: {
    ar: "معدل القيمة المضافة TVA المطبق: 19% (النسبة العامة للخدمات)",
    fr: "TVA standard : 19% (Taux normal d'importation/services)",
    en: "Standard VAT rate: 19% (Regular bracket for imports/services)"
  },
  penaltyText: {
    ar: "الغرامات المستحقة عند التأخر: 10% تلقائياً زائد 3% إضافية لكل شهر تأخير",
    fr: "Pénalité cumulable (CPF) : 10% systématique + 3% majoration par mois",
    en: "Late payment penalty: 10% standard surcharge + 3% incremental monthly rate"
  },

  // New Tools Page Keys
  interactiveSandboxEngine: {
    ar: "محرك المحاكاة التفاعلية والتدقيق",
    fr: "Moteur de simulation interactive",
    en: "Interactive Sandbox Processing Engine"
  },
  activeSimulator: {
    ar: "المحاكي النشط",
    fr: "Simulateur actif",
    en: "Active Simulator"
  },
  complianceSandboxEngineSub: {
    ar: "موازين محاكاة مطابقة للتشريع الجزائري",
    fr: "MOTEUR DE SIMULATION CONFORME - ALGÉRIE",
    en: "ALGERIAN COMPLIANCE SANDBOX ENGINE"
  },
  scfVersionLabel: {
    ar: "نسخة 2.4 (النظام المحاسبي)",
    fr: "v2.5 (SCF)",
    en: "v2.5 (SCF)"
  },
  businessExpNarrative: {
    ar: "وصف وصياغة العملية المحاسبية نثراً",
    fr: "Description de l'écriture en texte naturel",
    en: "Business Expenditure Narrative Description"
  },
  chooseVoucherScan: {
    ar: "اختر وثيقة تجريبية للمسح",
    fr: "Sélectionner une facture d'exemple",
    en: "Choose Local Voucher Scan Copy"
  },
  inputTurnoverStats: {
    ar: "أدخل معطيات المبيعات لتقييم وعاء جباية G50 TAP تلقائياً.",
    fr: "Saisissez les ventes et salaires pour estimer vos acomptes G50.",
    en: "Input monthly financial parameters to auto-calculate raw G50 Tax liability."
  },
  monthlySalesHt: {
    ar: "المبيعات الشهرية الإجمالية (خارج الرسوم دج)",
    fr: "Chiffre d'Affaires Mensuel (DZD HT)",
    en: "Monthly Revenue (HT DZD)"
  },
  staffPayrollDzd: {
    ar: "الكتلة الإجمالية للأجور (دج)",
    fr: "Masse Salariale Mensuelle (DZD)",
    en: "Staff Payroll Register (DZD)"
  },
  currentTrialBalanceValues: {
    ar: "قيم الميزان الدفتري الحالية للفحص والاستباق",
    fr: "Valeurs de la balance comptable de contrôle",
    en: "Current Trial Balance Sheet Ledger Values"
  },
  smeStrategicImperative: {
    ar: "أهداف وغايات التوجيه المالي للمؤسسة",
    fr: "Objectif stratégique de la PME",
    en: "Strategic Financial Directive for SMEs"
  },
  fileSizeLockerCapsule: {
    ar: "حجم الملف: 4.88 ميغابايت • كبسولة مشفرة آمنة",
    fr: "Taille : 4.88 Mo • Capsule chiffrée sécurisée",
    en: "File Size: 4.88 MB • Secure Sealed Locker"
  },
  processingLedgerParams: {
    ar: "يجري معالجة عناصر المخرجات الجبائية...",
    fr: "Traitement des écritures SCF en cours...",
    en: "Processing raw ledger parameters..."
  },
  provideTransactionInstructions: {
    ar: "الرجاء إدخال البيانات أعلاه والضغط على زر التشغيل لبدء فحص الموازنة والاعتماد.",
    fr: "Veuillez fournir des données d'entrée puis lancer la simulation.",
    en: "Provide transaction datasets above and click execution parameter to test ledger compliance."
  },
  selectScfTerminalModule: {
    ar: "اختر وحدة تدقيق من القائمة اليمنى لتشغيل المحاكي وعرض النتائج.",
    fr: "Sélectionnez un outil SCF dans le volet pour initialiser l'analyse.",
    en: "Select a specific SCF terminal module from the side panel to initiate simulator logs."
  },

  // New Admin Dashboard Keys
  nationalAuditAuthority: {
    ar: "الهيئة الوطنية للرقابة ومطابقة التدقيق المالية",
    fr: "Autorité de Contrôle des Comptes • DGI",
    en: "National Audit Authority"
  },
  dgiSupervisorStatus: {
    ar: "رتبة الرقابة العامة للضرائب : مدقق حسابات داخلي",
    fr: "Rôle DGI : Inspecteur Général des Comptes",
    en: "DGI SUPERVISOR STATUS: INTERNAL AUDITOR"
  },
  algeriaComplianceGateway: {
    ar: "بوابة الجزائر للامتثال المالي والمراقبة",
    fr: "Portail National de Conformité Fiscale",
    en: "Algeria Financial Compliance Gateway"
  },
  supervisingCharteredCabinets: {
    ar: "مراقبة واعتماد مكاتب الخبرة المحاسبية ومحافظي الحسابات ومطابقتها للسجلات المعتمدة للجمهورية الجزائري.",
    fr: "Validation officielle des agréments (Expert-Comptables et Commissaires aux Comptes) inscrits aux registres nationaux de l'ONCC.",
    en: "Supervising chartered legal cabinets, statutory auditors (Commissaires aux comptes), and validating professional credentials against the national ONCC registrar for live SCF reporting."
  },
  boardControlOnline: {
    ar: "تفعيل لوحة المراقبة التلقائية الحية",
    fr: "MONITORING NATIONAL ACTIF",
    en: "BOARD CONTROL ONLINE"
  },
  registeredCabinets: {
    ar: "مكاتب الخبرة والمحافظة المسجلة",
    fr: "Cabinets Agréés Enregistrés",
    en: "Registered Practicing Cabinets"
  },
  nationalSmeEnrolment: {
    ar: "المؤسسات والشركات النشطة المسجلة",
    fr: "PME & Startups Affiliées",
    en: "National SME Enrolments"
  },
  activeEntities: {
    ar: "مؤسسة تجارية نشطة",
    fr: "ENTREPRISES ACTIVES",
    en: "ACTIVE SME ENTITIES"
  },
  g50SubmissionCompliance: {
    ar: "معدل تقديم تصريحات G50 في الآجال",
    fr: "Taux de Dépôt G50 Régulier",
    en: "G50 Submission Compliance Index"
  },
  monthlyPenetration: {
    ar: "الالتزام الجبائي الشهري الموثق",
    fr: "CONFORMITÉ MENSUELLE",
    en: "MONTHLY PENETRATION RATE"
  },
  systemTrustIndex: {
    ar: "مؤشر حماية وسلامة النظام",
    fr: "Indice de Fiabilité Système",
    en: "System Trust Stability Index"
  },
  secureTripleEncrypted: {
    ar: "مشفر بالكامل ثلاثي الطبقات",
    fr: "CHIFFREMENT DE BOUT EN BOUT",
    en: "TRIPLE-ENCRYPTED SECURE"
  },
  authorityControlBoard: {
    ar: "فضاء الاعتماد والتحقق من الوثائق الرسمية",
    fr: "Conseil de validation des cartes d'agrément",
    en: "Authority Control Board Panel"
  },
  proCredentialsApprovals: {
    ar: "طلبات الاعتماد وتدقيقات مكاتب الخبرة الرسمية",
    fr: "Vérification des Agrégations Cabinet & ONCC",
    en: "Professional Credentials & ONCC Approvals"
  },
  filterByCabinetName: {
    ar: "فلترة وتصفية حسب اسم المكتب أو رقم السجل الضريبي والاعتماد...",
    fr: "Rechercher par raison sociale, nom du cabinet ou numéro d'agrément...",
    en: "Filter by cabinet name or ONCC Accreditation reference number..."
  },
  stateCabinetApprovedStatus: {
    ar: "الحالة: معتمد وموافق عليه من الإدارة العامة للضرائب",
    fr: "Statut : Cabinet Agréé DGI & Conforme",
    en: "Accreditation approved & fully compliant"
  },
  stateCabinetPendingStatus: {
    ar: "الحالة: معلق قيد المعاينة وتدقيق الملفات",
    fr: "Statut : Examen préliminaire en cours",
    en: "Pending assessment & files verification"
  },
  nationalFinanceActConfig: {
    ar: "إعدادات قانون المالية العام السنوي",
    fr: "Paramètres Globaux — Loi de Finances 2026",
    en: "Global Regulation Rules - National Finance Act"
  },
  nationalFinanceActConfigSub: {
    ar: "المعايير المرجعية للمحاكاة والتحصيل",
    fr: "Configuration des taux de taxation légale",
    en: "Synchronize default percentage thresholds"
  },
  applyGlobalThresholds: {
    ar: "تعديل الموازين وتحديث القوانين المطبقة",
    fr: "Sauvegarder les Taux d'Indexation",
    en: "Apply Finance Act Thresholds"
  },
  defaultTapLevyRate: {
    ar: "معدل الرسوم الاقتطاعي TAP الافتراضي (%)",
    fr: "Taux National TAP (%) des transactions",
    en: "Default Levied TAP Percentage (%)"
  },
  flatIbsTaxRate: {
    ar: "رقم أعمال الضرائب المسجّل IBS للشركات (%)",
    fr: "Marge d'Imposition Forfaitaire IBS (%)",
    en: "Flat Corporate IBS Threshold (%)"
  },
  regulatoryFilingSystemLog: {
    ar: "سجل تتبع ومحاكاة النظام العام",
    fr: "Rapports & Logs du Système d'Immatriculation",
    en: "System Wide Audited Event Log"
  },
  regulatoryFilingSystemLogDesc: {
    ar: "العمليات التنظيمية المنجزة من مستشاري وأعضاء المنظمة الوطنية.",
    fr: "Traces de modification des statuts professionnels d'exercice.",
    en: "Real-time records tracking modifications of legal cabinet statuses."
  },
mockMonthlyStaffPayroll: {
    ar: "1,200,000",
    fr: "1.200.000",
    en: "1,200,000"
  },
  mockRawBalanceState: {
    ar: "دفتر الأستاذ المدين: 14,800,000 دج | دفتر الأستاذ الدائن: 14,850,000 دج",
    fr: "Grand Livre Débiteur: 14 800 000 DZD | Grand Livre Créditeur: 14 850 000 DZD",
    en: "Debit Ledger: 14,800,000 DZD | Credit Ledger: 14,850,000 DZD"
  },
  mockSmeForecastText: {
    ar: "تحسين هوامش التدفق النقدي لمصنع إنتاج غذائي في البليدة.",
    fr: "Améliorer les marges de trésorerie pour une usine de production alimentaire à Blida.",
    en: "Improve cash flow margins for a food production factory in Blida."
},
  allRightsReserved: {
    ar: "جميع الحقوق محفوظة. تم تصميمه بكل فخر لخدمة الإدارة الجزائرية والشركات الصاعدة.",
    fr: "Tous droits réservés. Conçu avec fierté pour l'administration et les PME en Algérie.",
    en: "All rights reserved. Styled with pride for Algerian entrepreneurs & finance agents."
  }
};

