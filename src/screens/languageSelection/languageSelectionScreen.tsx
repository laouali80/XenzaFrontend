import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTx } from "../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

type LanguageCode = "en" | "fr" | "ha";

interface LanguageOption {
  code: LanguageCode;
  regionTag: string;
  label: string;
  subLabel: string;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    regionTag: "GB",
    label: "English",
    subLabel: "English",
  },
  {
    code: "fr",
    regionTag: "FR",
    label: "Français",
    subLabel: "Français",
  },
  {
    code: "ha",
    regionTag: "NE",
    label: "Hausa",
    subLabel: "Hausa",
  },
];

export default function LanguageSelectScreen() {
  const { i18n } = useTranslation();
  const tx = useTx();

  // Initialize with current active i18n language or default to 'en'
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(
    (i18n.language as LanguageCode) || "en",
  );

  const handleSelectLanguage = async (code: LanguageCode) => {
    setSelectedLang(code);
    await i18n.changeLanguage(code);
    await AsyncStorage.setItem("USER_LANGUAGE", code);
  };

  const handleContinue = () => {
    console.log("Confirmed language:", selectedLang);
    // Navigate to next screen (e.g., Create Account or Home)
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="px-5 pt-3 pb-4">
        <TouchableOpacity
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center"
          onPress={() => console.log("Go back")}
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View className="flex-1 px-6 pt-2">
        <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
          {tx.screens.languageSelect.title}
        </Text>
        <Text className="text-[15px] text-[#666666] mb-8">
          {tx.screens.languageSelect.text}
        </Text>

        {/* Language Option Cards */}
        <View className="gap-3.5">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.code;

            return (
              <TouchableOpacity
                key={lang.code}
                activeOpacity={0.8}
                onPress={() => handleSelectLanguage(lang.code)}
                className={`flex-row items-center justify-between px-4 py-4 rounded-2xl border-[1.5px] ${
                  isSelected
                    ? "bg-[#E6F5EC] border-[#52B788]"
                    : "bg-[#FAF8F5] border-[#EBE7DF]"
                }`}
              >
                {/* Left Section: Region Code + Language Names */}
                <View className="flex-row items-center">
                  <Text className="text-base font-bold text-[#1A1A1A] w-9">
                    {lang.regionTag}
                  </Text>

                  <View>
                    <Text className="text-base font-semibold text-[#1A1A1A]">
                      {lang.label}
                    </Text>
                    <Text className="text-xs text-[#666666] mt-0.5">
                      {lang.subLabel}
                    </Text>
                  </View>
                </View>

                {/* Right Section: Radio / Checkmark Indicator */}
                {isSelected ? (
                  <View className="w-6 h-6 rounded-full bg-[#008744] items-center justify-center">
                    <Text className="text-white text-xs font-bold">✓</Text>
                  </View>
                ) : (
                  <View className="w-6 h-6 rounded-full border-[1.5px] border-[#D6D1C7] bg-transparent" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Bottom Primary Button */}
      <View className="px-6 pb-6">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
        >
          <Text className="text-white text-base font-semibold">
            {tx.screens.preAuthCTA.continueBtn}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
