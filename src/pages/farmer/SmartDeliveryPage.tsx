import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Navigation } from 'lucide-react';
import { LeafletRouteMap } from '../../components/LeafletRouteMap';
import { useDemo } from '../../context/DemoContext';
import { useLanguage } from '../../context/LanguageContext';

export const SmartDeliveryPage: React.FC = () => {
  const { deliveryRoute, confirmOrder, setDemoStep } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleConfirm = () => {
    confirmOrder();
    setDemoStep(6);
    navigate('/farmer/orders/ord-1001');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH Step 5: Clustered Route & Logistics Optimization</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {t.deliveryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.deliverySub}
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-brand-600/30 flex items-center space-x-2 transition-all transform active:scale-95 shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.confirmOrderBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Route & Map Component */}
      <LeafletRouteMap
        stops={deliveryRoute.stops}
        optimizedDistanceKm={deliveryRoute.optimizedDistanceKm}
        individualDistanceKm={deliveryRoute.individualDistanceKm}
        distanceSavedKm={deliveryRoute.distanceSavedKm}
        estimatedTimeMinutes={deliveryRoute.estimatedTimeMinutes}
        estimatedLogisticsCost={deliveryRoute.estimatedLogisticsCost}
        estimatedWastageReductionPercent={deliveryRoute.estimatedWastageReductionPercent}
      />

    </div>
  );
};
