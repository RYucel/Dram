import React, { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAInstallPromptProps {
  isOpenModalManual?: boolean;
  onCloseModal?: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  isOpenModalManual = false,
  onCloseModal
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA)
    const checkStandalone = (): boolean => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
      if (isStandaloneMode) {
        setIsInstalled(true);
      }
      return isStandaloneMode;
    };

    checkStandalone();

    // Check for iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Check if user dismissed recently
      const dismissed = localStorage.getItem('dramtracker_pwa_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      setShowGuideModal(false);
      setDeferredPrompt(null);
      console.log('[PWA] DramTracker successfully installed');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Online / Offline listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // If iOS and not standalone and not dismissed, show banner after 2s
    if (isIosDevice && !checkStandalone()) {
      const dismissed = localStorage.getItem('dramtracker_pwa_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => setShowBanner(true), 2500);
        return () => clearTimeout(timer);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // When parent opens modal manually
  useEffect(() => {
    if (isOpenModalManual) {
      setShowGuideModal(true);
    }
  }, [isOpenModalManual]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Android / Chrome / Edge native prompt
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] User accepted install prompt');
          setIsInstalled(true);
          setShowBanner(false);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('[PWA] Install error:', err);
      }
    } else {
      // iOS or browser without beforeinstallprompt support -> Open step-by-step modal
      setShowGuideModal(true);
    }
  };

  const handleDismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('dramtracker_pwa_dismissed', 'true');
  };

  const handleCloseModal = () => {
    setShowGuideModal(false);
    if (onCloseModal) {
      onCloseModal();
    }
  };

  if (isStandalone && !isOpenModalManual && !showGuideModal) {
    return null;
  }

  return (
    <>
      {/* Offline Status Bar Notification */}
      {isOffline && (
        <div className="fixed top-14 left-0 right-0 z-50 bg-[#b45309] text-[#ffffff] px-4 py-2 text-center text-xs font-semibold shadow-lg flex items-center justify-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[16px]">wifi_off</span>
          <span>Çevrimdışısınız — Önbelleğe alınmış viski fiyatları gösteriliyor.</span>
        </div>
      )}

      {/* Floating Bottom Install Banner (Mobile & Desktop) */}
      {showBanner && !isInstalled && (
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-40 bg-[#1e2020] border border-[#ffc880]/50 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md animate-fade-in flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-[#121414] border border-[#524534] flex items-center justify-center flex-shrink-0 p-1">
              <img
                src="/icon-192.svg"
                alt="DramTracker Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-[14px] font-heading font-bold text-[#e2e2e2] leading-tight truncate">
                DramTracker Uygulaması
              </h4>
              <p className="text-[11px] text-[#d7c3ae] truncate">
                {isIOS ? "Ana ekrana ekle, tek dokunuşla aç" : "Telefona indir & internetsiz kullan"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleInstallClick}
              id="btn-pwa-install-banner"
              className="bg-[#f5a623] hover:bg-[#ffc880] text-[#1c1b1b] text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow cursor-pointer active:scale-95 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Yükle</span>
            </button>
            <button
              onClick={handleDismissBanner}
              className="text-[#d7c3ae] hover:text-[#e2e2e2] p-1.5 rounded-lg text-sm cursor-pointer"
              title="Kapat"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Detailed Install Guide Modal (For iOS / Android / Desktop) */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#1e2020] border border-[#524534] rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative flex flex-col gap-4 text-[#e2e2e2]">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#121414] border border-[#ffc880]/40 flex items-center justify-center p-1.5">
                  <img
                    src="/icon-192.svg"
                    alt="DramTracker Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-[18px] font-bold text-[#ffc880]">
                    DramTracker'ı Telefona Kur
                  </h3>
                  <p className="text-xs text-[#d7c3ae]">
                    App Store / Play Store gerekmeden anında yükleyin.
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-[#d7c3ae] hover:text-white p-1 rounded-lg text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Install Action if deferred prompt is available */}
            {deferredPrompt && (
              <div className="bg-[#141515] p-3.5 rounded-xl border border-[#f5a623]/40 flex flex-col gap-2">
                <p className="text-xs text-[#d7c3ae]">
                  Cihazınız tek tıkla doğrudan yüklemeyi destekliyor:
                </p>
                <button
                  onClick={handleInstallClick}
                  className="w-full bg-[#f5a623] hover:bg-[#ffc880] text-[#1c1b1b] font-bold py-2.5 rounded-xl text-sm transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">install_mobile</span>
                  Şimdi Yükle (Android / Chrome)
                </button>
              </div>
            )}

            {/* Step-by-Step Guides */}
            <div className="flex flex-col gap-3">
              {/* iPhone / iOS Guide */}
              <div className="bg-[#141515] p-3.5 rounded-xl border border-[#524534]/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#e2e2e2]">
                  <span className="material-symbols-outlined text-[#ffc880] text-[18px]">
                    phone_iphone
                  </span>
                  <span>iPhone & iPad (Safari) Kurulumu</span>
                </div>
                <ol className="text-xs text-[#d7c3ae] space-y-1.5 pl-4 list-decimal">
                  <li>
                    Safari tarayıcısının altındaki <span className="text-[#ffc880] font-bold">Paylaş (Share <span className="material-symbols-outlined text-[13px] inline align-text-bottom">ios_share</span>)</span> butonuna dokunun.
                  </li>
                  <li>
                    Açılan menüde aşağı kaydırıp <span className="text-[#ffc880] font-bold">"Ana Ekrana Ekle" (Add to Home Screen)</span> seçeneğine basın.
                  </li>
                  <li>
                    Sağ üst köşedeki <span className="text-[#ffc880] font-bold">"Ekle" (Add)</span> butonuna dokunun.
                  </li>
                </ol>
              </div>

              {/* Android Guide */}
              <div className="bg-[#141515] p-3.5 rounded-xl border border-[#524534]/50 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#e2e2e2]">
                  <span className="material-symbols-outlined text-[#ffc880] text-[18px]">
                    android
                  </span>
                  <span>Android (Chrome / Brave / Samsung)</span>
                </div>
                <ol className="text-xs text-[#d7c3ae] space-y-1.5 pl-4 list-decimal">
                  <li>
                    Tarayıcınızın sağ üst köşesindeki <span className="text-[#ffc880] font-bold">üç nokta (⋮)</span> menüsüne dokunun.
                  </li>
                  <li>
                    <span className="text-[#ffc880] font-bold">"Uygulamayı yükle"</span> veya <span className="text-[#ffc880] font-bold">"Ana ekrana ekle"</span> seçeneğine basın.
                  </li>
                  <li>
                    Onaylayın; DramTracker telefonunuzun menüsüne eklenecektir.
                  </li>
                </ol>
              </div>

              {/* PWA Features Highlights */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#d7c3ae] pt-1">
                <div className="bg-[#242626] p-2 rounded-lg border border-[#524534]/40">
                  <span className="material-symbols-outlined text-[#ffc880] text-[16px] block mb-0.5">
                    offline_bolt
                  </span>
                  İnternetsiz Çalışma
                </div>
                <div className="bg-[#242626] p-2 rounded-lg border border-[#524534]/40">
                  <span className="material-symbols-outlined text-[#ffc880] text-[16px] block mb-0.5">
                    speed
                  </span>
                  Hızlı Açılış
                </div>
                <div className="bg-[#242626] p-2 rounded-lg border border-[#524534]/40">
                  <span className="material-symbols-outlined text-[#ffc880] text-[16px] block mb-0.5">
                    fullscreen
                  </span>
                  Tam Ekran Deneyimi
                </div>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="w-full bg-[#333535] hover:bg-[#38393a] text-[#e2e2e2] text-xs font-semibold py-2.5 rounded-xl cursor-pointer transition-colors"
            >
              Anladım, Kapat
            </button>
          </div>
        </div>
      )}
    </>
  );
};
