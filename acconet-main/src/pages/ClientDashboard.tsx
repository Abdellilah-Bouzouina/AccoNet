import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  Building2, Users, FileText, CheckCircle2,
  Calendar, Send, ShieldCheck, Receipt, Wrench,
} from 'lucide-react';
import { professionals } from '../data/mockData';

// ── Placeholder tool names (to be replaced with final Arabic names) ──
const TOOLS = [
  { id: 'tool_1', icon: '📄', label: { ar: 'أداة 1', fr: 'Outil 1', en: 'Tool 1' } },
  { id: 'tool_2', icon: '📊', label: { ar: 'أداة 2', fr: 'Outil 2', en: 'Tool 2' } },
  { id: 'tool_3', icon: '🧮', label: { ar: 'أداة 3', fr: 'Outil 3', en: 'Tool 3' } },
  { id: 'tool_4', icon: '📝', label: { ar: 'أداة 4', fr: 'Outil 4', en: 'Tool 4' } },
  { id: 'tool_5', icon: '📁', label: { ar: 'أداة 5', fr: 'Outil 5', en: 'Tool 5' } },
  { id: 'tool_6', icon: '🔍', label: { ar: 'أداة 6', fr: 'Outil 6', en: 'Tool 6' } },
];

export const ClientDashboard: React.FC = () => {
  const { t, tObj, tSpec, direction, language } = useLanguage();
  const { currentClient, contracts, tasks, updateTaskStatus, addTask } = useApp();

  const [newTaskTitle,       setNewTaskTitle]       = useState('');
  const [selectedContractId, setSelectedContractId] = useState('');

  const clientContracts    = contracts.filter(c => c.clientId === (currentClient?.id || 'c1'));
  const activeContractIds  = clientContracts.map(c => c.id);
  const clientTasks        = tasks.filter(tk => activeContractIds.includes(tk.contractId));
  const pendingTasksCount  = clientTasks.filter(tk => tk.status !== 'done').length;
  const completedTasksCount = clientTasks.filter(tk => tk.status === 'done').length;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedContractId) return;
    addTask({
      id: `tk_cl_${Date.now()}`,
      contractId: selectedContractId,
      title: { ar: newTaskTitle, fr: newTaskTitle, en: newTaskTitle },
      deadline: new Date(Date.now() + 7 * 86_400_000).toISOString().split('T')[0],
      status: 'todo',
      type: 'bookkeeping',
    });
    setNewTaskTitle('');
  };

  const toolLabel = (tool: typeof TOOLS[0]) =>
    tool.label[language as 'ar' | 'fr' | 'en'] ?? tool.label.ar;

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8"
      dir={direction}
    >
      {/* ── WELCOME HEADER ── */}
      <div className="bg-white border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-classic">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
          <div className="space-y-2 text-left rtl:text-right">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-1 rounded-lg">
              {language === 'ar' ? 'فضاء الأعمال' : 'Business Suite'}
            </span>
            <h1 className="font-serif font-bold text-slate-800 text-2xl sm:text-3xl leading-snug">
              {t('clientWelcome')}{' '}
              <span className="text-brand-primary italic">{currentClient?.companyName || 'Dzair Tech Link'}</span>
            </h1>
            <p className="text-sm text-slate-400 flex flex-wrap items-center gap-3 font-mono">
              <span>NIF: <strong className="text-brand-primary">{currentClient?.NIF}</strong></span>
              <span className="text-slate-200">|</span>
              <span>{tObj(currentClient?.wilayaName)}</span>
            </p>
          </div>
          <div className="px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs font-mono text-slate-500 shrink-0">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            {language === 'ar' ? 'SCF — مطابق' : 'SCF Compliance Live'}
          </div>
        </div>
      </div>

      {/* ── KPI MATRIX ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('activeContractsLabel'), value: clientContracts.length,     color: 'text-brand-primary', Icon: Building2 },
          { label: t('dashboardTasksActive'), value: pendingTasksCount,           color: 'text-amber-500',     Icon: FileText  },
          { label: language === 'ar' ? 'مكتملة' : 'Complétées', value: completedTasksCount, color: 'text-emerald-500', Icon: CheckCircle2 },
          { label: language === 'ar' ? 'مكاتب مرتبطة' : 'Cabinets liés', value: new Set(clientContracts.map(c => c.professionalId)).size, color: 'text-indigo-500', Icon: Users },
        ].map(({ label, value, color, Icon }, i) => (
          <div key={i} className="bg-white border border-blue-100 rounded-xl p-5 shadow-classic flex items-center justify-between">
            <div className="space-y-1 text-left rtl:text-right">
              <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider leading-none">{label}</p>
              <p className={`text-3xl font-serif font-black ${color}`}>{value}</p>
            </div>
            <Icon className={`w-9 h-9 ${color} opacity-20`} />
          </div>
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left column */}
        <div className="lg:col-span-8 space-y-8">

          {/* Active contracts */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-classic space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-blue-100">
              <div className="text-left rtl:text-right">
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">{language === 'ar' ? 'العقود النشطة' : 'Active Engagements'}</p>
                <h2 className="font-serif font-semibold text-slate-800 text-lg flex items-center gap-2 mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" />
                  {t('activeServiceContractsTitle')}
                </h2>
              </div>
              <span className="text-sm font-mono text-slate-400">{clientContracts.length}</span>
            </div>

            {clientContracts.length === 0 ? (
              <p className="text-center py-10 text-slate-400 text-sm font-mono">
                {language === 'ar' ? 'لا توجد عقود نشطة.' : 'Aucun contrat actif.'}
              </p>
            ) : (
              <div className="space-y-4">
                {clientContracts.map(con => {
                  const pro = professionals.find(p => p.id === con.professionalId);
                  const tasksForContract = clientTasks.filter(tk => tk.contractId === con.id);
                  const doneCount = tasksForContract.filter(tk => tk.status === 'done').length;
                  const progress = tasksForContract.length ? Math.round((doneCount / tasksForContract.length) * 100) : 0;

                  return (
                    <div key={con.id} className="border border-blue-100 rounded-xl p-5 bg-blue-50/30 hover:border-brand-primary/40 transition space-y-4 text-left rtl:text-right">
                      <div className="flex flex-col sm:flex-row justify-between gap-3">
                        <div>
                          <h3 className="font-serif font-bold text-slate-800 leading-snug">{tObj(con.title)}</h3>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">REF: {con.id}</p>
                        </div>
                        <span className="self-start px-2.5 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono uppercase rounded-lg shrink-0">
                          {con.status}
                        </span>
                      </div>

                      {pro && (
                        <div className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl p-3 text-sm">
                          <div className="w-9 h-9 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm shrink-0">
                            {pro.initials}
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-mono uppercase">{language === 'ar' ? 'المهني المعتمد' : 'Professionnel agréé'}</p>
                            <p className="font-bold text-slate-800">{tObj(pro.name)} <span className="text-slate-400 font-normal">— {tSpec(pro.specialty)}</span></p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-blue-100 text-sm">
                        <div>
                          <p className="text-xs text-slate-400 font-mono uppercase">{t('contractValueLabel')}</p>
                          <p className="font-bold font-mono text-slate-800">{con.value.toLocaleString()} DZD</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-mono uppercase">{language === 'ar' ? 'بداية' : 'Début'}</p>
                          <p className="font-semibold font-mono text-slate-800">{con.startDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-mono uppercase">{language === 'ar' ? 'نهاية' : 'Fin'}</p>
                          <p className="font-semibold font-mono text-slate-800">{con.endDate}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400 uppercase">{language === 'ar' ? 'تقدم المهام' : 'Progression des tâches'}</span>
                          <span className="font-bold text-brand-primary">{progress}%</span>
                        </div>
                        <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand-primary h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Task dispatcher */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-classic space-y-5">
            <div className="pb-3 border-b border-blue-100 text-left rtl:text-right">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">{language === 'ar' ? 'تفويض المهام' : 'Dispatch des tâches'}</p>
              <h2 className="font-serif font-semibold text-slate-800 flex items-center gap-2 mt-0.5">
                <Send className="w-5 h-5 text-brand-primary" />
                {language === 'ar' ? 'إسناد مهمة للمهني' : 'Attribuer une tâche au cabinet'}
              </h2>
            </div>
            <form onSubmit={handleAddTask} className="space-y-4 text-left rtl:text-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    {language === 'ar' ? 'العقد المستهدف' : 'Contrat cible'}
                  </label>
                  <select
                    required
                    value={selectedContractId}
                    onChange={e => setSelectedContractId(e.target.value)}
                    className="w-full border border-blue-200 bg-blue-50 rounded-xl text-slate-700 focus:border-brand-primary"
                  >
                    <option value="">{language === 'ar' ? 'اختر العقد...' : 'Sélectionner...'}</option>
                    {clientContracts.map(c => (
                      <option key={c.id} value={c.id}>{tObj(c.title).substring(0, 45)}…</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    {language === 'ar' ? 'عنوان المهمة' : 'Titre de la tâche'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'ar' ? 'مثال: مراجعة كشف G50' : 'ex: Vérification G50 de mai'}
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    className="w-full border border-blue-200 bg-blue-50 rounded-xl text-slate-700 focus:border-brand-primary"
                  />
                </div>
              </div>
              <button type="submit" className="px-6 py-3 bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm rounded-xl transition">
                {language === 'ar' ? 'إسناد المهمة' : 'Attribuer la tâche'}
              </button>
            </form>
          </div>

          {/* Tools grid — placeholder names, final Arabic names coming */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-classic space-y-5">
            <div className="pb-3 border-b border-blue-100 text-left rtl:text-right">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                {language === 'ar' ? 'الأدوات' : 'Outils du tableau de bord'}
              </p>
              <h2 className="font-serif font-semibold text-slate-800 flex items-center gap-2 mt-0.5">
                <Wrench className="w-5 h-5 text-brand-primary" />
                {language === 'ar' ? 'أدوات العمل' : 'Outils de travail'}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {TOOLS.map(tool => (
                <button
                  key={tool.id}
                  className="flex flex-col items-center gap-3 p-5 bg-blue-50 border border-blue-200 rounded-xl hover:border-brand-primary hover:bg-brand-primary/5 transition"
                >
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="text-sm font-semibold text-slate-600 font-mono">{toolLabel(tool)}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 font-mono text-center">
              {language === 'ar' ? '(أسماء الأدوات قيد التحديث)' : '(Noms des outils — mise à jour en cours)'}
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-4 space-y-6">

          {/* Deadlines */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-classic space-y-5">
            <h2 className="font-serif font-semibold text-slate-800 flex items-center gap-2 pb-3 border-b border-blue-100">
              <Calendar className="w-5 h-5 text-brand-primary" />
              {t('upcomingDeadlinesTitle')}
            </h2>
            <div className="space-y-3">
              {clientTasks.length === 0 && (
                <p className="text-center text-slate-400 text-sm py-4">
                  {language === 'ar' ? 'لا توجد مهام.' : 'Aucune tâche.'}
                </p>
              )}
              {clientTasks.map(tk => {
                const overdue  = new Date(tk.deadline) < new Date();
                const done     = tk.status === 'done';
                const colorSet = done
                  ? 'bg-emerald-50 border-emerald-200'
                  : overdue
                  ? 'bg-red-50 border-red-200'
                  : 'bg-amber-50 border-amber-200';

                return (
                  <div key={tk.id} className={`p-4 border rounded-xl text-left rtl:text-right ${colorSet}`}>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-xs font-bold font-mono uppercase text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                        {tk.type}
                      </span>
                      <button
                        onClick={() => updateTaskStatus(tk.id, done ? 'todo' : 'done')}
                        className={`w-5 h-5 border flex items-center justify-center rounded-md transition shrink-0 ${done ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300 hover:border-brand-primary'}`}
                      >
                        {done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    </div>
                    <p className="text-sm font-bold font-serif text-slate-800">{tObj(tk.title)}</p>
                    <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-blue-1000 text-slate-500">
                      <span>{language === 'ar' ? 'الموعد:' : 'Échéance:'} <strong className="font-mono">{tk.deadline}</strong></span>
                      <span className="font-mono uppercase text-xs bg-white px-2 py-0.5 border border-slate-200 rounded-md">{tk.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent actions */}
          <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-classic space-y-4">
            <h2 className="font-serif font-semibold text-slate-800 flex items-center gap-2 pb-2 border-b border-blue-100">
              <Receipt className="w-5 h-5 text-brand-primary" />
              {t('recentActionsLabel')}
            </h2>
            <div className="space-y-4 text-sm">
              {[
                { dot: 'bg-brand-primary', text: language === 'ar' ? 'عرض عقد من Layla Yakoubi' : 'Proposition de contrat — Layla Yakoubi', time: '2026-05-20 14:02' },
                { dot: 'bg-amber-400',     text: language === 'ar' ? 'رفع تقرير G50 — Sofiane Benamara' : 'Rapport G50 chargé — Sofiane Benamara', time: '2026-05-18 10:15' },
                { dot: 'bg-indigo-400',    text: language === 'ar' ? 'جلسة استشارة ضريبية' : 'Consultation fiscale planifiée', time: '2026-05-10 11:30' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`w-2 h-2 rounded-full ${item.dot} mt-1.5 shrink-0`} />
                  <div>
                    <p className="text-slate-700">{item.text}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
