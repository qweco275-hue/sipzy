import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PromoCard } from "../components/cards/PromoCard";
import { loyaltyService } from "../services/loyaltyService";
import { useApp } from "../context/AppContext";
export const Promotions = () => {
  const promotions = loyaltyService.getPromotions();
  const { claimedPromos } = useApp();
  const [filter, setFilter] = useState("all");
  const featured = promotions.filter((p) => p.isFeatured);
  const activeList = filter === "claimed" ? promotions.filter((p) => claimedPromos.includes(p.promoCode)) : promotions;
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {
    /* Header Halaman */
  }
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
          Diskon Eksklusif & Pengganda Poin Sleman
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3D2117] tracking-tight">
          Promosi SIPZY Sleman
        </h1>
        <p className="text-sm text-[#8B7468] max-w-2xl leading-relaxed">
          Manfaatkan diskon waktu terbatas, penawaran Beli-1-Gratis-1, dan poin ganda akhir pekan di seluruh coffee shop dan roastery mitra di Sleman.
        </p>
      </div>

      {
    /* Banner Promo Unggulan */
  }
      {featured.length > 0 && <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1F100A] via-[#9B421F] to-[#C85A2A] text-white p-6 sm:p-10 shadow-xl border border-white/10">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
              <span>Kampanye Unggulan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {featured[0].title}
            </h2>
            <p className="text-xs sm:text-sm text-[#F5E7DA] leading-relaxed">
              {featured[0].description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="bg-white text-[#3D2117] font-bold px-3 py-1.5 rounded-xl shadow-xs">
                Kode: {featured[0].promoCode}
              </div>
              <span>Berlaku hingga {featured[0].validUntil}</span>
            </div>
          </div>
        </div>}

      {
    /* Tab Filter Promo */
  }
      <div className="flex items-center justify-between border-b border-[#F5E7DA] pb-3">
        <div className="flex gap-4 text-xs font-semibold">
          <button
    onClick={() => setFilter("all")}
    className={`pb-3 cursor-pointer ${filter === "all" ? "text-[#9B421F] border-b-2 border-[#9B421F] font-bold" : "text-[#8B7468] hover:text-[#3D2117]"}`}
  >
            Semua Promo Aktif ({promotions.length})
          </button>
          <button
    onClick={() => setFilter("claimed")}
    className={`pb-3 cursor-pointer ${filter === "claimed" ? "text-[#9B421F] border-b-2 border-[#9B421F] font-bold" : "text-[#8B7468] hover:text-[#3D2117]"}`}
  >
            Sudah Diklaim Anda ({claimedPromos.length})
          </button>
        </div>
        <span className="text-xs text-[#8B7468] hidden sm:inline">
          Otomatis terpotong saat kode dimasukkan di halaman checkout
        </span>
      </div>

      {
    /* Grid Kartu Promo */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activeList.map((promo) => <PromoCard key={promo.id} promo={promo} />)}
      </div>

      {
    /* Kotak Ketentuan */
  }
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E7DA] text-xs text-[#8B7468] space-y-2">
        <h4 className="font-bold text-[#3D2117] text-sm">Panduan & Ketentuan Promosi di Sleman</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Promosi tidak dapat digabungkan dengan produk biji kopi grosir yang sudah berdiskon.</li>
          <li>Setiap kode promo dapat digunakan satu kali per transaksi yang memenuhi syarat.</li>
          <li>Bonus poin loyalitas akan dikreditkan secara instan ke kartu digital setelah pesanan selesai.</li>
        </ul>
      </div>
    </div>;
};
