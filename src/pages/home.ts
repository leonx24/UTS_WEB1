import { COMPANY_INFO, type CompanyInfoItem } from '../data/companyInfo';
import { renderSiteChrome } from '../utils/layout';

renderSiteChrome('home');

interface ShowcaseTab {
  id: string;
  label: string;
  targetId: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
}

const SHOWCASE_TABS: ShowcaseTab[] = [
  {
    id: 'aplikasi',
    label: 'Aplikasi Bisnis',
    targetId: 'pengembangan-aplikasi-web',
    title: 'Sistem operasional terpusat berbasis web',
    description:
      'Menggantikan pencatatan manual dan berkas terpisah dengan portal terpadu yang berjalan konsisten di desktop maupun seluler.',
    metrics: [
      { label: 'Siklus pengembangan', value: 'Sprint 2 mingguan' },
      { label: 'Jangkauan layar', value: '390px hingga 1440px' },
      { label: 'Masa garansi rilis', value: '90 hari penuh' },
    ],
  },
  {
    id: 'cloud',
    label: 'Infrastruktur Cloud',
    targetId: 'infrastruktur-cloud-devops',
    title: 'Deployment terotomasi dan pemantauan aktif',
    description:
      'Jalur rilis teruji dengan cadangan basis data harian terenkripsi serta kemampuan pemulihan cepat saat terjadi gangguan.',
    metrics: [
      { label: 'Komitmen waktu aktif', value: '99.9% SLA' },
      { label: 'Cadangan data', value: 'Harian otomatis' },
      { label: 'Pemulihan versi', value: 'Di bawah 2 menit' },
    ],
  },
  {
    id: 'keamanan',
    label: 'Audit & Keamanan',
    targetId: 'audit-keamanan-sistem',
    title: 'Pemeriksaan otentikasi dan kontrol akses',
    description:
      'Peninjauan menyeluruh terhadap validasi formulir, manajemen sesi pengguna, dan ketahanan API sebelum aplikasi dirilis luas.',
    metrics: [
      { label: 'Durasi evaluasi', value: '5 hari kerja' },
      { label: 'Standar acuan', value: 'OWASP Top 10' },
      { label: 'Verifikasi ulang', value: 'Termasuk 1x retest' },
    ],
  },
];

const showcaseTabsEl = document.getElementById('showcase-tabs');
const showcasePanelEl = document.getElementById('showcase-panel');
let activeTabId = SHOWCASE_TABS[0].id;

function renderShowcase(): void {
  if (!showcaseTabsEl || !showcasePanelEl) {
    return;
  }

  showcaseTabsEl.innerHTML = SHOWCASE_TABS.map((tab) => {
    const isActive = tab.id === activeTabId;
    return `
      <button
        type="button"
        role="tab"
        aria-selected="${isActive}"
        data-showcase-tab="${tab.id}"
        class="px-4 py-3 text-sm font-medium transition cursor-pointer border-b-2 ${
          isActive
            ? 'border-pine text-ink'
            : 'border-transparent text-muted hover:text-ink'
        }"
      >
        ${tab.label}
      </button>
    `;
  }).join('');

  const current = SHOWCASE_TABS.find((t) => t.id === activeTabId) ?? SHOWCASE_TABS[0];

  showcasePanelEl.innerHTML = `
    <div class="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
      <div class="lg:col-span-6">
        <h2 class="text-2xl font-medium tracking-tight text-ink sm:text-3xl">${current.title}</h2>
        <p class="mt-3 max-w-xl text-base leading-relaxed text-muted">${current.description}</p>
        <div class="mt-6">
          <a href="/detail.html?id=${encodeURIComponent(current.targetId)}" class="inline-flex items-center gap-2 text-sm font-medium text-pine hover:underline">
            Buka dokumen teknis
            <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M3.5 8h9m0 0L9 4.5M12.5 8L9 11.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <dl class="divide-y divide-line border-y border-line lg:col-span-5 lg:col-start-8">
        ${current.metrics
          .map(
            (m) => `
          <div class="flex items-center justify-between gap-4 py-3.5 text-sm">
            <dt class="text-muted">${m.label}</dt>
            <dd class="font-medium text-ink tabular-nums">${m.value}</dd>
          </div>
        `
          )
          .join('')}
      </dl>
    </div>
  `;

  showcaseTabsEl.querySelectorAll<HTMLButtonElement>('[data-showcase-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTabId = btn.dataset.showcaseTab ?? SHOWCASE_TABS[0].id;
      renderShowcase();
    });
  });
}

const listContainer = document.getElementById('info-grid');
const filterContainer = document.getElementById('category-filters');
const categories = ['Semua', ...new Set(COMPANY_INFO.map((item) => item.category))];
let activeCategory = 'Semua';

function renderCards(items: CompanyInfoItem[]): void {
  if (!listContainer) {
    return;
  }

  listContainer.innerHTML = items
    .map(
      (item) => `
      <a
        href="/detail.html?id=${encodeURIComponent(item.id)}"
        class="group flex flex-col justify-between border-b border-r border-line bg-paper p-7 transition-colors duration-150 hover:bg-stone sm:p-9"
      >
        <div>
          <div class="overflow-hidden border border-line bg-stone">
            <img
              src="${item.image}"
              alt="${item.imageAlt}"
              class="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            >
          </div>
          <div class="mt-6 flex items-center justify-between gap-4 text-xs text-muted">
            <span class="font-medium text-pine">${item.category}</span>
            <span>${item.updatedAt}</span>
          </div>
          <h3 class="mt-3 text-xl font-medium leading-snug tracking-tight text-ink group-hover:text-pine transition-colors sm:text-2xl">
            ${item.title}
          </h3>
          <p class="mt-3 text-[15px] leading-relaxed text-muted">
            ${item.summary}
          </p>
        </div>

        <div class="mt-8 flex items-center justify-between pt-4 text-sm">
          <span class="text-xs text-muted">${item.leadDivision}</span>
          <span class="inline-flex items-center gap-1.5 font-medium text-ink group-hover:text-pine transition-colors">
            Baca detail
            <svg class="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M3.5 8h9m0 0L9 4.5M12.5 8L9 11.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </a>
    `
    )
    .join('');
}

function renderFilters(): void {
  if (!filterContainer) {
    return;
  }

  filterContainer.innerHTML = categories
    .map((category) => {
      const isActive = category === activeCategory;
      return `
        <button
          type="button"
          data-category="${category}"
          class="px-3.5 py-2 text-sm font-medium rounded transition cursor-pointer ${
            isActive
              ? 'bg-ink text-white'
              : 'text-muted hover:bg-stone hover:text-ink'
          }"
        >
          ${category}
        </button>
      `;
    })
    .join('');

  filterContainer.querySelectorAll<HTMLButtonElement>('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.category ?? 'Semua';
      activeCategory = next;
      const filtered =
        next === 'Semua'
          ? COMPANY_INFO
          : COMPANY_INFO.filter((item) => item.category === next);
      renderFilters();
      renderCards(filtered);
    });
  });
}

renderShowcase();
renderFilters();
renderCards(COMPANY_INFO);
