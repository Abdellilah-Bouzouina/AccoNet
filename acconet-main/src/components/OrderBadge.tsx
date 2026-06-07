import React from 'react';
import { professionalOrders } from '../data/serviceRates';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

interface OrderBadgeProps {
  orderKey: 'ONEC' | 'ONCC' | 'ONCA' | string;
  showDetails?: boolean;
}

export const OrderBadge: React.FC<OrderBadgeProps> = ({ orderKey, showDetails = false }) => {
  const detail = professionalOrders[orderKey];

  if (!detail) {
    return (
      <span className="px-2 py-0.5 glass/5 border border-blue-200 text-slate-300 text-[10px] font-bold font-mono">
        {orderKey}
      </span>
    );
  }

  // Mini label badge
  if (!showDetails) {
    return (
      <span 
        style={{ borderColor: detail.badgeColor, color: detail.badgeColor, backgroundColor: `${detail.badgeColor}0F` }}
        className="inline-flex items-center gap-1 px-2.5 py-0.5 border text-[10px] font-mono font-black rounded-none tracking-wider uppercase shadow-3xs"
        title={`${detail.fullName} (${detail.fullNameAR})`}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: detail.badgeColor }}></span>
        <span>{orderKey} VERIFIED</span>
      </span>
    );
  }

  // Expanded card layout
  return (
    <div className="border p-4 glass shadow-2xs space-y-2 border-l-4 text-left rtl:text-right" style={{ borderLeftColor: detail.badgeColor }}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-1.5">
            <span 
              className="px-2 py-0.5 text-[9px] font-bold text-white uppercase font-mono"
              style={{ backgroundColor: detail.badgeColor }}
            >
              {orderKey} REGULATORY BODY
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified List
            </span>
          </div>

          <h5 className="font-serif font-bold text-xs text-white mt-1.5 leading-snug">
            {detail.fullName}
          </h5>
          <h6 className="font-serif font-black text-[11px] text-brand-primary mt-1">
            {detail.fullNameAR}
          </h6>
        </div>
      </div>

      <div className="pt-2 text-[10px] text-slate-400 font-mono space-y-1 border-t border-blue-100">
        <p>⚖️ <span className="font-bold">Base légale :</span> {detail.legalBasis}</p>
        <p>📈 <span className="font-bold">Membres inscrits :</span> {detail.memberCount}</p>
        
        {detail.website && (
          <a 
            href={`https://${detail.website}`} 
            target="_blank" 
            referrerPolicy="no-referrer"
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-0.5 text-brand-primary font-bold hover:underline mt-1"
          >
            <span>{detail.website}</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
    </div>
  );
};
