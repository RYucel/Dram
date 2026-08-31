import React, { useState } from 'react';
import { UserProfile, Whiskey } from '../types';

interface ProfileViewProps {
  userProfile: UserProfile;
  watchlistedWhiskies: Whiskey[];
  onSelectWhiskey: (whiskey: Whiskey) => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onOpenInstallModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  watchlistedWhiskies,
  onSelectWhiskey,
  onUpdateProfile,
  isDarkMode = true,
  onToggleDarkMode,
  onOpenInstallModal,
}) => {
  const [activeModal, setActiveModal] = useState<
    'watchlist' | 'reports' | 'achievements' | 'editProfile' | 'language' | null
  >(null);

  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [selectedLang, setSelectedLang] = useState('Türkçe');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleSaveProfile = () => {
    if (editName.trim()) {
      onUpdateProfile({ name: editName.trim(), email: editEmail.trim() });
      setActiveModal(null);
      showToast('Profil bilgileri güncellendi.');
    }
  };

  const achievements = [
    { title: 'İlk Damla', desc: 'İlk fiyat bildirimini başarıyla paylaştın.', icon: 'water_drop', unlocked: true },
    { title: 'Pazar Dedektifi', desc: '3 farklı markette fiyat bildirdin.', icon: 'storefront', unlocked: true },
    { title: 'Gold Seviye Gurme', desc: '1.000 topluluk puanına ulaştın.', icon: 'workspace_premium', unlocked: true },
    { title: 'Single Malt Ustası', desc: '5 farklı Single Malt viskide en ucuz fiyatı buldun.', icon: 'military_tech', unlocked: true },
    { title: 'Topluluk Rehberi', desc: 'Paylaştığın fiyat 50+ kişi tarafından görüntülendi.', icon: 'group', unlocked: true },
    { title: 'Kıbrıs Gezgini', desc: '5 farklı KKTC ilçesinde fiyat bildirdin.', icon: 'explore', unlocked: false }
  ];

  return (
    <div className="pt-20 pb-28 px-4 max-w-2xl mx-auto w-full space-y-6">
      {toastMessage && (
        <div className="bg-[#f5a623] text-[#1c1b1b] px-4 py-2.5 rounded-lg text-center font-bold text-sm shadow-lg animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Profile Header Section */}
      <section className="flex flex-col items-center justify-center pt-2 pb-2 text-center">
        <div className="relative mb-3">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-[#f5a623] shadow-xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-[#af8d11] text-[#342800] text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border-2 border-[#1e2020] shadow-md flex items-center gap-1 font-heading">
            <span className="material-symbols-outlined fill-icon text-[13px]">
              star
            </span>
            {userProfile.tier}
          </div>
        </div>

        <h2 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#e2e2e2]">
          {userProfile.name}
        </h2>
        <p className="text-[#d7c3ae] text-[14px] mt-0.5 font-medium">
          {userProfile.points.toLocaleString('tr-TR')} Katkı Puanı
        </p>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-3 gap-3">
        <div
          id="stat-box-reported"
          onClick={() => setActiveModal('reports')}
          className="bg-[#1e2020] p-3 rounded-xl text-center border-t border-white/5 flex flex-col items-center justify-center h-24 shadow-md transition-transform hover:scale-105 duration-200 cursor-pointer hover:bg-[#282a2b]"
        >
          <span className="material-symbols-outlined fill-icon text-[#ffb955] mb-1 text-[22px]">
            receipt_long
          </span>
          <span className="font-heading text-[20px] font-bold text-[#e2e2e2]">
            {userProfile.reportedCount}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d7c3ae] mt-0.5">
            Bildirilen
          </span>
        </div>

        <div
          id="stat-box-watchlist"
          onClick={() => setActiveModal('watchlist')}
          className="bg-[#1e2020] p-3 rounded-xl text-center border-t border-white/5 flex flex-col items-center justify-center h-24 shadow-md transition-transform hover:scale-105 duration-200 cursor-pointer hover:bg-[#282a2b]"
        >
          <span className="material-symbols-outlined fill-icon text-[#ffb955] mb-1 text-[22px]">
            visibility
          </span>
          <span className="font-heading text-[20px] font-bold text-[#e2e2e2]">
            {watchlistedWhiskies.length}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d7c3ae] mt-0.5">
            Takip
          </span>
        </div>

        <div
          id="stat-box-achievements"
          onClick={() => setActiveModal('achievements')}
          className="bg-[#1e2020] p-3 rounded-xl text-center border-t border-white/5 flex flex-col items-center justify-center h-24 shadow-md transition-transform hover:scale-105 duration-200 cursor-pointer hover:bg-[#282a2b]"
        >
          <span className="material-symbols-outlined fill-icon text-[#e9c349] mb-1 text-[22px]">
            workspace_premium
          </span>
          <span className="font-heading text-[20px] font-bold text-[#e2e2e2]">
            {userProfile.achievementsCount}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d7c3ae] mt-0.5">
            Başarımlar
          </span>
        </div>
      </section>

      {/* PWA Mobile App Install Card */}
      <section className="bg-gradient-to-r from-[#2a2215] to-[#1e2020] border border-[#ffc880]/40 rounded-2xl p-4 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#121414] border border-[#f5a623] p-1.5 flex items-center justify-center flex-shrink-0">
            <img src="/icon-192.svg" alt="DramTracker" className="w-full h-full object-contain" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-[#ffc880] text-[15px]">
              DramTracker'ı Telefona İndir
            </h4>
            <p className="text-xs text-[#d7c3ae]">
              PWA kurulumu ile internetsiz ve tam ekran kullanın.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenInstallModal}
          id="btn-profile-install-pwa"
          className="bg-[#f5a623] hover:bg-[#ffc880] text-[#1c1b1b] font-bold text-xs px-3.5 py-2.5 rounded-xl shadow cursor-pointer transition-all active:scale-95 flex-shrink-0 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">install_mobile</span>
          <span>Kur</span>
        </button>
      </section>

      {/* Settings Groups */}
      <div className="space-y-6">
        {/* Group 1: Hesap Ayarları */}
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#d7c3ae] mb-2 pl-1">
            Hesap Ayarları
          </h3>
          <div className="bg-[#1e2020] rounded-xl overflow-hidden border-t border-white/5 shadow-md divide-y divide-[#524534]/30">
            <button
              onClick={() => setActiveModal('editProfile')}
              className="w-full flex items-center justify-between p-4 hover:bg-[#282a2b] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 text-[#e2e2e2]">
                <span className="material-symbols-outlined text-[#ffb955]">person</span>
                <span className="text-[15px] font-medium">Profil Düzenle</span>
              </div>
              <span className="material-symbols-outlined text-[#d7c3ae] text-[20px]">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => showToast('E-posta & Güvenlik ayarları güncel.')}
              className="w-full flex items-center justify-between p-4 hover:bg-[#282a2b] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 text-[#e2e2e2]">
                <span className="material-symbols-outlined text-[#ffb955]">security</span>
                <span className="text-[15px] font-medium">E-posta ve Güvenlik</span>
              </div>
              <span className="material-symbols-outlined text-[#d7c3ae] text-[20px]">
                chevron_right
              </span>
            </button>
          </div>
        </section>

        {/* Group 2: Uygulama Ayarları */}
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#d7c3ae] mb-2 pl-1">
            Uygulama Ayarları
          </h3>
          <div className="bg-[#1e2020] rounded-xl overflow-hidden border-t border-white/5 shadow-md divide-y divide-[#524534]/30">
            <button
              onClick={() => showToast('Fiyat düşüş bildirimleri açık.')}
              className="w-full flex items-center justify-between p-4 hover:bg-[#282a2b] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 text-[#e2e2e2]">
                <span className="material-symbols-outlined text-[#ffb955]">notifications</span>
                <span className="text-[15px] font-medium">Bildirim Tercihleri</span>
              </div>
              <span className="material-symbols-outlined text-[#d7c3ae] text-[20px]">
                chevron_right
              </span>
            </button>

            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3 text-[#e2e2e2]">
                <span className="material-symbols-outlined text-[#ffb955]">
                  {isDarkMode ? 'dark_mode' : 'light_mode'}
                </span>
                <span className="text-[15px] font-medium">Tema</span>
              </div>
              <div
                id="btn-profile-toggle-theme"
                onClick={onToggleDarkMode}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span className="text-[13px] text-[#d7c3ae]">
                  {isDarkMode ? 'Koyu Mod' : 'Açık Mod'}
                </span>
                <div
                  className={`w-11 h-6 rounded-full relative transition-colors ${
                    isDarkMode ? 'bg-[#f5a623]' : 'bg-[#333535]'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full transition-transform duration-200 ${
                      isDarkMode
                        ? 'right-1 bg-[#644000]'
                        : 'left-1 bg-[#e2e2e2]'
                    }`}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('language')}
              className="w-full flex items-center justify-between p-4 hover:bg-[#282a2b] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 text-[#e2e2e2]">
                <span className="material-symbols-outlined text-[#ffb955]">language</span>
                <span className="text-[15px] font-medium">Dil Seçimi</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[13px] text-[#d7c3ae]">{selectedLang}</span>
                <span className="material-symbols-outlined text-[#d7c3ae] text-[20px]">
                  chevron_right
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Group 3: Destek */}
        <section>
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#d7c3ae] mb-2 pl-1">
            Destek
          </h3>
          <div className="bg-[#1e2020] rounded-xl overflow-hidden border-t border-white/5 shadow-md divide-y divide-[#524534]/30">
            <button
              onClick={() => showToast('Destek hattı: destek@dramtracker.com')}
              className="w-full flex items-center justify-between p-4 hover:bg-[#282a2b] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 text-[#e2e2e2]">
                <span className="material-symbols-outlined text-[#ffb955]">help</span>
                <span className="text-[15px] font-medium">Yardım Merkezi</span>
              </div>
              <span className="material-symbols-outlined text-[#d7c3ae] text-[20px]">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => showToast('Geri bildiriminiz için teşekkür ederiz!')}
              className="w-full flex items-center justify-between p-4 hover:bg-[#282a2b] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 text-[#e2e2e2]">
                <span className="material-symbols-outlined text-[#ffb955]">chat_bubble</span>
                <span className="text-[15px] font-medium">Geri Bildirim Gönder</span>
              </div>
              <span className="material-symbols-outlined text-[#d7c3ae] text-[20px]">
                chevron_right
              </span>
            </button>
          </div>
        </section>

        {/* Logout Button */}
        <button
          onClick={() => showToast('Oturum kapatma simülasyonu')}
          className="w-full py-3.5 flex items-center justify-center gap-2 text-[#ffb4ab] hover:bg-[#93000a]/20 rounded-xl transition-colors duration-200 font-heading font-semibold text-[16px] border border-[#ffb4ab]/30 bg-[#1e2020] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Çıkış Yap
        </button>
      </div>

      {/* Modal: Takip Listesi (Watchlist) */}
      {activeModal === 'watchlist' && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e2020] border border-[#524534] rounded-2xl w-full max-w-md p-5 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-[#333535]">
              <h3 className="font-heading text-[18px] font-bold text-[#ffc880] flex items-center gap-2">
                <span className="material-symbols-outlined fill-icon text-[#ffc880]">
                  bookmark
                </span>
                Takip Ettiğin Viskiler ({watchlistedWhiskies.length})
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-[#d7c3ae] hover:text-[#e2e2e2] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 divide-y divide-[#333535]">
              {watchlistedWhiskies.length === 0 ? (
                <p className="text-center text-[#d7c3ae] py-6 text-sm">
                  Henüz takip ettiğiniz viski bulunmuyor.
                </p>
              ) : (
                watchlistedWhiskies.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => {
                      setActiveModal(null);
                      onSelectWhiskey(w);
                    }}
                    className="py-3 flex items-center justify-between hover:bg-[#282a2b] px-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={w.imageUrl}
                        alt={w.name}
                        className="w-10 h-10 rounded object-cover bg-[#121414]"
                      />
                      <div>
                        <h4 className="font-heading text-[14px] font-semibold text-[#e2e2e2]">
                          {w.name}
                        </h4>
                        <p className="text-[12px] text-[#d7c3ae]">{w.lowestStore}</p>
                      </div>
                    </div>
                    <div className="text-right font-heading text-[15px] font-bold text-[#ffc880]">
                      {w.lowestPrice.toLocaleString('tr-TR')} TL
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Başarımlar */}
      {activeModal === 'achievements' && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e2020] border border-[#524534] rounded-2xl w-full max-w-md p-5 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center pb-3 border-b border-[#333535]">
              <h3 className="font-heading text-[18px] font-bold text-[#ffc880] flex items-center gap-2">
                <span className="material-symbols-outlined fill-icon text-[#e9c349]">
                  workspace_premium
                </span>
                Kazanılan Başarımlar (5/6)
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-[#d7c3ae] hover:text-[#e2e2e2] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center gap-3 ${
                    ach.unlocked
                      ? 'bg-[#282a2b] border-[#e9c349]/40'
                      : 'bg-[#121414] border-[#333535] opacity-50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      ach.unlocked
                        ? 'bg-[#af8d11] text-[#342800]'
                        : 'bg-[#333535] text-[#d7c3ae]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {ach.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading text-[14px] font-bold text-[#e2e2e2]">
                      {ach.title}
                    </h4>
                    <p className="text-[12px] text-[#d7c3ae]">{ach.desc}</p>
                  </div>
                  {ach.unlocked && (
                    <span className="text-[11px] font-bold text-[#e9c349] bg-[#e9c349]/10 px-2 py-0.5 rounded">
                      Kazanıldı
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Profil Düzenle */}
      {activeModal === 'editProfile' && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e2020] border border-[#524534] rounded-2xl w-full max-w-md p-5 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-[#333535]">
              <h3 className="font-heading text-[18px] font-bold text-[#ffc880]">
                Profil Bilgilerini Düzenle
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-[#d7c3ae] hover:text-[#e2e2e2] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="text-[13px] text-[#d7c3ae] block mb-1">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#333535] border border-[#524534] rounded-lg px-3.5 py-2.5 text-[#e2e2e2] outline-none focus:border-[#f5a623]"
                />
              </div>

              <div>
                <label className="text-[13px] text-[#d7c3ae] block mb-1">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-[#333535] border border-[#524534] rounded-lg px-3.5 py-2.5 text-[#e2e2e2] outline-none focus:border-[#f5a623]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg bg-[#333535] text-[#e2e2e2] text-sm font-medium"
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-5 py-2 rounded-lg bg-[#f5a623] text-[#1c1b1b] text-sm font-bold"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Dil Seçimi */}
      {activeModal === 'language' && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e2020] border border-[#524534] rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <h3 className="font-heading text-[18px] font-bold text-[#ffc880] mb-4">
              Dil Tercihi / Language
            </h3>
            <div className="space-y-2">
              {['Türkçe', 'English (UK)'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setActiveModal(null);
                    showToast(`Dil değiştirildi: ${lang}`);
                  }}
                  className={`w-full p-3 rounded-xl border flex justify-between items-center text-left ${
                    selectedLang === lang
                      ? 'bg-[#f5a623]/20 border-[#f5a623] text-[#ffc880] font-bold'
                      : 'bg-[#282a2b] border-[#524534] text-[#e2e2e2]'
                  }`}
                >
                  <span>{lang}</span>
                  {selectedLang === lang && (
                    <span className="material-symbols-outlined text-[#f5a623]">
                      check
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
