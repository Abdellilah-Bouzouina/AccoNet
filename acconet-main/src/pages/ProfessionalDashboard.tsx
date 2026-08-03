import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  Briefcase, Users, DollarSign, Star, Calendar,
  CheckSquare, ArrowUpRight, TrendingUp, RefreshCw, Layers,
  Award, Shield, FileSpreadsheet, Eye
} from 'lucide-react';
import { clients } from '../data/mockData';

export const ProfessionalDashboard: React.FC = () => {
  const { t, tObj, tSpec, language, direction } = useLanguage();
  const { 
    currentProfessional, contracts, tasks, 
    updateTaskStatus 
  } = useApp();

  // Active inbox tab filters: Todo, In-Progress, Done
  const [activeTaskTab, setActiveTaskTab] = useState<'todo' | 'in-progress' | 'done'>('todo');

  const pro = currentProfessional || {
    id: "p1",
    name: { ar: "سفيان بن عمار", fr: "Sofiane Benamara", en: "Sofiane Benamara" },
    specialty: "certified-accountant",
    rating: 4.9,
    accreditationNumber: "CNEC/2012/948"
  };

  // Filter lists for our current simulated professional ('p1' or 'p2')
  const proContracts = contracts.filter((c) => c.professionalId === pro.id);
  const activeContractIds = proContracts.map((c) => c.id);
  const proTasks = tasks.filter((tk) => activeContractIds.includes(tk.contractId));

  // Count metrics
  const activeClientsCount = new Set(proContracts.map((c) => c.clientId)).size;
  const pendingTasksList = proTasks.filter((tk) => tk.status === activeTaskTab);

  const totalEarnings = proContracts.reduce((sum, c) => sum + (c.status === 'active' ? c.value / 12 : 0), 0); // Simulated monthly yield

  // Mock earnings progression dataset
  const monthlyEarningsProgress = [
    { month: "Jan 2026", value: 140000, max: 250000 },
    { month: "Feb 2026", value: 180000, max: 250000 },
    { month: "Mar 2026", value: 215000, max: 250000 },
    { month: "Apr 2026", value: 245000, max: 250000 },
    { month: "May 2026", value: Math.round(totalEarnings) || 250000, max: 250000, active: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" id="pro_dashboard_view">
      
      {/* 1. WELCOME HEADER DECK */}
      <div className="bg-white border border-brand-primary/30 p-6 sm:p-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#1D4ED8_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-5 pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10 text-left rtl:text-right">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-brand-primary/10 border border-brand-primary text-brand-primary text-[8px] font-mono uppercase tracking-widest">
                {language === 'ar' ? 'بوابة المهني المعتمد' : 'Portail du Professionnel Agréé'}
              </span>
              <span className="text-[10px] font-mono text-slate-500">REGISTRATION COMPLETED</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold tracking-tight leading-tight text-slate-900">
              {t('proWelcome')} <span className="text-brand-primary italic font-normal">{tObj(pro.name)}</span>
            </h1>
            
            <p className="text-[11px] text-slate-500 font-sans flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="bg-blue-50 border border-blue-200 px-1.5 py-0.5 text-slate-700">{tSpec(pro.specialty)}</span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-600">Accreditation Board ID: <strong className="font-mono text-brand-primary">{pro.accreditationNumber}</strong></span>
            </p>
          </div>

          {currentProfessional && (
            <Link
              to={`/professional/${currentProfessional.id}`}
              className="relative z-10 shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-white border border-brand-primary/30 text-brand-primary text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-brand-primary/5 transition"
              id="dashboard_view_my_profile_btn"
            >
              <Eye className="w-4 h-4" />
              {t('viewMyProfileLink')}
            </Link>
          )}
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
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">PENDING AUDITS</span>
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
          <DollarSign className="w-8 h-8 text-emerald-400/35" />
        </div>

        {/* Score */}
        <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-classic flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">RATING SCORE</span>
            <p className="text-2xl font-serif font-black text-indigo-400 font-mono">{pro.rating} / 5.0</p>
          </div>
          <Award className="w-8 h-8 text-indigo-400/35" />
        </div>

      </div>

      {/* 3. CORE DESK GRIDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (col-span-8) - Task inbox & operations */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white border border-blue-100 rounded-xl p-6 space-y-6">
            
            {/* Inbox header with localized tab options */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-blue-100">
              <div className="text-left rtl:text-right">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">TASK REGISTRY</span>
                <h2 className="font-serif font-semibold text-slate-900 text-base flex items-center gap-2 mt-0.5">
                  <Briefcase className="w-4.5 h-4.5 text-brand-primary" />
                  {t('taskInboxTitle')}
                </h2>
              </div>

              {/* Status Switcher Tabs */}
              <div className="flex bg-white border border-blue-100 p-0.5 text-xs self-start">
                <button
                  onClick={() => setActiveTaskTab('todo')}
                  className={`px-3 py-1.5 cursor-pointer font-mono text-[10px] uppercase transition tracking-wider ${activeTaskTab === 'todo' ? 'glass text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  Todo ({proTasks.filter((t) => t.status === 'todo').length})
                </button>
                <button
                  onClick={() => setActiveTaskTab('in-progress')}
                  className={`px-3 py-1.5 cursor-pointer font-mono text-[10px] uppercase transition tracking-wider ${activeTaskTab === 'in-progress' ? 'glass text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  Active ({proTasks.filter((t) => t.status === 'in-progress').length})
                </button>
                <button
                  onClick={() => setActiveTaskTab('done')}
                  className={`px-3 py-1.5 cursor-pointer font-mono text-[10px] uppercase transition tracking-wider ${activeTaskTab === 'done' ? 'glass text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  Done ({proTasks.filter((t) => t.status === 'done').length})
                </button>
              </div>
            </div>

            {/* Task rows */}
            <div className="space-y-3">
              {pendingTasksList.length > 0 ? (
                pendingTasksList.map((tk) => {
                  const clientInfo = clients.find((c) => c.activeContracts.includes(tk.contractId));
                  return (
                    <div 
                      key={tk.id}
                      className="border border-blue-100 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/40 hover:border-brand-primary transition text-left rtl:text-right"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-white border border-blue-100 rounded-xl text-slate-400 font-mono">
                            {tk.type}
                          </span>
                          {clientInfo && (
                            <span className="text-[10px] text-brand-primary font-bold">
                              🏢 {clientInfo.companyName}
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-bold text-slate-900 font-serif">
                          {tObj(tk.title)}
                        </p>

                        <p className="text-[10px] text-slate-500 font-mono">
                          MILESTONE DUE: <strong className="text-slate-300">{tk.deadline}</strong>
                        </p>
                      </div>

                      {/* State transitions */}
                      <div className="flex gap-1.5 text-xs font-mono">
                        {tk.status !== 'todo' && (
                          <button
                            onClick={() => updateTaskStatus(tk.id, 'todo')}
                            className="px-2.5 py-1 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 text-slate-300 font-bold text-[10px] cursor-pointer"
                          >
                            Set Todo
                          </button>
                        )}
                        {tk.status !== 'in-progress' && (
                          <button
                            onClick={() => updateTaskStatus(tk.id, 'in-progress')}
                            className="px-2.5 py-1 bg-white border border-blue-100 border border-indigo-500/20 hover:bg-indigo-50 text-indigo-700 font-bold text-[10px] cursor-pointer"
                          >
                            Set Active
                          </button>
                        )}
                        {tk.status !== 'done' && (
                          <button
                            onClick={() => updateTaskStatus(tk.id, 'done')}
                            className="px-2.5 py-1 bg-brand-primary hover:bg-brand-dark text-slate-900 text-[10px] cursor-pointer font-bold"
                          >
                            ✓ Validate
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 border border-dashed border-blue-100 text-slate-500 font-mono">
                  <p className="text-xs leading-relaxed">
                    No matching filings currently recorded inside {activeTaskTab.toUpperCase()} section.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Column (col-span-4) - Financial metrics progress */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Custom monospaced earnings progression panel */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 space-y-4">
            <h2 className="font-serif font-semibold text-slate-900 text-sm flex items-center gap-2 pb-2 border-b border-blue-100">
              <TrendingUp className="w-5 h-5 text-brand-primary shrink-0 text-brand-primary" />
              {t('earningsBarChartTitle')}
            </h2>

            <div className="space-y-4 pt-2">
              {monthlyEarningsProgress.map((m) => (
                <div key={m.month} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-semibold ${m.active ? 'text-brand-primary font-bold' : 'text-slate-400'}`}>
                      {m.month} {m.active && '• Live'}
                    </span>
                    <span className="font-mono font-bold text-slate-900">{m.value.toLocaleString()} DZD</span>
                  </div>
                  
                  {/* Precise Progress bar */}
                  <div className="w-full bg-blue-100 h-2.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${m.active ? 'bg-brand-primary animate-pulse' : 'bg-blue-100/50'}`}
                      style={{ width: `${(m.value / m.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed font-sans border-t border-blue-100 pt-3 text-center">
              {t('earningsMockDisclaimer')}
            </p>
          </div>

          {/* Active SME Engagements */}
          <div className="bg-white border border-blue-100 rounded-xl p-6 space-y-4">
            <h2 className="font-serif font-semibold text-slate-900 text-sm flex items-center gap-1.5">
              <Layers className="w-4.5 h-4.5 text-brand-primary shrink-0 text-brand-primary" />
              Active SME Engagements
            </h2>

            <div className="space-y-3 text-xs text-left rtl:text-right">
              {proContracts.map((c) => {
                const conClient = clients.find((cl) => cl.id === c.clientId);
                return (
                  <div key={c.id} className="p-3.5 bg-white border border-blue-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <strong className="text-slate-900 font-serif text-xs">{tObj(c.title).substring(0, 30)}...</strong>
                      <span className="text-[8px] px-1.5 py-0.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold font-mono uppercase">
                        {c.status}
                      </span>
                    </div>

                    {conClient && (
                      <p className="text-[11px] text-slate-400 font-sans">
                        Client: <strong className="text-slate-200">{conClient.companyName}</strong> ({tObj(conClient.wilayaName)})
                      </p>
                    )}

                    <div className="flex justify-between text-[9px] text-slate-500 font-mono border-t border-blue-100/60 pt-2">
                      <span>VALUE: {c.value.toLocaleString()} DZD</span>
                      <span>DATE: {c.startDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
