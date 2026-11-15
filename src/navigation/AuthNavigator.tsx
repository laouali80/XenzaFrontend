import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthStackParamList } from "@/types/navigation/navigation.type";
import GetStartedScreen from "@/screens/Welcomes/GetStartedScreen";
import OTPScreen from "@/screens/Welcomes/OTPScreen";
import { COLORS } from "@/constants/COLORS";

const Stack = createNativeStackNavigator<AuthStackParamList, "AuthStack">();

export default function AuthNavigator() {
  return (
    <Stack.Navigator id="AuthStack">
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
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
      />
    </Stack.Navigator>
  );
}
