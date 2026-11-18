import { COMPANY_INFO, findCompanyInfoById } from '../data/companyInfo';
import { renderSiteChrome } from '../utils/layout';

renderSiteChrome('detail');

const container = document.getElementById('detail-content');
const params = new URLSearchParams(window.location.search);
const selectedId = params.get('id');
const item = findCompanyInfoById(selectedId) ?? (selectedId === null ? COMPANY_INFO[0] : undefined);

if (container) {
  if (!item) {
    container.innerHTML = `
      <div class="border border-line bg-stone p-8 md:p-14">
        <p class="text-sm font-medium text-pine">404</p>
        <h1 class="mt-2 text-3xl font-medium tracking-tight text-ink">Dokumen informasi tidak ditemukan</h1>
        <p class="mt-3 max-w-xl text-base leading-relaxed text-muted">
          Tautan informasi yang Anda buka tidak tersedia atau telah diperbarui. Silakan kembali ke halaman utama untuk memilih informasi perusahaan.
        </p>
        <div class="mt-7">
          <a href="/index.html#informasi" class="inline-flex h-11 items-center rounded bg-pine px-5 text-sm font-medium text-white transition hover:bg-pine-dark">
            Kembali ke Daftar Informasi
          </a>
        </div>
      </div>
    `;
  } else {
    document.title = `${item.title} — RakitStudio`;
    const otherItems = COMPANY_INFO.filter((entry) => entry.id !== item.id);

    container.innerHTML = `
      <nav aria-label="Breadcrumb" class="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted">
        <a href="/index.html" class="hover:text-ink transition">Beranda</a>
        <span aria-hidden="true">/</span>
        <a href="/index.html#informasi" class="hover:text-ink transition">Informasi Perusahaan</a>
        <span aria-hidden="true">/</span>
        <span class="font-medium text-ink">${item.category}</span>
      </nav>

      <div class="grid gap-12 lg:grid-cols-12">
        <article class="lg:col-span-8">
          <div class="flex flex-wrap items-center gap-4 text-sm text-muted">
            <span class="font-medium text-pine">${item.category}</span>
            <span>Diperbarui ${item.updatedAt}</span>
            <span>${item.readTime}</span>
          </div>

          <h1 class="mt-4 text-3xl font-medium leading-[1.12] tracking-[-0.03em] text-ink sm:text-4xl lg:text-5xl">
            ${item.title}
          </h1>

          <p class="mt-5 max-w-[65ch] text-lg leading-relaxed text-muted">
            ${item.summary}
          </p>

          <div class="mt-8 overflow-hidden border border-line bg-stone">
            <img
              src="${item.image}"
              alt="${item.imageAlt}"
              class="aspect-[16/9] w-full object-cover"
            >
          </div>

          <div class="mt-10 border-t border-line pt-8">
            <h2 class="text-lg font-medium text-ink">Poin Utama</h2>
            <ul class="mt-4 space-y-3.5">
              ${item.highlights
                .map(
                  (point) => `
                  <li class="flex items-start gap-3 text-base leading-relaxed text-ink">
                    <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pine" aria-hidden="true"></span>
                    <span>${point}</span>
                  </li>
                `
                )
                .join('')}
            </ul>
          </div>

          <div class="mt-10 border-t border-line pt-8">
            <h2 class="text-lg font-medium text-ink">Uraian Lengkap</h2>
            <div class="mt-4 max-w-[68ch] space-y-4 text-base leading-relaxed text-ink/85">
              ${item.details.map((paragraph) => `<p>${paragraph}</p>`).join('')}
            </div>
          </div>

          <div class="mt-10 border-t border-line pt-8">
            <h2 class="text-lg font-medium text-ink">Spesifikasi &amp; Parameter</h2>
            <dl class="mt-4 divide-y divide-line border-y border-line">
              <div class="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
                <dt class="text-sm text-muted">Divisi Penanggung Jawab</dt>
                <dd class="text-sm font-medium text-ink">${item.leadDivision}</dd>
              </div>
              ${item.specs
                .map(
                  (spec) => `
                  <div class="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
                    <dt class="text-sm text-muted">${spec.label}</dt>
                    <dd class="text-sm font-medium text-ink tabular-nums">${spec.value}</dd>
                  </div>
                `
                )
                .join('')}
            </dl>
          </div>

          <div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <a href="/index.html#informasi" class="inline-flex h-11 items-center gap-2 rounded border border-line-strong bg-paper px-5 text-sm font-medium text-ink transition hover:border-ink">
              <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path d="M12.5 8h-9m0 0L7 4.5M3.5 8L7 11.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Kembali ke Halaman Utama
            </a>
            <a href="/login.html" class="inline-flex h-11 items-center rounded bg-pine px-5 text-sm font-medium text-white transition hover:bg-pine-dark">
              Masuk Portal Klien
            </a>
          </div>
        </article>

        <aside class="lg:col-span-4">
          <div class="border border-line bg-stone p-6 sm:p-8">
            <h2 class="text-base font-medium text-ink">Dokumen Lainnya</h2>
            <p class="mt-1 text-sm text-muted">Pilih topik lain untuk membaca detailnya.</p>
            <div class="mt-5 divide-y divide-line border-t border-line">
              ${otherItems
                .map(
                  (other) => `
                  <a href="/detail.html?id=${encodeURIComponent(other.id)}" class="group block py-4 transition">
                    <span class="text-xs font-medium text-pine">${other.category}</span>
                    <p class="mt-1 text-sm font-medium text-ink group-hover:text-pine transition-colors">${other.title}</p>
                  </a>
                `
                )
                .join('')}
            </div>
          </div>
        </aside>
      </div>
    `;
  }
}
