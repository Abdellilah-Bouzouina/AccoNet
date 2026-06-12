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
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);

  // ------------------------------------------
  // FORM VARIABLES
  // ------------------------------------------
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState(''); 
  const [phoneOperator, setPhoneOperator] = useState('06'); 
  const [phoneRest, setPhoneRest] = useState(''); 
  const [selectedWilayaId, setSelectedWilayaId] = useState<number>(16); 
  
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
  const [stepErrors, setStepErrors] = useState<string | null>(null);

  const handleRoleToggle = (role: 'client' | 'professional') => {
    setRegRole(role);
    setCurrentStep(1);
    setStepErrors(null);
    setRegistrationSuccess(null);
  };

  const validateCurrentStep = (): boolean => {
    setStepErrors(null);
    const parsedEmail = email.trim();

    if (currentStep === 1) {
      if (!fullName) {
        setStepErrors(
          language === 'ar' ? 'يرجى إدخال الاسم الكامل.' : 
          language === 'en' ? 'Please enter your full name.' : 
          'Veuillez renseigner votre nom complet.'
        );
        return false;
      }
      if (!parsedEmail || !parsedEmail.includes('@')) {
        setStepErrors(
          language === 'ar' ? 'يرجى إدخال بريد إلكتروني مهني صالح.' : 
          language === 'en' ? 'Please enter a valid professional email address.' : 
          'Veuillez saisir un e-mail professionnel valide.'
        );
        return false;
      }
      if (password.length < 8) {
        setStepErrors(
          language === 'ar' ? 'كلمة المرور يجب أن لا تقل عن 8 رموز.' : 
          language === 'en' ? 'Password must be at least 8 characters long.' : 
          'Le mot de passe doit comporter au moins 8 caractères.'
        );
        return false;
      }
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (!hasNumber || !hasSpecial) {
        setStepErrors(
          language === 'ar' ? 'كلمة المرور يجب أن تحتوى على رقم واحد ورمز خاص واحد على الأقل.' : 
          language === 'en' ? 'Password must contain at least one number and one special character.' : 
          'Le mot de passe doit contenir au moins un chiffre et un caractère spécial.'
        );
        return false;
      }
      if (password !== confirmPassword) {
        setStepErrors(
          language === 'ar' ? 'كلمتا المرور غير متطابقتين.' : 
          language === 'en' ? 'Passwords do not match.' : 
          'Les mots de passe ne correspondent pas.'
        );
        return false;
      }
      if (phoneRest.length < 7) {
        setStepErrors(
          language === 'ar' ? 'يرجى إدخال رقم هاتف جزائري صحيح.' : 
          language === 'en' ? 'Please enter a valid Algerian phone number.' : 
          'Veuillez entrer un numéro de téléphone algérien valide.'
        );
        return false;
      }
    }

    if (regRole === 'professional') {
      if (currentStep === 2) {
        if (!tableauNumber) {
          setStepErrors(
            language === 'ar' ? 'رقم القيد في الجدول الوطني إلزامي.' : 
            language === 'en' ? 'Registration number on the National Roster is required.' : 
            "Le numéro d'inscription au Tableau National de l'Ordre est requis."
          );
          return false;
        }
      }
      if (currentStep === 3) {
        if (!proDocs.cartePro) {
          setStepErrors(
            language === 'ar' ? 'يرجى تحميل بطاقتك المهنية.' : 
            language === 'en' ? 'Please upload your Professional Card.' : 
            'Veuillez téléverser votre Carte Professionnelle.'
          );
          return false;
        }
        if (!proDocs.identity) {
          setStepErrors(
            language === 'ar' ? 'يرجى تحميل وثيقة الهوية الشخصية.' : 
            language === 'en' ? 'Please upload your ID Document.' : 
            "Veuillez téléverser votre Pièce d'Identité."
          );
          return false;
        }
        if (!proDocs.attestationInsc) {
          setStepErrors(
            language === 'ar' ? 'يرجى تحميل شهادة القيد في الجدول الوطني.' : 
            language === 'en' ? 'Please upload your Enrollment Certificate.' : 
            "Veuillez téléverser votre Attestation d'Inscription."
          );
          return false;
        }
      }
    } else {
      if (currentStep === 2) {
        if (!companyNameFR && !companyNameAR) {
          setStepErrors(
            language === 'ar' ? 'يرجى إدخال الاسم التجاري للشركة.' : 
            language === 'en' ? 'Please enter your company trade name.' : 
            'Veuillez saisir la dénomination de votre entreprise.'
          );
          return false;
        }
        if (!rcNumber) {
          setStepErrors(
            language === 'ar' ? 'رقم السجل التجاري إلزامي.' : 
            language === 'en' ? 'Commercial Registry (RC) number is required.' : 
            "Le Numéro d'inscription au Registre du Commerce (RC) est requis."
          );
          return false;
        }
        if (!rcNumber.includes('/')) {
          setStepErrors(
            language === 'ar' ? 'تنسيق السجل التجاري يجب أن يشبه XX/XXXXXX/XX.' : 
            language === 'en' ? 'RC format must follow XX/XXXXXX/XX style.' : 
            "Le format du RC doit ressembler à XX/XXXXXX/XX (ex: 16/00-109432B18)."
          );
          return false;
        }
        if (!nifNumber || nifNumber.length !== 15) {
          setStepErrors(
            language === 'ar' ? 'رقم التعريف الجبائي (NIF) يجب أن يتكون من 15 رقماً.' : 
            language === 'en' ? 'Tax Identification Number (NIF) must be exactly 15 digits.' : 
            "Le Numéro d'Identification Fiscale (NIF) doit comporter exactement 15 chiffres."
          );
          return false;
        }
      }
      if (currentStep === 3) {
        if (!clientDocs.extraitRC) {
          setStepErrors(
            language === 'ar' ? 'يرجى تحميل مستخرج السجل التجاري (RC).' : 
            language === 'en' ? 'Please upload your Commercial Registry Extract (RC).' : 
            'Veuillez charger votre Extrait de Registre de Commerce (RC).'
          );
          return false;
        }
        if (!clientDocs.carteNIF) {
          setStepErrors(
            language === 'ar' ? 'يرجى تحميل بطاقة التعريف الجبائي (NIF).' : 
            language === 'en' ? 'Please upload your Tax Card (NIF).' : 
            "Veuillez charger votre Carte d'Immatriculation Fiscale (NIF)."
          );
          return false;
        }
        if (!clientDocs.gerantId) {
          setStepErrors(
            language === 'ar' ? 'يرجى تحميل هوية جينرال المسير.' : 
            language === 'en' ? 'Please upload the manager ID Document.' : 
            "Veuillez charger la Pièce d'Identité du gérant représentant légal."
          );
          return false;
        }
        if (entityType === 'Association' && !clientDocs.recepisseAssociation) {
          setStepErrors(
            language === 'ar' ? 'يرجى تحميل رخص الترخيص الخاصة بالجمعية.' : 
            language === 'en' ? 'Please upload the Association Approval Receipt.' : 
            "Veuillez charger le Récépissé d'agrément de l'association (Loi 12-06)."
          );
          return false;
        }
        if (entityType === 'Startup labellisée' && !clientDocs.certificatStartup) {
          setStepErrors(
            language === 'ar' ? 'يرجى تحميل شهادة علامة شركة ناشئة.' : 
            language === 'en' ? 'Please upload your Startup Label Certificate.' : 
            "Veuillez charger votre Certificat de Label Startup DZ."
          );
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

  const handleFinalSubmitPro = () => {
    if (!attestHonourPro) {
      setStepErrors(
        language === 'ar' ? 'يجب عليك تأكيد صحة الوثائق بموجب القانون جزائري.' : 
        language === 'en' ? 'You must accept the declaration on honor to continue.' : 
        "Veuillez cocher l'attestation sur l'honneur pour continuer."
      );
      return;
    }
    const referenceId = `ACC-PRO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setRegistrationSuccess(referenceId);

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
        ar: `مكتب معتمد ومسجل. اللغات المعتمدة: ${languagesOfWork.ar ? 'العربية' : ''} ${languagesOfWork.fr ? 'الفرنسية' : ''}. خبرة ممتدة لـ ${yearsExperience} سنة.`,
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
      setStepErrors(
        language === 'ar' ? 'يجب عليك تأكيد صحة البيانات والوثائق بموجب القانون.' : 
        language === 'en' ? 'You must accept the declaration on honor to submit.' : 
        "Veuillez cocher l'attestation sur l'honneur pour soumettre."
      );
      return;
    }

    const referenceId = `ACC-CLI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setRegistrationSuccess(referenceId);

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

  const proStepsDef = [
    { num: 1, title: 'Compte Info', titleAR: 'معلومات الحساب', titleEN: 'Account Info' },
    { num: 2, title: 'Identité Pro', titleAR: 'الهوية المهنية', titleEN: 'Pro Identity' },
    { num: 3, title: 'Téléversements', titleAR: 'رفع الوثائق', titleEN: 'Upload Docs' },
    { num: 4, title: 'Validation', titleAR: 'التحقق والمراجعة', titleEN: 'Validation' }
  ];

  const clientStepsDef = [
    { num: 1, title: 'Compte Info', titleAR: 'معلومات الحساب', titleEN: 'Account Info' },
    { num: 2, title: 'Société Identité', titleAR: 'تفاصيل المؤسسة', titleEN: 'Company Info' },
    { num: 3, title: 'Documents Légaux', titleAR: 'تحميل المستندات', titleEN: 'Legal Docs' }
  ];

  const activeStepsDef = regRole === 'professional' ? proStepsDef : clientStepsDef;
  const isLastWizardStep = currentStep === activeStepsDef.length;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row bg-white antialiased" id="register_full_wizard" dir={direction}>
      
      {/* 1. LEFT PANEL */}
      <div className="w-full lg:w-1/3 bg-white text-slate-900 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-blue-500/30 shrink-0 select-none">
        <div className="space-y-6">
          
          <Link to="/" className="inline-flex items-center space-x-2.5 rtl:space-x-reverse text-left">
            <span className="flex items-center justify-center w-8 h-8 rounded-none glass text-brand-primary font-bold text-lg border border-blue-200">
              أ
            </span>
            <span className="text-xl font-serif font-semibold tracking-tight text-slate-900">
              AccoNet <span className="text-brand-accent">أكونيت</span>
            </span>
          </Link>

          {!registrationSuccess && (
            <div className="hidden lg:block pt-8 space-y-7 text-left rtl:text-right">
              <span className="text-[9px] font-mono font-bold text-brand-accent uppercase tracking-widest block mb-4">
                {regRole === 'professional' 
                  ? (language === 'ar' ? 'إعداد ملف المهني' : language === 'en' ? 'MHNI PROFILE ONBOARDING' : 'MHNI PROFILE ONBOARDING') 
                  : (language === 'ar' ? 'إعداد ملف المؤسسة' : language === 'en' ? 'ENTERPRISE ONBOARDING' : 'ENTERPRISE ONBOARDING')}
              </span>

              {activeStepsDef.map((st) => {
                const isActive = st.num === currentStep;
                const isCompleted = st.num < currentStep;

                return (
                  <div key={st.num} className="flex items-start gap-4">
                    <div className={`w-8 h-8 flex items-center justify-center shrink-0 border ${
                      isActive 
                        ? 'border-brand-accent bg-brand-primary text-slate-900 font-black' 
                        : isCompleted
                          ? 'border-emerald-500 bg-emerald-600/20 text-emerald-600'
                          : 'border-blue-200 text-slate-400'
                    }`}>
                      {isCompleted ? '✓' : st.num}
                    </div>

                    <div className="space-y-0.5">
                      <p className={`text-xs font-bold font-mono tracking-wide ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                        {language === 'ar' ? st.titleAR : language === 'en' ? st.titleEN : st.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!registrationSuccess && (
            <div className="block lg:hidden mt-2 p-3 bg-blue-50/50 border border-blue-200">
              <div className="flex justify-between text-xs font-mono text-slate-500">
                <span>
                  {language === 'ar' ? `الخطوة ${currentStep} من ${activeStepsDef.length}` : 
                   language === 'en' ? `Step ${currentStep} of ${activeStepsDef.length}` : 
                   `Étape ${currentStep} sur ${activeStepsDef.length}`}
                </span>
                <span className="text-brand-accent font-bold">
                  {language === 'ar' ? activeStepsDef[currentStep - 1]?.titleAR : 
                   language === 'en' ? activeStepsDef[currentStep - 1]?.titleEN : 
                   activeStepsDef[currentStep - 1]?.title}
                </span>
              </div>
              <div className="w-full bg-blue-100 h-1 mt-2 overflow-hidden rounded-none">
                <div 
                  className="bg-brand-accent h-full transition-all duration-300"
                  style={{ width: `${(currentStep / activeStepsDef.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

        </div>

        <div className="pt-6 border-t border-blue-200 text-[10px] text-slate-500 font-mono space-y-1.5 text-left rtl:text-right">
          <p className="font-bold flex items-center gap-1 text-amber-600">
            <Scale className="w-3.5 h-3.5" />
            <span>
              {language === 'ar' ? 'القانون التجاري والقانون المدني' : 
               language === 'en' ? 'INDUSTRIAL LAW & CIVIL CODE' : 
               'LOI INDUSTRIELLE & CODE CIVIL'}
            </span>
          </p>
          <p className="leading-relaxed">
            {language === 'ar' ? 'إيداع مشفر والمطابقة مع السجل الوطني لوزارة المالية ومنظمات ONEC ،ONCC و ONCA.' :
             language === 'en' ? 'Encrypted transmission. Verification matches DGI National registries & ONEC, ONCC, ONCA rosters.' :
             "Dossier crypté. Tous les dossiers sont confrontés au registre national du Ministère des Finances & Tableaux de l'ONEC, de l'ONCC et de l'ONCA."}
          </p>
        </div>
      </div>

      {/* 2. RIGHT PANEL */}
      <div className="flex-1 flex flex-col justify-between min-w-0" id="wizard_interaction_area">

        {!registrationSuccess && currentStep === 1 && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{t('accountTypeLabel')}</p>
              <h2 className="text-xs text-slate-600 font-mono mt-0.5">
                {language === 'ar' ? 'اختر نوع الحساب المناسب لنشاطك على منصة أكونيت.' : 
                 language === 'en' ? 'Choose the business profile that best fits your activity on AccoNet.' : 
                 'Choisissez le profil adapté à votre activité sur la plateforme AccoNet.'}
              </h2>
            </div>

            <div className="flex gap-2 p-1 bg-white border border-blue-200 select-none shrink-0">
              <button
                type="button"
                onClick={() => handleRoleToggle('client')}
                className={`px-4 py-2 cursor-pointer text-xs font-bold uppercase transition flex items-center gap-2 ${
                  regRole === 'client' 
                    ? 'bg-blue-50 text-brand-primary border border-blue-200 font-black' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-brand-primary" />
                <span>
                  {language === 'ar' ? 'المؤسسة / الشركة' : 
                   language === 'en' ? 'Enterprise (Client)' : 
                   'Entreprise (Client)'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleToggle('professional')}
                className={`px-4 py-2 cursor-pointer text-xs font-bold uppercase transition flex items-center gap-2 ${
                  regRole === 'professional' 
                    ? 'bg-blue-50 text-indigo-700 border border-blue-200 font-black' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4 text-indigo-700" />
                <span>
                  {language === 'ar' ? 'المهني / المكتب' : 
                   language === 'en' ? 'Professional (Cabinet)' : 
                   'Professionnel (Cabinet)'}
                </span>
              </button>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-10 lg:p-16 max-w-4xl w-full mx-auto flex-1 overflow-y-auto">
          
          {registrationSuccess ? (
            <div className="bg-white border border-blue-200 p-8 sm:p-12 text-center text-left rtl:text-right space-y-6" id="reg_success_pane">
              <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto rounded-full">
                <BadgeCheck className="w-10 h-10 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <span className="px-2.5 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-mono font-bold uppercase tracking-widest">
                  {language === 'ar' ? 'تم استلام الملف بنجاح' : language === 'en' ? 'Dossier Registered Successfully' : 'Dossier Enregistré avec Succès'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                  {language === 'ar' ? 'تم رفع طلب الانضمام والتحقق !' : language === 'en' ? 'Onboarding Request Submitted!' : 'Demande d\'adhésion soumise !'}
                </h1>
                <p className="text-xs text-slate-500 max-w-xl mx-auto font-sans leading-relaxed">
                  {language === 'ar' ? 'تم تسجيل ملف السجل ووثائق الاعتماد الخاصة بكم بدقة في مخزن البيانات الجزائري المشفر. ستتم مطابقة البيانات مع سجلات الهيئات الوطنية خلال 48 ساعة.' : 
                   language === 'en' ? 'Your profile data is securely stored under processing. You will receive an activation notification inside 48 opening hours following auditing.' : 
                   "Votre dossier est en cours de vérification. Vous recevrez une notification d'activation réglementaire sous 48 heures heures ouvrables."}
                </p>
              </div>

              <div className="bg-slate-50 border border-blue-200 p-4 max-w-md mx-auto">
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  {language === 'ar' ? 'رقم مرجع ملف الاعتماد' : language === 'en' ? 'DOSSIER AUDIT REFERENCE' : "RÉFÉRENCE DU DOSSIER D'AGRÉMENT"}
                </p>
                <p className="text-xl font-mono font-black text-brand-primary mt-1 tracking-wider select-all">{registrationSuccess}</p>
              </div>

              <div className="max-w-xs mx-auto pt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => navigate(regRole === 'professional' ? '/dashboard/professional' : '/dashboard/client')}
                  className="w-full py-2.5 bg-brand-primary text-slate-900 text-[10px] font-mono uppercase tracking-widest transition cursor-pointer font-bold shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'الدخول إلى التجربة الفورية' : language === 'en' ? 'Access Immediate Workspace' : 'Accéder à ma démo immédiate'}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <Link to="/" className="block text-xs font-bold text-slate-400 hover:text-slate-900 font-mono">
                  {language === 'ar' ? 'العودة للصفحة الرئيسية' : language === 'en' ? 'Back to homepage' : "Retourner à l'accueil"}
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              
              <div className="pb-4 border-b border-blue-200">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <UserPlus className="w-6 h-6 text-brand-primary" />
                  <span>
                    {regRole === 'professional' 
                      ? (language === 'ar' ? `الانضمام كمهني محترف (${activeStepsDef[currentStep-1]?.titleAR})` : language === 'en' ? `Join as Professional (${activeStepsDef[currentStep-1]?.titleEN})` : `Rejoindre en tant que Professionnel (${activeStepsDef[currentStep-1]?.title})`)
                      : (language === 'ar' ? `إنشاء مساحة خاصة بالمؤسسات (${activeStepsDef[currentStep-1]?.titleAR})` : language === 'en' ? `Create Enterprise Workspace (${activeStepsDef[currentStep-1]?.titleEN})` : `Créer votre Espace Entreprises (${activeStepsDef[currentStep-1]?.title})`)
                    }
                  </span>
                </h1>
                <p className="text-[11px] text-brand-primary font-mono font-extrabold uppercase mt-1 tracking-wider">
                  Algeria Legal Compliance Platform (أكونيت الجزائر)
                </p>
              </div>

              {stepErrors && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-mono leading-relaxed text-left rtl:text-right whitespace-pre-line flex items-start gap-2">
                  <X className="w-5 h-5 shrink-0 text-red-600 cursor-pointer" onClick={() => setStepErrors(null)} />
                  <div>
                    <span className="font-bold underline uppercase block mb-1">
                      {language === 'ar' ? 'خطأ في التحقق' : language === 'en' ? 'Validation error' : 'Erreur de saisie'}
                    </span>
                    <p>{stepErrors}</p>
                  </div>
                </div>
              )}

              {/* STEP 1: ACCOUNT INFO */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                    {language === 'ar' ? 'الخطوة 1 — معلومات الحساب الإلزامية' : language === 'en' ? 'Step 1 — Mandatory Login Credentials' : "Étape 1 — Informations d'authentification obligatoires"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left rtl:text-right">
                    
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {regRole === 'professional' 
                          ? (language === 'ar' ? 'النسب واللقب للخبير المعني' : language === 'en' ? "Expert Full Legal Name" : "Nom complet de l'Expert (النسب واللقب)") 
                          : (language === 'ar' ? 'النسب واللقب للمسير القانوني' : language === 'en' ? "Legal Manager Full Name" : "Nom et prénom du responsable légal (النسب واللقب للمسير)")
                        }
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={regRole === 'professional' ? "ex: Me. Lamine Bouhired" : "ex: Karim Haddad"}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2.5 text-xs text-slate-900 bg-white focus:outline-none focus:border-brand-primary font-serif font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'البريد الإلكتروني المهني' : language === 'en' ? 'Corporate Email' : 'E-mail professionnel'}
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative border border-blue-200 rounded-none bg-white px-3 py-2 flex items-center gap-2 focus-within:border-brand-primary">
                        <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                        <input 
                          type="email" 
                          required
                          placeholder="direction@cabinet.dz"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs text-slate-900 bg-transparent focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'رقم الهاتف الجوال' : language === 'en' ? 'Mobile Phone Number' : 'Numéro de Téléphone'}
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="flex border border-blue-200 bg-white focus-within:border-brand-primary">
                        <div className="bg-slate-50 border-r border-blue-200 px-2.5 flex items-center gap-1 shrink-0 select-none">
                          <span className="text-[13px]" title="Algérie">🇩🇿</span>
                          <span className="text-[10px] font-mono font-bold text-slate-500">+213</span>
                          <select
                            value={phoneOperator}
                            onChange={(e) => setPhoneOperator(e.target.value)}
                            className="bg-transparent text-xs font-mono font-bold text-slate-800 outline-none cursor-pointer"
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
                          className="w-full text-xs font-mono tracking-widest text-slate-900 bg-transparent py-2 px-3 focus:outline-none"
                        />
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono">Format: +213 [Oper] [8 chiffres]</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'كلمة المرور' : language === 'en' ? 'Secure Password' : 'Mot de passe sécurisé'}
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative border border-blue-200 rounded-none bg-white px-3 py-2 flex items-center gap-2 focus-within:border-brand-primary">
                        <Lock className="w-4 h-4 text-brand-primary shrink-0" />
                        <input 
                          type="password" 
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full text-xs text-slate-900 bg-transparent focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'تأكيد كلمة المرور' : language === 'en' ? 'Confirm Password' : 'Confirmer le mot de passe'}
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative border border-blue-200 rounded-none bg-white px-3 py-2 flex items-center gap-2 focus-within:border-brand-primary">
                        <Lock className="w-4 h-4 text-brand-primary shrink-0" />
                        <input 
                          type="password" 
                          required
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full text-xs text-slate-900 bg-transparent focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {regRole === 'professional' 
                          ? (language === 'ar' ? 'ولاية ممارسة المهنة الرئيسية' : language === 'en' ? "Primary Wilaya of Practice" : "Wilaya d'exercice principale (ولاية ممارسة المهنة)") 
                          : (language === 'ar' ? 'ولاية المقر الاجتماعي للمؤسسة' : language === 'en' ? "Company Headquarter Wilaya" : "Wilaya du siège social de l'entreprise (ولاية المقر الاجتماعي للمؤسسة)")
                        }
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative border border-blue-200 rounded-none bg-white px-3 py-2 flex items-center gap-2 focus-within:border-brand-primary">
                        <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                        <select
                          value={selectedWilayaId}
                          onChange={(e) => setSelectedWilayaId(Number(e.target.value))}
                          className="w-full bg-transparent text-xs text-slate-900 outline-none cursor-pointer font-serif font-black"
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

              {/* STEP 2 (PROFESSIONAL ONLY): PROFESSIONAL IDENTITY */}
              {currentStep === 2 && regRole === 'professional' && (
                <div className="space-y-6 text-left rtl:text-right">
                  <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-indigo-700">
                    {language === 'ar' ? 'الخطوة 2 — تفاصيل الاعتماد والتخصص' : language === 'en' ? 'Step 2 — Accreditation & Legal Title' : "Étape 2 — Identité de l'agrément & Spécialité légale"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'التخصص المهني والهيئة القانونية' : language === 'en' ? "Specialty & National Association Board" : "Spécialité & Ordre National (التخصص المهني والهيئة القانونية)"}
                        <span className="text-red-500"> *</span>
                      </label>
                      <select
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2.5 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-600 cursor-pointer font-serif"
                      >
                        <option value="certified-accountant">Expert-Comptables (Agréé par l'ONEC)</option>
                        <option value="statutory-auditor">Commissaire aux Comptes (Agréé par l'ONCC)</option>
                        <option value="chartered-accountant">Comptable Agréé (Inscrit au Tableau de l'ONCA)</option>
                        <option value="judicial-expert">Expert Judiciaire Comptable (Près les Cours de Justice)</option>
                        <option value="tax-consultant">Conseiller Fiscal Indépendant (DGI Affilié)</option>
                        <option value="actuaire">Actuaire Certifié (Membre de l'AAA)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'رقم القيد بالجدول الوطني' : language === 'en' ? "Roster Enrollment Number" : "Numéro d'inscription au Tableau (رقم القيد بالجدول الوطني)"}
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={specialty.includes('statutory') ? "ex: CC-09-0118 (ONCC)" : "ex: EC-16-0042 (ONEC)"}
                        value={tableauNumber}
                        onChange={(e) => setTableauNumber(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono text-slate-900 bg-white focus:outline-none focus:border-indigo-600 uppercase"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'رقم الإعتماد الوزاري — إن وجد' : language === 'en' ? "Ministerial License No. (Optional)" : "Numéro d'agrément ministériel (رقم الإعتماد الوزاري — إن وجد)"}
                      </label>
                      <input 
                        type="text" 
                        placeholder="ex: MIN-FIN/2014/1982"
                        value={agreeCabinetNumber}
                        onChange={(e) => setAgreeCabinetNumber(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono text-slate-900 bg-white focus:outline-none focus:border-indigo-600 uppercase"
                      />
                    </div>

                    <div className="space-y-2 col-span-1 sm:col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                          {language === 'ar' ? 'سنوات الخبرة المهنية' : language === 'en' ? 'Effective Years of Experience' : "Années d'Expérience effective (سنوات الخبرة المهنية)"}
                        </label>
                        <span className="px-2.5 py-0.5 bg-indigo-100 border border-indigo-200 text-indigo-700 font-mono font-bold text-xs">
                          {yearsExperience} {language === 'ar' ? 'سنوات' : language === 'en' ? 'Years' : 'Ans'}
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min={1} 
                        max={40} 
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(Number(e.target.value))}
                        className="w-full accent-indigo-700 cursor-pointer h-1 bg-slate-200"
                      />
                    </div>

                    <div className="space-y-2 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {language === 'ar' ? 'لغات تسيير المعاملات وإصدار التقارير SCF' : language === 'en' ? "Working Languages (Reporting & Auditing)" : "Langues de travail (لغات تسيير المعاملات وإصدار التقارير SCF)"}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['ar', 'fr', 'en', 'tamazight'].map((lang) => (
                          <label key={lang} className="p-3 bg-white border border-blue-200 rounded-lg flex items-center gap-2.5 cursor-pointer hover:bg-blue-50">
                            <input 
                              type="checkbox" 
                              checked={(languagesOfWork as any)[lang]}
                              onChange={(e) => setLanguagesOfWork(prev => ({ ...prev, [lang]: e.target.checked }))}
                              className="accent-indigo-700 cursor-pointer"
                            />
                            <span className="text-xs font-serif font-black text-slate-900">
                              {lang === 'ar' && 'Arabe (العربية)'}
                              {lang === 'fr' && 'Français'}
                              {lang === 'en' && 'English'}
                              {lang === 'tamazight' && 'Tamazight'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 2 (CLIENT ONLY): BUSINESS IDENTITY */}
              {currentStep === 2 && regRole === 'client' && (
                <div className="space-y-6 text-left rtl:text-right">
                  <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                    {language === 'ar' ? 'الخطوة 2 — تفاصيل المؤسسة والمراجع القانونية' : language === 'en' ? 'Step 2 — Corporate Legal Entity Details' : "Étape 2 — Identité de la Sarl / Eurl / Institution et Références Légales"}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'الشكل القانوني للمؤسسة' : language === 'en' ? "Corporate Entity Structure" : "Forme juridique de l'entité (الشكل القانوني للمؤسسة)"}
                        <span className="text-red-500"> *</span>
                      </label>
                      <select
                        value={entityType}
                        onChange={(e) => setEntityType(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2.5 bg-white text-xs font-bold font-serif text-slate-900 focus:outline-none focus:border-brand-primary cursor-pointer"
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

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'اسم الشركة بالحروف اللاتينية' : language === 'en' ? 'Corporate Legal Name (Latin Characters)' : "Dénomination Sociale en lettres Latines (اسم الشركة بالفرنسية)"}
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="ex: SARL Mitidja Agro Industrie"
                        value={companyNameFR}
                        onChange={(e) => setCompanyNameFR(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs text-slate-900 bg-white focus:outline-none focus:border-brand-primary font-serif font-black"
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
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs text-slate-900 bg-white focus:outline-none focus:border-brand-primary font-serif font-black text-right"
                        dir="rtl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'رقم السجل التجاري' : language === 'en' ? 'Commercial Registry Number (RC)' : "Numéro de Registre du Commerce RC (رقم السجل التجاري)"}
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="ex: 16/00-0142578-B26"
                        value={rcNumber}
                        onChange={(e) => setRcNumber(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'رقم التعريف الجبائي' : language === 'en' ? 'Tax Identification Number (NIF)' : "Numéro d'Identification Fiscale NIF (رقم التعريف الجبائي)"}
                        <span className="text-red-500"> *</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        maxLength={15}
                        placeholder="ex: 001612054789412"
                        value={nifNumber}
                        onChange={(e) => setNifNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono tracking-widest text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'رقم المادة الضريبية — اختياري' : language === 'en' ? 'Tax Assessment Article Number (AI)' : "Numéro d'Article d'Imposition AI (رقم المادة الضريبية — اختياري)"}
                      </label>
                      <input 
                        type="text" 
                        placeholder="ex: 16032481056"
                        value={aiNumber}
                        onChange={(e) => setAiNumber(e.target.value)}
                        className="w-full border border-blue-200 rounded-none px-3 py-2 text-xs font-mono text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {language === 'ar' ? 'قطاع النشاط الرئيسي' : language === 'en' ? 'Core Market Sector' : "Secteur d'Activité principale (قطاع النشاط الرئيسي)"}
                      </label>
                      <select
                        value={secteurActivite}
                        onChange={(e) => setSecteurActivite(e.target.value)}
                        className="w-full border border-blue-200 rounded-none p-2 bg-white text-xs text-slate-900 focus:outline-none focus:border-brand-primary cursor-pointer font-serif font-black"
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

                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {language === 'ar' ? 'النظام الجبائي المتبع' : language === 'en' ? 'Applicable Tax Scheme' : "Régime Fiscal applicable (النظام الجبائي المتبع)"}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { key: 'Régime réel (IBS)', title: 'Régime Réel (IBS)', desc: language === 'ar' ? 'ميزانية كاملة إلزامية' : language === 'en' ? 'Compulsory full statements, G50 forms' : 'Bilan complet obligatoire, déclaration G50' },
                          { key: 'Régime simplifié (IRG)', title: 'Régime Simplifié', desc: language === 'ar' ? 'محاسبة مبسطة' : language === 'en' ? 'Streamlined simplified accounting scheme' : 'Souscription comptabilité simplification' },
                          { key: 'Régime IFU (Impôt Forfait Unique)', title: 'Auto-entrepreneur (IFU)', desc: language === 'ar' ? 'رقم أعمال أقل من 30 مليون دج' : language === 'en' ? 'Turnover below 30M DA, single 5% tax' : 'CA inférieur à 30M DA, impôt unique de 5%' }
                        ].map((reg) => (
                          <label key={reg.key} className="p-3 bg-white border border-blue-200 rounded-lg flex items-start gap-2.5 cursor-pointer hover:bg-blue-50">
                            <input 
                              type="radio" 
                              name="regime_fisc"
                              checked={regimeFiscal === reg.key}
                              onChange={() => setRegimeFiscal(reg.key)}
                              className="accent-brand-primary cursor-pointer mt-0.5"
                            />
                            <div className="space-y-1 text-left rtl:text-right">
                              <span className="text-xs font-serif font-black text-slate-900 block leading-tight">{reg.title}</span>
                              <span className="text-[9px] text-slate-400 font-mono block">{reg.desc}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 3 (PROFESSIONAL ONLY): DOCUMENT UPLOAD */}
              {currentStep === 3 && regRole === 'professional' && (
                <div className="space-y-6 text-left rtl:text-right" id="pro_doc_upload_step">
                  <div>
                    <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                      {language === 'ar' ? 'الخطوة 3 — الوثائق القانونية الإلزامية للاعتماد' : language === 'en' ? 'Step 3 — Mandatory Digital Roster Records' : "Étape 3 — Dossier d'agrément numérisé obligatoire"}
                    </h3>
                    <p className="text-[11px] text-amber-600 font-mono mt-1 pr-1 border-l-2 border-amber-500">
                      {language === 'ar' ? '⚠️ كل الوثائق مطلوبة — التحقق إلزامي قبل تفعيل الحساب للحد من التزوير.' : 
                       language === 'en' ? '⚠️ All documents are mandatory — Auditing is compulsory before workspace activation.' : 
                       '⚠️ كل الوثائق مطلوبة — التحقق إلزامي قبل تفعيل الحساب من مصالح أكونيت الرقابية للحد من التزوير.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 border border-blue-200 bg-slate-50">
                    <DocumentUpload 
                      label="Carte Professionnelle ONEC / ONCC / ONCA"
                      labelAR="البطاقة المهنية للهيئة الوطنية"
                      description="Certificat d'agrément actif délivré par l'ordre"
                      required={true}
                      acceptedTypes={['pdf', 'jpg', 'png']}
                      maxSizeMB={5}
                      onUpload={(file, base64) => setProDocs(prev => ({ ...prev, cartePro: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setProDocs(prev => ({ ...prev, cartePro: null }))}
                    />

                    <DocumentUpload 
                      label="Pièce d'Identité Nationale"
                      labelAR="الهوية الوطنية (بطاقة بيومترية أو جواز سفر)"
                      description="Carte d'identité CIN recto-verso ou passeport"
                      required={true}
                      acceptedTypes={['pdf', 'jpg', 'png']}
                      maxSizeMB={5}
                      onUpload={(file, base64) => setProDocs(prev => ({ ...prev, identity: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setProDocs(prev => ({ ...prev, identity: null }))}
                    />

                    <DocumentUpload 
                      label="Attestation d'Inscription au Tableaux National"
                      labelAR="شهادة القيد بجدول المنظمة الوطنية للمحاسبين"
                      description="Fiche d'exercice de l'exercice en cours"
                      required={true}
                      acceptedTypes={['pdf']}
                      maxSizeMB={5}
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

                  <div className="bg-white border border-blue-200 p-4 flex items-center justify-between gap-4 font-mono select-none">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                      {language === 'ar' ? 'حالة رفع ملف التفعيل الخاص بك' : language === 'en' ? 'Accreditation folder upload status' : "Rapport du dossier d'agrément"}
                    </span>
                    {(() => {
                      const uploadedCount = [proDocs.cartePro, proDocs.identity, proDocs.attestationInsc, proDocs.decisionAgree].filter(Boolean).length;
                      return (
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-bold text-indigo-700">{uploadedCount} / 4 {language === 'ar' ? 'تم تحميلها' : language === 'en' ? 'Uploaded' : 'Chargés'}</span>
                          <div className="w-24 bg-slate-100 h-2">
                            <div className="bg-indigo-700 h-full transition-all duration-200" style={{ width: `${(uploadedCount/4)*100}%` }}></div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                </div>
              )}

              {/* STEP 3 (CLIENT ONLY): CLIENT DOCUMENT UPLOAD */}
              {currentStep === 3 && regRole === 'client' && (
                <div className="space-y-6 text-left rtl:text-right" id="client_doc_upload_step">
                  <div>
                    <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                      {language === 'ar' ? 'الخطوة 3 — وثائق التأسيس القانونية للمؤسسة' : language === 'en' ? 'Step 3 — Corporate Incorporation Filing Records' : "Étape 3 — Dossier Légal de Constitution de l'Entreprise"}
                    </h3>
                    <p className="text-[11px] text-brand-primary font-mono mt-1 pr-1 border-l-2 border-brand-primary">
                      {language === 'ar' ? '✓ يرجى إرفاق المستندات بصيغة إلكترونية لتأمين المعاملات والاتفاقيات المستقبلية.' : 
                       language === 'en' ? '✓ Digital copies are required to safely back ongoing B2B automated validation procedures.' : 
                       '✓ Pièces justificatives requises sous format électronique pour sécuriser les futurs contrats B2B ou liasse fiscale de clôture.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 border border-blue-200 bg-slate-50">
                    <DocumentUpload 
                      label="Extrait du Registre de Commerce (RC)"
                      labelAR="مستخرج السجل التجاري كود سري"
                      description="Copie certifiée conforme du RC délivré par le CNRC"
                      required={true}
                      acceptedTypes={['pdf', 'jpg', 'png']}
                      maxSizeMB={5}
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
                      description="Attestation d'absence de dette fiscale exigible"
                      required={false}
                      acceptedTypes={['pdf']}
                      maxSizeMB={5}
                      onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, roleApure: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setClientDocs(prev => ({ ...prev, roleApure: null }))}
                    />

                    <DocumentUpload 
                      label="Pièce d'identité du gérant"
                      labelAR="هوية ممثل الشركة القانوني"
                      description="Carte Nationale CIN biométrique ou passeport"
                      required={true}
                      acceptedTypes={['pdf', 'jpg', 'png']}
                      maxSizeMB={5}
                      onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, gerantId: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                      onRemove={() => setClientDocs(prev => ({ ...prev, gerantId: null }))}
                    />

                    {entityType === 'Association' && (
                      <div className="col-span-1 sm:col-span-2">
                        <DocumentUpload 
                          label="Récépissé d'agrément de l'association (Loi 12-06)"
                          labelAR="وصل اعتماد الجمعية المعتمد"
                          description="Agrément de l'association délivré par la wilaya"
                          required={true}
                          acceptedTypes={['pdf']}
                          maxSizeMB={5}
                          onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, recepisseAssociation: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                          onRemove={() => setClientDocs(prev => ({ ...prev, recepisseAssociation: null }))}
                        />
                      </div>
                    )}

                    {entityType === 'Startup labellisée' && (
                      <div className="col-span-1 sm:col-span-2">
                        <DocumentUpload 
                          label="Certificat officiel du Label Startup DZ"
                          labelAR="شهادة الحصول على علامة مؤسسة ناشئة"
                          description="Délivré par le Ministère chargé des Startups"
                          required={true}
                          acceptedTypes={['pdf', 'jpg', 'png']}
                          maxSizeMB={5}
                          onUpload={(file, base64) => setClientDocs(prev => ({ ...prev, certificatStartup: { name: file.name, size: `${(file.size/1024).toFixed(1)} KB`, data: base64 } }))}
                          onRemove={() => setClientDocs(prev => ({ ...prev, certificatStartup: null }))}
                        />
                      </div>
                    )}
                  </div>

                  <div className="bg-white border border-blue-200 p-5 space-y-4 text-left rtl:text-right">
                    <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-wider block">
                      {language === 'ar' ? 'التعهد بنزاهة البيانات وصحتها' : language === 'en' ? 'Statutory Declaration of Probity' : 'Engagement de probité légale'}
                    </span>
                    <label className="flex gap-2.5 cursor-pointer text-xs leading-relaxed select-none text-slate-700 font-sans">
                      <input 
                        type="checkbox" 
                        checked={attestHonourClient}
                        onChange={(e) => setAttestHonourClient(e.target.checked)}
                        className="accent-brand-primary cursor-pointer mt-0.5 shrink-0"
                        id="client_attest_honour_check"
                      />
                      <span>
                        {language === 'ar' ? 'أشهد على الشرف بصحة البيانات والوثائق المقدمة، وبأنها أصلية ومطابقة لواقع المحل والشركة وفق القانون الجنائي الجزائري المتعلق بالتزوير واستخدام المزور.' : 
                         language === 'en' ? 'I certify on my honor that all data given here is true and matching genuine records, under penal liabilities assigned to forgery inside the Algerian jurisdiction.' : 
                         'J\'atteste sur l\'honneur que les informations fournies sont exactes et que les documents téléversés sont authentiques, conformément à l\'article 222 du Code Pénal algérien relatif au faux et usage de faux.'}
                      </span>
                    </label>
                  </div>

                </div>
              )}

              {/* STEP 4 (PROFESSIONAL ONLY): REVIEW & SUBMIT */}
              {currentStep === 4 && regRole === 'professional' && (
                <div className="space-y-6 text-left rtl:text-right" id="pro_review_step">
                  <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary">
                    {language === 'ar' ? 'الخطوة 4 — مراجعة وتأكيد ملف التسجيل' : language === 'en' ? 'Step 4 — Final File Overview & Submit' : 'Étape 4 — Récapitulatif et validation du dossier'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-blue-200 rounded-xl p-5 space-y-3.5 shadow-classic">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        {language === 'ar' ? 'الهوية والحساب' : language === 'en' ? 'CREDENTIALS & LOGIN' : 'IDENTITÉ & COMPTE'}
                      </span>
                      <div className="space-y-2 text-xs text-slate-800">
                        <p><strong className="text-slate-400">{language === 'ar' ? 'الاسم الكامل:' : language === 'en' ? 'Full name:' : 'Nom complet :'}</strong> {fullName}</p>
                        <p><strong className="text-slate-400">E-mail :</strong> {email}</p>
                        <p><strong className="text-slate-400">{language === 'ar' ? 'رقم الهاتف:' : language === 'en' ? 'Phone:' : 'Téléphone :'}</strong> +213 {phoneOperator}{phoneRest}</p>
                        <p><strong className="text-slate-400">{language === 'ar' ? 'الولاية الرئيسية:' : language === 'en' ? 'Main Wilaya:' : 'Wilaya principale :'}</strong> {algerianWilayas.find(w => w.id === selectedWilayaId)?.name.fr}</p>
                      </div>
                    </div>

                    <div className="bg-white border border-blue-200 rounded-xl p-5 space-y-3.5 shadow-classic">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        {language === 'ar' ? 'بيانات الاعتماد المتطابقة' : language === 'en' ? 'CROSS RECOUPED ACCREDITATIONS' : 'CREDENTIELS RECOUPÉS'}
                      </span>
                      <div className="space-y-2 text-xs text-slate-800">
                        <p><strong className="text-slate-400">{language === 'ar' ? 'التخصص:' : language === 'en' ? 'Title:' : 'Titre :'}</strong> {specialty.toUpperCase()}</p>
                        <p><strong className="text-slate-400">{language === 'ar' ? 'رقم القيد بالجدول الوطني:' : language === 'en' ? 'Roster ID:' : 'Numéro de registre Tableau :'}</strong> <span className="font-mono text-brand-primary font-bold">{tableauNumber}</span></p>
                        <p><strong className="text-slate-400">{language === 'ar' ? 'الاعتماد الوزاري:' : language === 'en' ? 'Tax license:' : 'Agrément fiscal :'}</strong> {agreeCabinetNumber || (language === 'ar' ? 'غير متوفر' : language === 'en' ? 'N/A' : 'Non applicable')}</p>
                        <p><strong className="text-slate-400">{language === 'ar' ? 'الخبرة المهنية:' : language === 'en' ? 'Seniority:' : "Séniorité d'exercice :"}</strong> {yearsExperience} {language === 'ar' ? 'سنوات خبرة' : language === 'en' ? 'years experience' : "Ans d'expérience"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-blue-200 p-5 space-y-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">INDEX DE VERIFIABILTÉ DU DOSSIER (ONCC CHECK)</span>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono p-2 bg-slate-50 text-slate-800">
                        <span className="flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {language === 'ar' ? 'البطاقة المهنية' : language === 'en' ? 'Professional Badge' : 'Carte Professionnelle'}</span>
                        <span className="text-slate-500 text-[10px] truncate max-w-xs">{proDocs.cartePro?.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono p-2 bg-slate-50 text-slate-800">
                        <span className="flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {language === 'ar' ? 'بطاقة الهوية الوطنية' : language === 'en' ? 'National ID Card' : 'Carte Nationale CIN'}</span>
                        <span className="text-slate-500 text-[10px] truncate max-w-xs">{proDocs.identity?.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono p-2 bg-slate-50 text-slate-800">
                        <span className="flex items-center gap-1.5 font-bold"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {language === 'ar' ? 'وصل القيد في الجدول' : language === 'en' ? 'Roster Certificate' : "Fiche d'inscription au Tableau"}</span>
                        <span className="text-slate-500 text-[10px] truncate max-w-xs">{proDocs.attestationInsc?.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-blue-200 p-5 space-y-4">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-wider block">
                      {language === 'ar' ? 'التعهد بالمطابقة والنزاهة القانونية' : language === 'en' ? 'Compliance Oath & Commitment' : 'Déclaration de conformité pénale'}
                    </span>
                    <label className="flex gap-2.5 cursor-pointer text-xs leading-relaxed select-none text-slate-700 font-sans">
                      <input 
                        type="checkbox" 
                        checked={attestHonourPro}
                        onChange={(e) => setAttestHonourPro(e.target.checked)}
                        className="accent-indigo-700 cursor-pointer mt-0.5 shrink-0"
                        id="pro_attest_honour_check"
                      />
                      <span>
                        {language === 'ar' ? 'أشهد على الشرف بصحة البيانات والوثائق المقدمة، وبأنها أصلية ومطابقة للواقع المهني تماشياً مع المادة 222 من قانون العقوبات الجزائري المتعلق بالفوز واستعمال المزور.' : 
                         language === 'en' ? 'I state on honor that all documents supplied here are legitimate copies of official certificates under legal responsibilities belonging to article 222 of Criminal Code.' : 
                         'J\'atteste sur l\'honneur que les informations fournies sont exactes et que les documents téléversés sont authentiques, conformément à l\'article 222 du Code Pénal algérien relatif au faux et usage de faux.'}
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
            
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={handlePrevStep}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase transition flex items-center gap-1 hover:bg-blue-50 border ${
                currentStep === 1 
                  ? 'border-blue-100 text-slate-300 pointer-events-none' 
                  : 'border-blue-200 text-slate-700 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>{language === 'ar' ? 'السابق' : language === 'en' ? 'Previous' : 'Précédent'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5">
              {activeStepsDef.map((st) => (
                <div 
                  key={st.num}
                  className={`w-2.5 h-2.5 rounded-none ${st.num === currentStep ? 'bg-brand-primary' : 'bg-blue-100'}`}
                ></div>
              ))}
            </div>

            {isLastWizardStep ? (
              <button
                type="button"
                onClick={regRole === 'professional' ? handleFinalSubmitPro : handleFinalSubmitClient}
                className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-mono font-bold uppercase tracking-widest transition cursor-pointer shadow-xs"
                id="wizard_final_save_btn"
              >
                <span>{language === 'ar' ? 'إرسال الملف الكامل' : language === 'en' ? 'Submit File' : 'Soumettre le Dossier'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2 bg-brand-primary text-slate-900 text-[10px] font-mono font-bold uppercase tracking-widest transition cursor-pointer shadow-xs flex items-center gap-1"
                id="wizard_next_step_btn"
              >
                <span>{language === 'ar' ? 'التالي' : language === 'en' ? 'Next' : 'Suivant'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
};