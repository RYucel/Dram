import React from 'react';
import { ScreenType } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  // If detail screen is open, we can still show bottom nav or keep it focused. Let's map detail to browse in nav highlight
  const activeTab = currentScreen === 'detail' ? 'browse' : currentScreen;

  const navItems: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'browse', label: 'Browse', icon: 'search' },
    { id: 'report', label: 'Report', icon: 'add_circle' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav
      id="bottom-navbar"
      className="fixed bottom-0 left-0 right-0 w-full z-50 bg-[#1e2020] shadow-[0_-1px_0_0_rgba(255,255,255,0.1)] rounded-t-xl max-w-2xl mx-auto border-t border-[#333535]"
    >
      <div className="flex justify-around items-center py-2 px-2 pb-[max(8px,env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onSelectScreen(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#f5a623] text-[#644000] rounded-full px-5 py-1.5 shadow-sm scale-100 font-bold'
                  : 'text-[#d7c3ae] hover:text-[#ffc880] px-4 py-1.5 scale-95'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] ${
                  isActive ? 'fill-icon text-[#644000]' : 'unfill-icon'
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[11px] uppercase tracking-wider font-bold mt-0.5 font-sans">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
