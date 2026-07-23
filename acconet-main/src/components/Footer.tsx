import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AccoNetLogo } from './AccoNetLogo';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language, direction } = useLanguage();

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

          {/* Contact */}
          <div className="text-left rtl:text-right">
            <h3 className="text-brand-primary font-mono text-xs tracking-widest uppercase mb-4">{tx('contact')}</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <a 
                href="https://www.facebook.com/profile.php?id=61590392978324" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 hover:text-brand-primary transition-colors group"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a 
                href="tel:+213541929168" 
                className="flex items-center gap-3 hover:text-brand-primary transition-colors"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.143-7.143c-.15-.441.016-.928.392-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span dir="ltr">+213 541 92 91 68</span>
              </a>
              <a 
                href="mailto:abdellilahbouzouina@outlook.fr" 
                className="flex items-center gap-3 hover:text-brand-primary transition-colors"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>abdellilahbouzouina@outlook.fr</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── PARTNER LOGOS STRIP ── */}
        <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest text-center mb-5">
            {language === 'ar' ? 'الشركاء الرسميون' : 'Partenaires officiels'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-16 bg-black rounded-xl overflow-hidden border border-blue-200 flex items-center justify-center p-2">
                <img src="/assets/logos/cncc.png" alt="CNCC" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">CNCC</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-16 bg-white rounded-xl overflow-hidden border border-blue-200 flex items-center justify-center p-2">
                <img src="/assets/logos/onec.png" alt="ONEC" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">ONEC</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-16 bg-black rounded-xl overflow-hidden border border-blue-200 flex items-center justify-center p-2">
                <img src="/assets/logos/onca.png" alt="ONCA" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500">ONCA</span>
            </div>
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
