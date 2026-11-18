export interface UserAccount {
  fullName: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

export interface UserSession {
  fullName: string;
  email: string;
  role: string;
  loginAt: string;
}

export interface AuthResult {
  ok: boolean;
  message: string;
  field?: 'fullName' | 'email' | 'password' | 'confirmPassword';
}

const USERS_KEY = 'rakitstudio_users';
const SESSION_KEY = 'rakitstudio_session';

export const DEMO_ACCOUNT: UserAccount = {
  fullName: 'Affari Rizky Febriansyah',
  email: 'affari@rakitstudio.id',
  password: 'Password123',
  role: 'Lead Engineer',
  createdAt: '2026-11-01T08:00:00.000Z',
};

function getStoredUsers(): UserAccount[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    return [DEMO_ACCOUNT];
  }
  try {
    const parsed = JSON.parse(raw) as UserAccount[];
    const hasDemo = parsed.some((user) => user.email.toLowerCase() === DEMO_ACCOUNT.email);
    return hasDemo ? parsed : [DEMO_ACCOUNT, ...parsed];
  } catch {
    return [DEMO_ACCOUNT];
  }
}

function saveUsers(users: UserAccount[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getActiveSession(): UserSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as UserSession;
  } catch {
    return null;
  }
}

export function registerAccount(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
): AuthResult {
  const cleanName = fullName.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (cleanName.length < 3) {
    return {
      ok: false,
      field: 'fullName',
      message: 'Nama lengkap minimal terdiri dari 3 karakter.',
    };
  } else if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return {
      ok: false,
      field: 'email',
      message: 'Masukkan alamat email yang valid (contoh: nama@domain.com).',
    };
  } else if (password.length < 6) {
    return {
      ok: false,
      field: 'password',
      message: 'Kata sandi minimal 6 karakter.',
    };
  } else if (password !== confirmPassword) {
    return {
      ok: false,
      field: 'confirmPassword',
      message: 'Konfirmasi kata sandi tidak cocok.',
    };
  }

  const users = getStoredUsers();
  const existingUser = users.find((user) => user.email.toLowerCase() === cleanEmail);

  if (existingUser) {
    return {
      ok: false,
      field: 'email',
      message: 'Email ini sudah terdaftar. Silakan langsung masuk.',
    };
  }

  const newUser: UserAccount = {
    fullName: cleanName,
    email: cleanEmail,
    password,
    role: 'Anggota Portal',
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);

  return {
    ok: true,
    message: 'Registrasi berhasil. Mengalihkan ke halaman login...',
  };
}

export function validateLogin(email: string, password: string): AuthResult {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    return {
      ok: false,
      field: 'email',
      message: 'Email wajib diisi.',
    };
  } else if (!password) {
    return {
      ok: false,
      field: 'password',
      message: 'Kata sandi wajib diisi.',
    };
  }

  const users = getStoredUsers();
  const matchedUser = users.find((user) => user.email.toLowerCase() === cleanEmail);

  if (!matchedUser) {
    return {
      ok: false,
      field: 'email',
      message: 'Akun dengan email tersebut belum terdaftar.',
    };
  } else if (matchedUser.password !== password) {
    return {
      ok: false,
      field: 'password',
      message: 'Kata sandi yang dimasukkan tidak sesuai.',
    };
  } else {
    const session: UserSession = {
      fullName: matchedUser.fullName,
      email: matchedUser.email,
      role: matchedUser.role,
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return {
      ok: true,
      message: 'Login berhasil. Mengalihkan ke Menu Utama...',
    };
  }
}

export function logoutSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

