import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { algerianWilayas } from '../data/algerianWilayas';
import { supabase } from '../lib/supabaseClient';
import {
  Building2, UserCheck, Mail, Lock, MapPin, ArrowRight,
  UserPlus, Loader2, AlertCircle, BadgeCheck, Phone
} from 'lucide-react';

type RegRole = 'business' | 'accountant';

export const Register: React.FC = () => {
  const { direction, language } = useLanguage();
  const { triggerNotification } = useApp();
  const navigate = useNavigate();

  const [regRole, setRegRole] = useState<RegRole>('business');

  // Shared fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [wilayaId, setWilayaId] = useState(16);

  // Accountant-only fields
  const [specialty, setSpecialty] = useState('certified-accountant');
  const [accreditationNumber, setAccreditationNumber] = useState('');
  const [yearsExperience, setYearsExperience] = useState(5);

  // Business-only fields
  const [companyName, setCompanyName] = useState('');
  const [rcNumber, setRcNumber] = useState('');
  const [nifNumber, setNifNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const tx = (ar: string, fr: string, en: string) =>
    language === 'ar' ? ar : language === 'en' ? en : fr;

  const validate = (): string | null => {
    if (!fullName.trim()) return tx('يرجى إدخال الاسم الكامل.', 'Veuillez renseigner votre nom complet.', 'Please enter your full name.');
    if (!email.includes('@')) return tx('يرجى إدخال بريد إلكتروني صالح.', 'Veuillez saisir un e-mail valide.', 'Please enter a valid email.');
    if (password.length < 8) return tx('كلمة المرور يجب ألا تقل عن 8 رموز.', 'Le mot de passe doit comporter au moins 8 caractères.', 'Password must be at least 8 characters.');
    if (password !== confirmPassword) return tx('كلمتا المرور غير متطابقتين.', 'Les mots de passe ne correspondent pas.', 'Passwords do not match.');
    if (regRole === 'business' && (!companyName || !rcNumber || !nifNumber)) {
      return tx('يرجى إدخال معلومات المؤسسة كاملة.', "Veuillez renseigner les informations de l'entreprise.", 'Please fill in your company details.');
    }
    if (regRole === 'accountant' && !accreditationNumber) {
      return tx('رقم الاعتماد إلزامي.', "Le numéro d'agrément est requis.", 'Accreditation number is required.');
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    // Everything passed as "metadata" here gets picked up automatically
    // by the database trigger (see supabase_setup.sql) and copied into
    // a new row in the "profiles" table.
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          role: regRole,
          full_name: fullName,
          phone,
          wilaya_id: wilayaId,
          specialty: regRole === 'accountant' ? specialty : null,
          accreditation_number: regRole === 'accountant' ? accreditationNumber : null,
          years_experience: regRole === 'accountant' ? yearsExperience : null,
          company_name: regRole === 'business' ? companyName : null,
          rc_number: regRole === 'business' ? rcNumber : null,
          nif_number: regRole === 'business' ? nifNumber : null,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || tx('حدث خطأ أثناء إنشاء الحساب.', "Une erreur est survenue lors de l'inscription.", 'An error occurred while creating your account.'));
      return;
    }

    if (!data.user) {
      setErrorMsg(tx('تعذر إكمال التسجيل. حاول مرة أخرى.', "L'inscription n'a pas pu être finalisée. Réessayez.", 'Registration could not be completed. Please try again.'));
      return;
    }

    setSuccess(true);

    triggerNotification(
      tx('تم إنشاء الحساب بنجاح', 'Compte créé avec succès', 'Account created successfully'),
      regRole === 'accountant'
        ? tx(`مرحباً ${fullName}، تم إنشاء ملفك المهني.`, `Bienvenue ${fullName}, votre dossier professionnel a été créé.`, `Welcome ${fullName}, your professional file has been created.`)
        : tx(`مرحباً ${companyName}، تم إنشاء مساحة عملك.`, `Bienvenue ${companyName}, votre espace entreprise a été créé.`, `Welcome ${companyName}, your business workspace has been created.`)
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center px-4 py-12 bg-white" dir={direction}>
      <div className="max-w-lg w-full space-y-8">

        <Link to="/" className="flex items-center justify-center gap-2.5 mb-4">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary font-bold text-lg border border-blue-200">
            أ
          </span>
          <span className="text-xl font-serif font-semibold tracking-tight text-slate-900">
            AccoNet <span className="text-brand-primary">أكونيت</span>
          </span>
        </Link>

        {success ? (
          <div className="bg-white border border-blue-200 p-8 sm:p-10 text-center space-y-6 rounded-2xl shadow-classic">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto rounded-full">
              <BadgeCheck className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">
                {tx('تم إنشاء حسابك!', 'Votre compte a été créé !', 'Your account has been created!')}
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                {tx(
                  'إذا كان تأكيد البريد الإلكتروني مفعّلاً في إعدادات Supabase، يرجى مراجعة بريدك الإلكتروني والنقر على رابط التأكيد قبل تسجيل الدخول.',
                  "Si la confirmation par e-mail est activée dans vos réglages Supabase, vérifiez votre boîte de réception et cliquez sur le lien de confirmation avant de vous connecter.",
                  'If email confirmation is enabled in your Supabase settings, please check your inbox and click the confirmation link before logging in.'
                )}
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-brand-primary text-white rounded-xl text-sm font-bold hover:bg-brand-dark transition"
            >
              {tx('الذهاب لتسجيل الدخول', 'Aller à la connexion', 'Go to Login')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-classic space-y-6">

            <div className="text-center space-y-1">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5 text-brand-primary" />
                {tx('إنشاء حساب جديد', 'Créer votre compte', 'Create your account')}
              </h1>
            </div>

            {/* Role toggle */}
            <div className="flex gap-2 p-1 bg-blue-50 border border-blue-200 rounded-xl">
              <button
                type="button"
                onClick={() => setRegRole('business')}
                className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition ${
                  regRole === 'business' ? 'bg-white text-brand-primary shadow-sm border border-blue-200' : 'text-slate-400'
                }`}
              >
                <Building2 className="w-4 h-4" />
                {tx('مؤسسة', 'Entreprise', 'Business')}
              </button>
              <button
                type="button"
                onClick={() => setRegRole('accountant')}
                className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition ${
                  regRole === 'accountant' ? 'bg-white text-indigo-700 shadow-sm border border-blue-200' : 'text-slate-400'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                {tx('محاسب', 'Comptable', 'Accountant')}
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  {regRole === 'accountant'
                    ? tx('الاسم الكامل', 'Nom complet', 'Full name')
                    : tx('اسم المسؤول القانوني', 'Nom du responsable légal', 'Legal manager full name')}
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {tx('البريد الإلكتروني', 'E-mail', 'Email')}<span className="text-red-500"> *</span>
                  </label>
                  <div className="flex items-center gap-2 border border-blue-200 rounded-lg px-3 py-2.5 bg-white focus-within:border-brand-primary">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {tx('رقم الهاتف', 'Téléphone', 'Phone')}
                  </label>
                  <div className="flex items-center gap-2 border border-blue-200 rounded-lg px-3 py-2.5 bg-white focus-within:border-brand-primary">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+213 5XX XX XX XX"
                      className="w-full text-sm text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {tx('كلمة المرور', 'Mot de passe', 'Password')}<span className="text-red-500"> *</span>
                  </label>
                  <div className="flex items-center gap-2 border border-blue-200 rounded-lg px-3 py-2.5 bg-white focus-within:border-brand-primary">
                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {tx('تأكيد كلمة المرور', 'Confirmer', 'Confirm password')}<span className="text-red-500"> *</span>
                  </label>
                  <div className="flex items-center gap-2 border border-blue-200 rounded-lg px-3 py-2.5 bg-white focus-within:border-brand-primary">
                    <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full text-sm text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  {tx('الولاية', 'Wilaya', 'Wilaya')}
                </label>
                <div className="flex items-center gap-2 border border-blue-200 rounded-lg px-3 py-2.5 bg-white focus-within:border-brand-primary">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={wilayaId}
                    onChange={(e) => setWilayaId(Number(e.target.value))}
                    className="w-full text-sm text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                  >
                    {algerianWilayas.map((w) => (
                      <option key={w.id} value={w.id}>{w.code} — {w.name.fr} ({w.name.ar})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Accountant-only fields */}
              {regRole === 'accountant' && (
                <div className="space-y-4 pt-2 border-t border-dashed border-blue-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {tx('التخصص', 'Spécialité', 'Specialty')}
                      </label>
                      <select
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-600 cursor-pointer"
                      >
                        <option value="certified-accountant">Expert-Comptable (ONEC)</option>
                        <option value="statutory-auditor">Commissaire aux Comptes (ONCC)</option>
                        <option value="chartered-accountant">Comptable Agréé (ONCA)</option>
                        <option value="tax-consultant">Conseiller Fiscal</option>
                        <option value="judicial-expert">Expert Judiciaire</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {tx("رقم الاعتماد", "N° d'agrément", 'Accreditation N°')}<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        value={accreditationNumber}
                        onChange={(e) => setAccreditationNumber(e.target.value)}
                        placeholder="ex: EC-16-0042"
                        className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-600 font-mono uppercase"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      <span>{tx('سنوات الخبرة', "Années d'expérience", 'Years of experience')}</span>
                      <span className="text-indigo-700">{yearsExperience}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={40}
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(Number(e.target.value))}
                      className="w-full accent-indigo-700 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Business-only fields */}
              {regRole === 'business' && (
                <div className="space-y-4 pt-2 border-t border-dashed border-blue-100">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      {tx('اسم الشركة', "Nom de l'entreprise", 'Company name')}<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {tx('رقم السجل التجاري', 'N° Registre de Commerce', 'Commercial Registry N°')}<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        value={rcNumber}
                        onChange={(e) => setRcNumber(e.target.value)}
                        placeholder="16/00-0142578-B26"
                        className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm font-mono text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        {tx('رقم التعريف الجبائي', 'N° NIF', 'Tax ID (NIF)')}<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        maxLength={15}
                        value={nifNumber}
                        onChange={(e) => setNifNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm font-mono text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-primary hover:bg-brand-dark disabled:opacity-60 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span>{tx('إنشاء الحساب', 'Créer mon compte', 'Create my account')}</span>
                )}
              </button>

            </form>

            <p className="text-xs text-slate-400 text-center">
              {tx('لديك حساب بالفعل؟', 'Déjà inscrit ?', 'Already have an account?')}{' '}
              <Link to="/login" className="text-brand-primary font-bold hover:underline">
                {tx('تسجيل الدخول', 'Connexion', 'Log in')}
              </Link>
            </p>

          </div>
        )}
      </div>
    </div>
  );
};
