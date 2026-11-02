import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, Star, Sparkles, X, Coffee } from 'lucide-react';
import { MerchantCard } from '../components/cards/MerchantCard';
import { merchantService } from '../services/merchantService';
import { MerchantCategory } from '../types';

export const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MerchantCategory | 'All'>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'nearest'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: (MerchantCategory | 'All')[] = [
    'All',
    'Specialty Coffee',
    'Roastery',
    'Cafe',
    'Coffee Shop',
    'Others',
  ];

  const locations = [
    'All',
    'Senopati',
    'SCBD',
    'Dharmawangsa',
    'Kemang',
    'Cilandak',
    'Menteng',
  ];

  const filteredMerchants = useMemo(() => {
    return merchantService.filterMerchants({
      query: searchQuery,
      category: selectedCategory,
      location: selectedLocation === 'All' ? undefined : selectedLocation,
      minRating: minRating > 0 ? minRating : undefined,
      sortBy,
    });
  }, [searchQuery, selectedCategory, selectedLocation, minRating, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setMinRating(0);
    setSortBy('popular');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedLocation !== 'All' ||
    minRating > 0 ||
    sortBy !== 'popular';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#9B421F]">
          Curated Roasters & Coffee Bars
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3D2117] tracking-tight">
          Discover Coffee Shops
        </h1>
        <p className="text-sm text-[#8B7468] max-w-2xl leading-relaxed">
          Find independent roasteries, tranquil greenhouse cafes, and specialty coffee houses near you. Earn SIPZY loyalty points with every visit.
        </p>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#F5E7DA] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8B7468] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by coffee shop name, area, bean origin (e.g. Gayo, SCBD)..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] text-sm text-[#3D2117] placeholder-[#8B7468]/70 focus:outline-none focus:border-[#9B421F] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8B7468] hover:text-[#3D2117]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-[#8B7468] shrink-0 hidden sm:inline">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-3 px-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] focus:outline-none focus:border-[#9B421F] cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated (★)</option>
              <option value="nearest">Nearest First</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden py-3 px-4 rounded-2xl bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#9B421F]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#9B421F] text-white shadow-sm'
                    : 'bg-[#FFF9F3] hover:bg-[#F5E7DA] text-[#8B7468] hover:text-[#3D2117] border border-[#F5E7DA]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters Strip (Desktop & Mobile) */}
        <div className={`pt-3 border-t border-[#F5E7DA] flex flex-wrap items-center justify-between gap-4 ${mobileFilterOpen ? 'block' : 'hidden md:flex'}`}>
          <div className="flex flex-wrap items-center gap-3">
            {/* Location Filter */}
            <div className="flex items-center gap-1.5 text-xs text-[#8B7468]">
              <MapPin className="w-3.5 h-3.5 text-[#C85A2A]" />
              <span className="font-medium text-[#3D2117]">Location:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="py-1 px-2.5 rounded-lg bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] focus:outline-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-1.5 text-xs text-[#8B7468]">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-medium text-[#3D2117]">Min Rating:</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="py-1 px-2.5 rounded-lg bg-[#FFF9F3] border border-[#F5E7DA] text-xs font-semibold text-[#3D2117] focus:outline-none"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5 & up ★</option>
                <option value={4.8}>4.8 & up ★</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#9B421F] hover:text-[#803517] underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-[#8B7468] px-1">
        <p>
          Showing <span className="font-bold text-[#3D2117]">{filteredMerchants.length}</span> coffee shops
        </p>
        <span className="text-[11px]">All venues accept SIPZY Digital Card</span>
      </div>

      {/* Grid of Merchant Cards */}
      {filteredMerchants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMerchants.map((merchant) => (
            <MerchantCard key={merchant.id} merchant={merchant} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-3xl border border-[#F5E7DA] p-8 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F3] text-[#9B421F] mx-auto flex items-center justify-center">
            <Coffee className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#3D2117]">No coffee shops match your criteria</h3>
          <p className="text-xs text-[#8B7468] max-w-sm mx-auto">
            Try adjusting your search query, selecting another neighborhood, or resetting your filters.
          </p>
          <div className="pt-2">
            <button
              onClick={clearAllFilters}
              className="py-2 px-4 rounded-xl bg-[#9B421F] text-white text-xs font-semibold hover:bg-[#803517] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
