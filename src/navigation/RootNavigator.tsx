import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { RootStackParamList } from "@/types/navigation/navigation.type";
import SplashScreen from "@/screens/Welcomes/SplashScreen";
import { getAuthentication } from "@/state/reducers/userSlice";

const Stack = createNativeStackNavigator<RootStackParamList, "RootStack">();

type Props = {
  showSplash: boolean;
  onSplashFinish: () => void;
};

export default function RootNavigator({ showSplash, onSplashFinish }: Props) {
  const authenticated = useSelector(getAuthentication);

  return (
    <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
      {showSplash ? (
        <Stack.Screen name="Splash" options={{ headerShown: false }}>
          {() => <SplashScreen onFinish={onSplashFinish} />}
        </Stack.Screen>
      ) : authenticated ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
