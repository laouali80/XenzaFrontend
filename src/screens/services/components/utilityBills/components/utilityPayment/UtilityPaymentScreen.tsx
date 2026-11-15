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
import { useServicePayment } from "../../../../../../hooks/useServicePayment";
import type { WalletCurrency } from "../../../../../../types/money";
import { formatMoney, sanitizeDecimalInput } from "../../../../../../utils/money";
import { UTILITY_PRESETS } from "../../../../../../constants/servicePayment";
import {
  AmountPresets,
  DailyLimitCard,
  PaymentSummary,
  ProviderBanner,
} from "../../../../../../components/service-payment/ServicePaymentPrimitives";

interface UtilityPaymentScreenProps {
  providerName?: string;
  currency?: WalletCurrency;
  availableBalance?: number;
  dailyLimit?: number;
  usedToday?: number;
  onBack?: () => void;
  onContinue?: (payload: {
    providerName: string;
    currency: WalletCurrency;
    meterNumber: string;
    amount: number;
    fee: number;
    totalDebited: number;
  }) => void;
}

export default function UtilityPaymentScreen({
  providerName = "SEEN",
  currency = "XOF",
  availableBalance,
  dailyLimit,
  usedToday,
  onBack,
  onContinue,
}: UtilityPaymentScreenProps) {
  const isXof = currency === "XOF";
  const presets = UTILITY_PRESETS[currency];

  const [meterNumber, setMeterNumber] = useState<string>("");
  const [rawAmount, setRawAmount] = useState<string>(isXof ? "5000" : "");

  // Default balances & limits matching your screenshot
  const activeUsedToday = usedToday ?? (isXof ? 19309.8 : 0);

  const numericAmount = parseFloat(rawAmount) || 0;
  const fee = numericAmount > 0 ? Number((numericAmount * 0.01).toFixed(2)) : 0;
  const {
    activeBalance,
    activeDailyLimit,
    remainingDailyLimit,
    limitUsedPercent,
    totalDebited,
    isFormValid,
  } = useServicePayment({
    currency,
    amount: numericAmount,
    fee,
    availableBalance,
    dailyLimit,
    usedToday: activeUsedToday,
    minimumRecipientLength: 6,
    recipient: meterNumber,
  });

  const handleAmountChange = (text: string) => {
    const cleaned = sanitizeDecimalInput(text);
    if (cleaned !== null) setRawAmount(cleaned);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Header Bar */}
        <View className="flex-row items-center px-5 pt-3 pb-3.5">
          <TouchableOpacity
            onPress={
              onBack ?? (() => console.log("Go back to Choose provider"))
            }
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <Text className="text-lg font-bold text-[#1A1A1A]">
            Payment details
          </Text>
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
          {/* Selected Provider Summary Banner */}
          <ProviderBanner
            providerName={providerName}
            serviceLabel="Utility bills"
            icon="⚡"
            iconContainerClassName="bg-[#EFECE6]"
            iconTextClassName="text-[#4A4A4A]"
          />

          {/* METER / CUSTOMER NUMBER Input */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            METER / CUSTOMER NUMBER
          </Text>
          <View className="bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-4 h-[54px] flex-row items-center justify-between mb-5">
            <TextInput
              value={meterNumber}
              onChangeText={setMeterNumber}
              placeholder={isXof ? "24585554" : "45012938471"}
              placeholderTextColor="#B0B0B0"
              keyboardType="number-pad"
              className="flex-1 text-[15px] font-medium text-[#1A1A1A] h-full"
            />
            <Text className="text-[10px] font-bold text-[#888888] tracking-wider ml-2">
              METER
            </Text>
          </View>

          {/* AMOUNT Input */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            AMOUNT
          </Text>
          <View className="bg-white border-[1.5px] border-[#E0E0E0] rounded-2xl px-4 h-[62px] flex-row items-center justify-between mb-3">
            <TextInput
              value={rawAmount}
              onChangeText={handleAmountChange}
              placeholder="0"
              placeholderTextColor="#B0B0B0"
              keyboardType="decimal-pad"
              className="flex-1 text-[24px] font-bold text-[#1A1A1A] h-full"
            />
            <Text className="text-sm font-semibold text-[#666666] ml-2">
              {isXof ? "FCFA" : "NGN"}
            </Text>
          </View>

          {/* Quick Amount Preset Pills */}
          <AmountPresets
            presets={presets}
            amount={numericAmount}
            onSelect={(preset) => setRawAmount(String(preset))}
          />

          <PaymentSummary
            currency={currency}
            fee={fee}
            totalDebited={totalDebited}
          />

          <DailyLimitCard
            currency={currency}
            usedToday={activeUsedToday}
            dailyLimit={activeDailyLimit}
            remaining={remainingDailyLimit}
            percent={limitUsedPercent}
          />

          {/* Insufficient Balance Warning */}
          {totalDebited > activeBalance && (
            <Text className="text-xs font-medium text-[#C86D1F] text-center mb-3">
              Insufficient balance in your {currency} wallet.
            </Text>
          )}

          {/* Continue Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!isFormValid}
            onPress={() =>
              onContinue?.({
                providerName,
                currency,
                meterNumber: meterNumber.trim(),
                amount: numericAmount,
                fee,
                totalDebited,
              })
            }
            className={`h-[54px] rounded-xl items-center justify-center ${
              isFormValid ? "bg-[#009A49]" : "bg-[#8FD1AE]"
            }`}
          >
            <Text className="text-white text-base font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
