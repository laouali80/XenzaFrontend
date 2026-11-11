import { View, Text } from "react-native";
import React from "react";

const TermsTab = () => {
  return (
    <View className="gap-3.5">
      {/* Terms Header Card */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center pb-3.5 border-b border-[#EFECE6]">
          <View className="w-10 h-10 rounded-xl bg-[#FBE5CE] items-center justify-center mr-3">
            <Text className="text-base text-[#C86D1F]">📄</Text>
          </View>
          <View>
            <Text className="text-[15px] font-bold text-[#1A1A1A]">
              Terms of service
            </Text>
            <Text className="text-[11px] text-[#666666] mt-0.5">
              🗓 Updated 1 November 2026
            </Text>
          </View>
        </View>

        <Text className="text-xs text-[#555555] leading-[18px] pt-3.5">
          These terms describe how the Xenza demo wallet works and what you
          agree to when you use it.
        </Text>
      </View>

      {/* Clause 1 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#D8F3E5] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#008744]">1</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">
            Using your wallet
          </Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          You must be at least 18 and use your own phone number to open a
          wallet. Your balance belongs to you, and every payment is authorised
          with your 4-digit PIN.
        </Text>
      </View>

      {/* Clause 2 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#E3F2F0] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#1E7B6B]">2</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">
            Rates and fees
          </Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          Sends and conversions use the live corridor rate shown on Rates &
          fees, which already includes the corridor margin. Airtime, data, TV
          and cash in are free; sends, cash out and bill payments carry a small
          capped fee shown before you confirm.
        </Text>
      </View>

      {/* Clause 3 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#D8F3E5] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#008744]">3</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">
            Limits and verification
          </Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          Unverified accounts have a per-transaction ceiling, a daily outgoing
          ceiling and a wallet balance cap. Completing identity verification
          raises all three. Limits reset at midnight.
        </Text>
      </View>

      {/* Clause 4 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#E3F2F0] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#1E7B6B]">4</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">
            Your responsibilities
          </Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          Keep your PIN private, tell us at once if your phone is lost, and only
          send money to people you intend to pay. Xenza will never ask for your
          PIN by phone, message or email.
        </Text>
      </View>

      {/* Clause 5 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#D8F3E5] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#008744]">5</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">
            Suspending or closing an account
          </Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          We may pause an account while we investigate suspected fraud or a
          legal request. You can stop using Xenza at any time; any remaining
          balance is returned to your verified account details.
        </Text>
      </View>

      {/* Bottom Demo Wallet Notice Banner */}
      <View className="bg-[#EAF7F0] border border-[#CBEAD9] rounded-2xl px-4 py-3.5 flex-row items-start">
        <View className="w-4 h-4 rounded-full border border-[#008744] items-center justify-center mr-2.5 mt-0.5">
          <Text className="text-[9px] font-bold text-[#008744]">✓</Text>
        </View>
        <Text className="flex-1 text-xs font-medium text-[#1F5E3B] leading-[18px]">
          Xenza is a demonstration wallet. No real money moves, and account data
          stays on this device.
        </Text>
      </View>
    </View>
  );
};

export default TermsTab;
