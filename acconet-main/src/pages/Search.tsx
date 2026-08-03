import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { SearchFilters } from '../components/SearchFilters';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { UserPlus } from 'lucide-react';

export const Search: React.FC = () => {
  const { t, tObj, tSpec, language, direction } = useLanguage();
  const { allProfessionals, professionalsLoading } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryKeyword = searchParams.get('keyword') || '';
  const queryWilaya = Number(searchParams.get('wilaya')) || 0;
  const querySpecialty = searchParams.get('specialty') || '';

  const [keyword, setKeyword] = useState(queryKeyword);
  const [selectedWilaya, setSelectedWilaya] = useState<number>(queryWilaya);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(querySpecialty);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('rating');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setKeyword(queryKeyword);
    setSelectedWilaya(queryWilaya);
    setSelectedSpecialty(querySpecialty);
  }, [queryKeyword, queryWilaya, querySpecialty]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedWilaya, selectedSpecialty, minRating, onlyAvailable, sortBy, keyword]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedWilaya(0);
    setSelectedSpecialty('');
    setMinRating(0);
    setOnlyAvailable(false);
    setSortBy('rating');
    setSearchParams({});
  };

  const sortedPros = useMemo(() => {
    const filteredPros = allProfessionals.filter((pro) => {
      if (keyword) {
        const kw = keyword.toLowerCase();
        const matchName = (pro.name.en + pro.name.fr + pro.name.ar).toLowerCase().includes(kw);
        const matchBio = (pro.bio.en + pro.bio.fr + pro.bio.ar).toLowerCase().includes(kw);
        const matchSpecialty = pro.specialty.toLowerCase().includes(kw);
        if (!matchName && !matchBio && !matchSpecialty) return false;
      }
      if (selectedWilaya > 0 && pro.wilayaId !== selectedWilaya) return false;
      if (selectedSpecialty && pro.specialty !== selectedSpecialty) return false;
      if (pro.rating < minRating) return false;
      if (onlyAvailable && !pro.available) return false;
      return true;
    });

    return [...filteredPros].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'rating-asc') return a.rating - b.rating;
      if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience;
      if (sortBy === 'experience-asc') return a.yearsExperience - b.yearsExperience;
      return 0;
    });
  }, [allProfessionals, keyword, selectedWilaya, selectedSpecialty, minRating, onlyAvailable, sortBy]);

  // True while we're fetching the real accountant list from Supabase,
  // OR while the local filter-change pulse is running.
  const showSkeleton = professionalsLoading || isLoading;

  return (
    <div className="min-h-screen bg-[#F8FAFF] text-slate-900" id="search_page_wrapper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-10">

        <div className="border-b border-blue-100 pb-6 space-y-2 text-left rtl:text-right">
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-none mt-1">
            {t('searchTitle')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-4">
            <SearchFilters
              selectedWilaya={selectedWilaya}
              setSelectedWilaya={setSelectedWilaya}
              selectedSpecialty={selectedSpecialty}
              setSelectedSpecialty={setSelectedSpecialty}
              minRating={minRating}
              setMinRating={setMinRating}
              onlyAvailable={onlyAvailable}
              setOnlyAvailable={setOnlyAvailable}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={handleResetFilters}
            />
          </div>

          <div className="lg:col-span-8 space-y-6">

            <div className="bg-white border border-blue-100 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-classic text-left rtl:text-right">
              <div className="text-xs font-mono uppercase text-slate-900">
                {showSkeleton ? (
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-primary animate-ping rounded-full"></span>
                    {t('searchingLabel')}
                  </span>
                ) : (
                  <>
                    <strong className="text-brand-primary font-bold text-sm font-mono">{sortedPros.length}</strong> {t('resultsCount')}
                  </>
                )}
              </div>

              {keyword && (
                <div className="flex items-center gap-1.5 bg-brand-primary/15 text-brand-primary text-[10px] font-mono uppercase px-3 py-1 border border-brand-primary/20 rounded self-start">
                  <span>{t('filterLabelPrefix')} "{keyword}"</span>
                  <button
                    onClick={() => setKeyword('')}
                    className="font-bold text-rose-450 hover:text-rose-600 ml-1.5 cursor-pointer text-xs"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {showSkeleton ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="skeletons_container">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white border border-blue-100 p-6 space-y-4 rounded-xl animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-50/50 rounded-lg"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-3.5 bg-blue-50/50 rounded w-2/3"></div>
                        <div className="h-3 bg-blue-50/50 rounded w-1/3"></div>
                      </div>
                    </div>
                    <div className="h-3 bg-blue-50/50 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-blue-50/50 rounded w-5/6 animate-pulse"></div>
                    <div className="border-t border-blue-100 pt-4 flex justify-between">
                      <div className="h-4 bg-blue-50/50 rounded w-1/3"></div>
                      <div className="h-5 bg-blue-50/50 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : allProfessionals.length === 0 ? (
              /* Nobody has registered as an accountant on the platform yet */
              <div className="bg-white border border-blue-200 p-12 rounded-xl text-center space-y-5" id="search_no_accountants_state">
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-brand-primary flex items-center justify-center mx-auto text-xl rounded-xl shadow-classic">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-slate-900 text-base">
                    {language === 'ar' ? 'لا يوجد محاسبون مسجلون بعد' : language === 'en' ? 'No accountants registered yet' : "Aucun comptable inscrit pour l'instant"}
                  </h3>
                  <p className="text-slate-900 text-xs leading-relaxed max-w-sm mx-auto font-sans">
                    {language === 'ar'
                      ? 'كن أول محاسب معتمد ينضم إلى المنصة.'
                      : language === 'en'
                        ? 'Be the first certified accountant to join the platform.'
                        : 'Soyez le premier comptable agréé à rejoindre la plateforme.'}
                  </p>
                </div>
                <Link
                  to="/register"
                  className="inline-block px-5 py-2.5 bg-brand-primary hover:bg-brand-dark text-white font-mono text-[10px] font-bold uppercase tracking-widest cursor-pointer rounded-lg"
                >
                  {t('registerLink')}
                </Link>
              </div>
            ) : sortedPros.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="search_results_grid">
                {sortedPros.map((pro) => (
                  <ProfessionalCard key={pro.id} professional={pro} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-blue-200 p-12 rounded-xl text-center space-y-5" id="search_empty_state">
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-slate-900 flex items-center justify-center mx-auto text-xl rounded-xl shadow-classic">
                  🔍
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-slate-900 text-base">{t('noResultsTitle')}</h3>
                  <p className="text-slate-900 text-xs leading-relaxed max-w-sm mx-auto font-sans">
                    {t('noResultsBody')}
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-brand-primary hover:bg-brand-dark text-white font-mono text-[10px] font-bold uppercase tracking-widest cursor-pointer rounded-lg"
                >
                  {t('resetFilters')}
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
