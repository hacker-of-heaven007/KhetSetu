import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Mic, CheckCircle2, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { VoiceModal } from '../../components/VoiceModal';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';
import { CropGrade } from '../../types';

export const AddProducePage: React.FC = () => {
  const { addProduce, setDemoStep } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [crop, setCrop] = useState('Tomato');
  const [quantity, setQuantity] = useState<number>(120);
  const [unit, setUnit] = useState('kg');
  const [grade, setGrade] = useState<CropGrade>('Grade A');
  const [harvestDate, setHarvestDate] = useState('2026-09-02');
  const [availableFrom, setAvailableFrom] = useState('2026-09-03');
  const [expectedPrice, setExpectedPrice] = useState<number>(28);
  const [location, setLocation] = useState('North 24 Parganas');
  
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleVoiceData = (data: { crop: string; quantity: number; grade: CropGrade; expectedPrice: number; location: string }) => {
    setCrop(data.crop);
    setQuantity(data.quantity);
    setGrade(data.grade);
    setExpectedPrice(data.expectedPrice);
    setLocation(data.location);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);

    addProduce({
      crop,
      quantity,
      unit,
      grade,
      harvestDate,
      availableFrom,
      expectedPrice,
      location
    });

    setTimeout(() => {
      setDemoStep(2);
      navigate('/farmer/matches');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH Step 1: Demand & Supply Listing</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {t.addProduceTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.addProduceSub}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsVoiceOpen(true)}
            className="px-4 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-md shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all transform active:scale-95 shrink-0"
          >
            <Mic className="w-4 h-4 animate-bounce" />
            <span>{t.speakToAdd}</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {isSaved && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center space-x-3 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm">{t.produceSavedSuccess}</p>
              <p className="text-[11px] text-emerald-700 font-medium">Navigating to Smart Buyer Matches...</p>
            </div>
          </div>
        )}

        {/* The Add Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Crop Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.cropNameLabel}</label>
              <input
                type="text"
                value={crop}
                onChange={e => setCrop(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="e.g. Tomato, Potato, Onion"
              />
            </div>

            {/* Quality Grade */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.gradeLabel}</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value as CropGrade)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
              >
                <option value="Grade A">Grade A (Export / Supermarket Premium)</option>
                <option value="Grade B">Grade B (Retail Standard)</option>
                <option value="Grade C">Grade C (Processing / Puree / Sauce)</option>
              </select>
            </div>

            {/* Quantity & Unit */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.quantityLabel}</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
                <select
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50"
                >
                  <option value="kg">kg</option>
                  <option value="quintal">quintal</option>
                  <option value="crates">crates</option>
                </select>
              </div>
            </div>

            {/* Expected Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.expectedPriceLabel}</label>
              <input
                type="number"
                min="1"
                value={expectedPrice}
                onChange={e => setExpectedPrice(Number(e.target.value))}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="28"
              />
            </div>

            {/* Harvest Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.harvestDateLabel}</label>
              <input
                type="date"
                value={harvestDate}
                onChange={e => setHarvestDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            {/* Available From Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.availableFromLabel}</label>
              <input
                type="date"
                value={availableFrom}
                onChange={e => setAvailableFrom(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.locationLabel}</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/farmer/dashboard')}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaved}
              className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-600/30 flex items-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <span>{t.saveProduceBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>

      <VoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onVoiceResult={handleVoiceData}
      />

    </div>
  );
};
