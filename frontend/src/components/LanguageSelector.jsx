import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English" },
    { code: "te", name: "తెలుగు" },
    { code: "hi", name: "हिन्दी" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ta", name: "தமிழ்" },
    { code: "ml", name: "മലയാളം" },
    { code: "bn", name: "বাংলা" },
    { code: "mr", name: "मराठी" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
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
