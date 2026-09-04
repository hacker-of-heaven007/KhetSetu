import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, BarChart3 } from 'lucide-react';
import { DEMO_DEMAND_PREDICTION } from '../../data/demoData';

export const DemandIntelligencePage: React.FC = () => {
  const navigate = useNavigate();
  const prediction = DEMO_DEMAND_PREDICTION;

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Predictive Analytics Module</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Demand Intelligence & Price Forecasting
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Aggregating historical mandi trends, buyer requests, and seasonal seasonality.
          </p>
        </div>

        <span className="px-3 py-1.5 bg-purple-100 text-purple-800 text-xs font-bold rounded-xl border border-purple-200 shrink-0">
          Prototype prediction using demonstration data
        </span>
      </div>

      {/* Main Prediction Highlight Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Demand Forecast */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="flex items-start justify-between border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Target Crop Analysis</span>
              <h2 className="text-2xl font-black text-slate-900 mt-0.5">{prediction.crop} (Solanum lycopersicum)</h2>
              <p className="text-xs text-slate-500">{prediction.region}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{prediction.trend}</span>
              </span>
              <p className="text-[10px] text-slate-400 mt-1">{prediction.confidenceScore}% Confidence</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Expected Market Demand</span>
              <strong className="text-2xl font-black text-slate-900 mt-1 block">{prediction.expectedDemandKg.toLocaleString()} kg</strong>
              <span className="text-[11px] text-emerald-600 font-semibold">+24% vs last month</span>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200">
              <span className="text-brand-800 block text-[11px] font-semibold">Recommended Farm Supply</span>
              <strong className="text-2xl font-black text-brand-900 mt-1 block">{prediction.recommendedSupplyKg}</strong>
              <span className="text-[11px] text-brand-700 font-medium">Optimal pool batch</span>
            </div>
          </div>

          {/* Key Interpretable Factors */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
              Why is demand expected to increase? (Interpretable Drivers)
            </h3>

            <div className="space-y-2 text-xs">
              {prediction.keyFactors.map((kf, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    ↑
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">{kf.factor}</strong>
                    <p className="text-slate-500 text-[11px] mt-0.5">{kf.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 5 Cols: Wholesale Price Forecast & Calibration Feedback */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Price Projection Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-brand-600" />
              <span>Wholesale Price Projection</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Current Spot Price:</span>
                <strong className="text-slate-900 text-sm font-black">₹{prediction.priceForecastPerKg.current} / kg</strong>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-emerald-800 font-medium">Next Week Forecast:</span>
                <strong className="text-emerald-700 text-sm font-black">₹{prediction.priceForecastPerKg.nextWeek} / kg</strong>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Next Month Target:</span>
                <strong className="text-slate-900 text-sm font-black">₹{prediction.priceForecastPerKg.nextMonth} / kg</strong>
              </div>
            </div>
          </div>

          {/* Continuous Model Calibration Loop */}
          <div className="bg-gradient-to-br from-slate-900 to-purple-950 text-white rounded-3xl p-6 shadow-xs space-y-3 text-xs">
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-bold rounded uppercase tracking-wider">
              Feedback Loop Architecture
            </span>
            <h4 className="text-base font-black text-white">Prediction → Transaction → Calibration</h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Every executed order is stored back into the system to compare predicted vs actual tonnage and continuously calibrate weights.
            </p>

            <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] font-semibold text-purple-200">
              <span>Historical Accuracy:</span>
              <strong className="text-white font-bold">93.3% Precision</strong>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
