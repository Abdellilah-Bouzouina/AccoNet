import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, FileText, Database, ShieldAlert, Cpu,
  ChevronDown, ChevronUp, Play, Info, RefreshCw
} from 'lucide-react';

const mockInputData = {
  rawEntryText: {
    en: 'Purchase of raw materials worth 10,000 DZD on account. Value-added tax: 19%',
    fr: "Achat de matières premières d'une valeur de 10 000 DA à crédit. Taxe sur la valeur ajoutée : 19 %",
    ar: 'شراء مواد أولية بقيمة 10000 دج على الحساب. الضريبة على القيمة المضافة 19%.'
  },
  rawBalanceState: {
    en: 'Debit Ledger: 14,800,000 DZD | Credit Ledger: 14,850,000 DZD',
    fr: 'Grand Livre Débit : 14 800 000 DZD | Grand Livre Crédit : 14 850 000 DZD',
    ar: 'دفتر الأستاذ مدين: 14,800,000 دج | دفتر الأستاذ دائن: 14,850,000 دج'
  },
  smeForecastText: {
    en: 'Improve cash flow margins for a food production factory in Blida.',
    fr: 'Améliorer les marges de trésorerie pour une usine de production alimentaire à Blida.',
    ar: 'تحسين هوامش التدفق النقدي لمصنع إنتاج أغذية في البليدة.'
  }
};

