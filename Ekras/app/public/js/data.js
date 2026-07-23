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
    id: "vela-sapanca",
    title: "Vela Sapanca",
    location: "Sapanca / Sakarya",
    image: "images/vela-sapanca.jpg",
    description: `Vela Sapanca projesi doğayla iç içe, modern mimari anlayışıyla tasarlanmış lüks ve konforlu bir yaşam alanı sunuyor.`,
    specs: {
      "Proje Türü": "Lüks Villa Projesi",
      "Konut Sayısı": "10 Adet Villa",
      "Konum": "Sapanca / Sakarya"
    },
    gallery: ["images/vela-sapanca.jpg",
             "images/vela-sapanca-1.jpg",
               
    ]
  },
  {
    id: "eksioglu-konaklari-eregli",
    title: "Ekşioğlu Konakları (Ereğli)",
    location: "Ereğli / Kocaeli",
    image: "images/eksioglu-eregli.jpg",
    description: `Ekşioğlu Konakları Ereğli projesi, modern daire çözümleri ve lüks mimarisi ile bölgeye değer katıyor.`,
    specs: {
      "Proje Türü": "Konut / Apartman",
      "Konum": "Ereğli / Kocaeli"
    },
    gallery: ["images/eksioglu-eregli.jpg"]
  },
  {
    id: "eksioglu-konaklari-4",
    title: "Ekşioğlu Konakları 4. Etap",
    location: "Çayırova / Kocaeli",
    image: "images/proj-4.jpg",
    description: `Ekşioğlu Konakları 4. Etap, akıllı ev sistemleri ve geniş sosyal donatı alanlarıyla öne çıkmaktadır.`,
    specs: {
      "Proje Türü": "Villa ve Rezidans Karma",
      "Konum": "Çayırova / Kocaeli"
    },
    gallery: ["images/proj-4.jpg"]
  },
  {
    id: "eksioglu-konaklari-3",
    title: "Ekşioğlu Konakları 3. Etap",
    location: "Başiskele / Kocaeli",
    image: "images/proj-5.jpg",
    description: `Ekşioğlu Konakları 3. Etap, ailelerin konforlu ve güvenli bir yaşam sürmesi için tasarlanmış modern bir konut projesidir.`,
    specs: {
      "Proje Türü": "Rezidans / Apartman",
      "Konum": "Başiskele / Kocaeli"
    },
    gallery: ["images/proj-5.jpg"]
  },
  {
    id: "eksioglu-konaklari-2",
    title: "Ekşioğlu Konakları 2. Etap",
    location: "Çayırova / Kocaeli",
    image: "images/proj-3.jpg",
    description: `Ekşioğlu Konakları 2. Etap, ferah yaşam alanları ve modern iç mekan çözümleri sunmaktadır.`,
    specs: {
      "Proje Türü": "Villa Kompleksi",
      "Konum": "Çayırova / Kocaeli"
    },
    gallery: ["images/proj-3.jpg"]
  },
  {
    id: "eksioglu-konaklari-1",
    title: "Ekşioğlu Konakları 1. Etap",
    location: "Çayırova / Kocaeli",
    image: "images/proj-1.jpg",
    description: `Ekşioğlu Konakları 1. Etap, geniş teraslar ve peyzaj düzenlemeleri ile ferah bir yaşam sunmaktadır.`,
    specs: {
      "Proje Türü": "Lüks Villa Kompleksi",
      "Konum": "Çayırova / Kocaeli"
    },
    gallery: ["images/proj-1.jpg"]
  },
  {
    id: "eksioglu-life-city",
    title: "Ekşioğlu Life City",
    location: "Başiskele / Kocaeli",
    image: "images/proj-2.jpg",
    description: `Ekşioğlu Life City, modern yaşam konseptiyle tasarlanmış kapsamlı bir rezidans projesidir.`,
    specs: {
      "Proje Türü": "Rezidans / Apartman",
      "Konum": "Başiskele / Kocaeli"
    },
    gallery: ["images/proj-2.jpg"]
  },
  {
    id: "eksioglu-evleri",
    title: "Ekşioğlu Evleri",
    location: "Kocaeli",
    image: "images/eksioglu-evleri.jpg",
    description: `Ekşioğlu Evleri, konforlu ve şık daire mimarisiyle kaliteli bir yaşam sunuyor.`,
    specs: {
      "Proje Türü": "Konut Projesi",
      "Konum": "Kocaeli"
    },
    gallery: ["images/eksioglu-evleri.jpg"]
  }
];

