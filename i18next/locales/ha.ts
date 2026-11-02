const ha = {
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
    welcome: "Barka da zuwa",
    greeting: "Sannu! Barka da zuwa Xenza.",
  },
};

export default ha;
export type TranslationKeys = keyof typeof ha.translation;
