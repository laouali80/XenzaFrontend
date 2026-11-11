import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type KYCVerificationState = "unverified" | "pending" | "verified";
export type CountryCode = "NG" | "NE";
export type AppLanguage = "en" | "fr";

interface ProfileScreenProps {
  initialFullName?: string;
  phoneNumber?: string;
  initialDob?: string;
  country?: CountryCode;
  language?: AppLanguage;
  kycState?: KYCVerificationState;
  memberSince?: string;
  avatarUri?: string | null;
  onBack?: () => void;
  onChangePhoto?: () => void;
  onPressLanguage?: () => void;
  onPressIdentityVerification?: () => void;
  onPressLimitsAndUsage?: () => void;
  onPressRatesAndFees?: () => void;
  onSave?: (payload: { fullName: string; dateOfBirth: string }) => void;
}

export default function ProfileScreen({
  initialFullName = "auwal",
  phoneNumber = "+2347041444411",
  initialDob = "30/10/2026",
  country = "NG",
  language = "en",
  kycState = "unverified",
  memberSince = "10 Nov 2026",
  avatarUri = null,
  onBack,
  onChangePhoto,
  onPressLanguage,
  onPressIdentityVerification,
  onPressLimitsAndUsage,
  onPressRatesAndFees,
  onSave,
}: ProfileScreenProps) {
  const [fullName, setFullName] = useState<string>(initialFullName);
  const [dateOfBirth, setDateOfBirth] = useState<string>(initialDob);

  const initialLetter =
    (fullName.trim() || initialFullName).charAt(0).toUpperCase() || "A";

  // Badge styling across all 3 KYC states
  const kycBadge = {
    unverified: {
      label: "Not verified",
      icon: "🕒",
      bgClass: "bg-[#FBE5CE]",
      textClass: "text-[#B86318]",
    },
    pending: {
      label: "Pending review",
      icon: "🕒",
      bgClass: "bg-[#FBE5CE]",
      textClass: "text-[#B86318]",
    },
    verified: {
      label: "Verified",
      icon: "✓",
      bgClass: "bg-[#D1F2DF]",
      textClass: "text-[#008744]",
    },
  }[kycState];

  const countryDisplay =
    country === "NE"
      ? { code: "NE", name: "Niger" }
      : { code: "NG", name: "Nigeria" };

  const languageDisplay =
    language === "fr"
      ? { code: "FR", name: "Français" }
      : { code: "GB", name: "English" };

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert("Required", "Please enter your full name.");
      return;
    }
    if (onSave) {
      onSave({
        fullName: fullName.trim(),
        dateOfBirth: dateOfBirth.trim(),
      });
    } else {
      Alert.alert("Saved", "Your profile details have been updated.");
    }
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
            <Text className="text-lg font-bold text-[#1A1A1A]">Profile</Text>
            <Text className="text-xs text-[#666666] mt-0.5">
              Your personal details and account information.
            </Text>
          </View>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 18,
            paddingBottom: 28,
          }}
        >
          {/* Top Profile Avatar & Summary Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl py-6 px-4 items-center mb-5">
            {/* Avatar with Camera Badge */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={
                onChangePhoto ?? (() => console.log("Open photo picker"))
              }
              className="relative mb-3.5"
            >
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  className="w-[78px] h-[78px] rounded-full"
                />
              ) : (
                <View className="w-[78px] h-[78px] rounded-full bg-[#008744] items-center justify-center">
                  <Text className="text-[28px] font-extrabold text-white">
                    {initialLetter}
                  </Text>
                </View>
              )}

              {/* Camera Overlay Circle */}
              <View className="w-7 h-7 rounded-full bg-[#009A49] border-2 border-[#FAF8F5] items-center justify-center absolute -bottom-0.5 -right-0.5">
                <Text className="text-[11px] text-white">📷</Text>
              </View>
            </TouchableOpacity>

            {/* Display Name & Phone */}
            <Text className="text-[17px] font-bold text-[#1A1A1A] mb-0.5">
              {fullName || initialFullName}
            </Text>
            <Text className="text-xs text-[#666666] mb-2">{phoneNumber}</Text>

            {/* Change Photo Link */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={
                onChangePhoto ?? (() => console.log("Open photo picker"))
              }
              className="mb-3.5"
            >
              <Text className="text-xs font-bold text-[#008744]">
                Change photo
              </Text>
            </TouchableOpacity>

            {/* KYC Pill + Member Since Row */}
            <View className="flex-row items-center justify-center flex-wrap gap-2">
              <View
                className={`${kycBadge.bgClass} px-2.5 py-1 rounded-full flex-row items-center`}
              >
                <Text
                  className={`text-[10px] font-bold mr-1 ${kycBadge.textClass}`}
                >
                  {kycBadge.icon}
                </Text>
                <Text className={`text-[11px] font-bold ${kycBadge.textClass}`}>
                  {kycBadge.label}
                </Text>
              </View>

              <Text className="text-[11px] text-[#666666]">
                Member since · {memberSince}
              </Text>
            </View>
          </View>

          {/* PERSONAL DETAILS Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-5">
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-4">
              PERSONAL DETAILS
            </Text>

            {/* FULL NAME Input */}
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.5px] mb-2">
              FULL NAME
            </Text>
            <View className="bg-white border border-[#E0E0E0] rounded-xl px-3.5 h-12 flex-row items-center mb-4">
              <Text className="text-sm text-[#888888] mr-2.5">👤</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-sm font-medium text-[#1A1A1A] h-full"
              />
            </View>

            {/* DATE OF BIRTH Input */}
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.5px] mb-2">
              DATE OF BIRTH
            </Text>
            <View className="bg-white border border-[#E0E0E0] rounded-xl px-3.5 h-12 flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <Text className="text-sm text-[#888888] mr-2.5">📅</Text>
                <TextInput
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 text-sm font-medium text-[#1A1A1A] h-full"
                />
              </View>
              <Text className="text-sm text-[#4A4A4A] ml-2">📆</Text>
            </View>

            {/* PHONE NUMBER Read-Only Row */}
            <View className="py-3.5 border-t border-[#EFECE6] flex-row items-start">
              <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3 mt-0.5">
                <Text className="text-xs text-[#666666]">📱</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-[#888888] tracking-[0.5px] mb-0.5">
                  PHONE NUMBER
                </Text>
                <Text className="text-sm font-semibold text-[#1A1A1A]">
                  {phoneNumber}
                </Text>
                <Text className="text-[11px] text-[#666666] mt-0.5 leading-[15px]">
                  Your phone number is linked to your wallet and cannot be
                  changed here.
                </Text>
              </View>
            </View>
            {/* COUNTRY Read-Only Row */}
            <View className="py-3.5 border-t border-[#EFECE6] flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                <Text className="text-xs text-[#666666]">📍</Text>
              </View>
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-[#888888] tracking-[0.5px] mb-0.5">
                  COUNTRY
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-[11px] font-extrabold text-[#1A1A1A] mr-1.5">
                    {countryDisplay.code}
                  </Text>
                  <Text className="text-sm font-semibold text-[#1A1A1A]">
                    {countryDisplay.name}
                  </Text>
                </View>
              </View>
            </View>

            {/* LANGUAGE Tappable Row */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={
                onPressLanguage ?? (() => console.log("Navigate to Language"))
              }
              className="pt-3.5 border-t border-[#EFECE6] flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                  <Text className="text-xs text-[#666666]">文A</Text>
                </View>
                <View>
                  <Text className="text-[10px] font-bold text-[#888888] tracking-[0.5px] mb-0.5">
                    LANGUAGE
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-[11px] font-extrabold text-[#1A1A1A] mr-1.5">
                      {languageDisplay.code}
                    </Text>
                    <Text className="text-sm font-semibold text-[#1A1A1A]">
                      {languageDisplay.name}
                    </Text>
                  </View>
                </View>
              </View>

              <Text className="text-base text-[#888888]">›</Text>
            </TouchableOpacity>
          </View>

          {/* ACCOUNT STATUS Card */}
          <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4">
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
              ACCOUNT STATUS
            </Text>

            {/* Identity Verification Row */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => console.log("Navigate to KYC verification")}
              className="py-3 flex-row items-center justify-between border-b border-[#EFECE6]"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                  <Text className="text-xs text-[#666666]">🛡️</Text>
                </View>
                <View>
                  <Text className="text-[10px] font-bold text-[#888888] tracking-[0.5px] mb-0.5">
                    IDENTITY VERIFICATION
                  </Text>
                  <Text className="text-sm font-semibold text-[#1A1A1A]">
                    {kycBadge.label}
                  </Text>
                </View>
              </View>
              <Text className="text-base text-[#888888]">›</Text>
            </TouchableOpacity>

            {/* Limits & Usage Row */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={
                onPressLimitsAndUsage ??
                (() => console.log("Navigate to LimitsAndUsageScreen"))
              }
              className="py-3 flex-row items-center justify-between border-b border-[#EFECE6]"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                  <Text className="text-xs text-[#666666]">📊</Text>
                </View>
                <View>
                  <Text className="text-[10px] font-bold text-[#888888] tracking-[0.5px] mb-0.5">
                    LIMITS & USAGE
                  </Text>
                  <Text className="text-sm font-semibold text-[#1A1A1A]">
                    Limits & verification
                  </Text>
                </View>
              </View>
              <Text className="text-base text-[#888888]">›</Text>
            </TouchableOpacity>

            {/* Rates & Fees Row */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={
                onPressRatesAndFees ??
                (() => console.log("Navigate to RatesAndFeesScreen"))
              }
              className="pt-3 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-8 h-8 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                  <Text className="text-xs text-[#666666]">📈</Text>
                </View>
                <View>
                  <Text className="text-[10px] font-bold text-[#888888] tracking-[0.5px] mb-0.5">
                    RATES & FEES
                  </Text>
                  <Text className="text-sm font-semibold text-[#1A1A1A]">
                    Rates & fees
                  </Text>
                </View>
              </View>
              <Text className="text-base text-[#888888]">›</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Pinned Bottom Save Button Bar */}
        <View className="px-5 pt-3 pb-4 bg-[#FCFAF7] border-t border-[#EFECE6]">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSave}
            className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
          >
            <Text className="text-white text-base font-semibold">Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
