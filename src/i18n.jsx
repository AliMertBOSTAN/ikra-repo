import { createContext, useContext, useEffect, useState } from 'react';

const en = {
  nav: {
    home: '01 — Home',
    profile: '02 — Profile',
    experience: '03 — Experience',
    education: '04 — Education',
    skills: '05 — Skills',
    contact: '06 — Contact',
    downloadCV: 'Download CV',
  },
  hero: {
    eyebrow: 'Portfolio · Spring 2026',
    location: 'Ankara, TR',
    field: 'EE · Embedded',
    title1: 'Electrical',
    title2: '& Electronics',
    title3: 'Engineer.',
    lede: 'A quiet, careful engineer building reliable embedded systems — from STM32 firmware to circuit-level problem solving.',
    readProfile: 'Read profile',
    downloadCVPdf: 'Download CV (PDF)',
    marquee: 'Embedded Systems · Firmware · STM32 · C / C++ · Python · MATLAB · Circuit Design · ',
  },
  about: {
    label: '02 / Profile',
    title: 'A careful hand, a curious mind.',
    text: 'A motivated third-year Electrical & Electronics Engineering student passionate about embedded systems and software development. I bring hands-on experience in C programming, STM32 microcontroller integration, and embedded application development — paired with academic rigor and a careful, considered approach to engineering problems.',
    born: 'Born',
    basedIn: 'Based in',
    status: 'Status',
    statusValue: 'Open to internships',
    quote: 'Engineering, to me, is the slow art of making things work — quietly, precisely, beautifully.',
  },
  experience: {
    label: '03 / Experience',
    title: "Where I've been.",
    items: [
      {
        period: 'Jul — Aug 2025',
        role: 'Engineering Intern',
        company: 'OYAK Çimento',
        location: 'Ankara, Türkiye',
        bullets: [
          'Worked on-site within an industrial production environment, observing electrical systems and automation processes in a cement plant.',
          'Followed maintenance routines for motors, drives, and control panels — learning how reliability is engineered into heavy industry.',
          'Documented field findings and connected classroom theory to real plant operations under engineer mentorship.',
        ],
      },
      {
        period: 'Jul — Aug 2024',
        role: 'Engineering Intern',
        company: 'IVEO Defence Industries Inc.',
        location: 'Ankara, Türkiye',
        bullets: [
          'Worked extensively in C, deepening fluency in algorithms and software logic for resource-constrained targets.',
          'Developed and optimized firmware on STM32 microcontrollers for embedded application scenarios.',
          'Strengthened low-level programming and hardware–software integration through close mentorship and code review.',
        ],
      },
    ],
    futurePeriod: 'Summer 2026',
    futureTitle: 'Looking for the next chapter',
    futureDesc: 'Open to embedded / firmware internships across Türkiye and Europe.',
  },
  education: {
    label: '04 / Education',
    title: "What I'm studying.",
    items: [
      {
        period: '2022 — Present',
        degree: 'B.Sc. Electrical & Electronic Engineering',
        school: 'Kırıkkale University',
        detail: 'Faculty of Engineering and Architecture',
      },
    ],
    metaFocus: 'Focus',
    metaFocusValue: 'Embedded · Microcontrollers',
    metaLanguages: 'Languages',
    metaLanguagesValue: 'Türkçe · English (B2)',
    metaYear: 'Year',
    metaYearValue: '3rd of 4',
    softPeriod: 'Continuous Study',
    softTitle: 'Self-directed work, off the syllabus.',
    softDetail: 'STM32 HAL · RTOS fundamentals · DSP basics · low-level C optimization · PCB layout in Proteus.',
    softFormat: 'Format',
    softFormatValue: 'Books · datasheets · projects',
    softPace: 'Pace',
    softPaceValue: 'Daily, in small steady steps',
    certsHeading: 'Certifications',
    certsCount: 'total',
    certsCredential: 'ID',
    certsPrev: 'Previous page',
    certsNext: 'Next page',
  },
  skills: {
    label: '05 / Skills',
    title: 'Tools of the trade.',
    languagesHeading: 'Languages',
    languages: [
      { name: 'Türkçe', level: 'Native' },
      { name: 'English', level: 'B2 — Upper Intermediate' },
    ],
  },
  contact: {
    title1: "Let's",
    titleEm: 'make',
    title2: 'something',
    title3: 'thoughtful.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    location: 'Location',
    downloadFull: 'Download Full CV (PDF)',
    writeMe: 'Or write me directly',
    footerCopyright: '© 2026 — İkra Uğurlu',
    footerNote: 'Designed with care · Ankara',
  },
};

