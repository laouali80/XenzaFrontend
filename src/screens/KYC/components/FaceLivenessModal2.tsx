import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  Camera,
  CameraRef,
  useCameraDevice,
  useCameraPermission,
  usePhotoOutput,
} from "react-native-vision-camera";
import {
  Face,
  useFaceDetectorOutput,
} from "react-native-vision-camera-face-detector";

interface FaceLivenessModalProps {
  visible: boolean;
  onClose: () => void;
  onCaptureComplete: (photoUri: string) => void;
}

type LivenessStep = "center" | "blink" | "turn_head" | "capturing";

export default function FaceLivenessModal2({
  visible,
  onClose,
  onCaptureComplete,
}: FaceLivenessModalProps) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");
  const cameraRef = useRef<CameraRef>(null);
  const photoOutput = usePhotoOutput();

  const [step, setStep] = useState<LivenessStep>("center");
  const [feedback, setFeedback] = useState<string>(
    "Position your face inside the oval",
  );
  const [hasClosedEyes, setHasClosedEyes] = useState<boolean>(false);
  const isCapturingRef = useRef<boolean>(false);

  // Configure ML Kit to compute eye probabilities and head angles
  useEffect(() => {
    if (visible && !hasPermission) {
      requestPermission();
    }
    if (visible) {
      setStep("center");
      setFeedback("Position your face inside the oval");
      setHasClosedEyes(false);
      isCapturingRef.current = false;
    }
  }, [visible, hasPermission]);

  const triggerPhotoCapture = async () => {
    if (isCapturingRef.current || !cameraRef.current) return;
    isCapturingRef.current = true;

    try {
      const photo = await photoOutput.capturePhoto(
        {
          flashMode: "off",
          enableShutterSound: false,
        },
        {},
      );
      const path = await photo.saveToTemporaryFileAsync();
      photo.dispose();
      onCaptureComplete(`file://${path}`);
    } catch (error) {
      console.error("VisionCamera capture failed:", error);
      isCapturingRef.current = false;
    }
  };

  // JS-thread state machine driven by native ML Kit face data
  const processDetectedFaces = useCallback(
    (faces: Face[]) => {
      if (isCapturingRef.current) return;

      if (faces.length === 0) {
        setFeedback("No face detected. Look at the camera.");
        return;
      }

      if (faces.length > 1) {
        setFeedback("Multiple faces detected. Ensure only you are in frame.");
        return;
      }

      const face = faces[0];
      const leftEye = face.leftEyeOpenProbability ?? 1;
      const rightEye = face.rightEyeOpenProbability ?? 1;
      const yaw = face.yawAngle ?? 0; // Left/Right head rotation in degrees

      // STAGE 1: Center face straight ahead
      if (step === "center") {
        if (Math.abs(yaw) < 12) {
          setStep("blink");
          setFeedback("Great! Now blink both eyes slowly");
        } else {
          setFeedback("Look straight ahead at the camera");
        }
        return;
      }

      // STAGE 2: Verify an actual eye blink (close -> open)
      if (step === "blink") {
        if (leftEye < 0.25 && rightEye < 0.25) {
          setHasClosedEyes(true);
          setFeedback("Eyes closed... now open them");
        } else if (hasClosedEyes && leftEye > 0.7 && rightEye > 0.7) {
          setStep("turn_head");
          setFeedback(
            "Blink verified! Now turn your head slightly left or right",
          );
        }
        return;
      }

      // STAGE 3: Verify head rotation (yaw > 18 degrees either direction)
      if (step === "turn_head") {
        if (Math.abs(yaw) >= 18) {
          setStep("capturing");
          setFeedback("Look straight ahead — capturing selfie...");
          setTimeout(() => {
            triggerPhotoCapture();
          }, 600);
        }
      }
    },
    [step, hasClosedEyes],
  );

  const faceDetectorOutput = useFaceDetectorOutput({
    performanceMode: "fast",
    runClassifications: true,
    runLandmarks: true,
    runContours: false,
    minFaceSize: 0.35,
    trackingEnabled: true,
    cameraFacing: "front",
    onFacesDetected: processDetectedFaces,
    onError: (error) => {
      console.error("Face detection failed:", error);
    },
  });

  // Dynamic visual styling based on active biometric stage
  const getOvalBorderColor = () => {
    if (step === "capturing") return "border-[#009A49]";
    if (step === "blink" || step === "turn_head") return "border-[#F59E0B]";
    return "border-white/80";
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View className="flex-1 bg-black">
        {!hasPermission || !device ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-white text-lg font-bold text-center mb-2">
              Camera Access Required
            </Text>
            <Text className="text-gray-300 text-sm text-center mb-6">
              We need access to your front camera for biometric identity
              verification.
            </Text>
            <TouchableOpacity
              onPress={requestPermission}
              className="bg-[#009A49] px-6 py-3.5 rounded-xl mb-4"
            >
              <Text className="text-white font-semibold">Enable Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-400 text-sm">Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1">
            {/* Live VisionCamera Stream */}
            <Camera
              ref={cameraRef}
              device={device}
              isActive={visible}
              outputs={[photoOutput, faceDetectorOutput]}
              style={StyleSheet.absoluteFill}
            />

            {/* Top Navigation & Progress Pill */}
            <View className="flex-row items-center justify-between px-5 pt-14 z-10">
              <TouchableOpacity
                onPress={onClose}
                className="w-10 h-10 rounded-full bg-black/60 items-center justify-center"
              >
                <Text className="text-white text-lg font-bold">✕</Text>
              </TouchableOpacity>

              <View className="bg-black/70 px-4 py-1.5 rounded-full">
                <Text className="text-white text-xs font-semibold">
                  {step === "center" && "Check 1/3: Center Face"}
                  {step === "blink" && "Check 2/3: Blink Eyes"}
                  {step === "turn_head" && "Check 3/3: Turn Head"}
                  {step === "capturing" && "Liveness Confirmed"}
                </Text>
              </View>

              <View className="w-10" />
            </View>

            {/* Face Oval Guide Overlay */}
            <View className="flex-1 items-center justify-center px-6">
              <View
                className={`w-[270px] h-[360px] rounded-[150px] border-[4px] ${getOvalBorderColor()} items-center justify-end pb-6`}
              >
                {step === "capturing" && (
                  <ActivityIndicator size="large" color="#009A49" />
                )}
              </View>

              {/* Real-time ML Kit Instruction Prompt */}
              <View className="mt-8 bg-black/75 px-5 py-3.5 rounded-2xl items-center">
                <Text className="text-white text-base font-bold text-center">
                  {feedback}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
