import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ConfirmPinScreenProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onPinVerified?: (pin: string) => void;
}

export default function ConfirmPinScreen({
  title = "Confirm with PIN",
  subtitle = "Enter your 4-digit PIN to complete this transfer.",
  onBack,
  onPinVerified,
}: ConfirmPinScreenProps) {
  const [pin, setPin] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDigitPress = (digit: string) => {
    if (errorMessage) setErrorMessage("");
    if (pin.length >= 4) return;

    const updatedPin = pin + digit;
    setPin(updatedPin);

    if (updatedPin.length === 4) {
      setTimeout(() => {
        if (onPinVerified) {
          onPinVerified(updatedPin);
        } else {
          // Demo check (replace with real PIN validation)
          if (updatedPin === "1234") {
            console.log("Transfer authorized!");
          } else {
            setErrorMessage("Incorrect PIN. Please try again.");
            setPin("");
          }
        }
      }, 200);
    }
  };

  const handleBackspace = () => {
    if (errorMessage) setErrorMessage("");
    setPin((prev) => prev.slice(0, -1));
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
      <View className="flex-row items-center px-5 pt-3 pb-4">
        <TouchableOpacity
          onPress={onBack ?? (() => console.log("Go back to Review transfer"))}
          className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center mr-3.5"
        >
          <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold text-[#1A1A1A]">{title}</Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-6 pt-6">
        <Text className="text-sm text-[#666666] text-center mb-7">
          {subtitle}
        </Text>

        {/* 4-Dot PIN Indicator */}
        <View className="flex-row justify-center items-center gap-3.5 mb-9">
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
                    onPress={() => handleDigitPress(item)}
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

        {/* Error Feedback */}
        {errorMessage ? (
          <Text className="text-xs font-medium text-[#C86D1F] text-center mt-5">
            {errorMessage}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

{
  /* <ConfirmPinScreen
  title="Confirm with PIN"
  subtitle="Enter your 4-digit PIN to complete this conversion."
  onBack={() => setCurrentStep('review')}
  onPinVerified={(pin) => {
    // Execute conversion & navigate to ConversionSuccessScreen
    setCurrentStep('success');
  }}
/> */
}
