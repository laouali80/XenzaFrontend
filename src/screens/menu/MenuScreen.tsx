import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type KYCVerificationState = "unverified" | "pending" | "verified";

export type MenuRoute =
  | "verify_kyc"
  | "profile"
  | "notifications"
  | "kyc_status"
  | "language"
  | "security"
  | "rates_fees"
  | "help_support"
  | "about";

interface MenuScreenProps {
  userName?: string;
  phoneNumber?: string;
  primaryBalanceFormatted?: string;
  kycState?: KYCVerificationState;
  limitSummaryText?: string;
  limitProgressPercent?: number;
  onNavigate?: (route: MenuRoute) => void;
  onLogout?: () => void;
}

export default function MenuScreen({
  userName = "aisha bello",
  phoneNumber = "+22780654112",
  primaryBalanceFormatted = "248,900.20 FCFA",
  kycState = "pending",
  limitSummaryText,
  limitProgressPercent,
  onNavigate,
  onLogout,
}: MenuScreenProps) {
  const initialLetter = userName.trim().charAt(0).toUpperCase() || "A";

  // Configure badges, button states, and default limit text per KYC scenario
  const kycConfig = {
    unverified: {
      heroPillText: "Not verified",
      heroPillBg: "bg-[#F59E0B]",
      heroPillTextColor: "text-white",
      heroIcon: "🕒",
      cardBadgeText: "Unverified",
      cardBadgeBg: "bg-[#E3F1EC]",
      cardBadgeTextColor: "text-[#1E7B5A]",
      rowRightLabel: "Not verified",
      defaultLimitText: "₦400,000 of ₦400,000 left today",
      defaultProgress: 100,
    },
    pending: {
      heroPillText: "Pending review",
      heroPillBg: "bg-[#F59E0B]",
      heroPillTextColor: "text-white",
      heroIcon: "🕒",
      cardBadgeText: "In review",
      cardBadgeBg: "bg-[#FBE2C6]",
      cardBadgeTextColor: "text-[#B86318]",
      rowRightLabel: "Pending review",
      defaultLimitText: "₦1,000,000 of ₦1,000,000 left today",
      defaultProgress: 100,
    },
    verified: {
      heroPillText: "Verified",
      heroPillBg: "bg-white",
      heroPillTextColor: "text-[#008744]",
      heroIcon: "✓",
      cardBadgeText: "Verified",
      cardBadgeBg: "bg-[#D1EFE0]",
      cardBadgeTextColor: "text-[#008744]",
      rowRightLabel: "Verified",
      defaultLimitText: "4,980,690.20 FCFA of 5,000,000 FCFA",
      defaultProgress: 99,
    },
  }[kycState];

  const activeLimitText = limitSummaryText ?? kycConfig.defaultLimitText;
  const activeProgress = limitProgressPercent ?? kycConfig.defaultProgress;

  const accountGroupItems: {
    id: MenuRoute;
    label: string;
    icon: string;
    rightValue?: string;
  }[] = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    {
      id: "kyc_status",
      label: "KYC status",
      icon: "🛡️",
      rightValue: kycConfig.rowRightLabel,
    },
    { id: "language", label: "Language", icon: "🌐" },
  ];

  const appGroupItems: {
    id: MenuRoute;
    label: string;
    icon: string;
  }[] = [
    { id: "security", label: "Security", icon: "🔒" },
    { id: "rates_fees", label: "Rates & fees", icon: "📈" },
    { id: "help_support", label: "Help & support", icon: "🎧" },
    { id: "about", label: "About Xenza", icon: "ⓘ" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        {/* Top Green Profile Hero Header */}
        <View className="bg-[#008744] px-5 pt-5 pb-6">
          {/* Avatar + Name & Phone */}
          <View className="flex-row items-center mb-5">
            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3.5">
              <Text className="text-lg font-extrabold text-white">
                {initialLetter}
              </Text>
            </View>
            <View>
              <Text className="text-lg font-bold text-white">{userName}</Text>
              <Text className="text-xs font-medium text-white/85 mt-0.5">
                {phoneNumber}
              </Text>
            </View>
          </View>

          {/* Primary Balance Inner Card */}
          <View className="bg-white/15 rounded-2xl px-4 py-3.5 flex-row items-center justify-between">
            <View>
              <Text className="text-xs font-medium text-white/85 mb-1">
                Primary balance
              </Text>
              <Text className="text-[20px] font-extrabold text-white">
                {primaryBalanceFormatted}
              </Text>
            </View>

            {/* KYC Status Badge Pill */}
            <View
              className={`${kycConfig.heroPillBg} px-3 py-1.5 rounded-full flex-row items-center`}
            >
              <Text
                className={`text-[11px] font-bold mr-1 ${kycConfig.heroPillTextColor}`}
              >
                {kycConfig.heroIcon}
              </Text>
              <Text
                className={`text-xs font-bold ${kycConfig.heroPillTextColor}`}
              >
                {kycConfig.heroPillText}
              </Text>
            </View>
          </View>
        </View>

        {/* Main Body Content */}
        <View className="px-5 pt-5">
          {/* Limits & Verification Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-5">
            <View className="flex-row items-center justify-between mb-3">
              {/* Left Shield Icon + Title + Status Pill */}
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-9 h-9 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                  <Text className="text-sm text-[#008744]">🛡️</Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center flex-wrap gap-1.5">
                    <Text className="text-sm font-bold text-[#1A1A1A]">
                      Limits & verification
                    </Text>
                    <View
                      className={`${kycConfig.cardBadgeBg} px-2 py-0.5 rounded-full`}
                    >
                      <Text
                        className={`text-[10px] font-bold ${kycConfig.cardBadgeTextColor}`}
                      >
                        {kycConfig.cardBadgeText}
                      </Text>
                    </View>
                  </View>

                  <Text
                    numberOfLines={1}
                    className="text-[11px] text-[#666666] mt-1"
                  >
                    {activeLimitText}
                  </Text>
                </View>
              </View>

              {/* Right Action: "Verify" Button vs "✓ Verified" Indicator */}
              {kycState === "verified" ? (
                <View className="flex-row items-center">
                  <View className="w-4 h-4 rounded-full bg-[#008744] items-center justify-center mr-1.5">
                    <Text className="text-white text-[9px] font-bold">✓</Text>
                  </View>
                  <Text className="text-xs font-bold text-[#008744]">
                    Verified
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => onNavigate?.("verify_kyc")}
                  className="bg-[#009A49] px-3.5 py-2 rounded-xl flex-row items-center"
                >
                  <Text className="text-white text-xs mr-1">🛡️</Text>
                  <Text className="text-white text-xs font-bold">Verify</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Limit Progress Track */}
            <View className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden">
              <View
                style={{ width: `${activeProgress}%` }}
                className="h-full bg-[#009A49] rounded-full"
              />
            </View>
          </View>

          {/* Settings Group 1: Profile, Notifications, KYC status, Language */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl overflow-hidden mb-5">
            {accountGroupItems.map((item, index) => {
              const isLast = index === accountGroupItems.length - 1;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.75}
                  onPress={() => onNavigate?.(item.id)}
                  className={`flex-row items-center justify-between px-4 py-3.5 ${
                    !isLast ? "border-b border-[#EFECE6]" : ""
                  }`}
                >
                  <View className="flex-row items-center">
                    <View className="w-9 h-9 rounded-full bg-[#DDF5E7] items-center justify-center mr-3.5">
                      <Text className="text-sm text-[#008744]">
                        {item.icon}
                      </Text>
                    </View>
                    <Text className="text-sm font-semibold text-[#1A1A1A]">
                      {item.label}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    {item.rightValue && (
                      <Text className="text-xs text-[#666666] mr-2">
                        {item.rightValue}
                      </Text>
                    )}
                    <Text className="text-sm text-[#888888]">›</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Settings Group 2: Security, Rates & fees, Help & support, About Xenza */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl overflow-hidden mb-5">
            {appGroupItems.map((item, index) => {
              const isLast = index === appGroupItems.length - 1;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.75}
                  onPress={() => onNavigate?.(item.id)}
                  className={`flex-row items-center justify-between px-4 py-3.5 ${
                    !isLast ? "border-b border-[#EFECE6]" : ""
                  }`}
                >
                  <View className="flex-row items-center">
                    <View className="w-9 h-9 rounded-full bg-[#DDF5E7] items-center justify-center mr-3.5">
                      <Text className="text-sm text-[#008744]">
                        {item.icon}
                      </Text>
                    </View>
                    <Text className="text-sm font-semibold text-[#1A1A1A]">
                      {item.label}
                    </Text>
                  </View>

                  <Text className="text-sm text-[#888888]">›</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onLogout ?? (() => console.log("Logging out"))}
            className="bg-[#FAF8F5] border border-[#E5C5A8] h-[52px] rounded-2xl flex-row items-center justify-center mb-4"
          >
            <Text className="text-[#C86D1F] text-sm font-bold mr-2">↪</Text>
            <Text className="text-[#C86D1F] text-sm font-bold">Log out</Text>
          </TouchableOpacity>

          {/* App Version Footer */}
          <Text className="text-xs text-[#888888] text-center">
            Xenza v1.0 · Demo
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
