import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
// import { RootStackParamList } from "@/types/navigation/navigation.type";
// import SplashScreen from "@/screens/Welcomes/SplashScreen";

// const Stack = createNativeStackNavigator<RootStackParamList, "RootStack">();
const Stack = createNativeStackNavigator();

type Props = {
  showSplash?: boolean;
  onSplashFinish?: () => void;
};

export default function RootNavigator({ showSplash, onSplashFinish }: Props) {
  return (
    <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="App" component={AppNavigator} /> */}
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
}
