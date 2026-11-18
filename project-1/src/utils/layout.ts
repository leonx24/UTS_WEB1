import { SITE_CONFIG, getCopyrightText } from '../config/site';
import { getActiveSession, logoutSession } from './auth';

export type ActivePage = 'home' | 'detail' | 'login' | 'register' | 'menu';

const BRAND_MARK = `
  <svg class="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.6"/>
    <path d="M8 16V8h4.5a2.5 2.5 0 0 1 0 5H8m4 0 3.5 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

export function renderSiteChrome(activePage: ActivePage): void {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  const session = getActiveSession();

  if (headerEl) {
    const authDesktop = session
      ? `
        <a href="/menu.html" class="inline-flex h-9 items-center rounded px-3 text-sm font-medium ${activePage === 'menu' ? 'text-pine' : 'text-ink hover:text-pine'} transition">Menu Utama</a>
        <button type="button" data-logout-btn class="inline-flex h-9 items-center rounded border border-line-strong bg-paper px-4 text-sm font-medium text-ink transition hover:border-ink cursor-pointer">Keluar</button>
      `
      : `
        <a href="/login.html" class="inline-flex h-9 items-center rounded px-3 text-sm font-medium ${activePage === 'login' ? 'text-pine' : 'text-ink/80 hover:text-ink'} transition">Masuk</a>
        <a href="/register.html" class="inline-flex h-9 items-center rounded bg-pine px-4 text-sm font-medium text-white transition hover:bg-pine-dark">Daftar</a>
      `;

    const authMobile = session
      ? `
        <a href="/menu.html" class="flex h-12 items-center border-b border-line text-base font-medium text-ink">Menu Utama</a>
        <button type="button" data-logout-btn class="mt-4 flex h-11 w-full items-center justify-center rounded bg-ink px-4 text-sm font-medium text-white cursor-pointer">Keluar</button>
      `
      : `
        <a href="/login.html" class="flex h-12 items-center border-b border-line text-base font-medium text-ink">Masuk Portal</a>
        <a href="/register.html" class="mt-4 flex h-11 w-full items-center justify-center rounded bg-pine px-4 text-sm font-medium text-white">Daftar Akun</a>
      `;

    headerEl.innerHTML = `
      <header class="fixed inset-x-0 top-0 z-30 h-[72px] border-b border-line bg-paper">
        <div class="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 lg:px-16">
          <a href="/index.html" class="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-ink">
            ${BRAND_MARK}
            <span>${SITE_CONFIG.companyName}</span>
          </a>

          <nav class="hidden items-center gap-8 md:flex" aria-label="Navigasi Utama">
            <a href="/index.html" ${activePage === 'home' ? 'aria-current="page"' : ''} class="text-sm font-medium ${activePage === 'home' ? 'text-pine' : 'text-muted hover:text-ink'} transition">Beranda</a>
            <a href="/index.html#informasi" ${activePage === 'detail' ? 'aria-current="page"' : ''} class="text-sm font-medium ${activePage === 'detail' ? 'text-pine' : 'text-muted hover:text-ink'} transition">Informasi</a>
            <a href="/index.html#pendekatan" class="text-sm font-medium text-muted transition hover:text-ink">Pendekatan</a>
          </nav>

          <div class="hidden items-center gap-3 md:flex">
            ${authDesktop}
          </div>

          <button
            type="button"
            id="mobile-menu-toggle"
            aria-expanded="false"
            aria-controls="mobile-menu-panel"
            aria-label="Buka menu navigasi"
            class="inline-flex h-10 w-10 items-center justify-center rounded border border-line bg-paper text-ink md:hidden cursor-pointer"
          >
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M3 6h14M3 10h14M3 14h14" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div id="mobile-menu-panel" class="hidden border-b border-line bg-paper px-6 pb-6 pt-2 md:hidden">
          <nav class="flex flex-col" aria-label="Navigasi Seluler">
            <a href="/index.html" class="flex h-12 items-center border-b border-line text-base font-medium text-ink">Beranda</a>
            <a href="/index.html#informasi" class="flex h-12 items-center border-b border-line text-base font-medium text-ink">Informasi Perusahaan</a>
            <a href="/index.html#pendekatan" class="flex h-12 items-center border-b border-line text-base font-medium text-ink">Pendekatan</a>
            ${authMobile}
          </nav>
        </div>
      </header>
    `;

    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobilePanel = document.getElementById('mobile-menu-panel');
    if (toggleBtn && mobilePanel) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', String(!isOpen));
        mobilePanel.classList.toggle('hidden', isOpen);
      });
    }

    document.querySelectorAll('[data-logout-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        logoutSession();
        window.location.href = '/login.html';
      });
    });
  }

  if (footerEl) {
    footerEl.innerHTML = `
      <footer class="border-t border-line bg-stone text-ink">
        <div class="mx-auto max-w-[1280px] px-6 py-14 lg:px-16">
          <div class="grid gap-10 md:grid-cols-12">
            <div class="md:col-span-5">
              <a href="/index.html" class="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-ink">
                ${BRAND_MARK}
                <span>${SITE_CONFIG.companyName}</span>
              </a>
              <p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Studio rekayasa perangkat lunak di Dago, ${SITE_CONFIG.city}. Membangun aplikasi operasional dan infrastruktur web berbasis TypeScript sejak 2022.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
              <div>
                <h3 class="text-xs font-medium text-muted">Direktori</h3>
                <ul class="mt-3 space-y-2.5 text-sm">
                  <li><a href="/index.html" class="text-ink transition hover:text-pine">Halaman Utama</a></li>
                  <li><a href="/index.html#informasi" class="text-ink transition hover:text-pine">Informasi Perusahaan</a></li>
                  <li><a href="/detail.html?id=profil-perusahaan" class="text-ink transition hover:text-pine">Profil Studio</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-xs font-medium text-muted">Portal</h3>
                <ul class="mt-3 space-y-2.5 text-sm">
                  <li><a href="/login.html" class="text-ink transition hover:text-pine">Masuk</a></li>
                  <li><a href="/register.html" class="text-ink transition hover:text-pine">Registrasi</a></li>
                  <li><a href="/menu.html" class="text-ink transition hover:text-pine">Menu Utama</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-xs font-medium text-muted">Studio</h3>
                <ul class="mt-3 space-y-2.5 text-sm text-muted">
                  <li>Dago, ${SITE_CONFIG.city}</li>
                  <li>Senin–Jumat, 08:00–17:00</li>
                  <li><a href="mailto:halo@rakitstudio.example" class="text-ink transition hover:text-pine">halo@rakitstudio.example</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p class="font-mono text-xs text-ink">${getCopyrightText()}</p>
            <p class="text-xs text-muted">RakitStudio Bandung</p>
          </div>
        </div>
      </footer>
    `;
  }
}
