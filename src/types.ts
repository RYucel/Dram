export type ScreenType = 'browse' | 'report' | 'leaderboard' | 'profile' | 'detail' | 'map';

export interface StorePrice {
  storeId: string;
  storeName: string;
  storeLocation: string;
  price: number;
  currency: string;
  updatedAt: string; // e.g., '2 saat önce'
  timestamp: number;
  isLowest?: boolean;
  reporterName?: string;
  receiptImage?: string;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  storeName: string;
}

export interface Whiskey {
  id: string;
  name: string;
  brand: string;
  type: string; // 'Blended Scotch', 'Single Malt', 'Tennessee Whiskey', 'Irish Whiskey', etc.
  volume: string; // '70cl', '100cl', '50cl'
  description?: string;
  badge?: 'EN İYİ FİYAT' | 'POPÜLER' | 'YENİ' | 'FIRSAT' | 'ÖZEL SERİ';
  imageUrl: string;
  lowestPrice: number;
  lowestStore: string;
  averagePrice: number;
  priceRange: string; // '1.1k - 1.4k TL'
  lastUpdated: string;
  stores: StorePrice[];
  history: PriceHistoryPoint[];
  category: 'scotch' | 'bourbon' | 'irish' | 'japanese' | 'single_malt';
}

export interface Store {
  id: string;
  name: string;
  city: string; // 'Lefkoşa', 'Girne', 'Gazimağusa', 'Güzelyurt', 'Alsancak', 'Minareliköy'
  address: string;
  phone?: string;
  hours?: string;
  featuredBottlesCount?: number;
  type: 'supermarket' | 'boutique' | 'duty_free';
  lat: number;
  lng: number;
  xPercent: number; // For interactive styled map
  yPercent: number;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  tier: 'Altın Üye' | 'Gümüş Üye' | 'Bronz Üye' | 'Usta Tadımcı';
  tierColor: string;
  points: number;
  reportsCount: number;
  badgeIcon?: string;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  rank: number;
  tier: 'Gold' | 'Silver' | 'Bronze';
  points: number;
  reportedCount: number;
  watchlistCount: number;
  achievementsCount: number;
  email: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'price_drop' | 'achievement' | 'community' | 'reward';
  bottleId?: string;
}
