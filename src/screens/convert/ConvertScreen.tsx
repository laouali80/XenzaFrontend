import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTx } from "../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

export type WalletCurrency = "XOF" | "NGN";

export interface UserWallet {
  id: string;
  countryCode: "NE" | "NG";
  title: string;
  currency: WalletCurrency;
  balanceFormatted: string;
  balanceNumeric: number;
}

interface ConvertScreenProps {
  wallets?: UserWallet[];
  onAddSecondWallet?: () => void;
  onContinueConvert?: (payload: {
    fromWallet: UserWallet;
    toWallet: UserWallet;
    rateLabel: string;
  }) => void;
}

const DEFAULT_DUAL_WALLETS: UserWallet[] = [
  {
    id: "ne-1",
    countryCode: "NE",
    title: "Niger wallet · XOF",
    currency: "XOF",
    balanceFormatted: "267,908.20 FCFA",
    balanceNumeric: 267908.2,
  },
  {
    id: "ng-1",
    countryCode: "NG",
    title: "Nigeria wallet · NGN",
    currency: "NGN",
    balanceFormatted: "₦149,496",
    balanceNumeric: 149496,
  },
];

export default function ConvertScreen({
  wallets = DEFAULT_DUAL_WALLETS, // Pass a 1-item array to show the "You need two wallets" state
  onAddSecondWallet,
  onContinueConvert,
}: ConvertScreenProps) {
  const tx = useTx();

  const [fromWalletId, setFromWalletId] = useState<string>(
    wallets[0]?.id || "ne-1",
  );

  const hasTwoWallets = wallets.length >= 2;

  const fromWallet = useMemo(
    () => wallets.find((w) => w.id === fromWalletId) || wallets[0],
    [wallets, fromWalletId],
  );

  const toWallet = useMemo(
    () => wallets.find((w) => w.id !== fromWallet?.id) || wallets[1],
    [wallets, fromWallet],
  );

  const rateText =
    fromWallet?.currency === "XOF"
      ? "1,000 FCFA = ₦2,400"
      : "₦1,000 = 420 FCFA";

  const handleContinue = () => {
    if (!fromWallet || !toWallet) return;

    if (onContinueConvert) {
      onContinueConvert({
        fromWallet,
        toWallet,
        rateLabel: rateText,
      });
    } else {
      console.log("Proceeding to conversion amount:", {
        from: fromWallet.currency,
        to: toWallet.currency,
        rate: rateText,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 22,
          paddingTop: 18,
          paddingBottom: 32,
        }}
      >
        {/* Screen Header */}
        <Text className="text-[28px] font-bold text-[#1A1A1A] mb-1.5">
          {tx.common.convert}
        </Text>
        <Text className="text-[14px] text-[#666666] mb-7">
          Move money between your wallets at the corridor rate.
        </Text>

        {/* STATE 1: ONLY 1 WALLET UNLOCKED */}
        {!hasTwoWallets ? (
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl py-10 px-6 items-center">
            {/* Warm Orange Wallet Icon Badge */}
            <View className="w-14 h-14 rounded-2xl bg-[#FBE5CE] items-center justify-center mb-4">
              <Text className="text-2xl text-[#C86D1F]">👛</Text>
            </View>

            <Text className="text-[17px] font-bold text-[#1A1A1A] text-center mb-1.5">
              You need two wallets
            </Text>
            <Text className="text-xs text-[#666666] text-center leading-[18px] mb-6 px-2">
              Add your second corridor wallet to start converting between
              currencies.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={
                onAddSecondWallet ??
                (() => console.log("Navigate to AddSecondWalletScreen"))
              }
              className="bg-[#009A49] px-6 h-12 rounded-xl flex-row items-center justify-center"
            >
              <Text className="text-white text-base font-bold mr-1.5">+</Text>
              <Text className="text-white text-sm font-semibold">
                Add second wallet
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* STATE 2 & 3: BOTH CORRIDOR WALLETS UNLOCKED */
          <View>
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
              CONVERT FROM
            </Text>

            {/* Source Wallet Radio Cards */}
            <View className="gap-3 mb-5">
              {wallets.map((wallet) => {
                const isSelected = wallet.id === fromWallet.id;
                return (
                  <TouchableOpacity
                    key={wallet.id}
                    activeOpacity={0.85}
                    onPress={() => setFromWalletId(wallet.id)}
                    className={`flex-row items-center justify-between px-4 py-4 rounded-2xl border-[1.5px] ${
                      isSelected
                        ? "bg-[#F2FBF6] border-[#52B788]"
                        : "bg-[#FAF8F5] border-[#EAE5DC]"
                    }`}
                  >
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 rounded-full bg-[#EFECE6] items-center justify-center mr-3.5">
                        <Text className="text-xs font-extrabold text-[#1A1A1A]">
                          {wallet.countryCode}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-sm font-bold text-[#1A1A1A]">
                          {wallet.title}
                        </Text>
                        <Text className="text-xs text-[#666666] mt-0.5">
                          Balance {wallet.balanceFormatted}
                        </Text>
                      </View>
                    </View>

                    {/* Radio Circle */}
                    {isSelected ? (
                      <View className="w-5 h-5 rounded-full border-[2px] border-[#008744] items-center justify-center">
                        <View className="w-2.5 h-2.5 rounded-full bg-[#008744]" />
                      </View>
                    ) : (
                      <View className="w-5 h-5 rounded-full border-[1.5px] border-[#C8C3B8]" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Destination Wallet Box ("YOU RECEIVE IN") */}
            {toWallet && (
              <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl px-4 py-3.5 flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-[#D8F3E5] items-center justify-center mr-3.5">
                    <Text className="text-sm font-bold text-[#008744]">↓</Text>
                  </View>
                  <View>
                    <Text className="text-[10px] font-bold text-[#666666] tracking-[0.5px] mb-0.5">
                      YOU RECEIVE IN
                    </Text>
                    <Text className="text-sm font-bold text-[#1A1A1A]">
                      {toWallet.title}
                    </Text>
                  </View>
                </View>

                <Text className="text-xs font-extrabold text-[#1A1A1A]">
                  {toWallet.countryCode}
                </Text>
              </View>
            )}

            {/* Live Corridor Rate Pill */}
            <View className="bg-[#E6F4F1] rounded-xl px-4 py-3 flex-row items-center mb-6">
              <Text className="text-xs text-[#1E7B6B] mr-2">📈</Text>
              <Text className="text-xs font-semibold text-[#1E7B6B]">
                {rateText}
              </Text>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleContinue}
              className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
            >
              <Text className="text-white text-base font-semibold">
                {tx.screens.preAuthCTA.continueBtn}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
