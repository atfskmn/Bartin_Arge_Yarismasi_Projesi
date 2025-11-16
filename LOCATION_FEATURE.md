# Hikaye Konum Ekleme Özelliği

## 🗺️ Özellik Özeti

Kullanıcılar hikayelerini yazarken konumlarını ekleyebilir. Konum bilgisi hikaye ile birlikte kaydedilir ve diğer kullanıcılara gösterilir.

## ✨ Özellikler

- 📍 **GPS Konumu**: Tarayıcı üzerinden konum alınır
- 🏙️ **Şehir Adı**: OpenStreetMap API ile şehir/konum adı gösterilir
- 🗺️ **Koordinatlar**: Enlem ve boylam bilgisi saklanır
- ❌ **Kaldırma**: Kullanıcı konumu istediği zaman kaldırabilir
- 🔒 **Opsiyonel**: Konum eklemek zorunlu değil

## 🎯 Nasıl Kullanılır

### 1. Konum Ekleme

1. Hikaye yazarken **yeşil konum butonu**na tıklayın
2. Tarayıcı konum izni isteyecek - **İzin Ver**'e tıklayın
3. Konum otomatik olarak alınır ve şehir adı gösterilir
4. Konum bilgisi hikaye altında yeşil chip olarak görünür

### 2. Konum Kaldırma

- Konum chip'i üzerindeki **X** butonuna tıklayarak konumu kaldırabilirsiniz

### 3. Konum Görüntüleme

- **Topluluk Hikayeleri**'nde paylaşılan hikayelerin konum bilgisi gösterilir
- Hikaye kartlarında ve detay sayfasında konum ikonu ile görünür

## 🔧 Teknik Detaylar

### Konum Verisi Formatı

```javascript
{
  location: {
    lat: 41.6344,           // Enlem
    lng: 32.3388,           // Boylam
    name: "Bartın",         // Şehir adı
    fullAddress: "..."      // Tam adres
  }
}
```

### API Kullanımı

- **Geolocation API**: Tarayıcı GPS konumunu almak için
- **OpenStreetMap Nominatim API**: Koordinatları şehir adına çevirmek için

### Gizlilik ve Güvenlik

- ⚠️ **Hassas Bilgi**: Tam koordinatlar kaydedilir
- 🔒 **İzin Gerekli**: Konum için kullanıcı izni şart
- 📍 **Doğruluk**: GPS doğruluğu cihaza bağlıdır
- 🌐 **Herkese Açık**: Paylaşılan hikayelerdeki konum herkese görünür

## 📱 Uyumluluk

- ✅ Modern tarayıcılar (Chrome, Firefox, Safari, Edge)
- ✅ Mobil cihazlar (GPS desteği ile)
- ❌ Eski tarayıcılar konum özelliğini desteklemeyebilir

## 🎨 Görünüm

### Hikaye Yazma Ekranı

```
┌─────────────────────────────┐
│ Hikaye metni...             │
│                             │
│  🗺️  😊                    │ ← Konum ve emoji butonları
└─────────────────────────────┘
📍 Bartın                       ← Eklenen konum
```

### Hikaye Kartı

```
┌─────────────────────────────┐
│ 👤 Ahmet Yılmaz             │
│ 🕐 16.11.2025 14:30         │
│ 📍 Bartın                   │ ← Konum bilgisi
│                             │
│ Hikaye metni...             │
└─────────────────────────────┘
```

## 🚨 Hata Yönetimi

### Konum İzni Reddedildi

```
❌ Konum izni reddedildi.
   Lütfen tarayıcı ayarlarından izin verin.
```

### Konum Alınamadı

```
❌ Konum bilgisi mevcut değil
```

### Zaman Aşımı

```
❌ Konum alma zaman aşımına uğradı
```

## 💡 İpuçları

1. **Konum İzni**: İlk kullanımda tarayıcı izin isteyecektir
2. **GPS Doğruluğu**: Açık alanda daha doğru sonuç alınır
3. **Gizlilik**: Hassas konum paylaşmak istemiyorsanız konum eklemeyin
4. **Mobil**: Mobil cihazlarda daha hızlı ve doğru çalışır

## 🔄 Güncelleme Notları

- **v1.0**: İlk sürüm - GPS konum ekleme
- Gelecek: Harita görünümü, manuel konum seçimi

## 📚 İlgili Dosyalar

- `/src/pages/EmpathyPage.vue` - Ana hikaye sayfası
- `/src/components/StoryCard.vue` - Hikaye kartı bileşeni
- `/DATABASE_STRUCTURE.md` - Veritabanı yapısı

## 🎯 Örnek Kullanım Senaryoları

### Senaryo 1: Yerel Etkinlik

```
"Bartın'da düzenlenen kültür festivalinde..."
📍 Bartın
```

### Senaryo 2: Seyahat Hikayesi

```
"Kapadokya'da balon turunda..."
📍 Nevşehir
```

### Senaryo 3: Kampüs Deneyimi

```
"Üniversite kütüphanesinde..."
📍 Bartın
```

## 🔐 Güvenlik Notları

⚠️ **ÖNEMLİ**:

- Konum bilgisi herkese açık paylaşılır
- Ev adresiniz gibi hassas konumları paylaşmayın
- İstediğiniz zaman konumu kaldırabilirsiniz
- Konum eklemek tamamen isteğe bağlıdır
