import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Coffee,
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  Star,
  MapPin,
  ChevronRight,
  Gift,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { DigitalLoyaltyCard } from '../components/loyalty/DigitalLoyaltyCard';
import { MerchantCard } from '../components/cards/MerchantCard';
import { PromoCard } from '../components/cards/PromoCard';
import { MERCHANTS_DATA, PROMOTIONS_DATA } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const Home: React.FC = () => {
  const { user } = useAuth();
  const featuredMerchants = MERCHANTS_DATA.slice(0, 3);
  const popularPromos = PROMOTIONS_DATA.slice(0, 2);

  return (
    <div className="space-y-24 md:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION (Finozest-inspired clean spacious layout with digital card preview) */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5E7DA] text-[#9B421F] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
              <span>One Platform for Independent Coffee & Roasters</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3D2117] tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Discover Coffee Shops & <span className="text-[#9B421F]">Earn Rewards.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#8B7468] max-w-xl leading-relaxed">
              SIPZY connects you with Indonesia’s top artisanal roasters and specialty cafes in a single digital ecosystem. Order seamlessly, collect loyalty points on every cup, and unlock exclusive rewards.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/discover"
                className="py-3.5 px-7 rounded-2xl bg-[#9B421F] hover:bg-[#803517] text-white font-semibold text-sm shadow-xl shadow-orange-950/15 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Coffee Shops</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/rewards"
                className="py-3.5 px-7 rounded-2xl bg-white hover:bg-[#F5E7DA] text-[#3D2117] border border-[#F5E7DA] font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Gift className="w-4 h-4 text-[#C85A2A]" />
                <span>View Rewards Catalog</span>
              </Link>
            </div>

            {/* Social Trust Metrics Strip */}
            <div className="pt-6 border-t border-[#F5E7DA] flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-[#8B7468]">
              <div>
                <p className="text-xl font-black text-[#3D2117] font-mono tabular-nums">45+ Roasters</p>
                <p className="mt-0.5">Artisanal Partners</p>
              </div>
              <div className="h-8 w-px bg-[#F5E7DA]" />
              <div>
                <p className="text-xl font-black text-[#3D2117] font-mono tabular-nums">1 Pt / 10k</p>
                <p className="mt-0.5">Guaranteed Earn Rate</p>
              </div>
              <div className="h-8 w-px bg-[#F5E7DA]" />
              <div>
                <p className="text-xl font-black text-[#3D2117] font-mono tabular-nums">100% Free</p>
                <p className="mt-0.5">Digital Membership</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Digital Loyalty Card Hero composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Atmospheric Background Backdrop */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#9B421F]/20 to-[#E87832]/20 rounded-3xl blur-2xl transform -rotate-2" />

              <div className="relative transform hover:scale-[1.02] transition-transform duration-300">
                <DigitalLoyaltyCard
                  userName={user?.name || 'Raditya Pratama'}
                  memberId={user?.memberId || 'SIP-9824-JKT'}
                  memberSince={user?.memberSince || 'March 2024'}
                  membershipLevel={user?.membershipLevel || 'Gold'}
                  points={user?.points || 1450}
                  onViewWallet={() => {}}
                />
              </div>

              {/* Floating Coffee Shop Quick Note */}
              <div className="mt-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#F5E7DA] shadow-lg flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FFF9F3] p-1 border border-[#F5E7DA] shrink-0">
                  <img
                    src="/images/product_artisan_latte_1793559240756.jpg"
                    alt="Latte"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#3D2117] truncate">
                      Latest Brew: Flat White
                    </p>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      +4 PTS
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8B7468] truncate">
                    Senopati Artisan Roasters · Ready for Pickup
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
            Effortless Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2117] tracking-tight mt-2">
            How SIPZY Works
          </h2>
          <p className="text-sm text-[#8B7468] mt-3">
            No plastic stamp cards to lose. Sip your favorite blends and watch your rewards stack up automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#F5E7DA] shadow-sm relative group hover:border-[#E87832]/40 hover:shadow-lg transition-all">
            <span className="font-mono text-4xl font-black text-[#F5E7DA] group-hover:text-[#E87832]/30 transition-colors">
              01
            </span>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] flex items-center justify-center text-[#9B421F] my-4 shadow-sm">
              <MapPin className="w-6 h-6 text-[#9B421F]" />
            </div>
            <h3 className="text-lg font-bold text-[#3D2117]">Discover Coffee Shops</h3>
            <p className="text-xs text-[#8B7468] mt-2 leading-relaxed">
              Explore curated specialty roasters, aesthetic garden cafes, and single-origin coffee bars near you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#F5E7DA] shadow-sm relative group hover:border-[#E87832]/40 hover:shadow-lg transition-all">
            <span className="font-mono text-4xl font-black text-[#F5E7DA] group-hover:text-[#E87832]/30 transition-colors">
              02
            </span>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] flex items-center justify-center text-[#9B421F] my-4 shadow-sm">
              <Coffee className="w-6 h-6 text-[#9B421F]" />
            </div>
            <h3 className="text-lg font-bold text-[#3D2117]">Order Pickup or Dine-In</h3>
            <p className="text-xs text-[#8B7468] mt-2 leading-relaxed">
              Browse full barista menus, customize milk or ice, and pay securely via QRIS, Bank Transfer, or Cash.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#F5E7DA] shadow-sm relative group hover:border-[#E87832]/40 hover:shadow-lg transition-all">
            <span className="font-mono text-4xl font-black text-[#F5E7DA] group-hover:text-[#E87832]/30 transition-colors">
              03
            </span>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] flex items-center justify-center text-[#9B421F] my-4 shadow-sm">
              <Award className="w-6 h-6 text-[#9B421F]" />
            </div>
            <h3 className="text-lg font-bold text-[#3D2117]">Earn Points & Redeem</h3>
            <p className="text-xs text-[#8B7468] mt-2 leading-relaxed">
              Collect 1 point for every Rp 10.000 spent. Redeem anytime for free specialty drinks, pastries, or VIP cuppings.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COFFEE SHOPS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
              Handcrafted Selection
            </span>
            <h2 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
              Featured Coffee Shops
            </h2>
            <p className="text-xs text-[#8B7468] mt-1">
              Top-rated roasteries known for ethical sourcing and micro-lot excellence.
            </p>
          </div>

          <Link
            to="/discover"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9B421F] hover:text-[#803517] transition-colors"
          >
            <span>View All Coffee Shops</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMerchants.map((merchant) => (
            <MerchantCard key={merchant.id} merchant={merchant} />
          ))}
        </div>
      </section>

      {/* 4. LOYALTY BENEFITS SECTION */}
      <section className="bg-gradient-to-b from-[#F5E7DA]/50 to-[#FFF9F3] py-20 border-y border-[#F5E7DA]">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#9B421F] text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
                <span>Good Coffee, Better Rewards</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2117] tracking-tight leading-tight">
                Privileges That Grow With Every Pour
              </h2>
              <p className="text-sm text-[#8B7468] leading-relaxed">
                Unlike fragmented single-store punch cards, your SIPZY digital loyalty card is accepted across our entire curated network. One balance, endless indulgence.
              </p>

              <div className="pt-2">
                <Link
                  to="/wallet"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#9B421F] hover:bg-[#803517] text-white font-semibold text-xs transition-all shadow-md"
                >
                  <span>Explore Loyalty Wallet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Benefit 1 */}
              <div className="p-6 rounded-2xl bg-white border border-[#F5E7DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5 text-[#E87832]" />
                </div>
                <h4 className="font-bold text-[#3D2117] text-sm">Exclusive Rewards</h4>
                <p className="text-xs text-[#8B7468] mt-1.5 leading-relaxed">
                  Redeem points for full beverage vouchers, freshly baked croissants, and artisanal beans.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="p-6 rounded-2xl bg-white border border-[#F5E7DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center mb-3">
                  <Tag className="w-5 h-5 text-[#E87832]" />
                </div>
                <h4 className="font-bold text-[#3D2117] text-sm">Special Promotions</h4>
                <p className="text-xs text-[#8B7468] mt-1.5 leading-relaxed">
                  Enjoy member-only discount codes, BOGO specials, and weekend double points multipliers.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="p-6 rounded-2xl bg-white border border-[#F5E7DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-[#9B421F]" />
                </div>
                <h4 className="font-bold text-[#3D2117] text-sm">VIP Privileges</h4>
                <p className="text-xs text-[#8B7468] mt-1.5 leading-relaxed">
                  Reach Gold and Black Diamond tier to receive invitations to private cuppings and reserved lounge tables.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="p-6 rounded-2xl bg-white border border-[#F5E7DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center mb-3">
                  <Coffee className="w-5 h-5 text-[#9B421F]" />
                </div>
                <h4 className="font-bold text-[#3D2117] text-sm">Free Specialty Drinks</h4>
                <p className="text-xs text-[#8B7468] mt-1.5 leading-relaxed">
                  Every 500 to 1.000 points unlocks complimentary Americano, Cold Brew, or Flat White.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. POPULAR PROMOTIONS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
              Limited Time Offers
            </span>
            <h2 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
              Popular Promotions
            </h2>
            <p className="text-xs text-[#8B7468] mt-1">
              Claim exclusive voucher codes to use during your next checkout.
            </p>
          </div>

          <Link
            to="/promotions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9B421F] hover:text-[#803517] transition-colors"
          >
            <span>View All Promotions</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {popularPromos.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS (Advisable social proof adhering to skill guidelines) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
            Community Love
          </span>
          <h2 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
            Loved by Daily Coffee Drinkers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#F5E7DA] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#3D2117] leading-relaxed italic">
                “I hop between Senopati and SCBD cafes for meetings every day. Being able to use one single loyalty card and redeem free lattes seamlessly on my phone is brilliant.”
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#F5E7DA]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Tara"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-[#3D2117]">Tara Anindita</p>
                <p className="text-[11px] text-[#8B7468]">Product Designer · Gold Member</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#F5E7DA] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#3D2117] leading-relaxed italic">
                “The points accumulation is transparent: 1 point for every 10k. I redeemed my first pour-over within 2 weeks of using SIPZY. Excellent UI and zero lag.”
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#F5E7DA]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Dimas"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-[#3D2117]">Dimas Wicaksono</p>
                <p className="text-[11px] text-[#8B7468]">Financial Analyst · Silver Member</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#F5E7DA] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#3D2117] leading-relaxed italic">
                “As a roastery owner, partnering with SIPZY brought us recurring loyal customers from nearby business towers. The digital card QR scan is instant.”
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#F5E7DA]">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                alt="Aditya"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-[#3D2117]">Aditya Nugraha</p>
                <p className="text-[11px] text-[#8B7468]">Head Barista & Roaster</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1F100A] via-[#3D2117] to-[#120804] text-white p-8 sm:p-14 shadow-2xl border border-[#9B421F]/30">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E87832]">
              Elevate Your Daily Ritual
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Ready for Good Coffee & Better Rewards?
            </h2>
            <p className="text-xs sm:text-sm text-[#F5E7DA]/80 leading-relaxed">
              Create your free digital SIPZY membership in 30 seconds. Get an instant 150 points welcome bonus and 50% off your first coffee pickup.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/register"
                className="py-3 px-6 rounded-xl bg-[#E87832] hover:bg-[#d66923] text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <span>Join SIPZY Membership</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/discover"
                className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs flex items-center justify-center transition-all"
              >
                <span>Browse Menu First</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
