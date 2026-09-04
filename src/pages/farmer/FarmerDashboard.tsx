import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Users, Layers, TrendingUp, Plus, ArrowRight, ShieldCheck, MapPin, Calendar, Sparkles } from 'lucide-react';
import { MetricCard } from '../../components/MetricCard';
import { StatusBadge } from '../../components/StatusBadge';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';

export const FarmerDashboard: React.FC = () => {
  const { currentFarmer, produceList, buyers, demands, activeProduce, selectBuyer, smartPool, setDemoStep } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSelectBuyerAndGo = (buyerId: string) => {
    selectBuyer(buyerId);
    setDemoStep(2);
    navigate('/farmer/matches');
  };

  const handleFindBuyers = () => {
    setDemoStep(2);
    navigate('/farmer/matches');
  };

  const handleViewPool = () => {
    setDemoStep(3);
    navigate('/farmer/pool/pool-1');
  };

  const handleViewRealization = () => {
    setDemoStep(4);
    navigate('/farmer/realization/prod-1');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.greetingMorning}, {currentFarmer.name.split(' ')[0]} 👋
            </h1>
            <StatusBadge type="verified" label="Verified Farmer" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center space-x-2">
            <span>{t.greetingSub}</span>
            <span>•</span>
            <span className="flex items-center text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-600 mr-1" />
              {currentFarmer.village}, {currentFarmer.district}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/farmer/add-produce')}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-brand-600/30 flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addProduce}</span>
          </button>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={t.availableProduceCard}
          value="120 kg"
          subtitle="Tomato (Grade A) in stock"
          icon={Sprout}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          trend={{ value: 'Ready to Harvest', isPositive: true }}
          onClick={() => navigate('/farmer/produce')}
        />
        <MetricCard
          title={t.potentialBuyersCard}
          value="4"
          subtitle="Wholesale & Retailers Nearby"
          icon={Users}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
          trend={{ value: 'High Demand', isPositive: true }}
          onClick={handleFindBuyers}
        />
        <MetricCard
          title={t.activePoolCard}
          value="1"
          subtitle={`${smartPool.poolCode} (${smartPool.requiredQuantity} kg)`}
          icon={Layers}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
          trend={{ value: '100% Full', isPositive: true }}
          onClick={handleViewPool}
        />
        <MetricCard
          title={t.estimatedNetRealizationCard}
          value="₹3,114"
          subtitle="₹25.95/kg Net (+30% vs Middleman)"
          icon={TrendingUp}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
          trend={{ value: '+₹714 extra', isPositive: true }}
          onClick={handleViewRealization}
        />
      </div>

      {/* Section: Recommended Opportunities (SIH Spec Feature) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2">
              <span>{t.recommendedOpportunities}</span>
              <span className="bg-brand-100 text-brand-800 text-xs px-2 py-0.5 rounded-full font-bold">
                Ranked by Suitability
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live wholesale purchase orders matched with your 120 kg Tomato harvest.
            </p>
          </div>
          <button
            onClick={handleFindBuyers}
            className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center space-x-1"
          >
            <span>View all 4 buyers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Opportunity 1: FreshMart (Top Match 94%) */}
          <div className="bg-brand-50/50 rounded-2xl border-2 border-brand-500 p-5 relative flex flex-col justify-between hover:shadow-md transition-all">
            <span className="absolute -top-3 right-4 px-2.5 py-0.5 bg-brand-600 text-white text-[10px] font-extrabold rounded-full uppercase tracking-wide">
              Top Smart Match
            </span>
            
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">FreshMart Superstores</h3>
                  <p className="text-xs text-slate-500">Retail & Supermarket Chain</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-brand-700">94%</span>
                  <p className="text-[10px] text-slate-400 font-medium">Match Score</p>
                </div>
              </div>

              <div className="space-y-2 mt-4 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-brand-100">
                  <span className="text-slate-500">Demand:</span>
                  <strong>500 kg Tomato (Grade A)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-100">
                  <span className="text-slate-500">Target Price:</span>
                  <strong className="text-brand-800 font-black text-sm">₹30 / kg</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-brand-100">
                  <span className="text-slate-500">Distance:</span>
                  <span>18 km (Kolkata Terminal)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Required by:</span>
                  <span>03 Sept 2026</span>
                </div>
              </div>

              <div className="mt-3 p-2 rounded-xl bg-white/80 border border-brand-200 text-[11px] text-brand-900 font-medium">
                💡 <strong className="font-bold">Pooling Ready:</strong> Combines your 120kg with Suresh (150kg), Amit (80kg), Priya (150kg).
              </div>
            </div>

            <button
              onClick={() => handleSelectBuyerAndGo('buyer-1')}
              className="mt-5 w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>{t.viewOpportunity}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Opportunity 2: Green Restaurant (86% Match, Best Net Realization) */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-bold text-slate-900 text-base">Green Restaurant</h3>
                  </div>
                  <p className="text-xs text-slate-500">Agro-Kitchen & Dining</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-slate-800">86%</span>
                  <p className="text-[10px] text-slate-400 font-medium">Match Score</p>
                </div>
              </div>

              <div className="space-y-2 mt-4 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Demand:</span>
                  <strong>300 kg Tomato</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Target Price:</span>
                  <strong className="text-slate-900">₹29 / kg</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Distance:</span>
                  <span>10 km (Salt Lake)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Estimated Net:</span>
                  <strong className="text-emerald-700 font-extrabold">₹26.00 / kg (Best Net)</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectBuyerAndGo('buyer-2')}
              className="mt-5 w-full py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors"
            >
              {t.viewOpportunity}
            </button>
          </div>

          {/* Opportunity 3: Local Wholesale (79% Match) */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Local Wholesale</h3>
                  <p className="text-xs text-slate-500">Koley Market, Sealdah</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-slate-800">79%</span>
                  <p className="text-[10px] text-slate-400 font-medium">Match Score</p>
                </div>
              </div>

              <div className="space-y-2 mt-4 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Demand:</span>
                  <strong>700 kg Tomato</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Target Price:</span>
                  <strong className="text-slate-900">₹31 / kg</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Distance:</span>
                  <span>26 km away</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Estimated Net:</span>
                  <span>₹24.70 / kg</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectBuyerAndGo('buyer-3')}
              className="mt-5 w-full py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors"
            >
              {t.viewOpportunity}
            </button>
          </div>

        </div>
      </div>

      {/* Grid: My Produce & Active Order */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: My Produce Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black text-slate-900">{t.myProduce}</h2>
            <button
              onClick={() => navigate('/farmer/add-produce')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              + Add New Crop
            </button>
          </div>

          <div className="space-y-3">
            {produceList.map(prod => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <strong className="text-sm font-black text-slate-900">{prod.crop}</strong>
                    <StatusBadge type="grade" label={prod.grade} />
                    <span className="px-2 py-0.5 rounded bg-brand-100 text-brand-800 font-semibold text-[10px]">
                      {prod.status}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">
                    {prod.quantity} {prod.unit} • Expected: ₹{prod.expectedPrice}/{prod.unit} • Available: {prod.availableFrom}
                  </p>
                </div>

                <button
                  onClick={handleFindBuyers}
                  className="px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shrink-0 transition-colors"
                >
                  Find Buyers
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Smart Pool Summary */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-brand-950 text-white rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-brand-500/20 text-brand-400 border border-brand-500/40 text-[10px] font-bold rounded-full uppercase tracking-wide">
                Active Smart Pool
              </span>
              <span className="text-xs text-slate-400">{smartPool.poolCode}</span>
            </div>

            <h3 className="text-xl font-extrabold mt-3">{smartPool.crop} ({smartPool.requiredQuantity} kg Pool)</h3>
            <p className="text-xs text-slate-300 mt-1">
              Buyer: <strong>{smartPool.buyerName}</strong> @ ₹{smartPool.agreedPrice}/kg
            </p>

            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Aggregation Progress</span>
                <strong className="text-brand-400 font-bold">{smartPool.collectedQuantity} / {smartPool.requiredQuantity} kg (100%)</strong>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full w-full" />
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {smartPool.farmers.length} Farmers Clustered ({smartPool.farmers.map(f => `${f.farmerName.split(' ')[0]} ${f.quantity}kg`).join(', ')})
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block">Scheduled Pickup</span>
              <strong className="text-sm font-bold text-white">{smartPool.deliveryDate}</strong>
            </div>
            <button
              onClick={handleViewPool}
              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-sm transition-colors"
            >
              {t.viewSmartPool}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
