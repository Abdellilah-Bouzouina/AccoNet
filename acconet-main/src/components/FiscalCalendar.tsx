import React, { useState } from 'react';
import { Calendar, AlertCircle, Clock, Info, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { algerianFiscalDeadlines, FiscalDeadline } from '../data/fiscalCalendar';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

export const FiscalCalendar: React.FC = () => {
  const { direction, language } = useLanguage();
  const { triggerNotification } = useApp();
  const [selectedMonth, setSelectedMonth] = useState<number>(5); // June (0-indexed: May is 4, June is 5)

  // Track statuses of simulated declarations
  const [itemStates, setItemStates] = useState<Record<string, 'todo' | 'done' | 'delegated'>>({
    'g50-jan': 'todo',
    'cnas-t1': 'done',
    'irg-acompte': 'todo',
    'bilan': 'todo'
  });

  const handleAction = (id: string, action: 'done' | 'delegated') => {
    const nextState = action;
    setItemStates(prev => ({ ...prev, [id]: nextState }));

    const itemLabel = algerianFiscalDeadlines.find(x => x.id === id)?.label || 'Déclaration';

    if (action === 'done') {
      triggerNotification(
        "Déclaration Validée",
        `Félicitations ! Vous avez marqué la tâche "${itemLabel}" comme déposée et payée.`
      );
    } else {
      triggerNotification(
        "Délégation de Dossier",
        `Dossier envoyé. Votre comptable partenaire a reçu l'alerte pour traiter "${itemLabel}".`
      );
    }
  };

  const currentYear = 2026;
  const monthNamesFR = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const monthNamesAR = [
    'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
    'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const getMonthName = (idx: number) => {
    return language === 'ar' ? monthNamesAR[idx] : monthNamesFR[idx];
  };

  // Helper matching deadline to selected month
  const getFilteredDeadlines = (): (FiscalDeadline & { computedDue: string; status: 'todo' | 'done' | 'delegated' })[] => {
    const monthCode1Based = selectedMonth + 1; // 1-12
    return algerianFiscalDeadlines.map(deadline => {
      let activeThisMonth = false;
      let computedDue = '';

      if (deadline.frequency === 'monthly') {
        activeThisMonth = true;
        computedDue = `${deadline.dueDay} ${getMonthName(selectedMonth)}`;
      } else if (deadline.frequency === 'quarterly' && deadline.dueMonths?.includes(monthCode1Based)) {
        activeThisMonth = true;
        computedDue = `${deadline.dueDay} ${getMonthName(selectedMonth)}`;
      } else if (deadline.frequency === 'annual' && deadline.dueMonth === monthCode1Based) {
        activeThisMonth = true;
        computedDue = `${deadline.dueDay} ${getMonthName(selectedMonth)}`;
      } else if (deadline.frequency === 'social' && deadline.dueMonth === monthCode1Based) {
        activeThisMonth = true;
        computedDue = `${deadline.dueDay} ${getMonthName(selectedMonth)}`;
      }

      return {
        ...deadline,
        activeThisMonth,
        computedDue,
        status: itemStates[deadline.id] || 'todo'
      };
    }).filter(d => d.activeThisMonth);
  };

  const activeDeadlines = getFilteredDeadlines();

  return (
    <div className="glass border border-blue-200 p-5 sm:p-6 text-left rtl:text-right font-sans shadow-2xs w-full" id="fiscal_calendar_widget">
      
      {/* Header and Month Slider */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-blue-200">
        <div>
          <div className="flex items-center gap-1.5 text-brand-primary">
            <Calendar className="w-5 h-5 shrink-0" />
            <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900">
              {language === 'ar' ? 'الروزنامة الجبائية والمالية — 2026' : 'Calendrier Fiscal Réglementaire — 2026'}
            </h3>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-mono">
            Conforme au CIDTA & Arrêtés ONEC/ONCC du Système Comptable Financier (SCF)
          </p>
        </div>

        {/* Month Selector dropdown */}
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border border-blue-200 px-3 py-1.5 bg-white text-xs font-mono font-bold text-slate-300 outline-none focus:border-brand-primary cursor-pointer rounded-none"
        >
          {monthNamesFR.map((name, idx) => (
            <option key={idx} value={idx}>
              {getMonthName(idx)} 2026
            </option>
          ))}
        </select>
      </div>

      {/* Deadlines Feed */}
      <div className="mt-4 space-y-3.5">
        {activeDeadlines.length > 0 ? (
          activeDeadlines.map((deadline) => (
            <div 
              key={deadline.id}
              className={`p-4 border transition ${
                deadline.status === 'done' 
                  ? 'border-emerald-250 bg-emerald-900/200/5' 
                  : deadline.status === 'delegated'
                    ? 'border-indigo-250 bg-indigo-900/200/5'
                    : 'border-blue-200 bg-white/30'
              } flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}
            >
              <div className="space-y-1.5 md:max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${
                    deadline.status === 'done'
                      ? 'bg-emerald-600 text-white'
                      : deadline.status === 'delegated'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-red-100 text-red-700'
                  }`}>
                    ⏱️ EXIGIBLE : {deadline.computedDue}
                  </span>
                  
                  <span className="px-1.5 py-0.5 glass/5 border border-blue-200 text-slate-400 text-[8px] font-mono uppercase">
                    {deadline.frequency}
                  </span>
                </div>

                <h4 className="font-serif font-black text-xs sm:text-sm text-slate-800 leading-snug">
                  {deadline.label}
                </h4>
                
                <p className="text-[11px] leading-relaxed text-slate-300">
                  {deadline.description}
                </p>

                {/* Penalty warning block */}
                <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-mono">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Amende/Pénalité : {deadline.penalty}</span>
                </div>
              </div>

              {/* Actions Box */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                {deadline.status === 'done' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Déposé & Payé
                  </span>
                )}

                {deadline.status === 'delegated' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 border border-indigo-300 text-indigo-300 text-[10px] font-mono font-bold uppercase">
                    <Clock className="w-3.5 h-3.5 text-indigo-700 animate-pulse" />
                    Délégué au Pro
                  </span>
                )}

                {deadline.status === 'todo' && (
                  <>
                    <button
                      onClick={() => handleAction(deadline.id, 'done')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-mono uppercase tracking-wider font-bold transition cursor-pointer"
                    >
                      ✓ Déclarer
                    </button>
                    <button
                      onClick={() => handleAction(deadline.id, 'delegated')}
                      className="px-3 py-1.5 glass hover:bg-brand-light text-brand-primary border border-brand-primary text-[10px] font-mono uppercase tracking-wider font-bold transition cursor-pointer"
                    >
                      ✉ Déléguer
                    </button>
                  </>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="text-center py-8 border border-dashed border-blue-200 text-slate-400 font-mono text-xs">
            Aucun dépôt ou taxe obligatoire répertorié pour {getMonthName(selectedMonth)} 2026.
          </div>
        )}
      </div>

      {/* Info Footnote block */}
      <div className="mt-4 p-3.5 bg-amber-900/200/5 border border-amber-300/40 text-[10px] leading-relaxed text-amber-900 flex items-start gap-2">
        <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
        <p>
          <strong>Prudence Légale (CPF) :</strong> La date limite du G50 mensuel est le 20 de chaque mois d'exercice. L'Extrait de Rôle des impôts en Algérie exige une absence stricte d'arriérés (Rôle Apuré) pour pouvoir soumissionner aux marchés de sous-traitance industrielle B2B.
        </p>
      </div>

    </div>
  );
};
