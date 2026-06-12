import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { wilayas } from '../data/mockData';
import { Sliders, RefreshCw, Star, Check } from 'lucide-react';

interface SearchFiltersProps {
  selectedWilaya: number;
  setSelectedWilaya: (id: number) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (key: string) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  onlyAvailable: boolean;
  setOnlyAvailable: (avail: boolean) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  onReset: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedWilaya,
  setSelectedWilaya,
  selectedSpecialty,
  setSelectedSpecialty,
  minRating,
  setMinRating,
  onlyAvailable,
  setOnlyAvailable,
  sortBy,
  setSortBy,
  onReset
}) => {
  const { t, tSpec, tObj } = useLanguage();

  const specialtiesList = [
    "chartered-accountant",
    "statutory-auditor",
    "certified-accountant",
    "tax-consultant",
    "judicial-expert"
  ];

  return (
    <div className="bg-white border border-blue-100 p-6 shadow-glow sticky top-24 text-left rtl:text-right rounded-xl" id="search_filters_sidebar">
      
      {/* Filters Title & Reset */}
      <div className="flex justify-between items-center pb-4 border-b border-blue-100 mb-6">
        <h3 className="font-serif font-black text-slate-900 text-base flex items-center gap-2">
          <Sliders className="w-4.5 h-4.5 text-brand-primary" />
          {t('filterBy')}
        </h3>
        <button 
          onClick={onReset}
          className="text-[10px] text-brand-primary hover:text-brand-dark flex items-center gap-1 font-mono uppercase tracking-widest cursor-pointer transition-colors"
          id="btn_reset_filters"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {t('resetFilters').toUpperCase()}
        </button>
      </div>

      <div className="space-y-6">

        {/* Sort Order Selector */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            {t('sortBy')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-blue-50 border border-blue-200 text-xs px-3 py-2 text-slate-300 focus:outline-none focus:border-brand-primary rounded-lg font-sans cursor-pointer"
            id="sort_by_dropdown"
          >
            <option value="rating" className="bg-white text-slate-900">{t('sortRating')}</option>
            <option value="experience" className="bg-white text-slate-900">{t('sortExperience')}</option>
          </select>
        </div>

        {/* 48 Wilayas Filter Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest font-sans">
            Algeria Wilaya
          </label>
          <select 
            value={selectedWilaya}
            onChange={(e) => setSelectedWilaya(Number(e.target.value))}
            className="w-full bg-blue-50 border border-blue-200 text-xs px-3 py-2 text-slate-300 focus:outline-none focus:border-brand-primary rounded-lg font-sans cursor-pointer"
            id="filter_wilaya_select"
          >
            <option value={0} className="bg-white text-slate-900">📍 {t('allWilayas')}</option>
            {wilayas.map((w) => (
              <option key={w.id} value={w.id} className="bg-white text-slate-900">
                {w.code} - {tObj(w.name)}
              </option>
            ))}
          </select>
        </div>

        {/* Specialty Filter Panel */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">
            Specialty / Profession
          </label>
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
            <button
              onClick={() => setSelectedSpecialty("")}
              className={`w-full flex items-center justify-between text-left rtl:text-right text-xs px-3 py-2 rounded-lg border transition ${selectedSpecialty === "" ? 'bg-brand-primary/10 border-brand-primary/50 text-brand-primary font-bold' : 'border-blue-100 hover:bg-blue-50 text-slate-400'}`}
            >
              <span>{t('allSpecialties')}</span>
              {selectedSpecialty === "" && <Check className="w-3.5 h-3.5 text-brand-primary" />}
            </button>
            {specialtiesList.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`w-full flex items-center justify-between text-left rtl:text-right text-xs px-3 py-2 rounded-lg border transition ${selectedSpecialty === spec ? 'bg-brand-primary/10 border-brand-primary/50 text-brand-primary font-bold' : 'border-blue-100 hover:bg-blue-50 text-slate-400'}`}
              >
                <span>{tSpec(spec)}</span>
                {selectedSpecialty === spec && <Check className="w-3.5 h-3.5 text-brand-primary" />}
              </button>
            ))}
          </div>
        </div>

        {/* Minimum rating */}
        <div className="space-y-2">
          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            {t('minRating')}
          </label>
          <div className="grid grid-cols-5 gap-1">
            {[4.0, 4.5, 4.6, 4.7, 4.8].map((rating) => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`py-2 border text-xs font-mono font-bold text-center cursor-pointer transition flex flex-col items-center justify-center rounded-lg ${minRating === rating ? 'bg-brand-primary border-brand-primary text-white shadow-glow' : 'border-blue-100 hover:bg-blue-50 text-slate-400 bg-slate-900/20'}`}
                title={`Show professionals rated ${rating}+`}
              >
                <Star className={`w-3 h-3 mb-0.5 ${minRating === rating ? 'fill-slate-950 text-slate-900' : 'text-amber-500 fill-amber-500'}`} />
                <span>{rating}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Available Immediately toggle */}
        <div className="pt-4 border-t border-blue-100">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer border-blue-200 bg-transparent rounded"
              id="filter_availability_checkbox"
            />
            <span className="text-xs font-semibold text-slate-300">
              ⚡ {t('availabilityLabel')}
            </span>
          </label>
        </div>

      </div>

    </div>
  );
};