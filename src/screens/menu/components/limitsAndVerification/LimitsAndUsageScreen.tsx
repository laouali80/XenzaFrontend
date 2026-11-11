import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type KYCTier = "unverified" | "in_review" | "verified";
export type WalletCurrency = "XOF" | "NGN";

export interface CurrencyUsageMetrics {
  largestSingleToday: number;
  totalSentToday: number;
  currentBalance: number;
}

interface LimitsAndUsageScreenProps {
  tier?: KYCTier;
  primaryCurrency?: WalletCurrency;
  hasTwoWallets?: boolean;
  usageByCurrency?: {
    XOF: CurrencyUsageMetrics;
    NGN: CurrencyUsageMetrics;
  };
  onBack?: () => void;
  onStartVerify?: () => void;
}

const DEFAULT_USAGE: Record<WalletCurrency, CurrencyUsageMetrics> = {
  XOF: {
    largestSingleToday: 18000,
    totalSentToday: 19309.8,
    currentBalance: 248900.2,
  },
  NGN: {
    largestSingleToday: 0,
    totalSentToday: 0,
    currentBalance: 412500,
  },
};

const TIER_LIMITS: Record<
  KYCTier,
  Record<
    WalletCurrency,
    {
      perTxLimit: number;
      dailyOutgoingLimit: number;
      walletCap: number | null; // null = "No limit"
    }
  >
> = {
  unverified: {
    XOF: { perTxLimit: 100000, dailyOutgoingLimit: 300000, walletCap: 500000 },
    NGN: { perTxLimit: 150000, dailyOutgoingLimit: 400000, walletCap: 800000 },
  },
  in_review: {
    XOF: { perTxLimit: 300000, dailyOutgoingLimit: 750000, walletCap: 1000000 },
    NGN: {
      perTxLimit: 400000,
      dailyOutgoingLimit: 1000000,
      walletCap: 1500000,
    },
  },
  verified: {
    XOF: { perTxLimit: 2000000, dailyOutgoingLimit: 5000000, walletCap: null },
    NGN: { perTxLimit: 5000000, dailyOutgoingLimit: 10000000, walletCap: null },
  },
};

