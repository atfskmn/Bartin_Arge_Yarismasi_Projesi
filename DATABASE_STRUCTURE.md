# Veritabanı Yapısı (Firestore Collections)

## Koleksiyonlar ve Veri Modelleri

### 1. `users` - Kullanıcı Profilleri

Kullanıcıların temel bilgileri kaydedilir.

**Document ID**: `{userId}` (Firebase Auth UID)

**Fields**:

```javascript
{
  uid: string,              // Firebase Auth UID
  email: string,            // E-posta adresi
  displayName: string,      // Kullanıcı adı
  createdAt: string         // ISO 8601 tarih
}
```

**Güvenlik Kuralları**:

- ✅ Herkes okuyabilir (profil görüntüleme için)
- ✅ Sadece kendi profilini güncelleyebilir

**Kayıt Anı**: Kullanıcı kayıt olduğunda (`LoginPage.vue` → `register()`)

---

### 2. `stories` - Paylaşılan Hikayeler

Kullanıcıların toplulukla paylaştığı empati hikayeleri.

**Document ID**: Auto-generated

**Fields**:

```javascript
{
  uid: string,                    // Hikaye sahibinin UID'si
  username: string,               // Hikaye sahibinin adı
  story: string,                  // Hikaye metni
  score: number,                  // Toplam empati skoru (0-100)
  level: string,                  // Empati seviyesi ("Gelişiyor", "Orta", "Yüksek", "Çok Yüksek")
  criteria: {
    emotionalDepth: number,       // Duygusal derinlik (0-25)
    empathyExpressions: number,   // Empati ifadeleri (0-25)
    storytellingQuality: number,  // Hikaye kalitesi (0-20)
    culturalAwareness: number,    // Kültürel farkındalık (0-15)
    personalConnection: number    // Kişisel bağlantı (0-15)
  },
  location: {                     // OPSİYONEL: Konum bilgisi
    lat: number,                  // Enlem
    lng: number,                  // Boylam
    name: string,                 // Şehir/konum adı
    fullAddress: string           // Tam adres
  },
  createdAt: Timestamp            // Firebase serverTimestamp()
}
```

**Güvenlik Kuralları**:

- ✅ Herkes okuyabilir (topluluk hikayeleri herkese açık)
- ✅ Giriş yapan kullanıcılar oluşturabilir
- ✅ Sadece kendi hikayesini güncelleyebilir/silebilir

**Kayıt Anı**: Kullanıcı "Hikayemi Toplulukla Paylaş" butonuna tıkladığında (`EmpathyPage.vue` → `shareStory()`)

**Görüntüleme**: `EmpathyPage.vue` → "Topluluk Hikayeleri" sekmesi (`StoryCard.vue` komponenti ile)

---

### 3. `analyses` - Empati Analizleri

Kullanıcıların yaptığı **tüm** empati analizleri (paylaşılsın veya paylaşılmasın).

**Document ID**: Auto-generated

**Fields**:

```javascript
{
  uid: string,                    // Analizi yapan kullanıcının UID'si
  username: string,               // Kullanıcı adı
  storyText: string,              // Analiz edilen hikaye metni
  totalScore: number,             // Toplam empati skoru (0-100)
  level: string,                  // Empati seviyesi
  criteria: {
    emotionalDepth: number,       // 0-25
    empathyExpressions: number,   // 0-25
    storytellingQuality: number,  // 0-20
    culturalAwareness: number,    // 0-15
    personalConnection: number    // 0-15
  },
  shared: boolean,                // Hikaye topluluğa paylaşıldı mı?
  createdAt: Timestamp            // Firebase serverTimestamp()
}
```

**Güvenlik Kuralları**:

- ✅ Sadece kendi analizlerini okuyabilir (özel veri)
- ✅ Giriş yapan kullanıcılar oluşturabilir
- ✅ Sadece kendi analizini güncelleyebilir/silebilir

**Kayıt Anı**: Kullanıcı "Empati Skorunu Hesapla" butonuna tıkladığında (`EmpathyPage.vue` → `saveAnalysisToDatabase()`)

**Kullanım Amacı**:

- Kullanıcının geçmiş analizlerini gösterme
- İstatistikler (ortalama skor, gelişim grafiği vb.)
- Araştırma ve analitik veriler

---

### 4. `userActivities` - Kullanıcı Aktiviteleri

Kullanıcıların platformdaki tüm hareketleri.

**Document ID**: Auto-generated

**Fields**:

```javascript
{
  uid: string,              // Kullanıcı UID'si
  username: string,         // Kullanıcı adı
  activityType: string,     // "register", "login", "analysis", "share"
  score: number,            // (Opsiyonel) Empati skoru (sadece analysis ve share için)
  timestamp: Timestamp      // Firebase serverTimestamp()
}
```

**Aktivite Türleri**:

- `register`: Yeni kullanıcı kaydı
- `login`: Giriş yapma
- `analysis`: Empati analizi yapma
- `share`: Hikaye paylaşma

**Güvenlik Kuralları**:

- ✅ Sadece kendi aktivitelerini okuyabilir
- ✅ Giriş yapan kullanıcılar oluşturabilir
- ✅ Sadece kendi aktivitesini silebilir

**Kayıt Anları**:

