import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, FileText, Database, ShieldAlert, Cpu,
  ChevronDown, ChevronUp, Play, Info, RefreshCw 
} from 'lucide-react';

// 1. Localized data dictionary for the default interactive sandbox values
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
  // 2. Added 'language' extraction from your context hook
  const { language, t, tObj } = useLanguage(); 
  const currentLang = (language === 'fr' || language === 'ar') ? language : 'en';

  // Selected tool index state
  const [expandedTool, setExpandedTool] = useState<number | null>(0);

  // Simulation outputs
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  // Inputs initialized cleanly using our localized dictionary
  const [rawEntryText, setRawEntryText] = useState(mockInputData.rawEntryText[currentLang]);
  const [selectedMockPdf, setSelectedMockPdf] = useState('invoice_or_0982.pdf');
  const [monthlySales, setMonthlySales] = useState('4,500,000');
  const [monthlyStaffPayroll, setMonthlyStaffPayroll] = useState('1,200,000');
  const [rawBalanceState, setRawBalanceState] = useState(mockInputData.rawBalanceState[currentLang]);
  const [smeForecastText, setSmeForecastText] = useState(mockInputData.smeForecastText[currentLang]);

  // 3. CRITICAL EFFECT: Re-populate fields and clear old simulator run text when language updates
  useEffect(() => {
    setRawEntryText(mockInputData.rawEntryText[currentLang]);
    setRawBalanceState(mockInputData.rawBalanceState[currentLang]);
    setSmeForecastText(mockInputData.smeForecastText[currentLang]);
    setSimulationResult(null); // Clear terminal text so it doesn't stay in the wrong language
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
      title: { ar: "إعداد التصريحات في قوالب جاهزة", fr: "Préparation des Déclarations en Modèles Prêts", en: "Declaration Preparation with Ready-Made Templates" },
      desc: { ar: "توليد التصريحات الجبائية تلقائياً في قوالب جاهزة مطابقة للمتطلبات القانونية الجزائرية.", fr: "Génération automatique des déclarations fiscales et sociales dans des modèles conformes à la réglementation algérienne.", en: "Automatically generates tax and social declarations in ready-to-use templates compliant with Algerian regulations." },
      icon: Database,
      color: "bg-white border-blue-100 text-amber-400"
    },
    {
      id: 3,
      title: { ar: "مسح القوائم المالية واكتشاف الأخطاء", fr: "Analyse des États Financiers et Détection d'Erreurs", en: "Financial Statement Scanning & Error Detection" },
      desc: { ar: "فحص شامل للقوائم المالية والميزانيات واكتشاف الأخطاء والتناقضات الحسابية بشكل تلقائي.", fr: "Vérification complète des états financiers et bilans avec détection automatique des erreurs et incohérences comptables.", en: "Comprehensive scanning of financial statements and balance sheets with automatic detection of errors and accounting inconsistencies." },
      icon: ShieldAlert,
      color: "bg-white border-blue-100 text-rose-400"
    },
    {
      id: 4,
      title: { ar: "تحليل القوائم المالية باستخدام الذكاء الاصطناعي وتقديم الاقتراحات", fr: "Analyse des États Financiers par IA avec Recommandations", en: "AI-Powered Financial Statement Analysis & Suggestions" },
      desc: { ar: "تحليل عميق للقوائم المالية بالذكاء الاصطناعي مع تقديم توصيات واقتراحات استراتيجية لتحسين الأداء المالي.", fr: "Analyse approfondie des états financiers par intelligence artificielle avec recommandations stratégiques pour optimiser la performance financière.", en: "Deep AI-driven analysis of financial statements with strategic recommendations and suggestions to improve financial performance." },
      icon: Cpu,
      color: "bg-white border-blue-100 text-sky-400"
    }
  ];

  const handleRunSimulation = (toolId: number) => {
    setIsProcessing(true);
    setSimulationResult(null);

    setTimeout(() => {
      setIsProcessing(false);
      
      // 4. Localized simulation outputs so the terminal changes languages correctly
      if (toolId === 0) {
        if (currentLang === 'ar') {
          setSimulationResult(`[القيود المحاسبية]
التاريخ: 2026-05-22

حسابات مدينة:
- الصنف 3 (حساب 381 - المشتريات من المواد الأولية واللوازم): 10000 دج
- الصنف 4 (حساب 4456 - الضريبة على القيمة المضافة القابلة للاسترجاع): 1900 دج

حسابات دائنة:
- الصنف 4 (حساب 401 - موردو المخزونات والخدمات): 11900 دج

[البيان]: تسجيل عملية شراء مواد أولية على الحساب .`);
        } else if (currentLang === 'fr') {
          setSimulationResult(`[Ecritures Comptables]
Date: 22-05-2026

Comptes débiteurs :
- Classe 3 (compte 381 - Achats de matières premières et fournitures) : 10 000 DA
- Classe 4 (compte 4456 - Taxe sur la valeur ajoutée récupérable) : 1 900 DA

Comptes créditeurs :
- Classe 4 (compte 401 - Fournisseurs de stocks et de services) : 11 900 DA

[Libellé]: Constatation Achat matières premières.`);
        } else {
          setSimulationResult(`[Accounting Entries]
Date: 2026-05-22

DEBIT LINES:

- Class 3 (Account 381 - Purchases of raw materials and supplies): 10,000 DA
- Class 4 (Account 4456 - Recoverable value-added tax): 1,900 DA

CREDIT LINES:
- Class 4 (Account 401 - Suppliers of Inventory and Services): 45,000 DZD

[Description]: Recognition of Raw Material Purchase.`);        }
      } else if (toolId === 1) {
        if (currentLang === 'ar') {
          setSimulationResult(`[تقرير تشخيص مسح الذكاء الاصطناعي OCR: ${selectedMockPdf}]
- نوع الوثيقة: فاتورة مورد
- اسم المورد: Sarl Mitidja Carton Algerie (المركز: البليدة)
- رقم النيف (NIF) المكتشف: 001209043224190 
- المبلغ الصافي (HT): 500,000 دج
- معدل القيمة المضافة: 19% -> 95,000 دج
- المبلغ الإجمالي (TTC): 595,000 دج
`);
        } else if (currentLang === 'fr') {
          setSimulationResult(`[RAPPORT DIAGNOSTIC SCAN OCR IA: ${selectedMockPdf}]
- Type de Document: Facture de Fournisseur
- Nom du Fournisseur: Sarl Mitidja Carton Algerie (Siège: Blida)
- NIF Détecté: 001209043224190 
- Montant Hors Taxe (HT): 500 000 DZD
- Taux de TVA: 19%  -> 95 000 DZD
- Montant TTC: 595 000 DZD
`);
        } else {
          setSimulationResult(`[AI OCR SCAN DIAGNOSTIC REPORT: ${selectedMockPdf}]
- Document Type: Supplier Expense Invoice
- Vendor Name: Sarl Mitidja Carton Algerie (HQ: Blida)
- Supplier NIF Detected: 001209043224190 
- Base Amount (HT): 500,000 DZD
- VAT rate: 19% -> 95,000 DZD
- Total Amount (TTC): 595,000 DZD
`);
        }
      } else if (toolId === 2) {
        const sales = Number(monthlySales.replace(/,/g, '')) || 4500000;
        const payroll = Number(monthlyStaffPayroll.replace(/,/g, '')) || 1200000;
        const tap = Math.round(sales * 0.015);
        const irgSim = Math.round(payroll * 0.18);
        const totalTaxOutflow = tap + irgSim;

        if (currentLang === 'ar') {
          setSimulationResult(`[معاينة حساب الإقرار الشهري G50]
رقم الأعمال (المبيعات خارج الضريبة): ${sales.toLocaleString()} دج
كتلة أجور الموظفين: ${payroll.toLocaleString()} دج

الرسوم والضرائب المتوقعة (قانون المالية الجزائري):
- رمز الضريبة 101 (TAP - الرسم على النشاط المهني @ 1.5%): ${tap.toLocaleString()} دج
- رمز الضريبة 110 (IRG - الضريبة على الدخل الإجمالي للمرتبات): ${irgSim.toLocaleString()} دج
- حقوق الطابع العيني: 2,500 دج
-----------------------------------------------------------
إجمالي مدفوعات G50 المتوقعة: ${totalTaxOutflow.toLocaleString()} دج`);
        } else if (currentLang === 'fr') {
          setSimulationResult(`[APERCU DU CALCUL DE LA DECLARATION MENSUELLE G50]
Chiffre d'Affaires (Ventes HT): ${sales.toLocaleString()} DZD
Registre des Salaires Personnel: ${payroll.toLocaleString()} DZD

ESTIMATION DES CODES D'IMPOSITION (Loi de Finances Algérie):
- Code Impôt 101 (TAP @ 1.5%): ${tap.toLocaleString()} DZD
- Code Impôt 110 (IRG Salaires avec barème forfaitaire): ${irgSim.toLocaleString()} DZD
- Droit de Timbre: 2 500 DZD
-----------------------------------------------------------
FLUX DE SORTIE G50 PROJETÉ: ${totalTaxOutflow.toLocaleString()} DZD`);
        } else {
          setSimulationResult(`[G50 MONTHLY RETURN CALCULATION PREVIEW]
Turnover Range (Sales HT): ${sales.toLocaleString()} DZD
Staff Salary Register: ${payroll.toLocaleString()} DZD

ESTIMATED FISCAL LEVY CODES:
- Code Impôt 101 (TAP @ 1.5%): ${tap.toLocaleString()} DZD
- Code Impôt 110 (IRG Salaires): ${irgSim.toLocaleString()} DZD
- Stamp Duty: 2,500 DZD
-----------------------------------------------------------
PROJECTED G50 OUTFLOW: ${totalTaxOutflow.toLocaleString()} DZD`);
        }
      } else if (toolId === 3) {
        if (currentLang === 'ar') {
          setSimulationResult(`[موازنة المراجعة المالي SCF - فحص التحقق]
الحالة: تم اكتشاف خلل حرج في التوازن

فشل مطابقة التشخيص:
مجموع المدين: 14,800,000 دج
مجموع الدائن: 14,850,000 دج
الفارق المكتشف: -50,000 دج (رصيد غير متطابق)

إجراء تصحيحي موصى به:
سجل "حساب الانتظار (حساب 47100)" رصيدًا دائنًا معلقًا بقيمة 50,000 دج. تحقق من الإيداعات المصرفية غير المسجلة أو قسائم G50 غير المصفاة لدى الخزينة.`);
        } else if (currentLang === 'fr') {
          setSimulationResult(`[SCAN DE VÉRIFICATION DE LA BALANCE SCF]
Statut: ÉCART CRITIQUE DÉTECTÉ

ÉCHEC DE CORRESPONDANCE DIAGNOSTIC:
Somme Totale Débit: 14 800 000 DZD
Somme Totale Crédit: 14 850 000 DZD
Écart détecté: -50 000 DZD (Balance non équilibrée)

VOUCHER DE CORRECTION RECOMMANDÉ:
Le "Compte d'attente (Compte 47100)" enregistre un solde créditeur de 50 000 DZD. Vérifiez les dépôts bancaires non enregistrés ou les quittances G50 non apurées au Trésor.`);
        } else {
          setSimulationResult(`[SCF TRIAL BALANCE VERIFICATION SCAN]
Status: CRITICAL EXCESS DETECTED

DIAGNOSIS MATCH FAIL:
Total Debit Sum: 14,800,000 DZD
Total Credit Sum: 14,850,000 DZD
Variance detected: -50,000 DZD

CORRECTION VOUCHER RECOMMENDED:
"Suspense Balance Account (Compte 47100)" registered an outstanding credit of 50,000 DZD.`);
        }
      } else if (toolId === 4) {
        if (currentLang === 'ar') {
          setSimulationResult(`[مذكرة عمل استراتيجية مالية بالذكاء الاصطناعي]
التوجيه الأساسي: "${smeForecastText}"

توصيات محلية جزائرية:
1. المزايا الضريبية للمناطق: تستفيد منشآت التحويل الغذائي والزراعي في البليدة من إعفاءات ضريبية ممتدة (IBS/IRG). تحقق من ملفات الإعفاء الخاصة بك.
2. شراء السلع بدون ضريبة (Achats en Franchise): تقدم بطلب للاستفادة من الإعفاء المحتسب للمعدات الصناعية لحماية السيولة النقدية الفورية.
3. تخفيضات اشتراكات الضمان الاجتماعي CNAS: استفد من تدابير الوكالة الوطنية للتشغيل (ANEM) التي تخفض حصة صاحب العمل في اشتراكات CNAS بنسبة تصل إلى 30% للموظفين الجدد.`);
        } else if (currentLang === 'fr') {
          setSimulationResult(`[MEMO STRATÉGIQUE FINANCIER PAR IA]
Directive Principale: "${smeForecastText}"

RECOMMANDATIONS LOCALES:
1. Optimisation Fiscale Agro-alimentaire: Les unités de transformation à Blida bénéficient d'exonérations d'IBS/IRG. Validez vos dossiers d'exemption.
2. Achats en Franchise de TVA: Sollicitez les attestations de dispense de TVA pour l'acquisition de biens d'équipements afin de préserver votre trésorerie immédiate.
3. Allégements CNAS Patronaux: Profitez des abattements ANEM réduisant la quote-part patronale CNAS jusqu'à 30% pour les recrutements de jeunes diplômés.`);
        } else {
          setSimulationResult(`[AI FINANCIAL STRATEGIC ACTION MEMO]
Core Directive: "${smeForecastText}"

LOCAL RECOMMENDATIONS:
1. Agro-Tax Holiday: Processing facilities in Blida benefit from specific IBS/IRG structural tax exemptions. Validate eligibility.
2. VAT Exemption Certificates: Apply for local "Achat en Franchise" certificates for industrial capital machinery to shield cash flow.
3. Payroll CNAS Relief: Apply for national ANEM subsidies that mitigate your employer CNAS tax contributions by up to 30% for local graduate staff.`);
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

        {/* Grid Layout containing tools & live simulator outputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (col-span-5) - The Tool Cards */}
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

          {/* Right Column (col-span-7) - Live Simulation Interactive Control Window */}
          <div className="lg:col-span-7 bg-white border border-blue-100 rounded-2xl p-6 sm:p-8 shadow-classic space-y-6 sticky top-24 text-left rtl:text-right">
            
            {expandedTool !== null ? (
              <>
                {/* Dynamic Action Header depending on tool */}
                <div className="pb-4 border-b border-blue-100 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif font-black text-brand-primary text-sm sm:text-base leading-none">
                      ⚙️ {t('activeSimulator')}: {tObj(toolsList[expandedTool].title)}
                    </h2>
                  </div>
                  <span className="text-[10px] bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-2.5 py-1 rounded font-mono tracking-wider">{t('scfVersionLabel')}</span>
                </div>

                {/* Dynamic input widgets depending on selected tool */}
                <div className="space-y-4 font-sans text-xs">
                  
                  {/* TOOL 0 INPUT */}
                  {expandedTool === 0 && (
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('businessExpNarrative')}</label>
                      <textarea
                        rows={3}
                        value={rawEntryText}
                        onChange={(e) => setRawEntryText(e.target.value)}
                        className="w-full border border-blue-200 p-3 rounded-lg text-xs text-slate-900 bg-white/40 focus:outline-none focus:border-brand-primary "
                      />
                    </div>
                  )}

                  {/* TOOL 1 INPUT */}
                  {expandedTool === 1 && (
                    <div className="space-y-3">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('chooseVoucherScan')}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {['invoice_or_0982.pdf'].map((f) => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setSelectedMockPdf(f)}
                            className={`p-2.5 text-[10px] border rounded-lg font-mono text-center cursor-pointer transition ${selectedMockPdf === f ? 'bg-brand-primary/10 border-brand-primary text-brand-primary font-bold' : 'border-blue-100 hover:bg-slate-50 text-slate-400'}`}
                          >
                            📄 {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TOOL 2 INPUT */}
                  {expandedTool === 2 && (
                    <div className="space-y-3">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('monthlySalesHt')}</label>
                          <input 
                            type="text" 
                            value={monthlySales}
                            onChange={(e) => setMonthlySales(e.target.value)}
                            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono bg-white/40 focus:outline-none focus:border-brand-primary"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('staffPayrollDzd')}</label>
                          <input 
                            type="text" 
                            value={monthlyStaffPayroll}
                            onChange={(e) => setMonthlyStaffPayroll(e.target.value)}
                            className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono bg-white/40 focus:outline-none focus:border-brand-primary"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TOOL 3 INPUT */}
                  {expandedTool === 3 && (
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest text-left">{t('currentTrialBalanceValues')}</label>
                      <input 
                        type="text" 
                        value={rawBalanceState}
                        onChange={(e) => setRawBalanceState(e.target.value)}
                        className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono bg-white/40 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  )}

                  {/* TOOL 4 INPUT */}
                  {expandedTool === 4 && (
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block text-left">{t('smeStrategicImperative')}</label>
                      <input 
                        type="text" 
                        value={smeForecastText}
                        onChange={(e) => setSmeForecastText(e.target.value)}
                        className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 bg-white/40 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  )}

                  {/* Simulator Trigger Button */}
                  <button
                    onClick={() => handleRunSimulation(expandedTool)}
                    disabled={isProcessing}
                    className="w-full py-3 bg-brand-primary hover:bg-brand-dark disabled:bg-slate-800 text-white font-mono font-bold uppercase tracking-widest rounded-lg text-xs cursor-pointer transition flex items-center justify-center gap-1.5"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>{t('processingLedgerParams')}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white text-white shrink-0" />
                        <span>{t('executeSimulation')}</span>
                      </>
                    )}
                  </button>

                </div>

                {/* OUTPUT WINDOW CONTAINER */}
                <div className="pt-6 border-t border-blue-100 space-y-2.5">
                  <h3 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">{t('simulatedOutput')}</h3>
                  
                  {simulationResult ? (
                    <div className="bg-slate-950 text-emerald-400 font-mono p-4 rounded-xl text-xs overflow-x-auto border border-blue-100 leading-relaxed whitespace-pre-wrap min-h-[160px] text-left">
                      {simulationResult}
                    </div>
                  ) : (
                    <div className="bg-white/20 border border-dashed border-blue-100 rounded-xl p-6 flex flex-col items-center justify-center text-center text-slate-500 min-h-[160px]">
                      <Info className="w-5 h-5 text-brand-primary/30 mb-1 shrink-0" />
                      <p className="text-xs font-sans">{t('provideTransactionInstructions')}</p>
                    </div>
                  )}
                </div>
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