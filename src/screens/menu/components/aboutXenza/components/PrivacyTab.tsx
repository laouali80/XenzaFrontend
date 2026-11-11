import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PrivacyTab = () => {
  return (
    <View className="gap-3.5">
      {/* Privacy Header Card */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center pb-3.5 border-b border-[#EFECE6]">
          <View className="w-10 h-10 rounded-xl bg-[#FBE5CE] items-center justify-center mr-3">
            <Text className="text-base text-[#C86D1F]">🔒</Text>
          </View>
          <View>
            <Text className="text-[15px] font-bold text-[#1A1A1A]">
              Privacy notice
            </Text>
            <Text className="text-[11px] text-[#666666] mt-0.5">
              🗓 Updated 1 November 2026
            </Text>
          </View>
        </View>

        <Text className="text-xs text-[#555555] leading-[18px] pt-3.5">
          This notice explains what information Xenza holds about you, why we
          hold it, and the control you have over it.
        </Text>
      </View>

      {/* Clause 1 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#D8F3E5] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#008744]">1</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">
            What we collect
          </Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          Your name, phone number, date of birth, country and language, the
          identity document you choose to verify with, and a record of every
          transaction on your wallets.
        </Text>
      </View>

      {/* Clause 2 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#E3F2F0] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#1E7B6B]">2</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">
            How we use it
          </Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          To run your wallet, apply your limits, show your activity, and answer
          you when you contact support. We do not sell your data or use it for
          third-party advertising.
        </Text>
      </View>

      {/* Clause 3 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#D8F3E5] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#008744]">3</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">
            Who we share it with
          </Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          Only with the regulated partners that hold balances in CFA and Naira,
          and with authorities where the law requires it. Every partner is bound
          to keep your data confidential.
        </Text>
      </View>

      {/* Clause 4 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#E3F2F0] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#1E7B6B]">4</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">
            How long we keep it
          </Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          Transaction records are kept for the period required by financial
          regulation. If you close your wallet, the rest of your profile is
          deleted once that period ends.
        </Text>
      </View>

      {/* Clause 5 */}
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
        <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-[#D8F3E5] items-center justify-center mr-2.5">
            <Text className="text-xs font-bold text-[#008744]">5</Text>
          </View>
          <Text className="text-sm font-bold text-[#1A1A1A]">Your choices</Text>
        </View>
        <Text className="text-xs text-[#555555] leading-[19px]">
          You can edit your profile details, change your language, and turn
          security preferences on or off at any time. To request a copy or
          deletion of your data, contact support.
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

export default PrivacyTab;

const styles = StyleSheet.create({});
