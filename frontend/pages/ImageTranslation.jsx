import PageHeader from "../components/PageHeader";
import ImageTranslator from "../components/ImageTranslator";
import "./ImageTranslator.css";

function ImageTranslation() {
  return (
    <div className="page-container">
      <PageHeader
        title="Image Translator"
        description="Upload a food menu and translate it into your preferred language."
      />

      <ImageTranslator />
    </div>
  );
}

export default ImageTranslation;
