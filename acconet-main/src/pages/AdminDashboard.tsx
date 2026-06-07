import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, LayoutDashboard, Users, FileLock, Settings, 
  Search, CheckCircle2, AlertTriangle, Building2, MapPin, 
  Sliders, TrendingUp, RefreshCw, X, ShieldAlert, BadgeCheck
} from 'lucide-react';
import { professionals as initialProfessionals } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { t, tObj, tSpec, direction } = useLanguage();
  const { triggerNotification } = useApp();

  // Search keyword inside directory
  const [searchTerm, setSearchTerm] = useState('');

  // Local mutable state for auditing cabinet statuses
  const [cabinetList, setCabinetList] = useState(
    initialProfessionals.map((pro) => ({
      ...pro,
      approvedStatus: pro.available ? 'active' : 'pending'
    }))
  );

  // Global regulatory state variables
  const [tapRate, setTapRate] = useState(1.5);
  const [ibsRate, setIbsRate] = useState(19);
  const [activeAuditFilter, setActiveAuditFilter] = useState<'all' | 'active' | 'pending'>('all');

  // Trigger Action
  const handleToggleStatus = (proId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'pending' : 'active';
    setCabinetList(prev => 
      prev.map(item => item.id === proId ? { ...item, approvedStatus: nextStatus } : item)
    );

    const proName = cabinetList.find(p => p.id === proId)?.name.en || 'Cabinet';

    triggerNotification(
      'Regulatory Authority Status Modified',
      `Accreditation for ${proName} is now set to ${nextStatus === 'active' ? 'APPROVED & COMPLIANT' : 'PENDING ASSESSMENT'}.`
    );
  };

  const handleApplyGlobalParameters = (e: React.FormEvent) => {
    e.preventDefault();
    triggerNotification(
      'National Finance Act Config Saved',
      `TAP default levied rate adjusted to ${tapRate}% and IBS flat corporate tax threshold stabilized at ${ibsRate}%.`
    );
  };

  const filteredCabinets = cabinetList.filter((pro) => {
    const matchesSearch = tObj(pro.name).toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pro.accreditationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeAuditFilter === 'all' || pro.approvedStatus === activeAuditFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8" id="admin_dashboard_wrapper">
      
      {/* 1. STATE EMBLEM REGULATORY BANNER */}
      <div className="bg-white border-y-4 border-[#F59E0B] p-6 sm:p-8 text-white relative">
        <div className="absolute top-0 right-0 w-64 h-full bg-brand-primary/10 filter blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10 text-left rtl:text-right">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[#F59E0B]/20 border border-[#F59E0B] text-[#F59E0B] text-[9px] font-mono uppercase tracking-widest">
                {t('nationalAuditAuthority')}
              </span>
              <span className="text-[10px] font-mono text-slate-400">{t('dgiSupervisorStatus').toUpperCase()}: INTERNAL AUDITOR</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-900 leading-tight">
              {t('algeriaComplianceGateway')} <span className="text-brand-accent font-normal italic">أكونيت الإدارة</span>
            </h1>
            
            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-2xl">
              {t('supervisingCharteredCabinets')}
            </p>
          </div>

          <div className="px-5 py-3 bg-blue-50/50 border border-blue-200 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse"></span>
            <span className="text-slate-400 font-mono text-[10px] tracking-widest uppercase">{t('boardControlOnline')}</span>
          </div>
        </div>
      </div>

      {/* 2. CORE STATS MATRIX ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="admin_matrix_metrics">
        
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{t('registeredCabinets')}</p>
            <p className="text-2xl font-serif font-black text-brand-primary font-mono">{cabinetList.length}</p>
            <p className="text-[9px] text-slate-400 font-mono">{t('onccRegistered')}</p>
          </div>
          <Building2 className="w-8 h-8 text-brand-primary/30" />
        </div>

        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{t('nationalSmeEnrolment')}</p>
            <p className="text-2xl font-serif font-black text-indigo-950 font-mono">1,845</p>
            <p className="text-[9px] text-slate-400 font-mono">{t('activeEntities')}</p>
          </div>
          <Users className="w-8 h-8 text-indigo-900/30" />
        </div>

        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{t('g50SubmissionCompliance')}</p>
            <p className="text-2xl font-serif font-black text-amber-900 font-mono">94.2%</p>
            <p className="text-[9px] text-slate-400 font-mono">{t('monthlyPenetration')}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-amber-700/30" />
        </div>

        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1 text-left rtl:text-right">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">{t('systemTrustIndex')}</p>
            <p className="text-2xl font-serif font-black text-emerald-300 font-mono">100%</p>
            <p className="text-[9px] text-slate-400 font-mono">{t('secureTripleEncrypted')}</p>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-300/30" />
        </div>

      </div>

      {/* 3. COLUMNS SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN (col-span-8): PENDING AUDITING REGISTERS APPROVAL */}
        <div className="lg:col-span-8 bg-white border border-blue-200 rounded-xl p-6 sm:p-8 space-y-6 text-left rtl:text-right">
          
          <div className="pb-4 border-b border-blue-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{t('authorityControlBoard')}</span>
              <h2 className="font-serif font-semibold text-slate-900 text-base flex items-center gap-2 mt-1">
                <FileLock className="w-5 h-5 text-[#F59E0B]" />
                {t('proCredentialsApprovals')}
              </h2>
            </div>
            
            {/* Filter buttons */}
            <div className="flex gap-1 bg-white border border-blue-200 p-1 text-xs font-mono">
              {['all', 'active', 'pending'].map((filterVal) => (
                <button
                  key={filterVal}
                  onClick={() => setActiveAuditFilter(filterVal as any)}
                  className={`px-3 py-1 cursor-pointer transition ${activeAuditFilter === filterVal ? 'bg-brand-primary text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {filterVal.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside admin dashboard list */}
          <div className="relative border border-blue-200 px-3.5 py-2.5 bg-white flex items-center gap-2.5">
            <Search className="w-4.5 h-4.5 text-brand-primary shrink-0" />
            <input 
              type="text" 
              placeholder={t('filterByCabinetName')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs text-slate-200 bg-transparent focus:outline-none placeholder-gray-400 font-sans"
            />
          </div>

          {/* Table display list */}
          <div className="space-y-4">
            {filteredCabinets.length > 0 ? (
              filteredCabinets.map((cabinet) => (
                <div key={cabinet.id} className="border border-blue-200 p-5 hover:border-brand-primary transition bg-white/25 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 font-extrabold text-[11px] ${cabinet.avatarBg} flex items-center justify-center border border-blue-200/60`}>
                        {cabinet.initials}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-slate-900 text-xs sm:text-sm">{tObj(cabinet.name)}</h4>
                        <p className="text-[10px] text-slate-400 font-mono uppercase font-semibold">{tSpec(cabinet.specialty)}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                        <span>{tObj(cabinet.wilayaName)}, Algeria</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        AccNum: <span className="font-bold text-slate-300">{cabinet.accreditationNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    
                    {cabinet.approvedStatus === 'active' ? (
                      <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-250 text-emerald-300 text-[9px] font-mono font-bold uppercase tracking-wide">
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        {t('stateCabinetApprovedStatus').replace('🛡️ ', '')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 border border-amber-250 text-amber-300 text-[9px] font-mono font-bold uppercase tracking-wide">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        {t('stateCabinetPendingStatus')}
                      </span>
                    )}

                    <button
                      onClick={() => handleToggleStatus(cabinet.id, cabinet.approvedStatus)}
                      className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider cursor-pointer border ${
                        cabinet.approvedStatus === 'active' 
                          ? 'border-red-300 text-red-600 hover:bg-red-50 glass' 
                          : 'border-brand-primary text-brand-primary hover:bg-brand-light bg-white border border-blue-100 font-bold'
                      }`}
                    >
                      {cabinet.approvedStatus === 'active' ? t('suspendCabinetButton') : t('approvalsAcquiesceButton')}
                    </button>

                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400 font-mono space-y-1">
                <span className="text-2xl">🔍</span>
                <p className="text-xs">No registered cabinets matched your parameters.</p>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN (col-span-4): REGULATORY FORM CONFIGURATIONS */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-blue-200 p-6 shadow-3xs space-y-6 text-left rtl:text-right">
          
          <div className="pb-4 border-b border-blue-200">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{t('nationalFinanceActConfig')}</span>
            <h2 className="font-serif font-semibold text-slate-900 text-sm mt-1 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-brand-primary" />
              {t('nationalFinanceActConfigSub')}
            </h2>
          </div>

          <form onSubmit={handleApplyGlobalParameters} className="space-y-4 text-xs font-sans">
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[9px] font-mono">
                <label className="font-bold text-slate-400 uppercase">{t('defaultTapLevyRate')}</label>
                <span className="font-mono font-bold text-brand-primary">{tapRate}%</span>
              </div>
              <input 
                type="range" 
                min={0} 
                max={5} 
                step={0.1}
                value={tapRate} 
                onChange={(e) => setTapRate(Number(e.target.value))}
                className="w-full accent-brand-primary h-1 bg-blue-100 rounded-none outline-none appearance-none cursor-pointer"
              />
              <span className="text-[9px] text-slate-400 font-mono text-right block">Includes 1% default trade discount index limit</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest text-left">{t('flatIbsTaxRate')}</label>
              <select
                value={ibsRate}
                onChange={(e) => setIbsRate(Number(e.target.value))}
                className="w-full border border-blue-200 px-2 py-1.5 bg-white focus:outline-none focus:border-brand-primary font-mono cursor-pointer"
              >
                <option value={19}>19% - Produce Transformation Sector</option>
                <option value={23}>23% - Building, Tourism, Transport Sector</option>
                <option value={26}>26% - General Trade & Capital Resales</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Regulatory Board Directives</span>
              <div className="p-3 bg-white border border-blue-200 text-[10px] text-slate-300 space-y-1.5 leading-normal">
                <p>✓ All computations adhere to general Algerian Tax Code (CIDTA).</p>
                <p>✓ Startup labeled units bypass the 1.5% TAP levy automatically.</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-brand-primary hover:bg-brand-dark hover:scale-[1.01] text-slate-900 text-[10px] font-mono uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-1 shadow-xs"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t('applyGlobalThresholds')}</span>
            </button>

          </form>

          {/* Audit telemetry report */}
          <div className="pt-6 border-t border-blue-200 space-y-2.5">
            <h3 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('regulatoryFilingSystemLog')}</h3>
            
            <div className="glass text-emerald-400 text-[10px] font-mono p-4 rounded-none leading-relaxed overflow-x-auto text-left space-y-1 border border-blue-100">
              <p className="text-slate-400">[2026-05-22 16:12:01]</p>
              <p>System authenticated as General Supervisor.</p>
              <p className="text-slate-400">[2026-05-22 16:21:40]</p>
              <p>OCR parsing server checked. OK (99.4% resolution)</p>
              <p className="text-slate-400">[2026-05-22 16:22:15]</p>
              <p>{t('regulatoryFilingSystemLogDesc')}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
