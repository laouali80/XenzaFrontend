import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import {
  maskAccountNumber,
  shareTransactionReceiptPDF,
} from "../../../../utils/receiptGenerator";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SuccessBadge,
  TransactionAction,
  TransactionSummaryCard,
} from "../../../../components/transaction/TransactionPrimitives";
import type { WalletCurrency } from "../../../../types/money";
import { formatMoney } from "../../../../utils/money";

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
        amountFormatted: formatMoney(amount, currency, true),
        status: "Successful",
        timestamp: now,
        recipientName: providerName,
        recipientBankOrApp: "Bill / Airtime Service",
        recipientAccountMasked: recipientNumber,
        senderName: "AISHA BELLO",
        senderWalletLabel: currency === "XOF" ? "Xenza XOF" : "Xenza NGN",
        senderAccountMasked: maskAccountNumber("9052393820"),
        transactionNo: referenceId,
        feeFormatted: formatMoney(fee, currency, true),
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
        <SuccessBadge />

        {/* Title & Subtitle */}
        <Text className="text-[26px] font-bold text-[#1A1A1A] text-center mb-1.5">
          Payment successful
        </Text>
        <Text className="text-sm text-[#666666] text-center mb-7">
          Your payment has been recorded.
        </Text>

        {/* Payment Summary Receipt Card */}
        <TransactionSummaryCard
          amount={formatMoney(amount, currency)}
          details={[providerName, recipientNumber]}
          referenceId={referenceId}
        />

        {/* Primary Action: View Activity */}
        <TransactionAction
          label="View activity"
          icon="🕒"
          onPress={onViewActivity}
        />

        {/* Secondary Action: Pay Again */}
        <TransactionAction
          label="Pay again"
          icon="↻"
          onPress={onPayAgain}
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
