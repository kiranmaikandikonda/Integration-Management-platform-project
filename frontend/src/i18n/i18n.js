import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./locales/en.json";
import telugu from "./locales/te.json";
import hindi from "./locales/hi.json";
import kannada from "./locales/kn.json";
import tamil from "./locales/ta.json";
import malayalam from "./locales/ml.json";
import bengali from "./locales/bn.json";
import marathi from "./locales/mr.json";
import gujarati from "./locales/gu.json";
import punjabi from "./locales/pa.json";

const savedLanguage =
  localStorage.getItem("preferredLanguage") || "english";

i18n.use(initReactI18next).init({
  resources: {
    english: { translation: english },
    telugu: { translation: telugu },
    hindi: { translation: hindi },
    kannada: { translation: kannada },
    tamil: { translation: tamil },
    malayalaml: { translation: malayalam },
    bengali: { translation: bengali },
    marathi: { translation: marathi },
    gujarati: { translation: gujarati },
    punjabi: { translation: punjabi }
  },

  lng: savedLanguage,
  fallbackLng: "english",

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
