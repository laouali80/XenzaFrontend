import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type WalletCurrency = "XOF" | "NGN";

interface RatesAndFeesScreenProps {
  defaultCurrency?: WalletCurrency;
  onBack?: () => void;
}

export default function RatesAndFeesScreen({
  defaultCurrency = "XOF",
  onBack,
}: RatesAndFeesScreenProps) {
  const [selectedCurrency, setSelectedCurrency] =
    useState<WalletCurrency>(defaultCurrency);
  const [rawEstimateAmount, setRawEstimateAmount] = useState<string>("");

  const isXof = selectedCurrency === "XOF";

  // Fee Caps per currency matching your screenshots
  const caps = isXof
    ? {
        send: 2000,
        convert: 2000,
        cashOut: 2000,
        utility: 1000,
      }
    : {
        send: 4000,
        convert: 4000,
        cashOut: 4000,
        utility: 2000,
      };

  const formatMoney = (val: number) => {
    const hasDecimals = val % 1 !== 0;
    const formattedNum = val.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return isXof ? `${formattedNum} FCFA` : `₦${formattedNum}`;
  };

  // Quick Fee Estimate Calculations (with caps enforced)
  const numericAmount = parseFloat(rawEstimateAmount) || 0;
  const sendFee =
    numericAmount > 0
      ? Math.min(caps.send, Number((numericAmount * 0.006).toFixed(2)))
      : 0;
  const convertFee =
    numericAmount > 0
      ? Math.min(caps.convert, Number((numericAmount * 0.008).toFixed(2)))
      : 0;
  const cashOutFee =
    numericAmount > 0
      ? Math.min(caps.cashOut, Number((numericAmount * 0.005).toFixed(2)))
      : 0;

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    setRawEstimateAmount(cleaned);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Header Bar */}
        <View className="flex-row items-center px-5 pt-3 pb-3.5 border-b border-[#EFECE6]">
          <TouchableOpacity
            onPress={onBack ?? (() => console.log("Go back to Menu"))}
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <View>
            <Text className="text-lg font-bold text-[#1A1A1A]">
              Rates & fees
            </Text>
            <Text className="text-xs text-[#666666] mt-0.5">
              The corridor rate and every fee, in one place.
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 18,
            paddingBottom: 36,
          }}
        >
          {/* Green Live Corridor Rate Card */}
          <View className="bg-[#008744] rounded-2xl p-4 mb-5">
            {/* Header Row */}
            <View className="flex-row items-center justify-between mb-3.5">
              <View className="flex-row items-center">
                <View className="w-7 h-7 rounded-lg bg-white/15 items-center justify-center mr-2.5">
                  <Text className="text-xs text-white font-bold">📈</Text>
                </View>
                <Text className="text-sm font-bold text-white">
                  Corridor rate
                </Text>
              </View>

              <View className="bg-white/20 px-2.5 py-1 rounded-full flex-row items-center">
                <View className="w-1.5 h-1.5 rounded-full bg-[#86EFAC] mr-1.5" />
                <Text className="text-[11px] font-bold text-white">Live</Text>
              </View>
            </View>

            {/* Rate Rows */}
            <View className="gap-2 mb-3.5">
              <View className="bg-white/15 rounded-xl px-3.5 py-2.5 flex-row items-center justify-between">
                <Text className="text-xs font-medium text-white/90">
                  CFA to Naira
                </Text>
                <Text className="text-xs font-extrabold text-white">
                  1,000 FCFA = ₦2,400
                </Text>
              </View>

              <View className="bg-white/15 rounded-xl px-3.5 py-2.5 flex-row items-center justify-between">
                <Text className="text-xs font-medium text-white/90">
                  Naira to CFA
                </Text>
                <Text className="text-xs font-extrabold text-white">
                  ₦1,000 = 420 FCFA
                </Text>
              </View>
            </View>

            {/* Margin Footnote */}
            <View className="flex-row items-start">
              <Text className="text-xs text-white/85 mr-1.5 mt-0.5">ⓘ</Text>
              <Text className="flex-1 text-[11px] text-white/85 leading-[16px]">
                The rate includes a 1.2% corridor margin. Sends and conversions
                use this rate.
              </Text>
            </View>
          </View>

          {/* SHOW FEES IN Currency Toggle */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            SHOW FEES IN
          </Text>
          <View className="flex-row bg-[#F3EFEA] rounded-full p-1 mb-6">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setSelectedCurrency("XOF")}
              className={`flex-1 py-2.5 rounded-full items-center justify-center ${
                isXof ? "bg-white border border-[#EAE5DC]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  isXof ? "text-[#1A1A1A]" : "text-[#666666]"
                }`}
              >
                CFA Franc
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setSelectedCurrency("NGN")}
              className={`flex-1 py-2.5 rounded-full items-center justify-center ${
                !isXof ? "bg-white border border-[#EAE5DC]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  !isXof ? "text-[#1A1A1A]" : "text-[#666666]"
                }`}
              >
                Naira
              </Text>
            </TouchableOpacity>
          </View>

          {/* SECTION 1: SENDS & TRANSFERS */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
            SENDS & TRANSFERS
          </Text>
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 flex-row items-center justify-between mb-5">
            <View className="flex-row items-center flex-1 pr-3">
              <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                <Text className="text-sm text-[#008744]">➤</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  Send money
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-[11px] text-[#666666] mt-0.5"
                >
                  To a Xenza user or a bank account
                </Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-sm font-extrabold text-[#1A1A1A]">
                0.6%
              </Text>
              <Text className="text-[10px] text-[#666666] mt-0.5">
                Capped at {formatMoney(caps.send)}
              </Text>
            </View>
          </View>

          {/* SECTION 2: CONVERSIONS */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
            CONVERSIONS
          </Text>
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 flex-row items-center justify-between mb-5">
            <View className="flex-row items-center flex-1 pr-3">
              <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                <Text className="text-sm text-[#008744]">⇄</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  Convert between wallets
                </Text>
                <Text className="text-[11px] text-[#666666] mt-0.5">
                  Move between CFA and Naira
                </Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-sm font-extrabold text-[#1A1A1A]">
                0.8%
              </Text>
              <Text className="text-[10px] text-[#666666] mt-0.5">
                Capped at {formatMoney(caps.convert)}
              </Text>
            </View>
          </View>

          {/* SECTION 3: AGENT CASH */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
            AGENT CASH
          </Text>
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl overflow-hidden mb-5">
            {/* Cash Out Row */}
            <View className="p-4 flex-row items-center justify-between border-b border-[#EFECE6]">
              <View className="flex-row items-center flex-1 pr-3">
                <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                  <Text className="text-sm text-[#008744]">⊖</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#1A1A1A]">
                    Cash out
                  </Text>
                  <Text className="text-[11px] text-[#666666] mt-0.5">
                    Withdraw at any Xenza agent
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-sm font-extrabold text-[#1A1A1A]">
                  0.5%
                </Text>
                <Text className="text-[10px] text-[#666666] mt-0.5">
                  Capped at {formatMoney(caps.cashOut)}
                </Text>
              </View>
            </View>

            {/* Cash In Row */}
            <View className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1 pr-3">
                <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                  <Text className="text-sm text-[#008744]">⊕</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#1A1A1A]">
                    Cash in
                  </Text>
                  <Text className="text-[11px] text-[#666666] mt-0.5">
                    Deposit at any Xenza agent
                  </Text>
                </View>
              </View>

              <View className="bg-[#FBE5CE] px-2.5 py-1 rounded-full flex-row items-center">
                <Text className="text-[10px] text-[#C86D1F] font-bold mr-1">
                  ✓
                </Text>
                <Text className="text-xs font-bold text-[#B86318]">Free</Text>
              </View>
            </View>
          </View>

          {/* SECTION 4: AIRTIME, DATA & BILLS */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2.5">
            AIRTIME, DATA & BILLS
          </Text>
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl overflow-hidden mb-5">
            {/* Airtime, Data & TV Row */}
            <View className="p-4 flex-row items-center justify-between border-b border-[#EFECE6]">
              <View className="flex-row items-center flex-1 pr-3">
                <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                  <Text className="text-sm text-[#008744]">📱</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#1A1A1A]">
                    Airtime, data & TV
                  </Text>
                  <Text className="text-[11px] text-[#666666] mt-0.5">
                    All networks and bouquets
                  </Text>
                </View>
              </View>

              <View className="bg-[#FBE5CE] px-2.5 py-1 rounded-full flex-row items-center">
                <Text className="text-[10px] text-[#C86D1F] font-bold mr-1">
                  ✓
                </Text>
                <Text className="text-xs font-bold text-[#B86318]">Free</Text>
              </View>
            </View>

            {/* Utility Bills Row */}
            <View className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1 pr-3">
                <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                  <Text className="text-sm text-[#008744]">⚡</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#1A1A1A]">
                    Utility bills
                  </Text>
                  <Text className="text-[11px] text-[#666666] mt-0.5">
                    Electricity and water
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-sm font-extrabold text-[#1A1A1A]">
                  1%
                </Text>
                <Text className="text-[10px] text-[#666666] mt-0.5">
                  Capped at {formatMoney(caps.utility)}
                </Text>
              </View>
            </View>
          </View>

          {/* SECTION 5: QUICK FEE ESTIMATE CALCULATOR */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-5">
            <View className="flex-row items-center mb-3.5">
              <View className="w-9 h-9 rounded-full bg-[#FBE5CE] items-center justify-center mr-3">
                <Text className="text-sm text-[#C86D1F]">🧮</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  Quick fee estimate
                </Text>
                <Text className="text-xs text-[#666666] mt-0.5">
                  Enter an amount to see what each fee costs.
                </Text>
              </View>
            </View>

            {/* Amount Input */}
            <View className="bg-white border border-[#E0E0E0] rounded-xl px-3.5 h-12 flex-row items-center justify-between mb-4">
              <TextInput
                value={rawEstimateAmount}
                onChangeText={handleAmountChange}
                placeholder="Amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="decimal-pad"
                className="flex-1 text-sm font-semibold text-[#1A1A1A] h-full"
              />
              <Text className="text-xs font-bold text-[#666666] ml-2">
                {selectedCurrency}
              </Text>
            </View>

            {/* Estimated Fee Rows */}
            <View className="gap-2.5">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-[#666666]">➤ Send</Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  {formatMoney(sendFee)}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-[#666666]">⇄ Convert</Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  {formatMoney(convertFee)}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-[#666666]">⊖ Cash out</Text>
                <Text className="text-xs font-bold text-[#1A1A1A]">
                  {formatMoney(cashOutFee)}
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom Info Banner */}
          <View className="bg-[#E6F4F1] rounded-xl px-4 py-3.5 flex-row items-start">
            <Text className="text-xs text-[#1E7B6B] mr-2 mt-0.5">ⓘ</Text>
            <Text className="flex-1 text-xs font-medium text-[#2C5E54] leading-[18px]">
              Airtime, data, TV and cash in are always free. Capped fees mean
              large amounts never overpay.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
