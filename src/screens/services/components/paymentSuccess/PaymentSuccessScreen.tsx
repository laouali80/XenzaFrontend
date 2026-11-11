import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import {
  maskAccountNumber,
  shareTransactionReceiptPDF,
} from "../../../../utils/receiptGenerator";
import { SafeAreaView } from "react-native-safe-area-context";

export type WalletCurrency = "XOF" | "NGN";

interface PaymentSuccessScreenProps {
  providerName?: string;
  recipientNumber?: string;
  currency?: WalletCurrency;
  amount?: number;
  fee?: number;
  referenceId?: string;
  onViewActivity?: () => void;
  onPayAgain?: () => void;
  onBackToHome?: () => void;
}

export default function PaymentSuccessScreen({
  providerName = "Glo",
  recipientNumber = "07041114444",
  currency = "NGN",
  amount = 43,
  fee = 0,
  referenceId = "XZ-MWB6FQ62-9353",
  onViewActivity,
  onPayAgain,
  onBackToHome,
}: PaymentSuccessScreenProps) {
  const formatMoney = (val: number, forceDecimals = false) => {
    const hasDecimals = val % 1 !== 0;
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: forceDecimals || hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return currency === "XOF" ? `${formattedNum} FCFA` : `₦${formattedNum}`;
  };

  const handleShareReceipt = async () => {
    try {
      const now = new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      await shareTransactionReceiptPDF({
        amountFormatted: formatMoney(amount, true),
        status: "Successful",
        timestamp: now,
        recipientName: providerName,
        recipientBankOrApp: "Bill / Airtime Service",
        recipientAccountMasked: recipientNumber,
        senderName: "AISHA BELLO",
        senderWalletLabel: currency === "XOF" ? "Xenza XOF" : "Xenza NGN",
        senderAccountMasked: maskAccountNumber("9052393820"),
        transactionNo: referenceId,
        feeFormatted: formatMoney(fee, true),
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share receipt right now.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-2">
        <Text className="text-lg font-bold text-[#1A1A1A]">
          Payment successful
        </Text>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleShareReceipt}
          className="bg-[#EFECE6] px-3 py-1.5 rounded-full"
        >
          <Text className="text-xs font-semibold text-[#1A1A1A]">
            Share receipt
          </Text>
        </TouchableOpacity>
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
          Payment successful
        </Text>
        <Text className="text-sm text-[#666666] text-center mb-7">
          Your payment has been recorded.
        </Text>

        {/* Payment Summary Receipt Card */}
        <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl py-6 px-5 items-center mb-6">
          <Text className="text-[28px] font-extrabold text-[#1A1A1A] mb-2">
            {formatMoney(amount)}
          </Text>

          <Text className="text-xs font-medium text-[#555555] mb-1">
            {providerName}
          </Text>

          <Text className="text-xs font-medium text-[#555555] mb-3.5">
            {recipientNumber}
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

        {/* Secondary Action: Pay Again */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPayAgain ?? (() => console.log("Reset Services flow"))}
          className="bg-white border border-[#E0DCD3] h-[54px] rounded-xl flex-row items-center justify-center mb-5"
        >
          <Text className="text-[#1A1A1A] text-sm mr-2">↻</Text>
          <Text className="text-[#1A1A1A] text-base font-semibold">
            Pay again
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
