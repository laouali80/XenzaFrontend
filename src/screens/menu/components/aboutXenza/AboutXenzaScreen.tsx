import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TermsTab from "./components/TermsTab";
import AboutTab from "./components/AboutTab";
import PrivacyTab from "./components/PrivacyTab";
import LicensesTab from "./components/LicensesTab";

export type AboutTab = "about" | "terms" | "privacy" | "licences";

interface AboutXenzaScreenProps {
  onBack?: () => void;
  onContactSupport?: () => void;
}

const TABS: { id: AboutTab; label: string }[] = [
  { id: "about", label: "About" },
  { id: "terms", label: "Terms" },
  { id: "privacy", label: "Privacy" },
  { id: "licences", label: "Licences" },
];

export default function AboutXenzaScreen({
  onBack,
  onContactSupport,
}: AboutXenzaScreenProps) {
  const [activeTab, setActiveTab] = useState<AboutTab>("about");

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
          <Text className="text-lg font-bold text-[#1A1A1A]">About Xenza</Text>
          <Text className="text-xs text-[#666666] mt-0.5">
            The app, the people behind it, and the rules we play by.
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 36,
        }}
      >
        {/* 4-Tab Segmented Switcher */}
        <View className="flex-row bg-[#F3EFEA] rounded-full p-1 mb-5">
          {TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.85}
                onPress={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 rounded-full items-center justify-center ${
                  isSelected
                    ? "bg-white border border-[#EAE5DC]"
                    : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? "text-[#1A1A1A]" : "text-[#666666]"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* TAB 1: ABOUT */}
        {activeTab === "about" && (
          <AboutTab onContactSupport={onContactSupport} />
        )}

        {/* TAB 2: TERMS */}
        {activeTab === "terms" && <TermsTab />}

        {/* TAB 3: PRIVACY */}
        {activeTab === "privacy" && <PrivacyTab />}

        {/* TAB 4: LICENCES */}
        {activeTab === "licences" && <LicensesTab />}
      </ScrollView>
    </SafeAreaView>
  );
}
