import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"; // Adjust path to your proxy hook
import { useTx } from "../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

type CountryCode = "NE" | "NG";

const LoginScreen = () => {
  const tx = useTx();

  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("NE");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>(
    "Enter a valid phone number",
  );

  const handleContinue = () => {
    const cleanNumber = phoneNumber.replace(/\s+/g, "");
    if (cleanNumber.length < 8) {
      setErrorMessage("Enter a valid phone number");
      return;
    }

    setErrorMessage("");
    const fullNumber =
      selectedCountry === "NE" ? `+227${cleanNumber}` : `+234${cleanNumber}`;
    console.log("Proceeding to PIN entry with:", fullNumber);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Header Bar */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
          <TouchableOpacity
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center"
            onPress={() => console.log("Go back")}
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <Text className="text-base font-bold text-[#1A1A1A]">Xenza</Text>

          <View className="w-[38px]" />
        </View>

        {/* Main Content Area */}
        <View className="flex-1 px-6 pt-3">
          <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
            {tx.screens.logIn.title}
          </Text>
          <Text className="text-[15px] text-[#666666] mb-8">
            {tx.screens.logIn.text}
          </Text>

          {/* Input Label */}
          <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
            {tx.screens.logIn.inputLabel.toUpperCase()}
          </Text>

          {/* Phone Number Input Box with Embedded Country Switcher */}
          <View
            className={`flex-row items-center bg-white border-[1.5px] rounded-xl px-2.5 h-[60px] ${
              isFocused ? "border-[#009A49]" : "border-[#E0E0E0]"
            }`}
          >
            {/* Country Toggle Pills */}
            <View className="flex-row items-center mr-2.5">
              <TouchableOpacity
                className={`items-center justify-center px-2.5 py-1.5 rounded-lg mr-1 ${
                  selectedCountry === "NE" ? "bg-[#E6F5EC]" : "bg-transparent"
                }`}
                onPress={() => setSelectedCountry("NE")}
              >
                <Text
                  className={`text-[10px] font-bold ${
                    selectedCountry === "NE"
                      ? "text-[#008744]"
                      : "text-[#888888]"
                  }`}
                >
                  NE
                </Text>
                <Text
                  className={`text-[13px] font-bold ${
                    selectedCountry === "NE"
                      ? "text-[#008744]"
                      : "text-[#666666]"
                  }`}
                >
                  +227
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`items-center justify-center px-2.5 py-1.5 rounded-lg mr-1 ${
                  selectedCountry === "NG" ? "bg-[#E6F5EC]" : "bg-transparent"
                }`}
                onPress={() => setSelectedCountry("NG")}
              >
                <Text
                  className={`text-[10px] font-bold ${
                    selectedCountry === "NG"
                      ? "text-[#008744]"
                      : "text-[#888888]"
                  }`}
                >
                  NG
                </Text>
                <Text
                  className={`text-[13px] font-bold ${
                    selectedCountry === "NG"
                      ? "text-[#008744]"
                      : "text-[#666666]"
                  }`}
                >
                  +234
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phone Text Input */}
            <TextInput
              className="flex-1 text-base font-medium text-[#1A1A1A] h-full"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder={
                selectedCountry === "NE" ? "80 ** ** **" : "70 **** ****"
              }
              placeholderTextColor="#B0B0B0"
              keyboardType="phone-pad"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus
            />
          </View>

          {/* Validation Error Text */}
          {errorMessage ? (
            <Text className="text-xs font-medium text-[#C86D1F] mt-2 mb-5">
              {errorMessage}
            </Text>
          ) : (
            <View className="h-6 mt-2 mb-5" />
          )}

          {/* Primary Action Button */}
          <TouchableOpacity
            className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
            onPress={handleContinue}
          >
            <Text className="text-white text-base font-semibold">
              {tx.screens.preAuthCTA.continueBtn}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Footer Section */}
        <View className="border-t border-[#EFECE6] py-5 items-center">
          <Text className="text-sm text-[#666666]">
            {tx.screens.logIn.CTAMssg}{" "}
            <Text
              className="text-[#008744] font-semibold"
              onPress={() => console.log("Navigate to Create Account")}
            >
              {tx.screens.logIn.toggleLink}
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
