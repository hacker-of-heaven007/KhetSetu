import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Building, Truck, ArrowRight, ShieldCheck, Clock, MapPin, Sparkles, TrendingUp } from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';

export const OrderConfirmedPage: React.FC = () => {
  const { activeOrder, setUserRole } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSwitchToBuyer = () => {
    setUserRole('BUYER');
    navigate('/buyer/orders');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Confirmed Success Banner */}
      <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-emerald-600/20 text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 mb-4">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 block">
          SIH Step 6: Guaranteed Order Execution
        </span>
        <h1 className="text-3xl sm:text-4xl font-black mt-1">{t.orderConfirmedTitle} ✓</h1>
        <p className="text-emerald-100 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
          {t.orderConfirmedSub} Order Reference: <strong className="text-white font-mono">{activeOrder.orderNumber}</strong>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={handleSwitchToBuyer}
            className="px-6 py-3 bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all"
          >
            <Building className="w-4 h-4 text-emerald-700" />
            <span>{t.viewInBuyerDashboard}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Order Details & Agreement Specs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Contract Specs */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Purchase Agreement Summary</h2>
              <p className="text-xs text-slate-500">Guaranteed institutional buyback contract</p>
            </div>
            <StatusBadge type="verified" label="Digitally Sealed" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Crop & Lot Size</span>
              <strong className="text-sm font-bold text-slate-900">{activeOrder.totalQuantityKg} kg {activeOrder.crop}</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Quality Standard</span>
              <strong className="text-sm font-bold text-slate-900">{activeOrder.grade}</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Buyer Institution</span>
              <strong className="text-sm font-bold text-slate-900">{activeOrder.buyerName}</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Agreed Wholesale Price</span>
              <strong className="text-sm font-black text-emerald-700">₹{activeOrder.agreedPricePerKg} / kg</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Estimated Net Realization</span>
              <strong className="text-sm font-black text-brand-700">₹{activeOrder.estimatedNetRealizationPerKg} / kg</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Optimized Transit</span>
              <strong className="text-sm font-bold text-slate-900">39.4 km ({activeOrder.estimatedDeliveryTime})</strong>
            </div>
          </div>

          {/* AI Outcome Calibration Loop Box (SIH Phase 28 Spec) */}
          {activeOrder.predictionComparison && (
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 text-xs text-purple-900 space-y-1.5">
              <div className="flex items-center space-x-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-purple-700" />
                <span>AI Demand Model Calibration Loop (Feedback Loop)</span>
              </div>
              <p className="text-[11px] text-purple-800">
                Predicted Demand: <strong>{activeOrder.predictionComparison.predictedKg} kg</strong> | Actual Realized Order: <strong>{activeOrder.predictionComparison.actualKg} kg</strong>
              </p>
              <div className="flex items-center justify-between text-[11px] font-semibold text-purple-950 pt-1 border-t border-purple-200">
                <span>Prediction Variance: ±{activeOrder.predictionComparison.errorKg} kg</span>
                <span className="text-purple-700 font-bold">Accuracy: 93.3% ({activeOrder.predictionComparison.percentageError}% error)</span>
              </div>
            </div>
          )}

        </div>

        {/* Right 5 Cols: Step-by-Step Order Timeline */}
        <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h3 className="font-extrabold text-slate-900 text-sm mb-4">{t.orderTimelineTitle}</h3>

          <div className="space-y-4 text-xs">
            {activeOrder.timeline.map((item, idx) => {
              const isDone = item.status === 'completed';
              const isCurrent = item.status === 'current';

              return (
                <div key={item.id} className="flex items-start space-x-3 relative">
                  {/* Vertical connector line */}
                  {idx < activeOrder.timeline.length - 1 && (
                    <span className={`absolute left-3 top-6 bottom-0 w-0.5 ${isDone ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  )}

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 font-bold text-[10px] ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-brand-600 text-white ring-4 ring-brand-100 animate-pulse'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}>
                    {isDone ? '✓' : idx + 1}
                  </div>

                  <div className="pb-2">
                    <p className={`font-bold ${isDone ? 'text-slate-900' : 'text-slate-500'}`}>
                      {item.label}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.description}</p>
                    {item.timestamp && (
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                        {item.timestamp}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
