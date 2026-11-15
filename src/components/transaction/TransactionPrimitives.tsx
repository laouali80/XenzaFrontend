import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function SuccessBadge() {
  return (
    <View className="items-center mb-5">
      <View className="w-[72px] h-[72px] rounded-full bg-[#C7F0D8] items-center justify-center">
        <View className="w-10 h-10 rounded-full bg-[#008744] items-center justify-center">
          <Text className="text-white font-bold text-lg">✓</Text>
        </View>
      </View>
    </View>
  );
}

export function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-xs text-[#666666]">{label}</Text>
      <Text className="text-xs font-bold text-[#1A1A1A]">{value}</Text>
    </View>
  );
}

export function TransactionSummaryCard({
  amount,
  details,
  referenceId,
}: {
  amount: string;
  details: string[];
  referenceId: string;
}) {
  return (
    <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl py-6 px-5 items-center mb-6">
      <Text className="text-[28px] font-extrabold text-[#1A1A1A] mb-2">
        {amount}
      </Text>
      {details.map((detail) => (
        <Text
          key={detail}
          className="text-xs font-medium text-[#555555] mb-1"
        >
          {detail}
        </Text>
      ))}
      <Text className="text-[11px] font-medium text-[#888888] tracking-wide mt-2">
        Ref {referenceId}
      </Text>
    </View>
  );
}

export function TransactionAction({
  label,
  icon,
  onPress,
  secondary = false,
}: {
  label: string;
  icon?: string;
  onPress?: () => void;
  secondary?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={
        secondary
          ? "bg-white border border-[#E0DCD3] h-[54px] rounded-xl flex-row items-center justify-center mb-5"
          : "bg-[#009A49] h-[54px] rounded-xl flex-row items-center justify-center mb-3"
      }
    >
      {icon && (
        <Text
          className={`text-sm mr-2 ${secondary ? "text-[#1A1A1A]" : "text-white"}`}
        >
          {icon}
        </Text>
      )}
      <Text
        className={`text-base font-semibold ${
          secondary ? "text-[#1A1A1A]" : "text-white"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
