import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Sparkles, Building, Sprout } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { useLanguage } from '../context/LanguageContext';

export const DemoWorkflowBar: React.FC = () => {
  const { demoStep, setDemoStep, userRole } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const isBuyerRoute = location.pathname.startsWith('/buyer') || userRole === 'BUYER';

  const farmerSteps = [
    { num: 1, label: t.step1Demand, path: '/farmer/dashboard', desc: '500 kg Demand' },
    { num: 2, label: t.step2Match, path: '/farmer/matches', desc: '94% Match' },
    { num: 3, label: t.step3Pool, path: '/farmer/pool/pool-1', desc: '100% Aggregation' },
    { num: 4, label: t.step4Realization, path: '/farmer/realization/prod-1', desc: '₹25.95/kg Net' },
    { num: 5, label: t.step5Delivery, path: '/farmer/route/route-1', desc: '39.4 km Route' },
    { num: 6, label: t.step6Order, path: '/farmer/orders/ord-1001', desc: 'Guaranteed Buy' }
  ];

  const buyerSteps = [
    { num: 1, label: '1. Demand', path: '/buyer/demand/create', desc: 'Post Bulk Lot' },
    { num: 2, label: '2. AI Sourcing', path: '/buyer/dashboard', desc: 'Farm Matching' },
    { num: 3, label: '3. Farm Pool', path: '/buyer/supply', desc: 'Clustered Farms' },
    { num: 4, label: '4. Quality Audit', path: '/buyer/supply', desc: 'Grade A Sealed' },
    { num: 5, label: '5. Fleet Transit', path: '/buyer/orders', desc: 'Direct Dispatch' },
    { num: 6, label: '6. PO Confirmed', path: '/buyer/orders', desc: 'Escrow Settlement' }
  ];

  const currentSteps = isBuyerRoute ? buyerSteps : farmerSteps;

  const handleStepClick = (stepNum: number, path: string) => {
    setDemoStep(stepNum);
    navigate(path);
  };

  return (
    <div className="bg-white border-b border-slate-200 py-3 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isBuyerRoute ? 'bg-blue-400' : 'bg-brand-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isBuyerRoute ? 'bg-blue-500' : 'bg-brand-500'}`}></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1">
              {isBuyerRoute ? <Building className="w-3.5 h-3.5 text-blue-600 inline" /> : <Sprout className="w-3.5 h-3.5 text-brand-600 inline" />}
              <span>{isBuyerRoute ? 'Buyer Procurement Workflow' : t.workflowPipeline}</span>
            </span>
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded border hidden sm:inline-flex items-center space-x-1 ${
            isBuyerRoute ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-brand-700 bg-brand-50 border-brand-200'
          }`}>
            <Sparkles className={`w-3 h-3 ${isBuyerRoute ? 'text-blue-600' : 'text-brand-600'}`} />
            <span>
              {isBuyerRoute
                ? 'Demand → AI Sourcing → Farm Pool → Quality Audit → Fleet Transit → PO Confirmed'
                : 'Demand → Match → Pool → Realization → Delivery → Order'}
            </span>
          </span>
        </div>

        {/* Horizontal Step Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {currentSteps.map(step => {
            const isCompleted = step.num < demoStep;
            const isCurrent = step.num === demoStep;

            return (
              <button
                key={step.num}
                onClick={() => handleStepClick(step.num, step.path)}
                className={`p-2 rounded-xl text-left border transition-all text-xs relative ${
                  isCurrent
                    ? isBuyerRoute
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-2xs'
                      : 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/20 shadow-2xs'
                    : isCompleted
                    ? 'bg-emerald-50/70 border-emerald-300 text-slate-700 hover:bg-emerald-100/50'
                    : 'bg-slate-50/70 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`font-bold ${
                    isCurrent
                      ? isBuyerRoute ? 'text-blue-800' : 'text-brand-800'
                      : isCompleted ? 'text-emerald-800' : 'text-slate-600'
                  }`}>
                    {step.label}
                  </span>
                  {isCompleted && (
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                  {isCurrent && (
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isBuyerRoute ? 'bg-blue-600' : 'bg-brand-600'}`}></span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate">{step.desc}</p>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
