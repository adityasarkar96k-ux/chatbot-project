import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:8000/chat", { message });
    setChat([...chat, { role: "user", content: message }, { role: "bot", content: res.data.reply }]);
    setMessage("");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">College Chatbot 🤖</h1>
      <div className="border p-3 h-80 overflow-y-scroll mb-4">
        {chat.map((msg, idx) => (
          <p key={idx} className={msg.role === "user" ? "text-blue-600" : "text-green-600"}>
            <b>{msg.role}:</b> {msg.content}
          </p>
        ))}
      </div>
      <input
        className="border p-2 w-80"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="bg-blue-500 text-white px-4 py-2 ml-2" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default App;
