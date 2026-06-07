import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { algerianWilayas } from '../data/algerianWilayas';
import { DocumentUpload } from '../components/DocumentUpload';
import { 
  Building2, UserCheck, ShieldCheck, Mail, Lock, 
  MapPin, Award, ArrowLeft, ArrowRight, X, UserPlus, 
  Phone, Globe, FileText, CheckCircle2, ChevronRight, Sliders, BadgeCheck, Scale 
} from 'lucide-react';

export const Register: React.FC = () => {
  const { t, tSpec, tObj, direction, language } = useLanguage();
  const { setUserRole, setCurrentClient, setCurrentProfessional, triggerNotification } = useApp();
  const navigate = useNavigate();

  // Primary Pathway: 'client' (Entreprise) vs 'professional' (Mhni)
  const [regRole, setRegRole] = useState<'client' | 'professional'>('client');

  // Wizard active steps
  // Path Professional: Steps 1, 2, 3, 4
  // Path Client: Steps 1, 2, 3
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null); // Reference ID on success

  // ------------------------------------------
  // FORM VARIABLES: PATH A & B COMMON/SPECIFIC
  // ------------------------------------------
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Professional full name or responsible contact name
  const [phoneOperator, setPhoneOperator] = useState('06'); // Mobilis 06, Djezzy 07, Ooredoo 05
  const [phoneRest, setPhoneRest] = useState(''); // remaining 8 digits
  const [selectedWilayaId, setSelectedWilayaId] = useState<number>(16); // default Algiers (code 16)
  
  // PATH A (Professional) SPECIFICS
  const [specialty, setSpecialty] = useState('certified-accountant');
  const [tableauNumber, setTableauNumber] = useState('');
  const [agreeCabinetNumber, setAgreeCabinetNumber] = useState('');
  const [yearsExperience, setYearsExperience] = useState(5);
  const [languagesOfWork, setLanguagesOfWork] = useState({
    ar: true,
    fr: true,
    en: false,
    tamazight: false
  });
  
  // Base64 document states for Professional
  const [proDocs, setProDocs] = useState<{
    cartePro: { name: string; size: string; data: string } | null;
    identity: { name: string; size: string; data: string } | null;
    attestationInsc: { name: string; size: string; data: string } | null;
    decisionAgree: { name: string; size: string; data: string } | null;
  }>({
    cartePro: null,
    identity: null,
    attestationInsc: null,
    decisionAgree: null
  });

  const [attestHonourPro, setAttestHonourPro] = useState(false);

  // PATH B (Entreprise/Client) SPECIFICS
  const [entityType, setEntityType] = useState('SARL');
  const [companyNameAR, setCompanyNameAR] = useState('');
  const [companyNameFR, setCompanyNameFR] = useState('');
  const [rcNumber, setRcNumber] = useState('');
  const [nifNumber, setNifNumber] = useState('');
  const [aiNumber, setAiNumber] = useState('');
  const [secteurActivite, setSecteurActivite] = useState('Tech & Numérique');
  const [regimeFiscal, setRegimeFiscal] = useState('Régime réel (IBS)');

  // Base64 document states for Client
  const [clientDocs, setClientDocs] = useState<{
    extraitRC: { name: string; size: string; data: string } | null;
    carteNIF: { name: string; size: string; data: string } | null;
    roleApure: { name: string; size: string; data: string } | null;
    gerantId: { name: string; size: string; data: string } | null;
    recepisseAssociation: { name: string; size: string; data: string } | null;
    certificatStartup: { name: string; size: string; data: string } | null;
  }>({
    extraitRC: null,
    carteNIF: null,
    roleApure: null,
    gerantId: null,
    recepisseAssociation: null,
    certificatStartup: null
  });

  const [attestHonourClient, setAttestHonourClient] = useState(false);

  // Validation errors per step
  const [stepErrors, setStepErrors] = useState<string | null>(null);

  // Reset helper when toggling roles
  const handleRoleToggle = (role: 'client' | 'professional') => {
    setRegRole(role);
    setCurrentStep(1);
    setStepErrors(null);
    setRegistrationSuccess(null);
  };

  // ------------------------------------------
  // STEPPER ACTIONS & VALIDATION
  // ------------------------------------------
  const validateCurrentStep = (): boolean => {
    setStepErrors(null);

    // Validate email formatting
    const parsedEmail = email.trim();
    if (currentStep === 1) {
      if (!fullName) {
        setStepErrors(language === 'ar' ? 'يرجى إدخال الاسم الكامل.' : 'Veuillez renseigner votre nom complet.');
        return false;
      }
      if (!parsedEmail || !parsedEmail.includes('@')) {
        setStepErrors(language === 'ar' ? 'يرجى إدخال بريد إلكتروني مهني صالح.' : 'Veuillez saisir un e-mail professionnel valide.');
        return false;
      }
      if (password.length < 8) {
        setStepErrors(language === 'ar' ? 'كلمة المرور يجب أن لا تقل عن 8 رموز.' : 'Le mot de passe doit comporter au moins 8 caractères.');
        return false;
      }
      // Password complex verification
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (!hasNumber || !hasSpecial) {
        setStepErrors(
          language === 'ar' 
            ? 'كلمة المرور يجب أن تحتوى على رقم واحد ورمز خاص واحد على الأقل.' 
            : 'Le mot de passe doit contenir au moins un chiffre et un caractère spécial.'
        );
        return false;
      }
      if (password !== confirmPassword) {
        setStepErrors(language === 'ar' ? 'كلمتا المرور غير متطابقتين.' : 'Les mots de passe ne correspondent pas.');
        return false;
      }
      if (phoneRest.length < 7) {
        setStepErrors(language === 'ar' ? 'يرجى إدخال رقم هاتف جزائري صحيح.' : 'Veuillez entrer un numéro de téléphone algérien valide.');
        return false;
      }
    }

    if (regRole === 'professional') {
      if (currentStep === 2) {
        if (!tableauNumber) {
          setStepErrors(language === 'ar' ? 'رقم القيد في الجدول الوطني إلزامي.' : "Le numéro d'inscription au Tableau National de l'Ordre est requis.");
          return false;
        }
      }
      if (currentStep === 3) {
        // Document step validation for Professional
        if (!proDocs.cartePro) {
          setStepErrors(language === 'ar' ? 'يرجى تحميل بطاقتك المهنية.' : 'Veuillez téléverser votre Carte Professionnelle.');
          return false;
        }
        if (!proDocs.identity) {
          setStepErrors(language === 'ar' ? 'يرجى تحميل وثيقة الهوية الشخصية.' : "Veuillez téléverser votre Pièce d'Identité.");
          return false;
        }
        if (!proDocs.attestationInsc) {
          setStepErrors(language === 'ar' ? 'يرجى تحميل شهادة القيد في الجدول الوطني.' : "Veuillez téléverser votre Attestation d'Inscription.");
          return false;
        }
      }
    } else {
      // Client Pathway
      if (currentStep === 2) {
        if (!companyNameFR && !companyNameAR) {
          setStepErrors(language === 'ar' ? 'يرجى إدخال الاسم التجاري للشركة.' : 'Veuillez saisir la dénomination de votre entreprise.');
          return false;
        }
        if (!rcNumber) {
          setStepErrors(language === 'ar' ? 'رقم السجل التجاري إلزامي.' : "Le Numéro d'inscription au Registre du Commerce (RC) est requis.");
          return false;
        }
        // RC structure check: XX/XXXXXX/XX or similar
        if (!rcNumber.includes('/')) {
          setStepErrors(language === 'ar' ? 'تنسيق السجل التجاري يجب أن يشبه XX/XXXXXX/XX.' : "Le format du RC doit ressembler à XX/XXXXXX/XX (ex: 16/00-109432B18).");
          return false;
        }
        if (!nifNumber || nifNumber.length !== 15) {
          setStepErrors(language === 'ar' ? 'رقم التعريف الجبائي (NIF) يجب أن يتكون من 15 رقماً.' : "Le Numéro d'Identification Fiscale (NIF) doit comporter exactement 15 chiffres.");
          return false;
        }
      }
      if (currentStep === 3) {
        // Document step validation for Client
        if (!clientDocs.extraitRC) {
          setStepErrors(language === 'ar' ? 'يرجى تحميل مستخرج السجل التجاري (RC).' : 'Veuillez charger votre Extrait de Registre de Commerce (RC).');
          return false;
        }
        if (!clientDocs.carteNIF) {
          setStepErrors(language === 'ar' ? 'يرجى تحميل بطاقة التعريف الجبائي (NIF).' : "Veuillez charger votre Carte d'Immatriculation Fiscale (NIF).");
          return false;
        }
        if (!clientDocs.gerantId) {
          setStepErrors(language === 'ar' ? 'يرجى تحميل هوية جينرال المسير.' : "Veuillez charger la Pièce d'Identité du gérant représentant légal.");
          return false;
        }
        if (entityType === 'Association' && !clientDocs.recepisseAssociation) {
          setStepErrors(language === 'ar' ? 'يرجى تحميل رخص الترخيص الخاصة بالجمعية.' : "Veuillez charger le Récépissé d'agrément de l'association (Loi 12-06).");
          return false;
        }
        if (entityType === 'Startup labellisée' && !clientDocs.certificatStartup) {
          setStepErrors(language === 'ar' ? 'يرجى تحميل شهادة علامة شركة ناشئة.' : "Veuillez charger votre Certificat de Label Startup DZ.");
          return false;
        }
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStepErrors(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Final Action Handlers
  const handleFinalSubmitPro = () => {
    if (!attestHonourPro) {
      setStepErrors(language === 'ar' ? 'يجب عليك تأكيد صحة الوثائق بموجب القانون الجزائري.' : "Veuillez cocher l'attestation sur l'honneur pour continuer.");
      return;
    }

    // Success response construction
    const referenceId = `ACC-PRO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setRegistrationSuccess(referenceId);

    // Mount into App Context State
    setUserRole('professional');
    setCurrentProfessional({
      id: `p_reg_${Date.now()}`,
      name: { ar: fullName, fr: fullName, en: fullName },
      initials: fullName.substring(0, 2).toUpperCase(),
      avatarBg: "bg-indigo-700 text-slate-900",
      specialty: specialty as any,
      wilayaId: selectedWilayaId,
      wilayaName: algerianWilayas.find(w => w.id === selectedWilayaId)?.name || { ar: "الجزائر", fr: "Alger", en: "Algiers" },
      rating: 5.0,
      reviewCount: 0,
      hourlyRate: specialty === 'certified-accountant' ? 3500 : 7000,
      available: true,
      yearsExperience: yearsExperience,
      accreditationNumber: tableauNumber,
      completionRate: 100,
      clientsServed: 0,
      bio: {
        ar: `مكتب معتمد ومسجل. اللغات المعتمدة: ${languagesOfWork.ar ? 'العربية' : ''} ${languagesOfWork.fr ? 'الفرنسية' : ''}. حبرة ممتدة لـ ${yearsExperience} سنة.`,
        fr: `Cabinet agréé actif sur la wilaya d'inscription. Expérience acquise de ${yearsExperience} ans.`,
        en: `Licensed practice with over ${yearsExperience} years experience compliant with the National orders.`
      },
      services: [
        {
          title: { ar: 'التحقق والمطابقة الجبائية الدورية', fr: 'Vérification et conformité fiscale régulière', en: 'Regular compliance auditing' },
          description: { ar: 'ضمان التوافق التام لمؤسستكم مع أحكام قوانين المالية والضرائب.', fr: 'Audit régulier de vos écritures face aux exigences de l\'administration DGI.', en: 'Standard monitoring of accounting registers' },
          price: "15,000 DA"
        }
      ],
      reviews: [],
      history: []
    });

    triggerNotification(
      "Dossier Professionnel Reçu",
      `Dossier d'agrément de Me. ${fullName} soumis de façon sécurisée sous la réf ${referenceId}.`
    );
  };

  const handleFinalSubmitClient = () => {
    if (!attestHonourClient) {
      setStepErrors(language === 'ar' ? 'يجب عليك تأكيد صحة البيانات والوثائق بموجب القانون.' : "Veuillez cocher l'attestation sur l'honneur pour soumettre.");
      return;
    }

    const referenceId = `ACC-CLI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setRegistrationSuccess(referenceId);

    // Mount into App Context State
    setUserRole('client');
    const compName = companyNameFR || companyNameAR;
    setCurrentClient({
      id: `c_reg_${Date.now()}`,
      companyName: compName,
      sector: { ar: secteurActivite, fr: secteurActivite, en: secteurActivite },
      wilayaId: selectedWilayaId,
      wilayaName: algerianWilayas.find(w => w.id === selectedWilayaId)?.name || { ar: "الجزائر", fr: "Alger", en: "Algiers" },
      logoInitials: compName.substring(0, 2).toUpperCase(),
      avatarBg: "bg-teal-700 text-slate-900",
      NIF: nifNumber,
      RC: rcNumber,
      activeContracts: [],
      pendingTasks: []
    });

    triggerNotification(
      "Inscription Entreprise Complétée",
      `Profil de ${compName} validé avec succès. Référence d'enregistrement : ${referenceId}.`
    );
  };

  // Stepper representation parameters
  const proStepsDef = [
    { num: 1, title: 'Compte Info', titleAR: 'معلومات الحساب' },
    { num: 2, title: 'Identité Pro', titleAR: 'الهوية المهنية' },
    { num: 3, title: 'Téléversements', titleAR: 'رفع الوثائق' },
    { num: 4, title: 'Validation', titleAR: 'التحقق والمراجعة' }
  ];

  const clientStepsDef = [
    { num: 1, title: 'Compte Info', titleAR: 'معلومات الحساب' },
    { num: 2, title: 'Société Identité', titleAR: 'تفاصيل المؤسسة' },
    { num: 3, title: 'Documents Légaux', titleAR: 'تحميل المستندات' }
  ];

  const activeStepsDef = regRole === 'professional' ? proStepsDef : clientStepsDef;
  const isLastWizardStep = currentStep === activeStepsDef.length;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row bg-white antialiased" id="register_full_wizard" dir={direction}>
      
      {/* 1. LEFT STICKY REGULAR SIDE PANEL (DESKTOP STEPPER AND BRAND BAR) */}
      <div className="w-full lg:w-1/3 bg-white text-white p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-blue-500/30 shrink-0 select-none">
        <div className="space-y-6">
          
          {/* Logo link */}
          <Link to="/" className="inline-flex items-center space-x-2.5 rtl:space-x-reverse text-left">
            <span className="flex items-center justify-center w-8 h-8 rounded-none glass text-brand-primary font-bold text-lg border border-blue-200">
              أ
            </span>
            <span className="text-xl font-serif font-semibold tracking-tight text-slate-900">
              AccoNet <span className="text-brand-accent">أكونيت</span>
            </span>
          </Link>

          {/* Stepper Shell Wrapper (Dynamic left side rendering) */}
          {!registrationSuccess && (
            <div className="hidden lg:block pt-8 space-y-7 text-left rtl:text-right">
              <span className="text-[9px] font-mono font-bold text-brand-accent uppercase tracking-widest block mb-4">
                {regRole === 'professional' ? 'MHNI PROFILE ONBOARDING' : 'ENTERPRISE ONBOARDING'}
              </span>

              {activeStepsDef.map((st) => {
                const isActive = st.num === currentStep;
                const isCompleted = st.num < currentStep;

                return (
                  <div key={st.num} className="flex items-start gap-4">
                    {/* Circle Indicator */}
                    <div className={`w-8 h-8 flex items-center justify-center shrink-0 border ${
                      isActive 
                        ? 'border-brand-accent bg-brand-primary text-slate-900 font-black' 
                        : isCompleted
                          ? 'border-emerald-500 bg-emerald-600/20 text-emerald-400'
                          : 'border-blue-200 text-white/40'
                    }`}>
                      {isCompleted ? '✓' : st.num}
                    </div>

                    {/* Step terms */}
                    <div className="space-y-0.5">
                      <p className={`text-xs font-bold font-mono tracking-wide ${isActive ? 'text-slate-900' : 'text-white/50'}`}>
                        {st.title}
                      </p>
                      <p className={`text-[10px] font-bold ${isActive ? 'text-brand-accent' : 'text-white/30'}`}>
                        {st.titleAR}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Stepper overview for Mobile rendering */}
          {!registrationSuccess && (
            <div className="block lg:hidden mt-2 p-3 bg-white/20 border border-white/30">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Étape {currentStep} sur {activeStepsDef.length}</span>
                <span className="text-brand-accent font-bold">
                  {activeStepsDef[currentStep - 1]?.title} ({activeStepsDef[currentStep-1]?.titleAR})
                </span>
              </div>
              <div className="w-full bg-blue-100/50 h-1 mt-2 overflow-hidden rounded-none">
                <div 
                  className="bg-brand-accent h-full transition-all duration-300"
                  style={{ width: `${(currentStep / activeStepsDef.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

        </div>

        {/* Footnote */}
        <div className="pt-6 border-t border-blue-300 text-[10px] text-blue-100 font-mono space-y-1.5 text-left rtl:text-right">
          <p className="font-bold flex items-center gap-1 text-amber-300">
            <Scale className="w-3.5 h-3.5" />
            <span>LOI INDUSTRIELLE & CODE CIVIL</span>
          </p>
          <p className="leading-relaxed">
            Dépôt crypté. Tous les dossiers sont confrontés au registre national du Ministère des Finances & Tableaux de l'ONEC, de l'ONCC et de l'ONCA.
          </p>
        </div>
      </div>

      {/* 2. RIGHT DYNAMIC WIZARD ACTION SHEET */}
      <div className="flex-1 flex flex-col justify-between min-w-0" id="wizard_interaction_area">

        {/* Tab Switching Selector (Visible only in initial Step 1) */}
        {!registrationSuccess && currentStep === 1 && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('accountTypeLabel')}</p>
              <h2 className="text-xs text-slate-300 font-mono mt-0.5">Choisissez le profil adapté à votre activité sur la plateforme AccoNet.</h2>
            </div>

            <div className="flex gap-2 p-1 bg-white border border-blue-200 select-none shrink-0">
              <button
                type="button"
                onClick={() => handleRoleToggle('client')}
                className={`px-4 py-2 cursor-pointer text-xs font-bold uppercase transition flex items-center gap-2 ${
                  regRole === 'client' 
                    ? 'glass text-brand-primary border border-blue-200 font-black' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-brand-primary" />
                <span>{language === 'ar' ? 'المؤسسة / الشركة' : 'Entreprise (Client)'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleToggle('professional')}
                className={`px-4 py-2 cursor-pointer text-xs font-bold uppercase transition flex items-center gap-2 ${
                  regRole === 'professional' 
                    ? 'glass text-indigo-700 border border-blue-200 font-black' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4 text-indigo-700" />
                <span>{language === 'ar' ? 'المهني / المكتب' : 'Professionnel (Cabinet)'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Wizard Central Content Panel */}
        <div className="p-6 sm:p-10 lg:p-16 max-w-4xl w-full mx-auto flex-1 overflow-y-auto">
          
          {/* Success screen placeholder */}
          {registrationSuccess ? (
            <div className="glass border border-blue-200 p-8 sm:p-12 text-center text-left rtl:text-right space-y-6 animate-fade-in shadow-xs" id="reg_success_pane">
              
              <div className="w-16 h-16 bg-emerald-900/20 border border-emerald-500/20 flex items-center justify-center mx-auto rounded-full">
                <BadgeCheck className="w-10 h-10 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <span className="px-2.5 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-mono font-bold uppercase tracking-widest">
                  {language === 'ar' ? 'تم استلام الملف بنجاح' : 'Dossier Enregistré avec Succès'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                  {language === 'ar' ? 'تم رفع طلب الانضمام والتحقق' : 'Demande d\'adhésion soumise !'}
                </h1>
                
                <p className="text-xs text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
                  {language === 'ar' 
                    ? 'تم تسجيل ملف السجل ووثائق الاعتماد الخاصة بكم بدقة في مخزن البيانات الجزائري المشفر. ستتم مطابقة البيانات مع سجلات الهيئات الوطنية (ONEC/ONCC) خلال 48 ساعة.' 
                    : "Votre dossier est en cours de vérification. Vous recevrez une notification d'activation réglementaire sous 48 heures ouvrables."}
                </p>
              </div>

              {/* Reference ID Block */}
              <div className="bg-white border border-blue-200 p-4 max-w-md mx-auto">
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">RÉFÉRENCE DU DOSSIER D\'AGRÉMENT</p>
                <p className="text-xl font-mono font-black text-brand-primary mt-1 tracking-wider select-all">{registrationSuccess}</p>
              </div>

              <div className="max-w-xs mx-auto pt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => navigate(regRole === 'professional' ? '/dashboard/professional' : '/dashboard/client')}
                  className="w-full py-2.5 bg-brand-primary hover:bg-brand-dark hover:scale-[1.01] text-slate-900 text-[10px] font-mono uppercase tracking-widest transition cursor-pointer font-bold shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Accéder à ma démo immédiate</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <Link to="/" className="block text-xs font-bold text-slate-400 hover:text-slate-900 font-mono">
                  Retourner à l'accueil
                </Link>
              </div>

            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Central Title */}
              <div className="pb-4 border-b border-blue-200">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <UserPlus className="w-6 h-6 text-brand-primary" />
                  <span>
                    {regRole === 'professional' 
                      ? `Rejoindre en tant que Professionnel (${activeStepsDef[currentStep-1]?.title})`
                      : `Créer votre Espace Entreprises (${activeStepsDef[currentStep-1]?.title})`
                    }
                  </span>
                </h1>
                <p className="text-[11px] text-brand-primary font-mono font-extrabold uppercase mt-1 tracking-wider">
                  Algeria Legal Compliance Platform (أكونيت الجزائر)
                </p>
              </div>

              {/* STEP ERRORS DISPLAYER */}
              {stepErrors && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-mono leading-relaxed text-left rtl:text-right whitespace-pre-line flex items-start gap-2 animate-[shake_0.3s_ease]">
                  <X className="w-5 h-5 shrink-0 text-red-650 cursor-pointer" onClick={() => setStepErrors(null)} />
                  <div>
                    <span className="font-bold underline uppercase block mb-1">Erreur de saisie / خطأ في التحقق</span>
                    <p>{stepErrors}</p>
                  </div>
                </div>
              )}

              {/* ------------------------------------------
                  STEP 1: ACCOUNT INFO (BOTH ROLES)
                  ------------------------------------------ */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                    Étape 1 — Informations d'authentification obligatoires
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left rtl:text-right">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {regRole === 'professional' ? "Nom complet de l'Expert (النسب واللقب)" : "Nom et prénom du responsable légal (النسب واللقب للمسير)"}
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={regRole === 'professional' ? "ex: Me. Lamine Bouhired" : "ex: Karim Haddad"}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2.5 text-xs text-slate-200 glass focus:outline-none focus:border-brand-primary font-serif font-bold"
                      />
                    </div>

                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        E-mail professionnel (البريد الإلكتروني للعمل)
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative border border-blue-200 rounded-none glass px-3 py-2 flex items-center gap-2 focus-within:border-brand-primary">
                        <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                        <input 
                          type="email" 
                          required
                          placeholder="direction@cabinet.dz"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs text-slate-300 bg-transparent focus:outline-none focus:ring-0 text-slate-700"
                        />
                      </div>
                    </div>

                    {/* Phone Number with Algerian flag prefix operator selector */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Numéro de Téléphone (رقم الهاتف الجوال)
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="flex border border-blue-200 rounded-lg bg-blue-50 focus-within:border-brand-primary">
                        
                        {/* Operator select prefix */}
                        <div className="bg-white/85 border-r border-blue-200 px-2.5 flex items-center gap-1 shrink-0 select-none">
                          <span className="text-[13px]" title="Algérie">🇩🇿</span>
                          <span className="text-[10px] font-mono font-bold text-slate-300">+213</span>
                          <select
                            value={phoneOperator}
                            onChange={(e) => setPhoneOperator(e.target.value)}
                            className="bg-transparent text-xs font-mono font-bold text-slate-300 outline-none cursor-pointer"
                          >
                            <option value="06">06 (Mobilis)</option>
                            <option value="07">07 (Djezzy)</option>
                            <option value="05">05 (Ooredoo)</option>
                          </select>
                        </div>

                        <input 
                          type="text" 
                          required
                          maxLength={8}
                          placeholder="54859012"
                          value={phoneRest}
                          onChange={(e) => setPhoneRest(e.target.value.replace(/\D/g, ''))}
                          className="w-full text-xs font-mono tracking-widest text-slate-300 bg-transparent py-2 px-3 focus:outline-none"
                        />
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">Format exigé: +213 [Oper] [8 chiffres]</span>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Mot de passe sécurisé (كلمة المرور)
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative border border-blue-200 rounded-none glass px-3 py-2 flex items-center gap-2 focus-within:border-brand-primary">
                        <Lock className="w-4 h-4 text-brand-primary shrink-0" />
                        <input 
                          type="password" 
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full text-xs text-slate-300 bg-transparent focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Confirmer le mot de passe (تأكيد كلمة المرور)
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative border border-blue-200 rounded-none glass px-3 py-2 flex items-center gap-2 focus-within:border-brand-primary">
                        <Lock className="w-4 h-4 text-brand-primary shrink-0" />
                        <input 
                          type="password" 
                          required
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full text-xs text-slate-300 bg-transparent focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Wilaya of Practice / Siege */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {regRole === 'professional' ? 'Wilaya d\'exercice principale (ولاية ممارسة المهنة)' : 'Wilaya du siège social de l\'entreprise (ولاية المقر الاجتماعي للمؤسسة)'}
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative border border-blue-200 rounded-none glass px-3 py-2 flex items-center gap-2 focus-within:border-brand-primary">
                        <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                        <select
                          value={selectedWilayaId}
                          onChange={(e) => setSelectedWilayaId(Number(e.target.value))}
                          className="w-full bg-transparent text-xs text-slate-300 outline-none cursor-pointer font-serif font-black"
                        >
                          {algerianWilayas.map((w) => (
                            <option key={w.id} value={w.id}>
                              {w.code} — {w.name.fr} ({w.name.ar})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* ------------------------------------------
                  STEP 2 (PROFESSIONAL ONLY): PROFESSIONAL IDENTITY
                  ------------------------------------------ */}
              {currentStep === 2 && regRole === 'professional' && (
                <div className="space-y-6 animate-fade-in text-left rtl:text-right">
                  <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-indigo-700">
                    Étape 2 — Identité de l'agrement & Spécialité légale
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Specialty dropdown */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Spécialité & Ordre National (التخصص المهني والهيئة القانونية)
                        <span className="text-red-500"> *</span>
                      </label>
                      <select
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2.5 glass text-xs font-bold text-slate-300 focus:outline-none focus:border-indigo-600 cursor-pointer font-serif"
                      >
                        <option value="certified-accountant">Expert-Comptables (Agréé par l'ONEC)</option>
                        <option value="statutory-auditor">Commissaire aux Comptes (Agréé par l'ONCC)</option>
                        <option value="chartered-accountant">Comptable Agréé (Inscrit au Tableau de l'ONCA)</option>
                        <option value="judicial-expert">Expert Judiciaire Comptable (Près les Cours de Justice)</option>
                        <option value="tax-consultant">Conseiller Fiscal Indépendant (DGI Affilié)</option>
                        <option value="actuaire">Actuaire Certifié (Membre de l'AAA)</option>
                      </select>
                    </div>

                    {/* Registration number Tableau National */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Numéro d'inscription au Tableau (رقم القيد بالجدول الوطني)
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={
                          specialty.includes('statutory') 
                            ? "ex: CC-09-0118 (ONCC)" 
                            : "ex: EC-16-0042 (ONEC)"
                        }
                        value={tableauNumber}
                        onChange={(e) => setTableauNumber(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono text-slate-200 glass focus:outline-none focus:border-indigo-600 uppercase"
                      />
                      <span className="text-[9px] text-amber-300 font-mono block">Format officiel exigé par l'Ordonnance ministérielle.</span>
                    </div>

                    {/* Agrément ministériel number */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Numéro d'agrément ministériel (رقم الإعتماد الوزاري — إن وجد)
                      </label>
                      <input 
                        type="text" 
                        placeholder="ex: MIN-FIN/2014/1982"
                        value={agreeCabinetNumber}
                        onChange={(e) => setAgreeCabinetNumber(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono text-slate-200 glass focus:outline-none focus:border-indigo-600 uppercase"
                      />
                    </div>

                    {/* Experience slider slider: 1–40 years */}
                    <div className="space-y-2 col-span-1 sm:col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                          Années d'Expérience effective (سنوات الخبرة المهنية)
                        </label>
                        <span className="px-2.5 py-0.5 bg-indigo-900/20 border border-indigo-500/20 text-indigo-300 font-mono font-bold text-xs">
                          {yearsExperience} Ans / سنوات
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min={1} 
                        max={40} 
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(Number(e.target.value))}
                        className="w-full accent-indigo-700 cursor-pointer h-1 bg-white/10"
                      />
                      <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                        <span>1 An (Comptable junior)</span>
                        <span>40 Ans (Séniorité suprême)</span>
                      </div>
                    </div>

                    {/* Langues de travail Checklist */}
                    <div className="space-y-2 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Langues de travail (لغات تسيير المعاملات وإصدار التقارير SCF)
                      </label>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        
                        <label className="p-3 bg-white border border-blue-200 rounded-lg flex items-center gap-2.5 cursor-pointer hover:bg-blue-50">
                          <input 
                            type="checkbox" 
                            checked={languagesOfWork.ar}
                            onChange={(e) => setLanguagesOfWork(prev => ({ ...prev, ar: e.target.checked }))}
                            className="accent-indigo-700 cursor-pointer"
                          />
                          <span className="text-xs font-serif font-black text-slate-900">Arabe (العربية)</span>
                        </label>

                        <label className="p-3 bg-white border border-blue-200 rounded-lg flex items-center gap-2.5 cursor-pointer hover:bg-blue-50">
                          <input 
                            type="checkbox" 
                            checked={languagesOfWork.fr}
                            onChange={(e) => setLanguagesOfWork(prev => ({ ...prev, fr: e.target.checked }))}
                            className="accent-indigo-700 cursor-pointer"
                          />
                          <span className="text-xs font-serif font-black text-slate-900">Français</span>
                        </label>

                        <label className="p-3 bg-white border border-blue-200 rounded-lg flex items-center gap-2.5 cursor-pointer hover:bg-blue-50">
                          <input 
                            type="checkbox" 
                            checked={languagesOfWork.en}
                            onChange={(e) => setLanguagesOfWork(prev => ({ ...prev, en: e.target.checked }))}
                            className="accent-indigo-700 cursor-pointer"
                          />
                          <span className="text-xs font-sans font-bold text-slate-900">English</span>
                        </label>

                        <label className="p-3 bg-white border border-blue-200 rounded-lg flex items-center gap-2.5 cursor-pointer hover:bg-blue-50">
                          <input 
                            type="checkbox" 
                            checked={languagesOfWork.tamazight}
                            onChange={(e) => setLanguagesOfWork(prev => ({ ...prev, tamazight: e.target.checked }))}
                            className="accent-indigo-700 cursor-pointer"
                          />
                          <span className="text-xs font-serif font-black text-slate-900">Tamazight</span>
                        </label>

                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ------------------------------------------
                  STEP 2 (CLIENT ONLY): BUSINESS IDENTITY
                  ------------------------------------------ */}
              {currentStep === 2 && regRole === 'client' && (
                <div className="space-y-6 animate-fade-in text-left rtl:text-right">
                  <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                    Étape 2 — Identité de la Sarl / Eurl / Institution et Références Légales
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Entity type dropdowns */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Forme juridique de l'entité (الشكل القانوني للمؤسسة)
                        <span className="text-red-500"> *</span>
                      </label>
                      <select
                        value={entityType}
                        onChange={(e) => setEntityType(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2.5 glass text-xs font-bold font-serif text-slate-200 focus:outline-none focus:border-brand-primary cursor-pointer"
                      >
                        <option value="SARL">SARL (Société à Responsabilité Limitée)</option>
                        <option value="EURL">EURL (Entreprise Unipersonnelle à Responsabilité Limitée)</option>
                        <option value="SPA">SPA (Société par Actions)</option>
                        <option value="SNC">SNC (Société en Nom Collectif)</option>
                        <option value="Auto-entrepreneur">Auto-entrepreneur (Régime fiscal simplifié)</option>
                        <option value="Association">Association à but non lucratif (Loi 12-06)</option>
                        <option value="Startup labellisée">Startup labellisée (DZ Startup label MESRS)</option>
                        <option value="EPA / EPIC">Établissement Public (EPA / EPIC)</option>
                      </select>
                    </div>

                    {/* Dénomination sociale in Arabic + French */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Dénomination Sociale en lettres Latines (اسم الشركة بالفرنسية)
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="ex: SARL Mitidja Agro Industrie"
                        value={companyNameFR}
                        onChange={(e) => setCompanyNameFR(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs text-slate-200 glass focus:outline-none focus:border-brand-primary font-serif font-black"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        اسم الشركة باللغة العربية (العنوان الاجتماعي)
                      </label>
                      <input 
                        type="text" 
                        placeholder="مثال: ش.ذ.م.م متيجة للصناعات الزراعية"
                        value={companyNameAR}
                        onChange={(e) => setCompanyNameAR(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs text-slate-200 glass focus:outline-none focus:border-brand-primary font-serif font-black text-right"
                        dir="rtl"
                      />
                    </div>

                    {/* Registre de commerce number XX/XXXXXX/XX */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Numéro de Registre du Commerce RC (رقم السجل التجاري)
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="ex: 16/00-0142578-B26"
                        value={rcNumber}
                        onChange={(e) => setRcNumber(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono text-slate-200 glass focus:outline-none focus:border-brand-primary"
                      />
                      <span className="text-[9px] text-slate-400 font-mono">Format requis par le CNRC : Wilaya/Code-Numéro-Année</span>
                    </div>

                    {/* NIF: 15 digits */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Numéro d'Identification Fiscale NIF (رقم التعريف الجبائي)
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        maxLength={15}
                        placeholder="ex: 001612054789412"
                        value={nifNumber}
                        onChange={(e) => setNifNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono tracking-widest text-slate-200 glass focus:outline-none focus:border-brand-primary"
                      />
                      <span className="text-[9px] text-brand-primary font-mono block">Doit faire exactement 15 chiffres règlementaires (DGI).</span>
                    </div>

                    {/* AI Optional */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Numéro d'Article d'Imposition AI (رقم المادة الضريبية — اختياري)
                      </label>
                      <input 
                        type="text" 
                        placeholder="ex: 16032481056"
                        value={aiNumber}
                        onChange={(e) => setAiNumber(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono text-slate-200 glass focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    {/* Activity Sectors */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Secteur d'Activité principale (قطاع النشاط الرئيسي)
                      </label>
                      <select
                        value={secteurActivite}
                        onChange={(e) => setSecteurActivite(e.target.value)}
                        className="w-full border border-blue-200 rounded-none p-2 glass text-xs text-slate-300 focus:outline-none focus:border-brand-primary cursor-pointer font-serif font-black"
                      >
                        <option value="Commerce de détail">Commerce de détail (تجارة التجزئة)</option>
                        <option value="Commerce de gros">Commerce de gros (تجارة الجملة)</option>
                        <option value="BTP / Construction">BTP & Construction (البناء والأشغال العامة)</option>
                        <option value="Agriculture & Elevage">Agriculture & Élevage (الفلاحة والصناعات الغذائية)</option>
                        <option value="Industrie / Manufacturing">Industrie transformatrice (صناعة تحويلية)</option>
                        <option value="Tech & Numérique">Tech & Numérique (برمجيات وابتكار سحابي)</option>
                        <option value="Services administratifs">Services professionnels (خدمات تجارية واستشارية)</option>
                        <option value="Import-Export">Import-Export (استيراد وتصدير)</option>
                        <option value="Tourisme & Hôtellerie">Tourisme & Hôtellerie (سياحة وفنادق)</option>
                      </select>
                    </div>

                    {/* Régime Fiscal selection */}
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Régime Fiscal applicable (النظام الجبائي المتبع)
                      </label>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        
                        <label className="p-3 bg-white border border-blue-200 rounded-lg flex items-start gap-2.5 cursor-pointer hover:bg-blue-50">
                          <input 
                            type="radio" 
                            name="regime_fisc"
                            checked={regimeFiscal === 'Régime réel (IBS)'}
                            onChange={() => setRegimeFiscal('Régime réel (IBS)')}
                            className="accent-brand-primary cursor-pointer mt-0.5"
                          />
                          <div className="space-y-1 text-left rtl:text-right">
                            <span className="text-xs font-serif font-black text-white block leading-tight">Régime Réel (IBS)</span>
                            <span className="text-[9px] text-slate-400 font-mono block">Bilan complet obligatoire, déclaration G50</span>
                          </div>
                        </label>

                        <label className="p-3 bg-white border border-blue-200 rounded-lg flex items-start gap-2.5 cursor-pointer hover:bg-blue-50">
                          <input 
                            type="radio" 
                            name="regime_fisc"
                            checked={regimeFiscal === 'Régime simplifié (IRG)'}
                            onChange={() => setRegimeFiscal('Régime simplified (IRG)')}
                            className="accent-brand-primary cursor-pointer mt-0.5"
                          />
                          <div className="space-y-1 text-left rtl:text-right">
                            <span className="text-xs font-serif font-black text-white block leading-tight">Régime Simplifié</span>
                            <span className="text-[9px] text-slate-400 font-mono block">Souscription comptabilité simplification</span>
                          </div>
                        </label>

                        <label className="p-3 bg-white border border-blue-200 rounded-lg flex items-start gap-2.5 cursor-pointer hover:bg-blue-50">
                          <input 
                            type="radio" 
                            name="regime_fisc"
                            checked={regimeFiscal === 'Régime IFU (Impôt Forfait Unique)'}
                            onChange={() => setRegimeFiscal('Régime IFU (Impôt Forfait Unique)')}
                            className="accent-brand-primary cursor-pointer mt-0.5"
                          />
                          <div className="space-y-1 text-left rtl:text-right">
                            <span className="text-xs font-serif font-black text-white block leading-tight">Auto-entrepreneur (IFU)</span>
                            <span className="text-[9px] text-slate-400 font-mono block">CA inférieur à 30M DA, impôt unique de 5%</span>
                          </div>
                        </label>

                      </div>

                    </div>

                  </div>
                </div>
              )}

              {/* ------------------------------------------
                  STEP 3 (PROFESSIONAL ONLY): DOCUMENT UPLOAD
                  ------------------------------------------ */}
              {currentStep === 3 && regRole === 'professional' && (
                <div className="space-y-6 animate-fade-in text-left rtl:text-right" id="pro_doc_upload_step">
                  <div>
                    <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                      Étape 3 — Dossier d'agrément numérisé obligatoire
                    </h3>
                    <p className="text-[11px] text-amber-300 font-mono mt-1 pr-1 border-l-2 border-[#F59E0B]">
                      ⚠️ كل الوثائق مطلوبة — التحقق إلزامي قبل تفعيل الحساب من مصالح أكونيت الرقابية للحد من التزوير.
                    </p>
                  </div>

                  {/* Wizard 4-grid documents block interface */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 border border-blue-200 bg-white/30">
                    
                    <DocumentUpload 
                      label="Carte Professionnelle ONEC / ONCC / ONCA"
                      labelAR="البطاقة المهنية للهيئة الوطنية"
                      description="Certificat d'agrément actif délivré par l'ordre (ex: cartonnée ou plastique)"
                      required={true}
                      acceptedTypes={['pdf', 'jpg', 'png']}
                      maxSizeMB={5}
                      legalTooltip="Art 12 de la loi 10-01 régissant l'exercice comptable"
                      onUpload={(file, base64) => setProDocs(prev => ({ ...prev, cartePro: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setProDocs(prev => ({ ...prev, cartePro: null }))}
                    />

                    <DocumentUpload 
                      label="Pièce d'Identité Nationale"
                      labelAR="الهوية الوطنية (بطاقة بيومترية أو جواز سفر)"
                      description="Carte d'identité CIN recto-verso ou première page du passeport"
                      required={true}
                      acceptedTypes={['pdf', 'jpg', 'png']}
                      maxSizeMB={5}
                      onUpload={(file, base64) => setProDocs(prev => ({ ...prev, identity: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setProDocs(prev => ({ ...prev, identity: null }))}
                    />

                    <DocumentUpload 
                      label="Attestation d'Inscription au Tableau National"
                      labelAR="شهادة القيد بجدول المنظمة الوطنية للمحاسبين"
                      description="Fiche d'exercice de l'exercice en cours"
                      required={true}
                      acceptedTypes={['pdf']}
                      maxSizeMB={5}
                      legalTooltip="Nécessaire pour synchroniser votre liasse fiscale avec la Direction Spéciale des Impôts (DGI)."
                      onUpload={(file, base64) => setProDocs(prev => ({ ...prev, attestationInsc: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setProDocs(prev => ({ ...prev, attestationInsc: null }))}
                    />

                    <DocumentUpload 
                      label="Décision d'Agrément Ministériel (Optionnel)"
                      labelAR="قرار الاعتماد الصادر من وزارة المالية"
                      description="Décision ministérielle d'autorisation d'ouverture"
                      required={false}
                      acceptedTypes={['pdf']}
                      maxSizeMB={5}
                      onUpload={(file, base64) => setProDocs(prev => ({ ...prev, decisionAgree: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setProDocs(prev => ({ ...prev, decisionAgree: null }))}
                    />

                  </div>

                  {/* 3/4 documents chargés progress tracker status indicator bar */}
                  <div className="glass border p-4 flex items-center justify-between gap-4 font-mono select-none">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Rapport du dossier d'agrément</span>
                    
                    {(() => {
                      const uploadedCount = [proDocs.cartePro, proDocs.identity, proDocs.attestationInsc, proDocs.decisionAgree].filter(Boolean).length;
                      return (
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-bold text-indigo-700">{uploadedCount} / 4 Chargés</span>
                          <div className="w-24 bg-blue-50/50 h-2">
                            <div className="bg-indigo-700 h-full transition-all duration-200" style={{ width: `${(uploadedCount/4)*100}%` }}></div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                </div>
              )}

              {/* ------------------------------------------
                  STEP 3 (CLIENT ONLY): CLIENT DOCUMENT UPLOAD
                  ------------------------------------------ */}
              {currentStep === 3 && regRole === 'client' && (
                <div className="space-y-6 animate-fade-in text-left rtl:text-right" id="client_doc_upload_step">
                  <div>
                    <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                      Étape 3 — Dossier Légal de Constitution de l'Entreprise
                    </h3>
                    <p className="text-[11px] text-brand-primary font-mono mt-1 pr-1 border-l-2 border-brand-primary">
                      ✓ Pièces justificatives requises sous format électronique pour sécuriser les futurs contrats B2B ou liasse fiscale de clôture.
                    </p>
                  </div>

                  {/* Custom list of uploaders tailored to Algerian context */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 border border-blue-200 bg-white/30">
                    
                    <DocumentUpload 
                      label="Extrait du Registre de Commerce (RC)"
                      labelAR="مستخرج السجل التجاري كود سري"
                      description="Copie certifiée conforme du RC délivré par le CNRC datant de moins de 3 mois"
                      required={true}
                      acceptedTypes={['pdf', 'jpg', 'png']}
                      maxSizeMB={5}
                      legalTooltip="Le Registre du Commerce est la pièce maîtresse légale d'existence des sociétés marchandes en Algérie."
                      onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, extraitRC: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setClientDocs(prev => ({ ...prev, extraitRC: null }))}
                    />

                    <DocumentUpload 
                      label="Carte d'Immatriculation Fiscale (NIF)"
                      labelAR="بطاقة التعريف الجبائي الممنوحة من الضرائب"
                      description="Numéro d'Identification Fiscale délivré par le CDI/CPI local"
                      required={true}
                      acceptedTypes={['pdf', 'jpg', 'png']}
                      maxSizeMB={5}
                      onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, carteNIF: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setClientDocs(prev => ({ ...prev, carteNIF: null }))}
                    />

                    <DocumentUpload 
                      label="Extrait de Rôle Apuré (Recommandé)"
                      labelAR="جدول الضرائب المصفى (ساري المفعول)"
                      description="Attestation d'absence de dette fiscale exigible pour marchés"
                      required={false}
                      acceptedTypes={['pdf']}
                      maxSizeMB={5}
                      legalTooltip="Obligatoire pour la souscription aux marchés ou la levée de devises selon le décret de régulation des transactions financières."
                      onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, roleApure: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setClientDocs(prev => ({ ...prev, roleApure: null }))}
                    />

                    <DocumentUpload 
                      label="Pièce d'identité du gérant"
                      labelAR="هوية ممثل الشركة القانوني"
                      description="Carte Nationale CIN biométrique ou passeport en cours"
                      required={true}
                      acceptedTypes={['pdf', 'jpg', 'png']}
                      maxSizeMB={5}
                      onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, gerantId: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setClientDocs(prev => ({ ...prev, gerantId: null }))}
                    />

                    {/* Conditional Upload zone: Association - Recepisse */}
                    {entityType === 'Association' && (
                      <div className="col-span-1 sm:col-span-2">
                        <DocumentUpload 
                          label="Récépissé d'agrément de l'association (Loi 12-06)"
                          labelAR="وصل اعتماد الجمعية المعتمد"
                          description="Agrément de l'association délivré par les services administratifs de la wilaya"
                          required={true}
                          acceptedTypes={['pdf']}
                          maxSizeMB={5}
                          onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, recepisseAssociation: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                          onRemove={() => setClientDocs(prev => ({ ...prev, recepisseAssociation: null }))}
                        />
                      </div>
                    )}

                    {/* Conditional Upload zone: Startup - Certificat Label */}
                    {entityType === 'Startup labellisée' && (
                      <div className="col-span-1 sm:col-span-2">
                        <DocumentUpload 
                          label="Certificat officiel du Label Startup DZ"
                          labelAR="شهادة الحصول على علامة مؤسسة ناشئة"
                          description="Délivré par le Ministère délégué chargé de l'Économie de la Connaissance et des Startups"
                          required={true}
                          acceptedTypes={['pdf', 'jpg', 'png']}
                          maxSizeMB={5}
                          onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, certificatStartup: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                          onRemove={() => setClientDocs(prev => ({ ...prev, certificatStartup: null }))}
                        />
                      </div>
                    )}

                  </div>

                  {/* Summary Checklist before submission */}
                  <div className="glass border p-5 space-y-4 shadow-3xs text-left rtl:text-right">
                    <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-wider block">Engagement de probité légale</span>
                    
                    <label className="flex gap-2.5 cursor-pointer text-xs leading-relaxed select-none text-slate-300 font-sans">
                      <input 
                        type="checkbox" 
                        checked={attestHonourClient}
                        onChange={(e) => setAttestHonourClient(e.target.checked)}
                        className="accent-brand-primary cursor-pointer mt-0.5 shrink-0"
                        id="client_attest_honour_check"
                      />
                      <span>
                        {language === 'ar'
                          ? 'أشهد على الشرف بصحة البيانات والوثائق المقدمة، وبأنها أصلية ومطابقة لواقع المحل والشركة وفق القانون الجنائي الجزائري المتعلق بالتزوير واستخدام المزور.'
                          : 'J\'atteste sur l\'honneur que les informations fournies sont exactes et que les documents téléversés sont authentiques, conformément à l\'article 222 du Code Pénal algérien relatif au faux et usage de faux.'}
                      </span>
                    </label>
                  </div>

                </div>
              )}

              {/* ------------------------------------------
                  STEP 4 (PROFESSIONAL ONLY): REVIEW & SUBMIT
                  ------------------------------------------ */}
              {currentStep === 4 && regRole === 'professional' && (
                <div className="space-y-6 animate-fade-in text-left rtl:text-right" id="pro_review_step">
                  <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                    Étape 4 — Récapitulatif et validation du dossier
                  </h3>

                  {/* Summary card with core state representations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-white border border-blue-200 rounded-xl p-5 space-y-3.5 shadow-classic">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">IDENITÉ & COMPTE</span>
                      <div className="space-y-2 text-xs">
                        <p><strong className="text-slate-400">Nom complet/المكتب :</strong> {fullName}</p>
                        <p><strong className="text-slate-400">E-mail :</strong> {email}</p>
                        <p><strong className="text-slate-400">Téléphone d'exercice :</strong> +213 {phoneOperator}{phoneRest}</p>
                        <p><strong className="text-slate-400">Wilaya principale :</strong> {algerianWilayas.find(w => w.id === selectedWilayaId)?.name.fr}</p>
                      </div>
                    </div>

                    <div className="bg-white border border-blue-200 rounded-xl p-5 space-y-3.5 shadow-classic">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">CREDENTIELS RECOUPÉS</span>
                      <div className="space-y-2 text-xs">
                        <p><strong className="text-slate-400">Titre :</strong> {specialty.toUpperCase()}</p>
                        <p><strong className="text-slate-400">Numéro de registre Tableau :</strong> <span className="font-mono text-brand-primary font-bold">{tableauNumber}</span></p>
                        <p><strong className="text-slate-400">Agrément fiscal :</strong> {agreeCabinetNumber || 'Non applicable'}</p>
                        <p><strong className="text-slate-400 text-xs">Séniorité d'exercice :</strong> {yearsExperience} Ans d'expérience</p>
                      </div>
                    </div>

                  </div>

                  {/* Document checksum verification list with green checks */}
                  <div className="glass border border-blue-200 p-5 space-y-3 shadow-3xs">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">INDEX DE VERIFIABILTÉ DU DOSSIER (ONCC CHECK)</span>
                    
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono p-2 bg-white/80">
                        <span className="flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Carte Professionnelle</span>
                        <span className="text-slate-400 text-[10px] truncate max-w-xs">{proDocs.cartePro?.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono p-2 bg-white/80">
                        <span className="flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Carte Nationale CIN</span>
                        <span className="text-slate-400 text-[10px] truncate max-w-xs">{proDocs.identity?.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono p-2 bg-white/80">
                        <span className="flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Fiche d'inscription au Tableau</span>
                        <span className="text-slate-400 text-[10px] truncate max-w-xs">{proDocs.attestationInsc?.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Algerian article code check */}
                  <div className="glass border p-5 space-y-4 shadow-3xs">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-wider block">Déclaration de conformité pénale</span>
                    
                    <label className="flex gap-2.5 cursor-pointer text-xs leading-relaxed select-none text-slate-300 font-sans">
                      <input 
                        type="checkbox" 
                        checked={attestHonourPro}
                        onChange={(e) => setAttestHonourPro(e.target.checked)}
                        className="accent-indigo-700 cursor-pointer mt-0.5 shrink-0"
                        id="pro_attest_honour_check"
                      />
                      <span>
                        {language === 'ar'
                          ? 'أشهد على الشرف بصحة البيانات والوثائق المقدمة، وبأنها أصلية ومطابقة للواقع المهني تماشياً مع المادة 222 من قانون العقوبات الجزائري المتعلق بالفوز واستعمال المزور.'
                          : 'J\'atteste sur l\'honneur que les informations fournies sont exactes et que les documents téléversés sont authentiques, conformément à l\'article 222 du Code Pénal algérien relatif au faux et usage de faux.'}
                      </span>
                    </label>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* 3. WIZARD STEPPERS CONTROLLERS ACTION BUTTONS BAR */}
        {!registrationSuccess && (
          <div className="bg-white border-t border-blue-100 px-6 py-4 flex justify-between items-center select-none shrink-0" id="wizard_buttons_bar">
            
            {/* Back Button */}
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={handlePrevStep}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase transition flex items-center gap-1 hover:bg-blue-50 border ${
                currentStep === 1 
                  ? 'border-blue-100 text-slate-400 pointer-events-none' 
                  : 'border-blue-200 text-slate-300 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>Précédent</span>
            </button>

            {/* Stepper position tracker on central bar */}
            <div className="hidden sm:flex items-center gap-1.5">
              {activeStepsDef.map((st) => (
                <div 
                  key={st.num}
                  className={`w-2.5 h-2.5 rounded-none ${st.num === currentStep ? 'bg-brand-primary' : 'bg-blue-100/50'}`}
                ></div>
              ))}
            </div>

            {/* Next / Submit Button */}
            {isLastWizardStep ? (
              <button
                type="button"
                onClick={regRole === 'professional' ? handleFinalSubmitPro : handleFinalSubmitClient}
                className={`px-6 py-2 bg-emerald-700 hover:bg-emerald-800 hover:scale-[1.01] text-slate-900 text-[10px] font-mono font-bold uppercase tracking-widest transition cursor-pointer shadow-xs`}
                id="wizard_final_save_btn"
              >
                <span>Soumettre le Dossier</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-brand-primary hover:bg-brand-dark hover:scale-[1.01] text-slate-900 text-[10px] font-mono font-bold uppercase tracking-widest transition cursor-pointer shadow-xs flex items-center gap-1"
                id="wizard_next_step_btn"
              >
                <span>Suivant</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
