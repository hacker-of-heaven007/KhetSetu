import React from 'react';
import { MatchScoreBreakdown as BreakdownType } from '../types';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface MatchScoreBreakdownProps {
  score: number;
  breakdown: BreakdownType;
  reasons: string[];
  warnings: string[];
  recommendation: string;
}

export const MatchScoreBreakdown: React.FC<MatchScoreBreakdownProps> = ({
  score,
  breakdown,
  reasons,
  warnings,
  recommendation
}) => {
  const factors = [
    { label: 'Crop Compatibility', current: breakdown.cropCompat, max: 35, weight: '35%' },
    { label: 'Quantity Compatibility', current: breakdown.quantityCompat, max: 20, weight: '20%' },
    { label: 'Quality / Grade', current: breakdown.qualityCompat, max: 15, weight: '15%' },
    { label: 'Geographic Distance', current: breakdown.distanceCompat, max: 15, weight: '15%' },
    { label: 'Target Price Alignment', current: breakdown.priceCompat, max: 10, weight: '10%' },
    { label: 'Buyer Reliability Rating', current: breakdown.reliabilityCompat, max: 5, weight: '5%' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold text-brand-700">{score}%</span>
            <div>
              <p className="font-bold text-slate-900 leading-tight">Overall Match</p>
              <p className="text-[11px] text-slate-500 font-medium">Prototype matching score</p>
            </div>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-brand-100 text-brand-800 text-xs font-bold rounded-lg border border-brand-200 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>High Compatibility</span>
        </span>
      </div>

      {/* 6-Factor Formula Progress Bars */}
      <div className="space-y-3 mb-5">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Formula Breakdown (Weightage)</p>
        {factors.map(f => {
          const percent = Math.round((f.current / f.max) * 100);
          return (
            <div key={f.label} className="text-xs">
              <div className="flex justify-between font-medium text-slate-600 mb-1">
                <span>{f.label} ({f.weight})</span>
                <span className="font-bold text-slate-800">{f.current}/{f.max} pts</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Explainable Insights: Reasons & Warnings */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2.5">
        <p className="font-bold text-slate-800 uppercase tracking-wider">Match Explainability Analysis</p>
        
        <div className="space-y-1.5">
          {reasons.map((r, i) => (
            <div key={i} className="flex items-center space-x-2 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{r}</span>
            </div>
          ))}
          {warnings.map((w, i) => (
            <div key={i} className="flex items-center space-x-2 text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold">{w}</span>
            </div>
          ))}
        </div>

        {/* Highlighted Recommendation */}
        <div className="pt-2 border-t border-slate-200/80 mt-2">
          <p className="text-slate-500 text-[11px]">System Recommendation:</p>
          <p className="font-extrabold text-brand-800 text-xs mt-0.5">{recommendation}</p>
        </div>
      </div>

    </div>
  );
};
