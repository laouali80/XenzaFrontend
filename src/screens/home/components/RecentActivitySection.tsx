import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTx } from "../../../utils/tx";

export interface ActivityTransaction {
  id: string;
  title: string;
  subtitle: string;
  amountText: string;
  feeText?: string;
  isIncoming: boolean;
  icon: string;
}

interface RecentActivitySectionProps {
  transactions: ActivityTransaction[];
  currencyNote?: string;
  onSeeAll: () => void;
  onSelectTransaction?: (txItem: ActivityTransaction) => void;
}

export default function RecentActivitySection({
  transactions,
  currencyNote,
  onSeeAll,
  onSelectTransaction,
}: RecentActivitySectionProps) {
  const tx = useTx();

  return (
    <View className="px-5 pb-6">
      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-3.5">
        <Text className="text-base font-bold text-[#1A1A1A]">
          Recent activity
        </Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text className="text-xs font-semibold text-[#008744]">
            {tx.common.seeAll}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transaction Rows */}
      <View className="gap-4 mb-6">
        {transactions.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.75}
            onPress={() => onSelectTransaction?.(item)}
            className="flex-row items-center justify-between"
          >
            {/* Left Icon + Details */}
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

            {/* Right Amount + Optional Fee */}
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
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Currency Note Callout */}
      <View className="bg-[#F5F2EC] border border-[#EAE5DC] rounded-xl px-4 py-3 flex-row items-center">
        <Text className="text-xs text-[#666666] mr-2">ⓘ</Text>
        <Text className="text-xs text-[#666666]">{currencyNote}</Text>
      </View>
    </View>
  );
}
