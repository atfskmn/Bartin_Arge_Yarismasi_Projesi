# Site url=https://bartinarge.great-site.net

# Dijital Empati Köprüleri

Bartın Üniversitesi AR-GE Proje Pazarı 2025 - Kültürel Dayanışma için Etkileşimli Hikaye Platformu

## Proje Hakkında

Bu platform, kullanıcıların kişisel hikayelerini paylaşarak empati kurmalarını, birbirlerini daha iyi anlamalarını ve kültürel dayanışmayı güçlendirmelerini sağlayan bir web uygulamasıdır.

## Özellikler

### Temel Özellikler

- **Hikaye Paylaşımı**: Kullanıcılar kendi empati hikayelerini yazabilir ve paylaşabilir
- **Yapay Zeka Analizi**: Her hikaye için otomatik empati skoru hesaplanır (0-100)
- **Rozet Sistemi**: Başarılara göre otomatik rozet kazanımı
- **Konum Tabanlı Paylaşım**: GPS ile konum ekleme (opsiyonel)
- **İnteraktif Harita**: Hikayelerin dünya haritasında görselleştirilmesi

### Sosyal Özellikler

- **Gerçek Zamanlı Mesajlaşma**: Kullanıcılar arası özel mesajlaşma
- **Çevrimiçi Durum**: Aktif kullanıcıları görüntüleme (30 saniye güncelleme)
- **Kullanıcı Profilleri**: Rozet koleksiyonu ve hikaye geçmişi

### Güvenlik ve Gizlilik

- **KVKK Uyumlu**: Kullanım şartları ve aydınlatma metni
- **Firebase Authentication**: Güvenli kullanıcı yönetimi
- **Firestore Security Rules**: Rol tabanlı veri erişim kontrolü

## Teknoloji Stack

- **Frontend**: Vue 3 (Composition API) + Quasar Framework v2.18.6
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **Harita**: Leaflet.js + OpenStreetMap
- **AI Analiz**: Custom empati analiz algoritması
- **Responsive**: Mobil-first tasarım

## Kurulum

### Gereksinimler

- Node.js 16+
- npm veya yarn
- Firebase hesabı

### Adımlar

1. **Repoyu klonlayın**

```bash
git clone https://github.com/atfskmn/Bartin_Arge_Yarismasi_Projesi.git
cd Bartin_Arge_Yarismasi_Projesi
```

2. **Bağımlılıkları yükleyin**

```bash
npm install
```

3. **Firebase yapılandırması**

`.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

Firebase Console'dan projenizin bilgilerini alıp `.env` dosyasına ekleyin:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Firestore kurallarını deploy edin**

```bash
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

5. **Development server'ı başlatın**

```bash
npm run dev
```

Uygulama http://localhost:9001 adresinde çalışacaktır.

## Firestore Veritabanı Yapısı

### Koleksiyonlar

- **users**: Kullanıcı profilleri
- **stories**: Paylaşılan hikayeler (konum, empati skoru, analiz)
- **analyses**: Detaylı empati analizleri
- **userActivities**: Kullanıcı aktivite geçmişi
- **userAchievements**: Kazanılan rozetler
- **userPresence**: Çevrimiçi/çevrimdışı durum (30s güncellemeler)
- **messages**: Kullanıcılar arası mesajlar

Detaylı veri yapısı için `DATABASE_STRUCTURE.md` dosyasına bakın.

## Önemli Özellikler

### 1. Empati Analizi

Hikayeler 5 kritere göre analiz edilir:

- Duygusal Derinlik (max 25)
- Empati İfadeleri (max 25)
- Hikaye Anlatımı (max 20)
- Kültürel Farkındalık (max 15)
- Kişisel Bağlantı (max 15)

Toplam skor (0-100) ve seviye (Gelişiyor, Orta, Yüksek, Çok Yüksek) belirlenir.

### 2. Rozet Sistemi

47 farklı rozet kategorisi:

- Hikaye sayısı rozetleri (5, 10, 25, 50, 100 hikaye)
- Empati skoru rozetleri (ortalama 60+, 70+, 80+, 90+)
- Özel rozetler (ilk hikaye, konum kullanımı, vb.)

### 3. Presence Sistemi

- Her 30 saniyede heartbeat güncelleme
- 1 dakika içinde aktif = çevrimiçi
- Otomatik çevrimdışı olma (tab kapatınca)

### 4. Mesajlaşma

- Gerçek zamanlı senkronizasyon
- Okundu bilgisi
- Client-side filtering (index gerekmez)

## Network Erişimi

Aynı ağdaki diğer cihazlardan erişim için:

1. IP adresinizi bulun:

```bash
ip addr show
# veya
ifconfig
```

2. Diğer cihazlardan şu formatta erişin:

```
http://YOUR_IP:9001
```

Örnek: `http://192.168.0.26:9001`

## Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Production Ortamı

1. `.env.production` dosyası oluşturun
2. Production Firebase credentials ekleyin
3. Build alın: `npm run build`
4. Deploy edin: `firebase deploy`

## Dokümantasyon

- `DATABASE_STRUCTURE.md` - Firestore veri yapısı
- `LOCATION_FEATURE.md` - Konum özelliği kullanımı
- `MAP_FEATURE.md` - İnteraktif harita özelliği
- `MESSAGING_SYSTEM.md` - Mesajlaşma sistemi
- `MESSAGING_FIX.md` - Mesajlaşma sorun giderme
- `USERS_PAGE.md` - Kullanıcılar sayfası
- `FIREBASE_SETUP.md` - Firebase kurulum detayları

## Güvenlik Notları

- **ASLA** `.env` dosyasını commit etmeyin
- Firebase API keys public olmakla birlikte, Firestore rules ile korunmalıdır
- Production'da environment variables kullanın
- Hassas verileri mesajlarda paylaşmayın (şifreleme yok)

## Quasar CLI Komutları

### Development

```bash
quasar dev
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

### Build

```bash
quasar build
```

### Customize

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Lisans

Bu proje Bartın Üniversitesi AR-GE Proje Pazarı 2025 kapsamında geliştirilmiştir.

## İletişim

Proje ile ilgili sorularınız için:

- E-posta: atfskmn14@gmail.com
- Adres: Bartın Üniversitesi

## Teşekkürler

Bu proje Bartın Üniversitesi AR-GE ekibi tarafından geliştirilmiştir.

---

Son Güncelleme: 18 Kasım 2025
