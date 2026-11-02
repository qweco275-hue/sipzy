import { Link } from "react-router-dom";
import {
  ArrowRight,
  Coffee,
  Sparkles,
  Award,
  Star,
  MapPin,
  ChevronRight,
  Gift,
  Tag
} from "lucide-react";
import { DigitalLoyaltyCard } from "../components/loyalty/DigitalLoyaltyCard";
import { MerchantCard } from "../components/cards/MerchantCard";
import { PromoCard } from "../components/cards/PromoCard";
import { MERCHANTS_DATA, PROMOTIONS_DATA } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
export const Home = () => {
  const { user } = useAuth();
  const featuredMerchants = MERCHANTS_DATA.slice(0, 3);
  const popularPromos = PROMOTIONS_DATA.slice(0, 2);
  return <div className="space-y-24 md:space-y-32 pb-24 overflow-hidden">
      {
    /* 1. HERO SECTION (Layout Finozest dengan preview kartu digital) */
  }
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {
    /* Kolom Kiri: Headline & Ajakan Bertindak */
  }
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5E7DA] text-[#9B421F] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
              <span>Satu Platform untuk Kopi & Roastery di Sleman, Yogyakarta</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3D2117] tracking-tight leading-[1.15]" style={{ textWrap: "balance" }}>
              Temukan Coffee Shop & <span className="text-[#9B421F]">Kumpulkan Reward.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#8B7468] max-w-xl leading-relaxed">
              SIPZY menghubungkan Anda dengan puluhan roastery artisanal dan kafe spesialti terbaik di Sleman, Yogyakarta. Pesan lebih praktis, kumpulkan poin loyalitas di setiap tegukan, dan nikmati reward eksklusif.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
    to="/discover"
    className="py-3.5 px-7 rounded-2xl bg-[#9B421F] hover:bg-[#803517] text-white font-semibold text-sm shadow-xl shadow-orange-950/15 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
  >
                <span>Jelajahi Coffee Shop Sleman</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
    to="/rewards"
    className="py-3.5 px-7 rounded-2xl bg-white hover:bg-[#F5E7DA] text-[#3D2117] border border-[#F5E7DA] font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
  >
                <Gift className="w-4 h-4 text-[#C85A2A]" />
                <span>Lihat Katalog Hadiah</span>
              </Link>
            </div>

            {
    /* Metrik Kepercayaan */
  }
            <div className="pt-6 border-t border-[#F5E7DA] flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-[#8B7468]">
              <div>
                <p className="text-xl font-black text-[#3D2117] font-mono tabular-nums">40+ Kedai</p>
                <p className="mt-0.5">Mitra Roastery Sleman</p>
              </div>
              <div className="h-8 w-px bg-[#F5E7DA]" />
              <div>
                <p className="text-xl font-black text-[#3D2117] font-mono tabular-nums">1 Poin / 10rb</p>
                <p className="mt-0.5">Jaminan Perolehan Poin</p>
              </div>
              <div className="h-8 w-px bg-[#F5E7DA]" />
              <div>
                <p className="text-xl font-black text-[#3D2117] font-mono tabular-nums">100% Gratis</p>
                <p className="mt-0.5">Membership Digital Seumur Hidup</p>
              </div>
            </div>
          </div>

          {
    /* Kolom Kanan: Visual Kartu Loyalitas Digital */
  }
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#9B421F]/20 to-[#E87832]/20 rounded-3xl blur-2xl transform -rotate-2" />

              <div className="relative transform hover:scale-[1.02] transition-transform duration-300">
                <DigitalLoyaltyCard
    userName={user?.name || "Bagus Wicaksono"}
    memberId={user?.memberId || "SIP-9824-SLM"}
    memberSince={user?.memberSince || "Maret 2024"}
    membershipLevel={user?.membershipLevel || "Gold"}
    points={user?.points || 1450}
    onViewWallet={() => {
    }}
  />
              </div>

              {
    /* Info Seduhan Terbaru */
  }
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
                      Seduhan Terakhir: V60 Arabica Merapi
                    </p>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      +3 POIN
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8B7468] truncate">
                    Klinik Kopi & Roastery Kaliurang · Siap Diambil
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
    /* 2. CARA KERJA SIPZY */
  }
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
            Langkah Mudah & Praktis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2117] tracking-tight mt-2">
            Cara Kerja SIPZY Sleman
          </h2>
          <p className="text-sm text-[#8B7468] mt-3">
            Tidak perlu lagi membawa tumpukan kartu stempel kertas. Kumpulkan poin dan tukarkan kopi favorit langsung dari ponsel Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {
    /* Langkah 1 */
  }
          <div className="bg-white rounded-3xl p-8 border border-[#F5E7DA] shadow-sm relative group hover:border-[#E87832]/40 hover:shadow-lg transition-all">
            <span className="font-mono text-4xl font-black text-[#F5E7DA] group-hover:text-[#E87832]/30 transition-colors">
              01
            </span>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] flex items-center justify-center text-[#9B421F] my-4 shadow-sm">
              <MapPin className="w-6 h-6 text-[#9B421F]" />
            </div>
            <h3 className="text-lg font-bold text-[#3D2117]">Jelajah Coffee Shop Sleman</h3>
            <p className="text-xs text-[#8B7468] mt-2 leading-relaxed">
              Temukan roastery independen di Kaliurang, kafe mahasiswa di Seturan, hingga bistro asri di Jalan Damai & Palagan.
            </p>
          </div>

          {
    /* Langkah 2 */
  }
          <div className="bg-white rounded-3xl p-8 border border-[#F5E7DA] shadow-sm relative group hover:border-[#E87832]/40 hover:shadow-lg transition-all">
            <span className="font-mono text-4xl font-black text-[#F5E7DA] group-hover:text-[#E87832]/30 transition-colors">
              02
            </span>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] flex items-center justify-center text-[#9B421F] my-4 shadow-sm">
              <Coffee className="w-6 h-6 text-[#9B421F]" />
            </div>
            <h3 className="text-lg font-bold text-[#3D2117]">Pesan Bawa Pulang / Dine-In</h3>
            <p className="text-xs text-[#8B7468] mt-2 leading-relaxed">
              Pilih menu seduhan barista, sesuaikan tingkat manis atau pilihan susu, lalu bayar praktis lewat QRIS, transfer, atau tunai.
            </p>
          </div>

          {
    /* Langkah 3 */
  }
          <div className="bg-white rounded-3xl p-8 border border-[#F5E7DA] shadow-sm relative group hover:border-[#E87832]/40 hover:shadow-lg transition-all">
            <span className="font-mono text-4xl font-black text-[#F5E7DA] group-hover:text-[#E87832]/30 transition-colors">
              03
            </span>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] flex items-center justify-center text-[#9B421F] my-4 shadow-sm">
              <Award className="w-6 h-6 text-[#9B421F]" />
            </div>
            <h3 className="text-lg font-bold text-[#3D2117]">Kumpulkan Poin & Klaim Hadiah</h3>
            <p className="text-xs text-[#8B7468] mt-2 leading-relaxed">
              Dapatkan 1 poin untuk setiap transaksi Rp 10.000. Tukarkan kapan saja dengan kopi gratis, croissant, atau sesi cupping eksklusif.
            </p>
          </div>
        </div>
      </section>

      {
    /* 3. COFFEE SHOP PILIHAN DI SLEMAN */
  }
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
              Kurasi Terbaik Yogyakarta
            </span>
            <h2 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
              Coffee Shop Pilihan di Sleman
            </h2>
            <p className="text-xs text-[#8B7468] mt-1">
              Kedai kopi dan roastery dengan biji berkualitas tinggi dan barista berdedikasi.
            </p>
          </div>

          <Link
    to="/discover"
    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9B421F] hover:text-[#803517] transition-colors"
  >
            <span>Lihat Semua Kedai Kopi</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMerchants.map((merchant) => <MerchantCard key={merchant.id} merchant={merchant} />)}
        </div>
      </section>

      {
    /* 4. BENEFIT LOYALITAS TERPADU */
  }
      <section className="bg-gradient-to-b from-[#F5E7DA]/50 to-[#FFF9F3] py-20 border-y border-[#F5E7DA]">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#9B421F] text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
                <span>Kopi Enak, Reward Lebih Banyak</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2117] tracking-tight leading-tight">
                Keuntungan yang Terus Bertambah Setiap Seduhan
              </h2>
              <p className="text-sm text-[#8B7468] leading-relaxed">
                Berbeda dengan kartu stempel yang terpisah-pisah, satu kartu digital SIPZY berlaku di seluruh jaringan mitra roastery dan kafe kami di Sleman. Satu saldo, kepuasan ngopi tanpa batas.
              </p>

              <div className="pt-2">
                <Link
    to="/wallet"
    className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#9B421F] hover:bg-[#803517] text-white font-semibold text-xs transition-all shadow-md"
  >
                  <span>Buka Loyalty Wallet Saya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-white border border-[#F5E7DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center mb-3">
                  <Gift className="w-5 h-5 text-[#E87832]" />
                </div>
                <h4 className="font-bold text-[#3D2117] text-sm">Reward Eksklusif</h4>
                <p className="text-xs text-[#8B7468] mt-1.5 leading-relaxed">
                  Tukarkan poin dengan voucher kopi gratis, diskon pesanan, dan roti croissant mentega hangat.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#F5E7DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center mb-3">
                  <Tag className="w-5 h-5 text-[#E87832]" />
                </div>
                <h4 className="font-bold text-[#3D2117] text-sm">Promo Khusus Sleman</h4>
                <p className="text-xs text-[#8B7468] mt-1.5 leading-relaxed">
                  Nikmati promo mahasiswa di kawasan kampus Seturan & Babarsari, serta promo akhir pekan.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#F5E7DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-[#9B421F]" />
                </div>
                <h4 className="font-bold text-[#3D2117] text-sm">Hak Istimewa VIP</h4>
                <p className="text-xs text-[#8B7468] mt-1.5 leading-relaxed">
                  Raih tingkatan Gold dan Black Diamond untuk mendapatkan undangan cupping biji kopi musiman.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#F5E7DA] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center mb-3">
                  <Coffee className="w-5 h-5 text-[#9B421F]" />
                </div>
                <h4 className="font-bold text-[#3D2117] text-sm">Kopi Spesialti Gratis</h4>
                <p className="text-xs text-[#8B7468] mt-1.5 leading-relaxed">
                  Tiap 500 sampai 1.000 poin dapat langsung ditukar dengan segelas Americano, Latte, atau Cold Brew.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
    /* 5. PROMOSI POPULER DI SLEMAN */
  }
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
              Penawaran Terbatas
            </span>
            <h2 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
              Promosi Populer di Sleman
            </h2>
            <p className="text-xs text-[#8B7468] mt-1">
              Klaim voucher hemat untuk digunakan saat checkout kopi berikutnya.
            </p>
          </div>

          <Link
    to="/promotions"
    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9B421F] hover:text-[#803517] transition-colors"
  >
            <span>Lihat Semua Promo</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {popularPromos.map((promo) => <PromoCard key={promo.id} promo={promo} />)}
        </div>
      </section>

      {
    /* 6. ULASAN PENGGUNA DI SLEMAN & JOGJA */
  }
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
            Cerita Komunitas Kopi
          </span>
          <h2 className="text-3xl font-extrabold text-[#3D2117] tracking-tight mt-1">
            Kata Para Penikmat Kopi di Sleman
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#F5E7DA] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-[#3D2117] leading-relaxed italic">
                “Tiap minggu saya ngopi pindah-pindah dari Kaliurang ke Seturan buat nugas. Sekarang praktis banget, cukup pakai satu kartu digital SIPZY di HP dan poinnya langsung terkumpul.”
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
                <p className="text-[11px] text-[#8B7468]">Mahasiswi UGM · Member Gold</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#F5E7DA] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-[#3D2117] leading-relaxed italic">
                “Penghitungan poinnya sangat transparan: 1 poin tiap 10 ribu. Baru dua minggu pakai sudah bisa klaim gratis manual brew V60 di Roastery Palagan. Mantap!”
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
                <p className="text-[11px] text-[#8B7468]">Software Engineer di Babarsari · Member Silver</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#F5E7DA] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-[#3D2117] leading-relaxed italic">
                “Sebagai pengelola kedai di Sleman, SIPZY membantu kedai kami didatangi pelanggan setia tanpa perlu repot mencetak kartu stempel manual. Scan QR-nya sangat cepat.”
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
                <p className="text-[11px] text-[#8B7468]">Head Roaster & Barista Sleman</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
    /* 7. AJAKAN BERGABUNG TERAKHIR */
  }
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1F100A] via-[#3D2117] to-[#120804] text-white p-8 sm:p-14 shadow-2xl border border-[#9B421F]/30">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E87832]">
              Tingkatkan Ritual Ngopi Harianmu
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Siap untuk Kopi Enak & Reward Lebih Banyak di Sleman?
            </h2>
            <p className="text-xs sm:text-sm text-[#F5E7DA]/80 leading-relaxed">
              Daftar akun membership SIPZY gratis dalam 30 detik. Dapatkan bonus sambutan instan 150 poin dan diskon 50% untuk pesanan pickup kopi pertamamu.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
    to="/register"
    className="py-3 px-6 rounded-xl bg-[#E87832] hover:bg-[#d66923] text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
  >
                <span>Daftar Member SIPZY Sleman</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
    to="/discover"
    className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs flex items-center justify-center transition-all"
  >
                <span>Lihat Menu Kedai Kopi Dulu</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
