import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { AccoNetLogo } from './AccoNetLogo';
import { Menu, X, Languages, Search, Cpu, LayoutDashboard, LogOut, ChevronDown, Settings, UserCog, Eye } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, direction } = useLanguage();
  const { userRole, currentClient, currentProfessional, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen,   setLangOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const langMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!langOpen && !userMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langOpen && langMenuRef.current && !langMenuRef.current.contains(target)) {
        setLangOpen(false);
      }
      if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langOpen, userMenuOpen]);

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-brand-primary font-bold border-b-2 border-brand-primary pb-0.5'
      : 'text-slate-600 hover:text-brand-primary transition-colors duration-150';

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    navigate('/');
    setMobileOpen(false);
  };

  const displayName = () => {
    if (userRole === 'client'       && currentClient)       return currentClient.companyName;
    if (userRole === 'professional' && currentProfessional)
      return currentProfessional.name[language] || currentProfessional.name.fr;
    if (userRole === 'admin') return 'Admin DGI';
    return '';
  };

  // Accountants aren't searching for themselves — show them a
  // "browse the directory" label instead of "find a professional."
  const findProLabel = userRole === 'professional' ? t('viewProsListButton') : t('findProButton');

  const topBarText = {
    ar: 'منصة رقمية تربط المهنيين المحاسبيين بالمتعاملين الاقتصاديين عبر 69 ولاية جزائرية',
    fr: 'AccoNet — Plateforme de mise en relation entre professionnels comptables et opérateurs économiques',
    en: 'AccoNet — Connecting accounting professionals with economic operators across Algeria\'s 69 wilayas',
  };

  return (
    <header className="sticky top-0 z-50 w-full" dir={direction}>

      {/* ── TOP BAR ── */}
      <div className="bg-brand-primary text-white text-center py-2 px-4 text-xs font-sans tracking-wide select-none leading-relaxed hidden sm:block">
        {topBarText[language]}
      </div>

      {/* ── MAIN NAV ── */}
      <nav className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            <Link to="/" className="flex items-center gap-3 shrink-0 hover:opacity-90 transition-opacity group">
              <AccoNetLogo height={52} color="#1D4ED8" />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-2xl font-black tracking-tight text-brand-primary font-serif">
                  AccoNet
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.18em] mt-0.5">
                  Algeria
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
              <Link to="/search" className={`flex items-center gap-1.5 ${isActive('/search')}`}>
                <Search className="w-4 h-4" />
                {findProLabel}
              </Link>
              {userRole !== 'client' && (
                <Link to="/tools" className={`flex items-center gap-1.5 ${isActive('/tools')}`}>
                  <Cpu className="w-4 h-4" />
                  {t('toolsLink')}
                </Link>
              )}
              {userRole === 'client' && (
                <Link to="/dashboard/client" className={`flex items-center gap-1.5 ${isActive('/dashboard/client')}`}>
                  <LayoutDashboard className="w-4 h-4" /> {t('dashboardSidebarTitle')}
                </Link>
              )}
              {userRole === 'professional' && (
                <Link to="/dashboard/professional" className={`flex items-center gap-1.5 ${isActive('/dashboard/professional')}`}>
                  <LayoutDashboard className="w-4 h-4" /> {t('dashboardSidebarTitle')}
                </Link>
              )}
              {userRole === 'admin' && (
                <Link to="/dashboard/admin" className={`flex items-center gap-1.5 text-amber-600 font-bold ${isActive('/dashboard/admin')}`}>
                  <LayoutDashboard className="w-4 h-4" />
                  {language === 'ar' ? 'لوحة الإدارة' : 'Administration'}
                </Link>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">

              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-blue-200 rounded-lg text-sm font-semibold text-slate-600 hover:border-brand-primary hover:text-brand-primary transition bg-white"
                >
                  <Languages className="w-4 h-4 text-brand-primary" />
                  <span className="uppercase tracking-wider">{language}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                </button>
                {langOpen && (
                  <div className={`absolute top-full mt-2 w-40 bg-white border border-blue-100 rounded-xl shadow-glow py-1 z-50 ${direction === 'rtl' ? 'left-0' : 'right-0'}`}>
                    {(['ar','fr','en'] as const).map(lang => (
                      <button key={lang} onClick={() => { setLanguage(lang); setLangOpen(false); }}
                        className={`flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-brand-primary transition ${language === lang ? 'font-bold text-brand-primary bg-blue-50' : 'text-slate-600'}`}
                      >
                        <span>{lang === 'ar' ? 'العربية' : lang === 'fr' ? 'Français' : 'English'}</span>
                        <span>{lang === 'ar' ? '🇩🇿' : lang === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {userRole === 'guest' ? (
                <div className="flex items-center gap-2">
                  <Link to="/login"    className="px-4 py-2 border border-blue-200 text-slate-600 rounded-lg text-sm font-semibold hover:border-brand-primary hover:text-brand-primary transition">{t('loginLink')}</Link>
                  <Link to="/register" className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold hover:bg-brand-dark transition shadow-sm">{t('registerLink')}</Link>
                </div>
              ) : (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`flex items-center gap-3 ${direction === 'rtl' ? 'border-r border-blue-100 pr-3' : 'border-l border-blue-100 pl-3'} hover:bg-blue-50 rounded-lg py-1.5 pl-1.5 pr-1.5 transition`}
                    id="navbar_user_menu_btn"
                  >
                    <div className={`leading-none ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <p className="text-sm font-bold text-slate-800 max-w-[140px] truncate">{displayName()}</p>
                      <p className="text-xs text-slate-400 font-mono uppercase mt-0.5">{userRole}</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm shrink-0">
                      {displayName().slice(0,2).toUpperCase()}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 opacity-50 shrink-0 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <div className={`absolute top-full mt-2 w-56 bg-white border border-blue-100 rounded-xl shadow-glow py-1.5 z-50 ${direction === 'rtl' ? 'left-0' : 'right-0'}`}>
                      {userRole === 'professional' && currentProfessional && (
                        <Link
                          to={`/professional/${currentProfessional.id}`}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition"
                        >
                          <Eye className="w-4 h-4 shrink-0" />
                          {t('viewMyProfileLink')}
                        </Link>
                      )}
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition"
                      >
                        <Settings className="w-4 h-4 shrink-0" />
                        {t('accountSettingsLink')}
                      </Link>
                      {userRole === 'professional' && (
                        <Link
                          to="/dashboard/professional/edit"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-brand-primary transition"
                        >
                          <UserCog className="w-4 h-4 shrink-0" />
                          {t('editProfileLink')}
                        </Link>
                      )}
                      <div className="my-1 border-t border-blue-100"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition text-left rtl:text-right"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        {t('logout')}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setLanguage(language === 'ar' ? 'fr' : language === 'fr' ? 'en' : 'ar')}
                className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-bold text-slate-600 uppercase">
                {language}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-slate-500 hover:bg-blue-50">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-blue-100 px-4 py-4 space-y-2">
            <Link to="/search"   onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-blue-50 hover:text-brand-primary"><Search className="w-4 h-4" />{findProLabel}</Link>
            {userRole !== 'client' && (
              <Link to="/tools"    onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-blue-50 hover:text-brand-primary"><Cpu    className="w-4 h-4" />{t('toolsLink')}</Link>
            )}
            {userRole !== 'guest' && (
              <>
                <Link to={`/dashboard/${userRole}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-blue-50 hover:text-brand-primary">
                  <LayoutDashboard className="w-4 h-4" />{t('dashboardSidebarTitle')}
                </Link>
                <Link to="/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-blue-50 hover:text-brand-primary">
                  <Settings className="w-4 h-4" />{t('accountSettingsLink')}
                </Link>
                {userRole === 'professional' && currentProfessional && (
                  <>
                    <Link to={`/professional/${currentProfessional.id}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-blue-50 hover:text-brand-primary">
                      <Eye className="w-4 h-4" />{t('viewMyProfileLink')}
                    </Link>
                    <Link to="/dashboard/professional/edit" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-blue-50 hover:text-brand-primary">
                      <UserCog className="w-4 h-4" />{t('editProfileLink')}
                    </Link>
                  </>
                )}
              </>
            )}
            <div className="pt-3 border-t border-blue-100 grid grid-cols-3 gap-2">
              {(['ar','fr','en'] as const).map(lang => (
                <button key={lang} onClick={() => { setLanguage(lang); setMobileOpen(false); }}
                  className={`py-2.5 text-sm rounded-xl border text-center ${language === lang ? 'bg-brand-primary text-white border-brand-primary' : 'bg-blue-50 text-slate-600 border-blue-200'}`}>
                  {lang === 'ar' ? 'عربية' : lang === 'fr' ? 'Fr' : 'En'}
                </button>
              ))}
            </div>
            <div className="pt-2">
              {userRole === 'guest' ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login"    onClick={() => setMobileOpen(false)} className="py-3 text-center border border-blue-200 text-slate-600 rounded-xl text-sm font-semibold">{t('loginLink')}</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="py-3 text-center bg-brand-primary text-white rounded-xl text-sm font-bold">{t('registerLink')}</Link>
                </div>
              ) : (
                <button onClick={handleLogout} className="w-full py-3 flex items-center justify-center gap-2 border border-red-200 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-50">
                  <LogOut className="w-4 h-4" />{t('logout')}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
