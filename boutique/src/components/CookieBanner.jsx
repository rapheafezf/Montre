import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function CookieBanner({ onOpenPrivacy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lemouvement_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lemouvement_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem('lemouvement_cookie_consent', 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-obsidian-900/95 border border-obsidian-700 text-ivory-100 p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-brass-400 shrink-0 mt-0.5" />
        <div className="space-y-3">
          <p className="text-xs text-sand leading-relaxed">
            Nous utilisons des cookies strictement nécessaires au fonctionnement de votre panier et à l’analyse anonyme de navigation, garantissant la sécurité de vos transactions conformément au RGPD.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="px-4 py-1.5 bg-brass-500 hover:bg-brass-400 text-obsidian-950 font-bold text-[11px] uppercase tracking-wider transition-colors"
            >
              Accepter
            </button>
            <button
              onClick={handleRefuse}
              className="px-4 py-1.5 bg-obsidian-800 hover:bg-obsidian-700 text-ivory-200 border border-obsidian-600 text-[11px] uppercase tracking-wider transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={onOpenPrivacy}
              className="text-[11px] text-sand hover:text-brass-300 underline ml-auto transition-colors"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
