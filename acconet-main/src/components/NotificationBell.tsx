import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { AppNotification, NotificationType } from '../lib/notifications';
import { Bell, CheckCheck } from 'lucide-react';

const typeLabel = (type: NotificationType, tx: (ar: string, fr: string, en: string) => string) => {
  switch (type) {
    case 'contract_request':
      return tx('طلب عقد جديد من', 'Nouvelle demande de contrat de', 'New contract request from');
    case 'contract_accepted':
      return tx('تم قبول عقدك من طرف', 'Votre contrat a été accepté par', 'Your contract was accepted by');
    case 'contract_declined':
      return tx('تم رفض عقدك من طرف', 'Votre contrat a été refusé par', 'Your contract was declined by');
    case 'message':
      return tx('رسالة جديدة من', 'Nouveau message de', 'New message from');
  }
};

export const NotificationBell: React.FC = () => {
  const { language, direction } = useLanguage();
  const { notifications, unreadNotificationsCount, markNotificationRead, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const tx = (ar: string, fr: string, en: string) =>
    language === 'ar' ? ar : language === 'en' ? en : fr;

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSelect = async (n: AppNotification) => {
    setOpen(false);
    if (!n.read) await markNotificationRead(n.id);
    if (n.link) navigate(n.link);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-brand-primary transition"
        id="notification_bell_btn"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-0.5 -end-0.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
            {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 w-80 max-w-[90vw] bg-white border border-blue-100 rounded-xl shadow-glow py-1.5 z-50 ${direction === 'rtl' ? 'left-0' : 'right-0'}`}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-blue-100">
            <span className="text-sm font-bold text-slate-800">{tx('الإشعارات', 'Notifications', 'Notifications')}</span>
            {unreadNotificationsCount > 0 && (
              <button
                onClick={() => markAllNotificationsRead()}
                className="flex items-center gap-1 text-[11px] font-semibold text-brand-primary hover:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                {tx('تحديد الكل كمقروء', 'Tout marquer comme lu', 'Mark all as read')}
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-sm text-slate-400 px-4 py-8 text-center">
                {tx('لا توجد إشعارات بعد.', 'Aucune notification pour le moment.', 'No notifications yet.')}
              </p>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleSelect(n)}
                  className={`w-full text-start px-4 py-3 border-b border-blue-50 last:border-b-0 hover:bg-blue-50/60 transition flex gap-2.5 ${!n.read ? 'bg-blue-50/40' : ''}`}
                >
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${!n.read ? 'bg-brand-primary' : 'bg-transparent'}`} />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-700 leading-snug">
                      <span className={!n.read ? 'font-bold text-slate-900' : ''}>{typeLabel(n.type, tx)}</span>{' '}
                      <span className="font-bold text-slate-900">{n.actorName}</span>
                    </p>
                    {n.preview && <p className="text-xs text-slate-500 truncate mt-0.5">{n.preview}</p>}
                    <p className="text-[10px] text-slate-400 mt-1">
                      {new Date(n.createdAt).toLocaleString(language)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
