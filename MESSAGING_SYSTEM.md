# Aktif Kullanıcılar ve Mesajlaşma Sistemi

## 🎯 Özellikler

- ✅ Aktif kullanıcıları gerçek zamanlı görüntüleme
- 🟢 Çevrimiçi/çevrimdışı durum göstergesi (yeşil = aktif)
- 💬 Kullanıcılar arası özel mesajlaşma
- 📱 Okunmamış mesaj bildirimleri
- 🔄 Gerçek zamanlı senkronizasyon
- 💾 Tüm mesajlar Firestore'da saklanır

## 📦 Eklenen Bileşenler

### 1. `ActiveUsers.vue`

Ana sayfada aktif kullanıcıları listeler:

- Yeşil nokta = Çevrimiçi (son 5 dakikada aktif)
- Gri nokta = Çevrimdışı
- Okunmamış mesaj sayısı gösterimi
- Kullanıcıya tıklayarak chat açma

### 2. `ChatDialog.vue`

İki kullanıcı arasında mesajlaşma:

- Gerçek zamanlı mesaj alışverişi
- Gönderilen/alınan mesajlar farklı görünüm
- Mesaj zamanı gösterimi
- Otomatik okundu işaretleme

### 3. `src/utils/presence.js`

Kullanıcı presence yönetimi:

- Otomatik çevrimiçi durumu güncelleme
- Sayfa kapatıldığında çevrimdışı yapma
- Her 2 dakikada bir heartbeat

## 🗄️ Firestore Koleksiyonları

### `userPresence` Koleksiyonu

```javascript
{
  uid: "user123",
  displayName: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  isOnline: true,
  lastSeen: Timestamp
}
```

### `messages` Koleksiyonu

```javascript
{
  fromUid: "user123",
  fromName: "Ahmet Yılmaz",
  toUid: "user456",
  toName: "Ayşe Demir",
  text: "Merhaba!",
  read: false,
  createdAt: Timestamp
}
```

## 🔐 Güvenlik Kuralları

`firestore.rules` dosyasına şu kurallar eklendi:

```javascript
// User Presence - Giriş yapan herkes görebilir
match /userPresence/{userId} {
  allow read: if request.auth != null;
  allow write: if request.auth != null && request.auth.uid == userId;
}

// Messages - Sadece gönderen ve alıcı erişebilir
match /messages/{messageId} {
  allow read: if request.auth != null &&
              (request.auth.uid == resource.data.fromUid ||
               request.auth.uid == resource.data.toUid);
  allow create: if request.auth != null;
  allow update: if request.auth != null && request.auth.uid == resource.data.toUid;
}
```

## 🚀 Kullanım

1. **Giriş Yapın**: Kullanıcı giriş yaptığında otomatik olarak "çevrimiçi" duruma geçer
2. **Aktif Kullanıcılar**: Ana sayfada sağ tarafta aktif kullanıcılar listesi görünür
3. **Mesajlaşma**: Bir kullanıcıya tıklayarak chat penceresi açılır
4. **Mesaj Gönder**: Mesaj yazıp Enter veya gönder butonuna tıklayın
5. **Gerçek Zamanlı**: Mesajlar anında karşı tarafa iletilir

## 📋 Firebase Kurulumu

Firestore güvenlik kurallarını deploy etmek için:

```bash
# Firebase CLI kurulu değilse
npm install -g firebase-tools

# Firebase'e giriş yapın
firebase login

# Projenizi başlatın
firebase init firestore

# Kuralları deploy edin
firebase deploy --only firestore:rules
```

## 🎨 Görsel Özellikler

- **Yeşil Badge**: Çevrimiçi kullanıcılar
- **Gri Badge**: Çevrimdışı kullanıcılar
- **Kırmızı Badge**: Okunmamış mesaj sayısı
- **Gradient Mesaj Balonları**: Gönderilen mesajlar
- **Beyaz Mesaj Balonları**: Alınan mesajlar

## 🔧 Teknik Detaylar

- **Presence Heartbeat**: Her 2 dakikada bir
- **Online Threshold**: 5 dakika içinde aktif = çevrimiçi
- **Real-time Updates**: Firestore onSnapshot listeners
- **Auto Scroll**: Yeni mesajlarda otomatik kaydırma
- **Read Receipts**: Otomatik okundu işaretleme

## 📝 Notlar

- Kullanıcı çıkış yaptığında veya tarayıcıyı kapatığında otomatik "çevrimdışı" olur
- Mesajlar Firestore'da kalıcı olarak saklanır
- Hassas bilgi paylaşımı önerilmez (mesajlar şifrelenmemiştir)
- Network koptuğunda otomatik yeniden bağlanma

## 🐛 Sorun Giderme

**Aktif kullanıcılar görünmüyor:**

- Firestore kurallarının deploy edildiğinden emin olun
- Firebase Console'da `userPresence` koleksiyonunu kontrol edin

**Mesajlar gönderilmiyor:**

- Firebase Console'da `messages` koleksiyonunu kontrol edin
- Tarayıcı konsolunda hata mesajlarını kontrol edin
- Network bağlantısını kontrol edin

**Yeşil nokta görünmüyor:**

- Son 5 dakika içinde aktivite olmalı
- Kullanıcı giriş yapmış olmalı
- `presence.js` doğru çalışıyor mu kontrol edin
