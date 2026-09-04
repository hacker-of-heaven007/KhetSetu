import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Building, Lock, Phone, User, MapPin, Mail, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDemo } from '../context/DemoContext';
import { useLanguage } from '../context/LanguageContext';
import { UserRole, BuyerType } from '../types';

export const LoginPage: React.FC = () => {
  const { login, register } = useAuth();
  const { setUserRole, loadSIHDemo } = useDemo();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<UserRole>('FARMER');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('North 24 Parganas');
  const [businessName, setBusinessName] = useState('');
  const [buyerType, setBuyerType] = useState<BuyerType>('Retailer');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(phone || email, password);
        if (!res.success) {
          setError(res.error || 'Login failed.');
          setLoading(false);
          return;
        }
      } else {
        const payload = {
          name,
          phone,
          email,
          password,
          role,
          village,
          district,
          businessName,
          buyerType,
          location: village || 'Kolkata'
        };
        const res = await register(payload);
        if (!res.success) {
          setError(res.error || 'Registration failed.');
          setLoading(false);
          return;
        }
      }

      setUserRole(role);
      if (role === 'FARMER') navigate('/farmer/dashboard');
      else if (role === 'BUYER') navigate('/buyer/dashboard');
      else navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (targetRole: UserRole) => {
    loadSIHDemo();
    setUserRole(targetRole);
    if (targetRole === 'FARMER') navigate('/farmer/dashboard');
    else if (targetRole === 'BUYER') navigate('/buyer/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-12">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-brand-600/20">
            <Sprout className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Khet-Setu Portal</h1>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login' ? 'Sign in to access your farm & market opportunities' : 'Create a verified producer or buyer account'}
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('FARMER')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              role === 'FARMER' ? 'bg-white text-brand-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>🧑‍🌾 Farmer</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('BUYER')}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              role === 'BUYER' ? 'bg-white text-blue-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>🏢 Buyer</span>
          </button>
        </div>

        {/* Sign In vs Sign Up Toggle */}
        <div className="flex justify-center space-x-6 text-xs font-bold border-b border-slate-100 pb-3 mb-5">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`pb-2 border-b-2 transition-colors ${
              mode === 'login' ? 'border-brand-600 text-brand-700 font-black' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`pb-2 border-b-2 transition-colors ${
              mode === 'register' ? 'border-brand-600 text-brand-700 font-black' : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {mode === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={role === 'FARMER' ? 'e.g. Ramesh Mondal' : 'e.g. Rahul Sharma'}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {mode === 'register' && role === 'BUYER' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Business / Company Name</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  placeholder="e.g. FreshMart Superstores"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {mode === 'register' && role === 'BUYER' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Buyer Category</label>
              <select
                value={buyerType}
                onChange={e => setBuyerType(e.target.value as BuyerType)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Retailer">Retailer / Supermarket</option>
                <option value="Restaurant">Restaurant / Food Chain</option>
                <option value="Processor">Food Processor / Puree</option>
                <option value="Wholesaler">Wholesaler / Mandi</option>
                <option value="Institution">Institution / Canteen</option>
              </select>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {mode === 'login' ? 'Phone Number or Email' : 'Phone Number'}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 9830124589"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address (Optional)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {mode === 'register' && role === 'FARMER' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Village / Town</label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={e => setVillage(e.target.value)}
                  placeholder="e.g. Barasat"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  placeholder="North 24 Parganas"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 ${
              role === 'FARMER'
                ? 'bg-brand-600 hover:bg-brand-700 shadow-brand-600/30'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
            }`}
          >
            <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Separator */}
        <div className="my-6 flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-wider">
          <span className="w-1/3 border-b border-slate-200"></span>
          <span>OR QUICK DEMO</span>
          <span className="w-1/3 border-b border-slate-200"></span>
        </div>

        {/* Quick Demo Shortcuts (Keeps Demo Independent) */}
        <div className="space-y-2 text-xs">
          <button
            type="button"
            onClick={() => handleQuickDemo('FARMER')}
            className="w-full py-2.5 px-3 bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-900 font-bold rounded-xl flex items-center justify-between transition-colors"
          >
            <span>🚀 1-Click Demo as Ramesh (Farmer)</span>
            <span className="text-[10px] text-brand-700 bg-brand-200/80 px-1.5 py-0.5 rounded">SIH Preset</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemo('BUYER')}
            className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-bold rounded-xl flex items-center justify-between transition-colors"
          >
            <span>🏢 1-Click Demo as FreshMart (Buyer)</span>
            <span className="text-[10px] text-blue-700 bg-blue-200/80 px-1.5 py-0.5 rounded">SIH Preset</span>
          </button>
        </div>

      </div>
    </div>
  );
};
