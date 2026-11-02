import React, { useState } from 'react';
import { Plus, Check, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  merchantId: string;
  merchantName: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, merchantId, merchantName }) => {
  const { addToCart, resetCartAndAdd } = useApp();
  const [showSwitchModal, setShowSwitchModal] = useState<{ previousMerchant: string } | null>(null);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAdd = () => {
    const res = addToCart(product, merchantId, merchantName, 1);
    if (res.requiresReset && res.previousMerchant) {
      setShowSwitchModal({ previousMerchant: res.previousMerchant });
    } else if (res.success) {
      setAddedAnim(true);
      setTimeout(() => setAddedAnim(false), 1200);
    }
  };

  const handleConfirmReset = () => {
    resetCartAndAdd(product, merchantId, merchantName, 1);
    setShowSwitchModal(null);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 border border-[#F5E7DA] hover:border-[#E87832]/30 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#F5E7DA] shrink-0">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {product.isPopular && (
              <span className="absolute top-1.5 left-1.5 bg-[#9B421F] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-sm">
                Popular
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-[#8B7468]">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-0.5 text-[#9B421F] font-semibold">
                <Sparkles className="w-3 h-3 text-[#E87832]" />+{product.pointsEarned} pts
              </span>
            </div>

            <h4 className="font-bold text-[#3D2117] text-sm mt-0.5 leading-snug line-clamp-1">
              {product.name}
            </h4>

            <p className="text-xs text-[#8B7468] mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-2 text-sm font-black font-mono text-[#3D2117]">
              Rp {product.price.toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-3 pt-3 border-t border-[#F5E7DA]/60 flex items-center justify-between">
          <span className="text-[11px] text-[#8B7468]">
            Earn 1 pt per Rp 10.000
          </span>

          <button
            onClick={handleAdd}
            className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              addedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-[#9B421F] hover:bg-[#803517] text-white shadow-sm hover:shadow'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Different Merchant Warning Modal */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#FFF9F3] text-[#3D2117] max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-[#9B421F]/20">
            <h3 className="font-bold text-base">Start a new order?</h3>
            <p className="text-xs text-[#8B7468] mt-2 leading-relaxed">
              Your cart currently contains items from <strong>{showSwitchModal.previousMerchant}</strong>.
              SIPZY orders must be from a single merchant per checkout.
            </p>
            <div className="flex gap-2.5 mt-5">
              <button
                onClick={() => setShowSwitchModal(null)}
                className="flex-1 py-2 px-3 bg-white border border-[#F5E7DA] text-xs font-semibold rounded-xl hover:bg-stone-50 cursor-pointer"
              >
                Keep Existing
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2 px-3 bg-[#9B421F] text-white text-xs font-semibold rounded-xl hover:bg-[#803517] shadow-sm cursor-pointer"
              >
                Replace Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
