# 🐛 Rozet Sistemi Debug Rehberi

## 1️⃣ Console Kontrolü (EN ÖNEMLİ)

### Adımlar:

1. **F12** tuşuna bas veya sağ tık → **İncele**
2. **Console** sekmesine git
3. Sayfayı yenile: `Ctrl + Shift + R`
4. Bir hikaye paylaş
5. Console'da şu logları ara:

```javascript
🎯 Achievement kontrolü başlıyor için userId: xxx
📚 Bulunan hikaye sayısı: X
📖 Hikayeler: [{...}]
📊 Hesaplanan istatistikler: {...}
🏆 Mevcut rozetler: []
🎖️ Yeni kazanılan rozetler: [...]
✅ YENİ ROZET KAZANILDI! Sayı: X
```

### Olası Hatalar ve Çözümleri:

#### ❌ Hata 1: "Firebase bağlantısı yok!"

**Sorun**: Firebase başlatılmamış
**Çözüm**:

```bash
# Boot dosyasını kontrol et
cat src/boot/firebase.js
```

#### ❌ Hata 2: "📚 Bulunan hikaye sayısı: 0"

**Sorun**: Hikayeler `userId` ile kaydedilmemiş
**Kontrol**:

- Console'da hikaye paylaştıktan sonra:

```javascript
// Firebase Console aç → Firestore Database → stories collection
// Son hikayeyi aç → "userId" field'ı var mı?
```

**Düzeltme**: Hikaye paylaş ve console'da şunu kontrol et:

```javascript
console.log('Story payload:', payload)
// userId: "xxx" olmalı
```

#### ❌ Hata 3: "Permission denied"

**Sorun**: Firestore rules deploy edilmemiş
**Çözüm**:

```bash
cd /var/www/html/frontend/quasar-project
firebase deploy --only firestore:rules
```

---

## 2️⃣ Manuel Test

### Console'da çalıştır:

```javascript
// 1. Firebase bağlantı testi
console.log('Firebase:', window.$firebase)
console.log('DB:', window.$firebase?.db)
console.log('User:', window.$user)

// 2. Hikaye sayısı kontrolü
const { collection, query, where, getDocs } = window.$firebase
const userId = window.$user.uid
const q = query(collection(window.$firebase.db, 'stories'), where('userId', '==', userId))
getDocs(q).then((snap) => {
  console.log('Toplam hikaye:', snap.size)
  snap.forEach((doc) => console.log('Hikaye:', doc.data()))
})

// 3. Achievement kontrol testi
import { calculateUserStats } from '../utils/achievements'
const testStats = calculateUserStats(
  [{ wordCount: 50, level: 'Yüksek', criteria: { emotionalDepth: 20 } }],
  null,
)
console.log('Test istatistikler:', testStats)
```

---

## 3️⃣ Firebase Console Kontrolü

### Adımlar:

