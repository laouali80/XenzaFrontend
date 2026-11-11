import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTx } from "../../../../utils/tx";

type KYCStatus = "pending" | "rejected" | "verified";

interface KYCStatusScreenProps {
  initialStatus?: KYCStatus;
  onRetryKYC?: () => void;
  onSkip?: () => void;
  onContinueToApp?: () => void;
}

export default function KYCStatusScreen({
  initialStatus = "verified",
  onRetryKYC,
  onSkip,
  onContinueToApp,
}: KYCStatusScreenProps) {
  const tx = useTx();
  const [status, setStatus] = useState<KYCStatus>(initialStatus);

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* 1. PENDING / IN REVIEW STATE */}
      {status === "pending" && (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="px-6 pt-10 pb-8"
        >
          {/* Top Clock Badge */}
          <View className="items-center mb-6">
            <View className="w-[72px] h-[72px] rounded-full bg-[#FBE2C6] items-center justify-center">
              <View className="w-9 h-9 rounded-full border-[2.5px] border-[#C86D1F] items-center justify-center">
                <Text className="text-[#C86D1F] font-bold text-sm">🕒</Text>
              </View>
            </View>
          </View>

          {/* Title & Subtitle */}
          <Text className="text-[26px] font-bold text-[#1A1A1A] text-center mb-2">
            {tx.screens.pendingKYC.title}
          </Text>
          <Text className="text-[15px] text-[#666666] text-center leading-[22px] px-2 mb-8">
            {tx.screens.pendingKYC.text}
          </Text>

          {/* Your Limits Card (In Review) */}
          <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl p-4 mb-5">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-sm font-bold text-[#1A1A1A]">
                Your limits
              </Text>
              <View className="bg-[#FBE2C6] px-2.5 py-1 rounded-full">
                <Text className="text-[11px] font-semibold text-[#B86318]">
                  In review
                </Text>
              </View>
            </View>

            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-[#666666]">Per transaction</Text>
                <Text className="text-xs font-medium text-[#1A1A1A]">
                  300,000 FCFA →{" "}
                  <Text className="font-bold text-[#008744]">
                    2,000,000 FCFA
                  </Text>
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-[#666666]">Daily outgoing</Text>
                <Text className="text-xs font-medium text-[#1A1A1A]">
                  750,000 FCFA →{" "}
                  <Text className="font-bold text-[#008744]">
                    5,000,000 FCFA
                  </Text>
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-[#666666]">
                  Wallet balance cap
                </Text>
                <Text className="text-xs font-medium text-[#1A1A1A]">
                  1,000,000 FCFA →{" "}
                  <Text className="font-bold text-[#008744]">No limit</Text>
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mt-4 pt-3 border-t border-[#E8E3D9]">
              <Text className="text-xs text-[#1E7B5A] mr-1.5">ⓘ</Text>
              <Text className="text-[11px] text-[#666666]">
                Verify your identity to unlock higher limits.
              </Text>
            </View>
          </View>

          {/* Demo Controls Card */}
          <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl p-4 mb-8">
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-1">
              DEMO CONTROLS
            </Text>
            <Text className="text-xs text-[#666666] mb-4">
              Preview how each review outcome looks.
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setStatus("verified")}
                className="flex-1 bg-[#009A49] h-11 rounded-xl items-center justify-center"
              >
                <Text className="text-white text-sm font-semibold">
                  Approve
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setStatus("rejected")}
                className="flex-1 bg-white border border-[#E0DCD3] h-11 rounded-xl items-center justify-center"
              >
                <Text className="text-[#1A1A1A] text-sm font-semibold">
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Skip Link */}
          <TouchableOpacity
            onPress={onSkip ?? (() => console.log("Skip to Home"))}
            className="items-center py-2"
          >
            <Text className="text-sm font-semibold text-[#1A1A1A]">
              {tx.screens.KYC.CTA.skipForNowBtn}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* 2. REJECTED / UNSUCCESSFUL STATE */}
      {status === "rejected" && (
        <View className="flex-1 justify-center px-6">
          {/* Error Icon Badge */}
          <View className="items-center mb-6">
            <View className="w-[72px] h-[72px] rounded-full bg-[#FBE2C6] items-center justify-center">
              <View className="w-9 h-9 rounded-full border-[2.5px] border-[#C86D1F] items-center justify-center">
                <Text className="text-[#C86D1F] font-bold text-base">✕</Text>
              </View>
            </View>
          </View>

          <Text className="text-[26px] font-bold text-[#1A1A1A] text-center mb-2">
            {tx.screens.rejectedKYC.title}
          </Text>
          <Text className="text-[15px] text-[#666666] text-center leading-[22px] mb-8">
            {tx.screens.rejectedKYC.text}
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onRetryKYC ?? (() => setStatus("pending"))}
            className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
          >
            <Text className="text-white text-base font-semibold">
              {tx.screens.rejectedKYC.tryAgainBtn}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 3. APPROVED / IDENTITY VERIFIED STATE */}
      {status === "verified" && (
        <View className="flex-1 px-6 pt-12">
          {/* Verified Shield Badge */}
          <View className="items-center mb-6">
            <View className="w-[72px] h-[72px] rounded-full bg-[#C7F0D8] items-center justify-center">
              <View className="w-10 h-11 rounded-b-2xl rounded-t-md bg-[#008744] items-center justify-center">
                <Text className="text-white font-bold text-base">✓</Text>
              </View>
            </View>
          </View>

          <Text className="text-[26px] font-bold text-[#1A1A1A] text-center mb-2">
            Identity verified
          </Text>
          <Text className="text-[15px] text-[#666666] text-center mb-8">
            You now have full access to Xenza.
          </Text>

          {/* Verified Limits Card */}
          <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl p-4 mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-sm font-bold text-[#1A1A1A]">
                Your limits
              </Text>
              <View className="bg-[#D1EFE0] px-2.5 py-1 rounded-full">
                <Text className="text-[11px] font-semibold text-[#008744]">
                  Verified
                </Text>
              </View>
            </View>

            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-[#666666]">Per transaction</Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  2,000,000 FCFA
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-[#666666]">Daily outgoing</Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  5,000,000 FCFA
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-[#666666]">
                  Wallet balance cap
                </Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  No limit
                </Text>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onContinueToApp ?? (() => console.log("Navigate to Home"))}
            className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
          >
            <Text className="text-white text-base font-semibold">
              {tx.screens.preAuthCTA.continueBtn}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