const tr = {
  nav: {
    home: '01 — Anasayfa',
    profile: '02 — Profil',
    experience: '03 — Deneyim',
    education: '04 — Eğitim',
    skills: '05 — Beceriler',
    contact: '06 — İletişim',
    downloadCV: 'CV İndir',
  },
  hero: {
    eyebrow: 'Portfolyo · Bahar 2026',
    location: 'Ankara, TR',
    field: 'EE · Gömülü',
    title1: 'Elektrik',
    title2:'ve Elektronik',
    title3: 'Mühendisi.',
    lede: 'STM32 firmware geliştirmeden devre düzeyinde problem çözmeye — sessiz, özenli bir mühendis olarak güvenilir gömülü sistemler kuruyorum.',
    readProfile: 'Profili oku',
    downloadCVPdf: 'CV İndir (PDF)',
    marquee: 'Gömülü Sistemler · Firmware · STM32 · C / C++ · Python · MATLAB · Devre Tasarımı · ',
  },
  about: {
    label: '02 / Profil',
    title: 'Özenli bir el, meraklı bir zihin.',
    text: 'Üçüncü sınıf Elektrik–Elektronik Mühendisliği öğrencisiyim. Gömülü sistemler ve yazılım geliştirmeye duyduğum tutku ile C programlama, STM32 mikrodenetleyici entegrasyonu ve gömülü uygulama geliştirme alanlarında ilerliyorum. Akademik titizliğim ve sahada edindiğim deneyim, karmaşık mühendislik problemlerine sakin ve özenli çözümler üretmeme imkân veriyor.',
    born: 'Doğum',
    basedIn: 'Konum',
    status: 'Durum',
    statusValue: 'Stajlara açığım',
    quote: 'Bana göre mühendislik, işleri sessizce, hassasiyetle ve zarafetle yürür hâle getirmenin yavaş sanatıdır.',
  },
  experience: {
    label: '03 / Deneyim',
    title: 'Geçmiş duraklarım.',
    items: [
      {
        period: 'Tem — Ağu 2025',
        role: 'Mühendislik Stajyeri',
        company: 'OYAK Çimento',
        location: 'Ankara, Türkiye',
        bullets: [
          'Endüstriyel üretim ortamında sahada çalışarak çimento fabrikasındaki elektrik sistemlerini ve otomasyon süreçlerini gözlemledim.',
          'Motor, sürücü ve kontrol panellerinin bakım rutinlerini takip ederek ağır sanayide güvenilirliğin nasıl tasarlandığını öğrendim.',
          'Saha bulgularını belgeledim ve mühendis mentorluğunda ders teorisini gerçek fabrika operasyonlarıyla bağdaştırdım.',
        ],
      },
      {
        period: 'Tem — Ağu 2024',
        role: 'Mühendislik Stajyeri',
        company: 'IVEO Savunma Sanayi A.Ş.',
        location: 'Ankara, Türkiye',
        bullets: [
          'C dilinde yoğun şekilde çalıştım; kaynak kısıtlı sistemler için algoritma ve yazılım mantığı yetkinliğimi derinleştirdim.',
          'STM32 mikrodenetleyiciler üzerinde gömülü uygulama senaryoları için firmware geliştirip optimize ettim.',
          'Yakın mentorluk ve kod inceleme süreçleriyle düşük seviye programlama ile donanım–yazılım entegrasyonunu güçlendirdim.',
        ],
      },
    ],
    futurePeriod: 'Yaz 2026',
    futureTitle: 'Yeni bir bölüm arayışında',
    futureDesc: "Türkiye ve Avrupa'da gömülü / firmware staj fırsatlarına açığım.",
  },
  education: {
    label: '04 / Eğitim',
    title: 'Okuduklarım.',
    items: [
      {
        period: '2022 — Devam ediyor',
        degree: 'Elektrik–Elektronik Mühendisliği Lisans',
        school: 'Kırıkkale Üniversitesi',
        detail: 'Mühendislik ve Mimarlık Fakültesi',
      },
    ],
    metaFocus: 'Odak',
    metaFocusValue: 'Gömülü · Mikrodenetleyiciler',
    metaLanguages: 'Diller',
    metaLanguagesValue: 'Türkçe · İngilizce (B2)',
    metaYear: 'Sınıf',
    metaYearValue: "3. sınıf",
    softPeriod: 'Sürekli Öğrenme',
    softTitle: 'Müfredat dışı, kendi çabamla.',
    softDetail: "STM32 HAL · RTOS temelleri · DSP temelleri · düşük seviye C optimizasyonu · Proteus'ta PCB tasarımı.",
    softFormat: 'Yöntem',
    softFormatValue: 'Kitap · datasheet · projeler',
    softPace: 'Tempo',
    softPaceValue: 'Her gün, küçük ve istikrarlı adımlarla',
    certsHeading: 'Sertifikalar',
    certsCount: 'toplam',
    certsCredential: 'No',
    certsPrev: 'Önceki sayfa',
    certsNext: 'Sonraki sayfa',
  },
  skills: {
    label: '05 / Beceriler',
    title: 'Kullandığım araçlar.',
    languagesHeading: 'Diller',
    languages: [
      { name: 'Türkçe', level: 'Anadil' },
      { name: 'İngilizce', level: 'B2 — Orta–Üst Düzey' },
    ],
  },
  contact: {
    title1: 'Hadi',
    titleEm: 'özenli',
    title2: 'bir şey',
    title3: 'üretelim.',
    email: 'E-posta',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    location: 'Konum',
    downloadFull: 'Tam CV İndir (PDF)',
    writeMe: 'Ya da bana doğrudan yaz',
    footerCopyright: '© 2026 — İkra Uğurlu',
    footerNote: 'Özenle tasarlandı · Ankara',
  },
};

const dictionaries = { en, tr };

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    if (saved === 'tr' || saved === 'en') return saved;
    const nav = typeof navigator !== 'undefined' ? navigator.language : 'en';
    return nav && nav.toLowerCase().startsWith('tr') ? 'tr' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    setLang,
    toggle: () => setLang((l) => (l === 'tr' ? 'en' : 'tr')),
    t: dictionaries[lang],
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useT must be used inside LangProvider');
  return ctx;
}
