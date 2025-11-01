import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateResponse } from "../services/gemini.js";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholder-and-input.jsx";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const Bot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const placeholders = [
   "I have a headache, what should I do?",
  "What are the symptoms of cold and flu?",
  "How can I boost my immunity?",
  "Is my fever something to worry about?",
  "Give me some daily health tips",
  "What should I eat for better digestion?",
  "How much water should I drink daily?",
  "Why am I feeling tired all the time?",
  "How to relieve stress quickly?",
  "What are common signs of dehydration?"
  ];

  // ✅ USER SENDS MESSAGE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const botResponse = await generateResponse(inputMessage);

      const botMessage = {
        text: botResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Something went wrong. Please try again.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100vh] w-full max-w-[100vw] mx-auto bg-gradient-to-b from-[#e8f8f5] to-[#d6f0ff] shadow-lg ">

      {/* HEADER */}
<div className="flex items-center justify-between px-4 py-4  bg-gradient-to-r from-[#1b4872] to-[#27a5bf] shadow">

  {/* LEFT: ICON + TITLE */}
  <div className="flex items-center gap-2">
    <IoChatboxEllipsesOutline className="text-white text-xl" />
    <h2 className="text-lg font-semibold text-white tracking-wide">
      Chat Assistant
    </h2>
  </div>

  {/* RIGHT: BUTTON */}
  <button
    onClick={() => navigate("/")}
    className="text-sm font-medium text-white hover:text-gray-200"
  >
    ← Go Back
  </button>
</div>


      {/* MESSAGES */}
      <div className="flex-1 p-4 px-75 overflow-y-auto space-y-4">
        {messages.map((m, index) => (
          <div key={index} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] p-3 rounded-xl shadow-md ${
                m.sender === "user"
                  ? "bg-gradient-to-r from-[#27a5bf] to-[#1b8772] text-white"
                  : "bg-white text-gray-700 border border-teal-100"
              }`}
            >
              {m.text}
              <div className="text-xs opacity-70 mt-1 text-right">
                {new Date(m.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {/* TYPING */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-teal-100 p-3 rounded-xl shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Aceternity Input Replacing Old Input */}
      <div className="p-4 bg-gray-800 border-t  shadow-inner">
  <PlaceholdersAndVanishInput
    placeholders={placeholders}
    value={inputMessage}
    onChange={(e) => setInputMessage(e.target.value)}
    onSubmit={handleSubmit}
    className="w-full"
  />
</div>

    </div>
  );
};

export default Bot;
