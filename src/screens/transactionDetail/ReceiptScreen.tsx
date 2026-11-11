import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ReceiptDirection = "sent" | "received";
export type WalletCurrency = "NGN" | "XOF";

export interface TransactionReceiptData {
  id: string;
  direction: ReceiptDirection;
  amount: number;
  currency: WalletCurrency;
  subtitle: string; // e.g., "Data bundle • MTN Nigeria" | "Converted from CFA wallet" | "Received from Ibrahim Sow"
  transactionType: string; // e.g., "Data bundle" | "Conversion" | "Receive" | "Transfer"
  date: string; // e.g., "10 Nov 2026"
  time: string; // e.g., "22:29"
  counterpartyLabel: "To" | "From";
  counterpartyValue: string; // e.g., "MTN Nigeria" | "CFA wallet" | "Ibrahim Sow"
  walletLabel: string; // e.g., "Nigerian Naira · 9052393820" | "West African CFA Franc · 7074260737"
  rateUsed?: string; // Optional, e.g., "1 NGN = 2.4 XOF"
  status: "Completed" | "Pending" | "Failed";
  reference: string; // e.g., "XZ-MWB7DZVP-1798"
}

interface ReceiptScreenProps {
  receipt?: TransactionReceiptData;
  onBack?: () => void;
  onCopyDetails?: (formattedText: string) => void;
  onSaveImage?: (receipt: TransactionReceiptData) => void;
}

const DEFAULT_RECEIPT: TransactionReceiptData = {
  id: "tx-1",
  direction: "sent",
  amount: 1000,
  currency: "NGN",
  subtitle: "Data bundle • MTN Nigeria",
  transactionType: "Data bundle",
  date: "10 Nov 2026",
  time: "22:29",
  counterpartyLabel: "To",
  counterpartyValue: "MTN Nigeria",
  walletLabel: "Nigerian Naira · 9052393820",
  status: "Completed",
  reference: "XZ-MWB7DZVP-1798",
};