export default function LimitsAndUsageScreen({
  tier = "verified",
  primaryCurrency = "XOF",
  hasTwoWallets = true,
  usageByCurrency = DEFAULT_USAGE,
  onBack,
  onStartVerify,
}: LimitsAndUsageScreenProps) {
  const [activeCurrency, setActiveCurrency] =
    useState<WalletCurrency>(primaryCurrency);

  const isVerified = tier === "verified";

  const tierTitle =
    tier === "verified"
      ? "Verified"
      : tier === "in_review"
        ? "In review"
        : "Unverified";

  const limits = TIER_LIMITS[tier][activeCurrency];
  const usage = usageByCurrency[activeCurrency];

  const formatMoney = (val: number) => {
    const hasDecimals = val % 1 !== 0;
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return activeCurrency === "XOF"
      ? `${formattedNum} FCFA`
      : `₦${formattedNum}`;
  };

  const perTxPercent = Math.min(
    100,
    (usage.largestSingleToday / limits.perTxLimit) * 100,
  );
  const dailyPercent = Math.min(
    100,
    (usage.totalSentToday / limits.dailyOutgoingLimit) * 100,
  );
  const capPercent =
    limits.walletCap === null
      ? 100
      : Math.min(100, (usage.currentBalance / limits.walletCap) * 100);

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center px-5 pt-3 pb-3.5 border-b border-[#EFECE6]">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back to Menu"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <View>
          <Text className="text-lg font-bold text-[#1A1A1A]">
            Limits & usage
          </Text>
          <Text className="text-xs text-[#666666] mt-0.5">
            Your ceilings and how much you have used.
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 36,
        }}
      >
        {/* Your Tier Status Card */}
        <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-11 h-11 rounded-full bg-[#D8F3E5] items-center justify-center mr-3.5">
                <Text className="text-base text-[#008744]">🛡️</Text>
              </View>
              <View>
                <Text className="text-xs text-[#666666] mb-0.5">Your tier</Text>
                <Text className="text-[17px] font-bold text-[#1A1A1A]">
                  {tierTitle}
                </Text>
              </View>
            </View>

            {isVerified && (
              <View className="w-7 h-7 rounded-full border-[1.5px] border-[#008744] items-center justify-center">
                <Text className="text-xs font-bold text-[#008744]">✓</Text>
              </View>
            )}
          </View>

          {/* Verify Identity CTA Banner (Shown when Unverified or In Review) */}
          {!isVerified && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={
                onStartVerify ?? (() => console.log("Navigate to KYCScreen"))
              }
              className="mt-4 bg-[#E6F5EC] border border-[#C6E8D4] rounded-xl px-3.5 py-3 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1 pr-2">
                <Text className="text-xs text-[#008744] mr-2">🛡️</Text>
                <Text className="text-xs font-semibold text-[#008744]">
                  Verify your identity to raise your limits.
                </Text>
              </View>
              <Text className="text-sm font-bold text-[#008744]">›</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Currency Switcher (Shown when user holds both XOF & NGN wallets) */}
        {hasTwoWallets && (
          <View className="mb-5">
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
              SHOW FEES IN
            </Text>
            <View className="flex-row bg-[#F3EFEA] rounded-full p-1">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setActiveCurrency("XOF")}
                className={`flex-1 py-2.5 rounded-full items-center justify-center ${
                  activeCurrency === "XOF"
                    ? "bg-white border border-[#EAE5DC]"
                    : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    activeCurrency === "XOF"
                      ? "text-[#1A1A1A]"
                      : "text-[#666666]"
                  }`}
                >
                  CFA Franc
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setActiveCurrency("NGN")}
                className={`flex-1 py-2.5 rounded-full items-center justify-center ${
                  activeCurrency === "NGN"
                    ? "bg-white border border-[#EAE5DC]"
                    : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    activeCurrency === "NGN"
                      ? "text-[#1A1A1A]"
                      : "text-[#666666]"
                  }`}
                >
                  Naira
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Limit Cards List */}
        <View className="gap-3.5 mb-5">
          {/* 1. Per Transaction Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                  <Text className="text-sm font-bold text-[#008744]">↑</Text>
                </View>
                <View>
                  <Text className="text-sm font-bold text-[#1A1A1A]">
                    Per transaction
                  </Text>
                  <Text className="text-[11px] text-[#666666] mt-0.5">
                    Largest single payment today
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  {formatMoney(usage.largestSingleToday)}
                </Text>
                <Text className="text-[11px] text-[#666666] mt-0.5">
                  of {formatMoney(limits.perTxLimit)}
                </Text>
              </View>
            </View>

            <View className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden">
              <View
                style={{ width: `${perTxPercent}%` }}
                className="h-full bg-[#009A49] rounded-full"
              />
            </View>
          </View>

          {/* 2. Daily Outgoing Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                  <Text className="text-sm text-[#008744]">📅</Text>
                </View>
                <View>
                  <Text className="text-sm font-bold text-[#1A1A1A]">
                    Daily outgoing
                  </Text>
                  <Text className="text-[11px] text-[#666666] mt-0.5">
                    Total sent today
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  {formatMoney(usage.totalSentToday)}
                </Text>
                <Text className="text-[11px] text-[#666666] mt-0.5">
                  of {formatMoney(limits.dailyOutgoingLimit)}
                </Text>
              </View>
            </View>

            <View className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden">
              <View
                style={{ width: `${dailyPercent}%` }}
                className="h-full bg-[#009A49] rounded-full"
              />
            </View>
          </View>

          {/* 3. Wallet Balance Cap Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                  <Text className="text-sm text-[#008744]">👛</Text>
                </View>
                <View>
                  <Text className="text-sm font-bold text-[#1A1A1A]">
                    Wallet balance cap
                  </Text>
                  <Text className="text-[11px] text-[#666666] mt-0.5">
                    Current wallet balance
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  {formatMoney(usage.currentBalance)}
                </Text>
                <Text className="text-[11px] text-[#666666] mt-0.5">
                  {limits.walletCap === null
                    ? "No limit"
                    : `of ${formatMoney(limits.walletCap)}`}
                </Text>
              </View>
            </View>

            <View className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden">
              <View
                style={{ width: `${capPercent}%` }}
                className={`h-full rounded-full ${
                  limits.walletCap === null ? "bg-[#74C69D]" : "bg-[#009A49]"
                }`}
              />
            </View>
          </View>
        </View>

        {/* Bottom Info Banner */}
        <View className="bg-[#E6F4F1] rounded-xl px-4 py-3.5 flex-row items-center">
          <Text className="text-xs text-[#1E7B6B] mr-2">ⓘ</Text>
          <Text className="text-xs font-medium text-[#2C5E54]">
            {isVerified
              ? "Your daily limit resets at midnight."
              : "Verify your identity to unlock higher limits."}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
