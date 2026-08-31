import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Whiskey } from '../types';

interface ProductDetailViewProps {
  whiskey: Whiskey;
  onBack: () => void;
  onOpenReport: (whiskey: Whiskey) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (whiskeyId: string) => void;
}

type TimeFrame = '30d' | '90d' | '180d' | 'all';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      date: string;
      price: number;
      storeName: string;
      fullDate?: string;
    };
  }>;
  label?: string;
}

const CustomPriceTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1e2020] border border-[#ffc880]/60 rounded-xl p-3 shadow-2xl backdrop-blur-md z-50 min-w-[170px]">
        <div className="flex items-center justify-between gap-2 border-b border-[#524534]/50 pb-1.5 mb-2">
          <span className="text-[11px] font-semibold text-[#d7c3ae]">
            {data.fullDate || data.date}
          </span>
          <span className="bg-[#f5a623]/20 text-[#ffc880] text-[10px] font-bold px-1.5 py-0.5 rounded">
            {data.storeName}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-[18px] font-bold text-[#ffc880]">
            {data.price.toLocaleString('tr-TR')}
          </span>
          <span className="text-[12px] font-bold text-[#e2e2e2]">TL</span>
        </div>
        <p className="text-[10px] text-[#9f8e7a] mt-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px] text-[#ffc880]">
            storefront
          </span>
          {data.storeName} bildirimi
        </p>
      </div>
    );
  }
  return null;
};

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  whiskey,
  onOpenReport,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>('30d');

  // Prepare chart dataset according to selected timeframe
  const chartData = useMemo(() => {
    const baseHistory = whiskey.history && whiskey.history.length > 0
      ? whiskey.history
      : [
          { date: '1 Şub', price: whiskey.averagePrice, storeName: 'Ortalama' },
          { date: 'Bugün', price: whiskey.lowestPrice, storeName: whiskey.lowestStore },
        ];

    if (selectedTimeframe === '30d') {
      return baseHistory.map((pt) => ({
        ...pt,
        fullDate: pt.date.includes('Bugün') ? 'Bugün (En Güncel)' : `${pt.date} 2026`,
      }));
    }

    if (selectedTimeframe === '90d') {
      const firstPrice = baseHistory[0]?.price || whiskey.lowestPrice;
      return [
        { date: '1 Ara', price: Math.round(firstPrice * 1.08), storeName: 'Lemar', fullDate: '1 Aralık 2025' },
        { date: '15 Ara', price: Math.round(firstPrice * 1.06), storeName: 'İleli', fullDate: '15 Aralık 2025' },
        { date: '1 Oca', price: Math.round(firstPrice * 1.03), storeName: 'Şah', fullDate: '1 Ocak 2026' },
        { date: '15 Oca', price: Math.round(firstPrice * 1.01), storeName: 'Erülkü', fullDate: '15 Ocak 2026' },
        ...baseHistory.map((pt) => ({
          ...pt,
          fullDate: pt.date.includes('Bugün') ? 'Bugün (En Güncel)' : `${pt.date} 2026`,
        })),
      ];
    }

    if (selectedTimeframe === '180d' || selectedTimeframe === 'all') {
      const firstPrice = baseHistory[0]?.price || whiskey.lowestPrice;
      return [
        { date: 'Eyl', price: Math.round(firstPrice * 1.15), storeName: 'Lemar', fullDate: 'Eylül 2025' },
        { date: 'Eki', price: Math.round(firstPrice * 1.12), storeName: 'Erülkü', fullDate: 'Ekim 2025' },
        { date: 'Kas', price: Math.round(firstPrice * 1.10), storeName: 'Şah', fullDate: 'Kasım 2025' },
        { date: 'Ara', price: Math.round(firstPrice * 1.06), storeName: 'İleli', fullDate: 'Aralık 2025' },
        { date: 'Oca', price: Math.round(firstPrice * 1.02), storeName: 'Erülkü', fullDate: 'Ocak 2026' },
        ...baseHistory.map((pt) => ({
          ...pt,
          fullDate: pt.date.includes('Bugün') ? 'Bugün (En Güncel)' : `${pt.date} 2026`,
        })),
      ];
    }

    return baseHistory;
  }, [whiskey, selectedTimeframe]);

  // Dynamic calculations for stats
  const prices = chartData.map((d) => d.price);
  const minChartPrice = Math.min(...prices);
  const maxChartPrice = Math.max(...prices);
  const initialPrice = chartData[0]?.price || minChartPrice;
  const currentPrice = chartData[chartData.length - 1]?.price || minChartPrice;
  const priceDiff = currentPrice - initialPrice;
  const priceDiffPercent = ((priceDiff / initialPrice) * 100).toFixed(1);
  const isDrop = priceDiff <= 0;

  return (
    <div className="pt-20 pb-28 px-4 max-w-2xl mx-auto w-full flex flex-col gap-5">
      {/* Product Hero Section */}
      <section
        id="product-hero-section"
        className="flex flex-col sm:flex-row gap-5 items-center sm:items-start bg-[#1e2020] p-4 sm:p-5 rounded-xl shadow-lg border-t border-white/10 relative"
      >
        {/* Bottle Image */}
        <div className="w-44 h-56 sm:w-52 sm:h-64 flex-shrink-0 bg-[#141515] rounded-lg overflow-hidden flex items-center justify-center border border-[#524534] relative">
          <img
            src={whiskey.imageUrl}
            alt={whiskey.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain p-3 transition-transform duration-300 hover:scale-105"
          />
          {whiskey.badge && (
            <div className="absolute top-2 left-2 bg-[#e9c349] text-[#3c2f00] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm font-heading">
              {whiskey.badge}
            </div>
          )}
        </div>

        {/* Title & Stats */}
        <div className="flex flex-col gap-3 flex-grow w-full">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#e2e2e2] leading-tight">
                {whiskey.name}
              </h2>
              <p className="text-[#d7c3ae] text-[14px] mt-1 font-sans">
                {whiskey.type} • {whiskey.volume}
              </p>
            </div>
            <button
              id="btn-watchlist-toggle"
              onClick={() => onToggleWatchlist(whiskey.id)}
              aria-label={isWatchlisted ? 'Takipten Çıkar' : 'Takibe Al'}
              className={`p-2.5 rounded-full transition-all cursor-pointer ${
                isWatchlisted
                  ? 'bg-[#f5a623] text-[#1c1b1b] shadow-md'
                  : 'bg-[#f5a623]/15 text-[#ffc880] hover:bg-[#f5a623]/30'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isWatchlisted ? 'fill-icon' : 'unfill-icon'
                }`}
              >
                bookmark
              </span>
            </button>
          </div>

          {/* Best Price Highlight Box */}
          <div className="bg-[#af8d11]/15 border border-[#af8d11]/50 p-3.5 rounded-lg flex flex-col gap-1">
            <span className="text-[11px] font-bold tracking-wider text-[#e9c349] uppercase font-heading">
              EN DÜŞÜK FİYAT
            </span>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-heading text-[24px] sm:text-[26px] font-bold text-[#ffc880]">
                {whiskey.lowestPrice.toLocaleString('tr-TR')} TL
              </span>
              <span className="text-[14px] text-[#d7c3ae] font-medium">
                @ {whiskey.lowestStore}
              </span>
            </div>
            <p className="text-[#9f8e7a] text-[12px] flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              {whiskey.lastUpdated}
            </p>
          </div>

          {/* Average & Price Range Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#282a2b] p-3 rounded-lg border border-[#524534]/40 flex flex-col justify-center items-center text-center">
              <span className="text-[11px] uppercase font-bold text-[#d7c3ae] tracking-wider">
                Ortalama Fiyat
              </span>
              <span className="font-heading text-[18px] font-bold text-[#e2e2e2] mt-1">
                {whiskey.averagePrice.toLocaleString('tr-TR')} TL
              </span>
            </div>
            <div className="bg-[#282a2b] p-3 rounded-lg border border-[#524534]/40 flex flex-col justify-center items-center text-center">
              <span className="text-[11px] uppercase font-bold text-[#d7c3ae] tracking-wider">
                Fiyat Aralığı
              </span>
              <span className="font-heading text-[18px] font-bold text-[#e2e2e2] mt-1">
                {whiskey.priceRange}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Recharts Interactive Price History Section */}
      <section
        id="price-history-section"
        className="bg-[#1e2020] rounded-xl shadow-lg border-t border-white/10 overflow-hidden flex flex-col"
      >
        {/* Header with Title and Timeframe Filters */}
        <div className="p-4 border-b border-[#333535] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#242626]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#f5a623]/20 flex items-center justify-center text-[#f5a623]">
              <span className="material-symbols-outlined text-[20px]">
                monitoring
              </span>
            </div>
            <div>
              <h3 className="font-heading text-[17px] font-bold text-[#e2e2e2]">
                Fiyat Değişim Grafiği
              </h3>
              <p className="text-[12px] text-[#d7c3ae]">
                KKTC mağazalarındaki tarihsel fiyat eğilimi
              </p>
            </div>
          </div>

          {/* Timeframe selector pills */}
          <div className="flex bg-[#121414] p-1 rounded-lg border border-[#524534] self-start sm:self-auto">
            {(
              [
                { id: '30d', label: '30G' },
                { id: '90d', label: '3A' },
                { id: '180d', label: '6A' },
                { id: 'all', label: 'Tümü' },
              ] as { id: TimeFrame; label: string }[]
            ).map((tf) => (
              <button
                key={tf.id}
                onClick={() => setSelectedTimeframe(tf.id)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  selectedTimeframe === tf.id
                    ? 'bg-[#f5a623] text-[#1c1b1b] shadow-sm'
                    : 'text-[#d7c3ae] hover:text-[#e2e2e2]'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Insight Summary Stats */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-[#1b1d1d] border-b border-[#333535]">
          <div className="bg-[#242626] p-2.5 rounded-lg border border-[#524534]/40 flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#9f8e7a] tracking-wider">
              En Düşük
            </span>
            <span className="font-heading text-[15px] sm:text-[16px] font-bold text-[#ffc880] mt-0.5">
              {minChartPrice.toLocaleString('tr-TR')} ₺
            </span>
          </div>

          <div className="bg-[#242626] p-2.5 rounded-lg border border-[#524534]/40 flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#9f8e7a] tracking-wider">
              En Yüksek
            </span>
            <span className="font-heading text-[15px] sm:text-[16px] font-bold text-[#c8c6c5] mt-0.5">
              {maxChartPrice.toLocaleString('tr-TR')} ₺
            </span>
          </div>

          <div className="bg-[#242626] p-2.5 rounded-lg border border-[#524534]/40 flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#9f8e7a] tracking-wider">
              Dönemsel Trend
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span
                className={`material-symbols-outlined text-[16px] font-bold ${
                  isDrop ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isDrop ? 'trending_down' : 'trending_up'}
              </span>
              <span
                className={`font-heading text-[13px] sm:text-[14px] font-bold ${
                  isDrop ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {isDrop ? '' : '+'}
                {priceDiffPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="p-4 pt-5 pb-2">
          <div className="w-full h-[220px] sm:h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="whiskeyPriceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f5a623" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#f5a623" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333535"
                  vertical={false}
                  opacity={0.6}
                />

                <XAxis
                  dataKey="date"
                  stroke="#9f8e7a"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#524534' }}
                  tick={{ fill: '#d7c3ae' }}
                  dy={6}
                />

                <YAxis
                  stroke="#9f8e7a"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#d7c3ae' }}
                  tickFormatter={(val) => `${val} ₺`}
                  domain={[
                    (dataMin: number) => Math.floor(dataMin * 0.92 / 50) * 50,
                    (dataMax: number) => Math.ceil(dataMax * 1.05 / 50) * 50,
                  ]}
                />

                <Tooltip content={<CustomPriceTooltip />} />

                <ReferenceLine
                  y={whiskey.lowestPrice}
                  stroke="#f5a623"
                  strokeDasharray="4 4"
                  strokeOpacity={0.7}
                  label={{
                    value: 'En İyi',
                    fill: '#ffc880',
                    fontSize: 10,
                    position: 'insideTopRight',
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="price"
                  name="Fiyat"
                  stroke="#f5a623"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#whiskeyPriceGradient)"
                  activeDot={{
                    r: 6,
                    fill: '#f5a623',
                    stroke: '#1e2020',
                    strokeWidth: 2,
                  }}
                  dot={{
                    r: 3.5,
                    fill: '#ffc880',
                    stroke: '#121414',
                    strokeWidth: 1.5,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#9f8e7a] pt-2 px-1 border-t border-[#333535]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5a623] inline-block" />
              Fiyat Trendi
            </span>
            <span className="text-[#d7c3ae]">
              Noktaların üzerine gelerek mağaza detayını inceleyin
            </span>
          </div>
        </div>
      </section>

      {/* All Prices List Section */}
      <section
        id="all-prices-section"
        className="bg-[#1e2020] rounded-xl shadow-lg border-t border-white/10 overflow-hidden"
      >
        <div className="p-4 border-b border-[#524534] flex justify-between items-center">
          <h3 className="font-heading text-[18px] font-semibold text-[#e2e2e2] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffc880]">storefront</span>
            Tüm Fiyatlar
          </h3>
          <span className="text-[12px] text-[#d7c3ae]">
            {whiskey.stores.length} Market
          </span>
        </div>

        <div className="flex flex-col divide-y divide-[#333535]">
          {whiskey.stores.map((store, idx) => {
            const initial = store.storeName.charAt(0).toUpperCase();
            return (
              <div
                key={idx}
                className="flex justify-between items-center p-4 hover:bg-[#282a2b] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#333535] text-[#ffc880] flex items-center justify-center font-heading font-bold text-[16px] border border-[#524534]">
                    {initial}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-[15px] sm:text-[16px] text-[#e2e2e2] font-semibold">
                      {store.storeName}
                    </span>
                    <span className="text-[12px] text-[#d7c3ae] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">history</span>
                      {store.updatedAt}
                      {store.storeLocation && ` • ${store.storeLocation}`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`font-heading text-[18px] sm:text-[20px] font-bold ${
                      store.isLowest ? 'text-[#ffc880]' : 'text-[#e2e2e2]'
                    }`}
                  >
                    {store.price.toLocaleString('tr-TR')} TL
                  </span>
                  {store.isLowest && (
                    <span className="bg-[#e9c349]/20 text-[#e9c349] text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 border border-[#e9c349]/30">
                      En Düşük
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating Action Button for Submitting Price for this bottle */}
      <button
        id="btn-report-fab"
        onClick={() => onOpenReport(whiskey)}
        className="fixed bottom-6 right-6 bg-[#f5a623] text-[#1c1b1b] px-6 py-3.5 rounded-full shadow-[0_4px_25px_rgba(245,166,35,0.45)] flex items-center gap-2 hover:bg-[#ffc880] transition-all duration-200 z-50 transform hover:scale-105 active:scale-95 font-heading font-bold text-[15px] cursor-pointer"
      >
        <span className="material-symbols-outlined fill-icon text-[22px]">add</span>
        <span>Fiyat Bildir</span>
      </button>
    </div>
  );
};
