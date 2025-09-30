// frontend/src/App.jsx
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = { role: "assistant", content: data.reply };
    setMessages([...messages, newMessage, botMessage]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">ChatGPT Clone</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow p-4 flex flex-col space-y-2 overflow-y-auto h-96">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-4 flex w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="तुझा प्रश्न लिही..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;

