import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  Clock,
  Heart,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Share2,
  Check,
  Coffee,
} from 'lucide-react';
import { merchantService } from '../services/merchantService';
import { ProductCard } from '../components/cards/ProductCard';
import { useApp } from '../context/AppContext';

export const MerchantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const merchant = merchantService.getMerchantById(id || '');
  const products = merchant ? merchantService.getProductsByMerchant(merchant.id) : [];

  const { isFavorite, toggleFavorite, cartTotalCount } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedShare, setCopiedShare] = useState(false);

  // Derive unique categories from merchant's products
  const productCategories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  if (!merchant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#3D2117]">Coffee Shop Not Found</h2>
        <p className="text-sm text-[#8B7468]">The requested merchant could not be found or has moved.</p>
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#9B421F] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(merchant.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${merchant.name} on SIPZY`,
        text: merchant.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="pb-24">
      {/* 1. HERO COVER & HEADER */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full bg-[#3D2117]">
        <img
          src={merchant.coverImage}
          alt={merchant.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

        {/* Top Floating Navigation */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-10">
          <Link
            to="/discover"
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#3D2117] hover:bg-white shadow-md transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#3D2117] hover:bg-white shadow-md transition-colors"
              title="Share"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => toggleFavorite(merchant.id)}
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#3D2117] hover:bg-white shadow-md transition-colors"
              title={favorited ? 'Remove Favorite' : 'Save to Favorites'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-[#E87832] text-[#E87832]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Floating Merchant Info Over Cover Bottom */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F5E7DA]">
              <span className="bg-[#E87832] text-white px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider">
                {merchant.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {merchant.rating.toFixed(1)} ({merchant.reviewCount} reviews)
              </span>
              <span>·</span>
              <span>{merchant.distance}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
              {merchant.name}
            </h1>

            <div className="flex items-center gap-2 text-xs text-[#F5E7DA]/90">
              <MapPin className="w-3.5 h-3.5 text-[#E87832] shrink-0" />
              <span>{merchant.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Open Now</span>
              </div>
              <p className="text-[11px] text-white/80 mt-0.5">{merchant.openingHours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Description & Loyalty Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-[#F5E7DA] shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#3D2117]">About {merchant.name}</h2>
            <p className="text-xs sm:text-sm text-[#8B7468] leading-relaxed">
              {merchant.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F5E7DA]/60">
              {merchant.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#FFF9F3] text-xs font-medium text-[#9B421F] border border-[#F5E7DA]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Loyalty Banner for this Merchant */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#1F100A] to-[#3D2117] rounded-3xl p-6 text-white border border-[#E87832]/20 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E87832]">
              <Sparkles className="w-4 h-4" />
              <span>SIPZY Rewards Partner</span>
            </div>
            <h3 className="font-bold text-base leading-snug">
              Earn 1 Point per Rp 10.000 spent here
            </h3>
            <p className="text-xs text-[#F5E7DA]/80 leading-relaxed">
              Every coffee and pastry ordered here contributes to your next free beverage or tier upgrade.
            </p>
            <div className="pt-1">
              <Link
                to="/rewards"
                className="text-xs font-semibold text-[#E87832] hover:text-white transition-colors underline"
              >
                View redeemable vouchers →
              </Link>
            </div>
          </div>
        </div>

        {/* 3. MENU SECTION */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#3D2117] tracking-tight">
                Menu & Drinks
              </h2>
              <p className="text-xs text-[#8B7468] mt-0.5">
                Freshly prepared upon your pickup arrival or dine-in seating.
              </p>
            </div>

            {/* Menu Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {productCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#9B421F] text-white shadow-sm'
                      : 'bg-white hover:bg-[#F5E7DA] text-[#8B7468] border border-[#F5E7DA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                merchantId={merchant.id}
                merchantName={merchant.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Bottom Cart Bar if items in cart */}
      {cartTotalCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-xl mx-auto z-40">
          <Link
            to="/cart"
            className="w-full py-3.5 px-6 rounded-2xl bg-[#9B421F] hover:bg-[#803517] text-white shadow-2xl flex items-center justify-between transition-all transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xs font-mono">
                {cartTotalCount}
              </div>
              <span className="text-xs font-semibold">View Cart & Proceed</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
              <span>Checkout</span>
              <ShoppingBag className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
