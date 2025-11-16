# Firebase Yapılandırma ve Güvenlik Kuralları

## Adım 1: Firebase Console'da Authentication'ı Etkinleştirin

1. Firebase Console'a gidin: https://console.firebase.google.com/
2. Projenizi seçin: `bartinarge-9f891`
3. Sol menüden **Authentication** → **Sign-in method** seçin
4. **Email/Password** metodunu etkinleştirin (Enable)

## Adım 2: Firestore Güvenlik Kurallarını Uygulayın

### Otomatik Uygulama (Firebase CLI ile):

```bash
# Firebase CLI'yi yükleyin (eğer yoksa)
npm install -g firebase-tools

# Firebase'e giriş yapın
firebase login

# Projeyi başlatın
cd /var/www/html/frontend/quasar-project
firebase init firestore

# Kuralları uygulayın
firebase deploy --only firestore:rules
```

### Manuel Uygulama (Firebase Console ile):

1. Firebase Console'da **Firestore Database** seçin
2. **Rules** sekmesine tıklayın
3. Aşağıdaki kuralları yapıştırın:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection - Kullanıcı profilleri
    match /users/{userId} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update, delete: if request.auth != null && request.auth.uid == userId;
    }

    // Stories collection - Paylaşılan hikayeler
    match /stories/{storyId} {
      allow read: if true;
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid;
      allow update, delete: if request.auth != null
                           && resource.data.uid == request.auth.uid;
    }

    // Analyses collection - Empati analizleri (paylaşılmamış dahil)
    match /analyses/{analysisId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.uid;
    }

    // User Activities collection - Kullanıcı aktiviteleri (giriş, kayıt, analiz, paylaşım)
    match /userActivities/{activityId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && request.auth.uid == resource.data.uid;
    }
  }
}
```

4. **Publish** butonuna tıklayın

⚠️ **ÖNEMLİ**: `users` koleksiyonu kuralı güncellenmiştir - `allow write` yerine `allow create, update, delete` kullanılıyor.## Adım 3: Dev Sunucusunu Yeniden Başlatın

```bash
cd /var/www/html/frontend/quasar-project
npm run dev
```

## Kontrol Listesi

- [x] Quasar Notify plugin eklendi
- [ ] Firebase Authentication Email/Password etkinleştirildi
- [ ] Firestore güvenlik kuralları uygulandı
- [ ] Dev sunucusu yeniden başlatıldı

## Hata Çözümleri

### Error: auth/configuration-not-found

**Çözüm**: Firebase Console'da Authentication → Sign-in method → Email/Password'ü etkinleştirin

### Error: permission-denied

**Çözüm**: Yukarıdaki Firestore kurallarını uygulayın

### $q.notify is not a function

**Çözüm**: ✅ Düzeltildi (quasar.config.js'de plugins eklendi)

## Test Adımları

1. http://localhost:9000\*/ adresine gidin
2. "Giriş / Kayıt" butonuna tıklayın
3. Yeni bir hesap oluşturun (displayName, email, password)
4. Kayıt başarılı olursa yeşil bildirim göreceksiniz
5. Empati sayfasına gidin ve hikaye paylaşın
6. Topluluk hikayeleri gerçek zamanlı güncellenecek

## Notlar

- Firebase kuralları güvenlik için önemlidir
- Test sırasında geçici olarak `allow read, write: if true;` kullanabilirsiniz (sadece test için!)
- Production'da mutlaka yukarıdaki güvenli kuralları kullanın
