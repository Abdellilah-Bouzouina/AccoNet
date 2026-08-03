import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { mapToProfessional, mapToClient } from '../lib/profileMappers';
import {
  Lock, Mail, ArrowLeft, ArrowRight, ShieldCheck,
  Eye, EyeOff, Loader2, AlertCircle
} from 'lucide-react';

export const Login: React.FC = () => {
  const { t, direction } = useLanguage();
  const { setUserRole, setCurrentClient, setCurrentProfessional, triggerNotification } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStandardLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!email || !password) return;

    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError || !authData.user) {
      setLoading(false);
      setErrorMsg(
        authError?.message?.includes('Invalid login credentials')
          ? (direction === 'rtl'
              ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
              : 'Email ou mot de passe incorrect.')
          : authError?.message || 'Une erreur est survenue lors de la connexion.'
      );
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    setLoading(false);

    if (profileError || !profile) {
      console.error('Profile load error:', profileError);
      setErrorMsg(
        direction === 'rtl'
          ? 'تعذر تحميل ملفك الشخصي. يرجى التواصل مع الدعم.'
          : "Impossible de charger votre profil. Contactez le support."
      );
      return;
    }

    if (profile.role === 'admin') {
      setUserRole('admin');
      triggerNotification(
        'Authority Portal Activated',
        'Successfully logged in as National Regulatory Officer.'
      );
      navigate('/dashboard/admin');
    } else if (profile.role === 'accountant') {
      const { data: ownServices } = await supabase
        .from('services')
        .select('*')
        .eq('professional_id', profile.id);
      setUserRole('professional');
      setCurrentProfessional(mapToProfessional(profile, ownServices || []));
      triggerNotification('تم التحقق من الدخول', `Logged in as: ${profile.full_name}`);
      navigate('/dashboard/professional');
    } else {
      setUserRole('client');
      setCurrentClient(mapToClient(profile));
      triggerNotification('SME Workspace Secured', `Welcome ${profile.company_name || profile.full_name}.`);
      navigate('/dashboard/client');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-stretch" id="login_viewport_split">

      <div className="hidden lg:flex lg:w-1/2 bg-brand-primary text-white p-16 flex-col justify-between relative overflow-hidden border-r border-blue-500/30">
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

      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 border-l border-blue-100">

        <div className="max-w-md w-full mx-auto space-y-8 text-left rtl:text-right">

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
              {t('loginTitle')}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{t('secureTerminalAccess')}</p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleStandardLoginSubmit} className="space-y-4">

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

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[9px]">
                <label className="font-mono font-bold text-slate-400 uppercase tracking-widest">{t('fieldPassword')}</label>
                <span className="text-brand-primary font-bold hover:underline cursor-pointer uppercase font-mono tracking-widest">{t('forgotPassword')}</span>
              </div>
              <div className="relative border border-blue-200 rounded-lg bg-blue-50 px-4 py-3 flex items-center gap-2.5 focus-within:border-brand-primary transition">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPass ? 'text' : 'password'}
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-primary hover:bg-brand-dark disabled:opacity-60 hover:scale-[1.01] text-slate-900 text-[10px] font-mono font-bold uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-1 rounded-lg"
              id="login_submit_btn"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{t('loginLink').toUpperCase()}</span>
                  {direction === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>

          </form>

          <p className="text-xs text-slate-400 text-center font-sans">
            {t('dontHaveAccount')}{' '}
            <Link to="/register" className="text-brand-primary font-bold hover:underline" id="login_to_register_link">
              {t('registerLink')}
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};
