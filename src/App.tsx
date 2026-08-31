/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, Whiskey, UserProfile, LeaderboardUser, AppNotification } from './types';
import {
  INITIAL_WHISKIES,
  CURRENT_USER,
  LEADERBOARD_USERS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { BrowseView } from './components/BrowseView';
import { ProductDetailView } from './components/ProductDetailView';
import { ReportPriceView } from './components/ReportPriceView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { MapView } from './components/MapView';
import { NotificationModal } from './components/NotificationModal';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('browse');
  const [previousScreen, setPreviousScreen] = useState<ScreenType>('browse');
  const [selectedWhiskey, setSelectedWhiskey] = useState<Whiskey | null>(null);
  const [reportWhiskeyTarget, setReportWhiskeyTarget] = useState<Whiskey | null>(null);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState<boolean>(false);

  // Persistence with localStorage
  const [whiskies, setWhiskies] = useState<Whiskey[]>(() => {
    const saved = localStorage.getItem('dramtracker_whiskies');
    if (saved) {
      try {
        const parsed: Whiskey[] = JSON.parse(saved);
        const initialMap = new Map(INITIAL_WHISKIES.map((w) => [w.id, w]));
        const updatedList = parsed.map((item) => {
          const fresh = initialMap.get(item.id);
          if (fresh) {
            return {
              ...item,
              imageUrl: fresh.imageUrl,
              description: item.description || fresh.description,
              type: fresh.type,
              category: fresh.category,
            };
          }
          return item;
        });
        INITIAL_WHISKIES.forEach((w) => {
          if (!updatedList.some((item) => item.id === w.id)) {
            updatedList.push(w);
          }
        });
        return updatedList;
      } catch {
        return INITIAL_WHISKIES;
      }
    }
    return INITIAL_WHISKIES;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('dramtracker_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return CURRENT_USER;
      }
    }
    return CURRENT_USER;
  });

  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>(() => {
    const saved = localStorage.getItem('dramtracker_leaderboard');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return LEADERBOARD_USERS;
      }
    }
    return LEADERBOARD_USERS;
  });

  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('dramtracker_watchlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['chivas-12', 'macallan-12-double-cask'];
      }
    }
    return ['chivas-12', 'macallan-12-double-cask'];
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('dramtracker_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Dark / Light Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('dramtracker_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true; // default dark mode
  });

  useEffect(() => {
    localStorage.setItem('dramtracker_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('dramtracker_whiskies', JSON.stringify(whiskies));
  }, [whiskies]);

  useEffect(() => {
    localStorage.setItem('dramtracker_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('dramtracker_leaderboard', JSON.stringify(leaderboardUsers));
  }, [leaderboardUsers]);

  useEffect(() => {
    localStorage.setItem('dramtracker_watchlist', JSON.stringify(watchlistIds));
  }, [watchlistIds]);

  useEffect(() => {
    localStorage.setItem('dramtracker_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Actions
  const handleSelectWhiskey = (whiskey: Whiskey) => {
    setSelectedWhiskey(whiskey);
    setPreviousScreen(currentScreen);
    setCurrentScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentScreen === 'detail') {
      setCurrentScreen(previousScreen === 'detail' ? 'browse' : previousScreen);
    } else if (currentScreen === 'map') {
      setCurrentScreen('browse');
    }
  };

  const handleToggleWatchlist = (whiskeyId: string) => {
    setWatchlistIds((prev) => {
      const exists = prev.includes(whiskeyId);
      const next = exists ? prev.filter((id) => id !== whiskeyId) : [...prev, whiskeyId];
      setUserProfile((p) => ({ ...p, watchlistCount: next.length }));
      return next;
    });
  };

  const handleOpenReport = (whiskey?: Whiskey) => {
    setReportWhiskeyTarget(whiskey || null);
    setCurrentScreen('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitReport = (report: {
    whiskeyId: string;
    whiskeyName: string;
    storeName: string;
    storeLocation?: string;
    region?: string;
    district?: string;
    price: number;
    receiptImage?: string;
  }) => {
    const loc = report.storeLocation || 'KKTC';
    const updatedWhiskies = whiskies.map((w) => {
      if (w.id === report.whiskeyId || w.name.toLowerCase() === report.whiskeyName.toLowerCase()) {
        const isNewLowest = report.price < w.lowestPrice;
        const newLowestPrice = isNewLowest ? report.price : w.lowestPrice;
        const formattedStoreName = isNewLowest
          ? (report.storeLocation ? `${report.storeName} (${report.storeLocation})` : report.storeName)
          : w.lowestStore;

        const newStoreEntry = {
          storeId: `${report.storeName.toLowerCase().replace(/\s+/g, '-')}-${loc.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          storeName: report.storeName,
          storeLocation: loc,
          price: report.price,
          currency: 'TL',
          updatedAt: 'Az önce',
          timestamp: Date.now(),
          isLowest: isNewLowest,
          receiptImage: report.receiptImage,
          reporterName: userProfile.name || 'Fiyat Avcısı',
        };

        const existingStoresWithoutThis = w.stores.filter(
          (s) => !(s.storeName.toLowerCase() === report.storeName.toLowerCase() && s.storeLocation?.toLowerCase() === loc.toLowerCase())
        );

        const newHistory = [
          ...w.history,
          { date: 'Bugün', price: report.price, storeName: `${report.storeName} (${loc})` }
        ];

        return {
          ...w,
          lowestPrice: newLowestPrice,
          lowestStore: formattedStoreName,
          lastUpdated: 'Az önce güncellendi',
          stores: [newStoreEntry, ...existingStoresWithoutThis],
          history: newHistory,
        };
      }
      return w;
    });

    setWhiskies(updatedWhiskies);

    // Update User Profile & Points (+50 XP)
    const newPoints = userProfile.points + 50;
    const newReportedCount = userProfile.reportedCount + 1;
    setUserProfile((prev) => ({
      ...prev,
      points: newPoints,
      reportedCount: newReportedCount,
    }));

    // Update current user in leaderboard
    setLeaderboardUsers((prev) =>
      prev.map((u) =>
        u.isCurrentUser
          ? { ...u, points: u.points + 50, reportsCount: u.reportsCount + 1 }
          : u.name === userProfile.name
          ? { ...u, points: u.points + 50, reportsCount: u.reportsCount + 1 }
          : u
      )
    );

    // Add Notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Fiyat Paylaşımınız Onaylandı! 🌟',
      message: `${report.whiskeyName} için ${report.storeName} mağazasında ${report.price} TL bildirimi yaptınız. (+50 Puan)`,
      time: 'Az önce',
      read: false,
      type: 'reward',
      bottleId: report.whiskeyId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Navigate to updated bottle detail if available
    const matchedWhiskey = updatedWhiskies.find((w) => w.id === report.whiskeyId);
    if (matchedWhiskey) {
      setSelectedWhiskey(matchedWhiskey);
    }
  };

  const handleSelectWhiskeyById = (id: string) => {
    const found = whiskies.find((w) => w.id === id);
    if (found) {
      handleSelectWhiskey(found);
    }
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const watchlistedWhiskies = whiskies.filter((w) => watchlistIds.includes(w.id));

  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] flex flex-col font-sans selection:bg-[#f5a623] selection:text-[#1c1b1b]">
      {/* Top Header */}
      <TopAppBar
        currentScreen={currentScreen}
        selectedWhiskeyName={selectedWhiskey?.name}
        onBack={handleBack}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        unreadCount={unreadNotificationsCount}
        onOpenMapToggle={() =>
          setCurrentScreen(currentScreen === 'map' ? 'browse' : 'map')
        }
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenInstallModal={() => setIsPwaModalOpen(true)}
      />

      {/* Main Views */}
      <main className="flex-1 w-full flex flex-col">
        {currentScreen === 'browse' && (
          <BrowseView
            whiskies={whiskies}
            onSelectWhiskey={handleSelectWhiskey}
            onOpenReportForWhiskey={handleOpenReport}
            onOpenMap={() => setCurrentScreen('map')}
          />
        )}

        {currentScreen === 'detail' && selectedWhiskey && (
          <ProductDetailView
            whiskey={selectedWhiskey}
            onBack={handleBack}
            onOpenReport={handleOpenReport}
            isWatchlisted={watchlistIds.includes(selectedWhiskey.id)}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {currentScreen === 'report' && (
          <ReportPriceView
            whiskies={whiskies}
            preSelectedWhiskey={reportWhiskeyTarget}
            onSubmitReport={handleSubmitReport}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardView
            leaderboardUsers={leaderboardUsers}
            onOpenReport={() => handleOpenReport()}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            watchlistedWhiskies={watchlistedWhiskies}
            onSelectWhiskey={handleSelectWhiskey}
            onUpdateProfile={(updated) =>
              setUserProfile((prev) => ({ ...prev, ...updated }))
            }
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
            onOpenInstallModal={() => setIsPwaModalOpen(true)}
          />
        )}

        {currentScreen === 'map' && (
          <MapView
            whiskies={whiskies}
            onSelectWhiskey={handleSelectWhiskey}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavBar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          if (screen !== 'detail') {
            setSelectedWhiskey(null);
          }
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* PWA Install Prompts & Offline Alerts */}
      <PWAInstallPrompt
        isOpenModalManual={isPwaModalOpen}
        onCloseModal={() => setIsPwaModalOpen(false)}
      />

      {/* Notifications Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) =>
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          )
        }
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onSelectWhiskeyById={handleSelectWhiskeyById}
      />
    </div>
  );
}
