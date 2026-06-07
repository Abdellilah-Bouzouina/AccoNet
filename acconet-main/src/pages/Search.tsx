import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { SearchFilters } from '../components/SearchFilters';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { Info } from 'lucide-react';

export const Search: React.FC = () => {
  const { t, tObj, tSpec, language, direction } = useLanguage();
  const { allProfessionals } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Retrieve initial params from landing redirect
  const queryKeyword = searchParams.get('keyword') || '';
  const queryWilaya = Number(searchParams.get('wilaya')) || 0;
  const querySpecialty = searchParams.get('specialty') || '';

  // Filter States
  const [keyword, setKeyword] = useState(queryKeyword);
  const [selectedWilaya, setSelectedWilaya] = useState<number>(queryWilaya);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(querySpecialty);
  const [maxPrice, setMaxPrice] = useState<number>(9500);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('rating');

  // Interactive Skeleton Loading effect for 400ms
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync state if query parameters change
  useEffect(() => {
    setKeyword(queryKeyword);
    setSelectedWilaya(queryWilaya);
    setSelectedSpecialty(querySpecialty);
  }, [queryKeyword, queryWilaya, querySpecialty]);

  // Simulate brief loading pulse on filter change to give real feedback
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedWilaya, selectedSpecialty, maxPrice, minRating, onlyAvailable, sortBy, keyword]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedWilaya(0);
    setSelectedSpecialty('');
    setMaxPrice(9500);
    setMinRating(4.0);
    setOnlyAvailable(false);
    setSortBy('rating');
    setSearchParams({}); // Clear query parameters
  };

  // Perform search / filtering logic
  const filteredPros = allProfessionals.filter((pro) => {
    // 1. Keyword search
    if (keyword) {
      const kw = keyword.toLowerCase();
      const matchName = (pro.name.en + pro.name.fr + pro.name.ar).toLowerCase().includes(kw);
      const matchBio = (pro.bio.en + pro.bio.fr + pro.bio.ar).toLowerCase().includes(kw);
      const matchSpecialty = pro.specialty.toLowerCase().includes(kw);
      if (!matchName && !matchBio && !matchSpecialty) return false;
    }

    // 2. Wilaya filter
    if (selectedWilaya > 0 && pro.wilayaId !== selectedWilaya) {
      return false;
    }

    // 3. Specialty filter
    if (selectedSpecialty && pro.specialty !== selectedSpecialty) {
      return false;
    }

    // 4. Max price filter
    if (pro.hourlyRate > maxPrice) {
      return false;
    }

    // 5. Min rating filter
    if (pro.rating < minRating) {
      return false;
    }

    // 6. Only available filter
    if (onlyAvailable && !pro.available) {
      return false;
    }

    return true;
  });

  // Sort logic
  const sortedPros = [...filteredPros].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'price-asc') {
      return a.hourlyRate - b.hourlyRate;
    }
    if (sortBy === 'price-desc') {
      return b.hourlyRate - a.hourlyRate;
    }
    if (sortBy === 'experience') {
      return b.yearsExperience - a.yearsExperience;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFF] text-slate-800" id="search_page_wrapper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-10">
        
        {/* Editorial Title Section */}
        <div className="border-b border-blue-100 pb-6 space-y-2 text-left rtl:text-right">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-primary font-bold">{language === 'ar' ? 'دليل المهنيين المحاسبيين' : 'Annuaire des Professionnels Comptables'}</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight leading-none mt-1">
            {t('searchTitle')}
          </h1>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest leading-none pt-1">
            National Board Registered Auditors • SECURE DIRECTORY
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar filters (col-span-4) */}
          <div className="lg:col-span-4">
            <SearchFilters 
              selectedWilaya={selectedWilaya}
              setSelectedWilaya={setSelectedWilaya}
              selectedSpecialty={selectedSpecialty}
              setSelectedSpecialty={setSelectedSpecialty}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              onlyAvailable={onlyAvailable}
              setOnlyAvailable={setOnlyAvailable}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={handleResetFilters}
            />
          </div>

          {/* Results grid (col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Status Header above grid */}
            <div className="bg-white border border-blue-100 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-classic text-left rtl:text-right">
              <div className="text-xs font-mono uppercase text-slate-400">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-primary animate-ping rounded-full"></span>
                    جارٍ البحث...
                  </span>
                ) : (
                  <>
                    Showing <strong className="text-brand-primary font-bold text-sm font-mono">{sortedPros.length}</strong> authenticated entries
                  </>
                )}
              </div>

              {keyword && (
                <div className="flex items-center gap-1.5 bg-brand-primary/15 text-brand-primary text-[10px] font-mono uppercase px-3 py-1 border border-brand-primary/20 rounded self-start">
                  <span>Filter: "{keyword}"</span>
                  <button 
                    onClick={() => setKeyword('')} 
                    className="font-bold text-rose-450 hover:text-rose-600 ml-1.5 cursor-pointer text-xs"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* SKELETON CARDS LOADING REPLICA */}
            {isLoading ? (
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
            ) : (
              <>
                {/* Actual results block */}
                {sortedPros.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="search_results_grid">
                    {sortedPros.map((pro) => (
                      <ProfessionalCard key={pro.id} professional={pro} />
                    ))}
                  </div>
                ) : (
                  /* Empty state */
                  <div className="bg-white border border-blue-200 p-12 rounded-xl text-center space-y-5" id="search_empty_state">
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-slate-400 flex items-center justify-center mx-auto text-xl rounded-xl shadow-classic">
                      🔍
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif font-black text-slate-900 text-base">لم يُعثر على مهني مطابق</h3>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto font-sans">
                        No certified practitioners met your exact constraints in our active SCF database. Relax maximum fee sliders or remove wilaya constraints.
                      </p>
                    </div>
                    <button 
                      onClick={handleResetFilters}
                      className="px-5 py-2.5 bg-brand-primary hover:bg-brand-dark text-slate-900 font-mono text-[10px] font-bold uppercase tracking-widest cursor-pointer rounded-lg"
                    >
                      Reset Filter Parameters
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Regulatory Citation Directive */}
            <div className="bg-white border border-blue-200 p-5 gap-3 text-xs text-slate-300 rounded-xl flex text-left rtl:text-right">
              <Info className="w-5 h-5 text-brand-primary shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-primary font-bold block">National Accreditation Fact</span>
                <p className="font-serif font-bold text-slate-900 text-xs leading-none">Ordre National des Experts Comptables (ONCC) alignment</p>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  All accounting practitioners referenced on AccoNet maintain active registrations across Algerian regional fiscal boards. In accordance with standard Finance Law revisions, engagement with certified experts completely satisfied administrative filing compliance.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
