import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const Landing: React.FC = () => {
  const { t, direction, language } = useLanguage();
  const { userRole, triggerNotification } = useApp();
  const navigate = useNavigate();

  const handleContact = () => {
    triggerNotification(
      language === 'ar' ? 'تم إرسال طلبك' : 'Demande envoyée',
      language === 'ar' ? 'سيتواصل معك المهني خلال 24 ساعة.' : 'Le professionnel vous contactera sous 24h.'
    );
  };

  const ui = {
    heroSub:     { ar: 'منصة تربط بين المهنيين والمتعاملين الاقتصاديين عبر 69 ولاية',           fr: 'Une plateforme reliant professionnels et opérateurs économiques sur 69 wilayas', en: 'Platform connecting professionals and businesses across 69 wilayas' },
    joinBtn:     { ar: 'الانضمام',                                                                fr: 'Rejoindre',                                                                    en: 'Join'                                                            },
    partnersSub: { ar: 'معتمدون من الهيئات الوطنية المحاسبية الجزائرية',                          fr: 'Reconnus par les ordres comptables nationaux algériens',                       en: "Recognized by Algeria's national accounting bodies"               },
    availNow:    { ar: 'متاح الآن',                                                               fr: 'Disponible maintenant',                                                        en: 'Available now'                                                   },
    contactBtn:  { ar: 'تواصل مع المهني',                                                         fr: 'Contacter le professionnel',                                                   en: 'Contact Professional'                                            },
    valuePropTitle:  { ar: 'تسهيل الوصول إلى المهنيين',            fr: 'Un accès facilité aux professionnels',                   en: 'Easy Access to Professionals' },
    valuePropBody:   {
      ar: 'نربطكم بأفضل المهنيين المعتمدين في مجال المحاسبة في الجزائر، مع عقود آمنة على المنصة وسهولة في العمل ومتابعة المهام.',
      fr: 'Nous vous connectons aux meilleurs professionnels agréés en comptabilité en Algérie, avec des contrats sécurisés sur la plateforme, une gestion simplifiée et un suivi des tâches.',
      en: 'We connect you with the best certified accounting professionals in Algeria, with secure on-platform contracts, streamlined collaboration, and task tracking.',
    },
    exploreServicesBtn: { ar: 'استكشف المهنيين',        fr: 'Découvrir les professionnels',        en: 'Explore Professionals'        },
    sectionLabelClients: { ar: 'المتعاملون الاقتصاديون', fr: 'Opérateurs Économiques', en: 'Economic Operators' },
    sectionLabelPros:    { ar: 'المهنيون',                fr: 'Professionnels',         en: 'Professionals' },
    proSpaceTitle: { ar: 'فضاء خاص لتسهيل العمل',            fr: 'Un espace dédié pour faciliter votre travail',            en: 'A Dedicated Space To Streamline Your Work' },
    proSpaceBody:  {
      ar: 'نوفر للمهنيين فضاء لعرض خدماتهم والوصول إلى الزبائن، مع تسهيل عملية إدارة مختلف المهام والتصريحات الجبائية وزيادة الإنتاجية في العمل.',
      fr: 'Nous offrons aux professionnels un espace pour présenter leurs services et accéder aux clients, tout en facilitant la gestion des tâches et des déclarations fiscales et en augmentant leur productivité.',
      en: 'We give professionals a space to showcase their services and reach clients, while simplifying the management of tasks and tax filings and boosting productivity.',
    },
    joinAsProBtn: { ar: 'الالتحاق كمهني',        fr: 'Rejoindre en tant que professionnel',        en: 'Join as a Professional' },
    coverageLabel: { ar: 'التغطية الوطنية', fr: 'Couverture Nationale', en: 'National Coverage' },
    coverageTitle: { ar: 'تغطية شاملة لكامل التراب الوطني',            fr: 'Une couverture nationale complète',            en: 'Full Nationwide Coverage' },
    coverageBody:  {
      ar: 'منصتنا حاضرة في جميع ولايات الجزائر الـ69، من الشمال إلى أقصى الجنوب، لنوفر لكم الوصول إلى أفضل المهنيين المحاسبيين أينما كنتم.',
      fr: "Notre plateforme est présente dans les 69 wilayas d'Algérie, du nord au grand sud, pour vous donner accès aux meilleurs professionnels comptables où que vous soyez.",
      en: "Our platform is present across all 69 wilayas of Algeria, from the north to the far south, giving you access to the best accounting professionals wherever you are.",
    },
  };
  const tx = (key: keyof typeof ui) => ui[key][language] || ui[key].ar;

  const heroTitleParts = {
    ar: { before: 'أوجد أفضل ',           highlight: 'المهنيين',   after: ' في مجال المحاسبة بالجزائر' },
    fr: { before: 'Trouvez les meilleurs ', highlight: 'professionnels', after: ' comptables en Algérie' },
    en: { before: "Find Algeria's Best ",   highlight: 'Accounting',     after: ' Professionals' },
  } as const;

  return (
    <div className="bg-[#F8FAFF] min-h-screen" dir={direction}>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/4 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-blue-200/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Text */}
          <div className="lg:col-span-7 space-y-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-lg text-brand-primary text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              {t('heroBadgeText')}
            </span>

            <h1 className="font-serif font-black text-slate-900 leading-[1.12] tracking-tight">
              {heroTitleParts[language].before}
              <span className="text-brand-primary">{heroTitleParts[language].highlight}</span>
              {heroTitleParts[language].after}
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              {tx('heroSub')}
            </p>

            {userRole === 'guest' && (
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center gap-2 px-7 py-4 bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm rounded-xl shadow-glow hover:shadow-none transition-all duration-200"
                >
                  {tx('joinBtn')}
                  {direction === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>

          {/* Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <img
              src="/assets/Hero_Illustration.svg"
              alt="Hero Illustration"
              className="w-full max-w-lg animate-float drop-shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. VALUE PROPOSITION
      ══════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <div className="space-y-6 text-left rtl:text-right">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-brand-light text-brand-primary text-xs font-mono font-bold uppercase tracking-wider rounded">
                {tx('sectionLabelClients')}
              </span>
              <span className="w-10 h-px bg-brand-primary/40" />
            </div>

            <h2 className="font-serif font-black text-slate-900 leading-tight">
              {tx('valuePropTitle')}
            </h2>

            <div className="border border-blue-200 rounded-2xl p-5 bg-white shadow-soft">
              <p className="text-slate-500 leading-relaxed">
                {tx('valuePropBody')}
              </p>
            </div>

            <button
              onClick={() => navigate('/search')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-blue-200 hover:border-brand-primary hover:bg-blue-50 rounded-xl text-slate-700 font-bold text-sm transition"
            >
              {tx('exploreServicesBtn')}
            </button>
          </div>

          {/* ── Partner Logos (replaces the illustration) ── */}
          <div className="space-y-6">
            <div className="text-left rtl:text-right">
              <p className="text-slate-500 text-sm">{tx('partnersSub')}</p>
            </div>

            <div className="space-y-4">

              {/* CNCC — dark background */}
              <div className="flex items-center gap-4 p-4 bg-black rounded-xl shadow-soft hover:shadow-glow transition">
                <div className="w-28 h-16 flex items-center justify-center shrink-0 p-1">
                  <img src="/assets/logos/cncc.png" alt="CNCC" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white text-sm">CNCC</p>
                  <p className="text-xs text-gray-400 leading-snug mt-0.5">
                    {language === 'ar' ? 'الغرفة الوطنية لمحافظي الحسابات' : 'Chambre Nationale des Commissaires aux Comptes'}
                  </p>
                </div>
              </div>

              {/* ONEC — white background */}
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-soft hover:shadow-glow transition">
                <div className="w-28 h-16 flex items-center justify-center shrink-0 p-1">
                  <img src="/assets/logos/onec.png" alt="ONEC" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 text-sm">ONEC</p>
                  <p className="text-xs text-slate-500 leading-snug mt-0.5">
                    {language === 'ar' ? 'المصف الوطني للخبراء المحاسبين' : 'Ordre National des Experts-Comptables'}
                  </p>
                </div>
              </div>

              {/* ONCA — dark background */}
              <div className="flex items-center gap-4 p-4 bg-black rounded-xl shadow-soft hover:shadow-glow transition">
                <div className="w-28 h-16 flex items-center justify-center shrink-0 p-1">
                  <img src="/assets/logos/onca.png" alt="ONCA" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white text-sm">ONCA</p>
                  <p className="text-xs text-gray-400 leading-snug mt-0.5">
                    {language === 'ar' ? 'المنظمة الوطنية للمحاسبين المعتمدين' : 'Organisation Nationale des Comptables Agréés'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. JOIN AS PROFESSIONAL
      ══════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <div className="flex items-center justify-center">
            <img
              src="/assets/ProSpace_Illustration.svg"
              alt="Professional Space Illustration"
              className="w-full max-w-md animate-float drop-shadow-lg"
            />
          </div>

          <div className="space-y-6 text-left rtl:text-right">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-brand-light text-brand-primary text-xs font-mono font-bold uppercase tracking-wider rounded">
                {tx('sectionLabelPros')}
              </span>
              <span className="w-10 h-px bg-brand-primary/40" />
            </div>

            <h2 className="font-serif font-black text-slate-900 leading-tight">
              {tx('proSpaceTitle')}
            </h2>

            <div className="border border-blue-200 rounded-2xl p-5 bg-white shadow-soft">
              <p className="text-slate-500 leading-relaxed">
                {tx('proSpaceBody')}
              </p>
            </div>

            <button
              onClick={() => navigate('/register?role=accountant')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm rounded-xl shadow-glow hover:shadow-none transition-all duration-200"
            >
              {tx('joinAsProBtn')}
            </button>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. NATIONAL COVERAGE
      ══════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          <div className="space-y-6 text-left rtl:text-right">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-brand-light text-brand-primary text-xs font-mono font-bold uppercase tracking-wider rounded">
                {tx('coverageLabel')}
              </span>
              <span className="w-10 h-px bg-brand-primary/40" />
            </div>

            <h2 className="font-serif font-black text-slate-900 leading-tight">
              {tx('coverageTitle')}
            </h2>

            <div className="border border-blue-200 rounded-2xl p-5 bg-white shadow-soft">
              <p className="text-slate-500 leading-relaxed">
                {tx('coverageBody')}
              </p>
            </div>

          </div>

          <div className="flex items-center justify-center">
            <img
              src="/assets/AlgeriaCoverage_Map.avif"
              alt="Algeria Coverage Map"
              className="w-full max-w-md animate-float drop-shadow-lg"
            />
          </div>

        </div>
      </section>

    </div>
  );
};
