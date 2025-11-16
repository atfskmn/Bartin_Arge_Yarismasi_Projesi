# 👥 Kullanıcılar Sayfası

## 📋 Genel Bakış

Tüm platformdaki kullanıcıları görüntüleyebileceğiniz, online/offline durumlarını takip edebileceğiniz ve herkese mesaj atabileceğiniz özel bir sayfa.

## ✨ Özellikler

### 🎯 Ana Özellikler

- 👥 **Tüm Kullanıcılar**: Platform'daki tüm kayıtlı kullanıcılar listelenir
- 🟢 **Online Durum**: Aktif kullanıcılar yeşil renkte gösterilir
- 🔴 **Offline Durum**: Çevrimdışı kullanıcılar kırmızı renkte gösterilir
- 💬 **Herkese Mesaj**: Her kullanıcıya mesaj gönderebilirsiniz
- 🔍 **Arama**: İsim veya e-posta ile kullanıcı arayabilirsiniz
- 🎯 **Filtreleme**: Online, offline veya tümünü gösterebilirsiniz
- 📊 **İstatistikler**: Toplam, online, offline kullanıcı sayıları
- ⏰ **Son Görülme**: Çevrimdışı kullanıcıların son görülme zamanı

## 🎨 Görünüm

### Sayfa Başlığı

```
👥 Tüm Kullanıcılar
5 çevrimiçi • 12 çevrimdışı • 17 toplam
```

### Kullanıcı Kartı

```
┌────────────────────────────────────┐
│  🟢  Ahmet Yılmaz           💬     │
│      ahmet@example.com             │
│      🟢 Çevrimiçi • 2 dakika önce  │
└────────────────────────────────────┘
```

### Renkler

- 🟢 **Yeşil**: Çevrimiçi (son 5 dakikada aktif)
- 🔴 **Kırmızı**: Çevrimdışı (5 dakikadan fazla pasif)
- 🟡 **Sarı**: Okunmamış mesaj badge'i

## 🔧 Kullanım

### 1. Sayfaya Giriş

- Ana menüden **"Kullanıcılar"** butonuna tıklayın
- Empati butonunun hemen yanında
- `/users` route'una yönlendirilirsiniz

### 2. Kullanıcı Arama

```
🔍 [Kullanıcı ara...]
```

- İsim veya e-posta yazarak arayın
- Gerçek zamanlı filtreleme
- Büyük/küçük harf duyarsız

### 3. Durum Filtreleme

- **Tümü**: Tüm kullanıcıları göster
- **🟢 Çevrimiçi**: Sadece aktif kullanıcılar
- **🔴 Çevrimdışı**: Sadece pasif kullanıcılar

### 4. Mesaj Gönderme

1. Kullanıcının yanındaki **💬 chat** butonuna tıklayın
2. Chat dialog açılır
3. Mesajınızı yazıp gönderin
4. Gerçek zamanlı mesajlaşma

## 🎯 Özellik Detayları

### Online Tanımı

```javascript
const ONLINE_THRESHOLD = 5 * 60 * 1000 // 5 dakika
const isOnline = now - lastSeen < ONLINE_THRESHOLD
```

Kullanıcı son 5 dakika içinde aktifse **çevrimiçi** sayılır.

### Son Görülme Formatı

- "Az önce" → < 1 dakika
- "5 dakika önce" → < 1 saat
- "2 saat önce" → < 24 saat
- "Dün" → 1 gün önce
- "3 gün önce" → < 7 gün
- Tam tarih → > 7 gün

### Sıralama Algoritması

1. **Önce çevrimiçi kullanıcılar** (yeşil üstte)
2. **Sonra çevrimdışı kullanıcılar** (kırmızı altta)
3. **Her grup kendi içinde alfabetik** (Türkçe sıralama)

## 💾 Veri Kaynakları

### 1. users Koleksiyonu

```javascript
{
  uid: string,
  email: string,
  displayName: string,
  createdAt: Timestamp
}
```

### 2. userPresence Koleksiyonu

```javascript
{
  uid: string,
  isOnline: boolean,
  lastSeen: Timestamp,
  displayName: string,
  email: string
}
```

### Veri Birleştirme

- `users` koleksiyonundan temel bilgiler
- `userPresence` koleksiyonundan online durumu
- İki veri kaynağı birleştirilerek tam liste oluşturulur
- Gerçek zamanlı güncelleme (onSnapshot)

## 🔒 Güvenlik ve Gizlilik

### Görünürlük

- ✅ Sadece **giriş yapan kullanıcılar** görebilir
- ✅ Kendi bilgileriniz listede gösterilmez
- ✅ Temel kullanıcı bilgileri herkese açık
- ⚠️ Online durumu 5 dakika hassasiyetli

