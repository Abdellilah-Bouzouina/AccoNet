import React from 'react';
import { Link } from 'react-router-dom';

interface AuthSidePanelProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTo: string;
}

// Decorative colored panel shown next to an auth form (Login/Register),
// inviting the visitor over to the other page. Desktop-only — the form
// pages keep a plain text link at the bottom for mobile users.
export const AuthSidePanel: React.FC<AuthSidePanelProps> = ({ title, subtitle, ctaLabel, ctaTo }) => {
  return (
    <div className="hidden lg:flex relative flex-col items-center justify-center text-center gap-5 bg-brand-primary text-white p-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-14 start-14 w-10 h-10 bg-white/15 rotate-45 rounded-md" />
        <div className="absolute top-1/3 end-[-40px] w-28 h-28 bg-white/10 rounded-full" />
        <div
          className="absolute bottom-16 start-10 w-14 h-14 bg-white/10 rotate-12"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
      </div>

      <div className="relative z-10 space-y-4 max-w-xs">
        <h2 className="text-3xl font-serif font-black leading-tight">{title}</h2>
        <p className="text-sm text-white/80 leading-relaxed">{subtitle}</p>
        <Link
          to={ctaTo}
          className="inline-block mt-2 px-8 py-2.5 border-2 border-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-primary transition"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
};
