import { registerAccount } from '../utils/auth';
import { renderSiteChrome } from '../utils/layout';

renderSiteChrome('register');

const form = document.getElementById('register-form') as HTMLFormElement | null;
const fullNameInput = document.getElementById('reg-fullname') as HTMLInputElement | null;
const emailInput = document.getElementById('reg-email') as HTMLInputElement | null;
const passwordInput = document.getElementById('reg-password') as HTMLInputElement | null;
const confirmInput = document.getElementById('reg-confirm') as HTMLInputElement | null;

const fullNameError = document.getElementById('reg-fullname-error');
const emailError = document.getElementById('reg-email-error');
const passwordError = document.getElementById('reg-password-error');
const confirmError = document.getElementById('reg-confirm-error');
const statusBox = document.getElementById('register-status');

function clearErrors(): void {
  const inputs = [fullNameInput, emailInput, passwordInput, confirmInput];
  const errors = [fullNameError, emailError, passwordError, confirmError];
  inputs.forEach((input) => input?.removeAttribute('aria-invalid'));
  errors.forEach((err) => {
    if (err) err.textContent = '';
  });
  if (statusBox) {
    statusBox.textContent = '';
    statusBox.className = 'hidden rounded-md px-4 py-3 text-sm';
  }
}

[fullNameInput, emailInput, passwordInput, confirmInput].forEach((input, idx) => {
  const errEl = [fullNameError, emailError, passwordError, confirmError][idx];
  input?.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
    if (errEl) errEl.textContent = '';
  });
});

if (form && fullNameInput && emailInput && passwordInput && confirmInput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const result = registerAccount(
      fullNameInput.value,
      emailInput.value,
      passwordInput.value,
      confirmInput.value
    );

    if (result.ok) {
      if (statusBox) {
        statusBox.textContent = result.message;
        statusBox.className =
          'rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900';
      }
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 900);
    } else {
      if (result.field === 'fullName') {
        fullNameInput.setAttribute('aria-invalid', 'true');
        if (fullNameError) fullNameError.textContent = result.message;
        fullNameInput.focus();
      } else if (result.field === 'email') {
        emailInput.setAttribute('aria-invalid', 'true');
        if (emailError) emailError.textContent = result.message;
        emailInput.focus();
      } else if (result.field === 'password') {
        passwordInput.setAttribute('aria-invalid', 'true');
        if (passwordError) passwordError.textContent = result.message;
        passwordInput.focus();
      } else if (result.field === 'confirmPassword') {
        confirmInput.setAttribute('aria-invalid', 'true');
        if (confirmError) confirmError.textContent = result.message;
        confirmInput.focus();
      }

      if (statusBox) {
        statusBox.textContent = result.message;
        statusBox.className =
          'rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-900';
      }
    }
  });
}

