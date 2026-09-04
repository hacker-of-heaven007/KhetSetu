import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  Plus,
  CheckCircle2,
  Layers,
  MapPin,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Clock,
  FileText
} from 'lucide-react';
import { MetricCard } from '../../components/MetricCard';
import { StatusBadge } from '../../components/StatusBadge';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';

export const BuyerDashboard: React.FC = () => {
  const {
    activeDemand,
    smartPool,
    deliveryRoute,
    acceptBuyerSupply,
    activeOrder,
    setDemoStep,
    selectedBuyer,
    selectedBuyerId,
    selectBuyer,
    buyers,
    demands
  } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAcceptSupply = () => {
    acceptBuyerSupply();
    setDemoStep(6);
    // FIX: Navigate to dedicated buyer orders page instead of farmer orders!
    navigate('/buyer/orders');
  };

  const currentDemands = demands.filter(d => d.buyerId === selectedBuyerId);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Buyer Header with Switcher */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {selectedBuyer.businessName}
              </h1>
              <StatusBadge type="verified" label={`Verified ${selectedBuyer.buyerType}`} />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center space-x-2 flex-wrap">
              <span>{selectedBuyer.location}</span>
              <span>•</span>
              <span>Reliability Score: <strong className="text-emerald-700 font-bold">{selectedBuyer.reliabilityScore}%</strong></span>
              <span>•</span>
              <span>Procuring directly from village farm pools</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => navigate('/buyer/orders')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl shadow-2xs flex items-center space-x-1.5 transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>View Purchase Orders</span>
            </button>
            <button
              onClick={() => navigate('/buyer/demand/create')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Demand</span>
            </button>
          </div>
        </div>

        {/* Switch Buyer Profile Tabs for SIH Demonstration */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-slate-500">🏢 Select Buyer Institution:</span>
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

      {/* 4 Buyer Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Open Demands"
          value={currentDemands.length ? String(currentDemands.length) : '1'}
          subtitle="Active Procurement Lots"
          icon={Building}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <MetricCard
          title="Matched Supply"
          value={`${smartPool.collectedQuantity} kg`}
          subtitle={`${smartPool.farmers.length} Farmers Clustered`}
          icon={Layers}
          iconBgColor="bg-brand-50"
          iconColor="text-brand-600"
          trend={{ value: '100% Filled', isPositive: true }}
        />
        <MetricCard
          title="Active Logistics"
          value={`${deliveryRoute.optimizedDistanceKm} km`}
          subtitle={`ETA ~${deliveryRoute.estimatedTimeMinutes} mins`}
          icon={Truck}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        <MetricCard
          title="Direct Village Partners"
          value={`${selectedBuyer.successfulTransactions + 14}`}
          subtitle="Verified Smallholders"
          icon={ShieldCheck}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Primary Highlighted Matched Pool Supply Card */}
      <div className="bg-white rounded-3xl border-2 border-blue-500/20 p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Farm Aggregated Supply Ready For Procurement</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {smartPool.crop} Demand Lot — {smartPool.collectedQuantity} kg ({smartPool.grade})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Matched with {smartPool.farmers.length} clustered smallholder farmers at <strong>₹{smartPool.agreedPrice}/kg</strong> guaranteed wholesale buyback price.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-xl bg-blue-100 text-blue-900 font-mono font-bold text-xs">
              {smartPool.poolCode}
            </span>
            <StatusBadge type="pool_complete" label="100% READY FOR DELIVERY" />
          </div>
        </div>

        {/* Farmer Pool Contributions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Clustered Village Farmer Suppliers</span>
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
              Total: {smartPool.collectedQuantity} kg
            </span>
          </div>

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
                  <span>Quality Grade A Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Route & Delivery Specs & Confirm CTA */}
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <strong className="text-slate-900 font-extrabold text-sm block">
              Optimized Group Logistics Route Scheduled
            </strong>
            <p className="text-slate-600">
              Tata Ace multi-pickup van ({deliveryRoute.optimizedDistanceKm} km, ~{deliveryRoute.estimatedTimeMinutes} mins) scheduled to deliver directly to <strong>{smartPool.deliveryLocation}</strong>.
            </p>
          </div>

          <button
            onClick={handleAcceptSupply}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/30 flex items-center justify-center space-x-2 shrink-0 transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Accept Supply & Confirm Purchase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Active Buyer Demands Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              My Active Procurement Lots
            </h3>
            <p className="text-xs text-slate-500">
              Live status of demands posted to the Khet-Setu farmer pooling network
            </p>
          </div>
          <button
            onClick={() => navigate('/buyer/demand/create')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Lot</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold text-[11px]">
                <th className="pb-3 font-semibold">Crop & Lot Size</th>
                <th className="pb-3 font-semibold">Quality Standard</th>
                <th className="pb-3 font-semibold">Max Target Price</th>
                <th className="pb-3 font-semibold">Delivery Hub</th>
                <th className="pb-3 font-semibold">Pooling Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 font-bold text-slate-900">
                  {smartPool.crop} ({smartPool.collectedQuantity} kg)
                </td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 text-[11px]">
                    {smartPool.grade}
                  </span>
                </td>
                <td className="py-3.5 font-bold text-slate-900">
                  ₹{smartPool.agreedPrice} / kg
                </td>
                <td className="py-3.5 text-slate-500">
                  {smartPool.deliveryLocation}
                </td>
                <td className="py-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] inline-flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>100% Pooled</span>
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={handleAcceptSupply}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                  >
                    Review & Purchase
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
