import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Award, Sparkles, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E7DA] text-[#9B421F] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
          <span>Our Vision & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#3D2117] tracking-tight">
          Good Coffee, <span className="text-[#9B421F]">Better Rewards.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#8B7468] leading-relaxed">
          SIPZY was founded on a simple realization: Indonesian independent roasteries brew world-class coffee, but customers carry a dozen different paper loyalty cards. We built one unified platform to connect coffee lovers with their favorite artisan cafes.
        </p>
      </div>

      {/* Visual Showcase */}
      <div className="relative rounded-3xl overflow-hidden aspect-[16/8] shadow-xl border border-[#F5E7DA]">
        <img
          src="/images/hero_coffee_atmosphere_1793559239277.jpg"
          alt="Artisanal Roastery"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8 text-white">
          <p className="text-xs sm:text-sm font-medium text-[#F5E7DA]">
            Crafting the ultimate digital bridge between passionate Indonesian baristas and daily coffee patrons.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-7 border border-[#F5E7DA] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#3D2117]">Artisanal Curation</h3>
          <p className="text-xs text-[#8B7468] leading-relaxed">
            Every merchant in our ecosystem is selected for craftsmanship, ethical bean sourcing, and passionate barista staff.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-[#F5E7DA] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#3D2117]">Unified Rewards</h3>
          <p className="text-xs text-[#8B7468] leading-relaxed">
            1 Point per Rp 10.000 spent. Collect points in Senopati, redeem a pour-over in SCBD or Dharmawangsa seamlessly.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-[#F5E7DA] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#3D2117]">Merchant-First Tech</h3>
          <p className="text-xs text-[#8B7468] leading-relaxed">
            We provide local cafes with digital ordering and loyalty tools that rival multinational chains without heavy hardware overhead.
          </p>
        </div>
      </div>

      {/* Partner with us CTA */}
      <div className="bg-gradient-to-r from-[#1F100A] via-[#3D2117] to-[#120804] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#9B421F]/30">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black">Are you a Roastery or Cafe Owner?</h3>
          <p className="text-xs text-[#F5E7DA]/80 max-w-lg">
            Join the SIPZY network and welcome thousands of loyal coffee members to your counter with zero setup friction.
          </p>
        </div>
        <a
          href="mailto:partners@sipzy.id?subject=Partnering%20with%20SIPZY"
          className="py-3 px-6 rounded-xl bg-[#E87832] hover:bg-[#d66923] text-white text-xs font-bold whitespace-nowrap shadow-md transition-colors"
        >
          Inquire for Partnership
        </a>
      </div>
    </div>
  );
};
