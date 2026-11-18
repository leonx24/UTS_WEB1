export interface CompanyInfoItem {
  id: string;
  code: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  updatedAt: string;
  readTime: string;
  leadDivision: string;
  highlights: string[];
  details: string[];
  specs: { label: string; value: string }[];
}

export const COMPANY_INFO: CompanyInfoItem[] = [
  {
    id: 'profil-perusahaan',
    code: 'INF-01',
    category: 'Profil Perusahaan',
    title: 'Profil dan Arsitektur Kerja RakitStudio',
    summary: 'Mengenal struktur tim, pendekatan rekayasa perangkat lunak, dan fokus pengembangan sistem web untuk perusahaan menengah di Bandung.',
    image: '/images/studio-hero.jpg',
    imageAlt: 'Interior ruang kerja utama RakitStudio di Bandung dengan meja kayu dan pencahayaan alami',
    updatedAt: '14 Nov 2026',
    readTime: '3 menit baca',
    leadDivision: 'Direktorat Rekayasa',
    highlights: [
      'Berdiri sejak 2022 di Bandung dengan 18 insinyur web, desainer sistem, dan spesialis infrastruktur.',
      'Fokus pada aplikasi internal perusahaan, portal pelanggan, serta integrasi API lintas departemen.',
      'Menggunakan TypeScript secara penuh dari antarmuka hingga layanan backend untuk menjaga keandalan kode.',
    ],
    details: [
      'RakitStudio dibentuk untuk membantu perusahaan beralih dari pencatatan manual dan spreadsheet terpisah menuju aplikasi web terpusat yang mudah diaudit.',
      'Setiap proyek dikerjakan dalam siklus sprint dua mingguan dengan dokumentasi arsitektur, pengujian otomatis, dan serah terima kode sumber penuh kepada klien.',
      'Kantor operasional kami berlokasi di kawasan Dago, Bandung, dengan jadwal konsultasi teknis tatap muka maupun daring pada hari kerja.',
    ],
    specs: [
      { label: 'Tahun Berdiri', value: '2022' },
      { label: 'Lokasi Studio', value: 'Dago, Bandung' },
      { label: 'Standar Bahasa', value: 'TypeScript Strict' },
      { label: 'Model Rilis', value: 'Sprint 2 Mingguan' },
    ],
  },
  {
    id: 'pengembangan-aplikasi-web',
    code: 'INF-02',
    category: 'Layanan Utama',
    title: 'Pengembangan Aplikasi Web & Portal Bisnis',
    summary: 'Rancang bangun aplikasi operasional seperti manajemen inventori, portal mitra, dan dasbor analitik berbasis TypeScript.',
    image: '/images/team-engineering.jpg',
    imageAlt: 'Dua insinyur RakitStudio berdiskusi meninjau rancangan arsitektur aplikasi web',
    updatedAt: '12 Nov 2026',
    readTime: '4 menit baca',
    leadDivision: 'Divisi Frontend & UI',
    highlights: [
      'Antarmuka responsif di desktop maupun ponsel tanpa ketergantungan plugin berat.',
      'Skema validasi data ketat di sisi klien dan server untuk mencegah input korup.',
      'Komponen antarmuka terstandarisasi agar mudah dikembangkan oleh tim internal klien.',
    ],
    details: [
      'Banyak perusahaan terhambat oleh sistem lama yang lambat atau sulit dipakai di perangkat seluler. Kami membangun ulang antarmuka operasional agar karyawan lapangan dan admin kantor melihat data yang sama secara langsung.',
      'Setiap modul diuji pada resolusi layar mulai dari 390px hingga 1440px serta memenuhi standar aksesibilitas navigasi keyboard.',
    ],
    specs: [
      { label: 'Estimasi Tahap Awal', value: '4–8 Minggu' },
      { label: 'Target Responsivitas', value: '390px – 1440px' },
      { label: 'Format Output', value: 'SPA / Multi-Page' },
      { label: 'Garansi Bug', value: '90 Hari Pasca Rilis' },
    ],
  },
  {
    id: 'infrastruktur-cloud-devops',
    code: 'INF-03',
    category: 'Infrastruktur',
    title: 'Otomasi Deployment & Infrastruktur Cloud',
    summary: 'Penyiapan jalur CI/CD, kontainerisasi Docker, serta pemantauan waktu aktif layanan agar aplikasi tetap stabil saat beban puncak.',
    image: '/images/cloud-infrastructure.jpg',
    imageAlt: 'Rak server infrastruktur cloud dengan manajemen kabel terstruktur',
    updatedAt: '09 Nov 2026',
    readTime: '3 menit baca',
    leadDivision: 'Divisi Cloud & SRE',
    highlights: [
      'Pipeline rilis otomatis yang menjalankan static check dan unit test sebelum tayang.',
      'Cadangan basis data terenkripsi setiap hari dengan uji pemulihan berkala.',
      'Notifikasi insiden langsung ke kanal tim teknis dalam hitungan detik.',
    ],
    details: [
      'Rilis manual lewat unggah berkas sering memicu downtime yang tidak perlu. RakitStudio menata ulang alur build agar setiap perubahan teruji otomatis sebelum menggantikan versi produksi.',
      'Kami juga menyiapkan konfigurasi rollback satu perintah sehingga pembaruan bermasalah dapat dikembalikan dalam waktu kurang dari dua menit.',
    ],
    specs: [
      { label: 'Target Uptime', value: '99.9% SLA' },
      { label: 'Frekuensi Backup', value: 'Harian Otomatis' },
      { label: 'Waktu Rollback', value: '< 2 Menit' },
      { label: 'Kontainerisasi', value: 'Docker & Compose' },
    ],
  },
  {
    id: 'audit-keamanan-sistem',
    code: 'INF-04',
    category: 'Keamanan',
    title: 'Audit Kode Sumber & Keamanan Akses Portal',
    summary: 'Pemeriksaan celah otentikasi, sanitasi input formulir, serta penataan kontrol akses berbasis peran untuk aplikasi web perusahaan.',
    image: '/images/security-audit.jpg',
    imageAlt: 'Meja kerja insinyur keamanan perangkat lunak dengan monitor arsitektur dan papan ketik mekanis',
    updatedAt: '05 Nov 2026',
    readTime: '4 menit baca',
    leadDivision: 'Tim Keamanan Aplikasi',
    highlights: [
      'Evaluasi alur login, manajemen sesi, dan perlindungan rute internal.',
      'Pemindaian dependensi pihak ketiga untuk mendeteksi paket rentan.',
      'Laporan temuan terurut berdasarkan tingkat risiko beserta contoh perbaikannya.',
    ],
    details: [
      'Celah paling sering di aplikasi bisnis muncul dari validasi input yang longgar dan halaman internal yang lupa memeriksa status sesi pengguna.',
      'Tim kami meninjau langsung kode sumber aplikasi, melakukan simulasi akses tidak sah, lalu mendampingi tim pengembang menutup setiap temuan.',
    ],
    specs: [
      { label: 'Durasi Audit', value: '5 Hari Kerja' },
      { label: 'Cakupan Utama', value: 'Auth, Input, API' },
      { label: 'Standar Acuan', value: 'OWASP Top 10' },
      { label: 'Sesi Verifikasi Ulang', value: 'Termasuk 1x Retest' },
    ],
  },
  {
    id: 'studi-kasus-distribusi',
    code: 'INF-05',
    category: 'Portofolio',
    title: 'Modernisasi Portal Logistik PT Sentosa Karya',
    summary: 'Pembangunan ulang sistem pelacakan surat jalan dan stok gudang untuk 14 cabang distribusi di Jawa Barat.',
    image: '/images/logistics-ops.jpg',
    imageAlt: 'Fasilitas gudang distribusi modern dengan rak terorganisir dan jalur logistik otomatis',
    updatedAt: '01 Nov 2026',
    readTime: '5 menit baca',
    leadDivision: 'Tim Implementasi Klien',
    highlights: [
      'Memangkas waktu rekap laporan pengiriman harian dari 3 jam menjadi 15 menit.',
      'Sinkronisasi status barang antar 14 gudang cabang dalam satu dasbor terpadu.',
      'Adopsi pengguna mencapai 96% pada bulan pertama tanpa pelatihan tatap muka panjang.',
    ],
    details: [
      'Sebelumnya seluruh cabang mengirim file spreadsheet setiap sore ke kantor pusat, sehingga selisih stok baru diketahui keesokan harinya.',
      'Setelah sistem web baru diterapkan, kepala gudang mencatat barang masuk dan keluar langsung dari browser, sementara tim keuangan langsung menerima ringkasan siap audit.',
    ],
    specs: [
      { label: 'Jumlah Cabang', value: '14 Gudang Aktif' },
      { label: 'Efisiensi Rekap', value: '3 Jam -> 15 Menit' },
      { label: 'Teknologi Inti', value: 'TypeScript + Tailwind' },
      { label: 'Status Proyek', value: 'Produksi Aktif' },
    ],
  },
  {
    id: 'kebijakan-layanan-sla',
    code: 'INF-06',
    category: 'Kemitraan',
    title: 'Kebijakan Layanan, SLA & Dukungan Teknis',
    summary: 'Ketentuan waktu tanggap dukungan teknis, pemeliharaan rutin bulanan, serta alur pelaporan kendala bagi mitra resmi.',
    image: '/images/team-engineering.jpg',
    imageAlt: 'Tim operasional mitra meninjau dokumentasi layanan dan pemeliharaan bulanan',
    updatedAt: '28 Okt 2026',
    readTime: '3 menit baca',
    leadDivision: 'Operasional Mitra',
    highlights: [
      'Waktu tanggap maksimal 30 menit untuk insiden kritis yang menghentikan layanan.',
      'Pemeliharaan rutin pembaruan keamanan setiap akhir bulan di luar jam sibuk.',
      'Portal khusus mitra untuk memantau tiket kendala dan jadwal rilis terbaru.',
    ],
    details: [
      'Setiap perusahaan mitra memperoleh akses ke Menu Utama Portal RakitStudio untuk memantau status layanan, dokumen teknis, dan progres modul yang sedang berjalan.',
      'Klien dapat mendaftarkan akun tim internal melalui halaman registrasi dan masuk menggunakan kredensial masing-masing.',
    ],
    specs: [
      { label: 'Respon Kritis', value: '< 30 Menit' },
      { label: 'Jam Layanan', value: 'Senin–Jumat 08:00–17:00' },
      { label: 'Pemeliharaan Rutin', value: 'Bulanan Terjadwal' },
      { label: 'Akses Portal', value: 'Akun Terdaftar' },
    ],
  },
];

export function findCompanyInfoById(id: string | null): CompanyInfoItem | undefined {
  if (!id) {
    return undefined;
  }
  return COMPANY_INFO.find((item) => item.id === id);
}
