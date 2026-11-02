import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Coffee,
  QrCode,
  Banknote,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Building2
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
export const Checkout = () => {
  const { cart, cartSubtotal, placeOrder } = useApp();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const promoCode = state?.promoCode;
  const discountAmount = state?.discountAmount || 0;
  const [orderType, setOrderType] = useState("Pickup (Bawa Pulang)");
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [customerName, setCustomerName] = useState(user?.name || "Bagus Wicaksono");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "+62 813-2890-1122");
  const [pickupNotes, setPickupNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  if (cart.items.length === 0 && !completedOrder) {
    return <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#3D2117]">Belum ada pesanan aktif</h2>
        <p className="text-xs text-[#8B7468]">Keranjang belanjamu masih kosong. Silakan pilih menu kopi terlebih dahulu.</p>
        <Link
      to="/discover"
      className="inline-flex py-2.5 px-5 rounded-xl bg-[#9B421F] text-white text-xs font-semibold"
    >
          Jelajahi Coffee Shop Sleman
        </Link>
      </div>;
  }
  const finalTotal = Math.max(0, cartSubtotal - discountAmount);
  const pointsToEarn = Math.floor(finalTotal / 1e4);
  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder({
        merchantId: cart.merchantId || "m_kaliurang",
        merchantName: cart.merchantName || "Klinik Kopi & Roastery Kaliurang",
        items: cart.items,
        orderType,
        paymentMethod,
        subtotal: cartSubtotal,
        discount: discountAmount,
        promoCode
      });
      setIsSubmitting(false);
      setCompletedOrder(order);
    }, 800);
  };
  if (completedOrder) {
    return <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-md animate-in zoom-in">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-[#9B421F] uppercase tracking-wider">
            Pesanan #{completedOrder.id} Berhasil Dibuat
          </span>
          <h1 className="text-3xl font-black text-[#3D2117] tracking-tight mt-1">
            Kopi Sedang Diracik Barista!
          </h1>
          <p className="text-xs sm:text-sm text-[#8B7468] mt-2 max-w-md mx-auto leading-relaxed">
            Terima kasih, {customerName}. Barista di <strong>{completedOrder.merchantName}</strong> telah menerima pesananmu untuk {completedOrder.orderType}.
          </p>
        </div>

        {
      /* Loyalty Points Awarded Card */
    }
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#1F100A] via-[#3D2117] to-[#120804] text-white border border-[#E87832]/30 shadow-xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E87832]/30 text-[#E87832] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Poin Loyalitas Masuk ke Dompet</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-black font-mono text-white tabular-nums">
              +{completedOrder.pointsEarned}
            </span>
            <span className="text-sm font-bold text-[#E87832] uppercase">POIN</span>
          </div>
          <p className="text-xs text-[#F5E7DA]/80">
            Langsung dikreditkan ke Kartu Loyalitas Digital SIPZY milikmu.
          </p>
        </div>

        {
      /* Order Details Summary Box */
    }
        <div className="bg-white rounded-3xl p-6 border border-[#F5E7DA] text-left text-xs space-y-2 shadow-xs">
          <div className="flex justify-between pb-2 border-b border-[#F5E7DA]">
            <span className="text-[#8B7468]">Lokasi Coffee Shop:</span>
            <span className="font-bold text-[#3D2117]">{completedOrder.merchantName}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-[#F5E7DA]">
            <span className="text-[#8B7468]">Metode Pembayaran:</span>
            <span className="font-semibold text-[#3D2117]">{completedOrder.paymentMethod} (Simulasi Berhasil)</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-[#F5E7DA]">
            <span className="text-[#8B7468]">Total Dibayar:</span>
            <span className="font-mono font-bold text-sm text-[#9B421F]">
              Rp {completedOrder.totalPayment.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="pt-1 text-[#8B7468] text-[11px]">
            {completedOrder.items.length} jenis pesanan. Tunjukkan QR Member SIPZY kepada barista di kasir saat pengambilan.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
      to="/history"
      className="flex-1 py-3 px-4 rounded-xl bg-[#9B421F] hover:bg-[#803517] text-white text-xs font-semibold shadow-sm transition-all"
    >
            Lihat Riwayat Pesanan
          </Link>
          <Link
      to="/wallet"
      className="flex-1 py-3 px-4 rounded-xl bg-[#FFF9F3] hover:bg-[#F5E7DA] text-[#3D2117] border border-[#F5E7DA] text-xs font-semibold transition-all"
    >
            Buka Kartu Loyalitas
          </Link>
        </div>
      </div>;
  }
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
          Langkah Terakhir
        </span>
        <h1 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
          Pembayaran & Konfirmasi
        </h1>
        <p className="text-xs sm:text-sm text-[#8B7468] mt-1">
          Periksa detail pengambilan kopi dan selesaikan pembayaran untuk mendapatkan poin reward loyalitas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {
    /* Left: Options & Form */
  }
        <div className="lg:col-span-7 space-y-6">
          {
    /* Order Type Selector */
  }
          <div className="bg-white rounded-3xl p-6 border border-[#F5E7DA] shadow-xs space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#8B7468]">
              1. Pilihan Pengambilan
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["Pickup (Bawa Pulang)", "Dine-in (Makan di Tempat)"].map((type) => <button
    key={type}
    type="button"
    onClick={() => setOrderType(type)}
    className={`py-3 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${orderType === type ? "bg-[#9B421F] text-white border-[#9B421F] shadow-sm" : "bg-[#FFF9F3] text-[#8B7468] hover:text-[#3D2117] border-[#F5E7DA]"}`}
  >
                  <Coffee className="w-4 h-4" />
                  <span>{type}</span>
                </button>)}
            </div>
            <p className="text-[11px] text-[#8B7468]">
              {orderType === "Pickup (Bawa Pulang)" ? "Kopi akan dikemas dalam takeaway insulated cup ramah lingkungan dan siap di meja barista." : "Nikmati seduhan kopi langsung di tempat dengan cangkir keramik artisan; dilayani langsung ke mejamu."}
            </p>
          </div>

          {
    /* Customer Information */
  }
          <div className="bg-white rounded-3xl p-6 border border-[#F5E7DA] shadow-xs space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#8B7468]">
              2. Data Kontak Pelanggan
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                  Nama Lengkap
                </label>
                <input
    type="text"
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    className="w-full py-2.5 px-3.5 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-medium text-[#3D2117] focus:outline-none focus:border-[#9B421F]"
  />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                  Nomor WhatsApp / HP (untuk notifikasi pesanan)
                </label>
                <input
    type="text"
    value={customerPhone}
    onChange={(e) => setCustomerPhone(e.target.value)}
    className="w-full py-2.5 px-3.5 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-medium text-[#3D2117] focus:outline-none focus:border-[#9B421F]"
  />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3D2117] mb-1">
                  Catatan untuk Barista (Opsional)
                </label>
                <input
    type="text"
    value={pickupNotes}
    onChange={(e) => setPickupNotes(e.target.value)}
    placeholder="Contoh: Es sedikit (less ice), pisahkan sedotan, atau disajikan panas"
    className="w-full py-2.5 px-3.5 rounded-xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-medium text-[#3D2117] focus:outline-none focus:border-[#9B421F]"
  />
              </div>
            </div>
          </div>

          {
    /* Payment Method Simulator */
  }
          <div className="bg-white rounded-3xl p-6 border border-[#F5E7DA] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#8B7468]">
                3. Metode Pembayaran
              </h3>
              <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md font-semibold">
                Simulasi Instan
              </span>
            </div>

            <div className="space-y-2.5">
              {[
    { id: "QRIS", title: "QRIS Nasional (BCA, GoPay, OVO, ShopeePay)", icon: QrCode, desc: "Pindai otomatis via aplikasi m-banking atau e-wallet Indonesia" },
    { id: "Transfer Bank", title: "Virtual Account Bank (BCA / Mandiri / BNI)", icon: Building2, desc: "Konfirmasi otomatis dalam hitungan detik" },
    { id: "Bayar di Kasir", title: "Bayar Tunai di Kasir Coffee Shop", icon: Banknote, desc: "Bayar langsung ke barista saat mengambil kopi di counter" }
  ].map((method) => {
    const Icon = method.icon;
    const active = paymentMethod === method.id;
    return <label
      key={method.id}
      onClick={() => setPaymentMethod(method.id)}
      className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${active ? "border-[#9B421F] bg-[#FFF9F3]" : "border-[#F5E7DA] hover:bg-stone-50"}`}
    >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${active ? "bg-[#9B421F] text-white" : "bg-[#F5E7DA] text-[#9B421F]"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#3D2117]">{method.title}</p>
                        <p className="text-[11px] text-[#8B7468]">{method.desc}</p>
                      </div>
                    </div>
                    <input
      type="radio"
      name="payment"
      checked={active}
      onChange={() => setPaymentMethod(method.id)}
      className="accent-[#9B421F]"
    />
                  </label>;
  })}
            </div>

            {
    /* QRIS Simulated Preview */
  }
            {paymentMethod === "QRIS" && <div className="p-4 bg-[#FFF9F3] rounded-2xl border border-dashed border-[#C85A2A]/40 text-center space-y-2">
                <p className="text-[11px] text-[#8B7468] font-medium">
                  QRIS terverifikasi Bank Indonesia. Pembayaran otomatis terkonfirmasi saat klik tombol di bawah.
                </p>
                <div className="w-24 h-24 mx-auto bg-white p-2 rounded-xl shadow-xs border border-[#F5E7DA] flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-[#3D2117]" />
                </div>
                <p className="text-[10px] font-mono font-bold text-[#9B421F]">NMID: ID102983749281-SLM</p>
              </div>}
          </div>
        </div>

        {
    /* Right: Order Summary Box */
  }
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#F5E7DA] shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-sm text-[#3D2117]">Ringkasan Pesanan</h3>
            <p className="text-xs text-[#8B7468] mt-0.5">
              Dari {cart.merchantName}
            </p>
          </div>

          <div className="divide-y divide-[#F5E7DA]/60 space-y-2">
            {cart.items.map((item) => <div key={item.product.id} className="pt-2 flex justify-between text-xs">
                <div>
                  <span className="font-bold text-[#3D2117]">{item.quantity}x</span>{" "}
                  <span className="text-[#3D2117]">{item.product.name}</span>
                  {item.notes && <p className="text-[10px] text-[#8B7468] italic">Catatan: {item.notes}</p>}
                </div>
                <span className="font-mono font-bold text-[#3D2117]">
                  Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                </span>
              </div>)}
          </div>

          <div className="pt-3 border-t border-[#F5E7DA] space-y-2 text-xs text-[#8B7468]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono text-[#3D2117]">
                Rp {cartSubtotal.toLocaleString("id-ID")}
              </span>
            </div>

            {discountAmount > 0 && <div className="flex justify-between text-emerald-700">
                <span>Potongan ({promoCode || "Promo"}):</span>
                <span className="font-mono font-bold">
                  -Rp {discountAmount.toLocaleString("id-ID")}
                </span>
              </div>}

            <div className="flex justify-between">
              <span>Biaya Layanan:</span>
              <span className="font-semibold text-emerald-700 font-mono">Rp 0 (GRATIS)</span>
            </div>

            <div className="pt-2 border-t border-[#F5E7DA] flex justify-between items-baseline font-black text-sm text-[#3D2117]">
              <span>Total Bayar:</span>
              <span className="font-mono text-xl text-[#9B421F]">
                Rp {finalTotal.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {
    /* Point Reward Guarantee */
  }
          <div className="p-3.5 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#9B421F]">
              <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
              <span>Perolehan Poin Loyalitas:</span>
            </div>
            <p className="text-xs text-[#8B7468]">
              Kamu akan menerima <strong className="font-mono text-[#3D2117]">+{pointsToEarn} poin</strong> yang langsung masuk ke akun SIPZY milikmu (1 poin per Rp 10.000).
            </p>
          </div>

          <button
    onClick={handlePlaceOrder}
    disabled={isSubmitting}
    className="w-full py-3.5 px-6 rounded-2xl bg-[#9B421F] hover:bg-[#803517] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
  >
            {isSubmitting ? <span>Memproses Pesanan Kopi...</span> : <>
                <span>Bayar Sekarang (Rp {finalTotal.toLocaleString("id-ID")})</span>
                <ArrowRight className="w-4 h-4" />
              </>}
          </button>
        </div>
      </div>
    </div>;
};
