import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SecurityScreenProps {
  phoneNumber?: string;
  lastSignInDate?: string;
  initialBiometricEnabled?: boolean;
  initialConfirmPinEnabled?: boolean;
  onBack?: () => void;
  onChangePin?: () => void;
  onToggleBiometric?: (enabled: boolean) => void;
  onToggleConfirmPin?: (enabled: boolean) => void;
  onSignOut?: () => void;
}

export default function SecurityScreen({
  phoneNumber = "+2349043444405",
  lastSignInDate = "10 Nov 2026",
  initialBiometricEnabled = true,
  initialConfirmPinEnabled = false,
  onBack,
  onChangePin,
  onToggleBiometric,
  onToggleConfirmPin,
  onSignOut,
}: SecurityScreenProps) {
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(
    initialBiometricEnabled,
  );
  const [confirmPinEnabled, setConfirmPinEnabled] = useState<boolean>(
    initialConfirmPinEnabled,
  );

  const handleBiometricChange = (val: boolean) => {
    setBiometricEnabled(val);
    onToggleBiometric?.(val);
  };

  const handleConfirmPinChange = (val: boolean) => {
    setConfirmPinEnabled(val);
    onToggleConfirmPin?.(val);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center px-5 pt-3 pb-3.5 border-b border-[#EFECE6]">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back to Menu"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="text-lg font-bold text-[#1A1A1A]">Security</Text>
          <Text className="text-xs text-[#666666] mt-0.5">
            Protect your wallet with a PIN and safe preferences.
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 18,
          paddingBottom: 36,
        }}
      >
        {/* 1. Wallet PIN Card */}
        <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-5">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center flex-1 pr-3">
              <View className="w-11 h-11 rounded-full bg-[#D8F3E5] items-center justify-center mr-3">
                <Text className="text-base text-[#008744]">🔒</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  Wallet PIN
                </Text>
                <Text className="text-[11px] text-[#666666] mt-0.5">
                  Your 4-digit PIN confirms every payment.
                </Text>
              </View>
            </View>

            {/* 4 PIN Dots */}
            <View className="flex-row items-center gap-1.5">
              <View className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
              <View className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
              <View className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
              <View className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
            </View>
          </View>

          {/* Change PIN Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              onChangePin ?? (() => console.log("Navigate to Change PIN"))
            }
            className="bg-[#EAF7F0] border border-[#BCE5CE] rounded-xl px-4 h-11 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <Text className="text-xs text-[#008744] mr-2">🔑</Text>
              <Text className="text-xs font-bold text-[#008744]">
                Change PIN
              </Text>
            </View>
            <Text className="text-sm font-bold text-[#008744]">›</Text>
          </TouchableOpacity>
        </View>

        {/* 2. Security Preferences Card */}
        <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-5">
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-3.5">
            SECURITY PREFERENCES
          </Text>

          {/* Biometric Unlock Toggle Row */}
          <View className="flex-row items-center justify-between pb-3.5 border-b border-[#EFECE6]">
            <View className="flex-row items-center flex-1 pr-3">
              <View className="w-9 h-9 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                <Text className="text-sm text-[#4A4A4A]">👆</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  Biometric unlock
                </Text>
                <Text className="text-[11px] text-[#666666] mt-0.5 leading-[15px]">
                  Use your fingerprint or face to open Xenza.
                </Text>
              </View>
            </View>

            <Switch
              value={biometricEnabled}
              onValueChange={handleBiometricChange}
              trackColor={{ false: "#E0DDD6", true: "#009A49" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Confirm Payments with PIN Toggle Row */}
          <View className="flex-row items-center justify-between py-3.5 border-b border-[#EFECE6]">
            <View className="flex-row items-center flex-1 pr-3">
              <View className="w-9 h-9 rounded-full bg-[#EFECE6] items-center justify-center mr-3">
                <Text className="text-sm text-[#4A4A4A]">🛡️</Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  Confirm payments with PIN
                </Text>
                <Text className="text-[11px] text-[#666666] mt-0.5 leading-[15px]">
                  Ask for your PIN before every transfer.
                </Text>
              </View>
            </View>

            <Switch
              value={confirmPinEnabled}
              onValueChange={handleConfirmPinChange}
              trackColor={{ false: "#E0DDD6", true: "#009A49" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Demo Mode Note */}
          <View className="flex-row items-center pt-3">
            <Text className="text-xs text-[#666666] mr-1.5">ⓘ</Text>
            <Text className="text-[11px] text-[#666666] flex-1">
              Demo mode: preferences are stored on this device.
            </Text>
          </View>
        </View>

        {/* 3. Session Card */}
        <View className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl p-4 mb-5">
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-3">
            SESSION
          </Text>

          {/* Active Device Inner Box */}
          <View className="bg-[#F4F1EA] rounded-xl p-3.5 flex-row items-center mb-3.5">
            <View className="w-9 h-9 rounded-full bg-white items-center justify-center mr-3">
              <Text className="text-sm text-[#4A4A4A]">📱</Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-0.5">
                <Text className="text-sm font-bold text-[#1A1A1A]">
                  This device
                </Text>
                <View className="bg-[#FBE5CE] px-2 py-0.5 rounded-full flex-row items-center">
                  <View className="w-1.5 h-1.5 rounded-full bg-[#C86D1F] mr-1" />
                  <Text className="text-[10px] font-bold text-[#B86318]">
                    Active
                  </Text>
                </View>
              </View>

              <Text className="text-[11px] text-[#666666]">
                {phoneNumber} · Last sign-in {lastSignInDate}
              </Text>
            </View>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onSignOut ?? (() => console.log("Sign out tapped"))}
            className="bg-white border border-[#E5C5A8] h-11 rounded-xl flex-row items-center justify-center"
          >
            <Text className="text-xs font-bold text-[#C86D1F] mr-1.5">↪</Text>
            <Text className="text-xs font-bold text-[#C86D1F]">Sign out</Text>
          </TouchableOpacity>
        </View>

        {/* 4. Stay Safe Tips Card */}
        <View className="bg-[#E6F4F1] rounded-2xl p-4">
          <View className="flex-row items-center mb-2.5">
            <Text className="text-xs text-[#1E7B6B] mr-1.5">🛡️</Text>
            <Text className="text-xs font-bold text-[#1E4E46]">Stay safe</Text>
          </View>

          <View className="gap-2">
            <View className="flex-row items-start">
              <View className="w-3.5 h-3.5 rounded-full border border-[#1E7B6B] items-center justify-center mr-2 mt-0.5">
                <Text className="text-[8px] font-bold text-[#1E7B6B]">✓</Text>
              </View>
              <Text className="flex-1 text-xs text-[#2C5E54] leading-[17px]">
                Never share your PIN with anyone, including agents.
              </Text>
            </View>

            <View className="flex-row items-start">
              <View className="w-3.5 h-3.5 rounded-full border border-[#1E7B6B] items-center justify-center mr-2 mt-0.5">
                <Text className="text-[8px] font-bold text-[#1E7B6B]">✓</Text>
              </View>
              <Text className="flex-1 text-xs text-[#2C5E54] leading-[17px]">
                Xenza will never ask for your PIN by phone or message.
              </Text>
            </View>

            <View className="flex-row items-start">
              <View className="w-3.5 h-3.5 rounded-full border border-[#1E7B6B] items-center justify-center mr-2 mt-0.5">
                <Text className="text-[8px] font-bold text-[#1E7B6B]">✓</Text>
              </View>
              <Text className="flex-1 text-xs text-[#2C5E54] leading-[17px]">
                Choose a PIN that is not your birth year or phone digits.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
