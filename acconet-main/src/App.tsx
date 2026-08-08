import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { CheckCircle } from 'lucide-react';

const Search = lazy(() => import('./pages/Search').then((m) => ({ default: m.Search })));
const ProfessionalProfile = lazy(() => import('./pages/ProfessionalProfile').then((m) => ({ default: m.ProfessionalProfile })));
const ClientDashboard = lazy(() => import('./pages/ClientDashboard').then((m) => ({ default: m.ClientDashboard })));
const ProfessionalDashboard = lazy(() => import('./pages/ProfessionalDashboard').then((m) => ({ default: m.ProfessionalDashboard })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const Tools = lazy(() => import('./pages/Tools').then((m) => ({ default: m.Tools })));
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then((m) => ({ default: m.Register })));
const AccountSettings = lazy(() => import('./pages/AccountSettings').then((m) => ({ default: m.AccountSettings })));
const ProfessionalProfileEdit = lazy(() => import('./pages/ProfessionalProfileEdit').then((m) => ({ default: m.ProfessionalProfileEdit })));
const Messages = lazy(() => import('./pages/Messages').then((m) => ({ default: m.Messages })));

// A wrapper to handle global notifications / success popup overlays
const GlobalNotification: React.FC = () => {
  const { activeNotification, clearNotification } = useApp();
  const { t } = useLanguage();

  if (!activeNotification) return null;

  return (
    <div className="fixed inset-0 bg-black/55 z-55 flex items-center justify-center p-4 animate-fade-in" id="global_notification_overlay">
      <div className="glass rounded-2xl max-w-sm w-full p-6 text-center space-y-4 border border-blue-100 shadow-2xl animate-scale-up">
        
        {/* Animated Check */}
        <div className="w-16 h-16 bg-brand-light text-brand-primary rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm border border-brand-primary/20">
          <CheckCircle className="w-10 h-10 text-brand-primary animate-pulse" />
        </div>

        <div className="space-y-1">
          <h3 className="font-extrabold text-white text-base">{activeNotification.title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">{activeNotification.message}</p>
        </div>

        <button 
          onClick={clearNotification}
          className="w-full py-2.5 bg-brand-primary hover:bg-brand-dark text-white rounded-xl text-xs font-semibold cursor-pointer transition shadow-xs"
        >
          {t('closeBtn')}
        </button>

      </div>
    </div>
  );
};

// Main Router core inside providers
const AppContent: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col justify-between selection:bg-brand-light selection:text-brand-primary">
        
        {/* Navigation block */}
        <Navbar />

        {/* Dynamic page viewport */}
        <main className="flex-grow pt-2">
          <Suspense fallback={<div className="flex items-center justify-center py-24 text-slate-400 text-sm">…</div>}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/search" element={<Search />} />
              <Route path="/professional/:id" element={<ProfessionalProfile />} />
              <Route path="/dashboard/client" element={<ClientDashboard />} />
              <Route path="/dashboard/professional" element={<ProfessionalDashboard />} />
              <Route path="/dashboard/professional/edit" element={<ProfessionalProfileEdit />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/settings" element={<AccountSettings />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        {/* Global Success Banner alerts */}
        <GlobalNotification />

        {/* Footer block */}
        <Footer />

      </div>
    </HashRouter>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}
