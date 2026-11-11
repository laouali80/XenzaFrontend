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
import { useTx } from "../../../../../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

export type WalletCurrency = "XOF" | "NGN";

interface AirtimePaymentScreenProps {
  providerName?: string;
  currency?: WalletCurrency;
  availableBalance?: number;
  dailyLimit?: number;
  usedToday?: number;
  onBack?: () => void;
  onContinue?: (payload: {
    providerName: string;
    currency: WalletCurrency;
    mobileNumber: string;
    amount: number;
    fee: number;
    totalDebited: number;
  }) => void;
}

const XOF_PRESETS = [2000, 5000, 10000, 20000, 50000];
const NGN_PRESETS = [100, 200, 500, 1000, 2000];

export default function AirtimePaymentScreen({
  providerName = "Airtel Niger",
  currency = "XOF",
  availableBalance,
  dailyLimit,
  usedToday,
  onBack,
  onContinue,
}: AirtimePaymentScreenProps) {
  const tx = useTx();

  const isXof = currency === "XOF";
  const presets = isXof ? XOF_PRESETS : NGN_PRESETS;

  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [rawAmount, setRawAmount] = useState<string>(isXof ? "2000" : "");

  // Defaults matching your two screenshots
  const activeBalance = availableBalance ?? (isXof ? 267908.2 : 149496);
  const activeDailyLimit = dailyLimit ?? (isXof ? 5000000 : 10000000);
  const activeUsedToday = usedToday ?? (isXof ? 1309.8 : 0);

  const formatMoney = (val: number) => {
    const hasDecimals = val % 1 !== 0;
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return isXof ? `${formattedNum} FCFA` : `₦${formattedNum}`;
  };

  const numericAmount = parseFloat(rawAmount) || 0;
  const fee = 0; // 0 FCFA / ₦0 fee on airtime top-ups
  const totalDebited = numericAmount + fee;

  const remainingDailyLimit = Math.max(
    0,
    activeDailyLimit - activeUsedToday - totalDebited,
  );
  const limitUsedPercent = Math.min(
    100,
    ((activeUsedToday + totalDebited) / activeDailyLimit) * 100,
  );

  const isFormValid =
    mobileNumber.trim().length >= 8 &&
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
        {/* Top Header Bar */}
        <View className="flex-row items-center px-5 pt-3 pb-3.5">
          <TouchableOpacity
            onPress={
              onBack ?? (() => console.log("Go back to Choose provider"))
            }
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <Text className="text-lg font-bold text-[#1A1A1A]">
            Payment details
          </Text>
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
          {/* Selected Provider Summary Banner */}
          <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl p-4 flex-row items-center mb-6">
            <View className="w-11 h-11 rounded-xl bg-[#D1F2DF] items-center justify-center mr-3.5">
              <Text className="text-lg text-[#008744]">📱</Text>
            </View>
            <View>
              <Text className="text-[15px] font-bold text-[#1A1A1A]">
                {providerName}
              </Text>
              <Text className="text-xs text-[#666666] mt-0.5">Airtime</Text>
            </View>
          </View>

          {/* MOBILE NUMBER Input */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            MOBILE NUMBER
          </Text>
          <View className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 h-[54px] flex-row items-center justify-between mb-5">
            <TextInput
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholder={isXof ? "96452511" : "07041114444"}
              placeholderTextColor="#B0B0B0"
              keyboardType="phone-pad"
              className="flex-1 text-[15px] font-medium text-[#1A1A1A] h-full"
            />
            <Text className="text-[10px] font-bold text-[#888888] tracking-wider ml-2">
              PHONE
            </Text>
          </View>

          {/* AMOUNT Input */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            AMOUNT
          </Text>
          <View className="bg-white border-[1.5px] border-[#009A49] rounded-2xl px-4 h-[62px] flex-row items-center justify-between mb-3">
            <TextInput
              value={rawAmount}
              onChangeText={handleAmountChange}
              placeholder="0"
              placeholderTextColor="#B0B0B0"
              keyboardType="decimal-pad"
              className="flex-1 text-[24px] font-bold text-[#1A1A1A] h-full"
            />
            <Text className="text-sm font-semibold text-[#666666] ml-2">
              {isXof ? "FCFA" : "NGN"}
            </Text>
          </View>

          {/* Quick Amount Preset Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
            className="mb-6"
          >
            {presets.map((preset) => {
              const isSelected = numericAmount === preset;
              return (
                <TouchableOpacity
                  key={preset}
                  activeOpacity={0.8}
                  onPress={() => setRawAmount(String(preset))}
                  className={`px-3.5 py-2 rounded-full border ${
                    isSelected
                      ? "bg-[#E6F5EC] border-[#52B788]"
                      : "bg-[#FAF8F5] border-[#E5E0D8]"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isSelected ? "text-[#008744]" : "text-[#4A4A4A]"
                    }`}
                  >
                    {preset.toLocaleString("en-US")}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Pay From, Fee & Total Debited Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 gap-3 mb-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-[#666666]">Pay from</Text>
              <Text className="text-xs font-bold text-[#1A1A1A]">
                {currency} wallet
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-[#666666]">Fee</Text>
              <Text className="text-xs font-bold text-[#1A1A1A]">
                {formatMoney(fee)}
              </Text>
            </View>

            <View className="border-t border-[#E8E3D9] pt-3 flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-[#1A1A1A]">
                Total debited
              </Text>
              <Text className="text-[15px] font-bold text-[#008744]">
                {formatMoney(totalDebited)}
              </Text>
            </View>
          </View>

          {/* Daily Limit Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-6">
            <View className="flex-row items-center justify-between mb-2.5">
              <View className="flex-row items-center">
                <Text className="text-xs text-[#008744] mr-1.5">🛡️</Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  Daily limit
                </Text>
              </View>
              <Text className="text-[11px] text-[#666666]">
                {formatMoney(activeUsedToday)} of{" "}
                {formatMoney(activeDailyLimit)} used today
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden mb-2">
              <View
                style={{ width: `${limitUsedPercent}%` }}
                className="h-full bg-[#009A49] rounded-full"
              />
            </View>

            <Text className="text-[11px] text-[#666666]">
              {formatMoney(remainingDailyLimit)} left today
            </Text>
          </View>

          {/* Insufficient Balance Warning */}
          {totalDebited > activeBalance && (
            <Text className="text-xs font-medium text-[#C86D1F] text-center mb-3">
              Insufficient balance in your {currency} wallet.
            </Text>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!isFormValid}
            onPress={() =>
              onContinue?.({
                providerName,
                currency,
                mobileNumber: mobileNumber.trim(),
                amount: numericAmount,
                fee,
                totalDebited,
              })
            }
            className={`h-[54px] rounded-xl items-center justify-center ${
              isFormValid ? "bg-[#009A49]" : "bg-[#8FD1AE]"
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
