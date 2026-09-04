import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, CheckCircle2, ArrowRight, DollarSign, MapPin, Sparkles, Truck, ShieldCheck, UserCheck } from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';

export const SmartPoolPage: React.FC = () => {
  const { smartPool, setDemoStep } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleNextStep = () => {
    setDemoStep(4);
    navigate('/farmer/realization/prod-1');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH Step 3: Small-Farmer Supply Aggregation</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {t.poolTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.poolSub}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs">
              {smartPool.poolCode}
            </span>
            <StatusBadge type="pool_complete" label="100% READY FOR DELIVERY" />
          </div>
        </div>
      </div>

      {/* Main Aggregation Progress & Target Buyer Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Pool Progress & Farmers List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Visual Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-brand-600" />
                <span>Aggregated Supply Progress</span>
              </span>
              <span className="text-emerald-700 font-extrabold text-sm">
                {smartPool.collectedQuantity} / {smartPool.requiredQuantity} kg (100%)
              </span>
            </div>

            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: '100%' }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
              <span>Shortfall: 0 kg (Target Fulfilled)</span>
              <span>4 Smallholder Farmers Clustered</span>
            </div>
          </div>

          {/* Contributing Farmers Table / Cards */}
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-3 flex items-center justify-between">
              <span>{t.contributingFarmers}</span>
              <span className="text-xs text-slate-400 font-normal">North 24 Parganas Cluster</span>
            </h3>

            <div className="space-y-3">
              {smartPool.farmers.map((farmer, idx) => {
                const isRamesh = farmer.farmerName.includes('Ramesh');
                const percent = Math.round((farmer.quantity / smartPool.requiredQuantity) * 100);

                return (
                  <div
                    key={farmer.farmerId}
                    className={`p-4 rounded-2xl border transition-all text-xs ${
                      isRamesh
                        ? 'bg-brand-50/80 border-brand-300 shadow-xs ring-1 ring-brand-400/40'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-7 h-7 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-xs">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <strong className="text-sm font-bold text-slate-900">{farmer.farmerName}</strong>
                            {isRamesh && (
                              <span className="px-1.5 py-0.2 bg-brand-200 text-brand-900 font-extrabold text-[10px] rounded">
                                YOU
                              </span>
                            )}
                          </div>
                          <p className="text-slate-500 text-[11px] flex items-center mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400 mr-1" />
                            {farmer.village}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-brand-800 block">
                          {farmer.quantity} kg
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {percent}% of pool lot
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            💬 <strong>Why Pooling Works:</strong> Individual small farmers producing 80–150 kg cannot supply large supermarket networks directly. Khet-Setu clusters them into a single 500 kg batch, unlocking wholesale pricing of <strong>₹30/kg</strong> without middleman cuts.
          </div>

        </div>

        {/* Right 4 Cols: Buyer Contract Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-1 bg-brand-500/20 text-brand-400 text-xs font-bold rounded-lg border border-brand-500/30">
              Contracted Buyer
            </span>
            <h2 className="text-2xl font-black mt-3 text-white">{smartPool.buyerName}</h2>
            <p className="text-xs text-slate-300 mt-1">{smartPool.buyerType} • Kolkata Wholesale Hub</p>

            <div className="space-y-3 mt-6 text-xs text-slate-200">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Total Purchase Lot:</span>
                <strong className="text-white font-bold">{smartPool.requiredQuantity} kg Tomato</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Quality Grade:</span>
                <strong className="text-white font-bold">{smartPool.grade}</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Guaranteed Purchase Rate:</span>
                <strong className="text-emerald-400 font-black text-sm">₹{smartPool.agreedPrice} / kg</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Total Lot Gross Value:</span>
                <strong className="text-white font-extrabold">₹{smartPool.requiredQuantity * smartPool.agreedPrice}</strong>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Scheduled Dispatch:</span>
                <strong className="text-white font-bold">03 Sept 2026</strong>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
            <button
              onClick={handleNextStep}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-500/20 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
            >
              <DollarSign className="w-4 h-4" />
              <span>{t.calculateRealizationBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
