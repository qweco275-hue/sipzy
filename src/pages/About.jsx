import { Coffee, Award, Sparkles, Heart } from "lucide-react";
export const About = () => {
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {
    /* Hero */
  }
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E7DA] text-[#9B421F] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#E87832]" />
          <span>Visi & Misi Kami</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#3D2117] tracking-tight">
          Kopi Nikmat, <span className="text-[#9B421F]">Reward Berlipat.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#8B7468] leading-relaxed">
          SIPZY lahir dari kesadaran bahwa kawasan Sleman dan Yogyakarta memiliki ragam coffee shop serta micro-roastery independen terbaik berkelas dunia, namun para pecinta kopi kerap membawa kartu stempel fisik yang terpisah-pisah. Kami membangun satu ekosistem digital terpadu untuk menyatukan barista, roastery, dan penikmat kopi sejati.
        </p>
      </div>

      {
    /* Visual Showcase */
  }
      <div className="relative rounded-3xl overflow-hidden aspect-[16/8] shadow-xl border border-[#F5E7DA]">
        <img
    src="/images/hero_coffee_atmosphere_1793559239277.jpg"
    alt="Suasana Coffee Shop Sleman"
    referrerPolicy="no-referrer"
    className="w-full h-full object-cover"
  />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8 text-white">
          <p className="text-xs sm:text-sm font-medium text-[#F5E7DA]">
            Membangun jembatan digital antara petani kopi Merapi, roastery artisan Sleman, dan ribuan penikmat kopi harian.
          </p>
        </div>
      </div>

      {
    /* Pillars */
  }
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-7 border border-[#F5E7DA] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#3D2117]">Kurasi Artisan Sleman</h3>
          <p className="text-xs text-[#8B7468] leading-relaxed">
            Setiap mitra coffee shop diuji kualitas seduhan, integritas sangrai biji kopi, hingga keramahan barista dan kenyamanan ruang seduh.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-[#F5E7DA] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#3D2117]">Poin Loyalitas Terpadu</h3>
          <p className="text-xs text-[#8B7468] leading-relaxed">
            1 Poin setiap transaksi Rp 10.000. Kumpulkan poin saat ngopi di Kaliurang, tukarkan seduhan V60 atau diskon di Seturan dan Palagan.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-[#F5E7DA] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] text-[#9B421F] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#3D2117]">Dukungan Mitra Lokal</h3>
          <p className="text-xs text-[#8B7468] leading-relaxed">
            Kami memberdayakan roastery dan cafe independen dengan infrastruktur pemesanan digital dan kartu loyalitas modern tanpa biaya hardware rumit.
          </p>
        </div>
      </div>

      {
    /* Partner with us CTA */
  }
      <div className="bg-gradient-to-r from-[#1F100A] via-[#3D2117] to-[#120804] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#9B421F]/30">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black">Pemilik Roastery atau Coffee Shop di Sleman?</h3>
          <p className="text-xs text-[#F5E7DA]/80 max-w-lg">
            Bergabunglah dengan ekosistem jaringan SIPZY dan jangkau ribuan penikmat kopi setia di Daerah Istimewa Yogyakarta tanpa ribet.
          </p>
        </div>
        <a
    href="mailto:mitra@sipzy.id?subject=Kemitraan%20Coffee%20Shop%20Sleman%20SIPZY"
    className="py-3 px-6 rounded-xl bg-[#E87832] hover:bg-[#d66923] text-white text-xs font-bold whitespace-nowrap shadow-md transition-colors"
  >
          Daftar Jadi Mitra Coffee Shop
        </a>
      </div>
    </div>;
};
