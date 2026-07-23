/**
 * ============================================================================
 * EKRAS YAPI A.S. - CENTRAL DATA HUB
 * ============================================================================
 * Single source of truth for ALL site content:
 *   - Projects (portfolio)
 *   - Complaints / Support tickets (with localStorage persistence)
 *   - Site content (texts, labels)
 *   - Project name list (for dropdowns and forms)
 *
 * To add a new project: push a new object to `projects` array.
 * To add a new complaint: call addComplaint() from support.js.
 * ============================================================================
 */

/* ──────────────────────── PROJECTS ──────────────────────── */

const projects = [
  {
    id: "eksioglu-metsan",
    title: "Ekşioğlu Metsan Evleri",
    location: "Başiskele / Kocaeli",
    image: "images/proj-1.jpg",
    description: `Ekşioğlu Metsan Evleri, Kocaeli'nin Başiskele ilçesinde yer alan prestijli bir villa projesidir.
Modern mimari anlayışıyla tasarlanan bu proje, geniş bahçeleri, özel havuzları ve yüksek kaliteli malzeme kullanımıyla dikkat çekmektedir.
Projede toplam 24 adet özel villa bulunmaktadır. Her villa, kendi özel bahçesi ve otoparkı ile birlikte teslim edilmektedir.`,
    specs: {
      "Proje Türü": "Villa Projesi",
      "Konut Sayısı": "24 Adet Villa",
      "Arsa Alanı": "12.500 m²",
      "İnşaat Alanı": "8.200 m²",
      "Oda Sayısı": "5+1",
      "Başlangıç": "2022",
      "Tamamlanma": "2024",
      "Konum": "Başiskele / Kocaeli"
    },
    gallery: [
      "images/hero-1.jpg",
      "images/proj-1.jpg",
      "images/svc-1.jpg",
      "images/hero-3.jpg"
    ]
  },
  {
    id: "eksioglu-life-city",
    title: "Ekşioğlu Life City",
    location: "Başiskele / Kocaeli",
    image: "images/proj-2.jpg",
    description: `Ekşioğlu Life City, modern yaşam konseptiyle tasarlanmış kapsamlı bir rezidans projesidir.
Açık ve kapalı yüzme havuzları, fitness merkezi, sauna, çocuk oyun alanları ve yeşil alanlarıyla komple bir yaşam alanı sunmaktadır.
Projede 1+1'den 4+1'e kadar farklı daire seçenekleri bulunmaktadır.`,
    specs: {
      "Proje Türü": "Rezidans / Apartman",
      "Konut Sayısı": "186 Adet Daire",
      "Arsa Alanı": "28.000 m²",
      "İnşaat Alanı": "52.000 m²",
      "Oda Sayısı": "1+1 / 2+1 / 3+1 / 4+1",
      "Başlangıç": "2021",
      "Tamamlanma": "2023",
      "Konum": "Başiskele / Kocaeli"
    },
    gallery: [
      "images/hero-2.jpg",
      "images/proj-2.jpg",
      "images/hero-4.jpg",
      "images/hero-5.jpg"
    ]
  },
  {
    id: "eksioglu-konaklari-1",
    title: "Ekşioğlu Konakları 1. Etap",
    location: "Çayırova / Kocaeli",
    image: "images/proj-3.jpg",
    description: `Ekşioğlu Konakları 1. Etap, Çayırova'da hayata geçirilen lüks villa projesidir.
Mediterranean mimari tarzıyla tasarlanan projede, geniş teraslar, özel havuzlar ve peyzaj düzenlemeleri ön plana çıkmaktadır.
Projede her bir villa, panoramik manzarası ve yüksek tavanlarıyla ferah bir yaşam alanı sunmaktadır.`,
    specs: {
      "Proje Türü": "Lüks Villa Kompleksi",
      "Konut Sayısı": "16 Adet Villa",
      "Arsa Alanı": "8.600 m²",
      "İnşaat Alanı": "6.400 m²",
      "Oda Sayısı": "4+1 / 5+1",
      "Başlangıç": "2020",
      "Tamamlanma": "2022",
      "Konum": "Çayırova / Kocaeli"
    },
    gallery: [
      "images/hero-3.jpg",
      "images/proj-3.jpg",
      "images/proj-4.jpg",
      "images/proj-5.jpg"
    ]
  },
  {
    id: "eksioglu-konaklari-2",
    title: "Ekşioğlu Konakları 2. Etap",
    location: "Çayırova / Kocaeli",
    image: "images/proj-4.jpg",
    description: `Ekşioğlu Konakları 2. Etap, ilk etabın gördüğü yoğun ilgi üzerine hayata geçirilen yeni bir villa projesidir.
Aynı mimari kalite ve peyzaj anlayışıyla tasarlanan projede, ferah yaşam alanları ve modern iç mekan çözümleri sunulmaktadır.
Proje, doğayla iç içe fakat şehir merkezine yakın bir konumda yer almaktadır.`,
    specs: {
      "Proje Türü": "Villa Kompleksi",
      "Konut Sayısı": "18 Adet Villa",
      "Arsa Alanı": "9.400 m²",
      "İnşaat Alanı": "7.100 m²",
      "Oda Sayısı": "4+1 / 5+1",
      "Başlangıç": "2023",
      "Tamamlanma": "2025",
      "Konum": "Çayırova / Kocaeli"
    },
    gallery: [
      "images/proj-4.jpg",
      "images/hero-4.jpg",
      "images/proj-1.jpg",
      "images/hero-1.jpg"
    ]
  },
  {
    id: "eksioglu-konaklari-3",
    title: "Ekşioğlu Konakları 3. Etap",
    location: "Başiskele / Kocaeli",
    image: "images/proj-5.jpg",
    description: `Ekşioğlu Konakları 3. Etap, ailelerin konforlu ve güvenli bir yaşam sürmesi için tasarlanmış modern bir konut projesidir.
Geniş sosyal alanları, çocuk oyun parkı ve yürüyüş yollarıyla aile dostu bir yaşam alanı sunmaktadır.
Proje kapsamında farklı büyüklüklerde daire seçenekleri bulunmaktadır.`,
    specs: {
      "Proje Türü": "Rezidans / Apartman",
      "Konut Sayısı": "96 Adet Daire",
      "Arsa Alanı": "15.200 m²",
      "İnşaat Alanı": "24.500 m²",
      "Oda Sayısı": "2+1 / 3+1 / 4+1",
      "Başlangıç": "2023",
      "Tamamlanma": "2025",
      "Konum": "Başiskele / Kocaeli"
    },
    gallery: [
      "images/proj-5.jpg",
      "images/hero-5.jpg",
      "images/proj-2.jpg",
      "images/hero-2.jpg"
    ]
  },
  {
    id: "eksioglu-konaklari-4",
    title: "Ekşioğlu Konakları 4. Etap",
    location: "Çayırova / Kocaeli",
    image: "images/proj-1.jpg",
    description: `Ekşioğlu Konakları 4. Etap, serinin en yeni ve en kapsamlı projesidir.
Akıllı ev sistemleri, geniş sosyal donatı alanları ve enerji verimli yapı teknolojileriyle öne çıkmaktadır.
Proje, modern kentsel yaşamı doğayla buluşturan bir konseptle tasarlanmıştır.`,
    specs: {
      "Proje Türü": "Villa ve Rezidans Karma",
      "Konut Sayısı": "42 Adet Konut",
      "Arsa Alanı": "18.700 m²",
      "İnşaat Alanı": "31.000 m²",
      "Oda Sayısı": "3+1 / 4+1 / 5+1",
      "Başlangıç": "2024",
      "Tamamlanma": "2026",
      "Konum": "Çayırova / Kocaeli"
    },
    gallery: [
      "images/proj-1.jpg",
      "images/hero-1.jpg",
      "images/proj-3.jpg",
      "images/hero-3.jpg"
    ]
  },
  {
    id: "vela-sapanca",
    title: "Vela Sapanca",
    location: "Sapanca / Sakarya",
    image: "images/vela-sapanca.jpg",
    description: `Vela Sapanca projesi doğayla iç içe, modern ve konforlu bir yaşam sunuyor.`,
    specs: {
      "Proje Türü": "Lüks Villa",
      "Konut Sayısı": "10 Adet Villa",
      "Oda Sayısı": "4+1",
      "Konum": "Sapanca / Sakarya"
    },
    gallery: [
      "images/vela-sapanca.jpg"
    ]
  }
];

