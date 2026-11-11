import "./global.css";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { initI18n } from "./i18next/i18next";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/onboarding/onboardingScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./src/screens/login/logInScreen";
import LanguageSelectScreen from "./src/screens/languageSelection/languageSelectionScreen";
import CreateAccountScreen from "./src/screens/signUp/createAccountScreen";
import KYCScreen from "./src/screens/KYC/KYCScreen";
import KYCStatusScreen from "./src/screens/KYC/components/KYCStatus/KYCStatusScreen";
import ResetPinScreen from "./src/screens/resetPIN/ResetPinScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import AddSecondWalletScreen from "./src/screens/home/components/addSecondWallet/AddSecondWalletScreen";
import WalletDetailScreen from "./src/screens/home/components/walletDetail/WalletDetailScreen";
import NotificationsScreen from "./src/screens/notification/NotificationsScreen";
import RecentActivityScreen from "./src/screens/recentActivity/RecentActivityScreen";
import SendMoneyScreen from "./src/screens/send/SendMoneyScreen";
import SendAmountScreen from "./src/screens/send/components/sendAmount/SendAmountScreen";
import ReviewTransferScreen from "./src/screens/send/components/reviewTransfer/ReviewTransferScreen";
import TransferSuccessScreen from "./src/screens/send/components/transferSuccess/TransferSuccessScreen";
import ConvertScreen from "./src/screens/convert/ConvertScreen";
import ConvertAmountScreen from "./src/screens/convert/components/convertAmount/ConvertAmountScreen";
import ReviewConversionScreen from "./src/screens/convert/components/reviewConversion/ReviewConversionScreen";
import ConversionSuccessScreen from "./src/screens/convert/components/conversionSuccess/ConversionSuccessScreen";
import ChooseAirtimeProviderScreen from "./src/screens/services/components/airtime/ChooseAirtimeProviderScreen";
import AirtimePaymentScreen from "./src/screens/services/components/airtime/components/airtimePayment/AirtimePaymentScreen";
import PaymentSuccessScreen from "./src/screens/services/components/paymentSuccess/PaymentSuccessScreen";
import ChooseDataProviderScreen from "./src/screens/services/components/dataBundles/ChooseDataProviderScreen";
import DataBundlePaymentScreen from "./src/screens/services/components/dataBundles/components/dataBundlePayment/DataBundlePaymentScreen";
import ChooseTvProviderScreen from "./src/screens/services/components/TVSubscription/ChooseTvProviderScreen";
import ChooseUtilityProviderScreen from "./src/screens/services/components/utilityBills/ChooseUtilityProviderScreen";
import UtilityPaymentScreen from "./src/screens/services/components/utilityBills/components/utilityPayment/UtilityPaymentScreen";
import TVSubscriptionPaymentScreen from "./src/screens/services/components/TVSubscription/components/TVSubscriptionPayment/TVSubscriptionPaymentScreen";
import MenuScreen from "./src/screens/menu/MenuScreen";
import LimitsAndUsageScreen from "./src/screens/menu/components/limitsAndVerification/LimitsAndUsageScreen";
import RatesAndFeesScreen from "./src/screens/menu/components/ratesAndFees/RatesAndFeesScreen";
import ProfileScreen from "./src/screens/menu/components/profile/ProfileScreen";
import SecurityScreen from "./src/screens/menu/components/security/SecurityScreen";
import HelpAndSupportScreen from "./src/screens/menu/components/helpAndSupport/HelpAndSupportScreen";
import AboutXenzaScreen from "./src/screens/menu/components/aboutXenza/AboutXenzaScreen";
import ReceiptScreen from "./src/screens/transactionDetail/ReceiptScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    initI18n()
      .then(() => {
        if (mounted) setReady(true);
      })
      .catch((error) => {
        console.error("i18next initialization error:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  // return <HomeScreen />;
  return (
    <SafeAreaProvider>
      <ReceiptScreen />
    </SafeAreaProvider>
  );
}

// function HomeScreen() {
//   const { t, i18n } = useTranslation();

//   const changeLanguage = async (language) => {
//     try {
//       // console.log("Changing language to:", language);

//       await i18n.changeLanguage(language);
//       await AsyncStorage.setItem("user-language", language);

//       console.log("Current language:", i18n.language);
//     } catch (error) {
//       console.error("Language change failed:", error);
//     }
//   };

//   return (
//     <View className="flex-1 items-center justify-center   p-5">
//       <Text className="mb-3 text-2xl font-bold ">{t("welcome")}</Text>
//       <Text className="mb-6 text-lg ">{t("greeting")}</Text>

//       <Pressable
//         className="mb-3 rounded-lg bg-blue-500 px-6 py-3"
//         onPress={() => changeLanguage("en")}
//       >
//         <Text className="font-bold ">English</Text>
//       </Pressable>

//       <Pressable
//         className="mb-3 rounded-lg bg-blue-500 px-6 py-3"
//         onPress={() => changeLanguage("fr")}
//       >
//         <Text className="font-bold ">Français</Text>
//       </Pressable>

//       <Pressable
//         className="rounded-lg bg-blue-500 px-6 py-3"
//         onPress={() => changeLanguage("ha")}
//       >
//         <Text className="font-bold ">Hausa</Text>
//       </Pressable>
//     </View>
//   );
// }
