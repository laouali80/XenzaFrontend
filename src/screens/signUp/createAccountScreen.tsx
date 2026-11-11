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

export default function CreateAccountScreen() {
  const tx = useTx();

  // Wizard Step State (1 to 5)
  const [step, setStep] = useState<number>(1);

  // Step 1: Phone Input
  const [country, setCountry] = useState<CountryCode>("NE");
  const [phone, setPhone] = useState<string>("");

  // Step 2: 6-Digit OTP
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<React.ElementRef<typeof TextInput> | null>>(
    [],
  );
  const demoCode = "817933";

  // Step 3: PIN Creation & Confirmation
  const [pinStage, setPinStage] = useState<"create" | "confirm">("create");
  const [firstPin, setFirstPin] = useState<string>("");
  const [currentPin, setCurrentPin] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Step 4: Country of Residence
  const [residence, setResidence] = useState<CountryCode>("NE");

  // Step 5: Profile Details
  const [fullName, setFullName] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  const fullPhoneNumber =
    country === "NE"
      ? `+227${phone || "952211111"}`
      : `+234${phone || "8012345678"}`;

  // Back Button Handler
  const handleBack = () => {
    if (step === 3 && pinStage === "confirm") {
      setPinStage("create");
      setFirstPin("");
      setCurrentPin("");
      setPinError("");
      return;
    }

    if (step > 1) {
      setStep(step - 1);
    } else {
      console.log("Exit registration flow");
    }
  };

  // Step 2: OTP Input Handlers
  const handleOtpChange = (val: string, index: number) => {
    const cleanVal = val.replace(/[^0-9]/g, "");
    const updatedOtp = [...otp];
    updatedOtp[index] = cleanVal;
    setOtp(updatedOtp);

    if (cleanVal && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    if (updatedOtp.every((digit) => digit !== "")) {
      setTimeout(() => setStep(3), 250);
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Step 3: Numeric Keypad PIN Handlers
  const handlePinDigit = (digit: string) => {
    if (pinError) setPinError("");
    if (currentPin.length >= 4) return;

    const updated = currentPin + digit;
    setCurrentPin(updated);

    if (updated.length === 4) {
      if (pinStage === "create") {
        setTimeout(() => {
          setFirstPin(updated);
          setCurrentPin("");
          setPinStage("confirm");
        }, 200);
      } else {
        if (updated === firstPin) {
          setTimeout(() => setStep(4), 200);
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

  // Step 5: Final Submission
  const handleFinalSubmit = () => {
    console.log("Account Created:", {
      phone: fullPhoneNumber,
      pin: firstPin,
      residence,
      fullName,
      dob,
    });
  };

  const progressWidth = `${(step / 5) * 100}%`;

  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Progress Bar Header */}
        <View className="flex-row items-center justify-between px-5 pt-3 pb-4">
          <TouchableOpacity
            onPress={handleBack}
            className="w-[38px] h-[38px] rounded-full bg-[#F3EFEA] items-center justify-center"
          >
            <Text className="text-lg font-medium text-[#1A1A1A]">←</Text>
          </TouchableOpacity>

          <View className="flex-1 h-1.5 bg-[#EAE6DF] rounded-full mx-4 overflow-hidden">
            <View
              style={{ width: progressWidth as any }}
              className="h-full bg-[#009A49] rounded-full"
            />
          </View>

          <Text className="text-xs font-medium text-[#666666]">
            {tx.common.stepIndicator.step} {step} {tx.common.stepIndicator.of} 5
          </Text>
        </View>

        {/* STEP 1: PHONE NUMBER */}
        {step === 1 && (
          <View className="flex-1 px-6 pt-3">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.createAcct.step1.title}
            </Text>
            <Text className="text-[15px] text-[#666666] mb-8">
              {tx.screens.createAcct.step1.text}
            </Text>

            <View className="flex-row items-center bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-2.5 h-[62px]">
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
                onChangeText={setPhone}
                placeholder={country === "NE" ? "90 1234 5678" : "801 234 5678"}
                placeholderTextColor="#B0B0B0"
                keyboardType="phone-pad"
                autoFocus
              />
            </View>

            <View className="flex-1 justify-end pb-4">
              <TouchableOpacity
                onPress={() => setStep(2)}
                className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
              >
                <Text className="text-white text-base font-semibold">
                  {tx.screens.preAuthCTA.continueBtn}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
        {step === 2 && (
          <View className="flex-1 px-6 pt-3">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.createAcct.step2.title}
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
                setTimeout(() => setStep(3), 300);
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

        {/* STEP 3: CREATE & CONFIRM PIN */}
        {step === 3 && (
          <View className="flex-1 px-6 pt-3">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.createAcct.step3.title}
            </Text>
            <Text className="text-[15px] text-[#666666] mb-8">
              {tx.screens.createAcct.step3.text}
            </Text>

            <Text className="text-sm font-medium text-[#4A4A4A] text-center mb-4">
              {pinStage === "create"
                ? tx.screens.createAcct.step3.text2
                : tx.screens.createAcct.step3.text3}
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

        {/* STEP 4: WHERE DO YOU LIVE? */}
        {step === 4 && (
          <View className="flex-1 px-6 pt-3">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.createAcct.step4.title}
            </Text>
            <Text className="text-[15px] text-[#666666] mb-8">
              {tx.screens.createAcct.step4.text}
            </Text>

            <View className="gap-3.5">
              {/* Niger Option */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setResidence("NE")}
                className={`flex-row items-center justify-between px-4 py-4 rounded-2xl border-[1.5px] ${
                  residence === "NE"
                    ? "bg-[#E6F5EC] border-[#52B788]"
                    : "bg-[#FAF8F5] border-[#EBE7DF]"
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-base font-bold text-[#1A1A1A] w-9">
                    NE
                  </Text>
                  <View>
                    <Text className="text-base font-semibold text-[#1A1A1A]">
                      {tx.common.nigerLabel}
                    </Text>
                    <Text className="text-xs text-[#666666] mt-0.5">
                      {tx.screens.createAcct.step4.nigerText}
                    </Text>
                  </View>
                </View>

                {residence === "NE" ? (
                  <View className="w-6 h-6 rounded-full bg-[#008744] items-center justify-center">
                    <Text className="text-white text-xs font-bold">✓</Text>
                  </View>
                ) : (
                  <View className="w-6 h-6 rounded-full border-[1.5px] border-[#D6D1C7]" />
                )}
              </TouchableOpacity>

              {/* Nigeria Option */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setResidence("NG")}
                className={`flex-row items-center justify-between px-4 py-4 rounded-2xl border-[1.5px] ${
                  residence === "NG"
                    ? "bg-[#E6F5EC] border-[#52B788]"
                    : "bg-[#FAF8F5] border-[#EBE7DF]"
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-base font-bold text-[#1A1A1A] w-9">
                    NG
                  </Text>
                  <View>
                    <Text className="text-base font-semibold text-[#1A1A1A]">
                      {tx.common.nigeriaLabel}
                    </Text>
                    <Text className="text-xs text-[#666666] mt-0.5">
                      {tx.screens.createAcct.step4.nigeriaText}
                    </Text>
                  </View>
                </View>

                {residence === "NG" ? (
                  <View className="w-6 h-6 rounded-full bg-[#008744] items-center justify-center">
                    <Text className="text-white text-xs font-bold">✓</Text>
                  </View>
                ) : (
                  <View className="w-6 h-6 rounded-full border-[1.5px] border-[#D6D1C7]" />
                )}
              </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <View className="flex-1 justify-end pb-4">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setStep(5)}
                className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
              >
                <Text className="text-white text-base font-semibold">
                  {tx.screens.preAuthCTA.continueBtn}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 5: ALMOST DONE */}
        {step === 5 && (
          <View className="flex-1 px-6 pt-3">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.createAcct.step5.title}
            </Text>
            <Text className="text-[15px] text-[#666666] mb-8">
              {tx.screens.createAcct.step5.text}
            </Text>

            {/* Full Name Field */}
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
              {tx.screens.createAcct.step5.nameLabel}
            </Text>
            <View className="flex-row items-center bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-3.5 h-[54px] mb-5">
              <Text className="text-base text-[#888888] mr-2.5">👤</Text>
              <TextInput
                className="flex-1 text-base text-[#1A1A1A] h-full"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Aisha Bello"
                placeholderTextColor="#B0B0B0"
              />
            </View>

            {/* Date of Birth Field */}
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
              {tx.screens.createAcct.step5.dobLabel}
            </Text>
            <View className="flex-row items-center bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-3.5 h-[54px] mb-6">
              <Text className="text-base text-[#888888] mr-2.5">📅</Text>
              <TextInput
                className="flex-1 text-base text-[#1A1A1A] h-full"
                value={dob}
                onChangeText={setDob}
                placeholder="dd/mm/yyyy"
                placeholderTextColor="#555555"
                keyboardType="numbers-and-punctuation"
              />
              <Text className="text-base text-[#888888] ml-2">🗓️</Text>
            </View>

            {/* Primary Create Account Button */}
            <View className="flex-1 justify-end pb-4">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleFinalSubmit}
                className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center"
              >
                <Text className="text-white text-base font-semibold">
                  {tx.screens.preAuthCTA.createAcctBtn}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Shared Bottom Footer */}
        <View className="border-t border-[#EFECE6] py-5 items-center">
          <Text className="text-sm text-[#666666]">
            {tx.screens.createAcct.CTA.CTAMssg}{" "}
            <Text
              className="text-[#008744] font-semibold"
              onPress={() => console.log("Navigate to Log in")}
            >
              {tx.screens.createAcct.CTA.toggleLink}
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
