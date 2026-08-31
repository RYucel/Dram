# 🥃 DramTracker KKTC - Viski Fiyat Takip & Karşılaştırma (PWA)

Kuzey Kıbrıs Türk Cumhuriyeti (Lefkoşa, Girne, Gazimağusa, İskele, Güzelyurt, Lefke) genelindeki süpermarket, butik tekel bayisi ve duty-free noktalarındaki güncel viski / içki fiyatlarını karşılaştıran, harita üzerinde gösteren ve topluluk katkılı **Progressive Web App (PWA)**.

---

## 📱 Cep Telefonuna Kurulum (PWA)

Uygulama **PWA (Progressive Web App)** standartlarında geliştirilmiştir. App Store veya Google Play Store'a gerek olmadan, herhangi bir cep telefonuna saniyeler içinde uygulama olarak yüklenebilir:

### 🍏 iPhone / iPad (iOS Safari)
1. Telefonunuzun Safari tarayıcısında uygulamayı açın.
2. Ekranın altındaki **Paylaş (Share `⎋`)** simgesine dokunun.
3. Menüyü aşağı kaydırıp **"Ana Ekrana Ekle" (Add to Home Screen)** seçeneğini seçin.
4. Sağ üstteki **"Ekle"** butonuna dokunun.
5. DramTracker logonuz ana ekranınıza bir yerel uygulama gibi gelecektir.

### 🤖 Android (Chrome, Edge, Samsung Internet)
1. Chrome veya tarayıcınızda uygulamayı açın.
2. Açılan **"DramTracker Uygulaması - Yükle"** bildirimine dokunun. *(Eğer görünmezse sağ üstteki 3 noktaya tıklayıp **"Uygulamayı Yükle"** veya **"Ana Ekrana Ekle"** seçeneğini seçin)*.
3. Onaylayın. Uygulama telefonunuzun uygulama çekmecesine yüklenecektir.

---

## 🚀 Özellikler

- 📦 **Geniş Viski & İçki Kataloğu**: Single Malt, Blended Scotch, Bourbon, Irish, Japanese kategorileri, hacim (70cl, 100cl, 150cl vb.) ve alkol derecesi filtreleri.
- 🏪 **KKTC Bölge & Şube Bazlı Fiyatlar**: Molto / Lemar, Erülkü, Şah Marketplace, İleli, Erdener, Kiler, Macro, Starling, Önder AVM ve Butik Tekel bayileri.
- 🗺️ **İnteraktif KKTC Haritası**: Lefkoşa, Girne, Mağusa ve diğer bölgelerdeki en yakın mağazaları ve en uygun fiyatları anında bulun.
- 🤝 **Topluluk Fiyat Bildirimi & Fiş Yükleme**: Kullanıcılar gördükleri fiyatları fiş/etiket fotoğrafı ile paylaşarak puan ve rütbe kazanır.
- ⚡ **Offline (Çevrimdışı) Desteği**: Service Worker sayesinde internet bağlantınız kopsa bile daha önce görüntülenen fiyatlar ve katalog önbellekten hızlıca açılır.
- 🌓 **Koyu & Açık Tema Desteği**: Gece ve gündüz kullanımına uygun amber tonlarında modern tasarım.

---

## 🛠️ GitHub'a Push ve Kurulum

### 1. Yerel Geliştirme (Local Dev)
```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```
Uygulama `http://localhost:3000` üzerinde açılacaktır.

### 2. Canlı Derleme (Production Build)
```bash
npm run build
```
Derlenmiş PWA dosyaları `dist/` klasörüne çıkacaktır.

### 3. GitHub'a Push Etme
```bash
git init
git add .
git commit -m "feat: DramTracker KKTC PWA complete implementation"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/dramtracker-kktc.git
git push -u origin main
```

### 4. Cloudflare Pages & Vercel Dağıtım Ayarları:
- **Cloudflare Pages:**
  - **Framework preset**: `Vite` (veya `None`)
  - **Build command**: `npm run build`
  - **Build output directory**: `dist`
  - **Environment Variables (Node.js version)**: `NODE_VERSION: 20` (isteğe bağlı)
- **Vercel / Netlify**: GitHub deponuzu bağlayıp `npm run build` ve `dist` çıktı dizini ile otomatik canlıya alabilirsiniz.
- **GitHub Pages**: `dist/` klasörünü `gh-pages` dalına push ederek de ücretsiz yayınlayabilirsiniz.

---

## 📄 Lisans
Apache-2.0
