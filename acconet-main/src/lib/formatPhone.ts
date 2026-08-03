// Formats an Algerian phone number for display.
//
// Arabic requirement: " +213 541929168" — a leading space, then
// "+213", a space, then the remaining digits run together with no
// spaces in between.
//
// French/English: grouped in pairs for readability, e.g.
// "+213 541 92 91 68" — matches the format used elsewhere in the
// app (Register.tsx placeholder, etc.)
export const formatAlgerianPhone = (
  rawPhone: string | null | undefined,
  language: 'ar' | 'fr' | 'en'
): string => {
  if (!rawPhone) return '';

  const digitsOnly = rawPhone.replace(/\D/g, '');

  // Strip a leading "213" country code, or a leading local "0",
  // so we're left with just the 9-digit local number.
  let local = digitsOnly;
  if (local.startsWith('213')) {
    local = local.slice(3);
  } else if (local.startsWith('0')) {
    local = local.slice(1);
  }

  if (!local) return rawPhone;

  if (language === 'ar') {
    return ` +213 ${local}`;
  }

  // Group into: XXX XX XX XX (only when we have the expected 9 digits —
  // otherwise fall back to the ungrouped digits rather than guessing).
  const grouped = local.length === 9
    ? local.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4')
    : local;

  return `+213 ${grouped}`;
};
