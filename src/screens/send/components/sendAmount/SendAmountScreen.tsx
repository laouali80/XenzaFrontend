import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTx } from "../../../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

export type WalletCurrency = "XOF" | "NGN";

export interface SenderWallet {
  id: string;
  countryCode: "NE" | "NG";
  title: string;
  currency: WalletCurrency;
  balance: number;
  dailyLimit: number;
  usedToday: number;
}

interface SendAmountScreenProps {
  recipientName?: string;
  recipientSubtext?: string;
  wallets?: SenderWallet[];
  onBack?: () => void;
  onContinue?: (transferDetails: {
    wallet: SenderWallet;
    amount: number;
    fee: number;
    totalDebited: number;
    recipientGets: number;
  }) => void;
}

const DEFAULT_WALLETS: SenderWallet[] = [
  {
    id: "ne-1",
    countryCode: "NE",
    title: "Niger wallet · XOF",
    currency: "XOF",
    balance: 268210,
    dailyLimit: 5000000,
    usedToday: 0,
  },
  {
    id: "ng-1",
    countryCode: "NG",
    title: "Nigeria wallet · NGN",
    currency: "NGN",
    balance: 149496,
    dailyLimit: 10000000,
    usedToday: 0,
  },
];

export default function SendAmountScreen({
  recipientName = "Ibrahim Sow",
  recipientSubtext = "+227 90 55 71 34",
  wallets = DEFAULT_WALLETS, // Pass a 1-item array when user has only 1 wallet
  onBack,
  onContinue,
}: SendAmountScreenProps) {
  const tx = useTx();

  const [selectedWalletId, setSelectedWalletId] = useState<string>(
    wallets[0]?.id || "ne-1",
  );
  const [rawAmount, setRawAmount] = useState<string>("");

  const activeWallet = useMemo(
    () => wallets.find((w) => w.id === selectedWalletId) || wallets[0],
    [wallets, selectedWalletId],
  );

  // Format initials (e.g. "Ibrahim Sow" -> "IS", "as" -> "A")
  const initials = useMemo(() => {
    const parts = recipientName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return recipientName.slice(0, 1).toUpperCase();
  }, [recipientName]);

  // Format currency helper matching your screenshots
  const formatMoney = (val: number, currency: WalletCurrency) => {
    const hasDecimals = val % 1 !== 0;
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return currency === "XOF" ? `${formattedNum} FCFA` : `₦${formattedNum}`;
  };

  // Calculations (0.6% fee matching 256 -> 1.54 FCFA in screenshot 1)
  const numericAmount = parseFloat(rawAmount) || 0;
  const fee =
    numericAmount > 0 ? Number((numericAmount * 0.006).toFixed(2)) : 0;
  const totalDebited = Number((numericAmount + fee).toFixed(2));
  const recipientGets = numericAmount;

  const remainingDailyLimit = Math.max(
    0,
    activeWallet.dailyLimit - activeWallet.usedToday - totalDebited,
  );
  const limitUsedPercent = Math.min(
    100,
    ((activeWallet.usedToday + totalDebited) / activeWallet.dailyLimit) * 100,
  );

  const isAmountValid =
    numericAmount > 0 &&
    totalDebited <= activeWallet.balance &&
    totalDebited <= activeWallet.dailyLimit - activeWallet.usedToday;

  const handleAmountChange = (text: string) => {
    // Allow digits and at most one decimal point
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    setRawAmount(cleaned);
  };

  const handleSelectWallet = (walletId: string) => {
    setSelectedWalletId(walletId);
    setRawAmount(""); // Reset amount when switching currencies
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Header */}
        <View className="flex-row items-center px-5 pt-3 pb-3.5">
          <TouchableOpacity
            onPress={
              onBack ?? (() => console.log("Go back to recipient selection"))
            }
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <Text className="text-lg font-bold text-[#1A1A1A]">How much?</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 6,
            paddingBottom: 32,
          }}
        >
          {/* Recipient Summary Pill Card */}
          <View className="bg-[#F6F3ED] rounded-2xl p-4 flex-row items-center mb-6">
            <View className="w-11 h-11 rounded-full bg-[#D1F2DF] items-center justify-center mr-3.5">
              <Text className="text-sm font-bold text-[#008744]">
                {initials}
              </Text>
            </View>
            <View>
              <Text className="text-[15px] font-bold text-[#1A1A1A]">
                {recipientName}
              </Text>
              <Text className="text-xs text-[#666666] mt-0.5">
                {recipientSubtext}
              </Text>
            </View>
          </View>

          {/* SEND FROM Wallet Selector (Supports 1 or 2 wallets) */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
            SEND FROM
          </Text>

          <View className="gap-3 mb-6">
            {wallets.map((wallet) => {
              const isSelected = wallet.id === activeWallet.id;
              return (
                <TouchableOpacity
                  key={wallet.id}
                  activeOpacity={0.85}
                  onPress={() => handleSelectWallet(wallet.id)}
                  className={`flex-row items-center justify-between px-4 py-3.5 rounded-2xl border-[1.5px] ${
                    isSelected
                      ? "bg-[#F2FBF6] border-[#52B788]"
                      : "bg-[#FAF8F5] border-[#EAE5DC]"
                  }`}
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                      <Text className="text-xs font-extrabold text-[#1A1A1A]">
                        {wallet.countryCode}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-sm font-bold text-[#1A1A1A]">
                        {wallet.title}
                      </Text>
                      <Text className="text-xs text-[#666666] mt-0.5">
                        Balance {formatMoney(wallet.balance, wallet.currency)}
                      </Text>
                    </View>
                  </View>

                  {/* Radio Indicator */}
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

          {/* AMOUNT TO SEND Input Box */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            AMOUNT TO SEND
          </Text>
          <View className="bg-white border-[1.5px] border-[#E0E0E0] rounded-2xl px-4 h-[64px] flex-row items-center justify-between mb-4">
            <TextInput
              value={rawAmount}
              onChangeText={handleAmountChange}
              placeholder="0"
              placeholderTextColor="#B0B0B0"
              keyboardType="decimal-pad"
              className="flex-1 text-[26px] font-bold text-[#1A1A1A] h-full"
            />
            <Text className="text-sm font-semibold text-[#666666] ml-2">
              {activeWallet.currency === "XOF" ? "FCFA" : "NGN"}
            </Text>
          </View>

          {/* Daily Limit Progress Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-2.5">
              <View className="flex-row items-center">
                <Text className="text-xs text-[#008744] mr-1.5">🛡️</Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  Daily limit
                </Text>
              </View>
              <Text className="text-[11px] text-[#666666]">
                {formatMoney(activeWallet.usedToday, activeWallet.currency)} of{" "}
                {formatMoney(activeWallet.dailyLimit, activeWallet.currency)}{" "}
                used today
              </Text>
            </View>

            {/* Progress Track */}
            <View className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden mb-2">
              <View
                style={{ width: `${limitUsedPercent}%` }}
                className="h-full bg-[#009A49] rounded-full"
              />
            </View>

            <Text className="text-[11px] text-[#666666]">
              {formatMoney(remainingDailyLimit, activeWallet.currency)} left
              today
            </Text>
          </View>

          {/* Fee & Total Breakdown Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 gap-3 mb-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-[#666666]">Fee</Text>
              <Text className="text-xs font-semibold text-[#1A1A1A]">
                {formatMoney(fee, activeWallet.currency)}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-[#666666]">Total debited</Text>
              <Text className="text-xs font-bold text-[#1A1A1A]">
                {formatMoney(totalDebited, activeWallet.currency)}
              </Text>
            </View>

            <View className="border-t border-[#E8E3D9] pt-3 flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-[#1A1A1A]">
                Recipient gets
              </Text>
              <Text className="text-[15px] font-bold text-[#008744]">
                {formatMoney(recipientGets, activeWallet.currency)}
              </Text>
            </View>
          </View>

          {/* Insufficient Balance Warning */}
          {totalDebited > activeWallet.balance && (
            <Text className="text-xs font-medium text-[#C86D1F] text-center mb-3">
              Insufficient balance in your {activeWallet.title}.
            </Text>
          )}

          {/* Primary Continue Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!isAmountValid}
            onPress={() =>
              onContinue?.({
                wallet: activeWallet,
                amount: numericAmount,
                fee,
                totalDebited,
                recipientGets,
              })
            }
            className={`h-[54px] rounded-xl items-center justify-center ${
              isAmountValid ? "bg-[#009A49]" : "bg-[#8FD1AE]"
            }`}
          >
            <Text className="text-white text-base font-semibold">
              {tx.screens.preAuthCTA.continueBtn}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
