import { useMemo } from "react";
import type { WalletCurrency } from "../types/money";
import {
  DEFAULT_SERVICE_BALANCE,
  DEFAULT_SERVICE_DAILY_LIMIT,
} from "../constants/servicePayment";

interface UseServicePaymentOptions {
  currency: WalletCurrency;
  amount: number;
  fee?: number;
  availableBalance?: number;
  dailyLimit?: number;
  usedToday?: number;
  minimumRecipientLength: number;
  recipient: string;
  hasSelection?: boolean;
}

export function useServicePayment({
  currency,
  amount,
  fee = 0,
  availableBalance,
  dailyLimit,
  usedToday = 0,
  minimumRecipientLength,
  recipient,
  hasSelection = true,
}: UseServicePaymentOptions) {
  const activeBalance = availableBalance ?? DEFAULT_SERVICE_BALANCE[currency];
  const activeDailyLimit =
    dailyLimit ?? DEFAULT_SERVICE_DAILY_LIMIT[currency];
  const totalDebited = Number((amount + fee).toFixed(2));

  return useMemo(() => {
    const remainingDailyLimit = Math.max(
      0,
      activeDailyLimit - usedToday - totalDebited,
    );
    const limitUsedPercent =
      activeDailyLimit > 0
        ? Math.min(100, ((usedToday + totalDebited) / activeDailyLimit) * 100)
        : 0;
    const isFormValid =
      recipient.trim().length >= minimumRecipientLength &&
      hasSelection &&
      totalDebited > 0 &&
      totalDebited <= activeBalance &&
      totalDebited <= activeDailyLimit - usedToday;

    return {
      activeBalance,
      activeDailyLimit,
      remainingDailyLimit,
      limitUsedPercent,
      totalDebited,
      isFormValid,
    };
  }, [
    activeBalance,
    activeDailyLimit,
    hasSelection,
    minimumRecipientLength,
    recipient,
    totalDebited,
    usedToday,
  ]);
}