### Mesajlaşma

- ✅ Sadece kayıtlı kullanıcılar arası
- ✅ Kendine mesaj gönderilemez
- ✅ Mesajlar şifrelenmemiş (dikkatli olun)

## 📱 Responsive Tasarım

### Desktop

- Geniş kart görünümü
- Yan yana avatar ve bilgiler
- Detaylı istatistikler

### Mobil

- Dikey yığılmış layout
- Dokunmatik uyumlu
- Optimized liste görünümü

## 🚀 Performans

### Optimizasyonlar

- Lazy loading (sayfa açıldığında yüklenir)
- Gerçek zamanlı Firestore listeners
- Efficient query'ler
- Sanal kaydırma (çok kullanıcı varsa)

### Yükleme

- İlk yükleme: ~1-2 saniye
- Durum güncellemeleri: Gerçek zamanlı
- Arama/filtreleme: Anında

## 🎓 Kullanım Senaryoları

### Senaryo 1: Aktif Kullanıcı Bulma

```
Kullanıcı → Kullanıcılar sayfası
→ "🟢 Çevrimiçi" filtresi
→ 5 aktif kullanıcı görür
→ Birine mesaj atar
```

### Senaryo 2: Kullanıcı Arama

```
Kullanıcı → Arama kutusuna "ahmet" yazar
→ İçinde "ahmet" geçen tüm kullanıcılar listelenir
→ Doğru kişiyi bulup mesaj atar
```

### Senaryo 3: Genel İzleme

```
Kullanıcı → "Tümü" sekmesi
→ 17 toplam kullanıcı görür
→ Kimlerin aktif olduğunu kontrol eder
```

## 🐛 Sorun Giderme

### Kullanıcılar Görünmüyor

```
✓ Giriş yaptınız mı?
✓ Firestore bağlantısı var mı?
✓ users koleksiyonu dolu mu?
```

### Online Durumu Yanlış

```
✓ userPresence koleksiyonu var mı?
✓ Presence sistemi çalışıyor mu?
✓ 5 dakika eşik değeri doğru mu?
```

### Mesaj Gönderilmiyor

```
✓ Chat butonu aktif mi?
✓ Kullanıcı bilgileri tam mı?
✓ messages koleksiyonu var mı?
```

## 🔄 Güncellemeler

### Gerçek Zamanlı

- Yeni kullanıcı kaydolunca → Otomatik listede görünür
- Kullanıcı çevrimiçi olunca → Yeşil olur
- Kullanıcı çevrimdışı olunca → Kırmızı olur
- Yeni mesaj gelince → Badge güncellenir

## 🎯 Gelecek Özellikler

1. **Profil Kartları**
   - Kullanıcı detay sayfası
   - Paylaşılan hikayeler
   - Rozet koleksiyonu

2. **Grup Mesajları**
   - Birden fazla kişiye mesaj
   - Grup sohbetleri

3. **Arkadaşlık Sistemi**
   - Arkadaş ekleme/kaldırma
   - Arkadaş listesi

4. **Gelişmiş Filtreleme**
   - Konum bazlı
   - Rozet bazlı
   - Aktivite bazlı

5. **İstatistikler**
   - En aktif kullanıcılar
   - Mesajlaşma grafikleri
   - Kullanıcı aktivite geçmişi

## 📚 İlgili Dosyalar

- `/src/pages/UsersPage.vue` - Ana kullanıcılar sayfası
- `/src/components/ChatDialog.vue` - Mesajlaşma dialog'u
- `/src/router/routes.js` - Route tanımı
- `/src/layouts/MainLayout.vue` - Kullanıcılar butonu
- `/DATABASE_STRUCTURE.md` - Veri yapısı

## 💡 İpuçları

1. **Hızlı Arama**: Arama kutusu gerçek zamanlı çalışır
2. **Durum Takibi**: 5 dakikalık aktivite çevrimiçi sayılır
3. **Mesaj Bildirimleri**: Kırmızı badge okunmamış mesaj sayısı
4. **Filtreleme**: Chip'lere tıklayarak hızlıca filtreleyin
5. **Sıralama**: Yeşiller her zaman üstte

## 🎨 Tasarım Notları

### Renk Paleti

- **Yeşil** (#22c55e): Çevrimiçi durum
- **Kırmızı** (#ef4444): Çevrimdışı durum
- **Mavi** (#667eea): Primary butonlar
- **Gri** (#6b7280): İkincil metinler

### Animasyonlar

- Hover efekti: Hafif sağa kayma
- Status indicator: Pulse animasyonu
- Badge: Shimmer efekti

---

**Not**: Bu sayfa sadece giriş yapan kullanıcılar tarafından erişilebilir. Kendi profiliniz listede görünmez.
