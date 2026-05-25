"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getCurrentUser } from "app/actions";

let socket: Socket | null = null;

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const [user, setUser] = useState();

  useEffect(() => {
    const init = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      if (!currentUser || !("sessionToken" in currentUser)) return;

      socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000", {
        path: "/socket_io",
        auth: { sessionToken: currentUser.sessionToken },
      });

      socket.on("connect", () => console.log("Connected! Socket ID:", socket?.id));
      socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    };

    init();

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, []);

  const sendMessage = () => {
    if (!socket || !input.trim()) return;
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <pre>{JSON.stringify(user, null, 3)}</pre>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
          borderRadius: 8,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{ marginBottom: 6, padding: 6, backgroundColor: "#f0f0f0", borderRadius: 6 }}
          >
            <strong>
              {msg.sender.firstName} {msg.sender.lastName}
            </strong>
            : {msg.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            backgroundColor: "#4caf50",
            color: "#fff",
          }}
        >
          ентер
        </button>
      </div>
    </div>
  );
}
