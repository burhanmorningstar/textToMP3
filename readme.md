# Haber Seslendirme Sistemi

Bu proje, belirli bir haber sitesindeki haberleri kullanıcıdan alıp, haber içeriğini metin olarak çekip seslendiren bir sistemdir.

## Özellikler

- Kullanıcılar BBC haberlerinden bir URL girebilir.
- Sistem, haber içeriğini otomatik olarak analiz eder ve metni alır.
- Alınan metin, PlayHT API kullanılarak sese dönüştürülür.
- Ses dosyası, kullanıcı tarafından dinlenebilir hale getirilir.

## Teknolojiler

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Backend

- Node.js
- Express.js

### Diğer Teknolojiler

- Cheerio: Web scraping işlemleri için.
- Axios: HTTP isteklerini gerçekleştirmek için.
- PlayHT: Metinleri sese dönüştürmek için bir TTS (Text-to-Speech) API.

## Gereksinimler

1. **Node.js ve npm:** Proje, Node.js üzerinde çalışmaktadır. Yüklemek için: [Node.js](https://nodejs.org/)
2. **PlayHT API Key:** PlayHT'den bir API kullanıcı kimliği ve anahtarı alınması gerekmektedir.

## Kurulum ve Çalıştırma

SERVER VE WEBSİTE KLASÖRLERİNİ AYRI DİZİNLERE ALMAYI UNUTMAYINIZ !!

1. Proje dosyalarını indirin veya klonlayın:

   ```bash
   git clone https://github.com/burhanmorningstar/textToMP3.git
   cd textToMP3
   cd server
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. Örnek `.env` dosyasını baz alarak bir `.env` dosyası oluşturun ve PlayHT API bilgilerinizi ekleyin:
   (https://play.ht/studio bu adresten api key ve user id alabilirsiniz)

   ```
   PLAYHT_USER_ID=your_user_id
   PLAYHT_API_KEY=your_api_key
   ```

4. Sunucuyu çalıştırın ardından index.html dosyasını live server eklentisi ile başlatın:

   ```bash
   node server.js
   ```

5. Tarayıcınızda şu adresi ziyaret edin:
   ```
   http://127.0.0.1:5500/index.html
   ```

## Dosya Yapısı

- **index.html**: Ana frontend arayüzü.
- **styles.css**: Arayüzün tasarımı için CSS dosyası.
- **script.js**: Haber gönderme ve sonuçları alma işlemlerini yöneten frontend scripti.
- **scraper.js**: Haber içeriğini almak için kullanılan backend scripti.
- **server.js**: Backend sunucu mantığını içerir.

## Nasıl Çalışır?

1. Kullanıcı bir BBC haber URL'si girer.
2. URL, backend'e gönderilir.
3. Backend, haber içeriğini `scraper.js` aracılığıyla alır.
4. İçerik, PlayHT API ile sese dönüştürülür.
5. Dönüştürülen ses, frontend'de oynatıcı üzerinden kullanıcının dinlemesi için sunulur.

## Önemli Notlar

- Sistem şu anda sadece **BBC** kaynaklarından gelen haber URL'lerini desteklemektedir.
- PlayHT API'yi kullanmak için internet bağlantısı gereklidir.

## Katkıda Bulunma

Katkıda bulunmak için:

1. Fork edin.
2. Bir branch oluşturun:
   ```bash
   git checkout -b yeni-ozellik
   ```
3. Değişikliklerinizi commitleyin:
   ```bash
   git commit -m "Yeni bir özellik eklendi"
   ```
4. Push yapın:
   ```bash
   git push origin yeni-ozellik
   ```
5. Bir pull request gönderin.
