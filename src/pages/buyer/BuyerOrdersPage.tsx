import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Building,
  Truck,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  TrendingDown,
  Download,
  FileText,
  Phone,
  UserCheck,
  Layers,
  AlertCircle,
  Plus
} from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';

export const BuyerOrdersPage: React.FC = () => {
  const { activeOrder, smartPool, deliveryRoute, selectedBuyer, selectedBuyerId, selectBuyer, buyers, setUserRole } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const totalWholesaleValue = smartPool.collectedQuantity * smartPool.agreedPrice;
  const mandiCost = smartPool.collectedQuantity * (smartPool.agreedPrice + 3); // Traditional mandi is ~₹3/kg costlier due to broker markups
  const buyerSavings = mandiCost - totalWholesaleValue;

  const handleDownloadInvoice = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleSwitchToFarmer = () => {
    setUserRole('FARMER');
    navigate('/farmer/orders/ord-1001');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Buyer Switcher Tabs for Demo Testing */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
          🏢 Institutional Buyer View:
        </span>
        <div className="flex items-center space-x-1.5 flex-wrap">
          {buyers.map(b => (
            <button
              key={b.id}
              onClick={() => selectBuyer(b.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedBuyerId === b.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{b.businessName}</span>
              {selectedBuyerId === b.id && <span className="text-[10px] bg-white/20 px-1 rounded">Active</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Top Confirmed Success Banner (Buyer-Centric) */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg shadow-blue-700/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>SIH Step 6: Institutional Bulk Procurement Sealed</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Purchase Order Confirmed ✓
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-2 max-w-2xl">
              Contract sealed with <strong>{smartPool.farmers.length} smallholder farmers</strong> in the {smartPool.farmers[0]?.village.split(',')[1] || 'North 24 Parganas'} cluster. Clustered mini-truck dispatched for farm collection.
            </p>
            <div className="flex items-center space-x-3 mt-4 text-xs font-mono text-blue-200">
              <span>PO Ref: <strong className="text-white font-bold">{activeOrder.orderNumber.replace('ORD', 'PO')}</strong></span>
              <span>•</span>
              <span>Buyer: <strong className="text-white font-bold">{selectedBuyer.businessName}</strong></span>
              <span>•</span>
              <span>Lot: <strong className="text-white font-bold">{smartPool.collectedQuantity} kg {smartPool.crop} ({smartPool.grade})</strong></span>
            </div>
          </div>

          {/* Quick Actions in Banner */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={handleDownloadInvoice}
              className="px-5 py-2.5 bg-white text-blue-950 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-blue-700" />
              <span>{downloadSuccess ? 'Downloaded Bill ✓' : 'Download Invoice & PO'}</span>
            </button>
            <button
              onClick={() => navigate('/buyer/demand/create')}
              className="px-5 py-2.5 bg-blue-600/60 hover:bg-blue-600 text-white font-bold text-xs rounded-xl border border-blue-400/30 flex items-center justify-center space-x-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Post Another Demand</span>
            </button>
          </div>
        </div>

        {/* Ambient Decorative background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-bold block">Procured Quantity</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {smartPool.collectedQuantity} <span className="text-sm font-bold text-slate-500">{smartPool.unit}</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>100% Demand Fulfilled</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-bold block">Agreed Wholesale Price</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            ₹{smartPool.agreedPrice} <span className="text-sm font-bold text-slate-500">/ kg</span>
          </div>
          <span className="text-[11px] text-blue-700 font-semibold mt-1 inline-flex items-center space-x-1">
            <TrendingDown className="w-3 h-3 text-blue-600" />
            <span>9.2% Below APMC Mandi</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-bold block">Total Commercial Value</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            ₹{totalWholesaleValue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-purple-700 font-semibold mt-1 inline-flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-purple-600" />
            <span>Escrow 24h Settlement</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-bold block">Estimated Arrival</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {deliveryRoute.estimatedTimeMinutes} <span className="text-sm font-bold text-slate-500">mins</span>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-flex items-center space-x-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>ETA: 07:42 AM Tomorrow</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Purchase Contract Specs & Live Fleet Logistics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Commercial Contract & Clustered Suppliers */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Institutional Purchase Contract Agreement Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Institutional Sourcing Agreement Specs
                </h2>
                <p className="text-xs text-slate-500">
                  Direct farm-gate aggregation with digital quality seal
                </p>
              </div>
              <StatusBadge type="verified" label="Digitally Sealed Contract" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Crop & Lot</span>
                <strong className="text-sm font-bold text-slate-900">{smartPool.crop}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Quality Grade</span>
                <strong className="text-sm font-bold text-emerald-700">{smartPool.grade} (Agmark)</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Destination Terminal</span>
                <strong className="text-xs font-bold text-slate-900 truncate block">{smartPool.deliveryLocation}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Agreed Buyback Rate</span>
                <strong className="text-sm font-extrabold text-slate-900">₹{smartPool.agreedPrice} / kg</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Middleman Cost Saved</span>
                <strong className="text-sm font-extrabold text-emerald-700">₹{buyerSavings.toLocaleString('en-IN')}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Quality Assurance</span>
                <strong className="text-xs font-bold text-purple-700">Zero Residue Verified</strong>
              </div>
            </div>

            {/* AI Direct Procurement Savings Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-sm text-emerald-950">
                  AI Procurement Margin Savings: ₹{buyerSavings.toLocaleString('en-IN')} (9.2% Cost Reduction)
                </p>
                <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                  By eliminating multi-tier APMC mandi broker commissions (artiyas) and pooling farm-gate transport, your enterprise pays <strong>₹{smartPool.agreedPrice}/kg</strong> instead of the ₹{(smartPool.agreedPrice + 3).toFixed(2)}/kg mandi wholesale average.
                </p>
              </div>
            </div>

          </div>

          {/* Clustered Farmer Supplier Network Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Clustered Smallholder Suppliers ({smartPool.farmers.length} Farmers)</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Direct traceability: each crate is tagged with individual farmer origin
                </p>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                Total: {smartPool.collectedQuantity} kg
              </span>
            </div>

            <div className="space-y-2.5">
              {smartPool.farmers.map((farmer, idx) => (
                <div
                  key={farmer.farmerId}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between flex-wrap gap-2 text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      #{idx + 1}
                    </span>
                    <div>
                      <strong className="text-slate-900 text-sm block font-bold">{farmer.farmerName}</strong>
                      <span className="text-slate-500 text-[11px] flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{farmer.village}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-blue-900 block">{farmer.quantity} kg</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">Grade A Checked</span>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-emerald-100/70 text-emerald-800 text-[11px] font-bold">
                      Dispatched
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 5 Cols: Fleet Transit Logistics & Verification PIN */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Fleet Transit Tracking Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                  Logistics Execution
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Direct Farm-to-Hub Dispatch
                </h3>
              </div>
              <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold animate-pulse">
                <Truck className="w-3.5 h-3.5" />
                <span>IN TRANSIT</span>
              </span>
            </div>

            {/* Vehicle & Driver Card */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-blue-700 font-bold block">Assigned Transport</span>
                  <strong className="text-slate-900 text-sm font-extrabold">Tata Ace Mini-Truck (WB-25-A-8942)</strong>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 text-[10px] font-bold">GPS Active</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-blue-200/60 text-slate-700">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="font-bold block text-slate-900">Bikram Sen (Driver)</span>
                    <span className="text-[11px] text-slate-500">+91 98310 99412</span>
                  </div>
                </div>
                <a
                  href="tel:9831099412"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>
            </div>

            {/* Route Stops Progress Timeline */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-700 block">
                Cluster Multi-Stop Progress:
              </span>
              
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-300">
                {deliveryRoute.stops.map((stop, idx) => {
                  const isDestination = stop.role === 'BUYER';
                  return (
                    <div key={stop.id} className="relative">
                      <span
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isDestination
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {isDestination ? '🏁' : idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center justify-between">
                          <strong className="text-xs font-bold text-slate-900">{stop.name}</strong>
                          <span className="text-[10px] text-slate-500 font-mono">{stop.arrivalEstimate}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {isDestination ? 'Unloading Dock Terminal' : `Picked up ${stop.quantityKg || 0} kg`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dock Receiving Security PIN */}
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-purple-700 font-bold block">Warehouse Unloading PIN</span>
                <p className="text-[11px] text-purple-800">Share with driver upon cargo quality inspection</p>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-purple-900 text-white font-mono font-black text-base tracking-widest">
                8942
              </span>
            </div>

          </div>

          {/* Quick Switch to Farmer Demo Mode */}
          <div className="bg-slate-100 rounded-3xl p-5 border border-slate-200 text-xs text-slate-600 space-y-3">
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-slate-700" />
              <strong className="text-slate-900 font-bold">Cross-Role SIH Demonstration</strong>
            </div>
            <p className="text-[11px] text-slate-500">
              Want to see how this exact same confirmed order reflects on the Farmer's dashboard and Net Realization payout?
            </p>
            <button
              onClick={handleSwitchToFarmer}
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-all"
            >
              <span>🧑‍🌾 Switch to Farmer View</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
