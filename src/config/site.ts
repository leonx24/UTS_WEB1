export const SITE_CONFIG = {
  companyName: 'RakitStudio',
  tagline: 'Studio rekayasa web & sistem internal bisnis.',
  city: 'Bandung',
  studentNpm: '24552011205',
  studentName: 'AFFARI RIZKY FEBRIANSYAH',
  studentClass: 'TIF RP 24B CID',
} as const;

export function getCopyrightText(): string {
  return `@Copyright by ${SITE_CONFIG.studentNpm}_${SITE_CONFIG.studentName}_${SITE_CONFIG.studentClass}`;
}

