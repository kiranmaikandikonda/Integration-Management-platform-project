class SpeechService {
  constructor() {
    this.recognition = null;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  // Convert voice into text
  startListening(language = "en-IN") {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error("Speech recognition is not supported."));
        return;
      }

      this.recognition.lang = language;

      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        resolve(text);
      };

      this.recognition.onerror = (event) => {
        reject(new Error(event.error));
      };

      this.recognition.start();
    });
  }

  // Convert text into voice
  speak(text, language = "en-IN") {
    if (!("speechSynthesis" in window)) {
      return false;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

    return true;
  }

  // Stop speaking
  stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
}

const speechService = new SpeechService();

export default speechService;
