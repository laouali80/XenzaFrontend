import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  isUnread: boolean;
  type: "info" | "cash_in" | "rate_alert";
}

interface NotificationsScreenProps {
  onBack?: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Identity verified",
    body: "Higher limits are now unlocked on your account.",
    timestamp: "Today",
    isUnread: true,
    type: "info",
  },
  {
    id: "2",
    title: "Verification submitted",
    body: "We are reviewing your documents. Your limits will unlock once approved.",
    timestamp: "Today",
    isUnread: true,
    type: "info",
  },
  {
    id: "3",
    title: "Verification needs attention",
    body: "The document photo was blurry.",
    timestamp: "Today",
    isUnread: true,
    type: "info",
  },
  {
    id: "4",
    title: "Verification submitted",
    body: "We are reviewing your documents. Your limits will unlock once approved.",
    timestamp: "Today",
    isUnread: true,
    type: "info",
  },
  {
    id: "5",
    title: "Welcome to Xenza",
    body: "Your Niger Partner Wallet is ready. Complete KYC to unlock higher limits.",
    timestamp: "Today",
    isUnread: true,
    type: "info",
  },
  {
    id: "6",
    title: "Cash in confirmed",
    body: "150,000 FCFA added to your wallet.",
    timestamp: "Yesterday",
    isUnread: true,
    type: "cash_in",
  },
  {
    id: "7",
    title: "Rate alert",
    body: "1,000 FCFA is now trading above ₦2,400 on the corridor.",
    timestamp: "2 days ago",
    isUnread: false,
    type: "rate_alert",
  },
];

export default function NotificationsScreen({
  onBack,
  onSelectNotification,
}: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS,
  );

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isUnread: false })),
    );
  };

  const handlePressCard = (selected: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === selected.id ? { ...item, isUnread: false } : item,
      ),
    );
    onSelectNotification?.(selected);
  };

  const getIconConfig = (type: NotificationItem["type"]) => {
    switch (type) {
      case "cash_in":
        return {
          symbol: "⊕",
          bg: "bg-[#D1F2DF]",
          textColor: "text-[#008744]",
        };
      case "rate_alert":
        return {
          symbol: "📈",
          bg: "bg-[#FBE5CE]",
          textColor: "text-[#C86D1F]",
        };
      case "info":
      default:
        return {
          symbol: "ⓘ",
          bg: "bg-[#DFF0F5]",
          textColor: "text-[#1B6B82]",
        };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-3.5 border-b border-[#EFECE6]">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={onBack ?? (() => console.log("Go back to Home"))}
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <Text className="text-lg font-bold text-[#1A1A1A]">
            Notifications
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={handleMarkAllAsRead}>
          <Text className="text-xs font-semibold text-[#008744]">
            Mark all as read
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notification Cards List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 32,
          gap: 12,
        }}
      >
        {notifications.map((item) => {
          const iconStyle = getIconConfig(item.type);

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handlePressCard(item)}
              className={`rounded-2xl p-4 border flex-row items-start ${
                item.isUnread
                  ? "bg-[#E8F6EE] border-[#C6E8D4]"
                  : "bg-[#FAF8F5] border-[#EAE5DC]"
              }`}
            >
              {/* Left Circular Badge Icon */}
              <View
                className={`w-10 h-10 rounded-full ${iconStyle.bg} items-center justify-center mr-3.5 mt-0.5`}
              >
                <Text className={`text-base font-bold ${iconStyle.textColor}`}>
                  {iconStyle.symbol}
                </Text>
              </View>

              {/* Middle Text Content */}
              <View className="flex-1 pr-3">
                <Text className="text-[15px] font-bold text-[#1A1A1A] mb-1">
                  {item.title}
                </Text>
                <Text className="text-xs text-[#555555] leading-[18px] mb-2">
                  {item.body}
                </Text>
                <Text className="text-[11px] font-medium text-[#888888]">
                  {item.timestamp}
                </Text>
              </View>

              {/* Right Unread Green Dot */}
              {item.isUnread && (
                <View className="w-2.5 h-2.5 rounded-full bg-[#009A49] mt-1.5" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
