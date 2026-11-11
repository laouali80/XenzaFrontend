import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTx } from "../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";

type CountryCode = "NE" | "NG";
type ResetStep = "phone" | "otp" | "new_pin" | "success";

interface ResetPinScreenProps {
  onBackToLogin?: () => void;
}

export default function ResetPinScreen({ onBackToLogin }: ResetPinScreenProps) {
  const tx = useTx();

  // Current Flow Step
  const [step, setStep] = useState<ResetStep>("phone");

  // View 1: Phone Input State
  const [country, setCountry] = useState<CountryCode>("NE");
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  // View 2: 6-Digit OTP State
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<React.ElementRef<typeof TextInput> | null>>([]);
  const demoCode = "817933";

  // View 3: New PIN & Confirm PIN State
  const [pinStage, setPinStage] = useState<"new" | "confirm">("new");
  const [firstPin, setFirstPin] = useState<string>("");
  const [currentPin, setCurrentPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  const fullPhoneNumber =
    country === "NE"
      ? `+227${phone.replace(/\s+/g, "") || "9012345678"}`
      : `+234${phone.replace(/\s+/g, "") || "8012345678"}`;

  // Top Back Button Handler
  const handleBack = () => {
    if (step === "new_pin" && pinStage === "confirm") {
      setPinStage("new");
      setFirstPin("");
      setCurrentPin("");
      setPinError("");
      return;
    }

    if (step === "new_pin") {
      setStep("otp");
      return;
    }

    if (step === "otp") {
      setStep("phone");
      return;
    }

    if (onBackToLogin) {
      onBackToLogin();
    } else {
      console.log("Go back to Login");
    }
  };

  // View 1: Validate Phone & Continue
  const handlePhoneContinue = () => {
    const clean = phone.replace(/\s+/g, "");
    if (clean.length < 8) {
      setPhoneError("Enter a valid phone number");
      return;
    }
    setPhoneError("");
    setStep("otp");
  };

  // View 2: OTP Input Handlers
  const handleOtpChange = (val: string, index: number) => {
    const cleanVal = val.replace(/[^0-9]/g, "");
    const updatedOtp = [...otp];
    updatedOtp[index] = cleanVal;
    setOtp(updatedOtp);

    if (cleanVal && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    if (updatedOtp.every((digit) => digit !== "")) {
      setTimeout(() => setStep("new_pin"), 250);
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // View 3: Custom Keypad PIN Handlers
  const handlePinDigit = (digit: string) => {
    if (pinError) setPinError("");
    if (currentPin.length >= 4) return;

    const updated = currentPin + digit;
    setCurrentPin(updated);

    if (updated.length === 4) {
      if (pinStage === "new") {
        setTimeout(() => {
          setFirstPin(updated);
          setCurrentPin("");
          setPinStage("confirm");
        }, 200);
      } else {
        if (updated === firstPin) {
          setTimeout(() => setStep("success"), 200);
        } else {
          setPinError("PINs do not match. Try again.");
          setTimeout(() => setCurrentPin(""), 300);
        }
      }
    }
  };

  const handlePinBackspace = () => {
    if (pinError) setPinError("");
    setCurrentPin((prev) => prev.slice(0, -1));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Back Header (Hidden on Success Screen) */}
        {step !== "success" && (
          <View className="px-5 pt-3 pb-4">
            <TouchableOpacity
              onPress={handleBack}
              className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center"
            >
              <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* VIEW 1: VERIFY PHONE NUMBER (Matches your screenshot) */}
        {step === "phone" && (
          <View className="flex-1 px-6 pt-2">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.forgetOrResetPIN.title}
            </Text>
            <Text className="text-[15px] text-[#666666] mb-8">
              {tx.screens.forgetOrResetPIN.view1.text}
            </Text>

            {/* Phone Input Card with Country Selector */}
            <View className="flex-row items-center bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-2.5 h-[62px] mb-2">
              <View className="flex-row items-center mr-2.5">
                {(["NE", "NG"] as CountryCode[]).map((code) => {
                  const active = country === code;
                  return (
                    <TouchableOpacity
                      key={code}
                      onPress={() => setCountry(code)}
                      className={`items-center justify-center px-2.5 py-1.5 rounded-lg mr-1 ${
                        active ? "bg-[#D8F3E5]" : "bg-transparent"
                      }`}
                    >
                      <Text
                        className={`text-[10px] font-bold ${
                          active ? "text-[#008744]" : "text-[#888888]"
                        }`}
                      >
                        {code}
                      </Text>
                      <Text
                        className={`text-[13px] font-bold ${
                          active ? "text-[#008744]" : "text-[#666666]"
                        }`}
                      >
                        {code === "NE" ? "+227" : "+234"}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TextInput
                className="flex-1 text-base font-medium text-[#1A1A1A] h-full"
                value={phone}
                onChangeText={(val) => {
                  setPhone(val);
                  if (phoneError) setPhoneError("");
                }}
                placeholder={country === "NE" ? "90 1234 5678" : "801 234 5678"}
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                autoFocus
              />
            </View>

            {phoneError ? (
              <Text className="text-xs font-medium text-[#C86D1F] mb-4">
                {phoneError}
              </Text>
            ) : (
              <View className="h-4 mb-2" />
            )}

            {/* Primary Continue Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handlePhoneContinue}
              className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
            >
              <Text className="text-white text-base font-semibold">
                {tx.screens.preAuthCTA.continueBtn}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* VIEW 2: 6-DIGIT VERIFICATION CODE */}
        {step === "otp" && (
          <View className="flex-1 px-6 pt-2">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.forgetOrResetPIN.title}
            </Text>
            <Text className="text-[15px] text-[#666666] mb-8">
              {tx.screens.createAcct.step2.text}
              {fullPhoneNumber}.
            </Text>

            <View className="flex-row justify-between gap-2 mb-5">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => {
                    otpRefs.current[index] = el;
                  }}
                  value={digit}
                  onChangeText={(val) => handleOtpChange(val, index)}
                  onKeyPress={(e) => handleOtpKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  autoFocus={index === 0}
                  className={`flex-1 h-[54px] rounded-xl bg-white text-center text-xl font-bold text-[#1A1A1A] border-[1.5px] ${
                    digit || index === 0
                      ? "border-[#52B788]"
                      : "border-[#E0E0E0]"
                  }`}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={() => {
                setOtp(demoCode.split(""));
                setTimeout(() => setStep("new_pin"), 300);
              }}
              className="bg-[#FDF1E6] py-2.5 px-4 rounded-xl items-center mb-6"
            >
              <Text className="text-xs font-semibold text-[#B86318]">
                Demo code: {demoCode}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setOtp(["", "", "", "", "", ""])}
              className="items-center"
            >
              <Text className="text-sm font-semibold text-[#008744]">
                {tx.screens.createAcct.step2.resendCode}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* VIEW 3: NEW PIN & CONFIRM PIN */}
        {step === "new_pin" && (
          <View className="flex-1 px-6 pt-2">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.forgetOrResetPIN.view3.text1}
            </Text>
            <Text className="text-[15px] text-[#666666] mb-8">
              {tx.screens.createAcct.step3.text}
            </Text>

            <Text className="text-sm font-medium text-[#4A4A4A] text-center mb-4">
              {pinStage === "new"
                ? tx.screens.forgetOrResetPIN.view3.text2
                : tx.screens.forgetOrResetPIN.view3.text3}
            </Text>

            {/* 4 PIN Dots */}
            <View className="flex-row justify-center items-center gap-3.5 mb-8">
              {[0, 1, 2, 3].map((i) => (
                <View
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full ${
                    i < currentPin.length ? "bg-[#008744]" : "bg-[#DEDAD2]"
                  }`}
                />
              ))}
            </View>

            {/* Error Message */}
            {pinError ? (
              <Text className="text-xs text-[#C86D1F] text-center font-medium mb-4">
                {pinError}
              </Text>
            ) : null}

            {/* Numeric Keypad */}
            <View className="gap-3">
              {[
                ["1", "2", "3"],
                ["4", "5", "6"],
                ["7", "8", "9"],
                ["", "0", "backspace"],
              ].map((row, rIdx) => (
                <View key={rIdx} className="flex-row justify-between gap-3">
                  {row.map((item, cIdx) => {
                    if (item === "") {
                      return <View key={cIdx} className="flex-1 h-[60px]" />;
                    }

                    if (item === "backspace") {
                      return (
                        <TouchableOpacity
                          key={cIdx}
                          activeOpacity={0.6}
                          onPress={handlePinBackspace}
                          className="flex-1 h-[60px] bg-[#F5F1EB] rounded-xl items-center justify-center"
                        >
                          <Text className="text-lg font-medium text-[#1A1A1A]">
                            ⌫
                          </Text>
                        </TouchableOpacity>
                      );
                    }

                    return (
                      <TouchableOpacity
                        key={cIdx}
                        activeOpacity={0.6}
                        onPress={() => handlePinDigit(item)}
                        className="flex-1 h-[60px] bg-[#F5F1EB] rounded-xl items-center justify-center"
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
          </View>
        )}

        {/* VIEW 4: SUCCESSFUL RESET CONFIRMATION */}
        {step === "success" && (
          <View className="flex-1 justify-center px-6">
            <View className="items-center mb-6">
              <View className="w-[72px] h-[72px] rounded-full bg-[#C7F0D8] items-center justify-center">
                <View className="w-10 h-10 rounded-full bg-[#008744] items-center justify-center">
                  <Text className="text-white font-bold text-lg">✓</Text>
                </View>
              </View>
            </View>

            <Text className="text-[26px] font-bold text-[#1A1A1A] text-center mb-2">
              {tx.screens.successfulResetPIN.title}
            </Text>
            <Text className="text-[15px] text-[#666666] text-center leading-[22px] mb-8">
              {tx.screens.successfulResetPIN.text}
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={
                onBackToLogin ?? (() => console.log("Navigate to Log In"))
              }
              className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
            >
              <Text className="text-white text-base font-semibold">
                {tx.screens.successfulResetPIN.logInBtn}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
