# 🗺️ Hikaye Haritası Özelliği

## 📍 Genel Bakış

Kullanıcıların paylaştığı hikayelerin dünya haritasında görselleştirildiği interaktif bir harita sayfası.

## ✨ Özellikler

- 🌍 **İnteraktif Harita**: OpenStreetMap tabanlı gerçek zamanlı harita
- 📍 **Konum İşaretleyiciler**: Her hikaye kendi konumunda marker ile gösterilir
- 📖 **Hikaye Önizleme**: Marker'a tıklayınca popup ile hikaye önizleme
- 🎯 **Empati Skoru**: Her marker'da hikayenin empati skoru gösterilir
- 💫 **Animasyonlu Marker'lar**: Dikkat çekici pulse animasyonu
- 🔄 **Gerçek Zamanlı**: Yeni hikaye eklenince otomatik güncellenir
- 📱 **Responsive**: Mobil ve desktop uyumlu

## 🎯 Nasıl Çalışır

### 1. Harita Sayfasına Giriş

- Ana menüden **"Harita"** butonuna tıklayın
- `/map` route'una yönlendirilirsiniz

### 2. Hikayeleri Görüntüleme

- Harita üzerinde **📖 kitap ikonu** olan marker'ları göreceksiniz
- Her marker bir hikayeyi temsil eder
- Marker üzerinde empati skoru badge'i vardır

### 3. Hikaye Detayları

**Popup Görünümü:**

- Marker'a tıklayın → Popup açılır
- Kullanıcı adı ve empati skoru
- Konum bilgisi
- Hikaye önizlemesi (ilk 80 karakter)
- "Detayları Gör" butonu

**Dialog Görünümü:**

- "Detayları Gör" butonuna tıklayın
- Tam hikaye metni
- Detaylı empati analizi
- Konum koordinatları
- Tarih ve saat bilgisi

## 🎨 Görsel Özellikler

### Marker Tasarımı

```
📖
[Skor Badge]
```

- **Renk**: Mor-mavi gradient (platform teması)
- **Animasyon**: Sürekli pulse efekti
- **Badge**: Kırmızı zemin üzerinde empati skoru
- **İkon**: 📖 Kitap emojisi

### Popup Tasarımı

```
┌─────────────────────────┐
│ Kullanıcı Adı    ⭐ 85  │
│ 📍 Bartın              │
│                         │
│ Hikaye önizlemesi...    │
│                         │
│   [Detayları Gör]       │
└─────────────────────────┘
```

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler

- **Leaflet.js**: Harita kütüphanesi
- **OpenStreetMap**: Harita tile'ları
- **Firestore**: Gerçek zamanlı veri
- **Vue 3**: Reactive framework
- **Quasar**: UI framework

### Firestore Query

```javascript
// Sadece konum bilgisi olan hikayeler
const q = query(collection(db, 'stories'), where('location', '!=', null))
```

### Marker Oluşturma

```javascript
const marker = L.marker([lat, lng], {
  icon: customIcon,
}).addTo(map)
```

## 📱 Responsive Tasarım

### Desktop

- Geniş harita görünümü
- Yan yana popup'lar
- Detaylı dialog'lar

### Mobil

- Tam ekran harita
- Optimized touch kontrolü
- Maximized dialog'lar

## 🎯 Kullanım Senaryoları

### Senaryo 1: Bölgesel Hikayeler

```
Kullanıcı Bartın bölgesinden paylaşılan
hikayeleri görmek istiyor
→ Haritada Bartın'a zoom yapar
→ Tüm Bartın hikayelerini görür
```

### Senaryo 2: Türkiye Geneli

```
Kullanıcı tüm Türkiye'deki hikayeleri
görmek istiyor
→ Harita otomatik tüm marker'ları
   kapsayacak şekilde ayarlanır
```

### Senaryo 3: Hikaye Keşfi

```
Kullanıcı haritada rastgele geziniyor
→ İlginç bir marker buluyor
→ Tıklayıp hikayeyi okuyor
→ Empati skoru yüksekse detayları görüyor
```

## 🔒 Güvenlik ve Gizlilik

### Görünürlük

- ✅ Sadece **konum bilgisi eklenmiş** hikayeler gösterilir
- ✅ Konum eklemeyen hikayelerin gizliliği korunur
- ⚠️ Konum ekleyen hikayelerin konumu **herkese açık**

### Veri Güvenliği

- Firestore kuralları ile korumalı
- Sadece gerekli veriler yüklenir
- Gerçek zamanlı listener'lar optimize edilmiş

## ⚡ Performans

### Optimizasyonlar

- Lazy loading (sayfa açıldığında yüklenir)
- Marker clustering (çok fazla marker varsa)
- Efficient Firestore queries
- Debounced map updates

### Yükleme Süresi

- İlk yükleme: ~1-2 saniye
- Marker ekleme: Gerçek zamanlı
- Harita render: Hızlı

## 🐛 Sorun Giderme

### Harita Görünmüyor

```
✓ Leaflet CSS yüklenmiş mi kontrol edin
✓ Internet bağlantısını kontrol edin
✓ Console'da hata var mı bakın
```

### Marker'lar Görünmüyor

```
✓ Hikayelerde konum bilgisi var mı?
✓ Firestore'a bağlantı var mı?
✓ Harita zoom seviyesi uygun mu?
```

### Popup Açılmıyor

```
✓ Marker'a doğru tıklanıyor mu?
✓ JavaScript hataları var mı?
✓ Window.openStoryFromMap fonksiyonu tanımlı mı?
```

## 🚀 Gelecek Geliştirmeler

### Planlanan Özellikler

1. **Filtreleme**
   - Empati skoruna göre filtre
   - Tarihe göre filtre
   - Kullanıcıya göre filtre

2. **Marker Clustering**
   - Çok fazla marker olunca gruplama
   - Zoom ile detaylandırma

3. **Isı Haritası**
   - Hangi bölgelerde daha çok hikaye var
   - Renkli gösterim

4. **Arama**
   - Konum bazlı arama
   - Şehir ismi ile arama
   - Hikaye içeriği arama

5. **İstatistikler**
   - Bölgesel istatistikler
   - En çok hikaye paylaşan şehirler
   - Ortalama empati skorları

## 📚 İlgili Dosyalar

- `/src/pages/MapPage.vue` - Ana harita sayfası
- `/src/router/routes.js` - Route tanımı
- `/src/layouts/MainLayout.vue` - Harita butonu
- `/DATABASE_STRUCTURE.md` - Konum veri yapısı
- `/LOCATION_FEATURE.md` - Konum ekleme özelliği

## 💡 İpuçları

1. **Konum Paylaşımı**: Kullanıcılara konum paylaşmanın isteğe bağlı olduğunu hatırlatın
2. **Harita Gezinme**: Mouse wheel ile zoom, drag ile hareket
3. **Mobil**: Touch gesture'lar destekleniyor
4. **Performans**: Çok fazla marker varsa harita yavaşlayabilir

## 🎓 Eğitim Amaçları

Bu özellik şunları öğretir:

- Coğrafi veri görselleştirme
- Interaktif harita kullanımı
- Empati ve konum ilişkisi
- Kültürel çeşitlilik farkındalığı

## 📊 Metrikler

Harita sayfası için takip edilebilecek metrikler:

- Sayfa ziyaret sayısı
- Marker tıklama oranı
- Hikaye detay görüntüleme
- Ortalama harita etkileşim süresi

---

**Not**: Bu özellik Leaflet kütüphanesi kullanır. İnternet bağlantısı gereklidir (OpenStreetMap tile'ları için).
