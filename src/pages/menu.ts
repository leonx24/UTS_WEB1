import { COMPANY_INFO, type CompanyInfoItem } from '../data/companyInfo';
import { getActiveSession, logoutSession } from '../utils/auth';
import { renderSiteChrome } from '../utils/layout';

const session = getActiveSession();

if (!session) {
  window.location.replace('/login.html');
} else {
  renderSiteChrome('menu');

  const userNameEl = document.getElementById('menu-user-name');
  const userEmailEl = document.getElementById('menu-user-email');
  const userRoleEl = document.getElementById('menu-user-role');
  const loginTimeEl = document.getElementById('menu-login-time');
  const infoListEl = document.getElementById('menu-info-list');
  const searchInput = document.getElementById('menu-search') as HTMLInputElement | null;
  const logoutBtn = document.getElementById('menu-logout-btn');

  if (userNameEl) userNameEl.textContent = session.fullName;
  if (userEmailEl) userEmailEl.textContent = session.email;
  if (userRoleEl) userRoleEl.textContent = session.role;
  if (loginTimeEl) {
    loginTimeEl.textContent = new Date(session.loginAt).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  function renderTable(items: CompanyInfoItem[]): void {
    if (!infoListEl) {
      return;
    }

    if (items.length === 0) {
      infoListEl.innerHTML = `
        <tr>
          <td colspan="5" class="py-8 text-center text-sm text-muted">
            Tidak ada dokumen yang cocok dengan kata kunci pencarian.
          </td>
        </tr>
      `;
      return;
    }

    infoListEl.innerHTML = items
      .map(
        (item) => `
        <tr class="border-b border-line last:border-b-0 hover:bg-stone transition-colors">
          <td class="py-4 pr-4 text-xs font-medium text-pine">${item.category}</td>
          <td class="py-4 pr-4 text-sm font-medium text-ink">${item.title}</td>
          <td class="hidden py-4 pr-4 text-sm text-muted md:table-cell">${item.leadDivision}</td>
          <td class="hidden py-4 pr-4 text-sm text-muted sm:table-cell">${item.updatedAt}</td>
          <td class="py-4 text-right">
            <a href="/detail.html?id=${encodeURIComponent(item.id)}" class="inline-flex items-center text-sm font-medium text-pine hover:underline">
              Buka
            </a>
          </td>
        </tr>
      `
      )
      .join('');
  }

  renderTable(COMPANY_INFO);

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      const filtered = COMPANY_INFO.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.leadDivision.toLowerCase().includes(query)
      );
      renderTable(filtered);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutSession();
      window.location.href = '/login.html';
    });
  }
}
