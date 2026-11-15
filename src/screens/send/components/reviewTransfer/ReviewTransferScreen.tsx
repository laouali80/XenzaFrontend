import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DetailRow } from "../../../../components/transaction/TransactionPrimitives";
import type { WalletCurrency } from "../../../../types/money";
import { formatMoney } from "../../../../utils/money";

export type TransferMode = "xenza_user" | "bank_account";

interface ReviewTransferScreenProps {
  mode?: TransferMode;
  recipientName?: string;
  accountOrPhone?: string;
  bankName?: string;
  currency?: WalletCurrency;
  recipientGets?: number;
  fee?: number;
  totalDebited?: number;
  onBack?: () => void;
  onConfirm?: () => void;
}

export default function ReviewTransferScreen({
  mode = "bank_account",
  recipientName = "as",
  accountOrPhone = "50242423123",
  bankName = "BOA Niger",
  currency = "XOF",
  recipientGets = 100,
  fee = 0.6,
  totalDebited = 100.6,
  onBack,
  onConfirm,
}: ReviewTransferScreenProps) {
  const isBankTransfer = mode === "bank_account";

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
          Review transfer
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
            Recipient gets
          </Text>
          <Text className="text-[32px] font-extrabold text-[#008744] mb-1.5">
            {formatMoney(recipientGets, currency)}
          </Text>
          <Text className="text-xs font-medium text-[#666666]">
            {recipientName}
          </Text>
        </View>

        {/* Details Breakdown Card */}
        <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 gap-3.5 mb-6">
          {/* Recipient Destination Row */}
          <DetailRow
            label={isBankTransfer ? "To a bank account" : "To a Xenza user"}
            value={accountOrPhone}
          />

          {/* Conditional Bank Name Row (Only shown for Bank Transfers) */}
          {isBankTransfer && (
            <DetailRow label="Bank" value={bankName} />
          )}

          {/* Source Wallet Row */}
          <DetailRow label="Send from" value={`${currency} wallet`} />

          {/* Fee Row */}
          <DetailRow label="Fee" value={formatMoney(fee, currency, true)} />

          {/* Total Debited Row */}
          <DetailRow
            label="Total debited"
            value={formatMoney(totalDebited, currency, true)}
          />
        </View>

        {/* Confirm Transfer Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            onConfirm ??
            (() => console.log("Confirm transfer & open PIN modal"))
          }
          className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
        >
          <Text className="text-white text-base font-semibold">Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
