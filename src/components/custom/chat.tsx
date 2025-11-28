"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/lib/types";

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      senderId: "system",
      senderName: "Sistema",
      message: "Bem-vindo ao chat interno do Uppi! Aqui você pode conversar com sua equipe.",
      timestamp: new Date(),
      read: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = "user-1"; // Simulando usuário atual

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        senderId: currentUserId,
        senderName: "Você",
        message: newMessage,
        timestamp: new Date(),
        read: false,
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simular resposta automática após 2 segundos
      setTimeout(() => {
        const autoReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: "employee-1",
          senderName: "Funcionário",
          message: "Mensagem recebida! Estou verificando isso para você.",
          timestamp: new Date(),
          read: false,
        };
        setMessages((prev) => [...prev, autoReply]);
      }, 2000);
    }
  };

  return (
    <Card className="border-blue-200 dark:border-blue-800/30 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <MessageSquare className="w-5 h-5" />
          Chat Interno
        </CardTitle>
        <CardDescription>Converse com sua equipe em tempo real</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId;
            const isSystem = message.senderId === "system";

            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} ${isSystem ? "justify-center" : ""}`}
              >
                <div
                  className={`max-w-[70%] ${
                    isSystem
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-center text-sm py-2 px-4"
                      : isCurrentUser
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  } rounded-2xl p-3 shadow-sm`}
                >
                  {!isSystem && !isCurrentUser && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-blue-500 rounded-full p-1">
                        <User className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-semibold">{message.senderName}</span>
                    </div>
                  )}
                  <p className={`${isSystem ? "text-xs" : "text-sm"}`}>{message.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isCurrentUser ? "text-white/70" : isSystem ? "text-gray-500" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
