import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailRow } from "../../../../components/transaction/TransactionPrimitives";
import type { WalletCurrency } from "../../../../types/money";
import { formatMoney } from "../../../../utils/money";

export type ServiceCategory = "airtime" | "data" | "tv" | "utility";

interface ReviewPaymentScreenProps {
  category?: ServiceCategory;
  providerName?: string;
  bundleOrPlanName?: string; // Optional (e.g., "1.5 GB · 30 days" for Data/TV)
  recipientNumber?: string;
  currency?: WalletCurrency;
  totalDebited?: number;
  fee?: number;
  onBack?: () => void;
  onConfirm?: () => void;
}

export default function ReviewPaymentScreen({
  category = "airtime",
  providerName = "Glo",
  bundleOrPlanName,
  recipientNumber = "07041114444",
  currency = "NGN",
  totalDebited = 43,
  fee = 0,
  onBack,
  onConfirm,
}: ReviewPaymentScreenProps) {
  // Adapts the account/number label cleanly across all 4 service categories
  const getRecipientLabel = () => {
    switch (category) {
      case "tv":
        return "Smartcard / IUC number";
      case "utility":
        return "Meter / Account number";
      case "data":
      case "airtime":
      default:
        return "Mobile number";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center px-5 pt-3 pb-3.5">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back to Payment details"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold text-[#1A1A1A]">Review payment</Text>
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
            Total debited
          </Text>
          <Text className="text-[32px] font-extrabold text-[#008744] mb-1.5">
            {formatMoney(totalDebited, currency)}
          </Text>
          <Text className="text-xs font-medium text-[#666666]">
            {providerName}
          </Text>
        </View>

        {/* Payment Details Breakdown Card */}
        <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 gap-3.5 mb-6">
          <DetailRow label="Provider" value={providerName} />

          {bundleOrPlanName && (
            <DetailRow label="Package" value={bundleOrPlanName} />
          )}

          <DetailRow label={getRecipientLabel()} value={recipientNumber} />
          <DetailRow label="Pay from" value={`${currency} wallet`} />
          <DetailRow label="Fee" value={formatMoney(fee, currency)} />
        </View>

        {/* Confirm Payment Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            onConfirm ??
            (() => console.log("Confirm payment & open ConfirmPinScreen"))
          }
          className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
        >
          <Text className="text-white text-base font-semibold">Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
