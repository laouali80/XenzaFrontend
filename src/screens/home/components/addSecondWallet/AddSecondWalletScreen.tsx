import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTx } from "../../../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

type TargetCorridor = "NG" | "NE";

interface AddSecondWalletScreenProps {
  targetCountry?: TargetCorridor;
  onBack?: () => void;
  onConfirmAddWallet?: (country: TargetCorridor) => void;
}

export default function AddSecondWalletScreen({
  targetCountry = "NG",
  onBack,
  onConfirmAddWallet,
}: AddSecondWalletScreenProps) {
  const tx = useTx();

  const isNigeria = targetCountry === "NG";

  const walletConfig = isNigeria
    ? {
        code: "NG",
        countryName: tx.common.nigeriaLabel,
        headerPair: "Nigeria · NGN",
        partnerTitle: "Nigeria Partner Wallet",
        demoBalance: "150,000 ₦",
      }
    : {
        code: "NE",
        countryName: tx.common.nigerLabel,
        headerPair: "Niger · XOF",
        partnerTitle: "Niger Partner Wallet",
        demoBalance: "100,000 FCFA",
      };

  const features = [
    {
      id: "partner",
      icon: "💳",
      label: walletConfig.partnerTitle,
    },
    {
      id: "convert",
      icon: "⇄",
      label: "Instant conversion with your other wallet",
    },
    {
      id: "security",
      icon: "🛡️",
      label: "Same PIN and security as your main wallet",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header with Bottom Divider */}
      <View className="flex-row items-center px-5 pt-3 pb-3.5 border-b border-[#EFECE6]">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back to Home"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <View>
          <Text className="text-base font-bold text-[#1A1A1A]">
            Add second wallet
          </Text>
          <Text className="text-xs text-[#666666] mt-0.5">
            {walletConfig.countryName}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 28,
        }}
      >
        {/* Center Country Badge + Heading */}
        <View className="items-center mb-8">
          <View
            className={`w-[74px] h-[74px] rounded-2xl items-center justify-center mb-4 ${
              isNigeria ? "bg-[#D1F2DF]" : "bg-[#FBE5CE]"
            }`}
          >
            <Text
              className={`text-2xl font-bold ${
                isNigeria ? "text-[#008744]" : "text-[#C86D1F]"
              }`}
            >
              {walletConfig.code}
            </Text>
          </View>

          <Text className="text-[22px] font-bold text-[#1A1A1A] mb-1.5">
            {walletConfig.headerPair}
          </Text>
          <Text className="text-sm text-[#666666] text-center">
            Hold and use the other corridor currency.
          </Text>
        </View>

        {/* Features Benefits Card */}
        <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 gap-4 mb-5">
          {features.map((item) => (
            <View key={item.id} className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-[#D8F3E5] items-center justify-center mr-3.5">
                <Text className="text-sm text-[#008744] font-bold">
                  {item.icon}
                </Text>
              </View>
              <Text className="flex-1 text-sm font-medium text-[#1A1A1A]">
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Opening Balance (Demo) Callout Card */}
        <View className="bg-[#E6F4F1] border border-[#C8E6DF] rounded-2xl p-4 mb-7">
          <Text className="text-[11px] font-bold text-[#1E7B6B] tracking-[0.6px] mb-1.5">
            OPENING BALANCE (DEMO)
          </Text>
          <Text className="text-[22px] font-extrabold text-[#1A1A1A] mb-1">
            {walletConfig.demoBalance}
          </Text>
          <Text className="text-xs text-[#4A6B64]">
            Added so you can try transfers right away.
          </Text>
        </View>

        {/* Primary Confirm Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            if (onConfirmAddWallet) {
              onConfirmAddWallet(targetCountry);
            } else {
              console.log("Second wallet unlocked:", targetCountry);
            }
          }}
          className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
        >
          <Text className="text-white text-base font-semibold">
            Add second wallet
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
