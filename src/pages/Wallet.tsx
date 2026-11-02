import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet as WalletIcon,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  ShieldCheck,
  Award,
  Coffee,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Plus,
  Minus,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { DigitalLoyaltyCard } from '../components/loyalty/DigitalLoyaltyCard';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { loyaltyService } from '../services/loyaltyService';
import { authService } from '../services/authService';

export const Wallet: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { transactions, showToast } = useApp();

  if (!user) return null;

  const tierInfo = loyaltyService.getNextTierInfo(user.points, user.membershipLevel);

  // Real-time Points Simulation Handlers
  const handleSimulatePoints = (amount: number, reason: string) => {
    const newPoints = Math.max(0, user.points + amount);
    authService.updatePoints(newPoints);

    // Record real transaction
    loyaltyService.addTransaction({
      userId: user.id,
      type: amount > 0 ? 'EARNED' : 'REDEEMED',
      title: reason,
      points: amount,
      status: 'Completed',
    });

    refreshUser();
    showToast(
      amount > 0 ? `+${amount} Points Earned!` : `${amount} Points Redeemed`,
      `${reason}. New Balance: ${newPoints.toLocaleString()} PTS (${tierInfo.currentTier})`,
      amount > 0 ? 'success' : 'info'
    );
  };

  const handleSimulateTier = (targetTier: 'Bronze' | 'Silver' | 'Gold' | 'Black Diamond') => {
    let targetPoints = 150;
    if (targetTier === 'Silver') targetPoints = 450;
    else if (targetTier === 'Gold') targetPoints = 1200;
    else if (targetTier === 'Black Diamond') targetPoints = 2200;

    authService.updatePoints(targetPoints);
    loyaltyService.addTransaction({
      userId: user.id,
      type: 'BONUS',
      title: `Tier Upgrade Milestone: ${targetTier}`,
      points: targetPoints - user.points,
      status: 'Completed',
    });

    refreshUser();
    showToast(`Membership Upgraded to ${targetTier}!`, `Your digital pass has adjusted its styling in real-time.`, 'success');
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Page Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
          Member Hub & Pass
        </span>
        <h1 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
          Digital Loyalty Wallet
        </h1>
        <p className="text-xs sm:text-sm text-[#8B7468] mt-1">
          Your digital pass across all partner coffee shops. Tap the card to flip between front & barcode back, or tap the QR code to simulate a live barista scan.
        </p>
      </div>

      {/* 1. DIGITAL LOYALTY CARD (STAR HERO VISUAL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <DigitalLoyaltyCard
            userName={user.name}
            memberId={user.memberId}
            memberSince={user.memberSince}
            membershipLevel={user.membershipLevel}
            points={user.points}
          />
        </div>

        {/* 2. POINT SUMMARY & QUICK ACTIONS */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E7DA] shadow-sm space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8B7468] mb-1">
              <span>Next Tier Milestone</span>
              <span className="font-bold text-[#9B421F]">{tierInfo.nextTier}</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#F5E7DA] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#9B421F] to-[#E87832] transition-all duration-500"
                style={{ width: `${tierInfo.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#8B7468] mt-1.5 font-mono">
              <span>{user.points.toLocaleString()} PTS</span>
              {tierInfo.pointsNeeded > 0 ? (
                <span>{tierInfo.pointsNeeded.toLocaleString()} pts to {tierInfo.nextTier}</span>
              ) : (
                <span className="text-amber-600 font-semibold">Maximum Tier Reached!</span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8B7468]">Estimated Reward Value:</span>
              <span className="text-sm font-bold font-mono text-[#3D2117]">
                Rp {(user.points * 100).toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#8B7468]">Earning Rate:</span>
              <span className="font-semibold text-[#9B421F]">1 Point per Rp 10.000</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              to="/rewards"
              className="w-full py-3 px-4 rounded-2xl bg-[#9B421F] hover:bg-[#803517] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Gift className="w-4 h-4" />
              <span>Redeem Points for Rewards</span>
            </Link>
            <Link
              to="/discover"
              className="w-full py-3 px-4 rounded-2xl bg-[#FFF9F3] hover:bg-[#F5E7DA] text-[#3D2117] border border-[#F5E7DA] font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Coffee className="w-4 h-4 text-[#C85A2A]" />
              <span>Order & Earn Points</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. REAL-TIME SIMULATION CONTROLS (TEST REAL-TIME UPDATES & TIER UPGRADES) */}
      <div className="bg-gradient-to-br from-[#FFF9F3] to-[#F5E7DA]/50 rounded-3xl p-6 border border-[#F5E7DA] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-[#3D2117] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#E87832]" />
              <span>Real-Time Loyalty Simulation Studio</span>
            </h3>
            <p className="text-xs text-[#8B7468] mt-0.5">
              Test how the digital loyalty card and progress indicators dynamically react to balance changes.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#9B421F] font-bold">
            Live Balance: {user.points.toLocaleString()} PTS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <button
            onClick={() => handleSimulatePoints(50, 'Barista Manual Pour Over')}
            className="py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] flex items-center justify-center gap-1.5 shadow-xs transition-all hover:border-[#E87832] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>+50 Pts (Coffee)</span>
          </button>

          <button
            onClick={() => handleSimulatePoints(250, 'Single Origin Gayo 250g Beans')}
            className="py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] flex items-center justify-center gap-1.5 shadow-xs transition-all hover:border-[#E87832] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>+250 Pts (Beans)</span>
          </button>

          <button
            onClick={() => handleSimulatePoints(-500, 'Free Americano Voucher Redeemed')}
            disabled={user.points < 500}
            className="py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] flex items-center justify-center gap-1.5 shadow-xs transition-all hover:border-[#E87832] cursor-pointer disabled:opacity-50"
          >
            <Minus className="w-3.5 h-3.5 text-[#9B421F]" />
            <span>-500 Pts (Redeem)</span>
          </button>

          <button
            onClick={() => handleSimulatePoints(1000, 'VIP Cupping & Roasting Masterclass')}
            className="py-2 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] flex items-center justify-center gap-1.5 shadow-xs transition-all hover:border-[#E87832] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
            <span>+1.000 Pts (Boost)</span>
          </button>
        </div>

        {/* Quick Tier Jump Switches */}
        <div className="pt-3 border-t border-[#F5E7DA]/80 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold text-[#8B7468]">Switch Tier Theme:</span>
          {(['Bronze', 'Silver', 'Gold', 'Black Diamond'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => handleSimulateTier(tier)}
              className={`py-1 px-2.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                user.membershipLevel === tier
                  ? 'bg-[#9B421F] text-white shadow-xs'
                  : 'bg-white hover:bg-stone-50 text-[#8B7468] border border-[#F5E7DA]'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MEMBERSHIP BENEFITS SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E7DA] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#3D2117]">
              {user.membershipLevel} Tier Privileges
            </h2>
            <p className="text-xs text-[#8B7468] mt-0.5">
              Enjoy tailored perks unlocked as your coffee journey progresses.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F5E7DA] text-[#9B421F]">
            {user.membershipLevel} Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white text-[#9B421F] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xs text-[#3D2117]">100% Free Drink Vouchers</h3>
            <p className="text-[11px] text-[#8B7468] leading-relaxed">
              Redeemable across all registered coffee roasteries.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white text-[#9B421F] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xs text-[#3D2117]">Double Points Weekends</h3>
            <p className="text-[11px] text-[#8B7468] leading-relaxed">
              Earn 2 points per Rp 10.000 spent on Saturdays and Sundays.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white text-[#9B421F] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xs text-[#3D2117]">Priority Mobile Order</h3>
            <p className="text-[11px] text-[#8B7468] leading-relaxed">
              Skip lines at busy CBD hours with express barista queueing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-white text-[#9B421F] flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xs text-[#3D2117]">Cupping Masterclasses</h3>
            <p className="text-[11px] text-[#8B7468] leading-relaxed">
              Invites to exclusive seasonal single-origin sensory tastings.
            </p>
          </div>
        </div>
      </div>

      {/* 5. RECENT POINT ACTIVITIES TABLE / LIST */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E7DA] shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#3D2117]">Recent Point Activity</h2>
            <p className="text-xs text-[#8B7468] mt-0.5">
              Transparent ledger of all earned, redeemed, and promotional points.
            </p>
          </div>
          <span className="text-xs text-[#8B7468] font-mono">
            {transactions.length} records
          </span>
        </div>

        <div className="divide-y divide-[#F5E7DA]/70">
          {transactions.map((tx) => {
            const isEarned = tx.type === 'EARNED';
            const isRedeemed = tx.type === 'REDEEMED';
            const isBonus = tx.type === 'BONUS';

            return (
              <div
                key={tx.id}
                className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0 hover:bg-[#FFF9F3]/50 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      isEarned
                        ? 'bg-emerald-50 text-emerald-700'
                        : isRedeemed
                        ? 'bg-amber-50 text-[#9B421F]'
                        : 'bg-purple-50 text-purple-700'
                    }`}
                  >
                    {isEarned && <ArrowDownLeft className="w-5 h-5 text-emerald-600" />}
                    {isRedeemed && <ArrowUpRight className="w-5 h-5 text-[#9B421F]" />}
                    {isBonus && <Sparkles className="w-5 h-5 text-purple-600" />}
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#3D2117]">{tx.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[#8B7468] mt-0.5">
                      <span>{tx.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase font-semibold tracking-wider text-[10px]">
                        {tx.type}
                      </span>
                      {tx.referenceId && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{tx.referenceId}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono font-bold text-sm tabular-nums ${
                      tx.points > 0 ? 'text-emerald-700' : 'text-[#9B421F]'
                    }`}
                  >
                    {tx.points > 0 ? `+${tx.points}` : tx.points} PTS
                  </span>
                  <p className="text-[10px] text-emerald-600 font-medium">Completed</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