const services = [
  {
    id: "bina-aydinlatma",
    title: "Bina Aydınlatma",
    location: "Dış Cephe & İç Mekan",
    image: "images/svc-1.jpg",
    description: `Ekras Yapı olarak binalarınızın estetiğini ve gece görünürlüğünü öne çıkaran, enerji tasarruflu ve uzun ömürlü LED dış cephe aydınlatma sistemleri sunuyoruz.`,
    specs: {
      "Hizmet Türü": "Dış Cephe & İç Mekan Aydınlatma",
      "Garanti Süresi": "2 Yıl İşçilik ve Malzeme",
      "Kullanılan Sistem": "Enerji Tasarruflu LED / RGB"
    },
    gallery: [
      "images/svc-1.jpg"
    ]
  },
  {
    id: "cam-balkon",
    title: "Cam Balkon",
    location: "Konut & Ticari Mekanlar",
    image: "images/svc-2.jpg",
    description: `Dört mevsim kullanım imkanı sunan, olumsuz hava şartlarına dayanıklı, yüksek ısı ve ses yalıtımlı katlanır ve sürme cam balkon sistemleri uygulamaktayız.`,
    specs: {
      "Hizmet Türü": "Katlanır / Isıcamlı Cam Balkon",
      "Cam Tipi": "8mm - 10mm Temperli Güvenli Cam",
      "Profil Yapısı": "Paslanmaz Alüminyum Fitil ve Profil"
    },
    gallery: [
      "images/svc-2.jpg"
    ]
  },
  {
    id: "cati-sistemleri",
    title: "Çatı Sistemleri",
    image: "images/svc-3.jpg",
    location: "Tüm Yapı Tipleri",
    description: `Her türlü yapının çatı izolasyonu, aktarma, sıfırdan konstrüksiyon imalatı ve modern çatı kaplama çözümlerini uzman kadromuzla gerçekleştiriyoruz.`,
    specs: {
      "Hizmet Türü": "Çatı İzolasyonu & İmalatı",
      "Malzeme Türü": "Membran / Kiremit / Sandwich Panel",
      "Yalıtım": "Su ve Isı Yalıtımlı Katman"
    },
    gallery: [
      "images/svc-3.jpg"
    ]
  },
  {
    id: "havuz-yapimi",
    title: "Havuz Yapımı",
    location: "Villa & Site Projeleri",
    image: "images/svc-4.jpg",
    description: `Mekanınıza özel anahtar teslim lüks havuz tasarımı, betonarme ve altyapı imalatı, mozaik kaplama ve tam otomatik filtrasyon sistemleri kurulumu.`,
    specs: {
      "Hizmet Türü": "Anahtar Teslim Havuz İmalatı",
      "Havuz Tipi": "Skimmerlı / Taşmalı / Taşınabilir",
      "Donanım": "Otomatik Klorlama ve Filtrasyon"
    },
    gallery: [
      "images/svc-4.jpg"
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

/* ──────────────────────── COMPLAINTS / SUPPORT ──────────────────────── */

const STORAGE_KEY = "ekras_sikayetler";

function loadComplaints() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("[data.js] Could not load complaints from localStorage:", e);
    return [];
  }
}

function saveComplaints(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("[data.js] Could not save complaints to localStorage:", e);
  }
}

function addComplaint(complaint) {
  var list = loadComplaints();
  var entry = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    subject: complaint.subject || "",
    project: complaint.project || "",
    customerName: complaint.customerName || "",
    message: complaint.message || "",
    status: "Beklemede",
    date: new Date().toISOString()
  };
  list.unshift(entry);
  saveComplaints(list);
  return entry;
}

function getComplaints() {
  return loadComplaints();
}

function deleteComplaint(id) {
  var list = loadComplaints().filter(function (c) { return c.id !== id; });
  saveComplaints(list);
}

/* ──────────────────────── SITE CONTENT ──────────────────────── */

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
  },
  support: {
    pageTitle: "Müşteri Destek / Bildirim",
    pageSubtitle: "Talep, şikayet ve önerilerinizi bizimle paylaşın",
    formLabels: {
      subject: "Konu",
      project: "Proje Adı",
      customerName: "Müşteri Adı",
      message: "Mesaj / Şikayet"
    },
    subjectOptions: [
      { value: "", label: "Konu Seçin" },
      { value: "sikayet", label: "Şikayet" },
      { value: "talep", label: "Talep / İstek" },
      { value: "oneri", label: "Öneri" },
      { value: "teknik", label: "Teknik Destek" },
      { value: "diger", label: "Diğer" }
    ],
    submitButton: "Gönder",
    successMessage: "Bildiriminiz başarıyla alınmıştır. En kısa sürede size dönüş yapılacaktır.",
    errorMessage: "Lütfen tüm zorunlu alanları doldurun.",
    infoBox: {
      title: "Bize Ulaşın",
      description: "7/24 destek hattımızdan bize ulaşabilirsiniz. Bildirimleriniz 1-3 iş günü içinde yanıtlanmaktadır.",
      phone: "0 262 502 82 00",
      email: "info@ekrasyapi.com",
      hours: "Hafta içi: 08:00 - 18:00"
    }
  }
};

/* ──────────────────────── EXPORTS ──────────────────────── */

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    projects: projects,
    services: services, // <-- İŞTE BU SATIR EKSİKTİ!
    projectNames: projectNames,
    loadComplaints: loadComplaints,
    saveComplaints: saveComplaints,
    addComplaint: addComplaint,
    getComplaints: getComplaints,
    deleteComplaint: deleteComplaint,
    siteContent: siteContent
  };
}