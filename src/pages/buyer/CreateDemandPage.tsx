import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, ArrowRight, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { BuyerType, CropGrade } from '../../types';

export const CreateDemandPage: React.FC = () => {
  const navigate = useNavigate();

  const [crop, setCrop] = useState('Tomato');
  const [requiredQuantity, setRequiredQuantity] = useState<number>(500);
  const [unit, setUnit] = useState('kg');
  const [quality, setQuality] = useState<CropGrade>('Grade A');
  const [targetPrice, setTargetPrice] = useState<number>(30);
  const [requiredDate, setRequiredDate] = useState('2026-09-03');
  const [deliveryLocation, setDeliveryLocation] = useState('Kolkata Wholesale Terminal, Ultadanga');
  const [buyerType, setBuyerType] = useState<BuyerType>('Retailer');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      navigate('/buyer/dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        <div className="border-b border-slate-100 pb-6 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Buyer Bulk Procurement System</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Post Bulk Crop Demand
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Khet-Setu's AI matching engine will aggregate nearby farmer supply clusters to fulfill your order.
          </p>
        </div>

        {isSubmitted && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm">Demand created successfully!</p>
              <p className="text-[11px] text-emerald-700 font-medium">Searching for compatible farmer supply pools...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Crop Name</label>
              <input
                type="text"
                value={crop}
                onChange={e => setCrop(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Buyer Category</label>
              <select
                value={buyerType}
                onChange={e => setBuyerType(e.target.value as BuyerType)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Retailer">Retailer / Supermarket</option>
                <option value="Restaurant">Restaurant / Hotel / Agro-Kitchen</option>
                <option value="Processor">Food Processor / Packaging</option>
                <option value="Wholesaler">Wholesaler / Mandi Trader</option>
                <option value="Institution">Institution / Canteen</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Required Quantity</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="10"
                  value={requiredQuantity}
                  onChange={e => setRequiredQuantity(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50"
                >
                  <option value="kg">kg</option>
                  <option value="quintal">quintal</option>
                  <option value="ton">ton</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Quality / Grade Standard</label>
              <select
                value={quality}
                onChange={e => setQuality(e.target.value as CropGrade)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Grade A">Grade A (Premium / Export / Retail)</option>
                <option value="Grade B">Grade B (Standard Market)</option>
                <option value="Grade C">Grade C (Industrial Processing)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Target Maximum Purchase Price (₹/kg)</label>
              <input
                type="number"
                min="1"
                value={targetPrice}
                onChange={e => setTargetPrice(Number(e.target.value))}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Required Delivery Date</label>
              <input
                type="date"
                value={requiredDate}
                onChange={e => setRequiredDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Delivery Destination / Warehouse</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={deliveryLocation}
                onChange={e => setDeliveryLocation(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/buyer/dashboard')}
              className="px-5 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitted}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/30 flex items-center space-x-2 transition-all"
            >
              <span>Post Demand & Search Farm Pools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
