import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { WalletCurrency } from "../../types/money";
import { formatMoney } from "../../utils/money";

export function ProviderBanner({
  providerName,
  serviceLabel,
  icon,
  iconContainerClassName,
  iconTextClassName,
}: {
  providerName: string;
  serviceLabel: string;
  icon: string;
  iconContainerClassName: string;
  iconTextClassName: string;
}) {
  return (
    <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl p-4 flex-row items-center mb-6">
      <View
        className={`w-11 h-11 rounded-xl items-center justify-center mr-3.5 ${iconContainerClassName}`}
      >
        <Text className={`text-lg ${iconTextClassName}`}>{icon}</Text>
      </View>
      <View>
        <Text className="text-[15px] font-bold text-[#1A1A1A]">
          {providerName}
        </Text>
        <Text className="text-xs text-[#666666] mt-0.5">{serviceLabel}</Text>
      </View>
    </View>
  );
}

export function AmountPresets({
  presets,
  amount,
  onSelect,
}: {
  presets: number[];
  amount: number;
  onSelect: (value: number) => void;
}) {
  return (
    <View className="flex-row gap-2 mb-6">
      {presets.map((preset) => {
        const selected = amount === preset;
        return (
          <TouchableOpacity
            key={preset}
            activeOpacity={0.8}
            onPress={() => onSelect(preset)}
            className={`px-3.5 py-2 rounded-full border ${
              selected
                ? "bg-[#E6F5EC] border-[#52B788]"
                : "bg-[#FAF8F5] border-[#E5E0D8]"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                selected ? "text-[#008744]" : "text-[#4A4A4A]"
              }`}
            >
              {preset.toLocaleString("en-US")}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function PaymentSummary({
  currency,
  fee,
  totalDebited,
}: {
  currency: WalletCurrency;
  fee: number;
  totalDebited: number;
}) {
  return (
    <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 gap-3 mb-4">
      <PaymentSummaryRow label="Pay from" value={`${currency} wallet`} />
      <PaymentSummaryRow label="Fee" value={formatMoney(fee, currency)} />
      <View className="border-t border-[#E8E3D9] pt-3 flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-[#1A1A1A]">
          Total debited
        </Text>
        <Text className="text-[15px] font-bold text-[#008744]">
          {formatMoney(totalDebited, currency)}
        </Text>
      </View>
    </View>
  );
}

function PaymentSummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-xs text-[#666666]">{label}</Text>
      <Text className="text-xs font-bold text-[#1A1A1A]">{value}</Text>
    </View>
  );
}

export function DailyLimitCard({
  currency,
  usedToday,
  dailyLimit,
  remaining,
  percent,
}: {
  currency: WalletCurrency;
  usedToday: number;
  dailyLimit: number;
  remaining: number;
  percent: number;
}) {
  return (
    <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-6">
      <View className="flex-row items-center justify-between mb-2.5">
        <View className="flex-row items-center">
          <Text className="text-xs text-[#008744] mr-1.5">🛡️</Text>
          <Text className="text-xs font-bold text-[#1A1A1A]">Daily limit</Text>
        </View>
        <Text className="text-[11px] text-[#666666]">
          {formatMoney(usedToday, currency)} of{" "}
          {formatMoney(dailyLimit, currency)} used today
        </Text>
      </View>
      <View className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden mb-2">
        <View
          style={{ width: `${percent}%` }}
          className="h-full bg-[#009A49] rounded-full"
        />
      </View>
      <Text className="text-[11px] text-[#666666]">
        {formatMoney(remaining, currency)} left today
      </Text>
    </View>
  );
}
