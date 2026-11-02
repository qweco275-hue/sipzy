import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Coffee, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('raditya.coffee@sipzy.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(redirect);
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demoPass123');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#FFF9F3]">
      {/* Left Column: Brand & Lifestyle Visual Asset */}
      <div className="hidden lg:flex lg:col-span-6 relative bg-[#3D2117] overflow-hidden p-12 flex-col justify-between text-white">
        <img
          src="/images/auth_coffee_lifestyle_1793559241062.jpg"
          alt="Coffee Lifestyle"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E87832] to-[#9B421F] flex items-center justify-center text-white shadow-lg">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white font-mono">
            SIPZY
          </span>
        </div>

        <div className="relative z-10 space-y-4 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
            <span>Digital Loyalty Pass</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Good Coffee, Better Rewards.
          </h2>
          <p className="text-xs text-[#F5E7DA]/80 leading-relaxed">
            One single account connects you to over 45 independent micro-roasteries. Collect points, claim complimentary drinks, and enjoy expedited morning pickup.
          </p>
        </div>

        <div className="relative z-10 text-[11px] text-[#F5E7DA]/60">
          © {new Date().getFullYear()} SIPZY Technologies. All rights reserved.
        </div>
      </div>

      {/* Right Column: Clean Form */}
      <div className="lg:col-span-6 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-xs font-semibold text-[#9B421F] mb-6">
              ← Back to SIPZY Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D2117] tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-[#8B7468] mt-1.5">
              Access your digital card, view point balances, and order ahead.
            </p>
          </div>

          {/* Quick Demo Autofill helper */}
          <div className="p-3.5 rounded-2xl bg-[#F5E7DA]/60 border border-[#F5E7DA] text-xs space-y-2">
            <p className="font-semibold text-[#3D2117] text-[11px]">Quick Demo Test Account:</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('raditya.coffee@sipzy.id')}
                className="py-1 px-2.5 rounded-lg bg-white hover:bg-stone-50 border border-[#F5E7DA] text-[11px] font-medium text-[#9B421F] shadow-xs cursor-pointer"
              >
                Raditya (Gold · 1.450 pts)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('maya.specialty@sipzy.id')}
                className="py-1 px-2.5 rounded-lg bg-white hover:bg-stone-50 border border-[#F5E7DA] text-[11px] font-medium text-[#3D2117] shadow-xs cursor-pointer"
              >
                Maya (New Member)
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-[#F5E7DA] text-xs font-medium text-[#3D2117] placeholder-[#8B7468] focus:outline-none focus:border-[#9B421F]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#3D2117]">Password</label>
                <span className="text-[11px] text-[#8B7468] hover:text-[#9B421F] cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-2.5 pl-3.5 pr-10 rounded-xl bg-white border border-[#F5E7DA] text-xs font-medium text-[#3D2117] placeholder-[#8B7468] focus:outline-none focus:border-[#9B421F]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7468] hover:text-[#3D2117]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#9B421F] hover:bg-[#803517] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-[#8B7468]">
            Don't have a SIPZY membership yet?{' '}
            <Link to="/register" className="font-bold text-[#9B421F] hover:underline">
              Register now (+150 pts bonus)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
