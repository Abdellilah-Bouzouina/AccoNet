import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Contract } from '../data/mockData';
import { 
  Star, MapPin, Award, CheckCircle, Mail, DollarSign, 
  ChevronRight, Calendar, UserCheck, MessageSquare, AlertCircle, X,
  ShieldAlert, ShieldCheck, CheckCircle2, BookmarkCheck, Inbox
} from 'lucide-react';

export const ProfessionalProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, tSpec, tObj, direction, language } = useLanguage();
  const {
    allProfessionals, addContract,
    triggerNotification, currentClient
  } = useApp();

  const tx = (ar: string, fr: string, en: string) =>
    language === 'ar' ? ar : language === 'en' ? en : fr;

  const pro = allProfessionals.find((p) => p.id === id);

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews' | 'experience'>('about');

  // Modal trigger states
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [msgModalOpen, setMsgModalOpen] = useState(false);
  const [avatarLightboxOpen, setAvatarLightboxOpen] = useState(false);

  // Interactive Hire Input Form
  const [contractTitle, setContractTitle] = useState('');
  const [proposedBudget, setProposedBudget] = useState('');
  const [scopeDetails, setScopeDetails] = useState('');

  // Interactive MessageBox State
  const [msgText, setMsgText] = useState('');

  if (!pro) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="font-serif font-semibold text-xl text-slate-900">
          {tx('المهني غير موجود', 'Professionnel introuvable', 'Professional not found')}
        </h2>
        <button
          onClick={() => navigate('/search')}
          className="px-5 py-2.5 bg-brand-primary text-white text-xs font-mono uppercase tracking-widest cursor-pointer rounded-lg"
        >
          {tx('العودة إلى الدليل', 'Retour au répertoire', 'Return to directory')}
        </button>
      </div>
    );
  }

  const handleHireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractTitle) return;

    // Build static contract instance
    const newContractVal: Contract = {
      id: `ct_custom_${Date.now()}`,
      professionalId: pro.id,
      clientId: currentClient?.id || 'c1',
      title: { ar: contractTitle, fr: contractTitle, en: contractTitle },
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-12-31',
      value: Number(proposedBudget) || (pro.hourlyRate * 30),
      scopeDescription: {
        ar: scopeDetails || "مرافقة محاسبية دورية محددة",
        fr: scopeDetails || "Prestations de services comptables sur-mesure",
        en: scopeDetails || "Bespoke professional financial advisory"
      }
    };

    addContract(newContractVal);
    setHireModalOpen(false);

    // Trigger success notification
    triggerNotification(
      t('alertHireSuccessTitle'),
      `${t('alertHireSuccessBody')} (Expert: ${tObj(pro.name)})`
    );

    // Redirect to Client Dashboard
    navigate('/dashboard/client');
  };

  const handleMsgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsgModalOpen(false);
    setMsgText('');
    triggerNotification(
      t('alertMessageSuccessTitle'),
      t('alertMessageSuccessBody')
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" id="profile_page_container">
      
      {/* Back button link */}
      <button 
        onClick={() => navigate(-1)} 
        className="text-xs font-mono text-brand-primary uppercase tracking-wider flex items-center gap-1.5 hover:underline cursor-pointer"
      >
        ← {tx('الرجوع إلى النتائج', 'Retour aux résultats', 'Back to Listings')}
      </button>

      {/* 1. LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT & CENTER BODY PANELS (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Professional Header block */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 sm:p-8 relative text-left rtl:text-right">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              
              {/* Visual avatar: profile picture if set, otherwise initials. Click to enlarge. */}
              <button
                type="button"
                onClick={() => pro.avatarUrl && setAvatarLightboxOpen(true)}
                className={`w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center font-bold text-xl tracking-widest ${pro.avatarBg} shrink-0 border border-blue-100/60 ${pro.avatarUrl ? 'cursor-pointer hover:opacity-90 transition' : 'cursor-default'}`}
                aria-label={pro.avatarUrl ? tx('تكبير الصورة', "Agrandir la photo", 'Enlarge picture') : undefined}
              >
                {pro.avatarUrl ? (
                  <img src={pro.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  pro.initials
                )}
              </button>

              {/* Bio & names */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight leading-none">
                    {tObj(pro.name)}
                  </h1>
                  
                  {pro.available ? (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-mono">
                      <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-pulse"></span>
                      {t('availableStatus').toUpperCase()}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-blue-50/50 border border-blue-200 text-slate-500 text-[10px] font-mono">
                      {t('busyStatus').toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-sm text-slate-700 font-sans">
                  <span className="px-2 py-0.5 bg-white border border-blue-100 text-brand-primary text-xs font-semibold">
                    {tSpec(pro.specialty)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{tObj(pro.wilayaName)}, {tx('الجزائر', 'Algérie', 'Algeria')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600">
                    <Award className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{pro.accreditationNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm pt-1">
                  <div className="flex gap-0.5 text-brand-accent">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent shrink-0" />
                    ))}
                  </div>
                  <span className="font-extrabold text-slate-900 font-mono">{pro.rating}</span>
                  <span className="text-slate-600">({pro.reviewCount} {tx('تقييمات موثقة', 'avis vérifiés', 'verified reviews')})</span>
                </div>

              </div>

            </div>
          </div>

          {/* TAB TRIGGERS BAR */}
          <div className="border-b border-blue-100 flex space-x-6 rtl:space-x-reverse text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 relative transition-all cursor-pointer ${activeTab === 'about' ? 'text-brand-primary font-bold border-b-2 border-brand-primary' : 'text-slate-400 hover:text-brand-primary'}`}
            >
              {t('tabAbout')}
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`pb-3 relative transition-all cursor-pointer ${activeTab === 'services' ? 'text-brand-primary font-bold border-b-2 border-brand-primary' : 'text-slate-400 hover:text-brand-primary'}`}
            >
              {t('tabServices')} ({pro.services.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 relative transition-all cursor-pointer ${activeTab === 'reviews' ? 'text-brand-primary font-bold border-b-2 border-brand-primary' : 'text-slate-400 hover:text-brand-primary'}`}
            >
              {t('tabReviews')} ({pro.reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`pb-3 relative transition-all cursor-pointer ${activeTab === 'experience' ? 'text-brand-primary font-bold border-b-2 border-brand-primary' : 'text-slate-400 hover:text-brand-primary'}`}
            >
              {t('tabExperience')}
            </button>
          </div>

          {/* TAB DETAILED CONTENTS */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-classic min-h-[300px] text-left rtl:text-right">
            
            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6" id="tab_content_about">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-slate-900 text-base">{tx('الوصف', 'Description', 'Description')}</h3>
                  <p className="text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-line font-sans">
                    {tObj(pro.bio)}
                  </p>
                </div>

                {/* Local statistics grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-blue-100">
                  <div className="bg-white border border-blue-100 p-4 text-center">
                    <p className="text-2xl font-serif font-black text-brand-primary font-mono">{pro.yearsExperience}+</p>
                    <p className="text-xs text-slate-600 uppercase font-mono mt-1">{tx('سنوات الخبرة', "Années d'expérience", 'Years of practice')}</p>
                  </div>
                  <div className="bg-white border border-blue-100 p-4 text-center">
                    <p className="text-2xl font-serif font-black text-brand-primary font-mono">{pro.clientsServed}</p>
                    <p className="text-xs text-slate-600 uppercase font-mono mt-1">{t('profileStatsServed')}</p>
                  </div>
                  <div className="bg-white border border-blue-100 p-4 text-center">
                    <p className="text-2xl font-serif font-black text-brand-primary font-mono">{pro.completionRate}%</p>
                    <p className="text-xs text-slate-600 uppercase font-mono mt-1">{t('profileStatsCompleted')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES & FLAT BUDGET RATES */}
            {activeTab === 'services' && (
              <div className="space-y-6 inline-block w-full" id="tab_content_services">
                <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">
                  {tx('الخدمات والباقات المقترحة', 'Prestations et forfaits proposés', 'Offered services & custom brackets')}
                </p>

                {pro.services.length > 0 ? (
                  <div className="space-y-4">
                    {pro.services.map((ser, sIdx) => (
                      <div key={sIdx} className="border border-blue-100 p-4 hover:border-brand-primary transition bg-white/25">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                          <h4 className="font-serif font-bold text-slate-900 text-sm">
                            {tObj(ser.title)}
                          </h4>
                          <span className="px-2 py-0.5 bg-white border border-brand-primary/40 text-brand-primary font-mono text-[11px] font-bold">
                            {ser.price}
                          </span>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed font-sans">
                          {tObj(ser.description)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-600 font-mono">
                    <p className="text-sm">
                      {tx('لا توجد خدمات محددة بعد. تواصل مباشرة للحصول على عرض سعر مخصص.', "Aucun service défini pour l'instant. Contactez directement pour un devis personnalisé.", 'No explicit service templates listed yet. Contact directly for a custom quote.')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* HISTORIC VERIFIED REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6" id="tab_content_reviews">
                {pro.reviews.length > 0 ? (
                  <div className="space-y-4 divide-y divide-[#EBEBE5]">
                    {pro.reviews.map((rev) => (
                      <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-serif font-bold text-slate-900 text-sm">{rev.clientName}</h4>
                            <p className="text-xs text-slate-500 font-mono">{rev.date}</p>
                          </div>

                          <div className="flex gap-0.5 text-brand-accent">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent shrink-0" />
                            ))}
                          </div>
                        </div>

                        <p className="text-slate-800 text-sm leading-relaxed italic font-serif">
                          "{tObj(rev.comment)}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-600 space-y-2">
                    <p className="text-base">⭐</p>
                    <p className="text-sm leading-relaxed">
                      {t('reviewsPlaceholderNoReviews')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* EXPERIENCE PORTFOLIO HISTORY TIMELINE */}
            {activeTab === 'experience' && (
              <div className="space-y-6" id="tab_content_experience">
                <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">
                  {tx('الاعتمادات والشهادات الرسمية', 'Reconnaissances et certifications officielles', 'Official recognitions & certifications')}
                </p>

                {pro.history.length > 0 ? (
                  <div className="relative border-l rtl:border-l-0 rtl:border-r border-blue-100 mt-2 space-y-6 pl-4 rtl:pl-0 rtl:pr-4">
                    {pro.history.map((hist, hIdx) => (
                      <div key={hIdx} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-6 rtl:-right-6 top-1.5 w-3.5 h-3.5 bg-brand-primary border-4 border-white rounded-xl"></div>

                        <span className="text-xs font-bold text-brand-primary font-mono bg-[#E1F5EE] px-2 py-0.5 border border-brand-primary/15">
                          {hist.year}
                        </span>

                        <h4 className="font-serif font-bold text-slate-900 text-sm mt-2">
                          {tObj(hist.title)}
                        </h4>

                        <p className="text-slate-700 text-sm mt-1 font-sans leading-relaxed">
                          {tObj(hist.description)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-600 space-y-2 font-mono">
                    <p className="text-sm leading-relaxed">
                      {tx('لا يوجد', 'Aucun', 'None')}
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* RIGHT SIDEBAR PANEL / ACTION CARD (col-span-4) */}
        <div className="lg:col-span-4 sticky top-20 space-y-6">
          <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-classic space-y-5 text-center">
            
            <div className="p-3 bg-white border border-blue-100 text-sm text-slate-700 leading-relaxed font-sans text-left rtl:text-right">
              💡 {t('contactToDiscuss')}
            </div>

            <div className="space-y-2.5 pt-2">
              <button 
                onClick={() => setHireModalOpen(true)}
                className="w-full py-3 bg-brand-primary hover:bg-brand-dark text-slate-900 text-xs font-mono uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-1.5"
                id="profile_hire_now_btn"
              >
                <UserCheck className="w-4 h-4" />
                {t('hireMeNow')}
              </button>

              <button 
                onClick={() => setMsgModalOpen(true)}
                className="w-full py-3 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 text-slate-200 text-xs font-mono uppercase tracking-widest cursor-pointer transition flex items-center justify-center gap-1.5"
                id="profile_send_message_btn"
              >
                <MessageSquare className="w-4 h-4 text-brand-primary" />
                {t('sendMessage')}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* 2. LIVE MODAL DIALOGS */}
      
      {/* HIRE NOW ATTACH CONTRACT FORM */}
      {hireModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4" id="hire_contract_modal">
          <div className="glass rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-blue-100 flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="bg-brand-primary text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-serif font-bold text-sm tracking-wide">{t('hireMeNow')}</h3>
                <p className="text-xs text-brand-accent font-mono mt-0.5 uppercase tracking-wider">
                  {tx('نموذج عرض لـ', 'Formulaire de proposition pour', 'Proposal form for')} {currentClient?.companyName || tx('مؤسستكم', 'votre entreprise', 'your company')}
                </p>
              </div>
              <button
                onClick={() => setHireModalOpen(false)}
                className="text-white hover:text-brand-accent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleHireSubmit} className="p-6 space-y-4 text-left rtl:text-right">

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
                  {tx('عنوان العقد / المشروع', 'Titre du contrat / projet', 'Contract / Project Title')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={tx('مثال: مسك محاسبة شهري وتصريح ضريبي 2026', 'Ex: Tenue de comptabilité mensuelle et déclarations TVA 2026', 'e.g. 2026 Monthly VAT filing & Ledger Auditing')}
                  value={contractTitle}
                  onChange={(e) => setContractTitle(e.target.value)}
                  className="w-full border border-blue-100 rounded-xl px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-brand-primary focus:glass font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
                  {tx('الميزانية المقترحة (دج)', 'Budget total proposé (DZD)', 'Total Proposed Budget (DZD)')}
                </label>
                <input
                  type="number"
                  placeholder={tx('اتركه فارغاً لتطبيق السعر القياسي', 'Laisser vide pour le tarif standard', 'Leave empty for standard rate')}
                  value={proposedBudget}
                  onChange={(e) => setProposedBudget(e.target.value)}
                  className="w-full border border-blue-100 rounded-xl px-3 py-2 text-sm font-mono text-slate-800 bg-white focus:outline-none focus:border-brand-primary focus:glass"
                />
                <span className="text-xs text-slate-500 font-mono tracking-tight block">
                  {tx('اتركه فارغاً لتطبيق السعر الشهري الثابت تلقائياً.', 'Laisser vide pour appliquer automatiquement le tarif mensuel forfaitaire.', 'Leave empty to auto-apply flat monthly rate.')}
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
                  {tx('وصف تفصيلي للمهمة', 'Description détaillée de la mission', 'Detailed Scope Description')}
                </label>
                <textarea
                  rows={3}
                  placeholder={tx('حدد قائمة المهام مثل CNAS، التصريحات الشهرية G50...', 'Précisez la liste des livrables : CNAS, déclarations G50 mensuelles, etc.', 'Specify list of deliverables like CNAS, monthly G50 filings etc.')}
                  value={scopeDetails}
                  onChange={(e) => setScopeDetails(e.target.value)}
                  className="w-full border border-blue-100 rounded-xl px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-brand-primary focus:glass resize-none font-sans"
                />
              </div>

              <div className="glass-dark p-3 text-xs text-slate-700 leading-normal border border-blue-100 flex gap-2">
                <BookmarkCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>
                  {tx('عند الإرسال، سيتم إنشاء عرض تجريبي يُضاف مباشرة إلى قائمة عقود لوحة تحكمك.', "En soumettant, vous créez une proposition qui sera ajoutée directement à votre tableau de bord contrats.", 'By submitting, you draft a proposal instantly appended to your client dashboard contract sheet.')}
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setHireModalOpen(false)}
                  className="px-4 py-2 hover:underline text-slate-500 cursor-pointer"
                >
                  {tx('إلغاء', 'ANNULER', 'CANCEL')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-primary hover:bg-brand-dark text-white font-mono uppercase tracking-widest cursor-pointer rounded-lg"
                  id="confirm_hire_modal_btn"
                >
                  {tx('إرسال طلب التوظيف', "ENVOYER LA PROPOSITION", 'SUBMIT ENGAGEMENT LETTER')}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* SEND MESSAGE DIALOG FORM */}
      {msgModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4" id="message_sender_modal">
          <div className="glass rounded-xl max-w-md w-full overflow-hidden shadow-2xl border border-blue-100">
            
            <div className="bg-brand-primary text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-serif font-bold text-sm tracking-wide">{t('sendMessage')}</h3>
                <p className="text-xs text-brand-accent font-mono mt-0.5 uppercase tracking-wider">
                  {tx('استفسار مباشر', 'Demande directe', 'Direct query')}
                </p>
              </div>
              <button onClick={() => setMsgModalOpen(false)} className="text-white hover:text-brand-accent cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMsgSubmit} className="p-6 space-y-4 text-left rtl:text-right">

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-slate-600 uppercase tracking-widest">
                  {tx('اكتب استفسارك', 'Écrivez votre message', 'Write Your Instruction / Query')}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={tx(`مثال: السلام عليكم، نرغب في استشارة جبائية في ${tObj(pro.wilayaName)}. ما هي الوثائق المطلوبة؟`, `Ex : Bonjour, nous souhaitons initier un conseil fiscal à ${tObj(pro.wilayaName)}. Quels documents sont nécessaires ?`, `e.g. Hello, we'd like to initiate tax advisory in ${tObj(pro.wilayaName)}. What documentation is required?`)}
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  className="w-full border border-blue-100 rounded-xl p-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-brand-primary focus:glass resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setMsgModalOpen(false)}
                  className="px-4 py-2 hover:underline text-slate-500 cursor-pointer"
                >
                  {tx('إلغاء', 'ANNULER', 'CANCEL')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-primary hover:bg-brand-dark text-white font-mono uppercase tracking-widest cursor-pointer rounded-lg"
                  id="confirm_message_modal_btn"
                >
                  {tx('إرسال الاستفسار', 'ENVOYER', 'SEND ENQUIRY')}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* AVATAR LIGHTBOX */}
      {avatarLightboxOpen && pro.avatarUrl && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setAvatarLightboxOpen(false)}
          id="avatar_lightbox"
        >
          <button
            onClick={() => setAvatarLightboxOpen(false)}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-white hover:text-brand-accent cursor-pointer"
            aria-label={tx('إغلاق', 'Fermer', 'Close')}
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={pro.avatarUrl}
            alt={tObj(pro.name)}
            className="max-w-full max-h-full rounded-xl object-contain cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
};
