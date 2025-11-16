# 🔥 Firebase Rules Deployment - ACIL

## ❌ Hata

```
FirebaseError: Missing or insufficient permissions.
```

## ✅ Çözüm: Manuel Deployment

### 1️⃣ Firebase Console'a Git

🔗 **Tıkla**: [Firebase Console - Firestore Rules](https://console.firebase.google.com/project/bartinarge-9f891/firestore/rules)

### 2️⃣ Rules Editor'ü Aç

- Sol menüden: **Firestore Database** → **Rules** sekmesi

### 3️⃣ Aşağıdaki Rules'u Kopyala ve Yapıştır

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update, delete: if request.auth != null && request.auth.uid == userId;
    }

    // Stories collection
    match /stories/{storyId} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    // Analyses collection
    match /analyses/{analysisId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    // User Activities collection
    match /userActivities/{activityId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    // ⭐ User Achievements collection - ROZETLER İÇİN GEREKLİ
    match /userAchievements/{userId} {
      allow read: if true; // Herkes okuyabilir
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4️⃣ Publish Et

- **Yayınla** (Publish) butonuna tıkla
- Onay ver

### 5️⃣ Test Et

1. Tarayıcıyı yenile: `Ctrl + Shift + R`
2. Hikaye paylaş
3. Console'da kontrol et:
   ```
   ✅ Loaded achievements: [...]
   ```

## 🎯 Bu Rules Ne Yapar?

### `userAchievements` Collection:

```javascript
allow read: if true; // ✅ Herkes rozetleri görebilir
allow create: if request.auth != null && request.auth.uid == userId;
allow update: if request.auth != null && request.auth.uid == userId;
```

**Açıklama**:

- ✅ **READ**: Herkes herkesin rozetlerini görebilir (profil görüntüleme için)
- ✅ **CREATE/UPDATE**: Sadece kendi rozetlerini oluşturabilir/güncelleyebilir
- ✅ **DELETE**: Sadece kendi rozetlerini silebilir

## 🆘 Hala Çalışmıyorsa

### Console'da Test Et:

```javascript
// Firebase bağlantı testi
console.log('User:', window.$user)
console.log('DB:', window.$firebase?.db)

// Manuel rozet ekleme testi
const { doc, setDoc, serverTimestamp } = window.$firebase
const userId = window.$user.uid

await setDoc(doc(window.$firebase.db, 'userAchievements', userId), {
  userId: userId,
  achievements: [{ id: 'first_story', unlockedAt: new Date() }],
  lastUpdated: serverTimestamp(),
})

console.log('✅ Test rozeti eklendi!')
```

## 📝 Deployment Durumu

- [ ] Rules Console'a kopyalandı
- [ ] Publish butonu tıklandı
- [ ] Tarayıcı yenilendi
- [ ] Hikaye paylaşıldı
- [ ] Console'da hata yok
- [ ] Rozet göründü

## ⚠️ Önemli Notlar

1. **Rules deploy edilmeden rozet sistemi çalışmaz**
2. **Deployment 10-30 saniye sürebilir**
3. **Tarayıcıyı hard refresh yapın**: `Ctrl + Shift + R`
4. **Console'da "permission-denied" hatası varsa rules henüz aktif değil**

---

## 🎉 Rules Deploy Edildikten Sonra

Artık şunlar çalışacak:

- ✅ Hikaye paylaşınca rozet kazanma
- ✅ Profile'de rozetleri görme
- ✅ Header'da rozet sayısı
- ✅ 17. hikayede özel kutlama

**Rules'u deploy et ve tüm rozetleri toplamaya başla!** 🏆
