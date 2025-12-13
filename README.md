# Monolith_To_Microservices_Blog

Geliştirici: faikaktss  
Tarih: 2025-12-13

Kısa açıklama
-------------
Bu depo, bir blog uygulamasının monolith yapıdan microservices yaklaşımlarına dönüşümünü içeren örnek/proje kodlarını barındırır. Backend Java (Spring Boot + Maven) ile yazılmıştır, frontend Node.js tabanlı JavaScript kodu ve statik dosyalar içerir. Amaç: gerçek dünya senaryosunda bir monolitik blog uygulamasının nasıl parçalara ayrılabileceğini göstermek ve örnek uygulama altyapısı sunmaktır.

Dil dağılımı (repo genel görünümü)
----------------------------------
- Java: 55.5%  
- JavaScript: 34.2%  
- CSS: 9.8%  
- HTML: 0.5%

Öne çıkan dosyalar / klasörler
-----------------------------
- .env — Ortam değişkenleri (projeyi çalıştırmadan önce yapılandırın)
- .gitignore, .gitattributes
- mvnw, mvnw.cmd — Maven Wrapper
- pom.xml — Maven proje tanımı (backend / Spring Boot)
- package.json, package-lock.json — Frontend/npm konfigürasyonu
- src/ — (muhtemelen backend uygulama kaynakları)
- backend/ — microservice'lere ait alt projeler veya ayrılmış backend bileşenleri
- public/ — frontend için statik dosyalar
- compose.yaml — Docker Compose (mevcutsa konteynerleştirme için kullanılır)

Mimari (kısa)
-------------
- Monolitikten mikroservislere geçiş örnekleri barındıran bir çalışma.
- Backend Java (Maven & Spring Boot) ile geliştirilmiş, frontend ise Node.js/JavaScript ile yapılmış görünüyor.
- Projede hem monolith kökenli yapı hem de microservice modülleri (backend/) bulunabilir — detayları kodu incelerken netleştirin.

Gereksinimler
------------
- Git
- Java JDK 11+ (projeye bağlı olarak 17 önerilebilir; pom.xml'e göre uyarlayın)
- Maven (yerel makinede mvnw kullanılarak gerek olmayabilir)
- Node.js ve npm (package.json için) — Node 16+ önerilir
- (Opsiyonel) Docker ve Docker Compose — compose.yaml üzerinden konteynerleştirme için

Kurulum ve yerel çalışma
-----------------------
1. Depoyu klonlayın:
   git clone https://github.com/faikaktss/Monolith_To_Microservices_Blog.git
   cd Monolith_To_Microservices_Blog

2. Ortam değişkenlerini ayarlayın:
   - Depoda bir .env dosyası mevcut. İçeriğini projenizin gereksinimlerine göre düzenleyin.
   - Eğer .env örneği yoksa aşağıdaki örnek temel değişkenleri sağlar (örnek — proje ihtiyaçlarına göre düzenleyin):

     ```
     # Örnek .env
     DB_URL=jdbc:postgresql://localhost:5432/blogdb
     DB_USERNAME=postgres
     DB_PASSWORD=changeme
     SERVER_PORT=8080
     JWT_SECRET=your_jwt_secret
     ```

3. Backend (Spring Boot) çalıştırma:
   - Maven Wrapper ile:
     - Unix/macOS: ./mvnw spring-boot:run
     - Windows: mvnw.cmd spring-boot:run
   - Veya paketleyip jar ile:
     ./mvnw clean package
     java -jar target/*.jar

   Not: Eğer backend alt klasör(ler)inde ayrı microservice projeleri varsa (backend/ içinde), ilgili klasöre gidip aynı adımları o klasör için tekrarlayın.

4. Frontend çalıştırma:
   - Öncelikle package.json içindeki script'leri kontrol edin (ör. start, dev, build).
   - Genel komutlar:
     npm install
     npm run start    # veya npm run dev (projedeki script'e göre)
   - Üretim için:
     npm run build
   - Oluşan statik dosyalar public/ içine veya backend tarafından sunulan dizine taşınabilir (proje yapılandırmasına göre).

Docker (opsiyonel)
------------------
- Eğer compose.yaml yapılandırılmışsa:
  docker-compose -f compose.yaml up --build
- compose.yaml boş ya da örnekse, servislere göre (db, backend, frontend) bir docker-compose dosyası hazırlayın.

Yapı / Kod İncelemesi — Nereden Başlanır?
----------------------------------------
1. pom.xml ve mvnw -> Backend projesinin bağımlılıklarına ve Spring Boot sürümüne bakın.
2. package.json -> Frontend script'leri ve bağımlılıkları için.
3. src/ -> Backend uygulama kodu (controller, service, repository vb.)
4. backend/ -> Muhtemel microservice modülleri; her birini ayrı proje gibi çalıştırın.
5. .env -> Çalıştırma için gerekli ayarları buradan alın.

Öneriler / İyileştirme Fikirleri
-------------------------------
- README'ye proje açıklaması, adım adım çalıştırma talimatları ve örnek .env içeriğini ekledim (aşağıda).
- Docker Compose dosyasını (compose.yaml) servisleri (db, auth-service, posts-service, frontend) içerecek şekilde doldurun.
- Her microservice için ayrı README ve konfigürasyon (ör. backend/auth/README.md) ekleyin.
- CI (GitHub Actions) ile build/test iş akışı ekleyin.
- LICENSE dosyası ekleyerek lisans belirtin.

Katkıda bulunma
---------------
- Fork -> branch oluştur -> değişiklik yap -> Pull Request
- Kod stiline uyun, küçük ve odaklı PR'lar gönderin.
- Büyük değişiklikler için issue açıp tartışın.

Sık Karşılaşılan Sorunlar / Hatalar
----------------------------------
- Bağımlılık hataları: mvn clean veya npm cache temizleyip tekrar deneyin.
- Veritabanı bağlantı hatası: .env içindeki DB_* değişkenlerini kontrol edin.
- Port çakışmaları: SERVER_PORT veya frontend portlarını değiştirin.


Teşekkürler
----------
Projeyi incelerken detaylı yardım isterseniz (ör. compose.yaml doldurma, .env değişkenleri hazırlama, microservice ayırma rehberi) söyleyin — adım adım birlikte hazırlayabilirim.
