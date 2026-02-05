import { Mesaj, TabloVerisi } from '../types';

function rastgeleIdOlustur(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function bekle(ms: number): Promise<void> {
  return new Promise(cozumle => setTimeout(cozumle, ms));
}

const sahteCevaplar: { yazi: string; tabloVerisi?: TabloVerisi }[] = [
  {
    yazi: `Son 30 gündeki satış verilerinizi detaylı olarak analiz ettim ve size kapsamlı bir rapor sunuyorum.

**Genel Bakış:**
Toplam satış tutarı **₺1,245,890** olarak gerçekleşmiş. Bu rakam geçen ayın aynı dönemine kıyasla %18.5 artış göstermektedir. En yüksek satış **Elektronik** kategorisinde görülürken, en hızlı büyüyen kategori ise **Giyim** olmuştur.

**Önemli Bulgular:**
- Hafta sonları satışlar %35 daha yüksek performans gösteriyor
- Öğleden sonra saatleri (14:00-18:00) en yoğun satış periyodu
- Online satışların payı toplam satışın %42'sine ulaştı
- Mobil cihazlardan yapılan alışverişler %28 arttı

**Öneriler:**
Elektronik kategorisindeki güçlü performansı korumak için stok seviyelerinin artırılması ve hafta sonu kampanyalarının genişletilmesi önerilir.`,
    tabloVerisi: {
      sutunAdlari: ['Kategori', 'Satış Adedi', 'Toplam Tutar', 'Ortalama', 'Büyüme'],
      satirlar: [
        ['Elektronik', 342, '₺520,400', '₺1,521', '+22%'],
        ['Giyim', 567, '₺340,200', '₺600', '+31%'],
        ['Gıda', 1205, '₺245,100', '₺203', '+8%'],
        ['Mobilya', 89, '₺140,190', '₺1,575', '+15%'],
      ],
    },
  },
  {
    yazi: `Müşteri veritabanını inceledim ve detaylı bir analiz hazırladım.

**Mevcut Durum:**
Veritabanında toplam **2,458** aktif müşteri bulunmaktadır. Bu ay **127** yeni müşteri kaydı oluşturulmuş olup, geçen aya kıyasla %12 artış söz konusu. Müşteri sadakat programına kayıtlı kullanıcı sayısı ise **1,892** kişiye ulaştı.

**Demografik Dağılım:**
- 18-25 yaş: %18
- 26-35 yaş: %34 (en yoğun segment)
- 36-45 yaş: %28
- 46+ yaş: %20

**Müşteri Davranış Analizi:**
Ortalama sipariş sıklığı ayda 2.3 kez, ortalama sepet tutarı ise ₺485 olarak hesaplandı. Tekrar satın alma oranı %67 ile sektör ortalamasının üzerinde seyrediyor.

**Dikkat Edilmesi Gerekenler:**
Son 90 gündür alışveriş yapmayan **342** müşteri tespit edildi. Bu segment için yeniden aktivasyon kampanyası düzenlenmesi önerilir.`,
  },
  {
    yazi: `Aylık gelir-gider raporunu hazırladım. İşte detaylı finansal analiz:

**Özet:**
Yılın ilk 5 ayında toplam **₺4,400,000** gelir elde edilirken, giderler **₺3,270,000** olarak gerçekleşti. Net kâr marjı **%25.7** seviyesinde stabil seyrediyor.

**Trend Analizi:**
- Ocak ayında sezon sonu indirimleri sayesinde en yüksek gelir elde edildi
- Şubat ayında mevsimsel düşüş gözlemlendi
- Mart ve Nisan aylarında toparlanma trendi başladı
- Mayıs ayı yılın en kârlı ayı olma yolunda ilerliyor

**Gider Kalemleri Dağılımı:**
Personel giderleri toplam giderlerin %42'sini, operasyonel giderler %31'ini, pazarlama harcamaları ise %18'ini oluşturuyor. Kalan %9 diğer giderlerden oluşmaktadır.

**Finansal Sağlık Göstergeleri:**
Likidite oranı 1.8, borç/özkaynak oranı 0.4 ile sağlıklı bir finansal yapı sergileniyor.`,
    tabloVerisi: {
      sutunAdlari: ['Ay', 'Gelir', 'Gider', 'Kâr', 'Marj'],
      satirlar: [
        ['Ocak', '₺890,000', '₺650,000', '₺240,000', '%27'],
        ['Şubat', '₺780,000', '₺590,000', '₺190,000', '%24'],
        ['Mart', '₺920,000', '₺700,000', '₺220,000', '%24'],
        ['Nisan', '₺850,000', '₺620,000', '₺230,000', '%27'],
        ['Mayıs', '₺960,000', '₺710,000', '₺250,000', '%26'],
      ],
    },
  },
  {
    yazi: `Stok durumunu kapsamlı bir şekilde kontrol ettim ve kritik bulguları sizinle paylaşıyorum.

**Genel Stok Durumu:**
Toplam **1,247** farklı ürün SKU'su takip ediliyor. Bunların **15**'i kritik stok seviyesinin altında, **38**'i ise uyarı seviyesinde bulunuyor. Acil sipariş verilmesi gereken ürünler aşağıda listelenmiştir.

**Stok Devir Hızı Analizi:**
- Yüksek devir hızlı ürünler (A grubu): 312 SKU
- Orta devir hızlı ürünler (B grubu): 567 SKU
- Düşük devir hızlı ürünler (C grubu): 368 SKU

**Kritik Ürünler için Aksiyon Önerileri:**
1. **Laptop Model X** - Tedarikçi ile acil sipariş görüşmesi yapılmalı (tahmini teslimat: 5 iş günü)
2. **Monitor 27"** - Alternatif tedarikçi araştırılmalı, mevcut stok 3 günlük satışı karşılıyor
3. **Klavye K200** - Toplu sipariş indirimi için fırsat değerlendirilmeli

**Ölü Stok Uyarısı:**
Son 180 gündür satışı olmayan **23** ürün tespit edildi. Bu ürünler için indirimli satış veya iade değerlendirmesi önerilir.`,
    tabloVerisi: {
      sutunAdlari: ['Ürün Kodu', 'Ürün Adı', 'Mevcut Stok', 'Kritik Seviye', 'Durum'],
      satirlar: [
        ['PRD-001', 'Laptop Model X', 3, 10, '🔴 Kritik'],
        ['PRD-015', 'Klavye K200', 5, 15, '🔴 Kritik'],
        ['PRD-042', 'Monitor 27"', 2, 8, '🔴 Kritik'],
        ['PRD-078', 'Mouse M100', 4, 12, '🔴 Kritik'],
        ['PRD-091', 'USB Kablo', 8, 20, '🟡 Uyarı'],
      ],
    },
  },
  {
    yazi: `Sipariş performans raporunu hazırladım. Son 7 günün detaylı analizi aşağıdadır.

**Sipariş Özeti:**
- Tamamlanan siparişler: **89** adet
- Bekleyen siparişler: **12** adet
- İptal edilen siparişler: **3** adet
- Toplam sipariş değeri: **₺187,450**

**Performans Metrikleri:**
Tamamlanma oranı **%85.6** ile belirlenen %80 hedefinin üzerinde seyrediyor. Ortalama sipariş işleme süresi 2.3 saat olup, bu rakam geçen haftaya göre %15 iyileşme gösteriyor.

**İptal Analizi:**
İptal edilen 3 siparişin nedenleri:
- Müşteri kaynaklı vazgeçme: 2 adet
- Stok yetersizliği: 1 adet

**Teslimat Performansı:**
Zamanında teslimat oranı %94.2 ile mükemmel seviyede. Ortalama teslimat süresi 1.8 gün olarak gerçekleşti. Kargo şirketleri arasında en iyi performansı **Yurtiçi Kargo** gösterdi.

**Öneri:**
Bekleyen siparişlerin %60'ı ödeme onayı bekliyor. Otomatik ödeme hatırlatma sistemi devreye alınarak bu oran düşürülebilir.`,
  },
  {
    yazi: `En çok satan ürünlerin detaylı analizini tamamladım.

**Genel Değerlendirme:**
İlk 5 ürün toplam satışların **%34**'ünü oluşturuyor. **Wireless Kulaklık** açık ara lider konumda ve tek başına toplam gelirin %12'sini sağlıyor.

**Ürün Bazlı İncelemeler:**

**1. Wireless Kulaklık**
Yüksek talep nedeniyle stok yönetimi kritik önem taşıyor. Müşteri yorumları %92 olumlu. Rakip ürünlere göre fiyat avantajı var.

**2. USB-C Hub**
Uzaktan çalışma trendinin devam etmesiyle satışlar artıyor. Cross-sell potansiyeli yüksek (laptop aksesuarları ile).

**3. Mekanik Klavye**
Gamer segmentinde güçlü talep var. Premium fiyat segmentinde lider konumda.

**Satış Trendi:**
Son 3 ayda ilk 5 ürünün satışları ortalama %24 arttı. Bu trend devam ederse, yıl sonu hedeflerinin %15 üzerinde gerçekleşme bekleniyor.

**Stok Önerisi:**
Mevcut satış hızına göre Wireless Kulaklık için 2 hafta, USB-C Hub için 3 hafta içinde yeniden sipariş verilmesi gerekiyor.`,
    tabloVerisi: {
      sutunAdlari: ['Sıra', 'Ürün', 'Satış Adedi', 'Gelir', 'Stok', 'Trend'],
      satirlar: [
        [1, 'Wireless Kulaklık', 456, '₺182,400', 89, '📈 +28%'],
        [2, 'USB-C Hub', 389, '₺116,700', 156, '📈 +22%'],
        [3, 'Mekanik Klavye', 312, '₺249,600', 67, '📈 +19%'],
        [4, 'Webcam HD', 278, '₺83,400', 203, '📊 +8%'],
        [5, 'Laptop Standı', 245, '₺73,500', 178, '📈 +15%'],
      ],
    },
  },
];

let cevapSayaci = 0;

// Geçerli kullanıcılar
const gecerliKullanicilar = ['Zess'];

export async function kullaniciKontrolApi(
  kullaniciAdi: string
): Promise<{ gecerli: boolean; mesaj: string }> {
  await bekle(500);

  if (gecerliKullanicilar.includes(kullaniciAdi)) {
    return { gecerli: true, mesaj: 'Kullanıcı bulundu' };
  }

  return { gecerli: false, mesaj: 'Kullanıcı bulunamadı' };
}

export async function girisYapApi(
  kullaniciAdi: string,
  sifre: string
): Promise<{ basarili: boolean; mesaj: string }> {
  await bekle(800);

  if (kullaniciAdi === 'Zess' && sifre === '123456') {
    return { basarili: true, mesaj: 'Giriş başarılı' };
  }

  return { basarili: false, mesaj: 'Hatalı PIN kodu' };
}

export async function mesajGonderApi(_mesaj: string): Promise<Mesaj> {
  await bekle(1000 + Math.random() * 1500);

  const sahte = sahteCevaplar[cevapSayaci % sahteCevaplar.length];
  cevapSayaci++;

  return {
    id: rastgeleIdOlustur(),
    rol: 'assistant',
    icerik: sahte.yazi,
    icerikTuru: sahte.tabloVerisi ? 'table' : 'text',
    tabloVerisi: sahte.tabloVerisi,
    zamanDamgasi: Date.now(),
  };
}
