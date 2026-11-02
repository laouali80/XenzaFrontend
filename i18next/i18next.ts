// import React from "react";
// import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import { I18nManager } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import en from "./locales/en";
import fr from "./locales/fr";
import ha from "./locales/ha";

const LANGUAGE_KEY = "user-language";

const resources = {
  en,
  fr,
  ha,
};

type Language = keyof typeof resources;

// export const lng = getLocales()[0].languageCode ?? "en";

const isSupportedLanguage = (language: string): language is Language => {
  return Object.prototype.hasOwnProperty.call(resources, language);
};

// Load saved language before initializing i18next
export const initI18n = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

    //   the device's language code (e.g., "en", "fr", "ha")
    const deviceLanguage = getLocales()[0]?.languageCode || "en";

    //   the initial language to use
    const initialLanguage: Language = isSupportedLanguage(savedLanguage ?? "")
      ? (savedLanguage as Language)
      : isSupportedLanguage(deviceLanguage)
        ? deviceLanguage
        : "en";

    if (!i18n.isInitialized) {
      await i18n.use(initReactI18next).init({
        resources,
        lng: initialLanguage,
        fallbackLng: "en",
        supportedLngs: ["en", "fr", "ha"],
        interpolation: {
          escapeValue: false,
        },
      });
    } else {
      await i18n.changeLanguage(initialLanguage);
    }

    console.log("i18next initialized:", i18n.language);

    return initialLanguage;
  } catch (error) {
    console.error("i18n initialization failed:", error);
    throw error;
    // await i18n
    //   .use(initReactI18next) // passes i18n down to react-i18next
    //   .init({
    //     // the translations
    //     // (tip move them in a JSON file and import them,
    //     // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    //     resources: {
    //       en,
    //       fr,
    //       ha,
    //     },
    //     lng: lng, // if you're using a language detector, do not define the lng option
    //     fallbackLng: "en",
    //     supportedLngs: ["en", "fr", "ha"],

    //     interpolation: {
    //       escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    //     },
    //   });

    // return "en";
  }
};

//   Check if the current language is right-to-left like Arabic
// export const isRTL = getLocales()[0].textDirection === "rtl";
// I18nManager.allowRTL(isRTL);
// I18nManager;

export default i18n;
