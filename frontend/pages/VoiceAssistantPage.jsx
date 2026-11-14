import { useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import VoiceAssistant from "../components/VoiceAssistant";
import "./VoiceAssistantPage.css";

function VoiceAssistantPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (text) => {
    setQuestion(text);
    setAnswer("");
    setLoading(true);

    try {
      const res = await api.post("/voice", { message: text });
      const result =
        res.data.reply || res.data.response || res.data.message;

      setAnswer(result || "No response received.");
    } catch {
      setAnswer("Unable to connect to the voice assistant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Voice Assistant"
        description="Speak your travel questions." />

      <div className="card voice-card">
        <h2>How can I help you?</h2>
        <VoiceAssistant
          language="en-IN"
          onResult={askAI}
        />

        {question && <p><strong>You said:</strong> {question}</p>}
        {loading && <p>Thinking...</p>}
        {answer && (
          <div className="translation-result">
            <h3>Assistant Response</h3>
            <p>{answer}</p>
            <button onClick={() => {
              const speech = new SpeechSynthesisUtterance(answer);
              speech.lang = "en-IN";
              window.speechSynthesis.speak(speech);
            }}>
              Read Answer Aloud
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoiceAssistantPage;
