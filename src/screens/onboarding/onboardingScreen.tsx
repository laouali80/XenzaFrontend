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

  // Map slide structures dynamically to read clean values via the proxy
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
      // Handle navigation to Pre-Auth / Sign Up flow here
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

  console.log("currentIndex: ", currentIndex);
  // console.log(slides);
  return (
    <View className="bg-emerald-500 flex-1">
      <StatusBar
        barStyle="auto"
        // backgroundColor="#2358ea"
        // translucent
        // backgroundColor="black"
        // hidden={false}
      />
      <SafeAreaView className="h-full w-full bg-white">
        <View className="border-2 border-blue-600">
          <View
            className="absolute rounded-full top-16 left-8 z-50 py-3 px-4"
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 9,
                backgroundColor: "#E8F5EC",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#009B50", fontWeight: "900", fontSize: 17 }}
              >
                X
              </Text>
            </View>
            <Text style={{ color: "#171717", fontSize: 15, fontWeight: "700" }}>
              Xenza
            </Text>
          </View>
          {currentIndex < slides.length - 1 && (
            <TouchableOpacity
              onPress={handleSkip}
              // onPress={() => navigateTo("Login")}
              className="bg-[#F3E8D2] absolute rounded-full top-16 right-8 z-50 py-3 px-4"
            >
              <Text className="text-xs text-foreground-700 font-semibold">
                Skip
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* <View
          // className="h-[60%]"
          style={{
            height: "35%",
            width: "100%",
            // alignItems: "center",
            // justifyContent: "center",
            // overflow: "hidden",
            // borderRadius: 18,
            // backgroundColor: "#F4F3E8",
            // marginTop: 8,
          }}
        >
          <Image
            // source={require("../../../assets/images/onboarding/onboarding1.jpg")}
            source={require("../../../assets/images/onboarding/onboarding1.jpg")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View> */}

        {/* Main Slide Carousel Block */}
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
                // justifyContent: "space-between",
              }}
            >
              {/* Visual illustration placeholder space */}
              <View
                // className="h-[60%]"
                // className="border-2 border-indigo-600"
                className="relative w-full h-[50%] items-center justify-center overflow-hidden "
                // style={{
                //   height: "60%",
                //   width: "100%",

                //   // alignItems: "center",
                //   // justifyContent: "center",
                //   // overflow: "hidden",
                //   // borderRadius: 18,
                //   // backgroundColor: "#F4F3E8",
                //   // marginTop: 8,
                // }}
              >
                <Image
                  source={item.image}
                  // source={require("../../../assets/images/onboarding/onboarding1.jpg")}
                  // resizeMode="contain"
                  // style={{ width: "100%", height: "100%" }}
                  className="absolute inset-0 w-full h-full"
                  resizeMode="cover"
                />
              </View>

              <View
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 30,
                  gap: 12,
                }}
                className="border-2 border-red-600"
              >
                <Text className=" font-bold text-2xl  text-foreground-950">
                  {item.content.title}
                </Text>
                <Text className="text-gray-400 font-medium text-base ">
                  {item.content.text}
                </Text>
              </View>
            </View>
          )}
        />

        {/* Control Area: Pagination Indicators + Back Button */}
        <View
          className="border-2 border-yellow-600"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 24,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
                        backgroundColor: "#EAEAEA",
                      },
                ]}
              />
            ))}
          </View>

          {currentIndex > 0 ? (
            <TouchableOpacity onPress={handleBack}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#666666",
                }}
              >
                {tx.screens.onboarding.CTA.backBtn}
              </Text>
            </TouchableOpacity>
          ) : (
            <View /> // Keeps layout spaces intact when Back button is absent
          )}
        </View>

        {/* Foot Actions: Main Primary Submit and Account Triggers */}
        <View
          className="border-2 border-red-600"
          style={{
            paddingHorizontal: 24,
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
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
                color: "#FFF",
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
            className="border-2 border-yellow-600"
            style={{
              alignItems: "center",
              marginTop: 20,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#4A4A4A",
                fontWeight: "500",
              }}
            >
              {tx.screens.onboarding.CTA.alreadyAcctBtn}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View className="h-[40%] py-5 px-8">
          <Text className="text-center font-semibold text-xl text-[#2358ea]">
            {slides[0].content.title}
          </Text>
          <Text className="text-gray-400 font-medium text-base text-center">
            {slides[0].content.text}
          </Text>

          <View className="flex flex-row justify-center pt-4 gap-x-2">
            {[1, 2, 3].map((id) => (
              <View
                key={id}
                className={
                  slides.find((slide) => slide.id === id)?.id === id
                    ? "bg-orange-300 w-8 h-1"
                    : "bg-slate-200 w-4 h-1"
                }
              />
            ))}
          </View>

          <View className="mt-auto">
            <TouchableOpacity
              // onPress={slides.find((slide) => slide.id === 3)?.id !== 3 ? nextBoard : () => navigateTo("SignUp")}
              className="bg-[#2358ea] items-center p-5 rounded-lg mb-2"
            >
              <Text className="text-white font-medium">
                {slides.find((slide) => slide.id === 3)?.id !== 3
                  ? "Continue"
                  : "Create Account"}
              </Text>
            </TouchableOpacity>

            {slides.find((slide) => slide.id === 3)?.id === 3 && (
              <TouchableOpacity
                // onPress={() => navigateTo("Login")}
                className="border border-[#2358ea] items-center p-5 rounded-lg mb-2"
              >
                <Text className="text-[#2358ea] font-medium">Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </View> */}
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
