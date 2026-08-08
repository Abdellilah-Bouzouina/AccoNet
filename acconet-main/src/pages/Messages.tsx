import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { sendMessage } from '../lib/messaging';
import { MessageSquare, Send, Loader2, User2 } from 'lucide-react';

interface ConversationRow {
  id: string;
  professional_id: string;
  client_id: string;
  last_message_at: string;
  client?: { id: string; full_name: string; company_name: string | null; avatar_url: string | null } | null;
  professional?: { id: string; full_name: string; avatar_url: string | null } | null;
}

interface MessageRow {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
}

const CONVERSATION_SELECT = `id, professional_id, client_id, last_message_at,
  client:profiles!conversations_client_id_fkey(id, full_name, company_name, avatar_url),
  professional:profiles!conversations_professional_id_fkey(id, full_name, avatar_url)`;

export const Messages: React.FC = () => {
  const { language, direction } = useLanguage();
  const { userRole, currentClient, currentProfessional, authChecked } = useApp();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tx = (ar: string, fr: string, en: string) =>
    language === 'ar' ? ar : language === 'en' ? en : fr;

  const myId = currentClient?.id || currentProfessional?.id;
  const activeConversationId = searchParams.get('c');

  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authChecked && userRole !== 'client' && userRole !== 'professional') {
      navigate('/');
    }
  }, [authChecked, userRole, navigate]);

  const loadConversations = useCallback(async () => {
    if (!myId) return;
    setConversationsLoading(true);
    const { data } = await supabase
      .from('conversations')
      .select(CONVERSATION_SELECT)
      .or(`professional_id.eq.${myId},client_id.eq.${myId}`)
      .order('last_message_at', { ascending: false });
    setConversations((data as unknown as ConversationRow[]) || []);
    setConversationsLoading(false);
  }, [myId]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Load the active thread + subscribe to new messages arriving live.
  useEffect(() => {
    if (!activeConversationId) {
      setMessages([]);
      return;
    }

    let cancelled = false;
    setMessagesLoading(true);

    supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', activeConversationId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (cancelled) return;
        setMessages((data as MessageRow[]) || []);
        setMessagesLoading(false);
      });

    const channel = supabase
      .channel(`messages:${activeConversationId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${activeConversationId}` },
        (payload) => {
          const incoming = payload.new as MessageRow;
          setMessages((prev) => (prev.some((m) => m.id === incoming.id) ? prev : [...prev, incoming]));
          setConversations((prev) => {
            const next = prev.map((c) => (c.id === incoming.conversation_id ? { ...c, last_message_at: incoming.created_at } : c));
            return next.sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());
          });
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [activeConversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !activeConversationId || !myId || sending) return;

    setSending(true);
    const body = draft.trim();
    const { data, error } = await sendMessage(activeConversationId, myId, body);
    setSending(false);

    if (!error && data) {
      setDraft('');
      setMessages((prev) => (prev.some((m) => m.id === data.id) ? prev : [...prev, data as MessageRow]));
    }
  };

  const conversationLabel = (c: ConversationRow) =>
    userRole === 'professional'
      ? c.client?.company_name || c.client?.full_name || tx('عميل', 'Client', 'Client')
      : c.professional?.full_name || tx('مهني', 'Professionnel', 'Professional');

  const conversationInitials = (c: ConversationRow) =>
    (conversationLabel(c) || '??').substring(0, 2).toUpperCase();

  const conversationAvatar = (c: ConversationRow) =>
    userRole === 'professional' ? c.client?.avatar_url : c.professional?.avatar_url;

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  if (!myId) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F8FAFF] py-8 px-4" dir={direction}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight flex items-center gap-2 mb-6">
          <MessageSquare className="w-6 h-6 text-brand-primary" />
          {tx('الرسائل', 'Messagerie', 'Messages')}
        </h1>

        <div className="bg-white border border-blue-200 rounded-2xl shadow-classic grid grid-cols-1 md:grid-cols-[280px_1fr] h-[70vh] overflow-hidden">

          {/* Conversation list */}
          <div className="border-b md:border-b-0 md:border-e border-blue-100 overflow-y-auto">
            {conversationsLoading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />
              </div>
            ) : conversations.length === 0 ? (
              <p className="text-sm text-slate-500 p-4 text-center">
                {tx('لا توجد محادثات بعد.', 'Aucune conversation pour le moment.', 'No conversations yet.')}
              </p>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSearchParams({ c: c.id })}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-b border-blue-50 text-start hover:bg-blue-50/60 transition ${c.id === activeConversationId ? 'bg-blue-50' : ''}`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-xs shrink-0">
                    {conversationAvatar(c) ? (
                      <img src={conversationAvatar(c)!} alt="" className="w-full h-full object-cover" />
                    ) : (
                      conversationInitials(c)
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{conversationLabel(c)}</p>
                    <p className="text-xs text-slate-400 truncate">{new Date(c.last_message_at).toLocaleString(language)}</p>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Active thread */}
          <div className="flex flex-col min-h-0">
            {!activeConversationId ? (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                {tx('اختر محادثة لعرضها.', 'Sélectionnez une conversation.', 'Select a conversation.')}
              </div>
            ) : (
              <>
                <div className="px-4 py-3 border-b border-blue-100 flex items-center gap-2 shrink-0">
                  <User2 className="w-4 h-4 text-brand-primary" />
                  <span className="font-bold text-slate-800 text-sm">
                    {activeConversation ? conversationLabel(activeConversation) : ''}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messagesLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />
                    </div>
                  ) : (
                    messages.map((m) => {
                      const mine = m.sender_id === myId;
                      return (
                        <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm ${mine ? 'bg-brand-primary text-white' : 'bg-blue-50 text-slate-800 border border-blue-100'}`}>
                            <p className="whitespace-pre-line">{m.body}</p>
                            <p className={`text-[10px] mt-1 ${mine ? 'text-white/70' : 'text-slate-400'}`}>
                              {new Date(m.created_at).toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="border-t border-blue-100 p-3 flex items-center gap-2 shrink-0">
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={tx('اكتب رسالة...', 'Écrire un message...', 'Write a message...')}
                    className="flex-1 border border-blue-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-brand-primary"
                  />
                  <button
                    type="submit"
                    disabled={sending || !draft.trim()}
                    className="p-2.5 bg-brand-primary hover:bg-brand-dark disabled:opacity-60 text-white rounded-lg transition"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
