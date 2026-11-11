import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import useAuth from "../hooks/useAuth";

function Settings() {
  const { user } = useAuth();
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(
    user?.preferredLanguage || i18n.language || "en"
  );

  const saveSettings = async () => {
    try {
      await api.patch("/auth/language", {
        preferredLanguage: language
      });

      await i18n.changeLanguage(language);
      localStorage.setItem("preferredLanguage", language);

      alert("Language settings updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to update settings.");
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Settings"
        description="Customize your application preferences." />

      <div className="card settings-card">
        <h2>Language Preferences</h2>
        <p>Select your preferred application language.</p>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="te">Telugu</option>
          <option value="hi">Hindi</option>
          <option value="kn">Kannada</option>
          <option value="ta">Tamil</option>
          <option value="ml">Malayalam</option>
          <option value="bn">Bengali</option>
          <option value="mr">Marathi</option>
          <option value="gu">Gujarati</option>
          <option value="pa">Punjabi</option>
          <option value="ur">Urdu</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
        </select>

        <button onClick={saveSettings}>Save Settings</button>
      </div>
    </div>
  );
}

export default Settings;
