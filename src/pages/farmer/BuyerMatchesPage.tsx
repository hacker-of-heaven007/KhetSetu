import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Layers, DollarSign, MapPin, Calendar, CheckCircle2, AlertTriangle, Building, UtensilsCrossed, Store } from 'lucide-react';
import { MatchScoreBreakdown } from '../../components/MatchScoreBreakdown';
import { StatusBadge } from '../../components/StatusBadge';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';
import { generateBuyerOpportunities } from '../../utils/calculations';

export const BuyerMatchesPage: React.FC = () => {
  const { activeProduce, buyers, demands, selectedBuyerId, selectBuyer, setDemoStep } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const opportunities = useMemo(() => {
    return generateBuyerOpportunities(activeProduce, buyers, demands);
  }, [activeProduce, buyers, demands]);

  // Active highlighted opportunity is the one selected by user (or top one)
  const activeOpportunity = opportunities.find(op => op.buyer.id === selectedBuyerId) || opportunities[0];

  const handleSelectBuyerAndProceed = (buyerId: string, step: number = 3) => {
    selectBuyer(buyerId);
    setDemoStep(step);
    if (step === 3) {
      navigate('/farmer/pool/pool-1');
    } else if (step === 4) {
      navigate('/farmer/realization/prod-1');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH Step 2: Smart Demand Matching & Explainability</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {t.smartMatchingTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.smartMatchingSub}
            </p>
          </div>

          <div className="bg-brand-50 border border-brand-200 rounded-2xl px-4 py-3 text-right shrink-0">
            <span className="text-[11px] text-brand-800 font-semibold block">Your Active Produce</span>
            <strong className="text-slate-900 text-sm font-black">
              {activeProduce.quantity} kg {activeProduce.crop} ({activeProduce.grade})
            </strong>
          </div>
        </div>
      </div>

      {/* Buyer Switcher Tabs for Demo Selection */}
      <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
        <span className="text-xs font-bold text-slate-500 px-3 uppercase tracking-wider hidden sm:inline">
          Select Opportunity:
        </span>
        {opportunities.map(op => {
          const isSelected = op.buyer.id === activeOpportunity.buyer.id;
          return (
            <button
              key={op.buyer.id}
              onClick={() => selectBuyer(op.buyer.id)}
              className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center space-x-2 shrink-0 ${
                isSelected
                  ? 'bg-white text-slate-950 shadow-sm border border-slate-300 ring-2 ring-brand-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>{op.buyer.businessName}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                isSelected ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {op.matchScore}%
              </span>
              {op.isBestNetRealization && (
                <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-black">
                  BEST NET
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Section: Currently Selected Buyer Profile & Demand Card */}
      {activeOpportunity && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7 Cols: Buyer Profile & Demand Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-brand-500 p-6 sm:p-8 shadow-md relative flex flex-col justify-between">
            <span className="absolute -top-3 right-6 px-3 py-1 bg-brand-600 text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-sm">
              ★ Active Selected Buyer Opportunity
            </span>

            <div>
              {/* Buyer Name & Badge */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-black text-slate-900">{activeOpportunity.buyer.businessName}</h2>
                    <StatusBadge type="verified" label={`Verified Buyer (${activeOpportunity.buyer.successfulTransactions} Orders)`} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center space-x-2">
                    <span>{activeOpportunity.buyer.buyerType}</span>
                    <span>•</span>
                    <span className="flex items-center text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 mr-1" />
                      {activeOpportunity.buyer.location} ({activeOpportunity.distanceKm} km away)
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-brand-700">{activeOpportunity.matchScore}%</span>
                  <p className="text-[10px] text-slate-400 font-semibold">MATCH SCORE</p>
                </div>
              </div>

              {/* Demand Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Buyer Requirement</span>
                  <strong className="text-sm font-bold text-slate-900">{activeOpportunity.demand.requiredQuantity} kg</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Your Contribution</span>
                  <strong className="text-sm font-bold text-brand-700">
                    {activeProduce.quantity} kg ({Math.round((activeProduce.quantity / activeOpportunity.demand.requiredQuantity) * 100)}%)
                  </strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Offered Buyer Price</span>
                  <strong className="text-sm font-black text-emerald-700">₹{activeOpportunity.demand.targetPrice} / kg</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Quality Required</span>
                  <strong className="text-sm font-bold text-slate-900">{activeOpportunity.demand.quality}</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Delivery Deadline</span>
                  <strong className="text-sm font-bold text-slate-900">{activeOpportunity.demand.requiredDate}</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Estimated Net Realization</span>
                  <strong className="text-sm font-black text-brand-700">₹{activeOpportunity.netRealizationPerKg} / kg</strong>
                </div>
              </div>

              {/* Pooling Guidance Banner */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-extrabold block text-sm">
                    {activeOpportunity.buyer.businessName} Pool Aggregation:
                  </strong>
                  <p className="mt-0.5 text-amber-800">
                    Buyer requires <strong>{activeOpportunity.demand.requiredQuantity} kg</strong>. Your harvest is <strong>{activeProduce.quantity} kg</strong>. Khet-Setu's AI has clustered nearby farmers to fulfill the remaining <strong>{activeOpportunity.demand.requiredQuantity - activeProduce.quantity} kg</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleSelectBuyerAndProceed(activeOpportunity.buyer.id, 4)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1.5"
              >
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Calculate Net Realization</span>
              </button>

              <button
                onClick={() => handleSelectBuyerAndProceed(activeOpportunity.buyer.id, 3)}
                className="w-full sm:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
              >
                <Layers className="w-4 h-4" />
                <span>{t.viewSmartPool} ({activeOpportunity.demand.requiredQuantity} kg)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right 5 Cols: Explainable 6-Factor Formula Breakdown */}
          <div className="lg:col-span-5">
            <MatchScoreBreakdown
              score={activeOpportunity.matchScore}
              breakdown={activeOpportunity.breakdown}
              reasons={activeOpportunity.reasons}
              warnings={activeOpportunity.warnings}
              recommendation={activeOpportunity.recommendation}
            />
          </div>

        </div>
      )}

      {/* Section: Buyer Comparison Table (SIH Phase 11 Spec) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <h2 className="text-xl font-black text-slate-900">{t.compareBuyersTitle}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Khet-Setu compares true net money in farmer hand after logistics and handling rather than quoting blind gross numbers.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 px-3">Buyer Entity</th>
                <th className="pb-3 px-3">{t.grossPriceCol}</th>
                <th className="pb-3 px-3">{t.distanceCol}</th>
                <th className="pb-3 px-3">{t.logisticsCol}</th>
                <th className="pb-3 px-3">{t.lossCol}</th>
                <th className="pb-3 px-3">{t.netRealizationCol}</th>
                <th className="pb-3 px-3">Match Score</th>
                <th className="pb-3 px-3 text-right">{t.actionsCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {opportunities.map(op => {
                const isSelected = op.buyer.id === activeOpportunity.buyer.id;

                return (
                  <tr
                    key={op.buyer.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isSelected ? 'bg-brand-50/60 font-bold' : op.isBestNetRealization ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <td className="py-4 px-3">
                      <div className="flex items-center space-x-2">
                        <div>
                          <strong className="text-slate-900 block font-bold">{op.buyer.businessName}</strong>
                          <span className="text-[11px] text-slate-400">{op.buyer.buyerType} • {op.demand.requiredQuantity} kg required</span>
                        </div>
                        {op.isBestNetRealization && (
                          <StatusBadge type="best_net" label="BEST NET" />
                        )}
                        {isSelected && (
                          <span className="px-1.5 py-0.5 bg-brand-600 text-white rounded text-[9px] font-bold">
                            SELECTED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-3 font-bold text-slate-900">₹{op.demand.targetPrice}/kg</td>
                    <td className="py-4 px-3">{op.distanceKm} km</td>
                    <td className="py-4 px-3 text-rose-600 font-semibold">−₹{op.estimatedLogistics}</td>
                    <td className="py-4 px-3 text-slate-500">−₹{op.estimatedLoss}</td>
                    <td className="py-4 px-3">
                      <span className="text-sm font-extrabold text-emerald-700">
                        ₹{op.netRealizationPerKg}/kg
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2 py-0.5 rounded-full font-extrabold text-xs bg-brand-100 text-brand-800">
                        {op.matchScore}%
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <button
                        onClick={() => handleSelectBuyerAndProceed(op.buyer.id, 3)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-brand-700 text-white shadow-xs'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isSelected ? 'View Pool' : 'Select'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
          💡 <strong>Key Innovation:</strong> Notice how <em>Green Restaurant</em> offers ₹29/kg gross but because it is closer (10 km vs 18 km), it yields ₹26.00/kg net vs FreshMart's ₹25.95/kg net. Khet-Setu empowers farmers with full transparent visibility!
        </div>

      </div>

    </div>
  );
};
