import type { WalletCurrency } from "../types/money";

export const DEFAULT_SERVICE_BALANCE: Record<WalletCurrency, number> = {
  XOF: 267908.2,
  NGN: 149496,
};

export const DEFAULT_SERVICE_DAILY_LIMIT: Record<WalletCurrency, number> = {
  XOF: 5000000,
  NGN: 10000000,
};

export const AIRTIME_PRESETS: Record<WalletCurrency, number[]> = {
  XOF: [2000, 5000, 10000, 20000, 50000],
  NGN: [100, 200, 500, 1000, 2000],
};

export const UTILITY_PRESETS: Record<WalletCurrency, number[]> = {
  XOF: [5000, 10000, 20000, 50000, 100000],
  NGN: [500, 1000, 2000, 5000, 10000],
};
