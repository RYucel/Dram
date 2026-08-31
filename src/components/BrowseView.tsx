import React, { useState, useMemo } from 'react';
import { Whiskey } from '../types';

interface BrowseViewProps {
  whiskies: Whiskey[];
  onSelectWhiskey: (whiskey: Whiskey) => void;
  onOpenReportForWhiskey?: (whiskey: Whiskey) => void;
  onOpenMap?: () => void;
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  whiskies,
  onSelectWhiskey,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('Hepsi');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'cheapest' | 'name' | 'recent'>('cheapest');

  const popularBrands = [
    'Hepsi',
    'Johnnie Walker',
    'Chivas Regal',
    "Jack Daniel's",
    'Jameson',
    'The Macallan',
    'Glenfiddich'
  ];

  const filteredWhiskies = useMemo(() => {
    return whiskies
      .filter((w) => {
        const matchesSearch =
          w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.stores.some((s) => s.storeName.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesBrand =
          selectedBrand === 'Hepsi' ||
          w.brand.toLowerCase() === selectedBrand.toLowerCase();

        const matchesCategory =
          selectedCategory === 'all' || w.category === selectedCategory;

        return matchesSearch && matchesBrand && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'cheapest') {
          return a.lowestPrice - b.lowestPrice;
        } else if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else {
          return b.id.localeCompare(a.id);
        }
      });
  }, [whiskies, searchQuery, selectedBrand, selectedCategory, sortBy]);

  return (
    <div className="flex flex-col gap-6 pb-28 pt-20 px-4 max-w-2xl mx-auto w-full">
      {/* Search Bar */}
      <section>
        <div
          id="search-bar-container"
          className="relative flex items-center bg-[#1e2020] border border-[#524534] rounded-lg p-2.5 shadow-sm transition-all focus-within:border-[#f5a623] focus-within:ring-1 focus-within:ring-[#f5a623]"
        >
          <span className="material-symbols-outlined text-[#d7c3ae] ml-2 text-[22px]">
            search
          </span>
          <input
            id="input-whiskey-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 text-[#e2e2e2] font-sans text-[15px] placeholder-[#d7c3ae]/70 ml-2.5 outline-none"
            placeholder="Viski Ara (Örn: Chivas 12, Jack Daniel's...)"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#d7c3ae] hover:text-[#ffc880] p-1 mr-1 text-sm font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </section>

      {/* Quick Brand Filters */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-heading text-[18px] sm:text-[20px] font-semibold text-[#e2e2e2]">
            Popüler Markalar
          </h2>
          <span className="text-[12px] text-[#d7c3ae] font-medium">KKTC Marketleri</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar py-1">
          {popularBrands.map((brand) => {
            const isSelected = selectedBrand === brand;
            return (
              <button
                key={brand}
                id={`brand-filter-${brand.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedBrand(brand)}
                className={`flex-shrink-0 font-sans text-[14px] px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#af8d11] text-[#342800] border-[#ffe088] font-bold shadow-sm'
                    : 'bg-[#1e2020] text-[#d7c3ae] border-[#524534] hover:bg-[#38393a] hover:text-[#e2e2e2]'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product List Section */}
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-heading text-[18px] sm:text-[20px] font-semibold text-[#e2e2e2] flex items-center gap-2">
            <span>En Ucuz Fiyatlar</span>
            <span className="text-[12px] font-normal text-[#d7c3ae] bg-[#1e2020] px-2 py-0.5 rounded-full border border-[#524534]">
              {filteredWhiskies.length} ürün
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setSortBy(
                  sortBy === 'cheapest'
                    ? 'recent'
                    : sortBy === 'recent'
                    ? 'name'
                    : 'cheapest'
                )
              }
              className="text-[#ffc880] text-[13px] font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">sort</span>
              {sortBy === 'cheapest'
                ? 'En Ucuz'
                : sortBy === 'recent'
                ? 'En Yeni'
                : 'A-Z'}
            </button>
          </div>
        </div>

        {/* Product Cards */}
        {filteredWhiskies.length === 0 ? (
          <div className="bg-[#1e2020] rounded-xl p-8 text-center border border-[#524534] my-4">
            <span className="material-symbols-outlined text-[#ffc880] text-4xl mb-2">
              sentiment_dissatisfied
            </span>
            <h3 className="font-heading text-[17px] font-bold text-[#e2e2e2] mb-1">
              Aradığınız viski bulunamadı
            </h3>
            <p className="text-[#d7c3ae] text-sm mb-4">
              "{searchQuery}" aramasına uygun kayıt bulunamadı. Fiyat bildirmek ister misiniz?
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBrand('Hepsi');
              }}
              className="bg-[#f5a623] text-[#644000] font-bold px-4 py-2 rounded-lg text-sm"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {filteredWhiskies.map((whiskey) => {
              const isBestPrice = whiskey.badge === 'EN İYİ FİYAT' || whiskey.badge === 'FIRSAT';
              return (
                <article
                  key={whiskey.id}
                  id={`whiskey-card-${whiskey.id}`}
                  onClick={() => onSelectWhiskey(whiskey)}
                  className="bg-[#1e2020] rounded-xl p-4 flex gap-4 border border-[#524534]/30 relative overflow-hidden group hover:bg-[#282a2b] transition-all cursor-pointer shadow-md"
                >
                  {/* Image Container */}
                  <div className="w-24 h-24 bg-[#141515] rounded-lg flex-shrink-0 overflow-hidden relative border border-[#524534]/50 flex items-center justify-center p-1">
                    <img
                      src={whiskey.imageUrl}
                      alt={whiskey.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-all duration-300 transform group-hover:scale-105"
                    />
                    {whiskey.badge && (
                      <span
                        className={`absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm ${
                          isBestPrice
                            ? 'bg-[#e9c349] text-[#3c2f00]'
                            : 'bg-[#333535] text-[#e2e2e2]'
                        }`}
                      >
                        {whiskey.badge}
                      </span>
                    )}
                  </div>

                  {/* Info Container */}
                  <div className="flex flex-col flex-grow justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-heading text-[18px] sm:text-[20px] font-semibold text-[#e2e2e2] leading-tight truncate group-hover:text-[#ffc880] transition-colors">
                          {whiskey.name}
                        </h3>
                        {whiskey.badge && (
                          <span
                            className={`flex-shrink-0 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase ${
                              isBestPrice
                                ? 'bg-[#e9c349] text-[#3c2f00]'
                                : 'bg-[#333535] text-[#e2e2e2]'
                            }`}
                          >
                            {whiskey.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#d7c3ae] text-[13px] font-sans mt-0.5">
                        {whiskey.type}, {whiskey.volume}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-2 pt-1 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-[#d7c3ae] truncate">
                        <span className="material-symbols-outlined text-[16px] text-[#ffc880] flex-shrink-0">
                          storefront
                        </span>
                        <span className="text-[13px] truncate font-medium">
                          {whiskey.lowestStore}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0 pl-2">
                        <p className="font-heading text-[20px] sm:text-[22px] font-bold text-[#ffc880] leading-none">
                          {whiskey.lowestPrice.toLocaleString('tr-TR')} TL
                        </p>
                        <p className="text-[10px] text-[#d7c3ae]/75 mt-0.5">
                          {whiskey.lastUpdated}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
