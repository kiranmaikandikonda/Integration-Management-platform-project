import { useState } from "react";
import { Upload } from "lucide-react";
import api from "../services/api";

function ImageTranslator() {
  const [image, setImage] = useState(null);
  const [language, setLanguage] = useState("te");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!image) {
      alert("Please select a menu image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("targetLanguage", language);

    try {
      setLoading(true);

      const response = await api.post(
        "/translation/image",
        formData
      );

      setResult(
        response.data.translatedText ||
        response.data.data?.translatedText ||
        response.data.message ||
        "Translation completed."
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Image translation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translator-card">
      <h2>Food Menu Image Translator</h2>

      <label className="upload-area">
        <Upload size={30} />
        <p>Choose a menu image</p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setResult("");
          }}
        />
      </label>

      {image && <p>Selected: {image.name}</p>}

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="te">Telugu</option>
        <option value="kn">Kannada</option>
        <option value="hi">Hindi</option>
        <option value="en">English</option>
      </select>

      <button onClick={handleTranslate} disabled={loading}>
        {loading ? "Translating..." : "Translate Menu"}
      </button>

      {result && (
        <div className="translation-result">
          <h3>Translated Menu</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default ImageTranslator;
