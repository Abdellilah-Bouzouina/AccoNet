import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Professional } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { formatAlgerianPhone } from '../lib/formatPhone';
import { Star, ShieldCheck, MapPin, Award, ArrowLeft, ArrowRight, Gavel, Landmark, Phone, Home, X } from 'lucide-react';

interface ProfessionalCardProps {
  professional: Professional;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = React.memo(({ professional }) => {
  const { direction, t, tSpec, tObj, language } = useLanguage();
  const [avatarLightboxOpen, setAvatarLightboxOpen] = useState(false);

  // Deduce specialty category variant
  const isVariantA = professional.specialty === 'certified-accountant' || professional.specialty === 'statutory-auditor';
  const isVariantB = professional.specialty === 'tax-consultant' || professional.specialty === 'judicial-expert';

  let variantHeaderLabel = '';
  let variantBadgeMarkup = null;

  if (isVariantA) {
    variantHeaderLabel = language === 'ar' 
      ? '⚜️ مكتب معتمد من الغرفة الوطنية لمحافظي الحسابات'
      : "⚜️ Cabinet agréé par la Chambre nationale des commissaires aux comptes";
    variantBadgeMarkup = (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-primary/10 border border-brand-primary/25 text-brand-primary text-[10px] font-mono leading-none tracking-wider font-extrabold uppercase shrink-0 rounded">
        <Landmark className="w-2.5 h-2.5" />
        {professional.specialty === 'certified-accountant' ? 'ONEC AGRÉÉ' : 'CNCC MEMBER'}
      </span>
    )
  }

  const displayPhone = professional.phone
    ? formatAlgerianPhone(professional.phone, language)
    : (language === 'ar' ? 'غير متوفر' : language === 'en' ? 'Not provided' : 'Non renseigné');

  const displayAddress = professional.address
    ? tObj(professional.address)
    : (language === 'ar' ? 'العنوان غير متوفر' : language === 'en' ? 'Address not provided' : 'Adresse non renseignée');

  return (
    <div 
      className={`relative bg-white border border-blue-100 rounded-xl hover:border-brand-primary/25 shadow-classic hover:shadow-glow transition-all duration-300 p-5 pt-7 flex flex-col justify-between`}
      id={`pro_card_${professional.id}`}
    >
      
      {/* Editorial Variant Header Line */}
      {variantHeaderLabel && (
        <div className="absolute top-0 left-0 right-0 h-5 px-3 bg-white border border-blue-100 border-b flex items-center justify-between rounded-t-xl">
          <span className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest leading-none">
            {variantHeaderLabel}
          </span>
          <span className="text-[9px] font-mono font-extrabold text-brand-primary tracking-wide">
          </span>
        </div>
      )}

      <div className="pt-1.5">
        
        {/* Header - Avatar & Status */}
        <div className="flex justify-between items-start mb-3.5">
          <div className="flex items-center gap-3">
            {/* Visual Avatar: profile picture if set, otherwise initials. Click to enlarge. */}
            <button
              type="button"
              onClick={(e) => {
                if (!professional.avatarUrl) return;
                e.preventDefault();
                e.stopPropagation();
                setAvatarLightboxOpen(true);
              }}
              className={`w-11 h-11 rounded-lg overflow-hidden flex items-center justify-center font-bold text-xs tracking-widest shrink-0 border border-blue-200 text-white bg-blue-50 ${professional.avatarUrl ? 'cursor-pointer hover:opacity-90 transition' : 'cursor-default'}`}
            >
              {professional.avatarUrl ? (
                <img src={professional.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                professional.initials
              )}
            </button>
            
            <div className="space-y-0.5">
              <h3 className="font-serif font-black text-slate-900 text-base sm:text-lg leading-tight hover:text-brand-primary transition">
                {language === 'ar' && professional.name.ar ? professional.name.ar : professional.name.fr}
              </h3>
              
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <p className="text-xs sm:text-sm text-brand-primary font-bold leading-none">
                  {tSpec(professional.specialty)}
                </p>
                {variantBadgeMarkup}
              </div>
            </div>
          </div>

          {/* Availability Pulse Badge */}
          {professional.available ? (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-mono leading-none uppercase shrink-0 rounded">
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse"></span>
              {t('availableImmediately') || (language === 'ar' ? 'متاح فوراً' : 'Disponible')}
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-blue-50/50 border border-blue-200 text-slate-900 text-[10px] font-mono leading-none uppercase shrink-0 rounded">
              {t('busyStatus')}
            </span>
          )}
        </div>

        {/* Bio summary block */}
        <p className="text-slate-900 text-sm leading-relaxed line-clamp-2 mb-3 h-10 text-left rtl:text-right">
          {language === 'ar' && professional.bio.ar ? professional.bio.ar : professional.bio.fr}
        </p>

        {/* Phone and Address */}
        <div className="flex flex-col gap-1.5 mb-3.5 text-left rtl:text-right text-sm text-slate-900">
          <div className="flex items-center gap-2" dir="ltr">
            <Phone className="w-4 h-4 text-brand-primary shrink-0" />
            <span className="font-mono text-sm">{displayPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-brand-primary shrink-0" />
            <span className="text-sm truncate">
              {displayAddress}
            </span>
          </div>
        </div>

        {/* Essential Info Badges */}
        <div className="grid grid-cols-2 gap-2 my-3 pt-3 border-t border-blue-100">
          
          {/* Wilaya location */}
          <div className="flex items-center gap-1.5 text-sm text-slate-900 justify-start">
            <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
            <span className="hover:underline cursor-pointer truncate font-serif font-bold text-slate-900">
              {language === 'ar' && professional.wilayaName.ar ? professional.wilayaName.ar : professional.wilayaName.fr}
            </span>
          </div>

          {/* Years of Practice */}
          <div className="flex items-center gap-1.5 text-sm text-slate-900 justify-end">
            <Award className="w-4 h-4 text-brand-primary shrink-0" />
            <span className="font-bold text-slate-900">
              {professional.yearsExperience} {language === 'ar' ? 'سنوات خبرة' : 'Ans exp.'}
            </span>
          </div>

          {/* Stars & rating */}
          <div className="flex items-center gap-1.5 text-sm text-slate-900 col-span-2 pt-2 border-t border-dashed border-blue-100">
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
              <span className="font-bold text-slate-900 text-sm">{professional.rating}</span>
            </div>
            <span className="text-xs text-slate-900 font-sans">
              ({professional.reviewCount} {language === 'ar' ? 'تقييمات' : 'avis'})
            </span>
            
            <div className="ml-auto rtl:ml-0 rtl:mr-auto flex items-center text-xs text-slate-900 font-mono font-bold leading-none bg-blue-50 px-1.5 py-0.5 border border-blue-100 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-primary mr-0.5 rtl:mr-0 rtl:ml-0.5 shrink-0" />
              <span>{professional.accreditationNumber.split(' ')[0]}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Button footer row without pricing left panel */}
      <div className="pt-3 border-t border-blue-100 flex items-center justify-end mt-1 select-none">
        <Link 
          to={`/professional/${professional.id}`}
          className="flex items-center gap-1 px-4 py-1.5 bg-brand-primary text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition rounded-lg"
          id={`view_profile_btn_${professional.id}`}
        >
          <span>{t('viewProfile') || (language === 'ar' ? 'عرض الملف' : 'Visualiser')}</span>
          {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5 shrink-0" /> : <ArrowRight className="w-3.5 h-3.5 shrink-0" />}
        </Link>
      </div>

      {/* AVATAR LIGHTBOX */}
      {avatarLightboxOpen && professional.avatarUrl && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setAvatarLightboxOpen(false)}
        >
          <button
            onClick={() => setAvatarLightboxOpen(false)}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-white hover:text-brand-accent cursor-pointer"
            aria-label={language === 'ar' ? 'إغلاق' : language === 'en' ? 'Close' : 'Fermer'}
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={professional.avatarUrl}
            alt=""
            className="max-w-full max-h-full rounded-xl object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
});
