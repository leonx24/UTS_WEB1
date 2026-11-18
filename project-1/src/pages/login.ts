import { DEMO_ACCOUNT, getActiveSession, validateLogin } from '../utils/auth';
import { renderSiteChrome } from '../utils/layout';

renderSiteChrome('login');

const form = document.getElementById('login-form') as HTMLFormElement | null;
const emailInput = document.getElementById('login-email') as HTMLInputElement | null;
const passwordInput = document.getElementById('login-password') as HTMLInputElement | null;
const emailError = document.getElementById('login-email-error');
const passwordError = document.getElementById('login-password-error');
const statusBox = document.getElementById('login-status');
const fillDemoBtn = document.getElementById('fill-demo-btn');
const togglePasswordBtn = document.getElementById('toggle-login-password');
const activeNotice = document.getElementById('active-session-notice');

if (getActiveSession() && activeNotice) {
  activeNotice.classList.remove('hidden');
}

function clearErrors(): void {
  if (emailInput) emailInput.removeAttribute('aria-invalid');
  if (passwordInput) passwordInput.removeAttribute('aria-invalid');
  if (emailError) emailError.textContent = '';
  if (passwordError) passwordError.textContent = '';
  if (statusBox) {
    statusBox.textContent = '';
    statusBox.className = 'hidden rounded-md px-4 py-3 text-sm';
  }
}

if (fillDemoBtn && emailInput && passwordInput) {
  fillDemoBtn.addEventListener('click', () => {
    emailInput.value = DEMO_ACCOUNT.email;
    passwordInput.value = DEMO_ACCOUNT.password;
    clearErrors();
  });
}

if (togglePasswordBtn && passwordInput) {
  togglePasswordBtn.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePasswordBtn.textContent = isHidden ? 'Sembunyikan' : 'Tampilkan';
  });
}

if (emailInput) {
  emailInput.addEventListener('input', () => {
    emailInput.removeAttribute('aria-invalid');
    if (emailError) emailError.textContent = '';
    if (statusBox) statusBox.className = 'hidden rounded px-4 py-3 text-sm';
  });
}

if (passwordInput) {
  passwordInput.addEventListener('input', () => {
    passwordInput.removeAttribute('aria-invalid');
    if (passwordError) passwordError.textContent = '';
    if (statusBox) statusBox.className = 'hidden rounded px-4 py-3 text-sm';
  });
}

if (form && emailInput && passwordInput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const result = validateLogin(emailInput.value, passwordInput.value);

    if (result.ok) {
      if (statusBox) {
        statusBox.textContent = result.message;
        statusBox.className =
          'rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900';
      }
      window.location.href = '/menu.html';
    } else {
      if (result.field === 'email') {
        emailInput.setAttribute('aria-invalid', 'true');
        if (emailError) emailError.textContent = result.message;
        emailInput.focus();
      } else if (result.field === 'password') {
        passwordInput.setAttribute('aria-invalid', 'true');
        if (passwordError) passwordError.textContent = result.message;
        passwordInput.focus();
      }

      if (statusBox) {
        statusBox.textContent = result.message;
        statusBox.className =
          'rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-900';
      }
    }
  });
}

