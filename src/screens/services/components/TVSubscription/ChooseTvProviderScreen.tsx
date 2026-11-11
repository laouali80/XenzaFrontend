import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTx } from "../../../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

export type CorridorCountry = "NE" | "NG";

export interface TvProvider {
  id: string;
  name: string;
  plansCountText: string;
}

interface ChooseTvProviderScreenProps {
  primaryCountry?: CorridorCountry; // User's primary wallet ('NG' or 'NE')
  onBack?: () => void;
  onContinue?: (payload: {
    payFromCountry: CorridorCountry;
    provider: TvProvider;
  }) => void;
}

const TV_PROVIDERS: Record<CorridorCountry, TvProvider[]> = {
  NG: [
    { id: "ng-dstv", name: "DSTV", plansCountText: "5 plans" },
    { id: "ng-gotv", name: "GOtv", plansCountText: "4 plans" },
    { id: "ng-startimes", name: "StarTimes", plansCountText: "4 plans" },
  ],
  NE: [
    { id: "ne-canal", name: "CANAL+ Niger", plansCountText: "5 plans" },
    { id: "ne-startimes", name: "StarTimes Niger", plansCountText: "4 plans" },
  ],
};

export default function ChooseTvProviderScreen({
  primaryCountry = "NG", // Automatically orders primary wallet pill first
  onBack,
  onContinue,
}: ChooseTvProviderScreenProps) {
  const tx = useTx();

  // Order PAY FROM pills so the user's primary wallet always comes first
  const walletPills = useMemo(() => {
    const nigerPill = { country: "NE" as const, currency: "XOF" };
    const nigeriaPill = { country: "NG" as const, currency: "NGN" };
    return primaryCountry === "NG"
      ? [nigeriaPill, nigerPill]
      : [nigerPill, nigeriaPill];
  }, [primaryCountry]);

  const [selectedCountry, setSelectedCountry] =
    useState<CorridorCountry>(primaryCountry);

  const providers = useMemo(
    () => TV_PROVIDERS[selectedCountry],
    [selectedCountry],
  );

  const [selectedProviderId, setSelectedProviderId] = useState<string>(
    providers[0]?.id || "",
  );

  // Auto-select first provider whenever corridor changes
  useEffect(() => {
    if (providers.length > 0) {
      setSelectedProviderId(providers[0].id);
    }
  }, [providers]);

  const activeProvider = useMemo(
    () => providers.find((p) => p.id === selectedProviderId) || providers[0],
    [providers, selectedProviderId],
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center px-5 pt-3 pb-3.5">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back to Services"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold text-[#1A1A1A]">
          Choose a provider
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 32,
        }}
      >
        {/* PAY FROM Corridor Pills (Ordered by Primary Wallet First) */}
        <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
          PAY FROM
        </Text>

        <View className="flex-row items-center gap-2.5 mb-6">
          {walletPills.map((pill) => {
            const isSelected = selectedCountry === pill.country;
            return (
              <TouchableOpacity
                key={pill.country}
                activeOpacity={0.8}
                onPress={() => setSelectedCountry(pill.country)}
                className={`flex-row items-center px-4 py-2.5 rounded-full border-[1.5px] ${
                  isSelected
                    ? "bg-[#E6F5EC] border-[#52B788]"
                    : "bg-[#FAF8F5] border-[#E5E0D8]"
                }`}
              >
                <Text
                  className={`text-[11px] font-extrabold mr-1.5 ${
                    isSelected ? "text-[#008744]" : "text-[#666666]"
                  }`}
                >
                  {pill.country}
                </Text>
                <Text
                  className={`text-xs font-bold ${
                    isSelected ? "text-[#1A1A1A]" : "text-[#555555]"
                  }`}
                >
                  {pill.currency}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* TV SUBSCRIPTION Section Label */}
        <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-3">
          TV SUBSCRIPTION
        </Text>

        {/* TV Provider List Cards */}
        <View className="gap-3 mb-7">
          {providers.map((provider) => {
            const isSelected = provider.id === activeProvider?.id;
            return (
              <TouchableOpacity
                key={provider.id}
                activeOpacity={0.85}
                onPress={() => setSelectedProviderId(provider.id)}
                className={`flex-row items-center justify-between px-4 py-4 rounded-2xl border-[1.5px] ${
                  isSelected
                    ? "bg-[#F2FBF6] border-[#52B788]"
                    : "bg-[#FAF8F5] border-[#EAE5DC]"
                }`}
              >
                {/* Left Warm Peach TV Badge + Provider Name & Plan Count */}
                <View className="flex-row items-center flex-1 pr-3">
                  <View className="w-11 h-11 rounded-xl bg-[#FBE5CE] items-center justify-center mr-3.5">
                    <Text className="text-lg text-[#C86D1F]">📺</Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-[15px] font-bold text-[#1A1A1A]">
                      {provider.name}
                    </Text>
                    <Text className="text-xs text-[#666666] mt-0.5">
                      {provider.plansCountText}
                    </Text>
                  </View>
                </View>

                {/* Right Checkmark vs Plus Circle Indicator */}
                {isSelected ? (
                  <View className="w-6 h-6 rounded-full bg-[#008744] items-center justify-center">
                    <Text className="text-white text-xs font-bold">✓</Text>
                  </View>
                ) : (
                  <View className="w-6 h-6 rounded-full border border-[#C8C3B8] items-center justify-center">
                    <Text className="text-xs text-[#888888] font-medium">
                      +
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            if (!activeProvider) return;
            onContinue
              ? onContinue({
                  payFromCountry: selectedCountry,
                  provider: activeProvider,
                })
              : console.log("Selected TV provider:", activeProvider.name);
          }}
          className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
        >
          <Text className="text-white text-base font-semibold">
            {tx.screens.preAuthCTA.continueBtn}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
