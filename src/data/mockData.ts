import { Whiskey, Store, LeaderboardUser, UserProfile, AppNotification } from '../types';

export const INITIAL_WHISKIES: Whiskey[] = [
  {
    id: 'chivas-12',
    name: 'Chivas Regal 12',
    brand: 'Chivas Regal',
    type: 'Blended Scotch',
    volume: '70cl',
    badge: 'EN İYİ FİYAT',
    imageUrl: '/images/whiskies/chivas-12.jpg',
    lowestPrice: 950,
    lowestStore: 'Lemar Süpermarket',
    averagePrice: 1250,
    priceRange: '950 - 1.35k TL',
    lastUpdated: '3 saat önce güncellendi',
    category: 'scotch',
    description: 'En az 12 yıl olgunlaştırılmış viskilerin harmanı olan Chivas Regal 12; bal, fındık ve olgun elma notalarıyla dengeli ve zengin bir lezzet sunar.',
    stores: [
      {
        storeId: 'lemar',
        storeName: 'Lemar Süpermarket',
        storeLocation: 'Dereboyu, Lefkoşa',
        price: 950,
        currency: 'TL',
        updatedAt: '3 saat önce',
        timestamp: Date.now() - 3 * 3600 * 1000,
        isLowest: true,
        reporterName: 'Fiyat Avcısı'
      },
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Minareliköy, Lefkoşa',
        price: 1100,
        currency: 'TL',
        updatedAt: '2 saat önce',
        timestamp: Date.now() - 2 * 3600 * 1000,
        reporterName: 'Malt Avcısı'
      },
      {
        storeId: 'ileli',
        storeName: 'İleli Supermarket',
        storeLocation: 'Alsancak, Girne',
        price: 1150,
        currency: 'TL',
        updatedAt: '5 saat önce',
        timestamp: Date.now() - 5 * 3600 * 1000,
        reporterName: 'Ahmet Y.'
      },
      {
        storeId: 'sah',
        storeName: 'Şah Marketplace',
        storeLocation: 'Çatalköy, Girne',
        price: 1200,
        currency: 'TL',
        updatedAt: '2 gün önce',
        timestamp: Date.now() - 48 * 3600 * 1000,
        reporterName: 'Emre K.'
      }
    ],
    history: [
      { date: '1 Şub', price: 1380, storeName: 'Lemar' },
      { date: '8 Şub', price: 1350, storeName: 'İleli' },
      { date: '15 Şub', price: 1280, storeName: 'Şah' },
      { date: '22 Şub', price: 1190, storeName: 'Erülkü' },
      { date: '26 Şub', price: 1150, storeName: 'İleli' },
      { date: 'Bugün', price: 950, storeName: 'Lemar' }
    ]
  },
  {
    id: 'jack-daniels-no7',
    name: "Jack Daniel's Old No.7",
    brand: "Jack Daniel's",
    type: 'Tennessee Whiskey',
    volume: '100cl',
    badge: 'POPÜLER',
    imageUrl: '/images/whiskies/jack-daniels.jpg',
    lowestPrice: 1150,
    lowestStore: 'Erdener Market',
    averagePrice: 1320,
    priceRange: '1.15k - 1.45k TL',
    lastUpdated: 'Dün güncellendi',
    category: 'bourbon',
    description: 'Kömür filtrasyonundan (Lincoln County Process) geçerek meşe fıçılarda dinlendirilen ikonik tatlı karamel ve vanilya aromalı Tennessee viskisi.',
    stores: [
      {
        storeId: 'erdener',
        storeName: 'Erdener Market',
        storeLocation: 'Karakum, Girne',
        price: 1150,
        currency: 'TL',
        updatedAt: 'Dün güncellendi',
        timestamp: Date.now() - 24 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Minareliköy, Lefkoşa',
        price: 1200,
        currency: 'TL',
        updatedAt: '1 gün önce',
        timestamp: Date.now() - 28 * 3600 * 1000
      },
      {
        storeId: 'lemar',
        storeName: 'Lemar Süpermarket',
        storeLocation: 'Gazimağusa',
        price: 1390,
        currency: 'TL',
        updatedAt: '3 gün önce',
        timestamp: Date.now() - 72 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 1400, storeName: 'Lemar' },
      { date: '10 Şub', price: 1320, storeName: 'Şah' },
      { date: '20 Şub', price: 1250, storeName: 'Erülkü' },
      { date: 'Bugün', price: 1150, storeName: 'Erdener' }
    ]
  },
  {
    id: 'jameson-irish',
    name: 'Jameson Irish Whiskey',
    brand: 'Jameson',
    type: 'Irish Whiskey',
    volume: '70cl',
    badge: 'EN İYİ FİYAT',
    imageUrl: '/images/whiskies/jameson.jpg',
    lowestPrice: 890,
    lowestStore: 'Şah Marketplace',
    averagePrice: 960,
    priceRange: '890 - 1.05k TL',
    lastUpdated: '5 saat önce güncellendi',
    category: 'irish',
    description: 'Üç kez damıtılmış ve meşe fıçılarda olgunlaştırılmış yumuşak içimli, hafif meyvemsi ve vanilya bitişli geleneksel İrlanda viskisi.',
    stores: [
      {
        storeId: 'sah',
        storeName: 'Şah Marketplace',
        storeLocation: 'Çatalköy, Girne',
        price: 890,
        currency: 'TL',
        updatedAt: '5 saat önce güncellendi',
        timestamp: Date.now() - 5 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Lefkoşa',
        price: 920,
        currency: 'TL',
        updatedAt: '12 saat önce',
        timestamp: Date.now() - 12 * 3600 * 1000
      },
      {
        storeId: 'ileli',
        storeName: 'İleli Supermarket',
        storeLocation: 'Alsancak, Girne',
        price: 950,
        currency: 'TL',
        updatedAt: '1 gün önce',
        timestamp: Date.now() - 24 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 990, storeName: 'Lemar' },
      { date: '12 Şub', price: 950, storeName: 'İleli' },
      { date: '22 Şub', price: 920, storeName: 'Erülkü' },
      { date: 'Bugün', price: 890, storeName: 'Şah' }
    ]
  },
  {
    id: 'jw-black-label',
    name: 'Johnnie Walker Black Label',
    brand: 'Johnnie Walker',
    type: 'Blended Scotch',
    volume: '70cl',
    badge: 'POPÜLER',
    imageUrl: '/images/whiskies/jw-black.jpg',
    lowestPrice: 1050,
    lowestStore: 'Erülkü Market',
    averagePrice: 1190,
    priceRange: '1.05k - 1.35k TL',
    lastUpdated: '1 saat önce güncellendi',
    category: 'scotch',
    description: 'İskoçya’nın dört bir köşesinden toplanan 12 yıllık viskilerin harmanı; tütsü, meşe ve zengin kuru meyve lezzetleri barındırır.',
    stores: [
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Minareliköy, Lefkoşa',
        price: 1050,
        currency: 'TL',
        updatedAt: '1 saat önce',
        timestamp: Date.now() - 1 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'kiler',
        storeName: 'Kiler Market',
        storeLocation: 'Gönyeli, Lefkoşa',
        price: 1100,
        currency: 'TL',
        updatedAt: '4 saat önce',
        timestamp: Date.now() - 4 * 3600 * 1000
      },
      {
        storeId: 'macro',
        storeName: 'Macro Market',
        storeLocation: 'Girne',
        price: 1250,
        currency: 'TL',
        updatedAt: '1 gün önce',
        timestamp: Date.now() - 24 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 1250, storeName: 'Macro' },
      { date: '14 Şub', price: 1150, storeName: 'Kiler' },
      { date: 'Bugün', price: 1050, storeName: 'Erülkü' }
    ]
  },
  {
    id: 'jw-red-label',
    name: 'Johnnie Walker Red Label',
    brand: 'Johnnie Walker',
    type: 'Blended Scotch',
    volume: '70cl',
    badge: 'FIRSAT',
    imageUrl: '/images/whiskies/jw-red.jpg',
    lowestPrice: 750,
    lowestStore: 'Erülkü Market',
    averagePrice: 850,
    priceRange: '750 - 950 TL',
    lastUpdated: '2 saat önce güncellendi',
    category: 'scotch',
    description: 'Dünyanın en çok satan İskoç viskisi. Baharatlı, canlı ve aromatik yapısıyla kokteyller veya buz ile mükemmel uyum sağlar.',
    stores: [
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Minareliköy, Lefkoşa',
        price: 750,
        currency: 'TL',
        updatedAt: '2 saat önce',
        timestamp: Date.now() - 2 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'lemar',
        storeName: 'Lemar Süpermarket',
        storeLocation: 'Lefkoşa',
        price: 790,
        currency: 'TL',
        updatedAt: '1 gün önce',
        timestamp: Date.now() - 24 * 3600 * 1000
      },
      {
        storeId: 'sah',
        storeName: 'Şah Marketplace',
        storeLocation: 'Girne',
        price: 820,
        currency: 'TL',
        updatedAt: '2 gün önce',
        timestamp: Date.now() - 48 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 890, storeName: 'Lemar' },
      { date: '15 Şub', price: 820, storeName: 'Şah' },
      { date: 'Bugün', price: 750, storeName: 'Erülkü' }
    ]
  },
  {
    id: 'macallan-12-double-cask',
    name: 'The Macallan 12 Double Cask',
    brand: 'The Macallan',
    type: 'Single Malt',
    volume: '70cl',
    badge: 'ÖZEL SERİ',
    imageUrl: '/images/whiskies/macallan-12.png',
    lowestPrice: 2850,
    lowestStore: 'The Macallan Boutique',
    averagePrice: 3200,
    priceRange: '2.85k - 3.5k TL',
    lastUpdated: 'Dün güncellendi',
    category: 'single_malt',
    description: 'Amerikan ve Avrupa şeri meşe fıçılarının mükemmel dengesi; zencefil, bal ve sıcak baharat nüanslarıyla lüks bir profil.',
    stores: [
      {
        storeId: 'macallan-boutique',
        storeName: 'The Macallan Boutique',
        storeLocation: 'Lefkoşa Suriçi',
        price: 2850,
        currency: 'TL',
        updatedAt: 'Dün güncellendi',
        timestamp: Date.now() - 24 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'rare-finds',
        storeName: 'Rare Finds Spirits',
        storeLocation: 'Girne Liman',
        price: 3100,
        currency: 'TL',
        updatedAt: '2 gün önce',
        timestamp: Date.now() - 48 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 3400, storeName: 'Rare Finds' },
      { date: '15 Şub', price: 3100, storeName: 'Lemar' },
      { date: 'Bugün', price: 2850, storeName: 'The Macallan Boutique' }
    ]
  },
  {
    id: 'glenfiddich-12',
    name: 'Glenfiddich 12 Year Old',
    brand: 'Glenfiddich',
    type: 'Single Malt',
    volume: '70cl',
    badge: 'EN İYİ FİYAT',
    imageUrl: '/images/whiskies/glenfiddich-12.jpg',
    lowestPrice: 1450,
    lowestStore: 'İleli Supermarket',
    averagePrice: 1620,
    priceRange: '1.45k - 1.8k TL',
    lastUpdated: '4 saat önce güncellendi',
    category: 'single_malt',
    description: 'Dünyanın en çok ödüllü single malt viskilerinden; taze armut ve meşe notalarıyla ferah ve dengeli.',
    stores: [
      {
        storeId: 'ileli',
        storeName: 'İleli Supermarket',
        storeLocation: 'Alsancak, Girne',
        price: 1450,
        currency: 'TL',
        updatedAt: '4 saat önce',
        timestamp: Date.now() - 4 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Minareliköy',
        price: 1520,
        currency: 'TL',
        updatedAt: '6 saat önce',
        timestamp: Date.now() - 6 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 1750, storeName: 'Lemar' },
      { date: '15 Şub', price: 1580, storeName: 'Erülkü' },
      { date: 'Bugün', price: 1450, storeName: 'İleli' }
    ]
  },
  {
    id: 'monkey-shoulder',
    name: 'Monkey Shoulder',
    brand: 'Monkey Shoulder',
    type: 'Blended Malt',
    volume: '70cl',
    badge: 'POPÜLER',
    imageUrl: '/images/whiskies/monkey-shoulder.jpg',
    lowestPrice: 1100,
    lowestStore: 'Şah Marketplace',
    averagePrice: 1250,
    priceRange: '1.1k - 1.35k TL',
    lastUpdated: '2 saat önce güncellendi',
    category: 'scotch',
    description: 'Üç farklı Speyside single maltının harmanlanmasıyla üretilen, vanilya, portakal ve baharat tonlarıyla zengin yumuşak malt harmanı.',
    stores: [
      {
        storeId: 'sah',
        storeName: 'Şah Marketplace',
        storeLocation: 'Çatalköy, Girne',
        price: 1100,
        currency: 'TL',
        updatedAt: '2 saat önce',
        timestamp: Date.now() - 2 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Lefkoşa',
        price: 1160,
        currency: 'TL',
        updatedAt: '5 saat önce',
        timestamp: Date.now() - 5 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 1300, storeName: 'Lemar' },
      { date: '15 Şub', price: 1200, storeName: 'Erülkü' },
      { date: 'Bugün', price: 1100, storeName: 'Şah' }
    ]
  },
  {
    id: 'ballantines-finest',
    name: "Ballantine's Finest",
    brand: "Ballantine's",
    type: 'Blended Scotch',
    volume: '70cl',
    badge: 'EN İYİ FİYAT',
    imageUrl: '/images/whiskies/ballantines.jpg',
    lowestPrice: 720,
    lowestStore: 'Erülkü Market',
    averagePrice: 820,
    priceRange: '720 - 900 TL',
    lastUpdated: 'Bugün güncellendi',
    category: 'scotch',
    description: '50’den fazla tek malt ve 4 tahıl viskisinin harmanlandığı, hafif çiçeksi, bal ve elma aromaları sunan klasik İskoç viskisi.',
    stores: [
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Minareliköy',
        price: 720,
        currency: 'TL',
        updatedAt: 'Bugün güncellendi',
        timestamp: Date.now() - 1 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'lemar',
        storeName: 'Lemar Süpermarket',
        storeLocation: 'Lefkoşa',
        price: 760,
        currency: 'TL',
        updatedAt: '1 gün önce',
        timestamp: Date.now() - 24 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 850, storeName: 'Lemar' },
      { date: '15 Şub', price: 790, storeName: 'Şah' },
      { date: 'Bugün', price: 720, storeName: 'Erülkü' }
    ]
  },
  {
    id: 'talisker-10',
    name: 'Talisker 10 Year Old',
    brand: 'Talisker',
    type: 'Single Malt',
    volume: '70cl',
    badge: 'ÖZEL SERİ',
    imageUrl: '/images/whiskies/talisker-10.jpg',
    lowestPrice: 1850,
    lowestStore: 'İleli Supermarket',
    averagePrice: 2050,
    priceRange: '1.85k - 2.3k TL',
    lastUpdated: '6 saat önce güncellendi',
    category: 'single_malt',
    description: 'Skye Adası’nın vahşi deniz rüzgarlarını ve turba dumanını taşıyan, biberimsi sıcak bitişi ve deniz tuzu nüanslarıyla ünlü efsanevi malt.',
    stores: [
      {
        storeId: 'ileli',
        storeName: 'İleli Supermarket',
        storeLocation: 'Alsancak, Girne',
        price: 1850,
        currency: 'TL',
        updatedAt: '6 saat önce',
        timestamp: Date.now() - 6 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'rare-finds',
        storeName: 'Rare Finds Spirits',
        storeLocation: 'Girne Liman',
        price: 1980,
        currency: 'TL',
        updatedAt: '1 gün önce',
        timestamp: Date.now() - 24 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 2200, storeName: 'Rare Finds' },
      { date: '15 Şub', price: 1950, storeName: 'İleli' },
      { date: 'Bugün', price: 1850, storeName: 'İleli' }
    ]
  },
  {
    id: 'bulleit-bourbon',
    name: 'Bulleit Bourbon Frontier',
    brand: 'Bulleit',
    type: 'Bourbon',
    volume: '70cl',
    badge: 'POPÜLER',
    imageUrl: '/images/whiskies/bulleit.jpg',
    lowestPrice: 1290,
    lowestStore: 'Erülkü Market',
    averagePrice: 1420,
    priceRange: '1.29k - 1.55k TL',
    lastUpdated: '1 gün önce güncellendi',
    category: 'bourbon',
    description: 'Yüksek çavdar oranıyla cesur ve baharatlı bir karakter kazanan, akçaağaç, meşe ve hindistan cevizi aromalarıyla öne çıkan Kentucky viskisi.',
    stores: [
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Minareliköy',
        price: 1290,
        currency: 'TL',
        updatedAt: '1 gün önce',
        timestamp: Date.now() - 24 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'bourbon-barrel',
        storeName: 'The Bourbon Barrel',
        storeLocation: 'Girne',
        price: 1350,
        currency: 'TL',
        updatedAt: '2 gün önce',
        timestamp: Date.now() - 48 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 1500, storeName: 'Bourbon Barrel' },
      { date: '15 Şub', price: 1380, storeName: 'Erülkü' },
      { date: 'Bugün', price: 1290, storeName: 'Erülkü' }
    ]
  },
  {
    id: 'laphroaig-10',
    name: 'Laphroaig 10 Year Old',
    brand: 'Laphroaig',
    type: 'Single Malt',
    volume: '70cl',
    badge: 'ÖZEL SERİ',
    imageUrl: '/images/whiskies/laphroaig-10.jpg',
    lowestPrice: 1950,
    lowestStore: 'Rare Finds Spirits',
    averagePrice: 2200,
    priceRange: '1.95k - 2.4k TL',
    lastUpdated: '2 gün önce güncellendi',
    category: 'single_malt',
    description: 'Islay bölgesinin en karakteristik viskisi; yoğun turba dumanı, iyot ve yosun aromalarıyla gerçek viski meraklılarının gözdesi.',
    stores: [
      {
        storeId: 'rare-finds',
        storeName: 'Rare Finds Spirits',
        storeLocation: 'Girne Liman',
        price: 1950,
        currency: 'TL',
        updatedAt: '2 gün önce',
        timestamp: Date.now() - 48 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'macallan-boutique',
        storeName: 'The Macallan Boutique',
        storeLocation: 'Lefkoşa',
        price: 2150,
        currency: 'TL',
        updatedAt: '3 gün önce',
        timestamp: Date.now() - 72 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 2350, storeName: 'Rare Finds' },
      { date: '15 Şub', price: 2100, storeName: 'Lemar' },
      { date: 'Bugün', price: 1950, storeName: 'Rare Finds' }
    ]
  },
  {
    id: 'makers-mark',
    name: "Maker's Mark Kentucky Bourbon",
    brand: "Maker's Mark",
    type: 'Bourbon',
    volume: '70cl',
    badge: 'POPÜLER',
    imageUrl: '/images/whiskies/makers-mark.jpg',
    lowestPrice: 1380,
    lowestStore: 'The Bourbon Barrel',
    averagePrice: 1550,
    priceRange: '1.38k - 1.7k TL',
    lastUpdated: '1 gün önce güncellendi',
    category: 'bourbon',
    description: 'Kırmızı kış buğdayı kullanılarak el yapımı olarak üretilen ve her şişesi elle kırmızı balmumuna batırılan tatlı ve yumuşak bourbon.',
    stores: [
      {
        storeId: 'bourbon-barrel',
        storeName: 'The Bourbon Barrel',
        storeLocation: 'Girne',
        price: 1380,
        currency: 'TL',
        updatedAt: '1 gün önce',
        timestamp: Date.now() - 24 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Lefkoşa',
        price: 1450,
        currency: 'TL',
        updatedAt: '2 gün önce',
        timestamp: Date.now() - 48 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 1650, storeName: 'Bourbon Barrel' },
      { date: '15 Şub', price: 1490, storeName: 'Erülkü' },
      { date: 'Bugün', price: 1380, storeName: 'Bourbon Barrel' }
    ]
  },
  {
    id: 'glenlivet-12',
    name: 'The Glenlivet 12 Year Old',
    brand: 'The Glenlivet',
    type: 'Single Malt',
    volume: '70cl',
    badge: 'EN İYİ FİYAT',
    imageUrl: '/images/whiskies/glenlivet-12.jpg',
    lowestPrice: 1520,
    lowestStore: 'Lemar Süpermarket',
    averagePrice: 1680,
    priceRange: '1.52k - 1.85k TL',
    lastUpdated: '3 saat önce güncellendi',
    category: 'single_malt',
    description: 'Speyside vadisinin öncüsü; ananas, taze yaz çiçekleri ve vanilya aromalarıyla ipeksi yumuşaklıkta single malt ziyafeti.',
    stores: [
      {
        storeId: 'lemar',
        storeName: 'Lemar Süpermarket',
        storeLocation: 'Lefkoşa',
        price: 1520,
        currency: 'TL',
        updatedAt: '3 saat önce',
        timestamp: Date.now() - 3 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'ileli',
        storeName: 'İleli Supermarket',
        storeLocation: 'Girne',
        price: 1590,
        currency: 'TL',
        updatedAt: '1 gün önce',
        timestamp: Date.now() - 24 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 1800, storeName: 'Lemar' },
      { date: '15 Şub', price: 1650, storeName: 'İleli' },
      { date: 'Bugün', price: 1520, storeName: 'Lemar' }
    ]
  },
  {
    id: 'ardbeg-10',
    name: 'Ardbeg 10 Year Old',
    brand: 'Ardbeg',
    type: 'Single Malt',
    volume: '70cl',
    badge: 'ÖZEL SERİ',
    imageUrl: '/images/whiskies/ardbeg-10.jpg',
    lowestPrice: 2100,
    lowestStore: 'Rare Finds Spirits',
    averagePrice: 2350,
    priceRange: '2.1k - 2.6k TL',
    lastUpdated: 'Dün güncellendi',
    category: 'single_malt',
    description: 'Dünyanın en turbalı ve en dumanlı single maltlarından biri olmasına rağmen mükemmel limon ve siyah çikolata dengesine sahip kült viski.',
    stores: [
      {
        storeId: 'rare-finds',
        storeName: 'Rare Finds Spirits',
        storeLocation: 'Girne Liman',
        price: 2100,
        currency: 'TL',
        updatedAt: 'Dün güncellendi',
        timestamp: Date.now() - 24 * 3600 * 1000,
        isLowest: true
      },
      {
        storeId: 'erulku',
        storeName: 'Erülkü Market',
        storeLocation: 'Lefkoşa',
        price: 2250,
        currency: 'TL',
        updatedAt: '2 gün önce',
        timestamp: Date.now() - 48 * 3600 * 1000
      }
    ],
    history: [
      { date: '1 Şub', price: 2500, storeName: 'Rare Finds' },
      { date: '15 Şub', price: 2300, storeName: 'Erülkü' },
      { date: 'Bugün', price: 2100, storeName: 'Rare Finds' }
    ]
  }
];

