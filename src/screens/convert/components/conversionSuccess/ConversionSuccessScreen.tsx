import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SuccessBadge,
  TransactionAction,
  TransactionSummaryCard,
} from "../../../../components/transaction/TransactionPrimitives";
import type { WalletCurrency } from "../../../../types/money";
import { formatMoney } from "../../../../utils/money";

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

  // Formats "+₦2,400" (XOF -> NGN) or "+420 FCFA" (NGN -> XOF)
  const creditedHeroText = `+${formatMoney(amountReceived, toCurrency)}`;

  // Formats "1,000 FCFA · 2.40 rate" or "₦1,000 · 0.42 rate"
  const conversionRateDetail = `${formatMoney(amountConverted, fromCurrency)} · ${activeRate.toFixed(2)} rate`;

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
        <SuccessBadge />

        {/* Title & Subtitle */}
        <Text className="text-[26px] font-bold text-[#1A1A1A] text-center mb-1.5">
          Conversion complete
        </Text>
        <Text className="text-sm text-[#666666] text-center mb-7">
          Your wallets have been updated.
        </Text>

        {/* Credited Amount Summary Card */}
        <TransactionSummaryCard
          amount={creditedHeroText}
          details={[conversionRateDetail]}
          referenceId={referenceId}
        />

        {/* Primary Action: View Activity */}
        <TransactionAction
          label="View activity"
          icon="🕒"
          onPress={onViewActivity}
        />

        {/* Secondary Action: Convert Again */}
        <TransactionAction
          label="Convert again"
          icon="⊕"
          onPress={onConvertAgain}
          secondary
        />

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
