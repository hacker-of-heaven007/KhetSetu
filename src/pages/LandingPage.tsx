import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowRight, Sparkles } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage: React.FC = () => {
  const { loadSIHDemo, setUserRole } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleStartDemo = () => {
    loadSIHDemo();
    navigate('/farmer/dashboard');
  };

  const handleRole = (role: 'FARMER' | 'BUYER' | 'ADMIN') => {
    setUserRole(role);
    if (role === 'FARMER') navigate('/farmer/dashboard');
    else if (role === 'BUYER') navigate('/buyer/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 text-center max-w-4xl mx-auto px-4">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-100/80 text-brand-800 text-xs font-bold border border-brand-200 mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>{t.sihBadge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
          {t.heroTitle}
        </h1>
        <p className="text-2xl sm:text-3xl font-extrabold text-brand-700 mt-2">
          {t.heroSubtitle}
        </p>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
          {t.heroDesc}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={handleStartDemo}
            className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>{t.loadDemoBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => handleRole('FARMER')}
            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base rounded-2xl border border-slate-300 shadow-2xs flex items-center justify-center space-x-2 transition-colors"
          >
            <span>{t.exploreFarmerBtn}</span>
          </button>

          <button
            onClick={() => handleRole('BUYER')}
            className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-blue-800 font-bold text-base rounded-2xl border border-blue-200 shadow-2xs flex items-center justify-center space-x-2 transition-colors"
          >
            <span>{t.exploreBuyerBtn}</span>
          </button>
        </div>

        {/* SIH Impact Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 text-left">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">{t.impactFarmerRealization}</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">{t.impactFarmerRealizationVal}</span>
            <span className="text-[11px] text-slate-400">Direct wholesale linkage</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">{t.impactLogistics}</span>
            <span className="text-2xl font-black text-brand-600 mt-1 block">{t.impactLogisticsVal}</span>
            <span className="text-[11px] text-slate-400">Clustered transport</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">{t.impactWastage}</span>
            <span className="text-2xl font-black text-teal-600 mt-1 block">{t.impactWastageVal}</span>
            <span className="text-[11px] text-slate-400">Faster direct delivery</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">{t.impactBuyerProcurement}</span>
            <span className="text-2xl font-black text-blue-600 mt-1 block">{t.impactBuyerProcurementVal}</span>
            <span className="text-[11px] text-slate-400">Zero middleman markup</span>
          </div>
        </div>

      </section>

      {/* Interactive 6-Step Workflow Diagram Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xs">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.coreEngineTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              {t.coreEngineDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 & 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center font-black mb-3">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">{t.smartMatches}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Institutional buyers post bulk requirements (e.g. FreshMart 500kg Tomato). System scores farmers on crop, grade, location, and distance (94% Compatibility).
              </p>
            </div>

            {/* Step 3 & 4 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black mb-3">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">{t.smartPool} & {t.netRealization}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Combines 4 small farmers (120+150+80+150 = 500kg) into POOL #KS-1001. Calculates transparent net realization deducting shared logistics (₹25.95/kg).
              </p>
            </div>

            {/* Step 5 & 6 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black mb-3">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">{t.smartDelivery}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Optimizes multi-village pickup route (65km reduced to 39.4km). Generates guaranteed purchase agreement with digital weight & instant payout tracking.
              </p>
            </div>

          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleStartDemo}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl inline-flex items-center space-x-2 transition-colors"
            >
              <span>{t.walkthroughBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