export const KKTC_REGIONS = [
  {
    id: 'lefkosa',
    name: 'Lefkoşa',
    icon: 'location_city',
    districts: ['Dereboyu', 'Gönyeli', 'Ortaköy', 'Küçük Kaymaklı', 'Taşkınköy', 'Minareliköy', 'Yenikent', 'Suriçi', 'Hamitköy', 'Haspolat'],
    commonStores: [
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Dereboyu)', district: 'Dereboyu' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Gönyeli)', district: 'Gönyeli' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Küçük Kaymaklı)', district: 'Küçük Kaymaklı' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Ortaköy)', district: 'Ortaköy' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Taşkınköy)', district: 'Taşkınköy' },
      { chain: 'Erülkü Market', branchName: 'Erülkü Süpermarket', district: 'Minareliköy' },
      { chain: 'Kiler Market', branchName: 'Kiler Süpermarket', district: 'Ortaköy' },
      { chain: 'Macro Market', branchName: 'Macro Supermarket', district: 'Dereboyu' },
      { chain: 'The Macallan Boutique', branchName: 'The Macallan Boutique', district: 'Suriçi' }
    ]
  },
  {
    id: 'girne',
    name: 'Girne',
    icon: 'sailing',
    districts: ['Karakum', 'Çatalköy', 'Alsancak', 'Karaoğlanoğlu', 'Lapta', 'Girne Merkez / Liman', 'Ozanköy', 'Doğanköy', 'Edremit'],
    commonStores: [
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Karakum)', district: 'Karakum' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Çatalköy)', district: 'Çatalköy' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Karaoğlanoğlu)', district: 'Karaoğlanoğlu' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Alsancak)', district: 'Alsancak' },
      { chain: 'Şah Marketplace', branchName: 'Şah Marketplace', district: 'Çatalköy' },
      { chain: 'İleli Supermarket', branchName: 'İleli Supermarket', district: 'Alsancak' },
      { chain: 'Erdener Market', branchName: 'Erdener Market', district: 'Karakum' },
      { chain: 'Starling Supermarket', branchName: 'Starling Supermarket', district: 'Alsancak' },
      { chain: 'The Bourbon Barrel', branchName: 'The Bourbon Barrel', district: 'Girne Merkez' },
      { chain: 'Rare Finds Spirits', branchName: 'Rare Finds Spirits', district: 'Girne Liman' }
    ]
  },
  {
    id: 'gazimagusa',
    name: 'Gazimağusa',
    icon: 'fort',
    districts: ['Salamis Yolu', 'Karakol', 'Baykal', 'Gülseren', 'City Mall Çevresi', 'Kaleiçi', 'Sakarya', 'Tuzla'],
    commonStores: [
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Salamis Yolu)', district: 'Salamis Yolu' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Karakol)', district: 'Karakol' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Gülseren)', district: 'Gülseren' },
      { chain: 'Önder AVM', branchName: 'Önder Alışveriş Merkezi', district: 'Salamis Yolu' },
      { chain: 'Unimar Market', branchName: 'Unimar Süpermarket', district: 'Karakol' },
      { chain: 'The Golden Dram', branchName: 'The Golden Dram', district: 'Salamis Yolu' }
    ]
  },
  {
    id: 'iskele',
    name: 'İskele',
    icon: 'beach_access',
    districts: ['Long Beach', 'İskele Merkez', 'Boğaz', 'Bafra Turizm Bölgesi', 'Yenierenköy', 'Dipkarpaz'],
    commonStores: [
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (İskele Boğaz)', district: 'Boğaz' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Long Beach)', district: 'Long Beach' },
      { chain: 'Unimar Market', branchName: 'Unimar İskele', district: 'İskele Merkez' },
      { chain: 'Caesar Supermarket', branchName: 'Caesar Supermarket', district: 'Long Beach' }
    ]
  },
  {
    id: 'guzelyurt',
    name: 'Güzelyurt',
    icon: 'nature',
    districts: ['Güzelyurt Merkez', 'Kalkanlı (ODTÜ)', 'Bostancı', 'Yaylaköy', 'Aydınköy', 'Zümrütköy'],
    commonStores: [
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Güzelyurt Merkez)', district: 'Güzelyurt Merkez' },
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (ODTÜ Kalkanlı)', district: 'Kalkanlı (ODTÜ)' },
      { chain: 'Kiler Market', branchName: 'Kiler Güzelyurt', district: 'Güzelyurt Merkez' }
    ]
  },
  {
    id: 'lefke',
    name: 'Lefke',
    icon: 'park',
    districts: ['Gemikonağı (LAÜ)', 'Lefke Merkez', 'Yedidalga', 'Gaziveren', 'Yeşilırmak'],
    commonStores: [
      { chain: 'Lemar / Molto', branchName: 'Lemar / Molto (Gemikonağı)', district: 'Gemikonağı (LAÜ)' },
      { chain: 'LAÜ Kampüs Market', branchName: 'LAÜ Kampüs Market', district: 'Gemikonağı (LAÜ)' },
      { chain: 'Lefke Merkez Market', branchName: 'Lefke Merkez Market', district: 'Lefke Merkez' }
    ]
  }
];