export const Tools: React.FC = () => {
  const { language, t, tObj } = useLanguage(); 
  const currentLang = (language === 'fr' || language === 'ar') ? language : 'en';

  const [expandedTool, setExpandedTool] = useState<number | null>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  const [rawEntryText, setRawEntryText] = useState(mockInputData.rawEntryText[currentLang]);
  const [selectedMockPdf, setSelectedMockPdf] = useState('invoice_or_0982.pdf');
  
  // --- مدخلات الأداة الثالثة (تصريح G50 التفاعلي) ---
  const [companyName, setCompanyName] = useState('Sarl El Nadjah');
  const [nifNumber, setNifNumber] = useState('002116090123456');
  const [sales19, setSales19] = useState('3,000,000'); 
  const [sales9, setSales9] = useState('500,000');    
  const [monthlyStaffPayroll, setMonthlyStaffPayroll] = useState('1,200,000');
  const [hasTapExemption, setHasTapExemption] = useState<boolean>(false);
  // -----------------------------------------------------

  const [rawBalanceState, setRawBalanceState] = useState(mockInputData.rawBalanceState[currentLang]);
  const [smeForecastText, setSmeForecastText] = useState(mockInputData.smeForecastText[currentLang]);

  useEffect(() => {
    setRawEntryText(mockInputData.rawEntryText[currentLang]);
    setRawBalanceState(mockInputData.rawBalanceState[currentLang]);
    setSmeForecastText(mockInputData.smeForecastText[currentLang]);
    setSimulationResult(null); 
  }, [currentLang]);

  const toolsList = [
    {
      id: 0,
      title: { ar: "التسجيل المحاسبي الآلي", fr: "Enregistrement Comptable Automatique", en: "Automated Accounting Entry" },
      desc: { ar: "تحويل العمليات النثرية إلى قيود محاسبية آلية متوافقة مع النظام المحاسبي المالي الجزائري.", fr: "Conversion automatique des transactions en écritures comptables conformes au SCF algérien.", en: "Automatically converts plain-text transactions into compliant double-entry journal records under the Algerian SCF." },
      icon: Sparkles,
      color: "bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
    },
    {
      id: 1,
      title: { ar: "استخراج المعلومات من الوثائق أوتوماتيكيا حسب الحاجة (مبالغ...إلخ)", fr: "Extraction Automatique depuis les Documents (montants, etc.)", en: "Automatic Document Data Extraction (amounts, etc.)" },
      desc: { ar: "استخراج تلقائي للمبالغ وأرقام النيف NIF وبيانات الضريبة وسائر المعلومات من الفواتير والوثائق المحاسبية.", fr: "Extraction automatisée des montants, NIF, TVA et données fiscales depuis vos factures et documents comptables.", en: "Automated extraction of amounts, NIF numbers, tax data, and other key information from invoices and accounting documents." },
      icon: FileText,
      color: "bg-white border-blue-100 text-teal-400"
    },
    {
      id: 2,
      title: { ar: "إعداد التصريحات في قوالب جاهزة (G50)", fr: "Préparation des Déclarations en Modèles Prêts (G50)", en: "Declaration Preparation with Ready-Made Templates (G50)" },
      desc: { ar: "توليد التصريحات الجبائية (G50) تلقائياً في قالب جاهز ومفصل بناءً على أرقام أعمالك الفعلية والتشريع الجزائري.", fr: "Génération automatique et calcul interactif de la déclaration fiscale mensuelle G50 selon la réglementation algérienne.", en: "Automatically calculates and generates a detailed monthly G50 tax declaration template based on your actual inputs." },
      icon: Database,
      color: "bg-white border-blue-100 text-amber-400"
    },
    {
      id: 3,
      title: { ar: "مسح القوائم المالية واكتشاف الأخطاء", fr: "Analyse des États Financiers et Détection d'Erreurs", en: "Financial Statement Scanning & Error Detection" },
      desc: { ar: "قريباً...", fr: "Disponible bientôt...", en: "Coming soon..." },
      icon: ShieldAlert,
      color: "bg-white border-blue-100 text-rose-400"
    },
    {
      id: 4,
      title: { ar: "تحليل القوائم المالية باستخدام الذكاء الاصطناعي وتقديم الاقتراحات", fr: "Analyse des États Financiers par IA avec Recommandations", en: "AI-Powered Financial Statement Analysis & Suggestions" },
      desc: { ar: "قريباً...", fr: "Disponible bientôt...", en: "Coming soon..." },
      icon: Cpu,
      color: "bg-white border-blue-100 text-sky-400"
    }
  ];

  const handleRunSimulation = (toolId: number) => {
    setIsProcessing(true);
    setSimulationResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      
      if (toolId === 0) {
        if (currentLang === 'ar') {
          setSimulationResult(`[القيود المحاسبية]\nالتاريخ: 2026-05-22\n\nحسابات مدينة:\n- الصنف 3 (حساب 381): 10000 دج\n- الصنف 4 (حساب 4456): 1900 دج\n\nحسابات دائنة:\n- الصنف 4 (حساب 401): 11900 دج\n\n[البيان]: تسجيل عملية شراء مواد أولية على الحساب .`);
        } else if (currentLang === 'fr') {
          setSimulationResult(`[Ecritures Comptables]\nDate: 22-05-2026\n\nComptes débiteurs :\n- Classe 3 (compte 381) : 10 000 DA\n- Classe 4 (compte 4456) : 1 900 DA\n\nComptes créditeurs :\n- Classe 4 (compte 401) : 11 900 DA\n\n[Libellé]: Constatation Achat matières premières.`);
        } else {
          setSimulationResult(`[Accounting Entries]\nDate: 2026-05-22\n\nDEBIT LINES:\n- Class 3 (Account 381): 10,000 DA\n- Class 4 (Account 4456): 1,900 DA\n\nCREDIT LINES:\n- Class 4 (Account 401): 11,900 DA\n\n[Description]: Recognition of Raw Material Purchase.`);
        }
      } else if (toolId === 1) {
        if (currentLang === 'ar') {
          setSimulationResult(`[تقرير تشخيص مسح الذكاء الاصطناعي OCR: ${selectedMockPdf}]\n- نوع الوثيقة: فاتورة مورد\n- اسم المورد: Sarl Mitidja Carton Algerie (المركز: البليدة)\n- رقم النيف (NIF) المكتشف: 001209043224190 \n- المبلغ الصافي (HT): 500,000 دج\n- معدل القيمة المضافة: 19% -> 95,000 دج\n- المبلغ الإجمالي (TTC): 595,000 دج\n`);
        } else if (currentLang === 'fr') {
          setSimulationResult(`[RAPPORT DIAGNOSTIC SCAN OCR IA: ${selectedMockPdf}]\n- Type de Document: Facture de Fournisseur\n- Nom du Fournisseur: Sarl Mitidja Carton Algerie (Siège: Blida)\n- NIF Détecté: 001209043224190 \n- Montant Hors Taxe (HT): 500 000 DZD\n- Taux de TVA: 19%  -> 95 000 DZD\n- Montant TTC: 595 000 DZD\n`);
        } else {
          setSimulationResult(`[AI OCR SCAN DIAGNOSTIC REPORT: ${selectedMockPdf}]\n- Document Type: Supplier Expense Invoice\n- Vendor Name: Sarl Mitidja Carton Algerie (HQ: Blida)\n- Supplier NIF Detected: 001209043224190 \n- Base Amount (HT): 500,000 DZD\n- VAT rate: 19% -> 95,000 DZD\n- Total Amount (TTC): 595,000 DZD\n`);
        }
      } else if (toolId === 2) {
        const s19 = Number(sales19.replace(/,/g, '')) || 0;
        const s9 = Number(sales9.replace(/,/g, '')) || 0;
        const payroll = Number(monthlyStaffPayroll.replace(/,/g, '')) || 0;
        
        const tva19 = Math.round(s19 * 0.19);
        const tva9 = Math.round(s9 * 0.09);
        const totalTva = tva19 + tva9;
        
        const totalSales = s19 + s9;
        const tapRate = hasTapExemption ? 0 : 0.015; 
        const tap = Math.round(totalSales * tapRate);
        const irgSim = Math.round(payroll * 0.15); 
        
        const totalTaxOutflow = totalTva + tap + irgSim;

        if (currentLang === 'ar') {
          setSimulationResult(`[قالب معاينة الإقرار الشهري الرسمي G50 الجاهز]\n-----------------------------------------------------------\nوزارة المالية - المديرية العامة للضرائب (الجزائر)\nالمكلف بالضريبة: ${companyName} | رقم التعريف الجبائي (NIF): ${nifNumber}\nالنظام الجبائي: النظام الحقيقي (Régime Réel)\n-----------------------------------------------------------\n\nالقسم الأول: الرسوم على رقم الأعمال (الرمز 401 - TVA)\n- مبيعات بمعدل 19%: ${s19.toLocaleString()} دج | الضريبة المستحقة: ${tva19.toLocaleString()} دج\n- مبيعات بمعدل 9%: ${s9.toLocaleString()} دج | الضريبة المستحقة: ${tva9.toLocaleString()} دج\n=> إجمالي الضريبة على القيمة المضافة المحصلة: ${totalTva.toLocaleString()} دج\n\nالقسم الثاني: الرسم على النشاط المهني (الرمز 101 - TAP)\n- الأساس الخاضع للضريبة (HT): ${totalSales.toLocaleString()} دج\n- المعدل المطبق: ${tapRate * 100}% ${hasTapExemption ? '(معفى قانوناً)' : ''}\n=> الرسوم المستحقة للـ TAP: ${tap.toLocaleString()} دج\n\nالقسم الثالث: الضريبة على الدخل الإجمالي للأجور (الرمز 110 - IRG)\n- كتلة الأجور المصرح بها: ${payroll.toLocaleString()} دج\n=> ضريبة الـ IRG المقتطعة من المصدر: ${irgSim.toLocaleString()} دج\n\n-----------------------------------------------------------\n[صافي المبلغ الإجمالي الواجب دفعه للقباضة]: ${totalTaxOutflow.toLocaleString()} دج\n(قالب جاهز للاستخراج والمطابقة القانونية ✅)`);
        } else if (currentLang === 'fr') {
          setSimulationResult(`[MODÈLE DE DÉCLARATION MENSUELLE OFFICIELLE G50]\n-----------------------------------------------------------\nMINISTÈRE DES FINANCES - DIRECTION GÉNÉRALE DES IMPÔTS (ALGERIE)\nContribuable : ${companyName} | NIF : ${nifNumber}\nRégime Fiscal : Régime Réel\n-----------------------------------------------------------\n\nSECTION I : TAXE SUR LE CHIFFRE D'AFFAIRES (Code Impôt 401 - TVA)\n- Ventes au Taux Normal 19% : ${s19.toLocaleString()} DA | TVA Due : ${tva19.toLocaleString()} DA\n- Ventes au Taux Réduit 9%  : ${s9.toLocaleString()} DA | TVA Due : ${tva9.toLocaleString()} DA\n=> Total TVA Collectée : ${totalTva.toLocaleString()} DA\n\nSECTION II : TAXE SUR L'ACTIVITÉ PROFESSIONNELLE (Code Impôt 101 - TAP)\n- Base Imposable Globale (HT) : ${totalSales.toLocaleString()} DA\n- Taux Appliqué : ${tapRate * 100}% ${hasTapExemption ? '(Exonéré)' : ''}\n=> Montant TAP Dû : ${tap.toLocaleString()} DA\n\nSECTION III : IMPÔT SUR LE REVENU GLOBAL / SALAIRES (Code Impôt 110 - IRG)\n- Masse Salariale Déclarée : ${payroll.toLocaleString()} DA\n=> Montant IRG à Reverser : ${irgSim.toLocaleString()} DA\n\n-----------------------------------------------------------\n[NET À PAYER TOTAL À LA RECETTE DES IMPÔTS] : ${totalTaxOutflow.toLocaleString()} DA`);
        } else {
          setSimulationResult(`[OFFICIAL G50 MONTHLY RETURN PREVIEW TEMPLATE]\n-----------------------------------------------------------\nMINISTRY OF FINANCE - GENERAL DIRECTORATE OF TAXES (ALGERIA)\nTaxpayer Name: ${companyName} | NIF Number: ${nifNumber}\nFiscal Regime: Régime Réel (Actual System)\n-----------------------------------------------------------\n\nSECTION I: VALUE ADDED TAX (Tax Code 401 - TVA)\n- Turnover at 19%: ${s19.toLocaleString()} DA | VAT Due: ${tva19.toLocaleString()} DA\n- Turnover at 9%: ${s9.toLocaleString()} DA | VAT Due: ${tva9.toLocaleString()} DA\n=> Total Collected VAT Outflow: ${totalTva.toLocaleString()} DA\n\nSECTION II: PROFESSIONAL ACTIVITY TAX (Tax Code 101 - TAP)\n- Base Taxable Turnover (HT): ${totalSales.toLocaleString()} DA\n- Applied Rate: ${tapRate * 100}% ${hasTapExemption ? '(Legally Exempt)' : ''}\n=> TAP Tax Outflow: ${tap.toLocaleString()} DA\n\nSECTION III: INDIVIDUAL INCOME TAX ON SALARIES (Tax Code 110 - IRG)\n- Total Staff Salary Ledger: ${payroll.toLocaleString()} DA\n=> Withholding IRG Tax Amount: ${irgSim.toLocaleString()} DA\n\n-----------------------------------------------------------\n[NET TOTAL AMOUNT TO PAY AT CASHIER]: ${totalTaxOutflow.toLocaleString()} DA`);
        }
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-slate-100" id="tools_page_wrapper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-10">
        
        {/* Title Header */}
        <div className="glass p-6 sm:p-8 rounded-2xl text-center space-y-4 border border-blue-100 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-48 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 animate-spin text-brand-primary" />
            <span>{t('interactiveSandboxEngine')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-none mt-1">
            {t('aiToolsHeroTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('aiToolsHeroSub')}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Tool Cards) */}
          <div className="lg:col-span-5 space-y-3.5 text-left rtl:text-right">
            {toolsList.map((tool) => {
              const Icon = tool.icon;
              const isExpanded = expandedTool === tool.id;

              return (
                <div 
                  key={tool.id}
                  onClick={() => {
                    setExpandedTool(tool.id);
                    setSimulationResult(null);
                  }}
                  className={`border rounded-xl p-5 cursor-pointer transition-all duration-200 ${isExpanded ? 'bg-white border-brand-primary/50 shadow-glow ring-1 ring-brand-primary/10' : 'bg-white/60 border-blue-100 hover:bg-white hover:border-blue-200'}`}
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg border border-blue-200 flex items-center justify-center shrink-0 ${tool.color}`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="font-serif font-bold text-slate-800 text-xs sm:text-sm">{tObj(tool.title)}</h3>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                  <p className="text-slate-400 text-[11px] sm:text-xs leading-normal">
                    {tObj(tool.desc)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column (Control & Output Window) */}
          <div className="lg:col-span-7 bg-white border border-blue-100 rounded-2xl p-6 sm:p-8 shadow-classic space-y-6 sticky top-24 text-left rtl:text-right">
            {expandedTool !== null ? (
              <>
                <div className="pb-4 border-b border-blue-100 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif font-black text-brand-primary text-sm sm:text-base leading-none">
                      ⚙️ {t('activeSimulator')}: {tObj(toolsList[expandedTool].title)}
                    </h2>
                  </div>
                  <span className="text-[10px] bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-2.5 py-1 rounded font-mono tracking-wider">{t('scfVersionLabel')}</span>
                </div>

                {/* Dynamic Inputs */}
                <div className="space-y-4 font-sans text-xs">
                  {expandedTool === 0 && (
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('businessExpNarrative')}</label>
                      <textarea rows={3} value={rawEntryText} onChange={(e) => setRawEntryText(e.target.value)} className="w-full border border-blue-200 p-3 rounded-lg text-xs text-slate-900 bg-white/40 focus:outline-none focus:border-brand-primary " />
                    </div>
                  )}

                  {expandedTool === 1 && (
                    <div className="space-y-3">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('chooseVoucherScan')}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {['invoice_or_0982.pdf'].map((f) => (
                          <button key={f} type="button" onClick={() => setSelectedMockPdf(f)} className={`p-2.5 text-[10px] border rounded-lg font-mono text-center cursor-pointer transition ${selectedMockPdf === f ? 'bg-brand-primary/10 border-brand-primary text-brand-primary font-bold' : 'border-blue-100 hover:bg-slate-50 text-slate-400'}`}>📄 {f}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TOOL 2 INPUT */}
                  {expandedTool === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{currentLang === 'ar' ? 'اسم المؤسسة / المكلف' : 'Nom de l\'entreprise'}</label>
                          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 bg-white/40 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{currentLang === 'ar' ? 'رقم التعريف الجبائي (NIF)' : 'Numéro NIF'}</label>
                          <input type="text" value={nifNumber} onChange={(e) => setNifNumber(e.target.value)} className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono bg-white/40 focus:outline-none focus:border-brand-primary" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-dashed border-slate-100">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{currentLang === 'ar' ? 'مبيعات خاضعة لمعدل 19% (دج)' : 'Ventes Taux 19% (DA)'}</label>
                          <input type="text" value={sales19} onChange={(e) => setSales19(e.target.value)} className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono bg-white/40 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{currentLang === 'ar' ? 'مبيعات خاضعة لمعدل 9% (دج)' : 'Ventes Taux 9% (DA)'}</label>
                          <input type="text" value={sales9} onChange={(e) => setSales9(e.target.value)} className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono bg-white/40 focus:outline-none focus:border-brand-primary" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-dashed border-slate-100 items-center">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{currentLang === 'ar' ? 'كتلة أجور الموظفين (IRG)' : 'Masse Salariale Personnel'}</label>
                          <input type="text" value={monthlyStaffPayroll} onChange={(e) => setMonthlyStaffPayroll(e.target.value)} className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono bg-white/40 focus:outline-none focus:border-brand-primary" />
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <input type="checkbox" id="tap_exempt" checked={hasTapExemption} onChange={(e) => setHasTapExemption(e.target.checked)} className="w-4 h-4 border-blue-200 text-brand-primary focus:ring-brand-primary rounded" />
                          <label htmlFor="tap_exempt" className="text-[10px] font-mono font-bold text-slate-500 uppercase cursor-pointer">{currentLang === 'ar' ? 'تفعيل إعفاء الـ TAP (0%)' : 'Exonération TAP (0%)'}</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* واجهة نظيفة معروضة لآخر أداتين */}
                  {(expandedTool === 3 || expandedTool === 4) && (
                    <div className="bg-slate-50/50 border border-dashed border-blue-100 rounded-xl p-8 flex flex-col items-center justify-center text-center text-slate-400 min-h-[160px]">
                      <Info className="w-5 h-5 text-brand-primary/30 mb-2 shrink-0" />
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
                        {currentLang === 'ar' ? 'قريباً جداً' : currentLang === 'fr' ? 'Disponible Bientôt' : 'Coming Soon'}
                      </p>
                      <p className="text-[11px] font-sans text-slate-400 max-w-xs mt-1 leading-normal">
                        {currentLang === 'ar' 
                          ? 'يجري العمل حالياً على تهيئة خوارزميات فحص القوائم والتقارير المالية للشركات والمكلفين.' 
                          : 'Nous finalisons les algorithmes d\'analyse intelligente des états financiers pour cette section.'}
                      </p>
                    </div>
                  )}

                  {/* زر التشغيل يظهر للأدوات الثلاثة الأولى التفاعلية فقط */}
                  {expandedTool < 3 && (
                    <button onClick={() => handleRunSimulation(expandedTool)} disabled={isProcessing} className="w-full py-3 bg-brand-primary hover:bg-brand-dark disabled:bg-slate-800 text-white font-mono font-bold uppercase tracking-widest rounded-lg text-xs cursor-pointer transition flex items-center justify-center gap-1.5">
                      {isProcessing ? (
                        <><RefreshCw className="w-4 h-4 animate-spin text-white" /><span>{t('processingLedgerParams')}</span></>
                      ) : (
                        <><Play className="w-4 h-4 fill-white text-white shrink-0" /><span>{t('executeSimulation')}</span></>
                      )}
                    </button>
                  )}
                </div>

                {/* صندوق النتائج يظهر فقط للأدوات الثلاثة الأولى */}
                {expandedTool < 3 && (
                  <div className="pt-6 border-t border-blue-100 space-y-2.5">
                    <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">{t('simulatedOutput')}</h3>
                    
                    {simulationResult ? (
                      <div className="bg-slate-950 text-emerald-400 font-mono p-4 rounded-xl text-xs overflow-x-auto border border-blue-100 leading-relaxed whitespace-pre-wrap min-h-[160px] text-left" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                        {simulationResult}
                      </div>
                    ) : (
                      <div className="bg-white/20 border border-dashed border-blue-100 rounded-xl p-6 flex flex-col items-center justify-center text-center text-slate-500 min-h-[160px]">
                        <Info className="w-5 h-5 text-brand-primary/30 mb-1 shrink-0" />
                        <p className="text-xs font-sans">{t('provideTransactionInstructions')}</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 text-slate-500 space-y-3 font-mono">
                <span className="text-3xl">💻</span>
                <p className="text-xs leading-relaxed">{t('selectScfTerminalModule')}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};