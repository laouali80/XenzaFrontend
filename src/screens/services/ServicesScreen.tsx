import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTx } from "../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

export type ServiceCategory = "airtime" | "data" | "tv" | "utility";

export interface ServicePaymentItem {
  id: string;
  title: string;
  subtitle: string;
  amountText: string;
  feeText?: string;
  icon: string;
}

interface ServicesScreenProps {
  onSelectService?: (category: ServiceCategory) => void;
  onSeeAllPayments?: () => void;
  onSelectPayment?: (payment: ServicePaymentItem) => void;
}

const RECENT_PAYMENTS: ServicePaymentItem[] = [
  {
    id: "1",
    title: "Airtime • Airtel Niger",
    subtitle: "26 Sept 2026 · completed",
    amountText: "-5,000 FCFA",
    icon: "📱",
  },
  {
    id: "2",
    title: "Data bundle • Orange NE",
    subtitle: "23 Sept 2026 · completed",
    amountText: "-10,000 FCFA",
    icon: "📶",
  },
  {
    id: "3",
    title: "Electricity • NIGELEC",
    subtitle: "21 Sept 2026 · completed",
    amountText: "-25,000 FCFA",
    feeText: "fee 250 FCFA",
    icon: "⚡",
  },
];

export default function ServicesScreen({
  onSelectService,
  onSeeAllPayments,
  onSelectPayment,
}: ServicesScreenProps) {
  const tx = useTx();

  const serviceCards: {
    id: ServiceCategory;
    title: string;
    subtitle: string;
    icon: string;
    badgeBg: string;
    iconColor: string;
  }[] = [
    {
      id: "airtime",
      title: "Airtime",
      subtitle: "Top up any mobile line",
      icon: "📱",
      badgeBg: "bg-[#D1F2DF]",
      iconColor: "text-[#008744]",
    },
    {
      id: "data",
      title: "Data bundles",
      subtitle: "Buy a bundle for any network",
      icon: "📶",
      badgeBg: "bg-[#D6F1F5]",
      iconColor: "text-[#167A8C]",
    },
    {
      id: "tv",
      title: "TV subscription",
      subtitle: "Renew your TV subscription",
      icon: "📺",
      badgeBg: "bg-[#FBE5CE]",
      iconColor: "text-[#C86D1F]",
    },
    {
      id: "utility",
      title: "Utility bills",
      subtitle: "Pay electricity and water",
      icon: "⚡",
      badgeBg: "bg-[#EFECE6]",
      iconColor: "text-[#4A4A4A]",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 32,
        }}
      >
        {/* Screen Header */}
        <Text className="text-[28px] font-bold text-[#1A1A1A] mb-1.5">
          {tx.screens.navTabs.services}
        </Text>
        <Text className="text-[14px] text-[#666666] mb-6">
          Buy airtime, data and TV, or pay your bills.
        </Text>

        {/* 2x2 Service Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-3.5 mb-8">
          {serviceCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.8}
              onPress={() =>
                onSelectService
                  ? onSelectService(card.id)
                  : console.log("Selected service:", card.id)
              }
              className="w-[48%] bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4"
            >
              {/* Colored Icon Badge */}
              <View
                className={`w-11 h-11 rounded-xl ${card.badgeBg} items-center justify-center mb-4`}
              >
                <Text className={`text-lg ${card.iconColor}`}>{card.icon}</Text>
              </View>

              <Text className="text-[15px] font-bold text-[#1A1A1A] mb-1">
                {card.title}
              </Text>
              <Text className="text-xs text-[#666666] leading-[17px]">
                {card.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Payments Section */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-base font-bold text-[#1A1A1A]">
            Recent payments
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={
              onSeeAllPayments ??
              (() => console.log("Navigate to RecentActivityScreen"))
            }
          >
            <Text className="text-xs font-semibold text-[#008744]">
              {tx.common.seeAll}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payment History Rows */}
        <View className="gap-4">
          {RECENT_PAYMENTS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              onPress={() => onSelectPayment?.(item)}
              className="flex-row items-center justify-between"
            >
              {/* Left Circular Icon + Title & Date */}
              <View className="flex-row items-center flex-1 pr-3">
                <View className="w-10 h-10 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                  <Text className="text-sm text-[#4A4A4A]">{item.icon}</Text>
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
                <Text className="text-sm font-bold text-[#1A1A1A]">
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
      </ScrollView>
    </SafeAreaView>
  );
}
