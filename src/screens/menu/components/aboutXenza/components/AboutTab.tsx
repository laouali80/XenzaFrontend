import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface AboutTabProps {
  onContactSupport?: () => void;
}

const AboutTab = ({ onContactSupport }: AboutTabProps) => {
  return (
    <>
      {/* Green Hero Brand Card */}
      <View className="bg-[#008744] rounded-2xl p-5 mb-6">
        <View className="flex-row items-center mb-4">
          {/* Custom Xenza Logo Tile */}
          <View className="w-12 h-12 rounded-xl bg-white items-center justify-center mr-3.5 relative overflow-hidden">
            <View
              style={{ transform: [{ rotate: "45deg" }] }}
              className="w-8 h-2 bg-[#008744] rounded-full absolute"
            />
            <View
              style={{ transform: [{ rotate: "-45deg" }] }}
              className="w-8 h-2 bg-[#E07A22] rounded-full absolute"
            />
          </View>

          <View>
            <Text className="text-[18px] font-extrabold text-white">Xenza</Text>
            <Text className="text-xs text-white/85 mt-0.5">
              Version 1.0.0 (demo)
            </Text>
          </View>
        </View>

        <Text className="text-[13px] text-white/95 leading-[19px] mb-4">
          Hold CFA Franc and Naira in one wallet, move money across the border,
          and pay for everyday things — with clear limits and safety built in.
        </Text>

        <View className="self-start bg-white/15 px-3 py-1.5 rounded-full flex-row items-center">
          <Text className="text-[11px] text-white mr-1.5">🌐</Text>
          <Text className="text-[11px] font-semibold text-white">
            Niger–Nigeria corridor
          </Text>
        </View>
      </View>

      {/* Why We Built Xenza */}
      <Text className="text-[16px] font-bold text-[#1A1A1A] mb-2">
        Why we built Xenza
      </Text>
      <Text className="text-[13px] text-[#555555] leading-[20px] mb-3">
        Moving money between Niger and Nigeria has always meant queues, agents
        and manual conversion. Xenza puts both currencies in one place so a
        transfer takes seconds instead of a trip across town.
      </Text>
      <Text className="text-[13px] text-[#555555] leading-[20px] mb-6">
        The corridor rates and every fee are shown before you confirm, and your
        daily ceilings are always visible — so nothing about your money is a
        surprise.
      </Text>

      {/* AT A GLANCE 2x2 Grid */}
      <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-3">
        AT A GLANCE
      </Text>

      <View className="gap-3 mb-6">
        {/* Row 1 */}
        <View className="flex-row gap-3">
          {/* Corridor Wallets */}
          <View className="flex-1 bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-3.5">
            <View className="w-8 h-8 rounded-full bg-[#D8F3E5] items-center justify-center mb-2.5">
              <Text className="text-xs text-[#008744]">💳</Text>
            </View>
            <Text className="text-[10px] font-bold text-[#888888] tracking-[0.4px] mb-0.5">
              CORRIDOR WALLETS
            </Text>
            <Text className="text-xs font-bold text-[#1A1A1A]">
              CFA + Naira
            </Text>
          </View>

          {/* Exchange Rate */}
          <View className="flex-1 bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-3.5">
            <View className="w-8 h-8 rounded-full bg-[#FBE5CE] items-center justify-center mb-2.5">
              <Text className="text-xs text-[#C86D1F]">⇄</Text>
            </View>
            <Text className="text-[10px] font-bold text-[#888888] tracking-[0.4px] mb-0.5">
              EXCHANGE RATE
            </Text>
            <Text className="text-xs font-bold text-[#1A1A1A]">
              Live, shown upfront
            </Text>
          </View>
        </View>

        {/* Row 2 */}
        <View className="flex-row gap-3">
          {/* Protection */}
          <View className="flex-1 bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-3.5">
            <View className="w-8 h-8 rounded-full bg-[#E3F2F0] items-center justify-center mb-2.5">
              <Text className="text-xs text-[#1E7B6B]">🛡️</Text>
            </View>
            <Text className="text-[10px] font-bold text-[#888888] tracking-[0.4px] mb-0.5">
              PROTECTION
            </Text>
            <Text className="text-xs font-bold text-[#1A1A1A]">
              PIN, KYC and limits
            </Text>
          </View>

          {/* Languages */}
          <View className="flex-1 bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-3.5">
            <View className="w-8 h-8 rounded-full bg-[#D8F3E5] items-center justify-center mb-2.5">
              <Text className="text-xs text-[#008744]">文A</Text>
            </View>
            <Text className="text-[10px] font-bold text-[#888888] tracking-[0.4px] mb-0.5">
              LANGUAGES
            </Text>
            <Text className="text-xs font-bold text-[#1A1A1A]">
              English, French, Hausa
            </Text>
          </View>
        </View>
      </View>

      {/* APP INFORMATION Card */}
      <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
        APP INFORMATION
      </Text>
      <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl overflow-hidden mb-5">
        <View className="px-4 py-3.5 flex-row items-center justify-between border-b border-[#EFECE6]">
          <View className="flex-row items-center">
            <View className="w-7 h-7 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
              <Text className="text-xs text-[#666666]">⊞</Text>
            </View>
            <Text className="text-xs text-[#666666]">App version</Text>
          </View>
          <Text className="text-xs font-bold text-[#1A1A1A]">1.0.0 (demo)</Text>
        </View>

        <View className="px-4 py-3.5 flex-row items-center justify-between border-b border-[#EFECE6]">
          <View className="flex-row items-center">
            <View className="w-7 h-7 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
              <Text className="text-xs text-[#666666]">⑂</Text>
            </View>
            <Text className="text-xs text-[#666666]">Build channel</Text>
          </View>
          <Text className="text-xs font-bold text-[#1A1A1A]">Preview</Text>
        </View>

        <View className="px-4 py-3.5 flex-row items-center justify-between border-b border-[#EFECE6]">
          <View className="flex-row items-center">
            <View className="w-7 h-7 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
              <Text className="text-xs text-[#666666]">🏢</Text>
            </View>
            <Text className="text-xs text-[#666666]">Built by</Text>
          </View>
          <Text className="text-xs font-bold text-[#1A1A1A]">
            Xenza Technologies
          </Text>
        </View>

        <View className="px-4 py-3.5 flex-row items-center justify-between border-b border-[#EFECE6]">
          <View className="flex-row items-center">
            <View className="w-7 h-7 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
              <Text className="text-xs text-[#666666]">📍</Text>
            </View>
            <Text className="text-xs text-[#666666]">Operates in</Text>
          </View>
          <Text className="text-xs font-bold text-[#1A1A1A]">
            Niger & Nigeria
          </Text>
        </View>

        <View className="px-4 py-3.5 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-7 h-7 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
              <Text className="text-xs text-[#666666]">✉️</Text>
            </View>
            <Text className="text-xs text-[#666666]">Contact</Text>
          </View>
          <Text className="text-xs font-bold text-[#1A1A1A]">
            help@xenza.app
          </Text>
        </View>
      </View>

      {/* Still Have a Question Support Card */}
      <View className="bg-[#E6F4F1] rounded-2xl p-4">
        <Text className="text-sm font-bold text-[#1A1A1A] mb-1">
          Still have a question?
        </Text>
        <Text className="text-xs text-[#2C5E54] leading-[18px] mb-4">
          Our team answers in English, French and Hausa — and picks up the phone
          when a payment is in progress.
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            onContactSupport ??
            (() => console.log("Navigate to HelpAndSupportScreen"))
          }
          className="bg-[#1B7A6E] h-12 rounded-xl flex-row items-center justify-center"
        >
          <Text className="text-white text-xs mr-2">🎧</Text>
          <Text className="text-white text-xs font-bold">Contact support</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AboutTab;

const styles = StyleSheet.create({});
