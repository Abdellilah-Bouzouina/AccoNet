import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { mapToProfessional } from '../lib/profileMappers';
import {
  Save, Loader2, AlertCircle, CheckCircle2, UserCog,
  Plus, Trash2, Briefcase, Camera, GraduationCap
} from 'lucide-react';

interface ServiceRow {
  key: string; // local-only key for React list rendering
  title: string;
  description: string;
  price: string;
}

interface HistoryRow {
  key: string; // local-only key for React list rendering
  year: string;
  title: string;
  description: string;
}

export const ProfessionalProfileEdit: React.FC = () => {
  const { language, direction } = useLanguage();
  const {
    userRole, currentProfessional, setCurrentProfessional,
    triggerNotification, authChecked, refreshProfessionals
  } = useApp();
  const navigate = useNavigate();

  const tx = (ar: string, fr: string, en: string) =>
    language === 'ar' ? ar : language === 'en' ? en : fr;

  const [bio, setBio] = useState('');
  const [available, setAvailable] = useState(true);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [history, setHistory] = useState<HistoryRow[]>([]);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Only accountants can access this page.
  useEffect(() => {
    if (authChecked && userRole !== 'professional') {
      navigate('/');
    }
  }, [authChecked, userRole, navigate]);

  // Pre-fill from what's already known. Unlike services, history is a
  // plain jsonb column on the profile row itself (not a separate table),
  // so it's always present here — no separate re-fetch needed.
  useEffect(() => {
    if (currentProfessional) {
      setBio(currentProfessional.bio.fr || currentProfessional.bio.ar || '');
      setAvailable(currentProfessional.available);
      setAvatarPreview(currentProfessional.avatarUrl || null);
      setHistory(
        currentProfessional.history.map((h, i) => ({
          key: `existing-${i}`,
          year: h.year,
          title: h.title.fr || h.title.ar || '',
          description: h.description.fr || h.description.ar || '',
        }))
      );
    }
  }, [currentProfessional]);

  // Services are always re-fetched straight from Supabase rather than
  // trusted from currentProfessional.services: some flows (e.g. right
  // after login) don't include services on that object, and since Save
  // below deletes+reinserts the full list, prefilling from a stale/empty
  // list would silently wipe real data on the next save.
  useEffect(() => {
    if (!currentProfessional) return;
    let cancelled = false;

    supabase
      .from('services')
      .select('*')
      .eq('professional_id', currentProfessional.id)
      .then(({ data }) => {
        if (cancelled) return;
        setServices(
          (data || []).map((s, i) => ({
            key: `existing-${i}`,
            title: s.title || '',
            description: s.description || '',
            price: s.price || '',
          }))
        );
      });

    return () => { cancelled = true; };
  }, [currentProfessional?.id]);

  // Revoke the local object URL when it's replaced or the page unmounts.
  useEffect(() => {
    return () => {
      if (avatarPreview?.startsWith('blob:')) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg(tx('يرجى اختيار ملف صورة صالح.', 'Veuillez choisir un fichier image valide.', 'Please choose a valid image file.'));
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setErrorMsg(tx('حجم الصورة يجب ألا يتجاوز 3 ميغابايت.', "L'image ne doit pas dépasser 3 Mo.", 'Image must be under 3MB.'));
      return;
    }

    setErrorMsg(null);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const addServiceRow = () => {
    setServices((prev) => [...prev, { key: `new-${Date.now()}`, title: '', description: '', price: '' }]);
  };

  const updateServiceRow = (key: string, field: keyof ServiceRow, value: string) => {
    setServices((prev) => prev.map((s) => (s.key === key ? { ...s, [field]: value } : s)));
  };

  const removeServiceRow = (key: string) => {
    setServices((prev) => prev.filter((s) => s.key !== key));
  };

  const addHistoryRow = () => {
    setHistory((prev) => [...prev, { key: `new-${Date.now()}`, year: '', title: '', description: '' }]);
  };

  const updateHistoryRow = (key: string, field: keyof HistoryRow, value: string) => {
    setHistory((prev) => prev.map((h) => (h.key === key ? { ...h, [field]: value } : h)));
  };

  const removeHistoryRow = (key: string) => {
    setHistory((prev) => prev.filter((h) => h.key !== key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSaved(false);
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setErrorMsg(tx('انتهت الجلسة. يرجى تسجيل الدخول مجدداً.', 'Session expirée. Veuillez vous reconnecter.', 'Session expired. Please log in again.'));
      return;
    }

    // 1. If a new picture was chosen, upload it first so we have a
    //    URL to save alongside the rest of the profile fields.
    let avatarUrl: string | undefined;
    if (avatarFile) {
      const ext = avatarFile.name.split('.').pop() || 'jpg';
      const path = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, avatarFile, { upsert: true, cacheControl: '3600' });

      if (uploadError) {
        setLoading(false);
        setErrorMsg(uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(path);
      // Cache-bust so the new picture shows up immediately everywhere it's used.
      avatarUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;
    }

    // 2. Save bio / availability / avatar / experience on the profile row.
    const validHistory = history
      .filter((h) => h.year.trim().length > 0 || h.title.trim().length > 0)
      .map((h) => ({ year: h.year, title: h.title, description: h.description }));

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        bio,
        available,
        history: validHistory,
        ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
      })
      .eq('id', user.id);

    if (profileError) {
      setLoading(false);
      setErrorMsg(profileError.message);
      return;
    }

    // 3. Replace the services list: remove what's there, then
    //    insert the current list from the form. Simple and
    //    reliable for a list this small.
    const validServices = services.filter((s) => s.title.trim().length > 0);

    const { error: deleteError } = await supabase
      .from('services')
      .delete()
      .eq('professional_id', user.id);

    if (deleteError) {
      setLoading(false);
      setErrorMsg(deleteError.message);
      return;
    }

    if (validServices.length > 0) {
      const { error: insertError } = await supabase
        .from('services')
        .insert(
          validServices.map((s) => ({
            professional_id: user.id,
            title: s.title,
            description: s.description,
            price: s.price,
          }))
        );

      if (insertError) {
        setLoading(false);
        setErrorMsg(insertError.message);
        return;
      }
    }

    // 4. Re-fetch the fresh, complete row + services so everything
    //    on screen (and in the Search page cache) matches reality.
    const { data: freshProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    const { data: freshServices } = await supabase
      .from('services')
      .select('*')
      .eq('professional_id', user.id);

    if (freshProfile) {
      setCurrentProfessional(mapToProfessional(freshProfile, freshServices || []));
    }
    setAvatarFile(null);

    await refreshProfessionals();

    setLoading(false);
    setSaved(true);
    triggerNotification(
      tx('تم الحفظ', 'Enregistré', 'Saved'),
      tx('تم تحديث ملفك المهني بنجاح.', 'Votre profil professionnel a été mis à jour.', 'Your professional profile has been updated.')
    );
  };

  if (!currentProfessional) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFF] py-12 px-4" dir={direction}>
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight flex items-center gap-2">
            <UserCog className="w-6 h-6 text-brand-primary" />
            {tx('تعديل الملف المهني العام', 'Modifier mon profil public', 'Edit My Public Profile')}
          </h1>
          <p className="text-sm text-slate-900">
            {tx(
              'هذه المعلومات تظهر للزوار في صفحة ملفك على المنصة.',
              'Ces informations sont visibles par les visiteurs sur votre page de profil.',
              'This information is what visitors see on your public profile page.'
            )}
          </p>
        </div>

        <div className="bg-white border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-classic space-y-6">

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {saved && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{tx('تم حفظ ملفك المهني.', 'Votre profil a été enregistré.', 'Your profile has been saved.')}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Profile picture */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-slate-900 uppercase tracking-widest">
                {tx('الصورة الشخصية', 'Photo de profil', 'Profile picture')}
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-blue-200 bg-blue-50 flex items-center justify-center shrink-0">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-lg text-brand-primary tracking-widest">
                      {(currentProfessional.name.fr || currentProfessional.name.ar || '??').substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <label
                  htmlFor="avatar_upload_input"
                  className="flex items-center gap-2 px-4 py-2.5 border border-blue-200 rounded-lg text-sm font-semibold text-slate-700 hover:border-brand-primary hover:text-brand-primary transition cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  {tx('اختيار صورة', 'Choisir une image', 'Choose image')}
                </label>
                <input
                  id="avatar_upload_input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <p className="text-[10px] text-slate-500">
                {tx('JPG أو PNG، بحجم أقصى 3 ميغابايت.', 'JPG ou PNG, 3 Mo maximum.', 'JPG or PNG, up to 3MB.')}
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-slate-900 uppercase tracking-widest">
                {tx('نبذة تعريفية', 'Biographie', 'Bio')}
              </label>
              <textarea
                rows={5}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={tx('اكتب نبذة عن خبرتك وخدماتك...', 'Décrivez votre expérience et vos services...', 'Describe your experience and services...')}
                className="w-full border border-blue-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-primary resize-none"
              />
              <p className="text-[10px] text-slate-500">
                {tx(
                  'ملاحظة: هذه الفقرة تُعرض كما هي، دون ترجمة تلقائية للغات الأخرى.',
                  "Remarque : ce texte s'affiche tel quel, sans traduction automatique vers les autres langues.",
                  'Note: this text is shown as-is, without automatic translation into other languages.'
                )}
              </p>
            </div>

            {/* Availability */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-slate-900 uppercase tracking-widest">
                  {tx('الحالة', 'Statut', 'Status')}
                </label>
                <label className="flex items-center gap-3 border border-blue-200 rounded-lg px-3 py-2.5 bg-white cursor-pointer h-[46px]">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="w-4 h-4 accent-brand-primary cursor-pointer"
                  />
                  <span className="text-sm text-slate-900">
                    {available
                      ? tx('متاح لاستقبال عملاء جدد', 'Disponible pour de nouveaux clients', 'Available for new clients')
                      : tx('غير متاح حالياً', 'Actuellement indisponible', 'Currently unavailable')}
                  </span>
                </label>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-3 pt-4 border-t border-dashed border-blue-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  {tx('الخدمات المقدمة', 'Services proposés', 'Services offered')}
                </h3>
                <button
                  type="button"
                  onClick={addServiceRow}
                  className="flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-dark"
                >
                  <Plus className="w-4 h-4" />
                  {tx('إضافة خدمة', 'Ajouter un service', 'Add a service')}
                </button>
              </div>

              {services.length === 0 && (
                <p className="text-xs text-slate-500 italic">
                  {tx('لم تُضِف أي خدمة بعد.', "Vous n'avez pas encore ajouté de service.", "You haven't added any services yet.")}
                </p>
              )}

              <div className="space-y-4">
                {services.map((s) => (
                  <div key={s.key} className="border border-blue-100 rounded-xl p-4 space-y-3 bg-blue-50/30">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={s.title}
                          onChange={(e) => updateServiceRow(s.key, 'title', e.target.value)}
                          placeholder={tx('عنوان الخدمة', 'Titre du service', 'Service title')}
                          className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                        />
                        <textarea
                          rows={2}
                          value={s.description}
                          onChange={(e) => updateServiceRow(s.key, 'description', e.target.value)}
                          placeholder={tx('وصف مختصر', 'Brève description', 'Short description')}
                          className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 bg-white focus:outline-none focus:border-brand-primary resize-none"
                        />
                        <input
                          type="text"
                          value={s.price}
                          onChange={(e) => updateServiceRow(s.key, 'price', e.target.value)}
                          placeholder={tx('السعر (مثال: 15,000 دج)', 'Prix (ex: 15 000 DA)', 'Price (e.g. 15,000 DZD)')}
                          className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeServiceRow(s.key)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                        title={tx('حذف', 'Supprimer', 'Remove')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience / Timeline */}
            <div className="space-y-3 pt-4 border-t border-dashed border-blue-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase font-mono tracking-widest text-brand-primary flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  {tx('المسيرة المهنية', 'Expérience & Parcours', 'Experience & Timeline')}
                </h3>
                <button
                  type="button"
                  onClick={addHistoryRow}
                  className="flex items-center gap-1 text-xs font-bold text-brand-primary hover:text-brand-dark"
                >
                  <Plus className="w-4 h-4" />
                  {tx('إضافة محطة', 'Ajouter une étape', 'Add an entry')}
                </button>
              </div>

              {history.length === 0 && (
                <p className="text-xs text-slate-500 italic">
                  {tx('لم تُضِف أي محطة مهنية بعد.', "Vous n'avez pas encore ajouté d'étape.", "You haven't added any experience entries yet.")}
                </p>
              )}

              <div className="space-y-4">
                {history.map((h) => (
                  <div key={h.key} className="border border-blue-100 rounded-xl p-4 space-y-3 bg-blue-50/30">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={h.year}
                          onChange={(e) => updateHistoryRow(h.key, 'year', e.target.value)}
                          placeholder={tx('السنة (مثال: 2022)', 'Année (ex: 2022)', 'Year (e.g. 2022)')}
                          className="w-full sm:w-40 border border-blue-200 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                        />
                        <input
                          type="text"
                          value={h.title}
                          onChange={(e) => updateHistoryRow(h.key, 'title', e.target.value)}
                          placeholder={tx('عنوان المحطة (مثال: اعتماد ONEC)', 'Titre de l\'étape (ex: Agrément ONEC)', 'Entry title (e.g. ONEC accreditation)')}
                          className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                        />
                        <textarea
                          rows={2}
                          value={h.description}
                          onChange={(e) => updateHistoryRow(h.key, 'description', e.target.value)}
                          placeholder={tx('وصف مختصر', 'Brève description', 'Short description')}
                          className="w-full border border-blue-200 rounded-lg px-3 py-2 text-xs text-slate-900 bg-white focus:outline-none focus:border-brand-primary resize-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeHistoryRow(h.key)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                        title={tx('حذف', 'Supprimer', 'Remove')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-primary hover:bg-brand-dark disabled:opacity-60 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{tx('حفظ الملف المهني', 'Enregistrer le profil', 'Save profile')}</span>
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};
