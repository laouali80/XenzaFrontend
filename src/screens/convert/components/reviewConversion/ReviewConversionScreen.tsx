import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type WalletCurrency = "XOF" | "NGN";

interface ReviewConversionScreenProps {
  fromCurrency?: WalletCurrency;
  toCurrency?: WalletCurrency;
  amountToConvert?: number;
  youReceive?: number;
  rateLabel?: string;
  fee?: number;
  totalDebited?: number;
  onBack?: () => void;
  onConfirm?: () => void;
}

export default function ReviewConversionScreen({
  fromCurrency = "XOF",
  toCurrency = "NGN",
  amountToConvert = 1000,
  youReceive = 2400,
  rateLabel = "1,000 FCFA = ₦2,400",
  fee = 8,
  totalDebited = 1008,
  onBack,
  onConfirm,
}: ReviewConversionScreenProps) {
  const formatMoney = (val: number, currency: WalletCurrency) => {
    const hasDecimals = val % 1 !== 0;
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return currency === "XOF" ? `${formattedNum} FCFA` : `₦${formattedNum}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center px-5 pt-3 pb-3.5">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back to How much"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold text-[#1A1A1A]">
          Review conversion
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 32,
        }}
      >
        {/* Top Hero Summary Card */}
        <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl py-7 px-5 items-center mb-4">
          <Text className="text-xs font-medium text-[#666666] mb-1.5">
            You receive
          </Text>
          <Text className="text-[32px] font-extrabold text-[#008744] mb-1.5">
            {formatMoney(youReceive, toCurrency)}
          </Text>
          <Text className="text-xs font-medium text-[#666666]">
            {formatMoney(amountToConvert, fromCurrency)} · {rateLabel}
          </Text>
        </View>

        {/* Conversion Details Breakdown Card */}
        <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 gap-3.5 mb-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-xs text-[#666666]">Convert from</Text>
            <Text className="text-xs font-bold text-[#1A1A1A]">
              {fromCurrency} wallet
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-xs text-[#666666]">You receive in</Text>
            <Text className="text-xs font-bold text-[#1A1A1A]">
              {toCurrency} wallet
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
        </View>

        {/* Confirm Conversion Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            onConfirm ??
            (() => console.log("Confirm conversion & open ConfirmPinScreen"))
          }
          className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
        >
          <Text className="text-white text-base font-semibold">Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
