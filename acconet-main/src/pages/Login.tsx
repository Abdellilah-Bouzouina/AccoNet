import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { 
  Lock, Mail, ArrowLeft, ArrowRight, ShieldCheck, 
  Building2, UserCheck, Eye, EyeOff, KeyRound
} from 'lucide-react';
import { clients, professionals } from '../data/mockData';

export const Login: React.FC = () => {
  const { t, direction } = useLanguage();
  const { setUserRole, setCurrentClient, setCurrentProfessional, triggerNotification } = useApp();
  const navigate = useNavigate();

  // Standard credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleStandardLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const lowerEmail = email.toLowerCase().trim();

    if (lowerEmail === 'admin@acconet.dz') {
      setUserRole('admin');
      triggerNotification(
        "Authority Portal Activated",
        "Successfully logged in as National Regulatory Officer (DGI)."
      );
      navigate('/dashboard/admin');
    } else if (lowerEmail === 'accountant@acconet.dz') {
      setUserRole('professional');
      setCurrentProfessional(professionals[0]); // Sofiane Benamara
      triggerNotification(
        "تم التحقق من الدخول",
        "Logged in as Certified Accountant: Me. Sofiane Benamara."
      );
      navigate('/dashboard/professional');
    } else if (lowerEmail === 'client@acconet.dz') {
      setUserRole('client');
      setCurrentClient(clients[0]); // Dzair Tech Link Sarl
      triggerNotification(
        "SME Workspace Secured",
        "Logged in as Business Client: Dzair Tech Link Sarl."
      );
      navigate('/dashboard/client');
    } else {
      // Direct pass for flexibility with test emails
      setUserRole('client');
      setCurrentClient(clients[0]);
      triggerNotification(
        "Assigned to SME Client Workspace",
        `Welcome ${email}. You are logged in with the default SME Profile.`
      );
      navigate('/dashboard/client');
    }
  };

  const handleSimulateClientLogin = () => {
    setEmail('client@acconet.dz');
    setPassword('password123');
    setUserRole('client');
    setCurrentClient(clients[0]);
    triggerNotification(
      t('authSuccessHeading'),
      "Logged in as Client: Dzair Tech Link Sarl (Algiers)"
    );
    navigate('/dashboard/client');
  };

  const handleSimulateProLogin = () => {
    setEmail('accountant@acconet.dz');
    setPassword('password123');
    setUserRole('professional');
    setCurrentProfessional(professionals[0]);
    triggerNotification(
      t('authSuccessHeading'),
      "Logged in as Professional: Me. Sofiane Benamara (Certified Accountant)"
    );
    navigate('/dashboard/professional');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-stretch" id="login_viewport_split">
      
      {/* LEFT SIDEBAR PANEL: POLISHED BRAND BACKGROUND */}
<div className="hidden lg:flex lg:w-1/2 bg-brand-primary text-white p-16 flex-col justify-between relative overflow-hidden border-r border-blue-500/30">
  
  {/* Architectural background lines */}
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
  </div>

  <div className="space-y-1 relative z-10 text-left">
    <Link to="/" className="flex items-center space-x-2.5 rtl:space-x-reverse">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary font-bold text-lg border border-brand-primary/20">
        أ
      </span>
      <span className="text-xl font-serif font-semibold tracking-tight text-slate-900">
        AccoNet <span className="text-brand-primary">أكونيت</span>
      </span>
    </Link>
    <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-2">{t('nationalGateway')}</p>
  </div>

  {/* Removed the sub-headline paragraph tag from this container */}
  <div className="space-y-4 relative z-10 text-left">
    <h2 className="text-3xl font-serif font-bold leading-tight">
      {t('loginHeroTitle')}
    </h2>
  </div>

  <div className="text-xs text-slate-500 flex items-center gap-2 relative z-10 font-mono">
    <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0" />
    <span>{t('onccRegistered')}</span>
  </div>

</div>

      {/* RIGHT PANEL: MAIN FORM & QUICK LOGINS */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 border-l border-blue-100">
        
        <div className="max-w-md w-full mx-auto space-y-8 text-left rtl:text-right">
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              {t('loginTitle')}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{t('secureTerminalAccess')}</p>
          </div>

          <form onSubmit={handleStandardLoginSubmit} className="space-y-4">
            
            {/* Email input field */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{t('fieldEmail')}</label>
              <div className="relative border border-blue-200 rounded-lg bg-blue-50 px-4 py-3 flex items-center gap-2.5 focus-within:border-brand-primary transition">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <input 
                  type="email" 
                  required
                  placeholder="name@business.dz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm text-slate-700 bg-transparent focus:outline-none placeholder-slate-400 font-sans"
                  id="login_email_input"
                />
              </div>
            </div>

            {/* Password Input field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[9px]">
                <label className="font-mono font-bold text-slate-400 uppercase tracking-widest">{t('fieldPassword')}</label>
                <span className="text-brand-primary font-bold hover:underline cursor-pointer uppercase font-mono tracking-widest">{t('forgotPassword')}</span>
              </div>
              <div className="relative border border-blue-200 rounded-lg bg-blue-50 px-4 py-3 flex items-center gap-2.5 focus-within:border-brand-primary transition">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input 
                  type={showPass ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm text-slate-700 bg-transparent focus:outline-none placeholder-slate-400 font-mono"
                  id="login_password_input"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="p-0.5 text-slate-400 hover:text-brand-primary cursor-pointer"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-brand-primary hover:bg-brand-dark hover:scale-[1.01] text-slate-900 text-[10px] font-mono font-bold uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-1 rounded-lg"
              id="login_submit_btn"
            >
              <span>{t('loginLink').toUpperCase()}</span>
              {direction === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

          </form>

          {/* REGISTER LINK */}
          <p className="text-xs text-slate-400 text-center font-sans">
            {t('dontHaveAccount')}{' '}
            <Link to="/register" className="text-brand-primary font-bold hover:underline" id="login_to_register_link">
              {t('registerLink')}
            </Link>
          </p>

          {/* SIMULATED RAPID DEMONSTRATION LOGINS */}
          <div className="pt-6 border-t border-blue-100 space-y-3">
            <h3 className="text-center font-bold text-slate-400 text-[9px] font-mono uppercase tracking-widest flex items-center justify-center gap-1.5">
              <KeyRound className="w-4 h-4 text-brand-primary" />
              {t('simulationTerminals')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              <button
                type="button"
                onClick={handleSimulateClientLogin}
                className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg hover:border-brand-primary text-left rtl:text-right cursor-pointer transition flex flex-col justify-between h-24 hover:border-brand-primary/30"
                id="login_demo_client_btn"
                title="Email: client@acconet.dz | Pass: password123"
              >
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-primary shrink-0" />
                  <p className="text-[10px] font-bold text-slate-900 font-serif leading-none">{t('clientBusinessLabel')}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-mono truncate">client@acconet.dz</p>
                  <p className="text-[8px] text-slate-500 font-mono">Pass: password123</p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleSimulateProLogin}
                className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg hover:border-brand-primary text-left rtl:text-right cursor-pointer transition flex flex-col justify-between h-24 hover:border-brand-primary/30"
                id="login_demo_pro_btn"
                title="Email: accountant@acconet.dz | Pass: password123"
              >
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <p className="text-[10px] font-bold text-slate-900 font-serif leading-none">{t('accountantProLabel')}</p>
                </div>
                <div>
                  <p className="text-[9px] text-indigo-400 font-mono truncate">accountant@acconet.dz</p>
                  <p className="text-[8px] text-slate-500 font-mono">Pass: password123</p>
                </div>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};