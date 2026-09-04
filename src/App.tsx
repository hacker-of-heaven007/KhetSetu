import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { DemoWorkflowBar } from './components/DemoWorkflowBar';
import { OfflineBanner } from './components/OfflineBanner';
import { Footer } from './components/Footer';
import { VoiceModal } from './components/VoiceModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { AddProducePage } from './pages/farmer/AddProducePage';
import { BuyerMatchesPage } from './pages/farmer/BuyerMatchesPage';
import { SmartPoolPage } from './pages/farmer/SmartPoolPage';
import { NetRealizationPage } from './pages/farmer/NetRealizationPage';
import { SmartDeliveryPage } from './pages/farmer/SmartDeliveryPage';
import { OrderConfirmedPage } from './pages/farmer/OrderConfirmedPage';

import { BuyerDashboard } from './pages/buyer/BuyerDashboard';
import { CreateDemandPage } from './pages/buyer/CreateDemandPage';
import { BuyerSupplyPage } from './pages/buyer/BuyerSupplyPage';
import { BuyerOrdersPage } from './pages/buyer/BuyerOrdersPage';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DemandIntelligencePage } from './pages/admin/DemandIntelligencePage';

import { useDemo } from './context/DemoContext';

export const App: React.FC = () => {
  const { isOffline, addProduce } = useDemo();
  const [isGlobalVoiceOpen, setIsGlobalVoiceOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        <OfflineBanner isOffline={isOffline} />
        <Navbar onOpenVoiceModal={() => setIsGlobalVoiceOpen(true)} />
        <DemoWorkflowBar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Farmer Routes */}
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/produce" element={<FarmerDashboard />} />
            <Route path="/farmer/add-produce" element={<AddProducePage />} />
            <Route path="/farmer/matches" element={<BuyerMatchesPage />} />
            <Route path="/farmer/match/:id" element={<BuyerMatchesPage />} />
            <Route path="/farmer/pool/:id" element={<SmartPoolPage />} />
            <Route path="/farmer/realization/:id" element={<NetRealizationPage />} />
            <Route path="/farmer/route/:id" element={<SmartDeliveryPage />} />
            <Route path="/farmer/orders" element={<OrderConfirmedPage />} />
            <Route path="/farmer/orders/:id" element={<OrderConfirmedPage />} />

            {/* Buyer Routes */}
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/demand/create" element={<CreateDemandPage />} />
            <Route path="/buyer/supply" element={<BuyerSupplyPage />} />
            <Route path="/buyer/orders" element={<BuyerOrdersPage />} />
            <Route path="/buyer/orders/:id" element={<BuyerOrdersPage />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/demand-intelligence" element={<DemandIntelligencePage />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        <VoiceModal
          isOpen={isGlobalVoiceOpen}
          onClose={() => setIsGlobalVoiceOpen(false)}
          onVoiceResult={(data) => {
            addProduce({
              crop: data.crop,
              quantity: data.quantity,
              unit: 'kg',
              grade: data.grade,
              harvestDate: '2026-09-02',
              availableFrom: '2026-09-03',
              expectedPrice: data.expectedPrice,
              location: data.location
            });
          }}
        />
      </div>
    </Router>
  );
};
