import { useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const question = message;
    setMessages((old) => [...old, { role: "user", text: question }]);
    setMessage("");

    try {
      setLoading(true);

      const res = await api.post("/ai/chat", { message: question });

      const answer =
        res.data.reply || res.data.response || res.data.message;

      setMessages((old) => [
        ...old,
        { role: "assistant", text: answer || "No response received." }
      ]);
    } catch {
      setMessages((old) => [
        ...old,
        { role: "assistant", text: "Sorry, I could not answer that question." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="AI Travel Assistant"
        description="Ask questions and get travel assistance." />

      <div className="chat-box">
        {messages.map((item, index) => (
          <div className={`chat-message ${item.role}`} key={index}>
            <strong>{item.role === "user" ? "You" : "AI Assistant"}</strong>
            <p>{item.text}</p>
          </div>
        ))}

        {loading && <p>AI is thinking...</p>}
      </div>

      <form onSubmit={sendMessage} className="search-form">
        <input value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something about travel..." />
        <button disabled={loading}>Send</button>
      </form>
    </div>
  );
}

export default AIChat;
