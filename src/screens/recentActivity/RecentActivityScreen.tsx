import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FilterTab = "all" | "money_in" | "money_out";

export interface GroupedTransaction {
  id: string;
  dateHeader: string;
  title: string;
  subtitle: string;
  amountText: string;
  feeText?: string;
  isIncoming: boolean;
  icon: string;
}

interface RecentActivityScreenProps {
  onBack?: () => void;
  onSelectTransaction?: (txItem: GroupedTransaction) => void;
}

const ALL_TRANSACTIONS: GroupedTransaction[] = [
  {
    id: "1",
    dateHeader: "09 NOVEMBER 2026",
    title: "Cash in • Agent Moussa",
    subtitle: "Yesterday · completed",
    amountText: "+150,000 FCFA",
    isIncoming: true,
    icon: "+",
  },
  {
    id: "2",
    dateHeader: "08 NOVEMBER 2026",
    title: "Sent to Aisha Bello",
    subtitle: "2 days ago · completed",
    amountText: "-45,000 FCFA",
    feeText: "fee 360 FCFA",
    isIncoming: false,
    icon: "➤",
  },
  {
    id: "3",
    dateHeader: "07 NOVEMBER 2026",
    title: "Airtime • Airtel Niger",
    subtitle: "2 days ago · completed",
    amountText: "-5,000 FCFA",
    isIncoming: false,
    icon: "📱",
  },
  {
    id: "4",
    dateHeader: "05 NOVEMBER 2026",
    title: "Received from Ibrahim Sow",
    subtitle: "4 days ago · completed",
    amountText: "+120,000 FCFA",
    isIncoming: true,
    icon: "⬇",
  },
  {
    id: "5",
    dateHeader: "04 NOVEMBER 2026",
    title: "Data bundle • Orange NE",
    subtitle: "6 days ago · completed",
    amountText: "-10,000 FCFA",
    isIncoming: false,
    icon: "📶",
  },
  {
    id: "6",
    dateHeader: "02 NOVEMBER 2026",
    title: "Electricity • NIGELEC",
    subtitle: "02 Nov 2026 · completed",
    amountText: "-25,000 FCFA",
    feeText: "fee 250 FCFA",
    isIncoming: false,
    icon: "⚡",
  },
];

export default function RecentActivityScreen({
  onBack,
  onSelectTransaction,
}: RecentActivityScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  // Filter transactions based on selected pill
  const filteredTransactions = useMemo(() => {
    if (activeFilter === "money_in") {
      return ALL_TRANSACTIONS.filter((item) => item.isIncoming);
    }
    if (activeFilter === "money_out") {
      return ALL_TRANSACTIONS.filter((item) => !item.isIncoming);
    }
    return ALL_TRANSACTIONS;
  }, [activeFilter]);

  // Group filtered transactions by dateHeader
  const groupedSections = useMemo(() => {
    const groups: { date: string; items: GroupedTransaction[] }[] = [];

    filteredTransactions.forEach((txItem) => {
      const existingGroup = groups.find((g) => g.date === txItem.dateHeader);
      if (existingGroup) {
        existingGroup.items.push(txItem);
      } else {
        groups.push({ date: txItem.dateHeader, items: [txItem] });
      }
    });

    return groups;
  }, [filteredTransactions]);

  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "money_in", label: "Money in" },
    { id: "money_out", label: "Money out" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center px-5 pt-3 pb-3.5 border-b border-[#EFECE6]">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back to Home"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold text-[#1A1A1A]">
          Recent activity
        </Text>
      </View>

      {/* Segmented Filter Control (All | Money in | Money out) */}
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row bg-[#F3EFEA] rounded-full p-1">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.85}
                onPress={() => setActiveFilter(tab.id)}
                className={`flex-1 py-2.5 rounded-full items-center justify-center ${
                  isSelected ? "bg-[#009A49]" : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? "text-white" : "text-[#555555]"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Date-Grouped Transaction History */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 36,
        }}
      >
        {groupedSections.map((section) => (
          <View key={section.date} className="mb-6">
            {/* Date Section Header */}
            <Text className="text-[11px] font-bold text-[#777777] tracking-[0.6px] mb-3.5">
              {section.date}
            </Text>

            {/* Transactions under this Date */}
            <View className="gap-4">
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.75}
                  onPress={() => onSelectTransaction?.(item)}
                  className="flex-row items-center justify-between"
                >
                  {/* Left Circular Icon + Title/Subtitle */}
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
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
