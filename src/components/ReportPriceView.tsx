import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Whiskey } from '../types';
import { KKTC_REGIONS } from '../data/mockData';

interface ReportPriceViewProps {
  whiskies: Whiskey[];
  preSelectedWhiskey?: Whiskey | null;
  onSubmitReport: (report: {
    whiskeyId: string;
    whiskeyName: string;
    storeName: string;
    storeLocation: string;
    region: string;
    district: string;
    price: number;
    receiptImage?: string;
  }) => void;
}

const MARKET_CHAINS = [
  {
    id: 'molto-lemar',
    name: 'Lemar / Molto',
    fullName: 'Lemar / Molto Süpermarket',
    badge: 'Çok Şubeli',
    icon: 'storefront',
    highlight: true,
  },
  {
    id: 'erulku',
    name: 'Erülkü',
    fullName: 'Erülkü Süpermarket',
    badge: 'Minareliköy',
    icon: 'shopping_cart',
  },
  {
    id: 'sah',
    name: 'Şah Marketplace',
    fullName: 'Şah Marketplace',
    badge: 'Çatalköy',
    icon: 'store',
  },
  {
    id: 'ileli',
    name: 'İleli',
    fullName: 'İleli Supermarket',
    badge: 'Alsancak',
    icon: 'shopping_bag',
  },
  {
    id: 'kiler',
    name: 'Kiler',
    fullName: 'Kiler Süpermarket',
    badge: 'Lefkoşa & G.Yurt',
    icon: 'storefront',
  },
  {
    id: 'macro',
    name: 'Macro',
    fullName: 'Macro Supermarket',
    badge: 'Lefkoşa & Girne',
    icon: 'shopping_basket',
  },
  {
    id: 'erdener',
    name: 'Erdener',
    fullName: 'Erdener Market',
    badge: 'Karakum',
    icon: 'store',
  },
  {
    id: 'starling',
    name: 'Starling',
    fullName: 'Starling Supermarket',
    badge: 'Girne & Lapta',
    icon: 'storefront',
  },
  {
    id: 'onder',
    name: 'Önder AVM',
    fullName: 'Önder Alışveriş Merkezi',
    badge: 'Gazimağusa',
    icon: 'shopping_cart',
  },
  {
    id: 'unimar',
    name: 'Unimar',
    fullName: 'Unimar Süpermarket',
    badge: 'Mağusa & İskele',
    icon: 'storefront',
  },
  {
    id: 'boutique',
    name: 'Butik Tekel / Liquor',
    fullName: 'Butik İçki & Tekel Bayisi',
    badge: 'Özel Mağaza',
    icon: 'liquor',
  },
];

