import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Heart } from "lucide-react";
import { useApp } from "../../context/AppContext";
export const MerchantCard = ({ merchant }) => {
  const { isFavorite, toggleFavorite } = useApp();
  const favorited = isFavorite(merchant.id);
  return <div className="group bg-white rounded-3xl overflow-hidden border border-[#F5E7DA] hover:border-[#E87832]/30 shadow-sm hover:shadow-xl hover:shadow-[#9B421F]/5 transition-all duration-300 flex flex-col h-full">
      {
    /* Kontainer Foto Cover */
  }
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F5E7DA]">
        <img
    src={merchant.coverImage}
    alt={merchant.name}
    referrerPolicy="no-referrer"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {
    /* Tombol Favorit */
  }
        <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(merchant.id);
    }}
    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#3D2117] hover:bg-white hover:text-[#9B421F] shadow-sm transition-transform active:scale-90 cursor-pointer"
    aria-label={favorited ? "Hapus dari favorit" : "Tambah ke favorit"}
  >
          <Heart className={`w-4 h-4 ${favorited ? "fill-[#E87832] text-[#E87832]" : ""}`} />
        </button>

        {
    /* Rating Melayang di Atas Gambar */
  }
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-medium">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{merchant.rating.toFixed(1)}</span>
          <span className="text-white/70">({merchant.reviewCount} ulasan)</span>
        </div>

        {
    /* Jarak dari Sleman */
  }
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm text-[11px] font-medium text-[#3D2117]">
          {merchant.distance}
        </div>
      </div>

      {
    /* Konten Kartu */
  }
      <div className="p-5 flex flex-col flex-1">
        {
    /* Kategori & Rentang Harga */
  }
        <div className="flex items-center gap-2 text-xs text-[#8B7468] mb-1.5">
          <span className="font-medium text-[#9B421F]">{merchant.category}</span>
          <span aria-hidden="true">·</span>
          <span>{merchant.priceRange}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {merchant.openingHours}
          </span>
        </div>

        {
    /* Nama Kedai Kopi */
  }
        <h3 className="text-base font-bold text-[#3D2117] group-hover:text-[#9B421F] transition-colors leading-snug line-clamp-1">
          {merchant.name}
        </h3>

        {
    /* Alamat di Sleman */
  }
        <div className="flex items-center gap-1 text-xs text-[#8B7468] mt-1.5 line-clamp-1">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#C85A2A]" />
          <span className="truncate">{merchant.address}</span>
        </div>

        {
    /* Deskripsi */
  }
        <p className="text-xs text-[#8B7468] mt-2.5 line-clamp-2 leading-relaxed">
          {merchant.description}
        </p>

        {
    /* Tag Pilihan */
  }
        <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
          {merchant.tags.slice(0, 3).map((tag, idx) => <span
    key={idx}
    className="text-[11px] text-[#8B7468] bg-[#FFF9F3] border border-[#F5E7DA] rounded-md px-2 py-0.5"
  >
              {tag}
            </span>)}
        </div>

        {
    /* Tombol Aksi */
  }
        <div className="mt-auto pt-3 border-t border-[#F5E7DA]/70">
          <Link
    to={`/merchant/${merchant.id}`}
    className="w-full py-2.5 px-4 rounded-xl bg-[#FFF9F3] hover:bg-[#9B421F] hover:text-white text-[#9B421F] border border-[#9B421F]/20 font-semibold text-xs tracking-wide flex items-center justify-center transition-all duration-200"
  >
            Lihat Menu & Pesan
          </Link>
        </div>
      </div>
    </div>;
};
