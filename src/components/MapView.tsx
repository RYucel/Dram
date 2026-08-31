import React, { useState } from 'react';
import { KKTC_STORES } from '../data/mockData';
import { Store, Whiskey } from '../types';

interface MapViewProps {
  whiskies: Whiskey[];
  onSelectWhiskey: (whiskey: Whiskey) => void;
  onOpenReportForStore?: (store: Store) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  whiskies,
  onSelectWhiskey,
}) => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(KKTC_STORES[1]); // Default to The Macallan Boutique
  const [filterType, setFilterType] = useState<'all' | 'boutique' | 'supermarket'>('all');

  const filteredStores = KKTC_STORES.filter(
    (s) => filterType === 'all' || s.type === filterType
  );

  // Find whiskies available in this selected store
  const storeWhiskies = selectedStore
    ? whiskies.filter((w) =>
        w.stores.some((s) =>
          s.storeName.toLowerCase().includes(selectedStore.name.toLowerCase()) ||
          selectedStore.name.toLowerCase().includes(s.storeName.toLowerCase())
        )
      )
    : [];

  return (
    <div className="pt-20 pb-28 px-4 max-w-2xl mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-heading text-[22px] font-bold text-[#ffc880]">
            KKTC Viski Haritası
          </h2>
          <p className="text-[#d7c3ae] text-[13px]">
            Kuzey Kıbrıs genelindeki seçkin butikler ve marketler
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 bg-[#1e2020] p-1 rounded-full border border-[#524534]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-[#f5a623] text-[#1c1b1b]'
                : 'text-[#d7c3ae]'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilterType('boutique')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filterType === 'boutique'
                ? 'bg-[#f5a623] text-[#1c1b1b]'
                : 'text-[#d7c3ae]'
            }`}
          >
            Butik
          </button>
          <button
            onClick={() => setFilterType('supermarket')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filterType === 'supermarket'
                ? 'bg-[#f5a623] text-[#1c1b1b]'
                : 'text-[#d7c3ae]'
            }`}
          >
            Market
          </button>
        </div>
      </div>

      {/* Styled Interactive Dark Gold Map Canvas (Matching Image 11 aesthetic) */}
      <div className="relative w-full h-[380px] sm:h-[430px] bg-[#12161c] rounded-2xl overflow-hidden border border-[#524534] shadow-2xl">
        {/* Map Grid / Topography Canvas Representation */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Coastlines & Water */}
          <path d="M 0,0 L 100,0 L 100,20 Q 80,35 60,25 T 20,40 Q 5,60 0,70 Z" fill="#18202c" />
          <path d="M 0,85 Q 30,75 50,88 T 100,80 L 100,100 L 0,100 Z" fill="#18202c" />
          
          {/* Main Highway & Gold Roads Network */}
          <path d="M 5,30 Q 35,45 65,48 T 95,65" stroke="#cca253" strokeWidth="0.8" fill="none" strokeDasharray="none" opacity="0.6" />
          <path d="M 30,10 Q 32,38 35,60 T 45,95" stroke="#cca253" strokeWidth="0.6" fill="none" opacity="0.5" />
          <path d="M 55,15 L 68,50 L 80,85" stroke="#cca253" strokeWidth="0.6" fill="none" opacity="0.5" />
          <path d="M 20,40 L 75,35 L 90,55" stroke="#8c6f37" strokeWidth="0.4" fill="none" opacity="0.4" />
          <path d="M 10,65 L 45,67 L 70,75" stroke="#8c6f37" strokeWidth="0.4" fill="none" opacity="0.4" />
          
          {/* Urban blocks */}
          <rect x="25" y="30" width="12" height="15" fill="#cca253" opacity="0.1" rx="1" />
          <rect x="62" y="42" width="16" height="14" fill="#cca253" opacity="0.15" rx="1" />
          <rect x="40" y="62" width="14" height="12" fill="#cca253" opacity="0.1" rx="1" />
          <rect x="72" y="32" width="10" height="10" fill="#cca253" opacity="0.08" rx="1" />
        </svg>

        {/* Map Legend / Title Badge */}
        <div className="absolute top-3 left-3 bg-[#121414]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#524534] text-[11px] text-[#ffc880] font-heading font-bold shadow-md z-10 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-ping" />
          <span>KKTC Viski Radarı</span>
        </div>

        {/* Interactive Store Pins (Matching the styled pin shapes in Image 11) */}
        {filteredStores.map((store) => {
          const isSelected = selectedStore?.id === store.id;
          const isBoutique = store.type === 'boutique';

          return (
            <div
              key={store.id}
              onClick={() => setSelectedStore(store)}
              style={{
                left: `${store.xPercent}%`,
                top: `${store.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 cursor-pointer flex flex-col items-center group"
            >
              {/* Outer Glow on Selected */}
              {isSelected && (
                <div className="absolute -inset-3 bg-[#f5a623]/40 rounded-full blur-md animate-pulse pointer-events-none" />
              )}

              {/* Pin Icon Bubble */}
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-b from-[#ffddb4] to-[#af8d11] text-[#1c1b1b] shadow-[0_0_20px_rgba(245,166,35,0.7)] scale-110 border-2 border-white'
                    : 'w-10 h-10 bg-gradient-to-b from-[#af8d11] to-[#342800] text-[#ffc880] border border-[#ffc880]/60 shadow-lg group-hover:scale-110'
                } rounded-2xl rounded-bl-xs rotate-45 flex items-center justify-center`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] -rotate-45 ${
                    isSelected ? 'fill-icon text-[#1c1b1b]' : 'text-[#ffc880]'
                  }`}
                >
                  {isBoutique ? 'local_bar' : 'storefront'}
                </span>
              </div>

              {/* Store Label */}
              <div
                className={`mt-1.5 text-center px-2 py-0.5 rounded shadow-md text-[10px] font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#f5a623] text-[#1c1b1b]'
                    : 'bg-[#121414]/90 text-[#ffc880] border border-[#524534]'
                }`}
              >
                {store.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Store Bottom Card */}
      {selectedStore && (
        <section className="bg-[#1e2020] rounded-xl p-4 sm:p-5 border-t border-white/10 shadow-xl flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-[18px] sm:text-[20px] font-bold text-[#e2e2e2]">
                  {selectedStore.name}
                </h3>
                <span className="bg-[#af8d11]/20 text-[#e9c349] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#af8d11]/40 uppercase">
                  {selectedStore.city}
                </span>
              </div>
              <p className="text-[13px] text-[#d7c3ae] mt-0.5 flex items-center gap-1 font-sans">
                <span className="material-symbols-outlined text-[15px] text-[#ffc880]">
                  location_on
                </span>
                {selectedStore.address}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[12px] text-[#9f8e7a] block">Çalışma Saatleri</span>
              <span className="text-[13px] font-bold text-[#ffc880]">
                {selectedStore.hours}
              </span>
            </div>
          </div>

          {/* Store Actions */}
          <div className="flex gap-2 pt-1 border-t border-[#333535]">
            <a
              href={`tel:${selectedStore.phone}`}
              className="flex-1 bg-[#282a2b] hover:bg-[#38393a] text-[#e2e2e2] py-2 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1 border border-[#524534]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffc880]">
                call
              </span>
              Ara: {selectedStore.phone}
            </a>
            <button
              onClick={() =>
                alert(`Navigasyon başlatılıyor: ${selectedStore.name} (${selectedStore.address})`)
              }
              className="flex-1 bg-[#f5a623] hover:bg-[#ffc880] text-[#1c1b1b] py-2 px-3 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1 shadow cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">directions</span>
              Yol Tarifi Al
            </button>
          </div>

          {/* Available Whiskies in this Store */}
          {storeWhiskies.length > 0 && (
            <div className="mt-2 pt-2 border-t border-[#333535]">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#d7c3ae] mb-2">
                Bu Mağazadaki Popüler Fiyatlar ({storeWhiskies.length})
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {storeWhiskies.map((w) => {
                  const storePriceObj = w.stores.find((s) =>
                    s.storeName.toLowerCase().includes(selectedStore.name.toLowerCase())
                  );
                  return (
                    <div
                      key={w.id}
                      onClick={() => onSelectWhiskey(w)}
                      className="bg-[#282a2b] p-2.5 rounded-lg border border-[#524534]/50 hover:border-[#ffc880] cursor-pointer flex items-center gap-2"
                    >
                      <img
                        src={w.imageUrl}
                        alt={w.name}
                        className="w-9 h-9 rounded object-cover bg-[#121414]"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-bold text-[#e2e2e2] truncate">
                          {w.name}
                        </p>
                        <p className="text-[12px] font-heading font-bold text-[#ffc880]">
                          {(storePriceObj?.price || w.lowestPrice).toLocaleString('tr-TR')} TL
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
