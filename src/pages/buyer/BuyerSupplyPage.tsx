import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  CheckCircle2,
  MapPin,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Plus,
  Scale
} from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';

export const BuyerSupplyPage: React.FC = () => {
  const {
    smartPool,
    deliveryRoute,
    acceptBuyerSupply,
    setDemoStep,
    selectedBuyer,
    selectedBuyerId,
    selectBuyer,
    buyers
  } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handlePurchasePool = () => {
    acceptBuyerSupply();
    setDemoStep(6);
    navigate('/buyer/orders');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header with Buyer Selector */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIH Step 3 & 4: Aggregated Farm-Gate Supply</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Matched Farmer Supply Pools
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Directly procure aggregated crop lots from smallholder farmer clusters with guaranteed quality verification.
            </p>
          </div>

          <button
            onClick={() => navigate('/buyer/demand/create')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center space-x-1.5 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Bulk Demand</span>
          </button>
        </div>

        {/* Switch Active Buyer Tabs */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-slate-500">Procuring As:</span>
          {buyers.map(b => (
            <button
              key={b.id}
              onClick={() => selectBuyer(b.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedBuyerId === b.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {b.businessName}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Primary Ready-to-Deliver Supply Lot */}
      <div className="bg-white rounded-3xl border-2 border-blue-500/30 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 font-mono font-bold text-xs">
                {smartPool.poolCode}
              </span>
              <StatusBadge type="pool_complete" label="100% SUPPLY AGGREGATED" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {smartPool.collectedQuantity} kg {smartPool.crop} ({smartPool.grade})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Aggregated from {smartPool.farmers.length} smallholder farmers in North 24 Parganas at ₹{smartPool.agreedPrice}/kg fixed wholesale buyback rate.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Total Lot Value</span>
            <span className="text-2xl font-black text-slate-900">
              ₹{(smartPool.collectedQuantity * smartPool.agreedPrice).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Contributing Farmers Breakdown */}
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm mb-3 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Clustered Smallholder Suppliers</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {smartPool.farmers.map((farmer, idx) => (
              <div key={farmer.farmerId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex justify-between items-start">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                    #{idx + 1}
                  </span>
                  <span className="font-extrabold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded text-[11px]">
                    {farmer.quantity} kg
                  </span>
                </div>
                <strong className="text-slate-900 block font-bold text-sm mt-2">{farmer.farmerName}</strong>
                <p className="text-slate-500 text-[11px] mt-0.5">{farmer.village}</p>
                <div className="mt-2 pt-2 border-t border-slate-200/60 text-[10px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Quality Grade A Passed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route Specs & Purchase CTA Bar */}
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <strong className="text-slate-900 font-extrabold text-sm block">
              Optimized Clustered Logistics Scheduled
            </strong>
            <p className="text-slate-600">
              Tata Ace multi-stop collection vehicle ({deliveryRoute.optimizedDistanceKm} km, ~{deliveryRoute.estimatedTimeMinutes} mins transit) scheduled to deliver directly to <strong>{smartPool.deliveryLocation}</strong>.
            </p>
          </div>

          <button
            onClick={handlePurchasePool}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center space-x-2 shrink-0 transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Accept Supply & Confirm Purchase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Additional Regional Sourcing Pools (Simulated Directory) */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">
          Other Compatible Regional Sourcing Pools
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">POOL #KS-1004</span>
                <h4 className="font-extrabold text-slate-900 text-base">Potato (Jyoti Variety) — 1,200 kg</h4>
                <p className="text-slate-500 text-[11px]">Hooghly Cluster • 6 Farmers Clustered</p>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[11px]">
                ₹18.50 / kg
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-slate-500">Destination: Barasat Sorting Yard</span>
              <button
                onClick={handlePurchasePool}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs"
              >
                Inspect & Purchase
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">POOL #KS-1005</span>
                <h4 className="font-extrabold text-slate-900 text-base">Cauliflower (Snowball) — 450 kg</h4>
                <p className="text-slate-500 text-[11px]">Nadia Cluster • 3 Farmers Clustered</p>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[11px]">
                ₹22.00 / kg
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-slate-500">Destination: Ultadanga Wholesale Terminal</span>
              <button
                onClick={handlePurchasePool}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs"
              >
                Inspect & Purchase
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