export default function ReceiptScreen({
  receipt = DEFAULT_RECEIPT,
  onBack,
  onCopyDetails,
  onSaveImage,
}: ReceiptScreenProps) {
  const isSent = receipt.direction === "sent";

  const formatAmount = () => {
    const sign = isSent ? "-" : "+";
    const hasDecimals = receipt.amount % 1 !== 0;
    const formattedNumber = receipt.amount.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });

    if (receipt.currency === "XOF") {
      return `${sign}${formattedNumber} FCFA`;
    }
    return `${sign}₦${formattedNumber}`;
  };

  const buildPlainTextSummary = () => {
    const lines = [
      "Xenza Payment Receipt",
      `${isSent ? "Amount Sent" : "Amount Received"}: ${formatAmount()}`,
      `Summary: ${receipt.subtitle}`,
      `Transaction type: ${receipt.transactionType}`,
      `Date & Time: ${receipt.date} at ${receipt.time}`,
      `${receipt.counterpartyLabel}: ${receipt.counterpartyValue}`,
      `Wallet: ${receipt.walletLabel}`,
    ];
    if (receipt.rateUsed) {
      lines.push(`Rate used: ${receipt.rateUsed}`);
    }
    lines.push(`Status: ${receipt.status}`);
    lines.push(`Reference: ${receipt.reference}`);
    return lines.join("\n");
  };

  const handleShareReceipt = async () => {
    try {
      await Share.share({
        message: buildPlainTextSummary(),
        title: `Xenza Receipt - ${receipt.reference}`,
      });
    } catch {
      Alert.alert("Share Receipt", "Unable to open the share sheet right now.");
    }
  };

  const handleCopyDetails = () => {
    const summary = buildPlainTextSummary();
    if (onCopyDetails) {
      onCopyDetails(summary);
    } else {
      Alert.alert(
        "Details copied",
        `Reference ${receipt.reference} and receipt details copied.`,
      );
    }
  };

  const handleSaveImage = () => {
    if (onSaveImage) {
      onSaveImage(receipt);
    } else {
      Alert.alert(
        "Receipt saved",
        "Your payment receipt has been saved to your photos.",
      );
    }
  };

  // Build ordered metadata rows dynamically
  const metadataRows: { label: string; value: string }[] = [
    { label: "Transaction type", value: receipt.transactionType },
    { label: "Date", value: receipt.date },
    { label: "Time", value: receipt.time },
    { label: receipt.counterpartyLabel, value: receipt.counterpartyValue },
    { label: "Wallet", value: receipt.walletLabel },
    ...(receipt.rateUsed
      ? [{ label: "Rate used", value: receipt.rateUsed }]
      : []),
    { label: "Status", value: receipt.status },
    { label: "Reference", value: receipt.reference },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center px-5 pt-3 pb-3.5 border-b border-[#EFECE6]">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <View>
          <Text className="text-lg font-bold text-[#1A1A1A]">Receipt</Text>
          <Text className="text-xs text-[#666666] mt-0.5">
            Every detail of this transaction, ready to share.
          </Text>
        </View>
      </View>

      {/* Scrollable Receipt Ticket */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 24,
        }}
      >
        {/* Main Receipt Card */}
        <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-3xl overflow-hidden mb-4">
          {/* Card Header: Xenza Brand + RECEIPT Pill */}
          <View className="px-5 py-4 flex-row items-center justify-between border-b border-[#EFECE6]">
            <View className="flex-row items-center">
              {/* Xenza Green/Orange Geometric Tile */}
              <View className="w-9 h-9 rounded-xl bg-[#008744] items-center justify-center mr-3 relative overflow-hidden">
                <View
                  style={{ transform: [{ rotate: "45deg" }] }}
                  className="w-7 h-1.5 bg-white rounded-full absolute"
                />
                <View
                  style={{ transform: [{ rotate: "-45deg" }] }}
                  className="w-7 h-1.5 bg-[#E07A22] rounded-full absolute"
                />
              </View>

              <View>
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  Payment receipt
                </Text>
                <Text className="text-[11px] text-[#666666]">Xenza</Text>
              </View>
            </View>

            <View className="bg-[#EFECE6] px-2.5 py-1 rounded-md">
              <Text className="text-[10px] font-bold text-[#666666] tracking-[0.6px]">
                RECEIPT
              </Text>
            </View>
          </View>

          {/* Amount & Status Hero Section */}
          <View className="px-5 py-6 items-center">
            {/* Direction Arrow Circle */}
            <View
              className={`w-11 h-11 rounded-full items-center justify-center mb-3.5 ${
                isSent ? "bg-[#DDF3EF]" : "bg-[#D1F2DF]"
              }`}
            >
              <Text
                className={`text-base font-bold ${
                  isSent ? "text-[#1E7B6B]" : "text-[#008744]"
                }`}
              >
                {isSent ? "↑" : "↓"}
              </Text>
            </View>

            {/* MONEY SENT / MONEY RECEIVED Label */}
            <Text className="text-[10px] font-bold text-[#666666] tracking-[0.8px] mb-1.5">
              {isSent ? "MONEY SENT" : "MONEY RECEIVED"}
            </Text>

            {/* Large Formatted Amount */}
            <Text className="text-[30px] font-extrabold text-[#1A1A1A] tracking-[-0.5px] mb-1.5">
              {formatAmount()}
            </Text>

            {/* Subtitle */}
            <Text className="text-xs text-[#666666] text-center mb-3.5">
              {receipt.subtitle}
            </Text>

            {/* Completed Pill Badge */}
            <View className="bg-[#D1F2DF] px-3 py-1 rounded-full flex-row items-center">
              <View className="w-3.5 h-3.5 rounded-full bg-[#008744] items-center justify-center mr-1.5">
                <Text className="text-[8px] font-bold text-white">✓</Text>
              </View>
              <Text className="text-xs font-bold text-[#008744]">
                {receipt.status}
              </Text>
            </View>
          </View>

          {/* Ticket Perforation Divider with Side Notches */}
          <View className="relative flex-row items-center justify-center my-1">
            <View className="w-4 h-4 rounded-full bg-[#FCFAF7] border border-[#EAE5DC] -ml-2" />
            <View className="flex-1 border-b border-dashed border-[#E2DDD4] mx-1" />
            <View className="w-4 h-4 rounded-full bg-[#FCFAF7] border border-[#EAE5DC] -mr-2" />
          </View>

          {/* Key-Value Metadata Rows */}
          <View className="px-5 pt-2 pb-3">
            {metadataRows.map((row, index) => {
              const isLast = index === metadataRows.length - 1;
              return (
                <View
                  key={row.label}
                  className={`py-3 flex-row items-center justify-between ${
                    !isLast ? "border-b border-[#EFECE6]" : ""
                  }`}
                >
                  <Text className="text-xs text-[#666666]">{row.label}</Text>
                  <Text className="text-xs font-bold text-[#1A1A1A] text-right flex-1 pl-4">
                    {row.value}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Receipt Footer Note */}
          <View className="bg-[#F4F1EA] px-5 py-3 border-t border-[#EFECE6]">
            <Text className="text-[11px] text-[#666666] text-center">
              Generated from the Xenza wallet. Ask support if anything looks
              wrong.
            </Text>
          </View>
        </View>

        {/* Soft Teal Privacy Assurance Callout */}
        <View className="bg-[#E6F4F1] rounded-xl px-4 py-3.5 flex-row items-center">
          <Text className="text-xs text-[#1E7B6B] mr-2">ⓘ</Text>
          <Text className="flex-1 text-xs font-medium text-[#2C5E54]">
            Shared receipts never include your PIN or wallet balance.
          </Text>
        </View>
      </ScrollView>

      {/* Pinned Bottom Action Bar */}
      <View className="px-5 pt-3 pb-4 bg-[#FCFAF7] border-t border-[#EFECE6]">
        {/* Primary Green Share Receipt Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleShareReceipt}
          className="bg-[#009A49] h-[52px] rounded-xl flex-row items-center justify-center mb-2.5"
        >
          <Text className="text-white text-sm font-bold mr-2">↪</Text>
          <Text className="text-white text-sm font-bold">Share receipt</Text>
        </TouchableOpacity>

        {/* Secondary Copy Details & Save Image Row */}
        <View className="flex-row gap-2.5 mb-2.5">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCopyDetails}
            className="flex-1 bg-white border border-[#E0DDD6] h-[46px] rounded-xl flex-row items-center justify-center"
          >
            <Text className="text-xs text-[#1A1A1A] mr-1.5">❐</Text>
            <Text className="text-xs font-bold text-[#1A1A1A]">
              Copy details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSaveImage}
            className="flex-1 bg-white border border-[#E0DDD6] h-[46px] rounded-xl flex-row items-center justify-center"
          >
            <Text className="text-xs text-[#1A1A1A] mr-1.5">⬇</Text>
            <Text className="text-xs font-bold text-[#1A1A1A]">Save image</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Caption */}
        <View className="flex-row items-center justify-center">
          <Text className="text-[11px] text-[#1E7B6B] mr-1.5">🛡️</Text>
          <Text className="text-[11px] text-[#666666]">
            Send a copy to the person you paid, or keep it for your records.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
