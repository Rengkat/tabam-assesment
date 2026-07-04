export function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export const passwordRequirements = [
  { label: "At least 8 characters", check: (p: string) => p.length >= 8 },
  { label: "Uppercase & lowercase", check: (p: string) => /[A-Z]/.test(p) && /[a-z]/.test(p) },
  { label: "Contains a number", check: (p: string) => /[0-9]/.test(p) },
  { label: "Contains a special character", check: (p: string) => /[^A-Za-z0-9]/.test(p) },
];