1. `register`: `LoginPage.vue` → `register()`
2. `login`: `LoginPage.vue` → `login()`
3. `analysis`: `EmpathyPage.vue` → `saveAnalysisToDatabase()`
4. `share`: `EmpathyPage.vue` → `shareStory()`

**Kullanım Amacı**:

- Kullanıcı aktivite geçmişi
- Son aktiviteler listesi
- Aktif kullanıcı istatistikleri
- Platform kullanım analitiği

---

## Veri Akışı Örnekleri

### Örnek 1: Yeni Kullanıcı Kaydı

1. Kullanıcı kayıt formunu doldurur
2. `users` koleksiyonuna profil kaydedilir
3. `userActivities` koleksiyonuna "register" aktivitesi kaydedilir

### Örnek 2: Hikaye Analizi ve Paylaşımı

1. Kullanıcı hikayesini yazar ve "Empati Skorunu Hesapla" butonuna tıklar
2. `analyses` koleksiyonuna analiz kaydedilir (shared: false)
3. `userActivities` koleksiyonuna "analysis" aktivitesi kaydedilir
4. Kullanıcı "Hikayemi Toplulukla Paylaş" butonuna tıklar
5. `stories` koleksiyonuna hikaye eklenir
6. `userActivities` koleksiyonuna "share" aktivitesi kaydedilir

### Örnek 3: Giriş Yapma

1. Kullanıcı e-posta/parola ile giriş yapar
2. `userActivities` koleksiyonuna "login" aktivitesi kaydedilir

---

## Veri Sorgulama Örnekleri

### Bir kullanıcının tüm analizlerini getirme:

```javascript
const q = query(
  collection(db, 'analyses'),
  where('uid', '==', currentUser.uid),
  orderBy('createdAt', 'desc'),
)
```

### Topluluk hikayelerini getirme:

```javascript
const q = query(collection(db, 'stories'), orderBy('createdAt', 'desc'))
```

### Bir kullanıcının aktivitelerini getirme:

```javascript
const q = query(
  collection(db, 'userActivities'),
  where('uid', '==', currentUser.uid),
  orderBy('timestamp', 'desc'),
  limit(20),
)
```

---

## Firebase Console'da Kontrol

1. https://console.firebase.google.com/ → Projeniz
2. **Firestore Database** sekmesi
3. Sol tarafta koleksiyonları göreceksiniz:
   - `users` - Kullanıcı profilleri
   - `stories` - Paylaşılan hikayeler
   - `analyses` - Empati analizleri
   - `userActivities` - Kullanıcı hareketleri
   - `userPresence` - Kullanıcı çevrimiçi durumu
   - `messages` - Kullanıcılar arası mesajlar

---

## Yeni Eklenen Koleksiyonlar

### 6. `userPresence` - Kullanıcı Çevrimiçi Durumu

Kullanıcıların çevrimiçi/çevrimdışı durumunu takip eder.

**Document ID**: `{userId}` (Firebase Auth UID)

**Fields**:

```javascript
{
  uid: string,              // Kullanıcı UID
  displayName: string,      // Kullanıcı adı
  email: string,            // E-posta
  isOnline: boolean,        // Çevrimiçi mi?
  lastSeen: Timestamp       // Son görülme zamanı
}
```

**Güvenlik Kuralları**:

- ✅ Giriş yapan kullanıcılar okuyabilir
- ✅ Sadece kendi durumunu güncelleyebilir

**Kullanım**: Kullanıcı giriş yaptığında otomatik güncellenir, her 2 dakikada bir yenilenir

---

### 7. `messages` - Kullanıcılar Arası Mesajlar

Kullanıcılar arasındaki özel mesajları saklar.

**Document ID**: Auto-generated

**Fields**:

```javascript
{
  fromUid: string,          // Gönderen kullanıcı UID
  fromName: string,         // Gönderen kullanıcı adı
  toUid: string,            // Alıcı kullanıcı UID
  toName: string,           // Alıcı kullanıcı adı
  text: string,             // Mesaj metni
  read: boolean,            // Okundu mu?
  createdAt: Timestamp      // Gönderilme zamanı
}
```

**Güvenlik Kuralları**:

- ✅ Mesajı gönderen veya alan okuyabilir
- ✅ Giriş yapan kullanıcılar mesaj gönderebilir
- ✅ Alıcı mesajı güncelleyebilir (okundu işareti için)
- ✅ Gönderen veya alan mesajı silebilir

**Kullanım**: ChatDialog bileşeni ile gerçek zamanlı mesajlaşma

---

## Önemli Notlar

⚠️ **Gizlilik**: `analyses` koleksiyonu sadece kullanıcının kendisine görünür (özel veri)

✅ **Paylaşım**: `stories` koleksiyonu herkese açık (topluluk içeriği)

📊 **Analitik**: `userActivities` koleksiyonu platform istatistikleri için kullanılabilir

🔒 **Güvenlik**: Tüm koleksiyonlar Firebase güvenlik kuralları ile korunur

💬 **Mesajlaşma**: `messages` koleksiyonu şifreli değil, hassas bilgi paylaşımı önerilmez

🟢 **Aktif Kullanıcılar**: 5 dakika içinde aktivite gösterenler çevrimiçi sayılır
