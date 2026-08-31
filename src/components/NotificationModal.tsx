import React from 'react';
import { AppNotification, Whiskey } from '../types';

interface NotificationModalProps {
  notifications: AppNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onSelectWhiskeyById: (bottleId: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onSelectWhiskeyById,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e2020] border border-[#524534] rounded-2xl w-full max-w-md p-5 shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex justify-between items-center pb-3 border-b border-[#333535]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined fill-icon text-[#f5a623]">
              notifications
            </span>
            <h3 className="font-heading text-[18px] font-bold text-[#e2e2e2]">
              Bildirimler
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[12px] text-[#ffc880] hover:underline font-semibold"
            >
              Tümünü Oku
            </button>
            <button
              onClick={onClose}
              className="text-[#d7c3ae] hover:text-[#e2e2e2] text-xl font-bold p-1"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
          {notifications.length === 0 ? (
            <p className="text-center text-[#d7c3ae] py-8 text-sm">
              Yeni bildiriminiz yok.
            </p>
          ) : (
            notifications.map((notif) => {
              const iconMap = {
                price_drop: 'trending_down',
                achievement: 'military_tech',
                community: 'group',
                reward: 'stars',
              };

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    onMarkAsRead(notif.id);
                    if (notif.bottleId) {
                      onSelectWhiskeyById(notif.bottleId);
                      onClose();
                    }
                  }}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors cursor-pointer ${
                    notif.read
                      ? 'bg-[#181a1a] border-[#333535] opacity-75'
                      : 'bg-[#282a2b] border-[#f5a623]/50 shadow-sm'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notif.type === 'price_drop'
                        ? 'bg-[#f5a623]/20 text-[#f5a623]'
                        : notif.type === 'reward'
                        ? 'bg-[#e9c349]/20 text-[#e9c349]'
                        : 'bg-[#ffddb4]/20 text-[#ffddb4]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {iconMap[notif.type] || 'notifications'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-heading text-[14px] font-bold text-[#e2e2e2]">
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#f5a623] flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-[12px] text-[#d7c3ae] mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-[#9f8e7a] mt-1.5 block">
                      {notif.time}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
