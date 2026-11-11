import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Clipboard,
} from "react-native";
import { ActivityTransaction } from "../RecentActivitySection";
import { useTx } from "../../../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

export type CorridorCountry = "NE" | "NG";

interface WalletDetailScreenProps {
  countryCode?: CorridorCountry;
  balanceFormatted?: string;
  walletId?: string;
  onBack?: () => void;
  onActionPress?: (
    action: "send" | "convert" | "cash_in",
    countryCode: CorridorCountry,
  ) => void;
}

const NIGER_HISTORY: ActivityTransaction[] = [
  {
    id: "1",
    title: "Cash in • Agent Moussa",
    subtitle: "Yesterday · completed",
    amountText: "+150,000 FCFA",
    isIncoming: true,
    icon: "+",
  },
  {
    id: "2",
    title: "Sent to Aisha Bello",
    subtitle: "2 days ago · completed",
    amountText: "-45,000 FCFA",
    feeText: "fee 360 FCFA",
    isIncoming: false,
    icon: "➤",
  },
  {
    id: "3",
    title: "Airtime • Airtel Niger",
    subtitle: "2 days ago · completed",
    amountText: "-5,000 FCFA",
    isIncoming: false,
    icon: "📱",
  },
  {
    id: "4",
    title: "Received from Ibrahim Sow",
    subtitle: "4 days ago · completed",
    amountText: "+120,000 FCFA",
    isIncoming: true,
    icon: "⬇",
  },
  {
    id: "5",
    title: "Data bundle • Orange NE",
    subtitle: "6 days ago · completed",
    amountText: "-10,000 FCFA",
    isIncoming: false,
    icon: "📶",
  },
  {
    id: "6",
    title: "Electricity • NIGELEC",
    subtitle: "02 Nov 2026 · completed",
    amountText: "-25,000 FCFA",
    feeText: "fee 250 FCFA",
    isIncoming: false,
    icon: "⚡",
  },
];

const NIGERIA_HISTORY: ActivityTransaction[] = [
  {
    id: "1",
    title: "Cash in • Bank Transfer",
    subtitle: "Yesterday · completed",
    amountText: "+₦100,000",
    isIncoming: true,
    icon: "+",
  },
  {
    id: "2",
    title: "Sent to Moussa Diallo",
    subtitle: "2 days ago · completed",
    amountText: "-₦25,000",
    feeText: "fee ₦200",
    isIncoming: false,
    icon: "➤",
  },
  {
    id: "3",
    title: "Airtime • MTN Nigeria",
    subtitle: "2 days ago · completed",
    amountText: "-₦2,500",
    isIncoming: false,
    icon: "📱",
  },
  {
    id: "4",
    title: "Received from Fatima Yusuf",
    subtitle: "4 days ago · completed",
    amountText: "+₦75,000",
    isIncoming: true,
    icon: "⬇",
  },
];

