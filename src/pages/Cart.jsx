import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Coffee,
  Tag,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
export const Cart = () => {
  const { cart, updateCartQty, removeFromCart, clearCart, cartSubtotal, cartTotalCount } = useApp();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const handleApplyPromo = () => {
    setPromoError("");
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (code === "SLEMANKOP1" || code === "SIPZYFIRST") {
      const discountAmount2 = Math.min(25e3, Math.round(cartSubtotal * 0.5));
      setAppliedPromo({ code, discount: discountAmount2 });
    } else if (code === "STUDENTSLM") {
      const discountAmount2 = Math.min(cartSubtotal, 1e4);
      setAppliedPromo({ code, discount: discountAmount2 });
    } else if (code === "KALIURANGBOGO") {
      const discountAmount2 = Math.min(cartSubtotal, 2e4);
      setAppliedPromo({ code, discount: discountAmount2 });
    } else if (code.startsWith("SIP-") || code.includes("DISKON20") || code.includes("20PCT")) {
      const discountAmount2 = Math.round(cartSubtotal * 0.2);
      setAppliedPromo({ code, discount: discountAmount2 });
    } else {
      setPromoError('Kode promo atau voucher tidak valid. Coba "SLEMANKOP1" atau cek halaman Promo.');
    }
  };
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);
  const estimatedPoints = Math.floor(finalTotal / 1e4);
  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout", {
        state: {
          promoCode: appliedPromo?.code,
          discountAmount
        }
      });
    }
  };
  if (cart.items.length === 0) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#FFF9F3] text-[#9B421F] border border-[#F5E7DA] mx-auto flex items-center justify-center shadow-xs">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-[#3D2117]">Keranjang Belanja Kosong</h2>
        <p className="text-xs sm:text-sm text-[#8B7468] max-w-sm mx-auto">
          Jelajahi coffee shop pilihan di Sleman, pilih racikan kopi favoritmu, dan kumpulkan poin loyalitas pada setiap pesanan.
        </p>
        <div className="pt-2">
          <Link
      to="/discover"
      className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-[#9B421F] hover:bg-[#803517] text-white font-semibold text-xs transition-all shadow-sm"
    >
            <Coffee className="w-4 h-4" />
            <span>Jelajahi Coffee Shop Sleman</span>
          </Link>
        </div>
      </div>;
  }
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
          Konfirmasi Pesanan
        </span>
        <h1 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
          Keranjang Kopi
        </h1>
        <p className="text-xs sm:text-sm text-[#8B7468] mt-1">
          Memesan dari: <strong className="text-[#3D2117]">{cart.merchantName}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {
    /* Left: Items List */
  }
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#F5E7DA] shadow-xs divide-y divide-[#F5E7DA]/60">
            {cart.items.map((item) => <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                <img
    src={item.product.image}
    alt={item.product.name}
    referrerPolicy="no-referrer"
    className="w-20 h-20 rounded-2xl object-cover bg-[#F5E7DA] shrink-0"
  />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-xs sm:text-sm text-[#3D2117] leading-snug line-clamp-1">
                        {item.product.name}
                      </h3>
                      <button
    onClick={() => removeFromCart(item.product.id)}
    className="text-[#8B7468] hover:text-red-600 transition-colors cursor-pointer"
    title="Hapus dari keranjang"
  >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#8B7468] font-mono mt-0.5">
                      Rp {item.product.price.toLocaleString("id-ID")} / porsi
                    </p>
                    {item.notes && <p className="text-[10px] text-[#C85A2A] italic mt-0.5">
                        Catatan: {item.notes}
                      </p>}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {
    /* Quantity controls */
  }
                    <div className="flex items-center gap-2 bg-[#FFF9F3] border border-[#F5E7DA] rounded-xl px-2 py-1">
                      <button
    onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
    className="p-1 hover:text-[#9B421F] cursor-pointer"
    aria-label="Kurangi jumlah"
  >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono font-bold text-xs px-2 text-[#3D2117]">
                        {item.quantity}
                      </span>
                      <button
    onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
    className="p-1 hover:text-[#9B421F] cursor-pointer"
    aria-label="Tambah jumlah"
  >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono font-black text-sm text-[#3D2117]">
                      Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>)}
          </div>

          <div className="flex justify-between items-center px-2 text-xs">
            <button
    onClick={clearCart}
    className="text-[#8B7468] hover:text-red-600 font-semibold underline cursor-pointer"
  >
              Kosongkan Keranjang
            </button>
            <Link
    to={`/merchant/${cart.merchantId}`}
    className="text-[#9B421F] hover:text-[#803517] font-semibold"
  >
              + Tambah Menu Lain dari {cart.merchantName}
            </Link>
          </div>
        </div>

        {
    /* Right: Summary & Promo Code */
  }
        <div className="lg:col-span-5 space-y-5">
          {
    /* Promo code card */
  }
          <div className="bg-white rounded-3xl p-6 border border-[#F5E7DA] shadow-xs space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#8B7468] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#E87832]" />
              <span>Kode Promo atau Voucher</span>
            </h3>

            <div className="flex gap-2">
              <input
    type="text"
    value={promoInput}
    onChange={(e) => setPromoInput(e.target.value)}
    placeholder="Contoh: SLEMANKOP1"
    className="flex-1 py-2 px-3 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-mono font-semibold uppercase text-[#3D2117] placeholder-[#8B7468] focus:outline-none focus:border-[#9B421F]"
  />
              <button
    onClick={handleApplyPromo}
    className="py-2 px-4 rounded-xl bg-[#9B421F] hover:bg-[#803517] text-white text-xs font-semibold cursor-pointer transition-colors"
  >
                Gunakan
              </button>
            </div>

            {promoError && <p className="text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{promoError}</span>
              </p>}

            {appliedPromo && <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                <div>
                  <span className="font-bold">{appliedPromo.code}</span> berhasil terpasang!
                  <span className="block text-[10px]">Hemat Rp {appliedPromo.discount.toLocaleString("id-ID")}</span>
                </div>
                <button
    onClick={() => setAppliedPromo(null)}
    className="text-emerald-700 font-bold hover:underline text-[10px] cursor-pointer"
  >
                  Hapus
                </button>
              </div>}
          </div>

          {
    /* Cost breakdown */
  }
          <div className="bg-white rounded-3xl p-6 border border-[#F5E7DA] shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[#3D2117]">Ringkasan Pembayaran</h3>

            <div className="space-y-2 text-xs text-[#8B7468]">
              <div className="flex justify-between">
                <span>Subtotal Menu ({cartTotalCount} item):</span>
                <span className="font-mono text-[#3D2117] font-semibold">
                  Rp {cartSubtotal.toLocaleString("id-ID")}
                </span>
              </div>

              {discountAmount > 0 && <div className="flex justify-between text-emerald-700">
                  <span>Potongan Promo:</span>
                  <span className="font-mono font-semibold">
                    -Rp {discountAmount.toLocaleString("id-ID")}
                  </span>
                </div>}

              <div className="flex justify-between">
                <span>Biaya Layanan & Aplikasi:</span>
                <span className="text-emerald-700 font-semibold font-mono">GRATIS</span>
              </div>

              <div className="pt-3 border-t border-[#F5E7DA] flex justify-between items-baseline font-black text-base text-[#3D2117]">
                <span>Total Pembayaran:</span>
                <span className="font-mono text-xl text-[#9B421F]">
                  Rp {finalTotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {
    /* Loyalty points promise */
  }
            <div className="p-3 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#E87832] shrink-0" />
              <p className="text-[11px] text-[#8B7468]">
                Kamu akan mendapatkan <strong className="font-mono text-[#9B421F]">+{estimatedPoints} Poin Loyalitas</strong> dari pesanan ini.
              </p>
            </div>

            <button
    onClick={handleProceedToCheckout}
    className="w-full py-3.5 px-6 rounded-2xl bg-[#9B421F] hover:bg-[#803517] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
  >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>;
};
