const fr = {
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
    welcome: "Bienvenue",
    greeting: "Bonjour! Bienvenue sur Xenza.",
  },
};

export default fr;
export type TranslationKeys = keyof typeof fr.translation;
