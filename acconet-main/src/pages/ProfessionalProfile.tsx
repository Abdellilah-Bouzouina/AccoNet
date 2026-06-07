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
  const { t, tSpec, tObj, direction } = useLanguage();
  const { 
    allProfessionals, addContract, 
    triggerNotification, currentClient 
  } = useApp();

  const pro = allProfessionals.find((p) => p.id === id);

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews' | 'experience'>('about');

  // Modal trigger states
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [msgModalOpen, setMsgModalOpen] = useState(false);

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
        <h2 className="font-serif font-semibold text-xl text-slate-900">المهني غير موجود</h2>
        <button 
          onClick={() => navigate('/search')}
          className="px-5 py-2.5 bg-brand-primary text-slate-900 text-xs font-mono uppercase tracking-widest cursor-pointer"
        >
          Return to directory
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
        ← {direction === 'rtl' ? 'الرجوع إلى النتائج' : 'Back to Listings'}
      </button>

      {/* 1. LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT & CENTER BODY PANELS (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Professional Header block */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 sm:p-8 relative text-left rtl:text-right">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              
              {/* Visual avatar with initials */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl tracking-widest ${pro.avatarBg} shrink-0 border border-blue-100/60`}>
                {pro.initials}
              </div>

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

                <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-400 font-sans">
                  <span className="px-2 py-0.5 bg-white border border-blue-100 text-brand-primary text-[10px] font-semibold">
                    {tSpec(pro.specialty)}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{tObj(pro.wilayaName)}, Algeria</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                    <Award className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{pro.accreditationNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs pt-1">
                  <div className="flex gap-0.5 text-brand-accent">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent shrink-0" />
                    ))}
                  </div>
                  <span className="font-extrabold text-slate-900 font-mono">{pro.rating}</span>
                  <span className="text-slate-500">({pro.reviewCount} verified reviews)</span>
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
                  <h3 className="font-serif font-bold text-slate-900 text-sm">{direction === 'rtl' ? 'السيرة المهنية للعلبة' : 'السيرة المهنية'}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                    {tObj(pro.bio)}
                  </p>
                </div>

                {/* Local statistics grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-blue-100">
                  <div className="bg-white border border-blue-100 p-4 text-center">
                    <p className="text-2xl font-serif font-black text-brand-primary font-mono">{pro.yearsExperience}+</p>
                    <p className="text-[9px] text-slate-500 uppercase font-mono mt-1">{t('expYears').split(' ')[1]} of practice</p>
                  </div>
                  <div className="bg-white border border-blue-100 p-4 text-center">
                    <p className="text-2xl font-serif font-black text-brand-primary font-mono">{pro.clientsServed}</p>
                    <p className="text-[9px] text-slate-500 uppercase font-mono mt-1">{t('profileStatsServed')}</p>
                  </div>
                  <div className="bg-white border border-blue-100 p-4 text-center">
                    <p className="text-2xl font-serif font-black text-brand-primary font-mono">{pro.completionRate}%</p>
                    <p className="text-[9px] text-slate-500 uppercase font-mono mt-1">{t('profileStatsCompleted')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES & FLAT BUDGET RATES */}
            {activeTab === 'services' && (
              <div className="space-y-6 inline-block w-full" id="tab_content_services">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">OFFERED ENGAGEMENTS & CUSTOM BRACKETS</p>
                
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
                        <p className="text-slate-400 text-xs leading-relaxed font-sans">
                          {tObj(ser.description)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-500 font-mono">
                    <p className="text-xs">No explicit service templates listed. Contact directly for custom quotes.</p>
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
                            <h4 className="font-serif font-bold text-slate-900 text-xs">{rev.clientName}</h4>
                            <p className="text-[10px] text-slate-500 font-mono">{rev.date}</p>
                          </div>
                          
                          <div className="flex gap-0.5 text-brand-accent">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent shrink-0" />
                            ))}
                          </div>
                        </div>

                        <p className="text-slate-300 text-xs leading-relaxed italic font-serif">
                          "{tObj(rev.comment)}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 space-y-2">
                    <p className="text-base">⭐</p>
                    <p className="text-xs leading-relaxed">
                      {t('reviewsPlaceholderNoReviews')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* EXPERIENCE PORTFOLIO HISTORY TIMELINE */}
            {activeTab === 'experience' && (
              <div className="space-y-6" id="tab_content_experience">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">OFFICIAL RECOGNITIONS & CERTIFICATIONS</p>
                
                {pro.history.length > 0 ? (
                  <div className="relative border-l rtl:border-l-0 rtl:border-r border-blue-100 mt-2 space-y-6 pl-4 rtl:pl-0 rtl:pr-4">
                    {pro.history.map((hist, hIdx) => (
                      <div key={hIdx} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-6 rtl:-right-6 top-1.5 w-3.5 h-3.5 bg-brand-primary border-4 border-white rounded-xl"></div>
                        
                        <span className="text-[10px] font-bold text-brand-primary font-mono bg-[#E1F5EE] px-2 py-0.5 border border-brand-primary/15">
                          {hist.year}
                        </span>
                        
                        <h4 className="font-serif font-bold text-slate-900 text-xs mt-2">
                          {tObj(hist.title)}
                        </h4>
                        
                        <p className="text-slate-400 text-xs mt-1 font-sans leading-relaxed">
                          {tObj(hist.description)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 space-y-2 font-mono">
                    <p className="text-xs leading-relaxed">
                      Accreditation register CNEC confirms over {pro.yearsExperience} years of continuous certified operations in Algeria.
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
            
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">REFERENCE BRACKET PRICING</div>
            
            <div className="space-y-1">
              <span className="text-3xl font-serif font-black text-brand-primary font-mono">
                {pro.hourlyRate.toLocaleString()} DZD
              </span>
              <p className="text-xs text-slate-400 font-mono uppercase">{t('perHour')}</p>
            </div>

            <div className="p-3 bg-white border border-blue-100 text-xs text-slate-300 leading-relaxed font-sans text-left rtl:text-right">
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
                <p className="text-[10px] text-brand-accent font-mono mt-0.5 uppercase tracking-wider">PROPOSAL FORM FOR {currentClient?.companyName || 'Dzair Tech Link'}</p>
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
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Contract / Project Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 2026 Monthly VAT filing & Ledger Auditing"
                  value={contractTitle}
                  onChange={(e) => setContractTitle(e.target.value)}
                  className="w-full border border-blue-100 rounded-xl px-3 py-2 text-xs text-slate-200 bg-white focus:outline-none focus:border-brand-primary focus:glass font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Total Proposed Budget (DZD)</label>
                <input 
                  type="number" 
                  placeholder={`Standard DZD ${(pro.hourlyRate * 30).toLocaleString()}`}
                  value={proposedBudget}
                  onChange={(e) => setProposedBudget(e.target.value)}
                  className="w-full border border-blue-100 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 bg-white focus:outline-none focus:border-brand-primary focus:glass"
                />
                <span className="text-[9px] text-slate-500 font-mono tracking-tight block">Leave empty to auto-apply flat monthly rate.</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Detailed Scope Description</label>
                <textarea 
                  rows={3}
                  placeholder="Specify list of deliverables like CNAS, monthly G50 filings etc."
                  value={scopeDetails}
                  onChange={(e) => setScopeDetails(e.target.value)}
                  className="w-full border border-blue-100 rounded-xl px-3 py-2 text-xs text-slate-200 bg-white focus:outline-none focus:border-brand-primary focus:glass resize-none font-sans"
                />
              </div>

              <div className="glass-dark p-3 text-[10px] text-slate-300 leading-normal border border-blue-100 flex gap-2">
                <BookmarkCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>By submitting, you draft a sample proposal instantly appended onto your client dashboard contract sheet.</span>
              </div>

              <div className="pt-2 flex justify-end gap-2 text-xs font-mono">
                <button 
                  type="button" 
                  onClick={() => setHireModalOpen(false)}
                  className="px-4 py-2 hover:underline text-slate-400 cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-brand-primary hover:bg-brand-dark text-slate-900 font-mono uppercase tracking-widest cursor-pointer"
                  id="confirm_hire_modal_btn"
                >
                  SUBMIT ENGAGEMENT LETTER
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
                <p className="text-[10px] text-brand-accent font-mono mt-0.5 uppercase tracking-wider">Direct query to center</p>
              </div>
              <button onClick={() => setMsgModalOpen(false)} className="text-white hover:text-brand-accent cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMsgSubmit} className="p-6 space-y-4 text-left rtl:text-right">
              
              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Write Your Instruction / Query</label>
                <textarea 
                  required
                  rows={4}
                  placeholder={`e.g. Salam, we want to initiate tax advisory in ${tObj(pro.wilayaName)}. What documentation is required?`}
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  className="w-full border border-blue-100 rounded-xl p-3 text-xs text-slate-200 bg-white focus:outline-none focus:border-brand-primary focus:glass resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 text-xs font-mono">
                <button 
                  type="button" 
                  onClick={() => setMsgModalOpen(false)}
                  className="px-4 py-2 hover:underline text-slate-400 cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-brand-primary hover:bg-brand-dark text-slate-900 font-mono uppercase tracking-widest cursor-pointer"
                  id="confirm_message_modal_btn"
                >
                  SEND ENQUIRY
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
