import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building, Layers, ShoppingBag, TrendingUp, Truck, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { MetricCard } from '../../components/MetricCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const cropDemandSupplyData = [
    { crop: 'Tomato', demandKg: 2400, supplyKg: 2150, fulfilled: 90 },
    { crop: 'Potato', demandKg: 4500, supplyKg: 4200, fulfilled: 93 },
    { crop: 'Onion', demandKg: 3100, supplyKg: 2800, fulfilled: 90 },
    { crop: 'Cauliflower', demandKg: 1800, supplyKg: 1950, fulfilled: 100 },
    { crop: 'Brinjal', demandKg: 1200, supplyKg: 1100, fulfilled: 92 },
  ];

  const poolFulfillmentData = [
    { name: 'Mon', pools: 12, completed: 11 },
    { name: 'Tue', pools: 15, completed: 14 },
    { name: 'Wed', pools: 18, completed: 17 },
    { name: 'Thu', pools: 22, completed: 20 },
    { name: 'Fri', pools: 29, completed: 28 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Admin Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Khet-Setu Admin & Impact Analytics
            </h1>
            <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-bold">
              SIH Monitoring Console
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time tracking of direct market linkages, farm pooling velocity, and logistics savings.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/demand-intelligence')}
          className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-purple-600/20 flex items-center space-x-2 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>View AI Demand Intelligence</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5 Core Platform Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <MetricCard title="Registered Farmers" value="128" subtitle="Across 14 Taluks" icon={Users} iconBgColor="bg-emerald-50" iconColor="text-emerald-600" />
        <MetricCard title="Verified Buyers" value="34" subtitle="Wholesale & Retail" icon={Building} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
        <MetricCard title="Open Demands" value="42" subtitle="Active Market Signals" icon={ShoppingBag} iconBgColor="bg-amber-50" iconColor="text-amber-600" />
        <MetricCard title="Active Pools" value="17" subtitle="Clustered Consignments" icon={Layers} iconBgColor="bg-purple-50" iconColor="text-purple-600" />
        <MetricCard title="Orders Executed" value="29" subtitle="Today's Dispatches" icon={TrendingUp} iconBgColor="bg-teal-50" iconColor="text-teal-600" />
      </div>

      {/* Sustainability & SIH Key Impact KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-6 rounded-3xl shadow-xs">
          <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">Logistics Cost Saved</span>
          <p className="text-3xl font-black text-white mt-1">₹18,420</p>
          <p className="text-xs text-slate-300 mt-1">Distributed directly back to farmers as increased net profit.</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-6 rounded-3xl shadow-xs">
          <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block">Road Distance Saved</span>
          <p className="text-3xl font-black text-white mt-1">428 km</p>
          <p className="text-xs text-slate-300 mt-1">Via multi-village clustered route optimization.</p>
        </div>

        <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white p-6 rounded-3xl shadow-xs">
          <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider block">Estimated Wastage Reduction</span>
          <p className="text-3xl font-black text-white mt-1">12%</p>
          <p className="text-xs text-slate-300 mt-1">Faster point-to-point transit reducing perishability decay.</p>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Crop Demand vs Supply Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="font-extrabold text-slate-900 text-sm mb-1">
            Regional Demand vs Aggregated Supply (kg)
          </h3>
          <p className="text-xs text-slate-500 mb-6">Comparing open buyer requirements against village farm pools</p>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropDemandSupplyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="crop" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="demandKg" name="Buyer Demand (kg)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="supplyKg" name="Pooled Supply (kg)" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Pool Fulfillment Line Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="font-extrabold text-slate-900 text-sm mb-1">
            Weekly Pool Completion Velocity
          </h3>
          <p className="text-xs text-slate-500 mb-6">Active vs Completed 100% Fulfilled Pools</p>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={poolFulfillmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="pools" name="Created Pools" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="completed" name="Completed (100%)" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
