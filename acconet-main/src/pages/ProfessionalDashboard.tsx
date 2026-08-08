import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  Briefcase, Users, Wallet, Star, Calendar,
  CheckSquare, ArrowUpRight, RefreshCw, Layers,
  Award, Shield, FileSpreadsheet, Eye, Inbox, Check, X, Loader2
} from 'lucide-react';

export const ProfessionalDashboard: React.FC = () => {
  const { t, tObj, tSpec, language, direction } = useLanguage();
  const tx = (ar: string, fr: string, en: string) =>
    language === 'ar' ? ar : language === 'en' ? en : fr;

  const {
    userRole, currentProfessional, contracts, tasks,
    updateTaskStatus, updateContractStatus, authChecked
  } = useApp();
  const navigate = useNavigate();

  // Active inbox tab filters: Todo, In-Progress, Done
  const [activeTaskTab, setActiveTaskTab] = useState<'todo' | 'in-progress' | 'done'>('todo');
  const [respondingId, setRespondingId] = useState<string | null>(null);

  // Only accountants can view their own dashboard.
  useEffect(() => {
    if (authChecked && userRole !== 'professional') {
      navigate('/');
    }
  }, [authChecked, userRole, navigate]);

  if (!currentProfessional) return null;
  const pro = currentProfessional;

  const proContracts = contracts.filter((c) => c.professionalId === pro.id);
  const pendingRequests = proContracts.filter((c) => c.status === 'pending');
  const activeContracts = proContracts.filter((c) => c.status === 'active');
  const activeContractIds = activeContracts.map((c) => c.id);
  const proTasks = tasks.filter((tk) => activeContractIds.includes(tk.contractId));

  // Count metrics
  const activeClientsCount = new Set(activeContracts.map((c) => c.clientId)).size;
  const pendingTasksList = proTasks.filter((tk) => tk.status === activeTaskTab);

  const totalEarnings = activeContracts.reduce((sum, c) => sum + c.value / 12, 0); // Estimated monthly yield from active engagements

  const handleRespond = async (contractId: string, status: 'active' | 'declined') => {
    setRespondingId(contractId);
    await updateContractStatus(contractId, status);
    setRespondingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" id="pro_dashboard_view">
      
      {/* 1. WELCOME HEADER DECK */}
      <div className="bg-white border border-brand-primary/30 p-6 sm:p-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#1D4ED8_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-5 pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10 text-left rtl:text-right">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-brand-primary/10 border border-brand-primary text-brand-primary text-[8px] font-mono uppercase tracking-widest">
                {tx('بوابة المهني المعتمد', 'Portail du Professionnel Agréé', 'Certified Professional Portal')}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight leading-tight text-slate-900">
              {t('proWelcome')} <span className="text-brand-primary italic font-normal">{tObj(pro.name)}</span>
            </h1>
            
            <p className="text-[11px] text-slate-500 font-sans flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="bg-blue-50 border border-blue-200 px-1.5 py-0.5 text-slate-700">{tSpec(pro.specialty)}</span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-600">{tx('رقم الاعتماد', "N° d'Accréditation", 'Accreditation Board ID')}: <strong className="font-mono text-brand-primary">{pro.accreditationNumber}</strong></span>
            </p>
          </div>

          <Link
            to={`/professional/${pro.id}`}
            className="relative z-10 shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-white border border-brand-primary/30 text-brand-primary text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-brand-primary/5 transition"
            id="dashboard_view_my_profile_btn"
          >
            <Eye className="w-4 h-4" />
            {t('viewMyProfileLink')}
          </Link>
        </div>
      </div>

      {/* 2. STATS KPI BENCHMARKS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="stats_benchmarks_row">
        
        {/* Active Clients */}
        <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-classic flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{t('proStatsClients')}</span>
            <p className="text-2xl font-serif font-black text-brand-primary font-mono">{activeClientsCount}</p>
          </div>
          <Users className="w-8 h-8 text-brand-primary/35" />
        </div>

        {/* Global Tasks */}
        <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-classic flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{tx('المهام المعلقة', 'Tâches en Attente', 'Pending Tasks')}</span>
            <p className="text-2xl font-serif font-black text-brand-accent font-mono">
              {proTasks.filter((t) => t.status !== 'done').length}
            </p>
          </div>
          <CheckSquare className="w-8 h-8 text-brand-accent/35" />
        </div>

        {/* Monthly Earnings / Pro-rata Yield */}
        <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-classic flex items-center justify-between col-span-1">
          <div className="space-y-1 text-left rtl:text-right">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{t('proStatsEarnings')}</span>
            <p className="text-xl font-serif font-black text-emerald-400 font-mono leading-tight">
              {Math.round(totalEarnings).toLocaleString()} <span className="text-xs">DZD</span>
            </p>
          </div>
          <Wallet className="w-8 h-8 text-emerald-400/35" />
        </div>

        {/* Score */}
        <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-classic flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">{tx('التقييم', 'Score de Notation', 'Rating Score')}</span>
            <p className="text-2xl font-serif font-black text-indigo-400 font-mono">{pro.rating} / 5.0</p>
          </div>
          <Award className="w-8 h-8 text-indigo-400/35" />
        </div>

      </div>

      {/* 3. CORE DESK GRIDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (col-span-8) - Task inbox & operations */}
        <div className="lg:col-span-8 space-y-6">

          {/* Pending hire requests awaiting a decision */}
          {pendingRequests.length > 0 && (
            <div className="bg-white border border-amber-200 rounded-xl p-6 space-y-4">
              <h2 className="font-serif font-semibold text-slate-900 text-base flex items-center gap-2">
                <Inbox className="w-4.5 h-4.5 text-amber-500" />
                {tx('طلبات توظيف بانتظار الرد', 'Demandes en attente de réponse', 'Pending Hire Requests')}
                <span className="text-xs font-mono text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">{pendingRequests.length}</span>
              </h2>
              <div className="space-y-3">
                {pendingRequests.map((c) => (
                  <div key={c.id} className="border border-amber-100 bg-amber-50/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left rtl:text-right">
                    <div>
                      <p className="font-bold text-slate-900 text-sm font-serif">{tObj(c.title)}</p>
                      {c.clientInfo && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {tx('من', 'De', 'From')}: <strong className="text-slate-700">{c.clientInfo.companyName}</strong> ({tObj(c.clientInfo.wilayaName)})
                        </p>
                      )}
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{c.value.toLocaleString()} DZD</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleRespond(c.id, 'declined')}
                        disabled={respondingId === c.id}
                        className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-60 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                      >
                        {respondingId === c.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                        {tx('رفض', 'Refuser', 'Decline')}
                      </button>
                      <button
                        onClick={() => handleRespond(c.id, 'active')}
                        disabled={respondingId === c.id}
                        className="px-3 py-1.5 bg-brand-primary hover:bg-brand-dark disabled:opacity-60 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
                      >
                        {respondingId === c.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                        {tx('قبول', 'Accepter', 'Accept')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white border border-blue-100 rounded-xl p-6 space-y-6">
            
            {/* Inbox header with localized tab options */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-blue-100">
              <div className="text-left rtl:text-right">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{tx('سجل المهام', 'Registre des Tâches', 'Task Registry')}</span>
                <h2 className="font-serif font-semibold text-slate-900 text-lg flex items-center gap-2 mt-0.5">
                  <Briefcase className="w-5 h-5 text-brand-primary" />
                  {t('taskInboxTitle')}
                </h2>
              </div>

              {/* Status Switcher Tabs */}
              <div className="flex bg-white border border-blue-100 p-0.5 text-xs self-start">
                <button
                  onClick={() => setActiveTaskTab('todo')}
                  className={`px-3 py-1.5 cursor-pointer font-mono text-[10px] uppercase transition tracking-wider ${activeTaskTab === 'todo' ? 'glass text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {tx('قيد الانتظار', 'À Faire', 'Todo')} ({proTasks.filter((t) => t.status === 'todo').length})
                </button>
                <button
                  onClick={() => setActiveTaskTab('in-progress')}
                  className={`px-3 py-1.5 cursor-pointer font-mono text-[10px] uppercase transition tracking-wider ${activeTaskTab === 'in-progress' ? 'glass text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {tx('جارية', 'En Cours', 'Active')} ({proTasks.filter((t) => t.status === 'in-progress').length})
                </button>
                <button
                  onClick={() => setActiveTaskTab('done')}
                  className={`px-3 py-1.5 cursor-pointer font-mono text-[10px] uppercase transition tracking-wider ${activeTaskTab === 'done' ? 'glass text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {tx('منجزة', 'Terminée', 'Done')} ({proTasks.filter((t) => t.status === 'done').length})
                </button>
              </div>
            </div>

            {/* Task rows */}
            <div className="space-y-4">
              {pendingTasksList.length > 0 ? (
                pendingTasksList.map((tk) => {
                  const clientInfo = proContracts.find((c) => c.id === tk.contractId)?.clientInfo;
                  return (
                    <div
                      key={tk.id}
                      className="border-2 border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white shadow-classic hover:border-brand-primary transition text-left rtl:text-right"
                    >
                      <div className="space-y-1.5">
                        {clientInfo && (
                          <span className="text-xs text-brand-primary font-bold">
                            🏢 {clientInfo.companyName}
                          </span>
                        )}

                        <p className="text-base font-bold text-slate-900 font-serif">
                          {tObj(tk.title)}
                        </p>

                        <p className="text-xs text-slate-500 font-mono">
                          {tx('الموعد النهائي', 'ÉCHÉANCE', 'DEADLINE')}: <strong className="text-slate-400">{tk.deadline}</strong>
                        </p>
                      </div>

                      {/* State transitions */}
                      <div className="flex gap-2 text-xs font-mono">
                        {tk.status !== 'todo' && (
                          <button
                            onClick={() => updateTaskStatus(tk.id, 'todo')}
                            className="px-3 py-1.5 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 text-slate-400 font-bold text-xs cursor-pointer"
                          >
                            {tx('قيد الانتظار', 'À Faire', 'Set Todo')}
                          </button>
                        )}
                        {tk.status !== 'in-progress' && (
                          <button
                            onClick={() => updateTaskStatus(tk.id, 'in-progress')}
                            className="px-3 py-1.5 bg-white border border-indigo-500/20 hover:bg-indigo-50 text-indigo-700 font-bold text-xs cursor-pointer rounded-xl"
                          >
                            {tx('جارية', 'En Cours', 'Active')}
                          </button>
                        )}
                        {tk.status !== 'done' && (
                          <button
                            onClick={() => updateTaskStatus(tk.id, 'done')}
                            className="px-3 py-1.5 bg-brand-primary hover:bg-brand-dark text-white text-xs cursor-pointer font-bold rounded-xl"
                          >
                            ✓ {tx('منجزة', 'Terminée', 'Done')}
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 border border-dashed border-blue-100 text-slate-500 font-mono">
                  <p className="text-xs leading-relaxed">
                    {tx('لا توجد ملفات مطابقة حاليًا ضمن هذا القسم.', 'Aucun dossier correspondant dans cette section.', 'No matching filings currently recorded in this section.')}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Column (col-span-4) - Active engagements */}
        <div className="lg:col-span-4 space-y-6">

          {/* Active SME Engagements */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 space-y-4">
            <h2 className="font-serif font-semibold text-slate-900 text-sm flex items-center gap-1.5">
              <Layers className="w-4.5 h-4.5 text-brand-primary shrink-0" />
              {tx('العقود النشطة', 'Engagements Actifs', 'Active Engagements')}
            </h2>

            {activeContracts.length === 0 ? (
              <p className="text-center py-6 text-slate-400 text-xs font-mono">
                {tx('لا توجد عقود نشطة حالياً.', 'Aucun engagement actif pour le moment.', 'No active engagements yet.')}
              </p>
            ) : (
              <div className="space-y-3 text-sm text-left rtl:text-right">
                {activeContracts.map((c) => (
                  <div key={c.id} className="p-4 bg-white border-2 border-blue-100 rounded-xl space-y-2.5 hover:border-brand-primary/50 transition">
                    <div className="flex justify-between items-center gap-2">
                      <strong className="text-slate-900 font-serif text-sm">{tObj(c.title).substring(0, 30)}...</strong>
                      <span className="text-[10px] px-2 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold font-mono uppercase shrink-0 rounded">
                        {tx('نشط', 'Actif', 'Active')}
                      </span>
                    </div>

                    {c.clientInfo && (
                      <p className="text-xs text-slate-500 font-sans">
                        {tx('العميل', 'Client', 'Client')}: <strong className="text-slate-700">{c.clientInfo.companyName}</strong> ({tObj(c.clientInfo.wilayaName)})
                      </p>
                    )}

                    <div className="flex justify-between text-[11px] text-slate-500 font-mono border-t border-blue-100/60 pt-2.5">
                      <span>{tx('القيمة', 'VALEUR', 'VALUE')}: {c.value.toLocaleString()} DZD</span>
                      <span>{tx('التاريخ', 'DATE', 'DATE')}: {c.startDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
