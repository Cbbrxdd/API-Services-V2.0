# 🚀 API Services v2.0

**Discord entegrasyonlu, kullanıcı yetkilendirmeli RESTful API servisi.**

> Geliştirici: **CbbrDigital**

---

## 📋 İçindekiler

- [Hakkında](#-hakkında)
- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
- [Yapılandırma](#-yapılandırma)
- [API Kullanımı](#-api-kullanımı)
- [Veritabanı](#-veritabanı)
- [Güvenlik](#-güvenlik)
- [Lisans](#-lisans)

---

## 📖 Hakkında

**API Services v2.0**, Express.js tabanlı bir API sunucusu ile Discord.js bot entegrasyonunu bir arada sunan kapsamlı bir backend servisidir. Müşteri bazlı yetkilendirme (Auth) sistemi, günlük kullanım limitleri, IP doğrulama ve otomatik veritabanı yedekleme gibi gelişmiş özelliklere sahiptir.

Sistem, her müşteriye özel Auth kodları ile çalışır; her API isteğinde kullanıcı doğrulaması, izin kontrolü ve limit takibi otomatik olarak gerçekleştirilir.

---

## ✨ Özellikler

| Özellik | Açıklama |
|---------|----------|
| 🔐 **Yetkilendirme Sistemi** | Auth kodu bazlı müşteri doğrulama |
| 📊 **Limit Yönetimi** | API başına günlük kullanım limiti (gece yarısı sıfırlanır) |
| 🌐 **IP Kontrolü** | İsteklerin kayıtlı IP adresi ile eşleşme doğrulaması |
| 💾 **Otomatik Yedekleme** | Her gece 00:00'da MongoDB verilerinin JSON olarak yedeklenmesi |
| 🤖 **Discord Entegrasyonu** | Discord.js v14 ile bot log sistemi |
| 🛡️ **Cloudflare Güvenliği** | Özel header kuralları ile ek güvenlik katmanı |
| 🆔 **TCKN Doğrulama** | TC Kimlik Numarası algoritması ile doğrulama fonksiyonu |
| 🎨 **Karşılama Sayfası** | Şık ve animasyonlu HTML landing sayfası |
| ⏱️ **Performans Takibi** | Her API isteğinde gecikme süresi ölçümü |
| 👑 **Rol Tabanlı Erişim** | Kurucu ve Yönetici rolleri için sınırsız erişim |

---

## 🛠️ Teknolojiler

| Teknoloji | Kullanım Alanı |
|-----------|----------------|
| **Node.js** | Çalışma ortamı |
| **Express.js** | HTTP sunucusu ve API yönlendirme |
| **Discord.js v14** | Discord bot entegrasyonu |
| **MongoDB (Mongoose)** | Müşteri veritabanı ve sorgu yönetimi |
| **MySQL** | Harici veri kaynakları |
| **Puppeteer** | Web scraping ve otomasyon |
| **Sharp** | Görsel işleme |
| **@napi-rs/canvas** | Canvas tabanlı görsel oluşturma |
| **Cheerio** | HTML parsing |
| **Axios / node-fetch** | HTTP istekleri |
| **Cron** | Zamanlı görevler (günlük sıfırlama & yedekleme) |
| **Moment.js** | Tarih/saat işlemleri (Türkiye lokalizasyonu) |
| **iconv-lite** | Karakter kodlama dönüşümü |
| **node-capmonster** | Captcha çözme servisi entegrasyonu |

---

## 📁 Proje Yapısı

```
API Services v2.0/
│
├── index.js                  # Ana giriş dosyası
├── package.json              # Bağımlılıklar ve proje bilgisi
├── start.bat                 # Windows başlatma scripti
│
└── Core/                     # Çekirdek modüller
    │
    ├── API.js                # Express sunucu yapılandırması ve yönlendirme
    │
    ├── API/                  # API endpoint modülleri
    │   ├── admin/            # Yönetici API'leri
    │   └── test/             # Test API'leri
    │       └── test.js       # Örnek test endpoint'i
    │
    ├── Databases/            # Veritabanı katmanı
    │   ├── connect.js        # MongoDB bağlantısı
    │   ├── Schemas/          # Mongoose şemaları
    │   │   └── customerSchema.js  # Müşteri veri modeli
    │   └── Backup/           # Otomatik JSON yedekleri
    │
    ├── Events/               # Discord bot olayları
    │   └── ready.js          # Bot hazır olayı & cron görevleri
    │
    ├── Functions/            # Yardımcı fonksiyonlar
    │   └── funtions.js       # getData, tcknKontrol, limitKontrol
    │
    ├── Settings/             # Yapılandırma dosyaları
    │   ├── Public/           # Genel ayarlar
    │   │   ├── mconfig.js    # MySQL veritabanı bağlantıları
    │   │   ├── rconfig.js    # Rol ve yetki ayarları
    │   │   └── sconfig.js    # Sunucu portu ve Discord ID'leri
    │   └── Secret/           # Gizli ayarlar (⚠️ .gitignore'a eklenmeli)
    │       └── config.js     # Token, MongoDB URI, şifreler
    │
    └── Views/                # Frontend
        └── index.html        # Karşılama sayfası
```

---

## ⚙️ Kurulum

### Gereksinimler

- **Node.js** v16.9.0 veya üstü
- **MongoDB** (yerel veya bulut — örn. MongoDB Atlas)
- **MySQL** (veri kaynakları için)
- **Discord Bot Token** ([Discord Developer Portal](https://discord.com/developers/applications))

### Adımlar

1. **Projeyi klonlayın:**
   ```bash
   git clone <repo-url>
   cd "API Services v2.0"
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Gizli yapılandırmayı düzenleyin** (bkz. [Yapılandırma](#-yapılandırma))

4. **Projeyi başlatın:**
   ```bash
   # Windows üzerinde
   start.bat

   # veya doğrudan Node.js ile
   node --no-deprecation --max-old-space-size=2048 index.js
   ```

> **📝 Not:** `start.bat` dosyası, `node_modules` klasörü yoksa otomatik olarak `npm install` komutunu çalıştırır ve uygulama çökerse otomatik yeniden başlatma yapar.

---

## 🔧 Yapılandırma

### Gizli Ayarlar (`Core/Settings/Secret/config.js`)

> ⚠️ **Bu dosya hassas bilgiler içerir. Asla versiyon kontrolüne (git) eklenmemelidir!**

```javascript
module.exports = {
    token: "",          // Discord bot tokeni
    mongoURI: "",       // MongoDB bağlantı URI'si
    sifre: "",          // Cloudflare güvenlik anahtarı

    cloudflare: {
        token: "",      // Cloudflare API tokeni
        zoneId: ""      // Cloudflare Zone ID
    },

    captchaKey: "",     // CapMonster API anahtarı
}
```

### Genel Ayarlar (`Core/Settings/Public/`)

| Dosya | Açıklama |
|-------|----------|
| `sconfig.js` | Sunucu portu, Discord sunucu ve kanal ID'leri |
| `rconfig.js` | Yönetici Auth kodları, admin rolleri, ücretsiz erişim listesi |
| `mconfig.js` | MySQL veritabanı bağlantı bilgileri |

---

## 🌐 API Kullanımı

### Endpoint Formatı

```
GET /api/{auth_kodu}/{api_adı}
```

|  Parametre  |               Açıklama               |
|-------------|--------------------------------------|
| `auth_kodu` | Müşteriye özel yetkilendirme kodu    |
| `api_adı`   | Çağrılmak istenen API'nin adı        |

### Başarılı Yanıt Örneği

```json
{
  "success": true,
  "message": "API Services",
  "info": {
    "API İsmi": "TEST",
    "Başlangıç Tarihi": "11.02.2026 (bugün)",
    "Bitiş Tarihi": "11.03.2026 (28 gün sonra)",
    "Toplam Limit": 1000,
    "Kalan Limit": 999,
    "Gecikme Süresi": "0.05 saniye"
  },
  "data": { ... }
}
```

### Hata Yanıtları

| Durum | Mesaj |
|-------|-------|
| API bulunamadı | `"Belirtilen (xxx) API bulunamadı."` |
| Auth kodu hatalı | `"Belirtilen (xxx) Auth kodu veritabanında bulunamadı."` |
| IP eşleşmiyor | `"IP'niz (x.x.x.x) veritabanında kullanılan IP ile eşleşmemektedir."` |
| İzin yok | `"Belirtilen (xxx) API için kullanma izni bulunamadı."` |
| Limit doldu | `"Belirtilen (xxx) API için kullanım limitiniz doldu."` |
| Süre doldu | `"Belirtilen (xxx) API için süreniz doldu."` |
| Sadece kurucular | `"Belirtilen (xxx) API sadece kurucular tarafından kullanılabilir."` |

### Yeni API Endpoint Ekleme

`Core/API/` dizini altında yeni bir klasör ve dosya oluşturun:

```javascript
// Core/API/ornek/ornek.js

module.exports = {
    names: ["ornek", "ornekapi"],   // API erişim isimleri
    ownerOnly: false,               // Sadece kuruculara mı özel
    free: false,                    // Ücretsiz mi
    active: true,                   // Aktif mi
    async execute(req, res, mongoData, ip, apiData) {

        const startTime = performance.now();

        try {
            // API mantığınızı buraya yazın
            const result = { mesaj: "Merhaba Dünya!" };

            const endTime = performance.now();
            const ping = (endTime - startTime) / 1000;

            apiData["Gecikme Süresi"] = `${ping.toFixed(2)} saniye`;
            return res.json({
                success: true,
                message: "API Services",
                info: apiData,
                data: result
            });

        } catch (error) {
            console.log(error);
            const endTime = performance.now();
            const ping = (endTime - startTime) / 1000;
            apiData["Gecikme Süresi"] = `${ping.toFixed(2)} saniye`;
            return res.json({
                success: false,
                message: "Bir hata oluştu.",
                info: apiData
            });
        }
    }
};
```

> Yeni eklenen API dosyaları, uygulama başlatıldığında otomatik olarak `glob` ile taranır ve sisteme yüklenir. Ek bir kayıt işlemi gerekmez.

---

## 💾 Veritabanı

### Müşteri Şeması (MongoDB)

```javascript
{
    Username: String,           // Müşteri adı
    Password: String,           // Şifre
    Email: String,              // E-posta (opsiyonel)
    RegisterDate: Number,       // Kayıt tarihi (timestamp)
    Subscription: {
        Type: String,           // "Müşteri", "Kurucu", "Yönetici"
        StartTimestamp: Number,  // Abonelik başlangıcı
        GlobalLimit: Number,    // Genel limit
        LimitedQuery: Array     // Limitli sorgu listesi
    },
    Auth: String,               // Yetkilendirme kodu
    IP: String,                 // Kayıtlı IP adresi
    sorgular: Array             // Aktif API sorguları ve limit bilgileri
}
```

### Sorgu (API İzni) Yapısı

Her müşterinin `sorgular` dizisindeki her eleman:

```javascript
{
    name: "API_ADI",           // API adı (büyük harf)
    active: true,              // Aktif/Dondurulmuş
    startTimestamp: Number,    // Başlangıç tarihi
    endTimestamp: Number,      // Bitiş tarihi
    totalLimit: Number,        // Günlük toplam limit
    usedLimit: Number          // Bugün kullanılan miktar
}
```

### Otomatik Yedekleme

Sistem her gece **00:00** (Türkiye saati) tarihinde:
1. Tüm müşteri verilerini MongoDB'den çeker
2. `Core/Databases/Backup/` dizinine tarih damgalı JSON dosyası olarak kaydeder
3. Süresi dolmuş sorguları temizler
4. Tüm aktif sorguların günlük limitlerini sıfırlar

---

## 🔒 Güvenlik

### İstek Doğrulama Katmanları

```
İstek → Cloudflare Header Kontrolü → Host Doğrulama → Auth Kodu Kontrolü → IP Eşleşme → İzin Kontrolü → Limit Kontrolü → API Çalıştırma
```

1. **Cloudflare Katmanı:** Özel `sifre` ve `token` header'ları ile doğrulama
2. **Host Kontrolü:** Sadece izin verilen domain'lerden gelen istekler kabul edilir
3. **Auth Doğrulama:** MongoDB'deki müşteri kaydı ile eşleştirme
4. **IP Doğrulama:** İstek IP'si ile kayıtlı IP karşılaştırması
5. **İzin Kontrolü:** API'ye erişim izni kontrolü
6. **Limit Kontrolü:** Günlük kullanım limitinin aşılıp aşılmadığı

### Öneriler

- `Core/Settings/Secret/config.js` dosyasını `.gitignore`'a ekleyin
- Discord bot tokenini ve MongoDB URI'sini güvenli tutun
- Üretim ortamında MySQL şifrelerini mutlaka değiştirin
- Cloudflare Custom Header Rules yapılandırmasını aktif edin

---

## 📄 Lisans

Bu proje **ISC** lisansı altında lisanslanmıştır.

---

<p align="center">
  <b>API Services v2.0</b> — CbbrDigital tarafından geliştirilmiştir.
</p>
#
