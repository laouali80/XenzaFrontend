import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"; // Adjust path to your proxy hook

import { useTx } from "../../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";
interface LoginPinScreenProps {
  phoneNumber?: string;
}

export default function LoginPinScreen({
  phoneNumber = "+22780654112",
}: LoginPinScreenProps) {
  const tx = useTx();

  const [pin, setPin] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(
    "That PIN is incorrect. Please try again.",
  );

  const handleNumberPress = (digit: string) => {
    if (errorMessage) setErrorMessage("");

    if (pin.length < 4) {
      const updatedPin = pin + digit;
      setPin(updatedPin);

      // Automatically verify once 4 digits are entered
      if (updatedPin.length === 4) {
        verifyPin(updatedPin);
      }
    }
  };

  const handleBackspace = () => {
    if (errorMessage) setErrorMessage("");
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const verifyPin = (enteredPin: string) => {
    // Replace with your actual authentication logic
    if (enteredPin === "1234") {
      console.log("PIN verified! Navigating to Home...");
    } else {
      setErrorMessage("That PIN is incorrect. Please try again.");
      setTimeout(() => setPin(""), 300); // Clear dots shortly after error
    }
  };

  const keypadRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "backspace"],
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      {/* Top Header Bar */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
        <TouchableOpacity
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center"
          onPress={() => console.log("Go back to phone input")}
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
        <Text className="text-[15px] text-[#666666] mb-7">
          {tx.screens.logIn.text}
        </Text>

        {/* PIN & Phone Number Context */}
        <Text className="text-sm font-medium text-[#4A4A4A] mb-1">PIN</Text>
        <Text className="text-sm text-[#666666] mb-8">{phoneNumber}</Text>

        {/* 4-Dot PIN Progress Indicator */}
        <View className="flex-row justify-center items-center gap-4 mb-9">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = index < pin.length;
            return (
              <View
                key={index}
                className={`w-3.5 h-3.5 rounded-full ${
                  isFilled ? "bg-[#008744]" : "bg-[#DEDAD2]"
                }`}
              />
            );
          })}
        </View>

        {/* Custom Numeric Keypad */}
        <View className="gap-3">
          {keypadRows.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row justify-between gap-3">
              {row.map((item, colIndex) => {
                if (item === "") {
                  return <View key={colIndex} className="flex-1 h-[62px]" />;
                }

                if (item === "backspace") {
                  return (
                    <TouchableOpacity
                      key={colIndex}
                      activeOpacity={0.6}
                      onPress={handleBackspace}
                      className="flex-1 h-[62px] bg-[#F5F1EB] rounded-xl items-center justify-center"
                    >
                      <Text className="text-lg font-medium text-[#1A1A1A]">
                        ⌫
                      </Text>
                    </TouchableOpacity>
                  );
                }

                return (
                  <TouchableOpacity
                    key={colIndex}
                    activeOpacity={0.6}
                    onPress={() => handleNumberPress(item)}
                    className="flex-1 h-[62px] bg-[#F5F1EB] rounded-xl items-center justify-center"
                  >
                    <Text className="text-[22px] font-medium text-[#1A1A1A]">
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Error Message & Forgot PIN Link */}
        <View className="items-center mt-6">
          {errorMessage ? (
            <Text className="text-xs font-medium text-[#C86D1F] mb-5 text-center">
              {errorMessage}
            </Text>
          ) : (
            <View className="h-4 mb-5" />
          )}

          <TouchableOpacity
            onPress={() => console.log("Navigate to Forgot PIN")}
          >
            <Text className="text-sm font-semibold text-[#008744]">
              Forgot PIN?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