1. [Firebase Console](https://console.firebase.google.com/project/bartinarge-9f891/firestore/data) aç
2. **Firestore Database** → **Data** sekmesi
3. Kontrol et:

#### `stories` collection:

```json
{
  "userId": "abc123",  // ✅ OLMALI
  "story": "...",
  "score": 75,
  "level": "Yüksek",
  "criteria": {
    "emotionalDepth": 20,
    "empathyExpressions": 18,
    ...
  },
  "wordCount": 150,
  "timestamp": ...
}
```

**Eksik olan field**: `userId`
**Sorun**: Hikayeler `uid` ile kaydediliyor olabilir

#### `userAchievements` collection:

```json
{
  "userId": "abc123",
  "achievements": [
    { "id": "first_story", "unlockedAt": "..." }
  ],
  "lastUpdated": ...
}
```

**Yoksa**: Henüz hiç rozet kazanılmamış demektir

---

## 4️⃣ Hızlı Fix: Zorla Rozet Ekle

### Console'da çalıştır (TEST için):

```javascript
// Kullanıcıya zorla 1. rozeti ekle
const { doc, setDoc, serverTimestamp } = window.$firebase
const userId = window.$user.uid

await setDoc(doc(window.$firebase.db, 'userAchievements', userId), {
  userId: userId,
  achievements: [{ id: 'first_story', unlockedAt: new Date() }],
  lastUpdated: serverTimestamp(),
})

console.log('✅ İlk rozet manuel eklendi!')
// Şimdi profile git ve kontrol et
```

---

## 5️⃣ Kod İncelemesi

### EmpathyPage.vue - shareStory() fonksiyonu:

```javascript
// Line ~865
const payload = {
  username: authUser?.displayName || authUser?.email || 'anon',
  uid: authUser?.uid || null,
  userId: authUser?.uid || null, // ✅ Bu satır OLMALI
  story: userStory.value,
  wordCount: wordCount.value,    // ✅ Bu satır OLMALI
  score: empathyScore.value.total,
  criteria: empathyScore.value.criteria,  // ✅ Bu satır OLMALI
  level: empathyScore.value.level,        // ✅ Bu satır OLMALI
  ...
}
```

### Eksik field kontrolü:

```bash
# EmpathyPage.vue dosyasında ara:
grep -n "userId:" src/pages/EmpathyPage.vue
grep -n "wordCount:" src/pages/EmpathyPage.vue
```

---

## 6️⃣ Adım Adım Test

### Test Senaryosu:

1. **Tarayıcıyı Yenile**: `Ctrl + Shift + R`
2. **Console Aç**: `F12`
3. **Empathy Sayfası** → **Hikaye Deneyimi** tab
4. **Bir hikaye yaz** (50+ kelime):
   ```
   Bugün çok mutluyum. Ailemle birlikte güzel vakit geçirdim.
   İnsanlar birbirine yardım etmeli. Toplumumuzda empati önemli.
   Ben her zaman arkadaşlarımı anlamaya çalışırım.
   ```
5. **Analiz Et** butonuna tıkla
6. **Console'da kontrol**:
   ```
   Skor: 60-70 arası olmalı ✅
   ```
7. **Hikayemi Toplulukla Paylaş** butonuna tıkla
8. **Console'da takip et**:
   ```
   🎯 Achievement kontrolü başlıyor için userId: xxx
   📚 Bulunan hikaye sayısı: 1
   📊 Hesaplanan istatistikler: {totalStories: 1, ...}
   ✅ YENİ ROZET KAZANILDI! Sayı: 1
   ```
9. **Confetti patlaması** görünmeli 🎊
10. **Rozet popup'ı** açılmalı: "🌱 İlk Adım"
11. **Header'da** "1 Rozet - Tıkla!" yazmalı
12. **Profile git** → "📚 Hikayelerim ve Rozetlerim"
13. **1 rozet kartı** görünmeli

---

## 7️⃣ Sorun Çözüldü mü?

### ✅ ÇÖZÜLDÜ:

- Console'da "✅ YENİ ROZET KAZANILDI!" gördüm
- Rozet popup'ı açıldı
- Header'da rozet sayısı göründü
- Profile'de rozet kartı var

### ❌ HALA SORUN VAR:

#### Senaryo A: Console'da "📚 Bulunan hikaye sayısı: 0"

**Sorun**: Hikayeler userId ile kaydedilmiyor
**Çözüm**: EmpathyPage.vue → shareStory() → payload'da `userId` field'ı ekle

#### Senaryo B: Console'da hata yok ama rozet gelmiyor

**Sorun**: Achievement popup component çalışmıyor
**Çözüm**:

```javascript
// Console'da test et:
console.log('showAchievement:', showAchievement.value)
console.log('currentAchievement:', currentAchievement.value)
```

#### Senaryo C: "Permission denied" hatası

**Sorun**: Firestore rules deploy edilmemiş
**Çözüm**:

```bash
firebase deploy --only firestore:rules
```

---

## 8️⃣ Son Çare: Tüm Sistemi Reset

### Veritabanını temizle ve yeniden başla:

```javascript
// Console'da çalıştır
const userId = window.$user.uid

// 1. Eski rozetleri sil
await deleteDoc(doc(window.$firebase.db, 'userAchievements', userId))

// 2. Yeni hikaye paylaş
// 3. Console loglarını takip et
// 4. İlk rozet gelecek
```

---

## 🆘 Hala Çözülmediyse

Console loglarını buraya yapıştır:

1. `🎯 Achievement kontrolü başlıyor` ile başlayan tüm satırlar
2. Herhangi bir hata mesajı
3. Firebase Console'da `stories` collection'ından bir hikaye örneği
4. Firebase Console'da `userAchievements` collection durumu

Bu bilgilerle tam sorun tespit edebiliriz! 🔍
