import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useRef, useState } from "react";
import { useTx } from "../../utils/tx";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../../constants/SIZES";

const OnboardingScreen = () => {
  const tx = useTx();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const slides = [
    {
      id: 1,
      content: tx.screens.onboarding.onbg1,
      image: require("../../../assets/images/onboarding/onboarding1.jpg"),
    },
    {
      id: 2,
      content: tx.screens.onboarding.onbg2,
      image: require("../../../assets/images/onboarding/onboarding2.jpg"),
    },
    {
      id: 3,
      content: tx.screens.onboarding.onbg3,
      image: require("../../../assets/images/onboarding/onboarding3.jpg"),
    },
    {
      id: 4,
      content: tx.screens.onboarding.onbg4,
      image: require("../../../assets/images/onboarding/onboarding4.jpg"),
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SIZES.screen_width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      console.log("Navigate to Sign Up");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    flatListRef.current?.scrollToIndex({
      index: slides.length - 1,
      animated: true,
    });
  };

  return (
    <View className="flex-1 bg-[#FAF9F2]">
      <StatusBar
        barStyle="auto"
        // backgroundColor="transparent"
        // translucent
      />

      <SafeAreaView className="flex-1 bg-[#FAF9F2]" edges={["top", "bottom"]}>
        {/* Floating Header: Brand Logo + Skip Pill */}
        <View
          pointerEvents="box-none"
          className="absolute top-12 left-6 right-6 z-50 flex-row items-center justify-between"
        >
          <View className="flex-row items-center gap-2.5">
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                backgroundColor: "#00875A",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#FFFFFF", fontWeight: "900", fontSize: 17 }}
              >
                X
              </Text>
            </View>
            <Text style={{ color: "#171717", fontSize: 16, fontWeight: "700" }}>
              Xenza
            </Text>
          </View>

          {currentIndex < slides.length - 1 && (
            <TouchableOpacity
              onPress={handleSkip}
              activeOpacity={0.75}
              className="bg-[#EFECE6] rounded-full py-2 px-4"
            >
              <Text className="text-xs text-[#3F3F3D] font-semibold">Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Main Slide Carousel */}
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View
              style={{
                width: SIZES.screen_width,
                flex: 1,
              }}
            >
              {/* Top Illustration Area */}
              <View className="w-full h-[54%] items-center justify-center pt-10">
                <Image
                  source={item.image}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>

              {/* Title & Description */}
              <View className="px-6 pt-4 gap-3">
                <Text
                  style={{
                    color: "#141514",
                    fontSize: 26,
                    fontWeight: "700",
                    letterSpacing: -0.3,
                  }}
                >
                  {item.content.title}
                </Text>
                <Text
                  style={{
                    color: "#5C5E58",
                    fontSize: 15,
                    fontWeight: "400",
                    lineHeight: 22,
                  }}
                >
                  {item.content.text}
                </Text>
              </View>
            </View>
          )}
        />

        {/* Pagination Dots + Back Action */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 24,
            marginBottom: 22,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  {
                    height: 8,
                    borderRadius: 4,
                    marginRight: 6,
                  },
                  currentIndex === index
                    ? {
                        width: 24,
                        backgroundColor: "#00875A",
                      }
                    : {
                        width: 8,
                        backgroundColor: "#D6D4CC",
                      },
                ]}
              />
            ))}
          </View>

          {currentIndex > 0 ? (
            <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#4B4D48",
                }}
              >
                {tx.screens.onboarding.CTA.backBtn}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>

        {/* Bottom Primary & Secondary CTAs */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingBottom: 24,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            style={{
              backgroundColor: "#00875A",
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            onPress={handleNext}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {currentIndex === slides.length - 1
                ? tx.screens.onboarding.CTA.getStartBtn
                : tx.screens.preAuthCTA.continueBtn}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              marginTop: 18,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#2E302D",
                fontWeight: "500",
              }}
            >
              {tx.screens.onboarding.CTA.alreadyAcctBtn}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
