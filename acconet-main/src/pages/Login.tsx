import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { mapToProfessional, mapToClient } from '../lib/profileMappers';
import { AuthSidePanel } from '../components/AuthSidePanel';
import {
  Lock, Mail, ArrowLeft, ArrowRight,
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden" id="login_viewport_split">

      {/* Decorative shapes bleeding past the card's corners */}
      <div
        className="hidden lg:block absolute -top-10 -end-10 w-40 h-40 bg-brand-primary/10 rotate-12"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)' }}
      />
      <div className="hidden lg:block absolute -bottom-16 -start-16 w-52 h-52 bg-brand-light rounded-full" />

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-glow overflow-hidden grid lg:grid-cols-2">

        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-12">
          <div className="max-w-sm w-full mx-auto space-y-7 text-left rtl:text-right">

            <Link to="/" className="flex items-center gap-2.5 justify-center lg:justify-start">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary font-bold text-lg border border-brand-primary/20">
                أ
              </span>
              <span className="text-lg font-serif font-semibold tracking-tight text-slate-900">
                AccoNet <span className="text-brand-primary">أكونيت</span>
              </span>
            </Link>

            <div className="space-y-1 text-center lg:text-left rtl:lg:text-right">
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
                <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest px-1">{t('fieldEmail')}</label>
                <div className="relative bg-slate-100 rounded-full px-5 py-3 flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-brand-primary/30 transition">
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
                <div className="flex justify-between items-center text-[9px] px-1">
                  <label className="font-mono font-bold text-slate-400 uppercase tracking-widest">{t('fieldPassword')}</label>
                  <span className="text-brand-primary font-bold hover:underline cursor-pointer uppercase font-mono tracking-widest">{t('forgotPassword')}</span>
                </div>
                <div className="relative bg-slate-100 rounded-full px-5 py-3 flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-brand-primary/30 transition">
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
                className="w-full py-3 bg-brand-primary hover:bg-brand-dark disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-1.5 rounded-full"
                id="login_submit_btn"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>{t('loginLink')}</span>
                    {direction === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>

            </form>

            <p className="text-xs text-slate-400 text-center font-sans lg:hidden">
              {t('dontHaveAccount')}{' '}
              <Link to="/register" className="text-brand-primary font-bold hover:underline" id="login_to_register_link">
                {t('registerLink')}
              </Link>
            </p>

          </div>
        </div>

        <AuthSidePanel
          title={t('authWelcomeBackTitle')}
          subtitle={t('authWelcomeBackSubtitle')}
          ctaLabel={t('registerLink')}
          ctaTo="/register"
        />

      </div>

    </div>
  );
};
