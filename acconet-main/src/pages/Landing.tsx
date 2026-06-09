import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { algerianWilayas } from '../data/algerianWilayas';
import { Search, ArrowLeft, ArrowRight, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

const specialties = [
  { key: 'certified-accountant',  icon: '💎' },
  { key: 'chartered-accountant',  icon: '🏛️' },
  { key: 'statutory-auditor',     icon: '📑' },
  { key: 'tax-consultant',        icon: '⚖️' },
  { key: 'judicial-expert',       icon: '🔎' },
];

export const Landing: React.FC = () => {
  const { t, tSpec, direction, language } = useLanguage();
  const { triggerNotification } = useApp();
  const navigate = useNavigate();

  const [keyword,           setKeyword]           = useState('');
  const [selectedWilaya,    setSelectedWilaya]    = useState('0');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(keyword)}&wilaya=${selectedWilaya}&specialty=${selectedSpecialty}`);
  };

  const handleContact = () => {
    triggerNotification(
      language === 'ar' ? 'تم إرسال طلبك' : 'Demande envoyée',
      language === 'ar' ? 'سيتواصل معك المهني خلال 24 ساعة.' : 'Le professionnel vous contactera sous 24h.'
    );
  };

  const ui = {
    heroTitle:   { ar: 'جد أفضل المهنيين من مجال المحاسبة في الجزائر',                          fr: 'Trouvez les meilleurs professionnels comptables en Algérie',                    en: "Find Algeria's Best Accounting Professionals"              },
    heroSub:     { ar: 'منصة تربط بين المهنيين والمتعاملين الاقتصاديين عبر 69 ولاية',           fr: 'Une plateforme reliant professionnels et opérateurs économiques sur 69 wilayas', en: 'Platform connecting professionals and businesses across 69 wilayas' },
    searchTitle: { ar: 'ابحث عن مهني محاسب',                                                     fr: 'Rechercher un professionnel',                                                  en: 'Find a Professional'                                             },
    searchSub:   { ar: 'ابحث بالاسم أو التخصص أو الولاية',                                       fr: 'Recherchez par nom, spécialité ou wilaya',                                     en: 'Search by name, specialty or wilaya'                              },
    allWilayas:  { ar: 'كل الولايات (69)',                                                        fr: 'Toutes les wilayas (69)',                                                      en: 'All wilayas (69)'                                                },
    allSpec:     { ar: 'كل التخصصات',                                                             fr: 'Toutes les spécialités',                                                       en: 'All specialties'                                                 },
    searchBtn:   { ar: 'بحث',                                                                     fr: 'Rechercher',                                                                   en: 'Search'                                                          },
    joinBtn:     { ar: 'انضم كمهني',                                                              fr: 'Rejoindre en tant que pro',                                                    en: 'Join as Professional'                                            },
    partners:    { ar: 'شركاؤنا الرسميون',                                                        fr: 'Nos partenaires officiels',                                                    en: 'Our Official Partners'                                           },
    partnersSub: { ar: 'معتمدون من الهيئات الوطنية المحاسبية الجزائرية',                          fr: 'Reconnus par les ordres comptables nationaux algériens',                       en: "Recognized by Algeria's national accounting bodies"               },
    availNow:    { ar: 'متاح الآن',                                                               fr: 'Disponible maintenant',                                                        en: 'Available now'                                                   },
    contactBtn:  { ar: 'تواصل مع المهني',                                                         fr: 'Contacter le professionnel',                                                   en: 'Contact Professional'                                            },
    statPros:    { ar: '+120 مهني معتمد',                                                         fr: '+120 Professionnels agréés',                                                   en: '+120 Certified Professionals'                                    },
    stat69:      { ar: '69 ولاية مغطاة',                                                          fr: '69 Wilayas couvertes',                                                         en: '69 Wilayas covered'                                              },
    statBiz:     { ar: '+500 مؤسسة موكلة',                                                        fr: '+500 Entreprises clientes',                                                    en: '+500 Client companies'                                           },
    mapBadge:    { ar: '69 ولاية — تغطية شاملة',                                                  fr: '69 Wilayas — Couverture nationale',                                            en: '69 Wilayas — National Coverage'                                  },
    partner:     { ar: 'شريك',                                                                    fr: 'Partenaire',                                                                   en: 'Partner'                                                         },
  };
  const tx = (key: keyof typeof ui) => ui[key][language] || ui[key].ar;

  const wilayaName = (w: typeof algerianWilayas[0]) =>
    language === 'ar' ? w.name.ar : language === 'fr' ? w.name.fr : w.name.en;

  return (
    <div className="bg-[#F8FAFF] min-h-screen" dir={direction}>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-blue-100">
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
              {tx('heroTitle')}
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              {tx('heroSub')}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/search')}
                className="inline-flex items-center gap-2 px-7 py-4 bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm rounded-xl shadow-glow hover:shadow-none transition-all duration-200"
              >
                {tx('searchBtn')}
                {direction === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center gap-2 px-7 py-4 bg-white border border-blue-200 hover:border-brand-primary hover:bg-blue-50 text-slate-700 font-bold text-sm rounded-xl transition-all duration-200"
              >
                {tx('joinBtn')}
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-6 border-t border-blue-100 text-sm font-semibold text-slate-500">
              {(['statPros', 'stat69', 'statBiz'] as const).map(k => (
                <span key={k} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                  {tx(k)}
                </span>
              ))}
            </div>
          </div>

          {/* Accounting Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <img
              src="/assets/Accounting_Illustration.svg"
              alt="Accounting Illustration"
              className="w-full max-w-lg drop-shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. SEARCH BAR
      ══════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <h2 className="font-serif font-black text-slate-800">{tx('searchTitle')}</h2>
            <p className="text-slate-500">{tx('searchSub')}</p>
          </div>

          <form onSubmit={handleSearch} className="bg-white border border-blue-200 rounded-2xl p-5 shadow-glow space-y-4">
            {/* Keyword */}
            <div className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary pointer-events-none ${direction === 'rtl' ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                placeholder={t('searchPlaceholderInput')}
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                className={`w-full border border-blue-200 bg-blue-50 rounded-xl text-slate-700 focus:border-brand-primary focus:bg-white ${direction === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
              />
            </div>

            {/* Wilaya + Specialty + Button */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <MapPin className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary pointer-events-none ${direction === 'rtl' ? 'right-4' : 'left-4'}`} />
                <select
                  value={selectedWilaya}
                  onChange={e => setSelectedWilaya(e.target.value)}
                  className={`w-full border border-blue-200 bg-blue-50 rounded-xl text-slate-700 focus:border-brand-primary ${direction === 'rtl' ? 'pr-12' : 'pl-12'}`}
                >
                  <option value="0">{tx('allWilayas')}</option>
                  {algerianWilayas.map(w => (
                    <option key={w.id} value={w.id}>{w.code} — {wilayaName(w)}</option>
                  ))}
                </select>
              </div>

              <select
                value={selectedSpecialty}
                onChange={e => setSelectedSpecialty(e.target.value)}
                className="w-full border border-blue-200 bg-blue-50 rounded-xl text-slate-700 focus:border-brand-primary"
              >
                <option value="">{tx('allSpec')}</option>
                {specialties.map(s => (
                  <option key={s.key} value={s.key}>{s.icon} {tSpec(s.key)}</option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full py-3 bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                {tx('searchBtn')}
              </button>
            </div>
          </form>
        </div>
      </section>

     
      {/* ══════════════════════════════════════════
          4. INFO BAR — Real Map + Partner Logos
      ══════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto bg-white border border-blue-100 rounded-2xl p-8 md:p-12 shadow-classic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── Google Maps — Real Algeria Map ── */}
            <div className="relative rounded-2xl overflow-hidden border border-blue-200 shadow-glow" style={{ height: '440px' }}>
              <iframe
                src="https://maps.google.com/maps?q=Algeria&t=m&z=5&output=embed&iwloc=near"
                title={language === 'ar' ? 'خريطة الجزائر' : "Carte de l'Algérie"}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-blue-200 rounded-xl px-4 py-2 shadow-sm pointer-events-none whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-xs font-mono font-bold text-brand-primary">{tx('mapBadge')}</span>
              </div>
            </div>

            {/* ── Partner Logos ── */}
            <div className="space-y-6">
              <div className="text-left rtl:text-right">
                <h3 className="font-serif font-black text-slate-800 text-xl mb-1">{tx('partners')}</h3>
                <p className="text-slate-500 text-sm">{tx('partnersSub')}</p>
              </div>

              <div className="space-y-4">

                {/* CNCC — dark background */}
                <div className="flex items-center gap-4 p-4 bg-black rounded-xl border border-slate-700 hover:border-brand-primary transition">
                  <div className="w-28 h-16 flex items-center justify-center shrink-0 p-1">
                    <img src="/assets/logos/cncc.png" alt="CNCC" className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white text-sm">CNCC</p>
                    <p className="text-xs text-gray-400 leading-snug mt-0.5">
                      {language === 'ar' ? 'الغرفة الوطنية لمحافظي الحسابات' : 'Chambre Nationale des Commissaires aux Comptes'}
                    </p>
                  </div>
                  <span className="shrink-0 flex items-center gap-1 text-xs font-mono text-white/70 bg-white/10 border border-white/20 px-2.5 py-1 rounded-lg">
                    <ShieldCheck className="w-3 h-3" /> {tx('partner')}
                  </span>
                </div>

                {/* ONEC — white background */}
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-blue-200 hover:border-brand-primary transition">
                  <div className="w-28 h-16 flex items-center justify-center shrink-0 p-1">
                    <img src="/assets/logos/onec.png" alt="ONEC" className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 text-sm">ONEC</p>
                    <p className="text-xs text-slate-500 leading-snug mt-0.5">
                      {language === 'ar' ? 'المصف الوطني للمهنيين المحاسبيين' : 'Ordre National des Experts-Comptables'}
                    </p>
                  </div>
                  <span className="shrink-0 flex items-center gap-1 text-xs font-mono text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-1 rounded-lg">
                    <ShieldCheck className="w-3 h-3" /> {tx('partner')}
                  </span>
                </div>

                {/* ONCA — dark background */}
                <div className="flex items-center gap-4 p-4 bg-black rounded-xl border border-slate-700 hover:border-brand-primary transition">
                  <div className="w-28 h-16 flex items-center justify-center shrink-0 p-1">
                    <img src="/assets/logos/onca.png" alt="ONCA" className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white text-sm">ONCA</p>
                    <p className="text-xs text-gray-400 leading-snug mt-0.5">
                      {language === 'ar' ? 'المنظمة الوطنية للمحاسبين المعتمدين' : 'Organisation Nationale des Comptables Agréés'}
                    </p>
                  </div>
                  <span className="shrink-0 flex items-center gap-1 text-xs font-mono text-white/70 bg-white/10 border border-white/20 px-2.5 py-1 rounded-lg">
                    <ShieldCheck className="w-3 h-3" /> {tx('partner')}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