export default function WalletDetailScreen({
  countryCode = "NE",
  balanceFormatted,
  walletId,
  onBack,
  onActionPress,
}: WalletDetailScreenProps) {
  const tx = useTx();
  const [copied, setCopied] = useState<boolean>(false);

  const isNiger = countryCode === "NE";

  const config = isNiger
    ? {
        countryName: tx.common.nigerLabel,
        currencyFullName: "West African CFA Franc",
        defaultBalance: "268,000 FCFA",
        defaultWalletId: "7047703551",
        cardBg: "bg-[#E87718]",
        history: NIGER_HISTORY,
      }
    : {
        countryName: tx.common.nigeriaLabel,
        currencyFullName: "Nigerian Naira",
        defaultBalance: "₦149,496",
        defaultWalletId: "9052393820",
        cardBg: "bg-[#009A49]",
        history: NIGERIA_HISTORY,
      };

  const activeWalletId = walletId ?? config.defaultWalletId;
  const activeBalance = balanceFormatted ?? config.defaultBalance;

  const handleCopyWalletId = () => {
    Clipboard.setString(activeWalletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const actionButtons = [
    { id: "send" as const, label: tx.common.send, icon: "➤" },
    { id: "convert" as const, label: tx.common.convert, icon: "⇄" },
    { id: "cash_in" as const, label: "Cash in", icon: "⊕" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header with Bottom Border */}
      <View className="flex-row items-center px-5 pt-3 pb-3.5 border-b border-[#EFECE6]">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back to Home"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <View>
          <Text className="text-base font-bold text-[#1A1A1A]">
            {config.countryName}
          </Text>
          <Text className="text-xs text-[#666666] mt-0.5">Partner wallet</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 32,
        }}
      >
        {/* Hero Wallet Balance Card */}
        <View
          className={`${config.cardBg} rounded-2xl p-5 mb-4 overflow-hidden relative`}
        >
          {/* Decorative Top-Right Circle Arc */}
          <View className="w-40 h-40 rounded-full bg-white/10 absolute -top-10 -right-10" />

          {/* Currency Header Row */}
          <View className="flex-row items-center mb-5 z-10">
            <Text className="text-xs font-extrabold text-white/95 mr-2">
              {countryCode}
            </Text>
            <Text className="text-sm font-medium text-white/90">
              {config.currencyFullName}
            </Text>
          </View>

          {/* Available Balance */}
          <View className="mb-5 z-10">
            <Text className="text-[10px] font-bold text-white/80 tracking-[0.6px] mb-1">
              AVAILABLE BALANCE
            </Text>
            <Text className="text-[30px] font-extrabold text-white">
              {activeBalance}
            </Text>
          </View>

          {/* Inner Translucent WALLET ID Box */}
          <View className="bg-white/15 rounded-xl px-4 py-3 flex-row items-center justify-between z-10">
            <View>
              <Text className="text-[10px] font-bold text-white/75 tracking-[0.5px] mb-0.5">
                WALLET ID
              </Text>
              <Text className="text-sm font-bold text-white tracking-wider">
                {activeWalletId}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleCopyWalletId}
              className="w-9 h-9 rounded-lg bg-white/20 items-center justify-center"
            >
              <Text className="text-white text-sm font-bold">
                {copied ? "✓" : "⧉"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3 Action Cards Row (Send, Convert, Cash in) */}
        <View className="flex-row gap-3 mb-7">
          {actionButtons.map((btn) => (
            <TouchableOpacity
              key={btn.id}
              activeOpacity={0.8}
              onPress={() => onActionPress?.(btn.id, countryCode)}
              className="flex-1 bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl py-4 items-center justify-center"
            >
              <View className="w-8 h-8 rounded-full bg-[#DDF5E7] items-center justify-center mb-2">
                <Text className="text-sm font-bold text-[#008744]">
                  {btn.icon}
                </Text>
              </View>
              <Text className="text-xs font-semibold text-[#1A1A1A]">
                {btn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Wallet History Section */}
        <Text className="text-base font-bold text-[#1A1A1A] mb-4">
          Wallet history
        </Text>

        <View className="gap-4">
          {config.history.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center justify-between"
            >
              {/* Left Icon + Title & Date */}
              <View className="flex-row items-center flex-1 pr-3">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                    item.isIncoming ? "bg-[#DDF5E7]" : "bg-[#EFECE6]"
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      item.isIncoming ? "text-[#008744]" : "text-[#4A4A4A]"
                    }`}
                  >
                    {item.icon}
                  </Text>
                </View>

                <View className="flex-1">
                  <Text
                    numberOfLines={1}
                    className="text-sm font-bold text-[#1A1A1A]"
                  >
                    {item.title}
                  </Text>
                  <Text className="text-xs text-[#666666] mt-0.5">
                    {item.subtitle}
                  </Text>
                </View>
              </View>

              {/* Right Amount + Fee */}
              <View className="items-end">
                <Text
                  className={`text-sm font-bold ${
                    item.isIncoming ? "text-[#008744]" : "text-[#1A1A1A]"
                  }`}
                >
                  {item.amountText}
                </Text>
                {item.feeText && (
                  <Text className="text-[11px] text-[#888888] mt-0.5">
                    {item.feeText}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
