CREATE DATABASE IF NOT EXISTS rakitstudio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rakitstudio_db;

DROP TABLE IF EXISTS company_info;

CREATE TABLE company_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) NOT NULL,
  category VARCHAR(60) NOT NULL,
  title VARCHAR(180) NOT NULL,
  summary TEXT NOT NULL,
  lead_division VARCHAR(100) NOT NULL,
  updated_at VARCHAR(40) NOT NULL,
  read_time VARCHAR(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO company_info (code, category, title, summary, lead_division, updated_at, read_time) VALUES
('INF-01', 'Profil Perusahaan', 'Profil dan Arsitektur Kerja RakitStudio', 'Mengenal struktur tim, pendekatan rekayasa perangkat lunak, dan fokus pengembangan sistem web untuk perusahaan menengah di Bandung.', 'Direktorat Rekayasa', '14 Nov 2026', '3 menit baca'),
('INF-02', 'Layanan Utama', 'Pengembangan Aplikasi Web & Portal Bisnis', 'Rancang bangun aplikasi operasional seperti manajemen inventori, portal mitra, dan dasbor analitik berbasis TypeScript.', 'Divisi Frontend & UI', '12 Nov 2026', '4 menit baca'),
('INF-03', 'Infrastruktur', 'Otomasi Deployment & Infrastruktur Cloud', 'Penyiapan jalur CI/CD, kontainerisasi Docker, serta pemantauan waktu aktif layanan agar aplikasi tetap stabil saat beban puncak.', 'Divisi Cloud & SRE', '09 Nov 2026', '3 menit baca'),
('INF-04', 'Keamanan', 'Audit Kode Sumber & Keamanan Akses Portal', 'Pemeriksaan celah otentikasi, sanitasi input formulir, serta penataan kontrol akses berbasis peran untuk aplikasi web perusahaan.', 'Tim Keamanan Aplikasi', '05 Nov 2026', '4 menit baca'),
('INF-05', 'Portofolio', 'Modernisasi Portal Logistik PT Sentosa Karya', 'Pembangunan ulang sistem pelacakan surat jalan dan stok gudang untuk 14 cabang distribusi di Jawa Barat.', 'Tim Implementasi Klien', '01 Nov 2026', '5 menit baca'),
('INF-06', 'Kemitraan', 'Kebijakan Layanan, SLA & Dukungan Teknis', 'Ketentuan waktu tanggap dukungan teknis, pemeliharaan rutin bulanan, serta alur pelaporan kendala bagi mitra resmi.', 'Operasional Mitra', '28 Okt 2026', '3 menit baca');
