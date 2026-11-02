import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Gift,
  Award,
  Wallet,
  ArrowRight,
  Clock,
  Compass,
  Star,
  Tag,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { DigitalLoyaltyCard } from '../components/loyalty/DigitalLoyaltyCard';
import { MerchantCard } from '../components/cards/MerchantCard';
import { RewardCard } from '../components/cards/RewardCard';
import { PromoCard } from '../components/cards/PromoCard';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { MERCHANTS_DATA, REWARDS_DATA, PROMOTIONS_DATA } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { orders, redemptions } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  const totalOrders = orders.length;
  const activeRewardsCount = redemptions.filter((r) => r.status === 'Active').length;
  const recommendedMerchants = MERCHANTS_DATA.slice(0, 3);
  const featuredRewards = REWARDS_DATA.slice(0, 2);
  const latestPromo = PROMOTIONS_DATA[0];

  return (
    <div className="space-y-10">
      {/* 1. WELCOME SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F5E7DA] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E87832]/30 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#8B7468]">Member Overview</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87832]" />
              <span className="text-xs font-bold text-[#9B421F]">{user.membershipLevel} Tier</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#3D2117] tracking-tight mt-0.5">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#8B7468] mt-1">
              Your digital pass is active across 45+ specialty roasteries in Jakarta.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/discover"
            className="py-2.5 px-4 rounded-xl bg-[#9B421F] hover:bg-[#803517] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Order Coffee</span>
          </Link>
          <Link
            to="/wallet"
            className="py-2.5 px-4 rounded-xl bg-[#FFF9F3] hover:bg-[#F5E7DA] text-[#3D2117] border border-[#F5E7DA] text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Wallet className="w-4 h-4 text-[#C85A2A]" />
            <span>View Wallet</span>
          </Link>
        </div>
      </div>

      {/* 2. STATISTICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-5 border border-[#F5E7DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8B7468]">
            <span>Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#C85A2A]" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#3D2117]">
              {totalOrders}
            </span>
            <p className="text-[11px] text-[#8B7468] mt-0.5">Completed & pickup orders</p>
          </div>
        </div>

        {/* Total Points */}
        <div className="bg-white rounded-3xl p-5 border border-[#F5E7DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8B7468]">
            <span>Loyalty Points</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#E87832]" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#3D2117]">
              {user.points.toLocaleString()}
            </span>
            <p className="text-[11px] text-[#8B7468] mt-0.5">
              Value ~ Rp {(user.points * 100).toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Active Rewards */}
        <div className="bg-white rounded-3xl p-5 border border-[#F5E7DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8B7468]">
            <span>Active Vouchers</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
              <Gift className="w-4 h-4 text-[#9B421F]" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#3D2117]">
              {activeRewardsCount}
            </span>
            <p className="text-[11px] text-[#8B7468] mt-0.5">Ready for cashier scan</p>
          </div>
        </div>

        {/* Membership Tier */}
        <div className="bg-white rounded-3xl p-5 border border-[#F5E7DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8B7468]">
            <span>Current Tier</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
              <Award className="w-4 h-4 text-[#C85A2A]" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xl sm:text-2xl font-black text-[#9B421F]">
              {user.membershipLevel}
            </span>
            <p className="text-[11px] text-[#8B7468] mt-0.5">Priority cafe queueing</p>
          </div>
        </div>
      </div>

      {/* 3. LOYALTY CARD PREVIEW & RECENT ORDERS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Digital Loyalty Card Preview */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-[#3D2117]">Your Digital SIPZY Pass</h2>
            <Link
              to="/wallet"
              className="text-xs font-semibold text-[#9B421F] hover:text-[#803517] flex items-center gap-1"
            >
              <span>Full Wallet Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <DigitalLoyaltyCard
            userName={user.name}
            memberId={user.memberId}
            memberSince={user.memberSince}
            membershipLevel={user.membershipLevel}
            points={user.points}
            compact
            onViewWallet={() => navigate('/wallet')}
          />
        </div>

        {/* Right: Recent Orders Preview */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-[#F5E7DA] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#3D2117]">Recent Orders</h2>
            <Link
              to="/history"
              className="text-xs font-semibold text-[#9B421F] hover:text-[#803517] flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#F5E7DA]/60">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#3D2117]">{order.merchantName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8B7468] mt-0.5">
                    {order.date} · {order.orderType} ({order.items.length} items)
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-mono font-bold text-[#3D2117]">
                    Rp {order.totalPayment.toLocaleString('id-ID')}
                  </p>
                  <span className="text-[10px] text-[#9B421F] font-semibold">
                    +{order.pointsEarned} pts
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/history"
              className="w-full py-2.5 rounded-xl bg-[#FFF9F3] hover:bg-[#F5E7DA] text-[#9B421F] border border-[#F5E7DA] text-xs font-semibold flex items-center justify-center transition-colors"
            >
              View Full Order History
            </Link>
          </div>
        </div>
      </div>

      {/* 4. RECOMMENDED COFFEE SHOPS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xl font-bold text-[#3D2117]">Recommended Coffee Spots</h2>
            <p className="text-xs text-[#8B7468]">Based on specialty bean sourcing and customer reviews.</p>
          </div>
          <Link
            to="/discover"
            className="text-xs font-semibold text-[#9B421F] hover:text-[#803517] flex items-center gap-1"
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedMerchants.map((merchant) => (
            <MerchantCard key={merchant.id} merchant={merchant} />
          ))}
        </div>
      </div>

      {/* 5. AVAILABLE REWARDS & ACTIVE PROMOTIONS PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Rewards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-[#3D2117]">Available Rewards</h2>
            <Link to="/rewards" className="text-xs font-semibold text-[#9B421F]">
              View All Rewards →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </div>

        {/* Promo */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-[#3D2117]">Active Promotion</h2>
            <Link to="/promotions" className="text-xs font-semibold text-[#9B421F]">
              View Promos →
            </Link>
          </div>
          {latestPromo && <PromoCard promo={latestPromo} />}
        </div>
      </div>
    </div>
  );
};
