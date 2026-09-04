import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, RotateCcw, Globe, Mic, Wifi, WifiOff, ShieldCheck, User, LogOut, LogIn } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UserRole } from '../types';

interface NavbarProps {
  onOpenVoiceModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVoiceModal }) => {
  const { userRole, setUserRole, loadSIHDemo, isOffline, setIsOffline } = useDemo();
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === 'FARMER') {
      navigate('/farmer/dashboard');
    } else if (role === 'BUYER') {
      navigate('/buyer/dashboard');
    } else if (role === 'ADMIN') {
      navigate('/admin/dashboard');
    }
  };

  const handleResetDemo = () => {
    loadSIHDemo();
    navigate('/farmer/dashboard');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-600/20 group-hover:bg-brand-700 transition-colors">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">{t.appName}</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-brand-100 text-brand-800 border border-brand-200">SIH26033</span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">{t.tagline}</p>
            </div>
          </Link>

          {/* Center: Role Switcher */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => handleRoleChange('FARMER')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                userRole === 'FARMER'
                  ? 'bg-white text-brand-700 shadow-xs font-bold border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🧑‍🌾 {t.farmerRole}</span>
            </button>
            <button
              onClick={() => handleRoleChange('BUYER')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                userRole === 'BUYER'
                  ? 'bg-white text-blue-700 shadow-xs font-bold border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏢 {t.buyerRole}</span>
            </button>
            <button
              onClick={() => handleRoleChange('ADMIN')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                userRole === 'ADMIN'
                  ? 'bg-white text-purple-700 shadow-xs font-bold border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📊 {t.adminRole}</span>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Voice Button */}
            {onOpenVoiceModal && (
              <button
                onClick={onOpenVoiceModal}
                title="Voice Assistant"
                className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center space-x-1 text-xs font-semibold"
              >
                <Mic className="w-4 h-4 text-amber-600 animate-pulse" />
                <span className="hidden sm:inline">Voice</span>
              </button>
            )}

            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
                  language === 'en' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
                  language === 'bn' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
                  language === 'hi' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* User Auth Profile Badge / Login link */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-1.5 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-800 hidden lg:inline">{user.name.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  title="Log out"
                  className="text-slate-400 hover:text-rose-600 p-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.loginBtn}</span>
              </Link>
            )}

            {/* Offline Simulator Toggle */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              title={isOffline ? 'Online sync paused' : 'Online connected'}
              className={`p-2 rounded-xl border transition-colors ${
                isOffline
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            </button>

            {/* Primary SIH Demo Button */}
            <button
              onClick={handleResetDemo}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-xs shadow-brand-600/30 flex items-center space-x-1.5 transition-all active:scale-95 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.loadDemoBtn}</span>
            </button>

          </div>
        </div>

        {/* Mobile Sub-Navbar for Roles & Auth */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-100">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleRoleChange('FARMER')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                userRole === 'FARMER' ? 'bg-brand-100 text-brand-800' : 'text-slate-600'
              }`}
            >
              🧑‍🌾 {t.farmerRole}
            </button>
            <button
              onClick={() => handleRoleChange('BUYER')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                userRole === 'BUYER' ? 'bg-blue-100 text-blue-800' : 'text-slate-600'
              }`}
            >
              🏢 {t.buyerRole}
            </button>
            <button
              onClick={() => handleRoleChange('ADMIN')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                userRole === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'text-slate-600'
              }`}
            >
              📊 {t.adminRole}
            </button>
          </div>

          <Link
            to="/login"
            className="text-xs font-bold text-slate-700 hover:text-brand-700 flex items-center space-x-1"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{isAuthenticated ? 'Account' : t.loginBtn}</span>
          </Link>
        </div>

      </div>
    </header>
  );
};
