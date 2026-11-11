import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTx } from "../../../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

export type WalletCurrency = "XOF" | "NGN";

interface ConvertAmountScreenProps {
  fromCurrency?: WalletCurrency;
  availableBalance?: number;
  dailyLimit?: number;
  usedToday?: number;
  onBack?: () => void;
  onContinue?: (conversionDetails: {
    fromCurrency: WalletCurrency;
    toCurrency: WalletCurrency;
    amountToConvert: number;
    rateLabel: string;
    fee: number;
    totalDebited: number;
    youReceive: number;
  }) => void;
}

export default function ConvertAmountScreen({
  fromCurrency = "XOF",
  availableBalance,
  dailyLimit,
  usedToday,
  onBack,
  onContinue,
}: ConvertAmountScreenProps) {
  const tx = useTx();

  const [rawAmount, setRawAmount] = useState<string>("1000");

  const isXofToNgn = fromCurrency === "XOF";
  const toCurrency: WalletCurrency = isXofToNgn ? "NGN" : "XOF";

  // Default values matching your two screenshots
  const activeBalance = availableBalance ?? (isXofToNgn ? 267908.2 : 149496);
  const activeDailyLimit = dailyLimit ?? (isXofToNgn ? 5000000 : 10000000);
  const activeUsedToday = usedToday ?? (isXofToNgn ? 301.8 : 0);

  const rateLabel = isXofToNgn ? "1,000 FCFA = ₦2,400" : "₦1,000 = 420 FCFA";

  const conversionMultiplier = isXofToNgn ? 2.4 : 0.42;

  const formatMoney = (val: number, currency: WalletCurrency) => {
    const hasDecimals = val % 1 !== 0;
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return currency === "XOF" ? `${formattedNum} FCFA` : `₦${formattedNum}`;
  };

  // Calculations (0.8% fee matching 1,000 -> 8 fee & 1,008 total debited)
  const numericAmount = parseFloat(rawAmount) || 0;
  const fee =
    numericAmount > 0 ? Number((numericAmount * 0.008).toFixed(2)) : 0;
  const totalDebited = Number((numericAmount + fee).toFixed(2));
  const youReceive = Number((numericAmount * conversionMultiplier).toFixed(2));

  const remainingDailyLimit = Math.max(
    0,
    activeDailyLimit - activeUsedToday - totalDebited,
  );
  const limitUsedPercent = Math.min(
    100,
    ((activeUsedToday + totalDebited) / activeDailyLimit) * 100,
  );

  const isAmountValid =
    numericAmount > 0 &&
    totalDebited <= activeBalance &&
    totalDebited <= activeDailyLimit - activeUsedToday;

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    setRawAmount(cleaned);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Header */}
        <View className="flex-row items-center px-5 pt-3 pb-3.5">
          <TouchableOpacity
            onPress={onBack ?? (() => console.log("Go back to Convert"))}
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <Text className="text-lg font-bold text-[#1A1A1A]">How much?</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 6,
            paddingBottom: 32,
          }}
        >
          {/* Available Balance Summary Card */}
          <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl px-4 py-4 mb-6">
            <Text className="text-xs font-medium text-[#666666] mb-1">
              Available balance
            </Text>
            <Text className="text-[22px] font-extrabold text-[#1A1A1A]">
              {formatMoney(activeBalance, fromCurrency)}
            </Text>
          </View>

          {/* AMOUNT TO CONVERT Input */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            AMOUNT TO CONVERT
          </Text>
          <View className="bg-white border-[1.5px] border-[#009A49] rounded-2xl px-4 h-[64px] flex-row items-center justify-between mb-4">
            <TextInput
              value={rawAmount}
              onChangeText={handleAmountChange}
              placeholder="0"
              placeholderTextColor="#B0B0B0"
              keyboardType="decimal-pad"
              autoFocus
              className="flex-1 text-[26px] font-bold text-[#1A1A1A] h-full"
            />
            <Text className="text-sm font-semibold text-[#666666] ml-2">
              {isXofToNgn ? "FCFA" : "NGN"}
            </Text>
          </View>

          {/* Daily Limit Progress Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-2.5">
              <View className="flex-row items-center">
                <Text className="text-xs text-[#008744] mr-1.5">🛡️</Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  Daily limit
                </Text>
              </View>
              <Text className="text-[11px] text-[#666666]">
                {formatMoney(activeUsedToday, fromCurrency)} of{" "}
                {formatMoney(activeDailyLimit, fromCurrency)} used today
              </Text>
            </View>

            {/* Progress Track */}
            <View className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden mb-2">
              <View
                style={{ width: `${limitUsedPercent}%` }}
                className="h-full bg-[#009A49] rounded-full"
              />
            </View>

            <Text className="text-[11px] text-[#666666]">
              {formatMoney(remainingDailyLimit, fromCurrency)} left today
            </Text>
          </View>

          {/* Corridor Rate, Fee & You Receive Breakdown Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 gap-3 mb-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-[#666666]">Corridor rate</Text>
              <Text className="text-xs font-bold text-[#1A1A1A]">
                {rateLabel}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-[#666666]">Fee</Text>
              <Text className="text-xs font-bold text-[#1A1A1A]">
                {formatMoney(fee, fromCurrency)}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-[#666666]">Total debited</Text>
              <Text className="text-xs font-bold text-[#1A1A1A]">
                {formatMoney(totalDebited, fromCurrency)}
              </Text>
            </View>

            <View className="border-t border-[#E8E3D9] pt-3 flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-[#1A1A1A]">
                You receive
              </Text>
              <Text className="text-[15px] font-bold text-[#008744]">
                {formatMoney(youReceive, toCurrency)}
              </Text>
            </View>
          </View>

          {/* Insufficient Balance Warning */}
          {totalDebited > activeBalance && (
            <Text className="text-xs font-medium text-[#C86D1F] text-center mb-3">
              Insufficient balance in your {fromCurrency} wallet.
            </Text>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!isAmountValid}
            onPress={() =>
              onContinue?.({
                fromCurrency,
                toCurrency,
                amountToConvert: numericAmount,
                rateLabel,
                fee,
                totalDebited,
                youReceive,
              })
            }
            className={`h-[54px] rounded-xl items-center justify-center ${
              isAmountValid ? "bg-[#009A49]" : "bg-[#8FD1AE]"
            }`}
          >
            <Text className="text-white text-base font-semibold">
              {tx.screens.preAuthCTA.continueBtn}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