export const KKTC_STORES: Store[] = [
  {
    id: 'erulku',
    name: 'Erülkü Market',
    city: 'Lefkoşa (Minareliköy)',
    address: 'Ercan Havalimanı Yolu, Minareliköy Kavşağı',
    phone: '+90 392 232 3000',
    hours: '08:00 - 23:00',
    featuredBottlesCount: 84,
    type: 'supermarket',
    lat: 35.1652,
    lng: 33.4891,
    xPercent: 58,
    yPercent: 46
  },
  {
    id: 'macallan-boutique',
    name: 'The Macallan Boutique',
    city: 'Lefkoşa',
    address: 'Suriçi Arasta Sk. No:14, Lefkoşa',
    phone: '+90 392 228 1900',
    hours: '10:00 - 22:00',
    featuredBottlesCount: 120,
    type: 'boutique',
    lat: 35.1765,
    lng: 33.3639,
    xPercent: 68,
    yPercent: 48
  },
  {
    id: 'bourbon-barrel',
    name: 'The Bourbon Barrel',
    city: 'Girne',
    address: 'Ziya Rızkı Caddesi No:42, Girne',
    phone: '+90 392 815 4400',
    hours: '10:00 - 00:00',
    featuredBottlesCount: 65,
    type: 'boutique',
    lat: 35.3382,
    lng: 33.3195,
    xPercent: 28,
    yPercent: 32
  },
  {
    id: 'rare-finds',
    name: 'Rare Finds Spirits',
    city: 'Girne',
    address: 'Tarihi Antik Liman Yanı, Girne',
    phone: '+90 392 815 9090',
    hours: '11:00 - 23:30',
    featuredBottlesCount: 95,
    type: 'boutique',
    lat: 35.3421,
    lng: 33.3229,
    xPercent: 32,
    yPercent: 53
  },
  {
    id: 'golden-dram',
    name: 'The Golden Dram',
    city: 'Gazimağusa',
    address: 'Salamis Yolu Caddesi No:110, Gazimağusa',
    phone: '+90 392 366 7788',
    hours: '09:30 - 22:00',
    featuredBottlesCount: 78,
    type: 'boutique',
    lat: 35.1256,
    lng: 33.9312,
    xPercent: 45,
    yPercent: 67
  },
  {
    id: 'lemar-dereboyu',
    name: 'Lemar / Molto (Dereboyu)',
    city: 'Lefkoşa (Dereboyu)',
    address: 'Mehmet Akif Caddesi (Dereboyu), Lefkoşa',
    phone: '+90 392 227 8000',
    hours: '08:00 - 22:30',
    featuredBottlesCount: 60,
    type: 'supermarket',
    lat: 35.1895,
    lng: 33.3512,
    xPercent: 52,
    yPercent: 24
  },
  {
    id: 'lemar-karakum',
    name: 'Lemar / Molto (Karakum)',
    city: 'Girne (Karakum)',
    address: 'Uğur Mumcu Caddesi, Karakum, Girne',
    phone: '+90 392 815 6000',
    hours: '08:00 - 22:30',
    featuredBottlesCount: 58,
    type: 'supermarket',
    lat: 35.3340,
    lng: 33.3450,
    xPercent: 38,
    yPercent: 28
  },
  {
    id: 'sah',
    name: 'Şah Marketplace',
    city: 'Girne (Çatalköy)',
    address: 'Uğur Mumcu Cad. Çatalköy, Girne',
    phone: '+90 392 824 5500',
    hours: '08:00 - 22:00',
    featuredBottlesCount: 70,
    type: 'supermarket',
    lat: 35.3218,
    lng: 33.3980,
    xPercent: 78,
    yPercent: 38
  },
  {
    id: 'ileli',
    name: 'İleli Supermarket',
    city: 'Girne (Alsancak)',
    address: 'Karaoğlanoğlu Caddesi, Alsancak, Girne',
    phone: '+90 392 821 8200',
    hours: '08:00 - 23:00',
    featuredBottlesCount: 75,
    type: 'supermarket',
    lat: 35.3524,
    lng: 33.2201,
    xPercent: 20,
    yPercent: 42
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    id: 'user-1',
    rank: 1,
    name: 'Viski Gurmesi Ahmet',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxBaTlhmeXdhGb8Ts-7o8JknCeghmVUj73QR5JXdztZSKrerGX9b_XjCQJX8OWURfP37BCGb4TLvAkudAtKUbqCFn0gMoOiM_2Ru4QFPn-2OjpRoW6-VUdMUEhQGz9tttDGMYvVcnz_hneJ5OxI-ReansXCnZMRd9BfPzKqW9av-dlTIXZrBePzL0T21EfI_hLqMY9Nz_ZjL0VRDDRakNh9xOfom-oPzXEePJEcTwYl4GK8Lr15VyE',
    tier: 'Altın Üye',
    tierColor: '#f5a623',
    points: 1250,
    reportsCount: 42,
    badgeIcon: 'workspace_premium'
  },
  {
    id: 'user-2',
    rank: 2,
    name: 'Malt Avcısı',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9jjb71qJHoTBlDWBf6LAsKU3_azWLR1xyEeL0EXOdWxa2gKfkSWjY1ve2qlLqF1LwwNx90hJo8FyQ8XNZhs7aOMzTFqQ3ws331UKDvGC1F0nNcLft2BZ_WGwDEModkJezoGaSA1FNrHneqQ5XALAssN9Pv8Z-BEIimFtlJ79obDsNSRGqZRBZTa7Is3EHWemXOdidCElfTKKK5x9scMqaRsi7vPjhrV5kjziUo1I5ZFJ7CUvRB0t9',
    tier: 'Gümüş Üye',
    tierColor: '#c8c6c5',
    points: 980,
    reportsCount: 31,
    badgeIcon: 'workspace_premium'
  },
  {
    id: 'user-3',
    rank: 3,
    name: 'Fiyat Dedektifi',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOInVEWlg1hU-iDEUUWpW4U8DQWfSp8vIxTSGUQtv5sTSRSqYCzAFydiupPuE4jdoKqmQD0rlraE76tUe_WapgZNlTIxje9CPP7wGT7F7INnDIfFIpp8dsWLZR3iPFj7nEUcwIWaBL3x3grYvIEoW9qPg6ZGIvnct_P1DLBdNH8ffS9g-p19fftg8RLGnhf0uXE5LK15rxmXfQCzr0_YjbxUbNpxOKFDmmHSE97DT9VkVDdGrAGBM8',
    tier: 'Bronz Üye',
    tierColor: '#9f8e7a',
    points: 845,
    reportsCount: 26,
    badgeIcon: 'workspace_premium'
  },
  {
    id: 'user-4',
    rank: 4,
    name: 'Girne Sommelieri',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdu0SRCntK7qiYa8FgZt2BdtxMUSefVumA3tahJkJ7m6VxWCPUl-iwaa17uJmb8GH_rlSoq7EKBAlSkzbn9BDgwHCWGoVLaJjpFi2Y6QrTZ_fY01WDS3mDYSjUh6XSmyYg8F0biyRovG7LOQRZXWG9PZjqmHqNx9JlKLfaRRkWGtFrUKyQsztUZoVCnJy6vSdhwrRkq4SXbAMrqL6zjJjM9JYKmWVvTo5W6OYwHKRrr3RNCoNs-GeW',
    tier: 'Bronz Üye',
    tierColor: '#9f8e7a',
    points: 710,
    reportsCount: 22,
    badgeIcon: 'star'
  },
  {
    id: 'user-current',
    rank: 12,
    name: 'Senin İstatistiklerin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiCzPslsRHv4eajF5NKh9QIB1oWZ7KZmYrm-XfoFSJeSqh5aU09SVEKLffcw4oMhPF4WhQsxAATOchR9lG6u8MNqQ3fOgKJlCfRkkT7cP6PIKqvgs4PGKN1RTc3L-MZTzIy0cfI2d822URqT0YvtljdTXpjYFJ0NL41oBOpIPA2I30Dw5X9N84s3D_WSjB4WxFNvOYOVwO2DX3vSJQ6Kgexs3V5GBlBf2w4o7OrdaJGvX_4FIIDSNT',
    tier: 'Gümüş Üye',
    tierColor: '#ffc880',
    points: 342,
    reportsCount: 14,
    badgeIcon: 'star',
    isCurrentUser: true
  }
];

