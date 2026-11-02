import React, { useState, useMemo } from 'react';
import { Gift, Sparkles, Filter, Ticket, Clock, Check, Copy, AlertCircle } from 'lucide-react';
import { RewardCard } from '../components/cards/RewardCard';
import { loyaltyService } from '../services/loyaltyService';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Reward } from '../types';

export const Rewards: React.FC = () => {
  const { user } = useAuth();
  const { redemptions } = useApp();
  const rewards = loyaltyService.getRewards();

  const [activeTab, setActiveTab] = useState<'catalog' | 'my_vouchers'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pointFilter, setPointFilter] = useState<'all' | 'under500' | 'under1000' | '1000plus'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = ['All', 'Free Drink', 'Discount', 'Complimentary Pastry', 'VIP Experience'];

  const filteredRewards = useMemo(() => {
    return rewards.filter((r) => {
      const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
      let matchPoints = true;
      if (pointFilter === 'under500') matchPoints = r.pointsRequired <= 500;
      else if (pointFilter === 'under1000') matchPoints = r.pointsRequired <= 1000;
      else if (pointFilter === '1000plus') matchPoints = r.pointsRequired >= 1000;
      return matchCat && matchPoints;
    });
  }, [rewards, selectedCategory, pointFilter]);

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner with Point Balance */}
      <div className="bg-gradient-to-r from-[#1F100A] via-[#3D2117] to-[#120804] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#9B421F]/30">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E87832]/20 text-[#E87832] text-xs font-semibold">
            <Gift className="w-3.5 h-3.5" />
            <span>SIPZY Rewards Exchange</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Redeem Points for Coffee & Perks
          </h1>
          <p className="text-xs sm:text-sm text-[#F5E7DA]/80 max-w-xl">
            Choose from artisanal drinks, order discounts, and VIP cupping passes. Digital vouchers are redeemable immediately.
          </p>
        </div>

        {/* User Current Balance Snapshot */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 min-w-[200px] text-right sm:text-right">
          <p className="text-xs uppercase tracking-wider text-[#F5E7DA]/70 font-medium">
            Your Available Balance
          </p>
          <div className="flex items-baseline justify-end gap-1.5 mt-1">
            <span className="text-3xl sm:text-4xl font-black font-mono text-white tabular-nums">
              {(user?.points || 0).toLocaleString()}
            </span>
            <span className="text-xs font-bold text-[#E87832] uppercase">PTS</span>
          </div>
          <p className="text-[11px] text-[#F5E7DA]/70 mt-1">
            Tier: <span className="text-white font-semibold">{user?.membershipLevel || 'Member'}</span>
          </p>
        </div>
      </div>

      {/* Main Tabs: Catalog vs My Active Vouchers */}
      <div className="flex border-b border-[#F5E7DA] gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'catalog'
              ? 'text-[#9B421F] border-b-2 border-[#9B421F]'
              : 'text-[#8B7468] hover:text-[#3D2117]'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Rewards Catalog</span>
        </button>

        <button
          onClick={() => setActiveTab('my_vouchers')}
          className={`pb-3 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'my_vouchers'
              ? 'text-[#9B421F] border-b-2 border-[#9B421F]'
              : 'text-[#8B7468] hover:text-[#3D2117]'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>My Claimed Vouchers</span>
          {redemptions.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E87832] text-white">
              {redemptions.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'catalog' ? (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl p-4 border border-[#F5E7DA] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#9B421F] text-white shadow-xs'
                      : 'bg-[#FFF9F3] text-[#8B7468] hover:bg-[#F5E7DA] border border-[#F5E7DA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Point Filter Select */}
            <div className="flex items-center gap-2 text-xs text-[#8B7468] shrink-0">
              <span className="font-medium text-[#3D2117]">Points:</span>
              <select
                value={pointFilter}
                onChange={(e) => setPointFilter(e.target.value as any)}
                className="py-1.5 px-3 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] font-semibold text-[#3D2117] focus:outline-none cursor-pointer"
              >
                <option value="all">All Points</option>
                <option value="under500">500 pts or less</option>
                <option value="under1000">1.000 pts or less</option>
                <option value="1000plus">1.000+ pts</option>
              </select>
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </div>
      ) : (
        /* My Claimed Vouchers Tab */
        <div className="space-y-4">
          {redemptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redemptions.map((redemption) => (
                <div
                  key={redemption.id}
                  className="bg-white rounded-3xl p-6 border border-[#F5E7DA] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                        {redemption.status}
                      </span>
                      <span className="text-[#8B7468] font-mono text-[11px]">
                        Redeemed {redemption.redeemedAt}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#3D2117] leading-snug">
                      {redemption.title}
                    </h3>
                    <p className="text-xs text-[#8B7468] mt-1 font-mono">
                      -{redemption.pointsSpent.toLocaleString()} pts spent
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#F5E7DA]">
                    <div className="p-3 bg-[#FFF9F3] rounded-2xl border border-dashed border-[#C85A2A]/40 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-[#8B7468] uppercase font-bold">Voucher Code</p>
                        <p className="font-mono font-black text-sm text-[#3D2117] mt-0.5 tracking-wider">
                          {redemption.code}
                        </p>
                      </div>
                      <button
                        onClick={() => copyVoucher(redemption.code)}
                        className="p-2 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-[#3D2117] cursor-pointer"
                        title="Copy code"
                      >
                        {copiedCode === redemption.code ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-[10px] text-[#8B7468] mt-2 text-center">
                      Present this code to the cashier or paste during cart checkout.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-[#F5E7DA] p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] text-[#9B421F] mx-auto flex items-center justify-center">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#3D2117]">No vouchers redeemed yet</h3>
              <p className="text-xs text-[#8B7468] max-w-sm mx-auto">
                Explore the Rewards Catalog tab and use your loyalty points to unlock complimentary beverages and food discounts.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="py-2 px-4 rounded-xl bg-[#9B421F] text-white text-xs font-semibold hover:bg-[#803517]"
                >
                  Browse Rewards Catalog
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
