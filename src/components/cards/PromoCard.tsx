import React, { useState } from 'react';
import { Tag, Copy, Check, Clock, Sparkles } from 'lucide-react';
import { Promotion } from '../../types';
import { useApp } from '../../context/AppContext';

interface PromoCardProps {
  promo: Promotion;
}

export const PromoCard: React.FC<PromoCardProps> = ({ promo }) => {
  const { claimedPromos, claimPromo } = useApp();
  const [copied, setCopied] = useState(false);
  const isClaimed = claimedPromos.includes(promo.promoCode);

  const handleCopyOrClaim = () => {
    claimPromo(promo.promoCode);
    navigator.clipboard.writeText(promo.promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-3xl p-6 border border-[#F5E7DA] hover:border-[#E87832]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Decorative top-right warm glow */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#E87832]/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-[#8B7468]">
            <Tag className="w-3.5 h-3.5 text-[#E87832]" />
            <span className="font-medium">{promo.category}</span>
            {promo.merchantName && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#9B421F] font-semibold">{promo.merchantName}</span>
              </>
            )}
          </div>

          <div className="px-3 py-1 rounded-full bg-[#9B421F] text-white text-xs font-black tracking-wider uppercase shadow-sm">
            {promo.discountBadge}
          </div>
        </div>

        {/* Promo Title & Tagline */}
        <h3 className="font-bold text-[#3D2117] text-lg group-hover:text-[#9B421F] transition-colors leading-snug">
          {promo.title}
        </h3>
        <p className="text-xs font-medium text-[#C85A2A] mt-1">{promo.tagline}</p>

        {/* Description */}
        <p className="text-xs text-[#8B7468] mt-3 leading-relaxed">{promo.description}</p>
      </div>

      {/* Code Box & Expiry */}
      <div className="mt-5 pt-4 border-t border-[#F5E7DA]/70">
        <div className="flex items-center justify-between text-[11px] text-[#8B7468] mb-2.5">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#C85A2A]" />
            Valid until {promo.validUntil}
          </span>
          <span>Min. Rp {promo.minSpend.toLocaleString('id-ID')}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 py-2 px-3 rounded-xl bg-[#FFF9F3] border border-dashed border-[#C85A2A]/40 flex items-center justify-between">
            <span className="font-mono font-bold text-xs text-[#3D2117] tracking-wider">
              {promo.promoCode}
            </span>
            <span className="text-[10px] text-[#8B7468]">CODE</span>
          </div>

          <button
            onClick={handleCopyOrClaim}
            className={`py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : isClaimed
                ? 'bg-[#F5E7DA] text-[#9B421F] hover:bg-[#ebd5c2]'
                : 'bg-[#9B421F] hover:bg-[#803517] text-white shadow-sm'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : isClaimed ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
                <span>Claimed</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Claim Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
