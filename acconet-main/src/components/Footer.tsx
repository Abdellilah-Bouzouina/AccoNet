import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { AccoNetLogo } from './AccoNetLogo';
import { Heart, RefreshCw } from 'lucide-react';
import { clients, professionals } from '../data/mockData';

export const Footer: React.FC = () => {
  const { t, language, direction } = useLanguage();
  const { userRole, setUserRole, setCurrentClient, setCurrentProfessional } = useApp();

  const switchTo = (role: 'guest' | 'client' | 'professional') => {
    setUserRole(role);
    if (role === 'client')       setCurrentClient(clients[0]);
    if (role === 'professional') setCurrentProfessional(professionals[0]);
  };

  const ui = {
    slogan:  { ar: 'منصة رقمية تربط المهنيين المحاسبيين بالمتعاملين الاقتصاديين', fr: 'Plateforme numérique de mise en relation comptable', en: 'Digital accounting platform for Algerian professionals' },
    platform:{ ar: 'المنصة', fr: 'Plateforme', en: 'Platform' },
    contact: { ar: 'التواصل', fr: 'Contact', en: 'Contact' },
    rights:  { ar: 'جميع الحقوق محفوظة.', fr: 'Tous droits réservés.', en: 'All rights reserved.' },
    made:    { ar: 'صُنع بـ', fr: 'Fait avec', en: 'Made with' },
    forAlg:  { ar: 'للمهنيين والمؤسسات الجزائرية', fr: 'pour les professionnels algériens', en: 'for Algerian professionals' },
  };
  const tx = (k: keyof typeof ui) => ui[k][language] || ui[k].ar;

  return (
    <footer className="bg-white border-t border-blue-100 pt-14 pb-8" dir={direction}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-blue-100">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4 text-left rtl:text-right">
            <Link to="/" className="flex items-center gap-2 group">
              <AccoNetLogo height={40} color="#1D4ED8" />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">{tx('slogan')}</p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-lg">
              SCF 2026 Compatible · 69 {language === 'ar' ? 'ولاية' : 'Wilayas'}
            </div>
          </div>

          {/* Platform links */}
          <div className="text-left rtl:text-right">
            <h3 className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-4">{tx('platform')}</h3>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li><Link to="/search"   className="hover:text-brand-primary transition">{t('findProButton')}</Link></li>
              <li><Link to="/tools"    className="hover:text-brand-primary transition">{t('toolsLink')}</Link></li>
              <li><Link to="/login"    className="hover:text-brand-primary transition">{t('loginLink')}</Link></li>
              <li><Link to="/register" className="hover:text-brand-primary transition">{t('registerLink')}</Link></li>
            </ul>
          </div>

          {/* التواصل — Contact (empty layout, content coming) */}
          <div className="text-left rtl:text-right">
            <h3 className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-4">{tx('contact')}</h3>
            <div className="space-y-3 text-sm text-slate-400">
              {/* Content to be added */}
            </div>
          </div>
        </div>


        {/* ── PARTNER LOGOS STRIP ── */}
        <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest text-center mb-5">
            {language === 'ar' ? 'الشركاء الرسميون' : 'Partenaires officiels'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* CNCC — dark background logo */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-16 bg-black rounded-xl overflow-hidden border border-blue-200 flex items-center justify-center p-2">
                <img src="/assets/logos/cncc.png" alt="CNCC" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">CNCC</span>
            </div>
            {/* ONEC — white background logo */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-16 bg-white rounded-xl overflow-hidden border border-blue-200 flex items-center justify-center p-2">
                <img src="/assets/logos/onec.png" alt="ONEC" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">ONEC</span>
            </div>
            {/* ONCA — dark background logo */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-16 bg-black rounded-xl overflow-hidden border border-blue-200 flex items-center justify-center p-2">
                <img src="/assets/logos/onca.png" alt="ONCA" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">ONCA</span>
            </div>
          </div>
        </div>

                {/* ── DEMO SWITCHER ── */}
        <div className="my-8 p-5 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-brand-primary pulse-accent shrink-0" />
            <div className="text-left rtl:text-right">
              <p className="text-xs font-mono font-bold text-slate-700 flex items-center gap-2">
                AccoNet Simulation Control
                <span className="px-1.5 py-0.5 bg-brand-primary text-white text-[9px] uppercase font-mono rounded">Demo</span>
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ar' ? 'تبديل الأدوار لعرض لوحة التحكم المناسبة.' : 'Changez de profil pour tester les tableaux de bord.'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            {([
              { role: 'guest' as const,        label: language === 'ar' ? 'زائر' : 'Invité'    },
              { role: 'client' as const,       label: language === 'ar' ? 'مؤسسة' : 'Client'   },
              { role: 'professional' as const, label: language === 'ar' ? 'مهني' : 'Pro'        },
            ]).map(({ role, label }) => (
              <button
                key={role}
                onClick={() => switchTo(role)}
                className={`px-4 py-2 text-xs font-mono uppercase rounded-lg border transition ${
                  userRole === role
                    ? 'bg-brand-primary text-white border-brand-primary'
                    : 'bg-white text-slate-600 border-blue-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* ── BOTTOM ── */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-blue-100 text-sm text-slate-400 gap-3">
          <p>© 2026 {t('brandName')} Algeria · {tx('rights')}</p>
          <p className="flex items-center gap-1.5">
            {tx('made')} <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {tx('forAlg')}
          </p>
        </div>
      </div>
    </footer>
  );
};
