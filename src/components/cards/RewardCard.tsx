import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { Reward } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface RewardCardProps {
  reward: Reward;
  onRedeemSuccess?: (code: string) => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward, onRedeemSuccess }) => {
  const { user } = useAuth();
  const { redeemReward } = useApp();

  const [isConfirming, setIsConfirming] = useState(false);
  const [successVoucher, setSuccessVoucher] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const userPoints = user?.points || 0;
  const canAfford = userPoints >= reward.pointsRequired;
  const pointsShort = reward.pointsRequired - userPoints;

  const handleRedeem = () => {
    const res = redeemReward(reward.id);
    if (res.success && res.code) {
      setSuccessVoucher(res.code);
      setIsConfirming(false);
      if (onRedeemSuccess) onRedeemSuccess(res.code);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E87832', '#9B421F', '#D4AF37'],
      });
    }
  };

  const copyCode = () => {
    if (successVoucher) {
      navigator.clipboard.writeText(successVoucher);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden border border-[#F5E7DA] hover:border-[#E87832]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
        <div>
          {/* Visual Header */}
          <div className="relative aspect-[16/9] overflow-hidden bg-[#F5E7DA]">
            <img
              src={reward.image}
              alt={reward.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Points Tag */}
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#3D2117] font-mono font-black text-xs shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
              <span>{reward.pointsRequired.toLocaleString()} PTS</span>
            </div>

            {/* Category */}
            <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
              <span className="text-[#F5E7DA]">{reward.category}</span>
              {reward.merchantName && (
                <>
                  <span className="mx-1.5 opacity-60">·</span>
                  <span>{reward.merchantName}</span>
                </>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-5">
            <h3 className="font-bold text-[#3D2117] text-base leading-snug line-clamp-1">
              {reward.title}
            </h3>

            <p className="text-xs text-[#8B7468] mt-2 line-clamp-2 leading-relaxed">
              {reward.description}
            </p>

            {/* Point Balance Meter */}
            <div className="mt-4 pt-3 border-t border-[#F5E7DA]/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#8B7468]">Your Balance</span>
                <span className="font-mono font-bold text-[#3D2117]">
                  {userPoints.toLocaleString()} / {reward.pointsRequired.toLocaleString()} pts
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#F5E7DA] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    canAfford
                      ? 'bg-gradient-to-r from-[#C85A2A] to-emerald-500'
                      : 'bg-gradient-to-r from-[#9B421F] to-[#E87832]'
                  }`}
                  style={{
                    width: `${Math.min(100, Math.round((userPoints / reward.pointsRequired) * 100))}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-5 pt-0">
          {successVoucher ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                  Voucher Claimed
                </p>
                <p className="font-mono font-bold text-xs text-emerald-950 mt-0.5">{successVoucher}</p>
              </div>
              <button
                onClick={copyCode}
                className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-lg font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsConfirming(true)}
              disabled={!canAfford}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                canAfford
                  ? 'bg-[#9B421F] hover:bg-[#803517] text-white shadow-md hover:shadow-lg cursor-pointer'
                  : 'bg-[#F5E7DA] text-[#8B7468] cursor-not-allowed'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>
                {canAfford ? 'Redeem Voucher' : `Need ${pointsShort.toLocaleString()} More Points`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FFF9F3] text-[#3D2117] max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-[#9B421F]/20">
            <div className="w-12 h-12 rounded-2xl bg-[#E87832]/20 text-[#9B421F] flex items-center justify-center mb-4">
              <Gift className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-[#3D2117]">Confirm Point Redemption</h3>
            <p className="text-xs text-[#8B7468] mt-1.5 leading-relaxed">
              You are about to redeem <strong>{reward.title}</strong> for{' '}
              <span className="font-mono font-bold text-[#9B421F]">
                {reward.pointsRequired.toLocaleString()} points
              </span>
              .
            </p>

            <div className="my-4 p-3.5 bg-white rounded-xl border border-[#F5E7DA] text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#8B7468]">Current Balance:</span>
                <span className="font-mono font-semibold">{userPoints.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between text-[#9B421F]">
                <span>Cost:</span>
                <span className="font-mono font-semibold">-{reward.pointsRequired.toLocaleString()} pts</span>
              </div>
              <div className="pt-1.5 border-t border-[#F5E7DA] flex justify-between font-bold">
                <span>Remaining Balance:</span>
                <span className="font-mono text-emerald-700">
                  {(userPoints - reward.pointsRequired).toLocaleString()} pts
                </span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setIsConfirming(false)}
                className="flex-1 py-2 px-3 bg-white border border-[#F5E7DA] text-xs font-semibold rounded-xl hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRedeem}
                className="flex-1 py-2 px-3 bg-[#9B421F] text-white text-xs font-semibold rounded-xl hover:bg-[#803517] shadow-sm cursor-pointer"
              >
                Confirm & Redeem
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