export const CURRENT_USER: UserProfile = {
  name: 'Viski Gurmesi Ahmet',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdu0SRCntK7qiYa8FgZt2BdtxMUSefVumA3tahJkJ7m6VxWCPUl-iwaa17uJmb8GH_rlSoq7EKBAlSkzbn9BDgwHCWGoVLaJjpFi2Y6QrTZ_fY01WDS3mDYSjUh6XSmyYg8F0biyRovG7LOQRZXWG9PZjqmHqNx9JlKLfaRRkWGtFrUKyQsztUZoVCnJy6vSdhwrRkq4SXbAMrqL6zjJjM9JYKmWVvTo5W6OYwHKRrr3RNCoNs-GeW',
  rank: 1,
  tier: 'Gold',
  points: 1250,
  reportedCount: 42,
  watchlistCount: 18,
  achievementsCount: 5,
  email: 'rustuyucel@gmail.com'
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Fiyat Düşüşü Bildirimi',
    message: 'Takip ettiğiniz Chivas Regal 12, Erülkü Market\'te 1.100 TL\'ye düştü!',
    time: '2 saat önce',
    read: false,
    type: 'price_drop',
    bottleId: 'chivas-12'
  },
  {
    id: 'notif-2',
    title: 'Katkı Puanı Kazandınız! 🎉',
    message: 'Paylaştığınız fiyat topluluk tarafından onaylandı (+50 Puan).',
    time: '5 saat önce',
    read: false,
    type: 'reward'
  },
  {
    id: 'notif-3',
    title: 'Haftalık Liderlik Sıralaması',
    message: 'Tebrikler! KKTC haftalık liderlik tablosunda 1. sıradasınız.',
    time: '1 gün önce',
    read: true,
    type: 'achievement'
  }
];
