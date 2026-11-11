import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useTx } from "../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import FaceLivenessModal from "./components/FaceLivenessModal";

type DocType = "passport" | "national_id" | "drivers_licence";

export default function KYCScreen() {
  const tx = useTx();

  // Step State (1 to 3)
  const [step, setStep] = useState<number>(1);

  // Step 1: Document Selection
  const [selectedDoc, setSelectedDoc] = useState<DocType>("passport");

  // Step 2: Document Number & Upload State
  const [docNumber, setDocNumber] = useState<string>("");
  const [docUploaded, setDocUploaded] = useState<boolean>(false);

  // Step 3: Selfie State
  const [selfieCaptured, setSelfieCaptured] = useState<boolean>(false);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      console.log("Exit KYC flow");
    }
  };

  const handleSkip = () => {
    console.log("Skipped KYC for now");
  };

  const handleSubmit = () => {
    console.log("Submitted KYC for review:", {
      documentType: selectedDoc,
      documentNumber: docNumber,
      docUploaded,
      selfieCaptured,
    });
  };

  const progressWidth = `${(step / 3) * 100}%`;
  const isStep2Valid = docNumber.trim().length >= 5 && docUploaded;

  const documentOptions: { id: DocType; label: string; icon: string }[] = [
    { id: "passport", label: tx.screens.KYC.step1.doc1Label, icon: "🛂" },
    { id: "national_id", label: tx.screens.KYC.step1.doc2Label, icon: "🪪" },
    {
      id: "drivers_licence",
      label: tx.screens.KYC.step1.doc3Label,
      icon: "🚗",
    },
  ];

  const [docImageUri, setDocImageUri] = useState<string | null>(null);
  const [selfieUri, setSelfieUri] = useState<string | null>(null);
  const [isLivenessOpen, setIsLivenessOpen] = useState<boolean>(false);

  // Handler for Step 2: Document Photo Picker (Camera or Gallery)
  const handlePickDocument = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Camera permission is required to capture your ID.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.85,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setDocImageUri(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#FCFAF7]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Top Progress Header */}
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
            {tx.common.stepIndicator.step} {step} {tx.common.stepIndicator.of} 3
          </Text>
        </View>

        {/* STEP 1: CHOOSE DOCUMENT & LIMITS PREVIEW */}
        {step === 1 && (
          <View className="flex-1 px-6 pt-2">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
            >
              <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
                {tx.screens.KYC.step1.title}
              </Text>
              <Text className="text-[15px] text-[#666666] leading-[22px] mb-7">
                {tx.screens.KYC.step1.text}
              </Text>

              <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-3">
                {tx.screens.KYC.step1.selectLabel.toUpperCase()}
              </Text>

              {/* Document Type Cards */}
              <View className="gap-3 mb-6">
                {documentOptions.map((doc) => {
                  const isSelected = selectedDoc === doc.id;
                  return (
                    <TouchableOpacity
                      key={doc.id}
                      activeOpacity={0.8}
                      onPress={() => setSelectedDoc(doc.id)}
                      className={`flex-row items-center justify-between px-4 py-4 rounded-2xl border-[1.5px] ${
                        isSelected
                          ? "bg-[#E6F5EC] border-[#52B788]"
                          : "bg-[#FAF8F5] border-[#EBE7DF]"
                      }`}
                    >
                      <View className="flex-row items-center">
                        <View
                          className={`w-9 h-9 rounded-xl items-center justify-center mr-3.5 ${
                            isSelected ? "bg-[#D1EFE0]" : "bg-[#F0ECE4]"
                          }`}
                        >
                          <Text className="text-base">{doc.icon}</Text>
                        </View>
                        <Text className="text-base font-semibold text-[#1A1A1A]">
                          {doc.label}
                        </Text>
                      </View>

                      {isSelected ? (
                        <View className="w-6 h-6 rounded-full bg-[#008744] items-center justify-center">
                          <Text className="text-white text-xs font-bold">
                            ✓
                          </Text>
                        </View>
                      ) : (
                        <View className="w-6 h-6 rounded-full border-[1.5px] border-[#D6D1C7]" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Your Limits Card */}
              <View className="bg-[#F6F3ED] border border-[#EAE5DC] rounded-2xl p-4">
                <View className="flex-row items-center justify-between mb-3.5">
                  <Text className="text-sm font-bold text-[#1A1A1A]">
                    Your limits
                  </Text>
                  <View className="bg-[#E3F1EC] px-2.5 py-1 rounded-full">
                    <Text className="text-[11px] font-semibold text-[#1E7B5A]">
                      Unverified
                    </Text>
                  </View>
                </View>

                {/* Limit Rows */}
                <View className="gap-2.5">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-[#666666]">
                      Per transaction
                    </Text>
                    <Text className="text-xs font-medium text-[#1A1A1A]">
                      100,000 FCFA →{" "}
                      <Text className="font-bold text-[#008744]">
                        2,000,000 FCFA
                      </Text>
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-[#666666]">
                      Daily outgoing
                    </Text>
                    <Text className="text-xs font-medium text-[#1A1A1A]">
                      300,000 FCFA →{" "}
                      <Text className="font-bold text-[#008744]">
                        5,000,000 FCFA
                      </Text>
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-[#666666]">
                      Wallet balance cap
                    </Text>
                    <Text className="text-xs font-medium text-[#1A1A1A]">
                      500,000 FCFA →{" "}
                      <Text className="font-bold text-[#008744]">No limit</Text>
                    </Text>
                  </View>
                </View>

                {/* Info Hint */}
                <View className="flex-row items-center mt-3.5 pt-3 border-t border-[#E8E3D9]">
                  <Text className="text-xs text-[#1E7B5A] mr-1.5">ⓘ</Text>
                  <Text className="text-[11px] text-[#666666]">
                    Verify your identity to unlock higher limits.
                  </Text>
                </View>
              </View>
            </ScrollView>

            {/* Footer Actions */}
            <View className="pb-6 pt-2">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setStep(2)}
                className="bg-[#009A49] h-[54px] rounded-xl items-center justify-center mb-4"
              >
                <Text className="text-white text-base font-semibold">
                  {tx.screens.preAuthCTA.continueBtn}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSkip} className="items-center">
                <Text className="text-sm font-medium text-[#4A4A4A]">
                  {tx.screens.KYC.CTA.skipForNowBtn}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 2: DOCUMENT NUMBER & UPLOAD */}
        {step === 2 && (
          <View className="flex-1 px-6 pt-2">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.KYC.step2.title}
            </Text>
            <Text className="text-[15px] text-[#666666] leading-[22px] mb-7">
              {tx.screens.KYC.step2.text}
            </Text>

            {/* Document Number Field */}
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
              {tx.screens.KYC.step2.inputLabel}
            </Text>
            <View className="flex-row items-center bg-white border-[1.5px] border-[#E0E0E0] rounded-xl px-3.5 h-[54px] mb-6">
              <Text className="text-base text-[#888888] mr-2.5">📄</Text>
              <TextInput
                className="flex-1 text-base text-[#1A1A1A] h-full"
                value={docNumber}
                onChangeText={setDocNumber}
                placeholder="A01234567"
                placeholderTextColor="#B0B0B0"
                autoCapitalize="characters"
              />
            </View>

            {/* Upload Document Dashed Box */}
            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
              {tx.screens.KYC.step2.uploadLabel}
            </Text>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setDocUploaded(!docUploaded)}
              className={`border-[1.5px] border-dashed rounded-2xl py-10 px-6 items-center justify-center ${
                docUploaded
                  ? "bg-[#E6F5EC] border-[#009A49]"
                  : "bg-[#FAF6F0] border-[#D6D0C4]"
              }`}
            >
              <Text className="text-2xl mb-2.5">
                {docUploaded ? "✅" : "☁️"}
              </Text>
              <Text className="text-base font-bold text-[#1A1A1A] mb-1 text-center">
                {docUploaded
                  ? "Document uploaded"
                  : tx.screens.KYC.step2.instruction1}
              </Text>
              <Text className="text-xs text-[#666666] text-center leading-[18px]">
                {tx.screens.KYC.step2.instruction2}
              </Text>
            </TouchableOpacity>

            {/* Footer Actions */}
            <View className="flex-1 justify-end pb-6">
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={!isStep2Valid}
                onPress={() => setStep(3)}
                className={`h-[54px] rounded-xl items-center justify-center mb-4 ${
                  isStep2Valid ? "bg-[#009A49]" : "bg-[#8FD1AE]"
                }`}
              >
                <Text className="text-white text-base font-semibold">
                  {tx.screens.preAuthCTA.continueBtn}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSkip} className="items-center">
                <Text className="text-sm font-medium text-[#4A4A4A]">
                  {tx.screens.KYC.CTA.skipForNowBtn}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* STEP 3: TAKE A SELFIE WITH LIVENESS MODAL */}
        {step === 3 && (
          <View className="flex-1 px-6 pt-2">
            <Text className="text-[28px] font-bold text-[#1A1A1A] mb-2">
              {tx.screens.KYC.step3.title}
            </Text>
            <Text className="text-[15px] text-[#666666] leading-[22px] mb-7">
              {tx.screens.KYC.step3.text}
            </Text>

            <Text className="text-[11px] font-bold text-[#666666] tracking-[0.6px] mb-2">
              {tx.screens.KYC.step3.fieldLabel}
            </Text>

            {/* Take a Selfie Dashed Box */}
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setIsLivenessOpen(true)}
              className={`border-[1.5px] border-dashed rounded-2xl py-10 px-6 items-center justify-center ${
                selfieUri
                  ? "bg-[#E6F5EC] border-[#009A49]"
                  : "bg-[#FAF6F0] border-[#D6D0C4]"
              }`}
            >
              {selfieUri ? (
                <View className="items-center">
                  <Image
                    source={{ uri: selfieUri }}
                    className="w-24 h-24 rounded-full border-2 border-[#009A49] mb-3"
                  />
                  <Text className="text-base font-bold text-[#1A1A1A] mb-1">
                    Liveness verified
                  </Text>
                  <Text className="text-xs font-semibold text-[#008744]">
                    Tap to retake selfie
                  </Text>
                </View>
              ) : (
                <View className="items-center">
                  <View className="w-16 h-16 rounded-full bg-[#ECE7DF] items-center justify-center mb-4">
                    <Text className="text-2xl">📷</Text>
                  </View>
                  <Text className="text-base font-bold text-[#1A1A1A] mb-1 text-center">
                    {tx.screens.KYC.step3.instruction1}
                  </Text>
                  <Text className="text-xs text-[#666666] text-center leading-[18px]">
                    {tx.screens.KYC.step3.instruction2}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Footer Actions */}
            <View className="flex-1 justify-end pb-6">
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={!selfieUri}
                onPress={handleSubmit}
                className={`h-[54px] rounded-xl items-center justify-center mb-4 ${
                  selfieUri ? "bg-[#009A49]" : "bg-[#8FD1AE]"
                }`}
              >
                <Text className="text-white text-base font-semibold">
                  {tx.screens.KYC.step3.submitBtn}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSkip} className="items-center">
                <Text className="text-sm font-medium text-[#4A4A4A]">
                  {tx.screens.KYC.CTA.skipForNowBtn}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Face Liveness Camera Modal */}
            <FaceLivenessModal
              visible={isLivenessOpen}
              onClose={() => setIsLivenessOpen(false)}
              onCaptureComplete={(uri) => {
                setSelfieUri(uri);
                setIsLivenessOpen(false);
              }}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
