// src/components/Chat.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../src/socket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatId, setChatId] = useState(null);
const orderId =""
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .post(
        `/chat/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setChatId(response.data.chat._id);
        joinRoom(response.data.chat._id);
      })
      .catch((error) => {
        console.error("Error fetching or creating chat:", error);
      });
  }, [orderId, token]);

  const joinRoom = (room) => {
    socket.auth = { token };
    socket.connect();

    socket.emit("joinRoom", { userId, room });

    socket.on("connected", () => {
      setSocketConnected(true);
    });

    socket.on("message", handleMessage);

    return () => {
      socket.off("connected");
      socket.off("message", handleMessage);
    };
  };

  const handleMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (message.trim() && chatId) {
      socket.emit("chatMessage", {
        sender: userId,
        chat: chatId,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <h3>{socketConnected ? "Connected" : "Disconnected"}</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
