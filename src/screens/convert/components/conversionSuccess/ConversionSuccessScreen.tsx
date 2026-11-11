import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type WalletCurrency = "XOF" | "NGN";

interface ConversionSuccessScreenProps {
  fromCurrency?: WalletCurrency;
  toCurrency?: WalletCurrency;
  amountConverted?: number;
  amountReceived?: number;
  rateMultiplier?: number;
  referenceId?: string;
  onViewActivity?: () => void;
  onConvertAgain?: () => void;
  onBackToHome?: () => void;
}

export default function ConversionSuccessScreen({
  fromCurrency = "XOF",
  toCurrency = "NGN",
  amountConverted = 1000,
  amountReceived = 2400,
  rateMultiplier,
  referenceId = "XZ-MWATTJ3C-3396",
  onViewActivity,
  onConvertAgain,
  onBackToHome,
}: ConversionSuccessScreenProps) {
  const isXofToNgn = fromCurrency === "XOF";

  // Default rate multiplier matching both corridor directions
  const activeRate = rateMultiplier ?? (isXofToNgn ? 2.4 : 0.42);

  const formatMoney = (val: number, currency: WalletCurrency) => {
    const hasDecimals = val % 1 !== 0;
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return currency === "XOF" ? `${formattedNum} FCFA` : `₦${formattedNum}`;
  };

  // Formats "+₦2,400" (XOF -> NGN) or "+420 FCFA" (NGN -> XOF)
  const creditedHeroText = `+${formatMoney(amountReceived, toCurrency)}`;

  // Formats "1,000 FCFA · 2.40 rate" or "₦1,000 · 0.42 rate"
  const conversionRateDetail = `${formatMoney(
    amountConverted,
    fromCurrency,
  )} · ${activeRate.toFixed(2)} rate`;

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header */}
      <View className="px-5 pt-3 pb-2">
        <Text className="text-lg font-bold text-[#1A1A1A]">
          Conversion complete
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 22,
          paddingTop: 28,
          paddingBottom: 36,
        }}
      >
        {/* Top Green Checkmark Badge */}
        <View className="items-center mb-5">
          <View className="w-[72px] h-[72px] rounded-full bg-[#C7F0D8] items-center justify-center">
            <View className="w-10 h-10 rounded-full bg-[#008744] items-center justify-center">
              <Text className="text-white font-bold text-lg">✓</Text>
            </View>
          </View>
        </View>

        {/* Title & Subtitle */}
        <Text className="text-[26px] font-bold text-[#1A1A1A] text-center mb-1.5">
          Conversion complete
        </Text>
        <Text className="text-sm text-[#666666] text-center mb-7">
          Your wallets have been updated.
        </Text>

        {/* Credited Amount Summary Card */}
        <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl py-6 px-5 items-center mb-6">
          <Text className="text-[28px] font-extrabold text-[#1A1A1A] mb-2">
            {creditedHeroText}
          </Text>

          <Text className="text-xs font-medium text-[#555555] mb-3.5">
            {conversionRateDetail}
          </Text>

          <Text className="text-[11px] font-medium text-[#888888] tracking-wide">
            Ref {referenceId}
          </Text>
        </View>

        {/* Primary Action: View Activity */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            onViewActivity ?? (() => console.log("Navigate to Activity"))
          }
          className="bg-[#009A49] h-[54px] rounded-xl flex-row items-center justify-center mb-3"
        >
          <Text className="text-white text-sm mr-2">🕒</Text>
          <Text className="text-white text-base font-semibold">
            View activity
          </Text>
        </TouchableOpacity>

        {/* Secondary Action: Convert Again */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onConvertAgain ?? (() => console.log("Reset Convert flow"))}
          className="bg-white border border-[#E0DCD3] h-[54px] rounded-xl flex-row items-center justify-center mb-5"
        >
          <Text className="text-[#1A1A1A] text-sm mr-2">⊕</Text>
          <Text className="text-[#1A1A1A] text-base font-semibold">
            Convert again
          </Text>
        </TouchableOpacity>

        {/* Tertiary Link: Back to Home */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBackToHome ?? (() => console.log("Navigate to Home"))}
          className="items-center py-2"
        >
          <Text className="text-sm font-medium text-[#4A4A4A]">
            Back to home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
