/**
 * MAHAREZA FIRDAUS — ARCHITECTURAL & STRUCTURAL DRAFTER PORTFOLIO
 * Clean, Compact & Minimalist Vue.js 3 Application
 * Bandung, Jawa Barat | maharfrds@gmail.com | 0895-2676-6115
 */

const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    // Safe theme storage helper (supports file:// protocol)
    const getSavedTheme = () => {
      try {
        return localStorage.getItem('drafter_theme') || 'dark';
      } catch (e) {
        return 'dark';
      }
    };

    const saveTheme = (val) => {
      try {
        localStorage.setItem('drafter_theme', val);
      } catch (e) {}
    };

    // Theme state
    const currentTheme = ref(getSavedTheme());
    const mobileMenuOpen = ref(false);
    const openCvModal = ref(false);

    const toggleTheme = () => {
      currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
      saveTheme(currentTheme.value);
      document.documentElement.setAttribute('data-theme', currentTheme.value);
    };

    const printCv = () => {
      window.print();
    };

    // Category Filter & Projects (3 Client Projects)
    const selectedCategory = ref('all');

    const projectCategories = [
      { id: 'all', label: 'Semua Proyek' },
      { id: 'pemerintahan', label: 'Pemerintahan' },
      { id: 'rumah', label: 'Rumah Tinggal' },
      { id: 'sekolah', label: 'Sekolah' }
    ];

    const projects = ref([
      {
        id: 'proj-pemerintahan',
        sheetCode: 'DOK-PEM-01',
        title: 'Gedung Kantor Pemerintahan',
        category: 'pemerintahan',
        disciplineLabel: 'PEMERINTAHAN',
        coverImage: 'assets/covers/cover_pemerintahan.png',
        driveUrl: 'https://drive.google.com/drive/folders/12SAzx1UTARvhhirSuyfH_2Qu86c3W0SV?usp=drive_link',
        software: 'AutoCAD 2D',
        layerStandard: 'Detail Engineering Design (DED)',
        deliverables: 'Denah, Tampak Bangunan, Potongan & Detail Gambar Kerja',
        description : 'Project pembuatan gambar kerja (DED) yang mencakup pembuatan denah siteplan, denah rencana, tampak, potongan dan detail gambar kerja dari project pemerintahan'
      },
      {
        id: 'proj-rumah',
        sheetCode: 'DOK-RT-02',
        title: 'Rumah Tinggal',
        category: 'rumah',
        disciplineLabel: 'RUMAH TINGGAL',
        coverImage: 'assets/covers/cover_rumah_tinggal.png',
        driveUrl: 'https://drive.google.com/drive/folders/1gp2Ziwpsg-sXck85_HDBTJLd1fIKN7oS?usp=drive_link',
        software: 'AutoCAD 2D',
        layerStandard: 'Detail Engineering Design (DED)',
        deliverables: 'Denah, Tampak Bangunan, Potongan & Detail Gambar Kerja',
        description : 'Project pembuatan gambar kerja (DED) yang mencakup pembuatan denah siteplan, denah rencana, tampak, potongan dan detail gambar kerja dari project rumah tinggal'
      },
      {
        id: 'proj-sekolah',
        sheetCode: 'DOK-SEK-03',
        title: 'Gedung Fasilitas Pendidikan / Sekolah',
        category: 'sekolah',
        disciplineLabel: 'SEKOLAH',
        coverImage: 'assets/covers/cover_sekolah.png',
        driveUrl: 'https://drive.google.com/drive/folders/1yQcO-5m3LEH2m0zDGnGtEWOsVgI5d6ZG?usp=sharing',
        software: 'AutoCAD 2D',
        layerStandard: 'Detail Engineering Design (DED)',
        deliverables: 'Denah, Tampak Bangunan, Potongan & Detail Gambar Kerja',
        description : 'Project pembuatan gambar kerja (DED) yang mencakup pembuatan denah siteplan, denah rencana, tampak, potongan dan detail gambar kerja dari project fasilitas pendidikan/sekolah'
      }
    ]);

    // Filtered Projects Computed Property
    const filteredProjects = computed(() => {
      if (selectedCategory.value === 'all') return projects.value;
      return projects.value.filter(p => p.category === selectedCategory.value);
    });

    // Project Modal State
    const activeModalProject = ref(null);
    const openProjectModal = (proj) => {
      activeModalProject.value = proj;
    };
    const closeProjectModal = () => {
      activeModalProject.value = null;
    };

    // Dokumentasi Foto Lapangan & Rapat (Pure Image Library)
    const galleryImages = ref([
      'assets/dokumentasi/dokumentasi-1.jpg',
      'assets/dokumentasi/dokumentasi-2.jpg',
      'assets/dokumentasi/dokumentasi-3.jpg',
      'assets/dokumentasi/dokumentasi-4.jpg'
    ]);

    const activePhoto = ref(null);
    const openPhotoModal = (img) => {
      activePhoto.value = img;
    };
    const closePhotoModal = () => {
      activePhoto.value = null;
    };

    // Skills & Tools
    const softwareSkills = [
      { 
        name: 'AutoCAD (2D Drafting)', 
        percentage: 95, 
        icon: 'fa-solid fa-draw-polygon',
        summary: 'Mahir membuat gambar kerja arsitektural, sipil/struktur, dan MEP 2D, survey lapangan, manajemen layer CAD, revisi redline, dan plotting cetak terstandar.' 
      },
      { 
        name: 'SketchUp LayOut', 
        percentage: 92, 
        icon: 'fa-solid fa-file-invoice',
        summary: 'Penyusunan set gambar kerja 2D terukur berskala dari model 3D SketchUp, dimensi presisi, notasi detail, dan template titleblock proyek.' 
      },
      { 
        name: 'Microsoft Office (Excel & Word)', 
        percentage: 88, 
        icon: 'fa-solid fa-file-excel',
        summary: 'Penyusunan data rekapitulasi teknis, perhitungan volume material BOQ di Excel, serta pembuatan dokumen spesifikasi teknis di Word.' 
      },
      { 
        name: 'Quality Control & Survey Lapangan', 
        percentage: 94, 
        icon: 'fa-solid fa-ruler-combined',
        summary: 'Pengalaman inspeksi kualitas di PT Astra Daihatsu Motor (5S, defect analysis, dimension check) dan survey pengukuran bangunan di konsultan perencana.' 
      }
    ];

    // Real Experiences Data from CV
    const experiences = [
      {
        period: 'Februari 2026 — September 2026',
        role: 'Drafter Arsitektural',
        company: 'PT. Konars RWX MISSION — Bandung, Jawa Barat',
        type: 'Full-Time',
        description: 'Bertanggung jawab memproduksi paket gambar kerja arsitektural menggunakan SketchUp LayOut dan memastikan kesesuaian antara gambar dengan kondisi lapangan.',
        highlights: [
          'Membuat gambar kerja arsitektural terukur menggunakan SketchUp LayOut.',
          'Melakukan revisi gambar kerja sesuai arahan arsitek, Quality Control (QC), dan kebutuhan proyek.',
          'Melakukan penyesuaian gambar terhadap kondisi aktual lapangan serta memastikan kesesuaian dengan spesifikasi teknis.',
          'Mengelola file gambar proyek secara rapi dan terstruktur untuk memudahkan proses revisi dan dokumentasi.'
        ]
      },
      {
        period: 'Juni 2025 — Januari 2026',
        role: 'Drafter (Remote)',
        company: 'PT. Skala Delapan Konsultan — Bandung, Jawa Barat',
        type: 'Remote Drafter',
        description: 'Mengerjakan pembuatan dan revisi gambar kerja arsitektural, sipil, dan MEP menggunakan AutoCAD untuk berbagai proyek perumahan dan komersial.',
        highlights: [
          'Membuat gambar kerja arsitektural, sipil, dan MEP menggunakan AutoCAD.',
          'Melakukan penyesuaian gambar terhadap spesifikasi teknis dan revisi dari tim arsitek.',
          'Berkoordinasi aktif secara remote dengan tim arsitek untuk kelancaran proses perencanaan.'
        ]
      },
      {
        period: 'Januari 2025 — Januari 2026',
        role: 'Drafter',
        company: 'PT. Baladewa Cipta Kreasi — Bandung, Jawa Barat',
        type: 'Full-Time',
        description: 'Melaksanakan survey pengukuran lapangan serta memproduksi gambar kerja arsitektural, sipil, dan MEP.',
        highlights: [
          'Melakukan survey pengukuran langsung di lokasi proyek.',
          'Membuat gambar kerja arsitektural, sipil/struktur, dan MEP menggunakan AutoCAD.',
          'Memastikan file drawing terkelola rapi dan terarsip dengan baik.'
        ]
      },
      {
        period: 'Desember 2023 — Desember 2024',
        role: 'Drafter',
        company: 'CV. Sasana Karya — Bandung, Jawa Barat',
        type: 'Full-Time',
        description: 'Melakukan survey lapangan dan pembuatan set gambar kerja konstruksi menggunakan AutoCAD.',
        highlights: [
          'Membuat gambar kerja arsitektural, sipil, dan MEP di AutoCAD.',
          'Melakukan survey lapangan dan penyesuaian gambar kerja lapangan.',
          'Berkoordinasi dengan tim arsitek konsultan untuk penerbitan gambar tender/pelaksanaan.'
        ]
      },
      {
        period: 'Desember 2021 — November 2023',
        role: 'Quality Inspector (Final Check & Painting)',
        company: 'PT. Astra Daihatsu Motor — Jakarta Utara',
        type: 'Full-Time',
        description: 'Menjalankan inspeksi ketat terhadap kualitas akhir (quality control), memastikan tidak ada defect, kepatuhan dimensi dan fungsional unit, serta penerapan standar 5S & QCC.',
        highlights: [
          'Meraih penghargaan Best Employee on November & Appreciation Detection Defect (2023).',
          'Memastikan kualitas dan ketelitian standar visual & fungsional secara presisi.',
          'Aktif dalam implementasi 5S, ICARE, dan QCC di lingkungan kerja manufaktur.'
        ]
      }
    ];

    // Education Data from CV
    const education = {
      school: 'SMK Negeri 7 Baleendah — Bandung, Jawa Barat',
      major: 'Desain Pemodelan dan Informasi Bangunan (DPIB)',
      period: '2018 — 2021',
      grades: 'Rata-rata Pengetahuan: 85.59 | Keterampilan: 86.31 | Ujian Sekolah: 87.21'
    };

    // Certifications Data from CV
    const certifications = [
      {
        title: 'Keselamatan dan Kesehatan Kerja Operator K3 Umum',
        issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
        year: '2024'
      },
      {
        title: 'Training Operator K3 Umum',
        issuer: 'HSP Academy',
        year: '2024'
      },
      {
        title: 'Sertifikat Kompetensi Jasa Konstruksi',
        issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
        year: '2021'
      },
      {
        title: 'Best Employee & Appreciation Detection Defect',
        issuer: 'PT. Astra Daihatsu Motor',
        year: '2023'
      }
    ];

    // Contact Form
    const contactForm = ref({ name: '', email: '', message: '' });
    const formSubmitting = ref(false);
    const formSuccessMessage = ref('');

    const submitContactForm = () => {
      formSubmitting.value = true;
      setTimeout(() => {
        formSubmitting.value = false;
        formSuccessMessage.value = `Pesan terkirim! Terima kasih ${contactForm.value.name}, saya akan membalas ke email Anda secepatnya.`;
        contactForm.value = { name: '', email: '', message: '' };
      }, 600);
    };

    onMounted(() => {
      document.documentElement.setAttribute('data-theme', currentTheme.value);
    });

    return {
      currentTheme,
      toggleTheme,
      mobileMenuOpen,
      openCvModal,
      printCv,
      selectedCategory,
      projectCategories,
      projects,
      filteredProjects,
      activeModalProject,
      openProjectModal,
      closeProjectModal,
      galleryImages,
      activePhoto,
      openPhotoModal,
      closePhotoModal,
      softwareSkills,
      experiences,
      education,
      certifications,
      contactForm,
      formSubmitting,
      formSuccessMessage,
      submitContactForm
    };
  }
}).mount('#app');
