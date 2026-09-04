import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, ArrowRight, TrendingUp, ShieldAlert, Sparkles, Truck, CheckCircle2 } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';
import { calculateNetRealization } from '../../utils/calculations';

export const NetRealizationPage: React.FC = () => {
  const { currentFarmer, activeProduce, setDemoStep } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // 120 kg Tomato @ ₹30/kg FreshMart Buyer Price
  const realization = calculateNetRealization(
    activeProduce.quantity || 120,
    30,
    18,
    currentFarmer.name,
    activeProduce.crop || 'Tomato'
  );

  const handleNextStep = () => {
    setDemoStep(5);
    navigate('/farmer/route/route-1');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH Step 4: Transparent Net Realization Engine</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {t.netRealizationTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.netRealizationSub}
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 text-right shrink-0">
            <span className="text-[11px] text-emerald-800 font-semibold block">True Net in Farmer Pocket</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">
              ₹{realization.netRealizationPerKg} / kg
            </span>
          </div>
        </div>
      </div>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Exact Financial Itemization */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Financial Breakdown Analysis</h2>
              <p className="text-xs text-slate-500">Based on {realization.quantityKg} kg {realization.crop} harvest</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              FreshMart @ ₹{realization.buyerGrossPricePerKg}/kg
            </span>
          </div>

          {/* Line by Line Calculation */}
          <div className="space-y-3 text-xs">
            
            {/* Gross Sale Value */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100 font-bold text-slate-900 text-sm">
              <span>Gross Sale Value ({realization.quantityKg} kg × ₹{realization.buyerGrossPricePerKg})</span>
              <span className="text-base text-slate-950 font-extrabold">₹{realization.grossSaleValue.toLocaleString()}</span>
            </div>

            {/* Deductions */}
            <div className="space-y-2.5 text-slate-600 pt-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>{t.logisticsDeduction}</span>
                </span>
                <span className="font-semibold text-rose-600">−₹{realization.logisticsCost}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>{t.handlingDeduction}</span>
                </span>
                <span className="font-semibold text-rose-600">−₹{realization.handlingCost}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>{t.platformDeduction}</span>
                </span>
                <span className="font-semibold text-rose-600">−₹{realization.platformFee}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>{t.perishabilityDeduction}</span>
                </span>
                <span className="font-semibold text-rose-600">−₹{realization.expectedLoss}</span>
              </div>
            </div>

            {/* Total Net Realization Summary */}
            <div className="mt-4 pt-4 border-t-2 border-slate-900 bg-brand-50/70 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <strong className="text-slate-900 text-sm font-black block">{t.totalNetPayout}</strong>
                <span className="text-[11px] text-slate-500">Credited to farmer bank via UPI / DBT</span>
              </div>
              <div className="text-right">
                <strong className="text-2xl font-black text-brand-800 block">
                  ₹{realization.estimatedNetValue.toLocaleString()}
                </strong>
                <span className="text-xs font-extrabold text-emerald-700">
                  (₹{realization.netRealizationPerKg} / kg net)
                </span>
              </div>
            </div>

          </div>

          <p className="text-[11px] text-slate-400 italic">
            * Prototype estimate based on demonstration data for SIH evaluation.
          </p>

        </div>

        {/* Right 5 Cols: Traditional Middleman Comparison Card */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">
              Middleman Impact Benchmark
            </span>

            <h3 className="text-xl font-black mt-3">Why Khet-Setu Outperforms</h3>
            <p className="text-xs text-slate-300 mt-1">
              Comparing your 120 kg Tomato earnings on Khet-Setu vs local mandi broker.
            </p>

            <div className="space-y-4 mt-6 text-xs">
              
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[11px]">Local Village Middleman / Arhatiya</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-slate-300">Rate: ₹20.00 / kg</span>
                  <strong className="text-base text-rose-300 font-bold">₹2,400 Total</strong>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Hidden deductions & under-weighing</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40">
                <span className="text-emerald-300 block text-[11px] font-bold">Khet-Setu Direct Pooled Realization</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-emerald-200">Rate: ₹25.95 / kg (Net)</span>
                  <strong className="text-xl text-emerald-400 font-black">₹3,114 Total</strong>
                </div>
                <p className="text-[10px] text-emerald-300/80 mt-1">Direct wholesale connection</p>
              </div>

              <div className="pt-2 text-center bg-emerald-950/80 p-3 rounded-2xl border border-emerald-500/30">
                <span className="text-[11px] text-emerald-300 uppercase tracking-wider font-bold">Net Farmer Benefit</span>
                <p className="text-2xl font-black text-white mt-0.5">
                  +₹{realization.middlemanComparison.extraEarningsWithKhetSetu} Extra
                </p>
                <span className="text-xs text-emerald-400 font-extrabold">
                  (+{realization.middlemanComparison.percentageIncrease}% higher take-home profit)
                </span>
              </div>

            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800">
            <button
              onClick={handleNextStep}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-500/20 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
            >
              <Truck className="w-4 h-4" />
              <span>{t.optimizeDeliveryBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
