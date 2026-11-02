const en = {
  translation: {
    common: {
      ok: "OK",
      cancel: "Cancel",
    },
    screens: {
      home: { title: "" },
      profile: "Profile",
      settings: "Settings",
    },
    welcome: "Welcome",
    greeting: "Hello! Welcome to Xenza.",
  },
};

export default en;
export type TranslationKeys = keyof typeof en.translation;
