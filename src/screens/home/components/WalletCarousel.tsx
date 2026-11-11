import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { useTx } from "../../../utils/tx";

export interface WalletItem {
  id: string;
  countryCode: "NE" | "NG";
  title: string;
  currency: "XOF" | "NGN";
  balanceFormatted: string;
  accountNumber: string;
  isPrimary?: boolean;
}

interface WalletCarouselProps {
  wallets: WalletItem[];
  hasSecondWallet: boolean;
  onSelectWallet?: (wallet: WalletItem) => void;
  onAddSecondWallet: () => void;
  onSeeAll: () => void;
}

export default function WalletCarousel({
  wallets,
  hasSecondWallet,
  onSelectWallet,
  onAddSecondWallet,
  onSeeAll,
}: WalletCarouselProps) {
  const tx = useTx();

  const handleCopyAccount = (accNumber: string) => {
    Clipboard.setString(accNumber);
  };

  return (
    <View className="mb-6">
      {/* Section Header */}
      <View className="flex-row items-center justify-between px-5 mb-3">
        <Text className="text-base font-bold text-[#1A1A1A]">Your wallets</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text className="text-xs font-semibold text-[#008744]">
            {tx.common.seeAll}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Wallet Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
        decelerationRate="fast"
        snapToInterval={294}
      >
        {wallets.map((wallet) => {
          const isNiger = wallet.countryCode === "NE";

          return (
            <TouchableOpacity
              key={wallet.id}
              activeOpacity={0.9}
              onPress={() => onSelectWallet?.(wallet)}
            >
              <View
                key={wallet.id}
                className={`w-[280px] h-[168px] rounded-2xl p-5 justify-between overflow-hidden relative ${
                  isNiger ? "bg-[#E87718]" : "bg-[#009A49]"
                }`}
              >
                {/* Decorative Corner Circles (Top-Right & Bottom-Right Arcs) */}
                <View className="w-36 h-36 rounded-full bg-white/10 absolute -top-8 -right-8" />
                <View className="w-28 h-28 rounded-full bg-white/10 absolute -bottom-10 right-6" />

                {/* Top Row: Country Label + Primary Badge */}
                <View className="flex-row items-start justify-between z-10">
                  <View>
                    <View className="flex-row items-center">
                      <Text className="text-[11px] font-extrabold text-white/90 mr-1.5">
                        {wallet.countryCode}
                      </Text>
                      <Text className="text-sm font-bold text-white">
                        {wallet.title}
                      </Text>
                    </View>
                    <Text className="text-xs font-medium text-white/80 mt-0.5">
                      {wallet.currency}
                    </Text>
                  </View>

                  {wallet.isPrimary && (
                    <View className="bg-white/20 px-2.5 py-1 rounded-full">
                      <Text className="text-[11px] font-semibold text-white">
                        {tx.common.primary}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Middle Section: Available Balance */}
                <View className="z-10">
                  <Text className="text-[10px] font-bold text-white/80 tracking-[0.6px] mb-1">
                    AVAILABLE BALANCE
                  </Text>
                  <Text className="text-[24px] font-extrabold text-white">
                    {wallet.balanceFormatted}
                  </Text>
                </View>

                {/* Bottom Section: Copyable Account Number */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleCopyAccount(wallet.accountNumber)}
                  className="flex-row items-center z-10"
                >
                  <Text className="text-xs text-white/85 mr-1.5">⧉</Text>
                  <Text className="text-xs font-medium text-white/95">
                    {wallet.accountNumber}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Add Second Wallet Dashed Card (Shown when user only has 1 wallet) */}
        {!hasSecondWallet && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onAddSecondWallet}
            className="w-[270px] h-[168px] rounded-2xl border-[1.5px] border-dashed border-[#D6D0C4] bg-[#FAF8F5] p-5 items-center justify-center"
          >
            <View className="w-10 h-10 rounded-full bg-[#FBE5CE] items-center justify-center mb-3">
              <Text className="text-lg font-bold text-[#C86D1F]">+</Text>
            </View>
            <Text className="text-sm font-bold text-[#1A1A1A] text-center mb-1">
              Add second wallet
            </Text>
            <Text className="text-xs text-[#666666] text-center leading-[17px]">
              Hold and use the other corridor currency.
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
