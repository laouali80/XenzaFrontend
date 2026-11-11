import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

interface FaceLivenessModalProps {
  visible: boolean;
  onClose: () => void;
  onCaptureComplete: (photoUri: string) => void;
}

type LivenessStage = "align" | "liveness_prompt" | "capturing";

export default function FaceLivenessModal({
  visible,
  onClose,
  onCaptureComplete,
}: FaceLivenessModalProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [stage, setStage] = useState<LivenessStage>("align");
  const [countdown, setCountdown] = useState<number>(3);

  // Request permission automatically when modal opens
  useEffect(() => {
    if (visible && !permission?.granted) {
      requestPermission();
    }
  }, [visible]);

  // Simulate progressive liveness verification steps once camera opens
  useEffect(() => {
    if (!visible || !permission?.granted) return;

    setStage("align");
    setCountdown(3);

    // 1. Give user 2.5s to align face inside the oval
    const alignTimer = setTimeout(() => {
      setStage("liveness_prompt");
    }, 2500);

    // 2. Prompt user to smile/blink for 2.5s, then auto-capture
    const captureTimer = setTimeout(() => {
      setStage("capturing");
      takeSelfie();
    }, 5200);

    return () => {
      clearTimeout(alignTimer);
      clearTimeout(captureTimer);
    };
  }, [visible, permission?.granted]);

  const takeSelfie = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        shutterSound: false,
      });
      if (photo?.uri) {
        onCaptureComplete(photo.uri);
      }
    } catch (error) {
      console.error("Failed to capture selfie:", error);
    }
  };

  // Determine dynamic oval border & guidance text
  const getStageConfig = () => {
    switch (stage) {
      case "align":
        return {
          borderColor: "border-white/80",
          badgeBg: "bg-black/60",
          title: "Position your face inside the oval",
          subtitle: "Ensure your face is well-lit and clearly visible",
        };
      case "liveness_prompt":
        return {
          borderColor: "border-[#F59E0B]", // Amber ring during active liveness check
          badgeBg: "bg-[#F59E0B]/90",
          title: "Blink slowly or smile now",
          subtitle: "Verifying live presence...",
        };
      case "capturing":
        return {
          borderColor: "border-[#009A49]", // Xenza Green ring on lock
          badgeBg: "bg-[#009A49]",
          title: "Hold still...",
          subtitle: "Capturing verified selfie",
        };
    }
  };

  const config = getStageConfig();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View className="flex-1 bg-black">
        {!permission?.granted ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-white text-lg font-bold text-center mb-2">
              Camera Permission Required
            </Text>
            <Text className="text-gray-300 text-sm text-center mb-6">
              We need access to your front camera to verify your identity.
            </Text>
            <TouchableOpacity
              onPress={requestPermission}
              className="bg-[#009A49] px-6 py-3.5 rounded-xl mb-4"
            >
              <Text className="text-white font-semibold">
                Grant Camera Access
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-400 text-sm">Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1">
            {/* Live Front Camera Feed */}
            <CameraView
              ref={cameraRef}
              facing="front"
              style={StyleSheet.absoluteFill}
            />

            {/* Top Header Close Button */}
            <View className="flex-row items-center justify-between px-5 pt-14 z-10">
              <TouchableOpacity
                onPress={onClose}
                className="w-10 h-10 rounded-full bg-black/50 items-center justify-center"
              >
                <Text className="text-white text-lg font-bold">✕</Text>
              </TouchableOpacity>

              <View className={`px-3.5 py-1.5 rounded-full ${config.badgeBg}`}>
                <Text className="text-white text-xs font-semibold">
                  {stage === "align"
                    ? "Step 1/2: Align Face"
                    : stage === "liveness_prompt"
                      ? "Step 2/2: Liveness Check"
                      : "Verified"}
                </Text>
              </View>

              <View className="w-10" />
            </View>

            {/* Center Face Oval Guide */}
            <View className="flex-1 items-center justify-center px-6">
              {/* Oval Frame */}
              <View
                className={`w-[270px] h-[360px] rounded-[150px] border-[4px] ${config.borderColor} items-center justify-end pb-6`}
              >
                {stage === "capturing" && (
                  <ActivityIndicator size="large" color="#009A49" />
                )}
              </View>

              {/* Dynamic Instruction Banner */}
              <View className="mt-8 bg-black/70 px-5 py-3.5 rounded-2xl items-center">
                <Text className="text-white text-base font-bold text-center">
                  {config.title}
                </Text>
                <Text className="text-gray-300 text-xs text-center mt-1">
                  {config.subtitle}
                </Text>
              </View>
            </View>

            {/* Manual Capture Fallback Button */}
            <View className="pb-12 items-center">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={takeSelfie}
                className="w-16 h-16 rounded-full border-4 border-white items-center justify-center"
              >
                <View className="w-12 h-12 rounded-full bg-white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
