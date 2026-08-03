import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { algerianWilayas } from '../data/algerianWilayas';
import { specialtiesTranslations } from '../i18n/translations';
import {
  Save, Loader2, AlertCircle, CheckCircle2, User, Phone, MapPin,
  Building2, UserCheck
} from 'lucide-react';

export const AccountSettings: React.FC = () => {
  const { language, direction } = useLanguage();
  const {
    userRole, currentClient, currentProfessional,
    setCurrentClient, setCurrentProfessional,
    triggerNotification, authChecked
  } = useApp();
  const navigate = useNavigate();

  const tx = (ar: string, fr: string, en: string) =>
    language === 'ar' ? ar : language === 'en' ? en : fr;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [wilayaId, setWilayaId] = useState(16);

  // Accountant-only
  const [specialty, setSpecialty] = useState('certified-accountant');
  const [accreditationNumber, setAccreditationNumber] = useState('');
  const [yearsExperience, setYearsExperience] = useState(5);

  // Business-only
  const [companyName, setCompanyName] = useState('');
  const [rcNumber, setRcNumber] = useState('');
  const [nifNumber, setNifNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Redirect visitors who aren't logged in.
  useEffect(() => {
    if (authChecked && userRole === 'guest') {
      navigate('/login');
    }
  }, [authChecked, userRole, navigate]);

  // Pre-fill the form with whatever we already know.
  useEffect(() => {
    if (userRole === 'professional' && currentProfessional) {
      setFullName(currentProfessional.name.fr || currentProfessional.name.ar);
      setPhone(currentProfessional.phone || '');
      setAddress(currentProfessional.address?.fr || currentProfessional.address?.ar || '');
      setWilayaId(currentProfessional.wilayaId);
      setSpecialty(currentProfessional.specialty);
      setAccreditationNumber(currentProfessional.accreditationNumber);
      setYearsExperience(currentProfessional.yearsExperience);
    } else if (userRole === 'client' && currentClient) {
      setFullName(currentClient.companyName);
      setWilayaId(currentClient.wilayaId);
      setCompanyName(currentClient.companyName);
      setRcNumber(currentClient.RC);
      setNifNumber(currentClient.NIF);
    }
  }, [userRole, currentProfessional, currentClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSaved(false);

    if (!fullName.trim()) {
      setErrorMsg(tx('يرجى إدخال الاسم الكامل.', 'Veuillez renseigner votre nom complet.', 'Please enter your full name.'));
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setErrorMsg(tx('انتهت الجلسة. يرجى تسجيل الدخول مجدداً.', 'Session expirée. Veuillez vous reconnecter.', 'Session expired. Please log in again.'));
      return;
    }

    const updatePayload: Record<string, unknown> = {
      full_name: fullName,
      phone,
      wilaya_id: wilayaId,
    };

    if (userRole === 'professional') {
      updatePayload.specialty = specialty;
      updatePayload.accreditation_number = accreditationNumber;
      updatePayload.years_experience = yearsExperience;
      updatePayload.address = address;
    } else if (userRole === 'client') {
      updatePayload.company_name = companyName;
      updatePayload.rc_number = rcNumber;
      updatePayload.nif_number = nifNumber;
    }

    const { data: updatedRow, error } = await supabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', user.id)
      .select()
      .single();

    setLoading(false);

    if (error || !updatedRow) {
      setErrorMsg(error?.message || tx('تعذر حفظ التغييرات.', "Impossible d'enregistrer les modifications.", 'Could not save your changes.'));
      return;
    }

    // Reflect the change immediately across the app (Navbar name, etc.)
    if (userRole === 'professional' && currentProfessional) {
      setCurrentProfessional({
        ...currentProfessional,
        name: { ar: fullName, fr: fullName, en: fullName },
        phone,
        address: address ? { ar: address, fr: address, en: address } : currentProfessional.address,
        wilayaId,
        specialty: specialty as typeof currentProfessional.specialty,
        accreditationNumber,
        yearsExperience,
      });
    } else if (userRole === 'client' && currentClient) {
      setCurrentClient({
        ...currentClient,
        companyName,
        wilayaId,
        NIF: nifNumber,
        RC: rcNumber,
      });
    }

    setSaved(true);
    triggerNotification(
      tx('تم الحفظ', 'Enregistré', 'Saved'),
      tx('تم تحديث معلومات حسابك بنجاح.', 'Vos informations ont été mises à jour avec succès.', 'Your account information was updated successfully.')
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFF] py-12 px-4" dir={direction}>
      <div className="max-w-2xl mx-auto space-y-6">

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-brand-primary" />
            {tx('إعدادات الحساب', 'Paramètres du compte', 'Account Settings')}
          </h1>
          <p className="text-base text-slate-700">
            {tx('عدّل معلوماتك الشخصية أدناه.', 'Modifiez vos informations personnelles ci-dessous.', 'Update your personal information below.')}
          </p>
        </div>

        <div className="bg-white border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-classic space-y-6">

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {saved && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{tx('تم حفظ التغييرات.', 'Modifications enregistrées.', 'Changes saved.')}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
                {tx('الاسم الكامل', 'Nom complet', 'Full name')}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-base text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
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
                    className="w-full text-base text-slate-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
                  {tx('الولاية', 'Wilaya', 'Wilaya')}
                </label>
                <div className="flex items-center gap-2 border border-blue-200 rounded-lg px-3 py-2.5 bg-white focus-within:border-brand-primary">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={wilayaId}
                    onChange={(e) => setWilayaId(Number(e.target.value))}
                    className="w-full text-base text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                  >
                    {algerianWilayas.map((w) => (
                      <option key={w.id} value={w.id}>{w.code} — {w.name.fr} ({w.name.ar})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {userRole === 'professional' && (
              <div className="space-y-4 pt-4 border-t border-dashed border-blue-100">
                <h3 className="text-sm font-bold uppercase font-mono tracking-widest text-indigo-700 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  {tx('معلومات الاعتماد المهني', 'Informations professionnelles', 'Professional credentials')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
                      {tx('التخصص', 'Spécialité', 'Specialty')}
                    </label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-base text-slate-900 bg-white focus:outline-none focus:border-indigo-600 cursor-pointer"
                    >
                      {(Object.keys(specialtiesTranslations) as (keyof typeof specialtiesTranslations)[]).map((key) => (
                        <option key={key} value={key}>{specialtiesTranslations[key][language]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
                      {tx("رقم الاعتماد", "N° d'agrément", 'Accreditation N°')}
                    </label>
                    <input
                      type="text"
                      value={accreditationNumber}
                      onChange={(e) => setAccreditationNumber(e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-base text-slate-900 bg-white focus:outline-none focus:border-indigo-600 font-mono uppercase"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
                    <span>{tx('سنوات الخبرة', "Années d'expérience", 'Years of experience')}</span>
                    <span className="text-indigo-700">{yearsExperience}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(Number(e.target.value))}
                    className="w-full accent-indigo-700 cursor-pointer"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
                    {tx('عنوان المكتب', 'Adresse du cabinet', 'Office address')}
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-base text-slate-900 bg-white focus:outline-none focus:border-indigo-600"
                  />
                  <p className="text-xs text-slate-600">
                    {tx('هذا العنوان يظهر للزوار في بطاقتك ضمن نتائج البحث.', 'Cette adresse apparaît aux visiteurs sur votre carte dans les résultats de recherche.', 'This address is visible to visitors on your card in search results.')}
                  </p>
                </div>
              </div>
            )}

            {userRole === 'client' && (
              <div className="space-y-4 pt-4 border-t border-dashed border-blue-100">
                <h3 className="text-sm font-bold uppercase font-mono tracking-widest text-brand-primary flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {tx('معلومات المؤسسة', "Informations de l'entreprise", 'Company information')}
                </h3>
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
                    {tx('اسم الشركة', "Nom de l'entreprise", 'Company name')}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-base text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
                      {tx('رقم السجل التجاري', 'N° Registre de Commerce', 'Commercial Registry N°')}
                    </label>
                    <input
                      type="text"
                      value={rcNumber}
                      onChange={(e) => setRcNumber(e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-base font-mono text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-widest">
                      {tx('رقم التعريف الجبائي', 'N° NIF', 'Tax ID (NIF)')}
                    </label>
                    <input
                      type="text"
                      maxLength={15}
                      value={nifNumber}
                      onChange={(e) => setNifNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-base font-mono text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-primary hover:bg-brand-dark disabled:opacity-60 text-white font-bold text-base rounded-xl transition flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{tx('حفظ التغييرات', 'Enregistrer les modifications', 'Save changes')}</span>
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};
