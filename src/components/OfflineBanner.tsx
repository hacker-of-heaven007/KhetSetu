import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OfflineBannerProps {
  isOffline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOffline }) => {
  const { t } = useLanguage();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2.5 shadow-md flex items-center justify-between text-xs font-semibold">
      <div className="flex items-center space-x-2">
        <WifiOff className="w-4 h-4 animate-bounce shrink-0" />
        <span>
          <strong>{t.offlineTitle}:</strong> {t.offlineDesc}
        </span>
      </div>
      <span className="bg-amber-700/20 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1">
        <RefreshCw className="w-3 h-3 animate-spin" />
        <span>IndexedDB Cache Ready</span>
      </span>
    </div>
  );
};
