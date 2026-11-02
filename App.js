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

  return <HomeScreen />;
}

function HomeScreen() {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (language) => {
    try {
      // console.log("Changing language to:", language);

      await i18n.changeLanguage(language);
      await AsyncStorage.setItem("user-language", language);

      console.log("Current language:", i18n.language);
    } catch (error) {
      console.error("Language change failed:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center  p-5">
      <Text className="mb-3 text-2xl font-bold ">{t("welcome")}</Text>
      <Text className="mb-6 text-lg ">{t("greeting")}</Text>

      <Pressable
        className="mb-3 rounded-lg bg-blue-500 px-6 py-3"
        onPress={() => changeLanguage("en")}
      >
        <Text className="font-bold ">English</Text>
      </Pressable>

      <Pressable
        className="mb-3 rounded-lg bg-blue-500 px-6 py-3"
        onPress={() => changeLanguage("fr")}
      >
        <Text className="font-bold ">Français</Text>
      </Pressable>

      <Pressable
        className="rounded-lg bg-blue-500 px-6 py-3"
        onPress={() => changeLanguage("ha")}
      >
        <Text className="font-bold ">Hausa</Text>
      </Pressable>
    </View>
  );
}
