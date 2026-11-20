import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OnboardingScreen from "../screens/onboarding/onboardingScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator id="AuthStack">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={({ navigation }) => ({
          headerShown: Platform.OS !== "android",
          headerTitle: "OTP Verification",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicons
                name="chevron-back-circle"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          ),
        })}
      /> */}
    </Stack.Navigator>
  );
}
