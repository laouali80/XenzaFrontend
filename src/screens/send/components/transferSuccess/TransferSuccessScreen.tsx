import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as MediaLibrary from "expo-media-library/legacy";
import ViewShot, { type ViewShotRef } from "react-native-view-shot";
import {
  maskAccountNumber,
  shareTransactionReceiptPDF,
} from "../../../../utils/receiptGenerator";

export type TransferMode = "xenza_user" | "bank_account";
export type WalletCurrency = "XOF" | "NGN";

interface TransferSuccessScreenProps {
  mode?: TransferMode;
  recipientName?: string;
  accountOrPhone?: string;
  bankName?: string;
  currency?: WalletCurrency;
  amount?: number;
  fee?: number;
  referenceId?: string;
  isAlreadySaved?: boolean;
  onViewActivity?: () => void;
  onSendAgain?: () => void;
  onBackToHome?: () => void;
  onSaveFavourite?: () => void;
}

export default function TransferSuccessScreen({
  mode = "xenza_user",
  recipientName = "Amina Garba",
  accountOrPhone = "0452452",
  bankName = "BOA Niger",
  currency = "XOF",
  amount = 100,
  fee = 0.6,
  referenceId = "XZ-MWAQRT8J-2020",
  isAlreadySaved = false,
  onViewActivity,
  onSendAgain,
  onBackToHome,
  onSaveFavourite,
}: TransferSuccessScreenProps) {
  const [savedToFavourites, setSavedToFavourites] =
    useState<boolean>(isAlreadySaved);
  const receiptImageRef = useRef<ViewShotRef>(null);

  const formatMoney = (val: number, forceDecimals = false) => {
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: forceDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return currency === "XOF" ? `${formattedNum} FCFA` : `₦${formattedNum}`;
  };

  // Matches "BOA Niger · 0452452" for bank vs "50242423123" for Xenza user
  const destinationDisplay =
    mode === "bank_account" && bankName
      ? `${bankName} · ${accountOrPhone}`
      : accountOrPhone;

  // Native Share Receipt Handler
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
        recipientName: recipientName,
        recipientBankOrApp:
          mode === "bank_account" && bankName ? bankName : "Xenza Wallet",
        recipientAccountMasked: maskAccountNumber(accountOrPhone),
        senderName: "FATIMA BASHIR DALIBI", // Pass logged-in user's full name via props
        senderWalletLabel: currency === "XOF" ? "Xenza XOF" : "Xenza NGN",
        senderAccountMasked: maskAccountNumber("7071234975"), // Pass logged-in user's wallet ID
        transactionNo: referenceId,
        feeFormatted: formatMoney(fee, true),
      });
    } catch (error) {
      console.log("error: ", error);
      Alert.alert("Error", "Unable to generate receipt right now.");
    }
  };

  const handleDownloadReceipt = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync(true);
      if (permission.status !== "granted") {
        Alert.alert(
          "Permission required",
          "Allow photo access to save the receipt image.",
        );
        return;
      }

      const uri = await receiptImageRef.current?.capture();
      if (!uri) {
        throw new Error("Receipt image could not be captured.");
      }

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("Receipt Saved", "The receipt image was saved to your photos.");
    } catch (error) {
      console.error("Receipt image save failed:", error);
      Alert.alert("Error", "Unable to save the receipt image right now.");
    }
  };

  // Save Recipient to Favourites Handler
  const handleToggleFavourite = () => {
    if (savedToFavourites) return;
    setSavedToFavourites(true);
    onSaveFavourite?.();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header */}
      <View className="px-5 pt-3 pb-2">
        <Text className="text-lg font-bold text-[#1A1A1A]">Transfer sent</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 22,
          paddingTop: 24,
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
          Transfer sent
        </Text>
        <Text className="text-sm text-[#666666] text-center mb-7">
          Your transfer has been recorded.
        </Text>

        {/* Transaction Summary Receipt Card */}
        <View className="mb-4">
          <ViewShot
            ref={receiptImageRef}
            options={{
              fileName: `Xenza_Receipt_${referenceId}`,
              format: "jpg",
              quality: 0.95,
            }}
          >
            <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl py-6 px-5 items-center">
              <Text className="text-[28px] font-extrabold text-[#1A1A1A] mb-2">
                {formatMoney(amount, false)}
              </Text>

              <Text className="text-xs font-medium text-[#555555] mb-1">
                {destinationDisplay}
              </Text>

              <Text className="text-xs text-[#666666] mb-3.5">
                Fee {formatMoney(fee, true)}
              </Text>

              <Text className="text-[11px] font-medium text-[#888888] tracking-wide">
                Ref {referenceId}
              </Text>
            </View>
          </ViewShot>
        </View>

        {/* Quick Receipt Utilities Row (Share | Download | Favourite) */}
        <View className="flex-row gap-2.5 mb-6">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleShareReceipt}
            className="flex-1 bg-white border border-[#E5E0D8] rounded-xl py-3 items-center justify-center"
          >
            <Text className="text-sm mb-1">📤</Text>
            <Text className="text-[11px] font-semibold text-[#1A1A1A]">
              Share receipt
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleDownloadReceipt}
            className="flex-1 bg-white border border-[#E5E0D8] rounded-xl py-3 items-center justify-center"
          >
            <Text className="text-sm mb-1">📥</Text>
            <Text className="text-[11px] font-semibold text-[#1A1A1A]">
              Download
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggleFavourite}
            className={`flex-1 border rounded-xl py-3 items-center justify-center ${
              savedToFavourites
                ? "bg-[#E6F5EC] border-[#52B788]"
                : "bg-white border-[#E5E0D8]"
            }`}
          >
            <Text className="text-sm mb-1">
              {savedToFavourites ? "★" : "☆"}
            </Text>
            <Text
              className={`text-[11px] font-semibold ${
                savedToFavourites ? "text-[#008744]" : "text-[#1A1A1A]"
              }`}
            >
              {savedToFavourites ? "Saved" : "Favourite"}
            </Text>
          </TouchableOpacity>
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

        {/* Secondary Action: Send Again */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onSendAgain ?? (() => console.log("Reset Send flow"))}
          className="bg-white border border-[#E0DCD3] h-[54px] rounded-xl flex-row items-center justify-center mb-5"
        >
          <Text className="text-[#1A1A1A] text-sm mr-2">➤</Text>
          <Text className="text-[#1A1A1A] text-base font-semibold">
            Send again
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
