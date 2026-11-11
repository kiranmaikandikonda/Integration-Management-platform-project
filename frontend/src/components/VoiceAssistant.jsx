import { useState } from "react";
import { Mic, Square } from "lucide-react";

function VoiceAssistant({ onResult, language = "en-IN" }) {
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onResult?.(text);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  return (
    <div className="voice-assistant">
      <button onClick={startListening}>
        {listening ? <Square /> : <Mic />}
        {listening ? "Listening..." : "Start Speaking"}
      </button>
    </div>
  );
}

export default VoiceAssistant;