export const ReportPriceView: React.FC<ReportPriceViewProps> = ({
  whiskies,
  preSelectedWhiskey,
  onSubmitReport,
}) => {
  // Step 1: Whiskey selection
  const [searchQuery, setSearchQuery] = useState(
    preSelectedWhiskey ? `${preSelectedWhiskey.name} ${preSelectedWhiskey.volume}` : ''
  );
  const [selectedWhiskey, setSelectedWhiskey] = useState<Whiskey | null>(
    preSelectedWhiskey || null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Step 2: Region & District selection
  const [selectedRegionId, setSelectedRegionId] = useState<string>('lefkosa');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Dereboyu');
  const [customDistrict, setCustomDistrict] = useState<string>('');
  const [isCustomDistrictMode, setIsCustomDistrictMode] = useState<boolean>(false);

  // Step 3: Market selection
  const [selectedChainId, setSelectedChainId] = useState<string>('molto-lemar');
  const [selectedMarketName, setSelectedMarketName] = useState<string>('Lemar / Molto Süpermarket');
  const [customMarketInput, setCustomMarketInput] = useState('');
  const [isAddingNewMarket, setIsAddingNewMarket] = useState(false);

  // Step 4 & 5: Price & Image
  const [priceInput, setPriceInput] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentRegion = KKTC_REGIONS.find((r) => r.id === selectedRegionId) || KKTC_REGIONS[0];

  const filteredWhiskies = whiskies.filter((w) =>
    `${w.name} ${w.brand} ${w.volume}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectProduct = (w: Whiskey) => {
    setSelectedWhiskey(w);
    setSearchQuery(`${w.name} ${w.volume}`);
    setIsDropdownOpen(false);
    setErrorMessage('');
  };

  const handleRegionChange = (regionId: string) => {
    setSelectedRegionId(regionId);
    const region = KKTC_REGIONS.find((r) => r.id === regionId);
    if (region && region.districts.length > 0) {
      setSelectedDistrict(region.districts[0]);
    }
    setIsCustomDistrictMode(false);
    setCustomDistrict('');
  };

  const handleSelectChain = (chain: typeof MARKET_CHAINS[0]) => {
    setSelectedChainId(chain.id);
    setSelectedMarketName(chain.fullName);
    setIsAddingNewMarket(false);
  };

  const handleAddCustomMarket = () => {
    if (customMarketInput.trim()) {
      setSelectedMarketName(customMarketInput.trim());
      setSelectedChainId('custom');
      setIsAddingNewMarket(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Final location formatting
  const effectiveDistrict = isCustomDistrictMode && customDistrict.trim()
    ? customDistrict.trim()
    : selectedDistrict;

  const finalLocation = `${effectiveDistrict}, ${currentRegion.name}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWhiskey && !searchQuery.trim()) {
      setErrorMessage('Lütfen bir viski / içecek seçin.');
      return;
    }
    const numPrice = parseFloat(priceInput.replace(',', '.'));
    if (!numPrice || numPrice <= 0) {
      setErrorMessage('Lütfen geçerli bir fiyat girin.');
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffc880', '#f5a623', '#e9c349', '#ffffff']
      });
    } catch {
      // safe fallback
    }

    const targetWhiskeyId = selectedWhiskey ? selectedWhiskey.id : 'chivas-12';
    const targetWhiskeyName = selectedWhiskey ? selectedWhiskey.name : searchQuery;

    onSubmitReport({
      whiskeyId: targetWhiskeyId,
      whiskeyName: targetWhiskeyName,
      storeName: selectedMarketName,
      storeLocation: finalLocation,
      region: currentRegion.name,
      district: effectiveDistrict,
      price: numPrice,
      receiptImage: receiptImage || undefined,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setPriceInput('');
      setReceiptImage(null);
    }, 2500);
  };

  return (
    <div className="pt-20 pb-28 px-4 max-w-2xl mx-auto w-full flex flex-col gap-5">
      {/* Header Info */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffc880] text-[24px]">
            add_location_alt
          </span>
          <h2 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#e2e2e2]">
            Fiyat Bildir & Bölge Seç
          </h2>
        </div>
        <p className="text-[#d7c3ae] text-[14px] font-sans">
          KKTC genelindeki market ve şube fiyatlarını ekleyerek topluluğa katkı sağlayın.
        </p>
      </div>

      {isSuccess && (
        <div className="bg-[#af8d11]/20 border border-[#f5a623] p-4 rounded-xl text-center animate-fade-in">
          <span className="material-symbols-outlined fill-icon text-[#f5a623] text-3xl mb-1">
            check_circle
          </span>
          <h3 className="font-heading text-[18px] font-bold text-[#ffc880]">
            Fiyat Başarıyla Paylaşıldı!
          </h3>
          <p className="text-[13px] text-[#e2e2e2] mt-0.5">
            <strong>{selectedMarketName}</strong> ({finalLocation}) fiyatı güncellendi.
          </p>
          <p className="text-[12px] text-[#ffc880] font-bold mt-1">
            +50 Topluluk Katkı Puanı Kazandınız! 🎉
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="bg-[#93000a]/20 border border-[#ffb4ab]/50 p-3 rounded-lg text-[#ffdad6] text-[13px] flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Step 1: Ürün Seç */}
        <section className="bg-[#1e2020] rounded-xl p-4 sm:p-5 glass-card flex flex-col gap-2 relative border border-[#524534]/40">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#ffc880] text-[20px]">
              search
            </span>
            <h3 className="font-heading text-[18px] font-semibold text-[#e2e2e2]">
              1. Ürün Seç
            </h3>
          </div>

          <div className="relative w-full">
            <input
              id="input-report-product"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
                setSelectedWhiskey(null);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full bg-[#333535] border border-[#524534] rounded-lg px-4 py-3 text-[#e2e2e2] placeholder-[#d7c3ae]/60 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-[15px]"
              placeholder="Örn: Johnnie Walker Black Label, Chivas 12..."
            />

            {selectedWhiskey && (
              <span className="absolute right-3 top-3.5 text-[#ffc880] text-xs bg-[#121414] px-2 py-0.5 rounded border border-[#524534]">
                Seçildi
              </span>
            )}

            {/* Dropdown list */}
            {isDropdownOpen && filteredWhiskies.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#282a2b] border border-[#524534] rounded-lg shadow-2xl z-30 max-h-56 overflow-y-auto">
                <ul className="py-1 divide-y divide-[#333535]">
                  {filteredWhiskies.map((w) => (
                    <li
                      key={w.id}
                      onClick={() => handleSelectProduct(w)}
                      className="px-4 py-2.5 hover:bg-[#38393a] cursor-pointer flex justify-between items-center transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={w.imageUrl}
                          alt={w.name}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded object-contain p-0.5 bg-[#121414] border border-[#524534]/50"
                        />
                        <span className="text-[14px] text-[#e2e2e2] font-medium">
                          {w.name} {w.volume}
                        </span>
                      </div>
                      <span className="text-[11px] uppercase tracking-wider text-[#d7c3ae] bg-[#121414] px-2 py-0.5 rounded">
                        {w.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Step 2: Bölge & İlçe / Semt Seçimi */}
        <section className="bg-[#1e2020] rounded-xl p-4 sm:p-5 glass-card flex flex-col gap-3.5 border border-[#524534]/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc880] text-[20px]">
                map
              </span>
              <h3 className="font-heading text-[18px] font-semibold text-[#e2e2e2]">
                2. Bölge & Şehir Seç
              </h3>
            </div>
            <span className="text-xs text-[#ffc880] font-medium bg-[#121414] px-2.5 py-1 rounded-full border border-[#524534]">
              {currentRegion.name}
            </span>
          </div>

          {/* Region Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {KKTC_REGIONS.map((region) => {
              const isSelected = selectedRegionId === region.id;
              return (
                <button
                  type="button"
                  key={region.id}
                  id={`btn-region-${region.id}`}
                  onClick={() => handleRegionChange(region.id)}
                  className={`py-2.5 px-2 rounded-lg flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#f5a623] border-[#f5a623] text-[#1c1b1b] font-bold shadow-md'
                      : 'bg-[#333535] border-[#524534] text-[#e2e2e2] hover:bg-[#38393a]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {region.icon}
                  </span>
                  <span className="text-[13px] leading-tight text-center">
                    {region.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* District / Semt Selector */}
          <div className="flex flex-col gap-2 pt-1 border-t border-[#333535]/60">
            <div className="flex justify-between items-center text-xs text-[#d7c3ae]">
              <span className="font-medium">
                {currentRegion.name} Semt / Şube Konumu:
              </span>
              <span className="text-[#ffc880]">
                {effectiveDistrict}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {currentRegion.districts.map((district) => {
                const isSelected = !isCustomDistrictMode && selectedDistrict === district;
                return (
                  <button
                    type="button"
                    key={district}
                    onClick={() => {
                      setSelectedDistrict(district);
                      setIsCustomDistrictMode(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#ffc880] text-[#1c1b1b] border-[#ffc880] font-bold'
                        : 'bg-[#282a2b] text-[#d7c3ae] border-[#524534] hover:border-[#ffc880]/60 hover:text-[#e2e2e2]'
                    }`}
                  >
                    {district}
                  </button>
                );
              })}

              {/* Custom District Button */}
              <button
                type="button"
                onClick={() => setIsCustomDistrictMode(!isCustomDistrictMode)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer border ${
                  isCustomDistrictMode
                    ? 'bg-[#ffc880] text-[#1c1b1b] border-[#ffc880] font-bold'
                    : 'bg-[#121414] text-[#d7c3ae] border-dashed border-[#524534] hover:border-[#ffc880]'
                }`}
              >
                + Farklı Semt
              </button>
            </div>

            {isCustomDistrictMode && (
              <div className="mt-1 animate-fade-in">
                <input
                  type="text"
                  value={customDistrict}
                  onChange={(e) => setCustomDistrict(e.target.value)}
                  placeholder={`Örn: ${currentRegion.name} Suriçi, Yenikent...`}
                  className="w-full bg-[#333535] border border-[#524534] rounded-lg px-3 py-2 text-sm text-[#e2e2e2] outline-none focus:border-[#f5a623]"
                />
              </div>
            )}
          </div>
        </section>

        {/* Step 3: Market / Şube Seç */}
        <section className="bg-[#1e2020] rounded-xl p-4 sm:p-5 glass-card flex flex-col gap-3.5 border border-[#524534]/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc880] text-[20px]">
                storefront
              </span>
              <h3 className="font-heading text-[18px] font-semibold text-[#e2e2e2]">
                3. Market / Mağaza Seç
              </h3>
            </div>
            <span className="text-[11px] text-[#ffc880] bg-[#121414] px-2 py-0.5 rounded border border-[#524534]">
              {selectedMarketName}
            </span>
          </div>

          {/* Informational Callout regarding Lemar / Molto */}
          <div className="bg-[#141515] border border-[#f5a623]/30 rounded-lg p-2.5 flex items-start gap-2 text-[12px] text-[#d7c3ae]">
            <span className="material-symbols-outlined text-[#f5a623] text-[18px] flex-shrink-0 mt-0.5">
              info
            </span>
            <span>
              <strong>Not:</strong> Lemar marketleri yeni adıyla <strong>Molto Market</strong> olarak da bilinir. Seçtiğiniz bölgeye ({currentRegion.name} - {effectiveDistrict}) ait şube otomatik eşleştirilir.
            </span>
          </div>

          {/* Market Chains Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MARKET_CHAINS.map((chain) => {
              const isSelected = selectedChainId === chain.id && !isAddingNewMarket;
              return (
                <button
                  type="button"
                  key={chain.id}
                  id={`btn-market-${chain.id}`}
                  onClick={() => handleSelectChain(chain)}
                  className={`p-3 rounded-lg flex flex-col items-start justify-between gap-1.5 transition-all cursor-pointer border text-left relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#333535] border-[#ffc880] ring-1 ring-[#ffc880] shadow-md'
                      : chain.highlight
                      ? 'bg-[#282a2b] border-[#524534] hover:border-[#ffc880]/50'
                      : 'bg-[#242626] border-[#524534]/70 hover:border-[#ffc880]/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="material-symbols-outlined text-[18px] text-[#ffc880]">
                      {chain.icon}
                    </span>
                    <span className="text-[10px] text-[#d7c3ae] bg-[#121414] px-1.5 py-0.5 rounded">
                      {chain.badge}
                    </span>
                  </div>

                  <div>
                    <span className={`text-[13px] font-bold block ${isSelected ? 'text-[#ffc880]' : 'text-[#e2e2e2]'}`}>
                      {chain.name}
                    </span>
                    <span className="text-[11px] text-[#d7c3ae] block truncate">
                      {chain.fullName}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute top-1 right-1">
                      <span className="material-symbols-outlined text-[14px] text-[#ffc880]">
                        check_circle
                      </span>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Custom Market Option */}
            <button
              type="button"
              onClick={() => setIsAddingNewMarket(!isAddingNewMarket)}
              className="bg-[#141515] border border-dashed border-[#524534] rounded-lg p-3 flex flex-col items-center justify-center gap-1 hover:border-[#ffc880] hover:text-[#ffc880] transition-colors text-[#d7c3ae] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="text-[12px] font-medium">Başka Market Ekle</span>
            </button>
          </div>

          {isAddingNewMarket && (
            <div className="flex gap-2 mt-2 pt-2 border-t border-[#333535] animate-fade-in">
              <input
                type="text"
                value={customMarketInput}
                onChange={(e) => setCustomMarketInput(e.target.value)}
                placeholder="Market veya Tekel adını yazın (örn: Dereboyu Tekel Shop)"
                className="flex-1 bg-[#333535] border border-[#524534] rounded-lg px-3 py-2 text-sm text-[#e2e2e2] outline-none focus:border-[#f5a623]"
              />
              <button
                type="button"
                onClick={handleAddCustomMarket}
                className="bg-[#f5a623] text-[#1c1b1b] px-4 py-2 rounded-lg font-bold text-sm cursor-pointer"
              >
                Uygula
              </button>
            </div>
          )}

          {/* Selected Summary Card */}
          <div className="bg-[#141515] rounded-lg p-3 border border-[#524534]/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ffc880] text-[20px]">
                pin_drop
              </span>
              <div>
                <p className="text-[13px] font-semibold text-[#e2e2e2]">
                  {selectedMarketName}
                </p>
                <p className="text-[11px] text-[#ffc880]">
                  📍 {finalLocation}
                </p>
              </div>
            </div>
            <span className="text-[11px] text-[#d7c3ae] bg-[#282a2b] px-2 py-0.5 rounded border border-[#524534]/40">
              Onaylandı
            </span>
          </div>
        </section>

        {/* Step 4: Fiyat Gir */}
        <section className="bg-[#1e2020] rounded-xl p-4 sm:p-5 glass-card flex flex-col gap-2 border border-[#524534]/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffc880] text-[20px]">
              payments
            </span>
            <h3 className="font-heading text-[18px] font-semibold text-[#e2e2e2]">
              4. Gördüğün Fiyatı Gir
            </h3>
          </div>

          <div className="flex items-end gap-2 border-b-2 border-[#524534] pb-2 focus-within:border-[#f5a623] transition-colors w-2/3 sm:w-1/2 mt-1">
            <input
              id="input-report-price"
              type="number"
              step="0.01"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent border-none p-0 font-heading text-[26px] font-bold text-[#e2e2e2] focus:ring-0 text-right placeholder-[#333535] outline-none"
            />
            <span className="font-heading text-[22px] font-semibold text-[#d7c3ae] mb-0.5">
              ₺
            </span>
          </div>
        </section>

        {/* Step 5: Fotoğraf / Fiş Ekle */}
        <section className="bg-[#1e2020] rounded-xl p-4 sm:p-5 glass-card flex flex-col gap-3 border border-[#524534]/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc880] text-[20px]">
                photo_camera
              </span>
              <h3 className="font-heading text-[18px] font-semibold text-[#e2e2e2]">
                5. Fiş / Raf Etiketi Fotoğrafı
              </h3>
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#d7c3ae] bg-[#333535] px-2.5 py-1 rounded-full">
              Opsiyonel
            </span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          {receiptImage ? (
            <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#524534]">
              <img
                src={receiptImage}
                alt="Yüklenen Fiş"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setReceiptImage(null)}
                className="absolute top-2 right-2 bg-[#121414]/80 text-[#ffb4ab] p-1.5 rounded-full hover:bg-[#93000a] text-xs font-bold cursor-pointer"
              >
                ✕ Kaldır
              </button>
            </div>
          ) : (
            <button
              type="button"
              id="btn-upload-receipt"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-28 border-2 border-dashed border-[#524534] rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-[#333535] hover:border-[#ffc880] transition-all text-[#d7c3ae] hover:text-[#ffc880] group cursor-pointer"
            >
              <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform">
                upload
              </span>
              <span className="text-[13px]">Raf etiketini veya fişi yükle</span>
            </button>
          )}
        </section>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            id="btn-submit-price"
            className="w-full bg-[#f5a623] text-[#644000] font-heading font-bold text-[18px] py-4 rounded-xl shadow-lg hover:bg-[#ffddb4] transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined fill-icon">share</span>
            Fiyatı Paylaş & +50 Puan Kazan
          </button>
        </div>
      </form>
    </div>
  );
};