/**
 * Derive a simple project-name list from the projects array.
 * Useful for populating dropdown menus and form <select> options.
 */
const projectNames = projects.map(function (p) {
  return { id: p.id, title: p.title };
});

/* ──────────────────────── SITE CONTENT ──────────────────────── */

/**
 * Centralized text content. Edit here to update text across all pages.
 */
const siteContent = {
  company: {
    name: "Ekras Yapı A.Ş.",
    slogan: "Hayallerinizi İnşa Ediyoruz",
    phone: "0 262 502 82 00",
    accountingPhone: "0 262 642 00 53",
    email: "info@ekrasyapi.com",
    address: "Fatih mahallesi Hacı Mahmut caddesi no:153, Başiskele / Kocaeli",
    branchAddress: "Emek Mah. Ragıp Demirkol Blv. No:135/3, Çayırova / Kocaeli"
  },
  about: {
    paragraphs: [
      "Tecrübeli teknik kadromuz ile güvenilir ve verimli ekip olma anlayışıyla; müşteri memnuniyeti ve kalite ile birlikte zamindalık ilkelerinden ödün vermeden ülke ve dünya standartlarına uygun olarak hizmet sunmaktayız.",
      "Ekras Yapı A.Ş. olarak, inşaat sektöründe yenilikçi çözümler üreten, modern mimari anlayışı ve kaliteli malzeme kullanımıyla projeler hayata geçiren bir yapı şirketiyiz. Kurulduğumuz günden bu yana sayısız başarılı projeye imza attık ve müşterilerimizin güvenini kazandık.",
      "Misyonumuz, yaşanabilir, sürdürülebilir ve estetik yapılar inşa ederek topluma değer katmaktadır. Vizyonumuz ise sektörün öncü ve yenilikçi firmaları arasında yer almaktır."
    ]
  }
};

/* ──────────────────────── EXPORTS ──────────────────────── */

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    projects: projects,
    projectNames: projectNames,
    siteContent: siteContent
  };
}