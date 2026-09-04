import React from 'react';
import { Sprout, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 py-8 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-slate-900 text-sm">Khet-Setu</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 font-medium">Smart India Hackathon (SIH 2026 Problem SIH26033)</span>
          </div>

          <div className="text-center md:text-right text-slate-500 space-y-0.5">
            <p>Prototype estimate based on demonstration data for Smart Farm Pooling & Logistics Optimization.</p>
            <p className="text-[11px] text-slate-400">Demand → Match → Pool → Realization → Delivery → Order Lifecycle</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
