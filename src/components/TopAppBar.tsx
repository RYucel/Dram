import React from 'react';
import { ScreenType } from '../types';

interface TopAppBarProps {
  currentScreen: ScreenType;
  selectedWhiskeyName?: string;
  onBack?: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  onOpenMapToggle?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenInstallModal?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentScreen,
  selectedWhiskeyName,
  onBack,
  onOpenNotifications,
  unreadCount,
  onOpenMapToggle,
  isDarkMode = true,
  onToggleDarkMode,
  onOpenInstallModal,
}) => {
  const isDetailPage = currentScreen === 'detail';
  const isProfilePage = currentScreen === 'profile';

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#121414] border-b border-[#333535] flex justify-between items-center px-4 h-16 max-w-2xl mx-auto shadow-sm">
      {isDetailPage || (isProfilePage && onBack) ? (
        <button
          id="btn-nav-back"
          onClick={onBack}
          aria-label="Geri Dön"
          className="text-[#d7c3ae] hover:text-[#ffc880] hover:bg-[#1e2020] p-2 -ml-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined unfill-icon">arrow_back</span>
        </button>
      ) : (
        <button
          id="btn-brand-icon"
          onClick={onOpenMapToggle}
          title="KKTC Viski Haritası"
          aria-label="Viski Haritası"
          className="text-[#ffc880] hover:bg-[#1e2020] p-2 -ml-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined fill-icon text-[#ffc880]">liquor</span>
        </button>
      )}

      {/* Title */}
      <div className="flex-1 text-center px-2 truncate">
        {isDetailPage ? (
          <h1 className="font-heading text-[18px] sm:text-[20px] font-bold text-[#ffc880] truncate">
            {selectedWhiskeyName || 'Viski Detayı'}
          </h1>
        ) : isProfilePage ? (
          <h1 className="font-heading text-[20px] font-bold tracking-tight text-[#ffc880]">
            Profil ve Ayarlar
          </h1>
        ) : (
          <div className="flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined fill-icon text-[#ffc880] text-[22px] hidden xs:inline-block">
              liquor
            </span>
            <h1 className="font-heading text-[22px] sm:text-[26px] font-bold text-[#ffc880] tracking-tight">
              DramTracker KKTC
            </h1>
          </div>
        )}
      </div>

      {/* Right Icons: Install PWA, Theme Toggle, Map & Notifications */}
      <div className="flex items-center gap-1 -mr-2">
        {onOpenInstallModal && (
          <button
            id="btn-open-install-pwa"
            onClick={onOpenInstallModal}
            aria-label="Uygulamayı Telefona Yükle"
            title="DramTracker'ı Telefona Yükle (PWA)"
            className="text-[#ffc880] hover:bg-[#1e2020] px-2 py-1.5 rounded-full transition-colors flex items-center gap-1 text-xs font-bold bg-[#1e2020]/70 border border-[#524534] cursor-pointer"
          >
            <span className="material-symbols-outlined unfill-icon text-[18px]">
              install_mobile
            </span>
            <span className="hidden sm:inline">Yükle</span>
          </button>
        )}

        {onToggleDarkMode && (
          <button
            id="btn-toggle-theme"
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? 'Açık Moda Geç' : 'Koyu Moda Geç'}
            title={isDarkMode ? 'Açık Moda Geç' : 'Koyu Moda Geç'}
            className="text-[#d7c3ae] hover:text-[#ffc880] hover:bg-[#1e2020] p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined unfill-icon text-[22px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        )}

        {currentScreen !== 'map' && onOpenMapToggle && (
          <button
            id="btn-open-map"
            onClick={onOpenMapToggle}
            aria-label="KKTC Haritası"
            title="Haritada Mağazalar"
            className="text-[#d7c3ae] hover:text-[#ffc880] hover:bg-[#1e2020] p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined unfill-icon text-[22px]">map</span>
          </button>
        )}

        <button
          id="btn-notifications"
          onClick={onOpenNotifications}
          aria-label="Bildirimler"
          className="text-[#d7c3ae] hover:text-[#ffc880] hover:bg-[#1e2020] p-2 rounded-full transition-colors relative flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined unfill-icon">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#f5a623] rounded-full ring-2 ring-[#121414] animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
};
