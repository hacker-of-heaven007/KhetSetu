import React, { useState } from 'react';
import { RouteStop } from '../types';
import { MapPin, Navigation, Truck, Clock, Fuel, Sparkles, ShieldCheck } from 'lucide-react';

interface LeafletRouteMapProps {
  stops: RouteStop[];
  optimizedDistanceKm: number;
  individualDistanceKm: number;
  distanceSavedKm: number;
  estimatedTimeMinutes: number;
  estimatedLogisticsCost: number;
  estimatedWastageReductionPercent: number;
}

export const LeafletRouteMap: React.FC<LeafletRouteMapProps> = ({
  stops,
  optimizedDistanceKm,
  individualDistanceKm,
  distanceSavedKm,
  estimatedTimeMinutes,
  estimatedLogisticsCost,
  estimatedWastageReductionPercent
}) => {
  const [activeStop, setActiveStop] = useState<RouteStop>(stops[0]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
      
      {/* Route Header Metrics */}
      <div className="p-5 bg-gradient-to-r from-brand-900 to-slate-900 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-300 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OR-Tools Clustered Route Optimization</span>
            </span>
            <h3 className="text-xl font-extrabold mt-0.5">4 Farmers Village Cluster → FreshMart Hub</h3>
            <p className="text-xs text-slate-300 mt-0.5">Tata Ace 1.5T payload multi-stop collection schedule</p>
          </div>
          <div className="bg-brand-500/20 border border-brand-400/40 rounded-2xl px-4 py-2 text-right">
            <span className="text-[10px] text-brand-200 uppercase font-semibold">Total Group Distance</span>
            <p className="text-2xl font-black text-white">{optimizedDistanceKm} km</p>
            <span className="text-[11px] text-emerald-300 font-bold">−{distanceSavedKm} km ({Math.round((distanceSavedKm / individualDistanceKm) * 100)}% saved)</span>
          </div>
        </div>

        {/* 4 Quick Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-xs">
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs border border-white/10">
            <span className="text-slate-300 block text-[11px]">Estimated Transit</span>
            <strong className="text-white text-sm font-bold flex items-center space-x-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>1h 12m ({estimatedTimeMinutes} mins)</span>
            </strong>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs border border-white/10">
            <span className="text-slate-300 block text-[11px]">Total Group Logistics</span>
            <strong className="text-white text-sm font-bold flex items-center space-x-1 mt-0.5">
              <Fuel className="w-3.5 h-3.5 text-amber-400" />
              <span>₹{estimatedLogisticsCost} (Shared)</span>
            </strong>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs border border-white/10">
            <span className="text-slate-300 block text-[11px]">Wastage Reduction</span>
            <strong className="text-white text-sm font-bold flex items-center space-x-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>−{estimatedWastageReductionPercent}% (Estimated)</span>
            </strong>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs border border-white/10">
            <span className="text-slate-300 block text-[11px]">Carbon & Fuel Saved</span>
            <strong className="text-white text-sm font-bold flex items-center space-x-1 mt-0.5">
              <Truck className="w-3.5 h-3.5 text-teal-400" />
              <span>4.8L Fuel / 12.6kg CO₂</span>
            </strong>
          </div>
        </div>
      </div>

      {/* Interactive Visual Map & Sequence Diagram */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Interactive Graphical Map SVG Canvas */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-5 border border-slate-800 text-white relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            
            {/* Top Map Badges */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 rounded bg-brand-500/20 text-brand-400 text-xs font-bold border border-brand-500/30 flex items-center space-x-1">
                  <Navigation className="w-3 h-3 animate-spin" />
                  <span>LIVE ROUTE GEOMETRY</span>
                </span>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                Region: North 24 Parganas → Kolkata Hub
              </span>
            </div>

            {/* Visual SVG Path with Animated Dots & Markers */}
            <div className="relative my-6 h-56 w-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Grid Lines */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Individual Unoptimized Route (Grey Dashed) */}
                <path
                  d="M 60 160 L 440 60 M 140 180 L 440 60 M 240 170 L 440 60 M 340 150 L 440 60"
                  stroke="#475569"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />

                {/* Optimized Route Curve (Green Glow) */}
                <path
                  d="M 60 160 Q 110 185 140 180 T 240 170 T 340 140 T 440 60"
                  stroke="#22c55e"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                />

                {/* Animated Truck along the path */}
                <circle cx="240" cy="170" r="8" fill="#3b82f6" className="animate-ping opacity-60" />
                <circle cx="240" cy="170" r="5" fill="#60a5fa" />

                {/* Stop 1: Ramesh */}
                <g className="cursor-pointer" onClick={() => setActiveStop(stops[0])}>
                  <circle cx="60" cy="160" r="10" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                  <text x="60" y="190" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">1. Ramesh (120kg)</text>
                </g>

                {/* Stop 2: Amit */}
                <g className="cursor-pointer" onClick={() => setActiveStop(stops[1])}>
                  <circle cx="140" cy="180" r="10" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                  <text x="140" y="210" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">2. Amit (80kg)</text>
                </g>

                {/* Stop 3: Priya */}
                <g className="cursor-pointer" onClick={() => setActiveStop(stops[2])}>
                  <circle cx="240" cy="170" r="10" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                  <text x="240" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">3. Priya (150kg)</text>
                </g>

                {/* Stop 4: Suresh */}
                <g className="cursor-pointer" onClick={() => setActiveStop(stops[3])}>
                  <circle cx="340" cy="140" r="10" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                  <text x="340" y="120" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">4. Suresh (150kg)</text>
                </g>

                {/* Stop 5: FreshMart Hub */}
                <g className="cursor-pointer" onClick={() => setActiveStop(stops[4])}>
                  <circle cx="440" cy="60" r="14" fill="#3b82f6" stroke="#ffffff" strokeWidth="3" />
                  <text x="440" y="90" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">FreshMart Hub 🏁</text>
                </g>
              </svg>
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Farmer Pickups</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span>Wholesale Drop-off</span>
                </span>
              </div>
              <span className="text-emerald-400 font-semibold">Green: Clustered OR-Tools Route</span>
            </div>

          </div>

          {/* Right: Step-by-Step Stop Timeline */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center justify-between">
              <span>Collection & Dispatch Stops</span>
              <span className="text-xs text-brand-700 bg-brand-50 px-2 py-0.5 rounded font-semibold">
                Total 500 kg Load
              </span>
            </h4>

            <div className="space-y-2">
              {stops.map(stop => {
                const isSelected = activeStop.id === stop.id;
                const isBuyer = stop.role === 'BUYER';

                return (
                  <div
                    key={stop.id}
                    onClick={() => setActiveStop(stop)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer text-xs ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 shadow-sm ring-1 ring-brand-500/30'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-[11px] ${
                          isBuyer ? 'bg-blue-600' : 'bg-brand-600'
                        }`}>
                          {stop.sequence}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{stop.name}</p>
                          <p className="text-[11px] text-slate-500">{stop.village}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {stop.quantityKg && (
                          <span className="font-bold text-brand-800 bg-brand-100/60 px-2 py-0.5 rounded text-[11px] block">
                            +{stop.quantityKg} kg
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 flex items-center justify-end space-x-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{stop.arrivalEstimate}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cost Comparison Summary Box */}
            <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex justify-between font-bold">
                <span>Traditional Separate Trips:</span>
                <span className="text-slate-600 line-through">65.0 km (₹1,000)</span>
              </div>
              <div className="flex justify-between font-extrabold text-emerald-800 text-sm pt-0.5">
                <span>Khet-Setu Optimized Route:</span>
                <span>39.4 km (₹580)</span>
              </div>
              <p className="text-[11px] text-emerald-700 pt-1">
                ✓ Saves ₹420 in fuel/transport costs distributed back into farmers' pockets.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
