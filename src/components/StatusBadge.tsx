import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  type: 'verified' | 'pool_complete' | 'pooling' | 'best_net' | 'grade' | 'status';
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, label, className = '' }) => {
  if (type === 'verified') {
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
        <span>{label || 'Verified'}</span>
      </span>
    );
  }

  if (type === 'pool_complete') {
    return (
      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>{label || '100% POOL COMPLETE'}</span>
      </span>
    );
  }

  if (type === 'pooling') {
    return (
      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 ${className}`}>
        <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
        <span>{label || 'POOL IN PROGRESS'}</span>
      </span>
    );
  }

  if (type === 'best_net') {
    return (
      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs ${className}`}>
        <span>✨ {label || 'BEST NET REALIZATION'}</span>
      </span>
    );
  }

  if (type === 'grade') {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
        {label || 'Grade A'}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200 ${className}`}>
      {label}
    </span>
  );
};
