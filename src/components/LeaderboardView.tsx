import React, { useState } from 'react';
import { LeaderboardUser } from '../types';

interface LeaderboardViewProps {
  leaderboardUsers: LeaderboardUser[];
  onOpenReport: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  leaderboardUsers,
  onOpenReport
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'weekly' | 'allTime'>('weekly');
  const currentUser = leaderboardUsers.find((u) => u.isCurrentUser) || leaderboardUsers[0];

  return (
    <div className="pt-20 pb-28 px-4 max-w-2xl mx-auto w-full flex flex-col gap-6">
      {/* Header Section */}
      <section className="text-center pt-2">
        <h2 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#ffc880] mb-2">
          Topluluk ve Liderlik Tablosu
        </h2>
        <p className="text-[#d7c3ae] text-[14px] leading-relaxed max-w-md mx-auto font-sans">
          Fiyat paylaşarak topluluğa katkıda bulun ve puan kazan! Kıbrıs'ın en güncel viski veritabanını birlikte oluşturalım.
        </p>

        {/* Timeframe switch */}
        <div className="inline-flex bg-[#1e2020] p-1 rounded-full border border-[#524534] mt-4">
          <button
            onClick={() => setSelectedTimeframe('weekly')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedTimeframe === 'weekly'
                ? 'bg-[#f5a623] text-[#1c1b1b] shadow-sm'
                : 'text-[#d7c3ae] hover:text-[#e2e2e2]'
            }`}
          >
            Haftanın Liderleri
          </button>
          <button
            onClick={() => setSelectedTimeframe('allTime')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedTimeframe === 'allTime'
                ? 'bg-[#f5a623] text-[#1c1b1b] shadow-sm'
                : 'text-[#d7c3ae] hover:text-[#e2e2e2]'
            }`}
          >
            Tüm Zamanlar
          </button>
        </div>
      </section>

      {/* My Stats Bento Box */}
      <section
        id="my-stats-bento-card"
        className="bg-[#1e2020] rounded-xl p-4 sm:p-5 border-t border-white/10 relative overflow-hidden shadow-lg"
      >
        {/* Subtle glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#ffc880] to-transparent opacity-60" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt="Senin Profilin"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#ffc880] shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#af8d11] text-[#241a00] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center shadow-lg border border-[#ffc880]/30 font-heading">
                <span className="material-symbols-outlined fill-icon text-[13px] mr-0.5">
                  star
                </span>
                <span>#{currentUser.rank}</span>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-[17px] sm:text-[19px] font-bold text-[#e2e2e2]">
                Senin İstatistiklerin
              </h3>
              <p className="text-[13px] font-semibold text-[#ffc880] mt-0.5">
                {currentUser.tier} • {currentUser.reportsCount} Bildirim
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="font-heading text-[24px] sm:text-[26px] font-bold text-[#e2e2e2]">
              {currentUser.points}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#d7c3ae]">
              Katkı Puanı
            </div>
          </div>
        </div>

        {/* Quick Progress Banner to Next Tier */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px] text-[#d7c3ae]">
            <span>Sonraki Seviye (Altın Üye)</span>
            <span className="text-[#ffc880] font-bold">{currentUser.points} / 500 Puan</span>
          </div>
          <div className="w-full h-2 bg-[#121414] rounded-full overflow-hidden border border-[#524534]/50">
            <div
              className="h-full bg-gradient-to-r from-[#af8d11] to-[#f5a623] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (currentUser.points / 500) * 100)}%` }}
            />
          </div>
        </div>
      </section>

      {/* Leaderboard List */}
      <section className="bg-[#1e2020] rounded-xl overflow-hidden border-t border-white/10 shadow-lg">
        <div className="px-4 py-3.5 border-b border-[#333535] bg-[#282a2b] flex justify-between items-center">
          <h3 className="font-heading text-[18px] font-bold text-[#ffc880] flex items-center gap-2">
            <span className="material-symbols-outlined fill-icon text-[#ffc880]">
              trophy
            </span>
            Haftanın Liderleri
          </h3>
          <span className="text-[11px] text-[#d7c3ae] bg-[#121414] px-2.5 py-1 rounded-full border border-[#524534]">
            Pazartesi Sıfırlanır
          </span>
        </div>

        <div className="flex flex-col divide-y divide-[#333535]">
          {leaderboardUsers
            .filter((u) => !u.isCurrentUser)
            .map((user) => {
              const isFirst = user.rank === 1;
              const isSecond = user.rank === 2;
              const isThird = user.rank === 3;

              return (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-4 transition-colors ${
                    isFirst
                      ? 'bg-[#f5a623]/10 hover:bg-[#f5a623]/15'
                      : 'hover:bg-[#282a2b]'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Rank number */}
                    <div
                      className={`font-heading text-[20px] sm:text-[22px] font-bold w-7 text-center ${
                        isFirst
                          ? 'text-[#ffc880]'
                          : isSecond
                          ? 'text-[#c8c6c5]'
                          : isThird
                          ? 'text-[#9f8e7a]'
                          : 'text-[#d7c3ae]'
                      }`}
                    >
                      {user.rank}
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={`w-12 h-12 rounded-full object-cover ${
                          isFirst
                            ? 'ring-2 ring-[#ffc880] ring-offset-2 ring-offset-[#1e2020]'
                            : 'border border-[#524534]'
                        }`}
                      />
                    </div>

                    {/* Name & Tier */}
                    <div>
                      <h4 className="font-heading text-[15px] sm:text-[16px] text-[#e2e2e2] font-semibold">
                        {user.name}
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full mt-0.5 ${
                          isFirst
                            ? 'text-[#e9c349] bg-[#e9c349]/15'
                            : isSecond
                            ? 'text-[#c8c6c5] bg-[#c8c6c5]/15'
                            : 'text-[#9f8e7a] bg-[#9f8e7a]/15'
                        }`}
                      >
                        <span className="material-symbols-outlined fill-icon text-[13px]">
                          workspace_premium
                        </span>
                        {user.tier}
                      </span>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="font-heading text-[18px] sm:text-[20px] font-bold text-[#e2e2e2]">
                      {user.points.toLocaleString('tr-TR')}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#d7c3ae]">
                      Puan
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* Community CTA */}
      <div className="bg-[#282a2b] p-4 rounded-xl border border-[#524534] flex items-center justify-between gap-3">
        <div>
          <h4 className="font-heading text-[15px] font-bold text-[#ffc880]">
            Puan Kazanmak Çok Kolay!
          </h4>
          <p className="text-[12px] text-[#d7c3ae] mt-0.5">
            Gittiğin marketteki fiyatı bildir, hemen +50 puan kazan.
          </p>
        </div>
        <button
          onClick={onOpenReport}
          className="bg-[#f5a623] text-[#1c1b1b] font-bold text-xs px-3.5 py-2 rounded-lg flex-shrink-0 hover:bg-[#ffc880] transition-colors cursor-pointer"
        >
          Fiyat Bildir
        </button>
      </div>
    </div>
  );
};
