import { useTranslation } from "react-i18next";
import "./LanguageSelector.css";

function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "english", name: "English" },
    { code: "telugu", name: "తెలుగు" },
    { code: "hinid", name: "हिन्दी" },
    { code: "kannada", name: "ಕನ್ನಡ" },
    { code: "tamil", name: "தமிழ்" },
    { code: "malayalam", name: "മലയാളം" },
    { code: "bengali", name: "বাংলা" },
    { code: "marathi", name: "मराठी" },
    { code: "gujarati", name: "ગુજરાતી" },
    { code: "punjabi", name: "ਪੰਜਾਬੀ" },
  ];

  const changeLanguage = (event) => {
    const language = event.target.value;

    i18n.changeLanguage(language);
    localStorage.setItem("preferredLanguage", language);
  };

  return (
    <select
      className="language-selector"
      value={i18n.language?.split("-")[0] || "en"}
      onChange={changeLanguage}
    >
      {languages.map((language) => (
        <option key={language.code} value={language.code}>
          {language.name}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
