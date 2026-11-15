import type { WalletCurrency } from "../types/money";

export function formatMoney(
  amount: number,
  currency: WalletCurrency,
  forceDecimals = false,
): string {
  const hasDecimals = amount % 1 !== 0;
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: forceDecimals || hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  });

  return currency === "XOF" ? `${formatted} FCFA` : `₦${formatted}`;
}

export function sanitizeDecimalInput(value: string): string | null {
  const cleaned = value.replace(/[^0-9.]/g, "");
  if (cleaned.split(".").length > 2) return null;
  return cleaned;
}
