'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';
import { useIsAdminPage } from '../hooks/useIsAdminPage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Bonjour ! Je suis l'assistant virtuel de l'Atelier Vents et Courbes. Comment puis-je vous aider ? Cours, stages, formations pro, tarifs... je suis là pour répondre à vos questions !",
};

const Chatbot = () => {
  const isAdminPage = useIsAdminPage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  if (isAdminPage) return null;

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/chatbot`;
      const conversationHistory = updatedMessages
        .filter((m) => m !== WELCOME_MESSAGE)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Désolé, je rencontre un problème technique. Contactez-nous directement par WhatsApp ou email !",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        urlRegex.lastIndex = 0;
        const label = part.includes('wa.me') ? 'WhatsApp' : part.replace(/https?:\/\//, '');
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C4553C] underline hover:text-[#B3462F] transition-colors"
          >
            {label}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:right-5 w-[calc(100vw-2rem)] max-w-[380px] bg-white rounded-2xl shadow-2xl z-[1001] flex flex-col chatbot-panel overflow-hidden border border-gray-100"
          style={{ maxHeight: 'min(520px, calc(100vh - 120px))' }}
        >
          <div className="bg-gradient-to-r from-[#C4553C] to-[#D56449] px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight">
                  Vents & Courbes
                </h3>
                <p className="text-white/80 text-xs">Assistant virtuel</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#C4553C] text-white rounded-2xl rounded-br-md'
                      : 'bg-stone-100 text-gray-800 rounded-2xl rounded-bl-md'
                  }`}
                >
                  {formatMessage(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-100 text-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-2 border-t border-gray-100 bg-stone-50 flex-shrink-0">
            <a
              href="https://wa.me/33680893927"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-green-600 transition-colors flex-shrink-0"
              title="Contacter par WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@ventsetcourbes.org"
              className="p-2 text-gray-400 hover:text-[#C4553C] transition-colors flex-shrink-0"
              title="Envoyer un email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question..."
              disabled={isLoading}
              className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-base focus:outline-none focus:border-[#C4553C] focus:ring-1 focus:ring-[#C4553C]/30 transition-all disabled:opacity-50 min-w-0"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="p-2 text-white bg-[#C4553C] rounded-full hover:bg-[#B3462F] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-button hidden md:flex"
        title={isOpen ? 'Fermer le chat' : "Discuter avec l'assistant"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" strokeWidth={2} />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
        )}
        {!isOpen && <div className="chatbot-pulse" />}
      </button>
    </>
  );
};

export default Chatbot;
