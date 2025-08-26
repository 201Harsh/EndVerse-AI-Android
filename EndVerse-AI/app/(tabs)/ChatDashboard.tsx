import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import React, { useState, useRef } from "react";
import Header from "../Components/Header";
import { Ionicons } from "@expo/vector-icons";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
};

const ChatDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const flatListRef = useRef<FlatList<Message>>(null);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  const handleSend = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");

      // Auto bot reply after short delay
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: "Hello! I'm EndVerse AI 🤖",
          sender: "bot",
          timestamp: getTimestamp(),
        };
        setMessages((prev) => [...prev, botMessage]);

        // Scroll after bot reply
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 800);

      // Scroll after sending
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";
    return (
      <View
        className={`mb-2 max-w-[75%] px-4 py-3 rounded-xl ${
          isUser
            ? "self-end bg-indigo-600 rounded-br-none"
            : "self-start bg-gray-700 rounded-bl-none"
        }`}
      >
        <Text className="text-white">{item.text}</Text>
        <Text className="text-gray-300 text-xs mt-1 self-end">
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-900">
      <KeyboardAvoidingView
        className="bg-gray-900"
        style={{ flex: 1 }}
        keyboardVerticalOffset={55}
        behavior="padding"
      >
        {/* Header */}
        <Header opacity={false} Showbtn={true} />

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          renderItem={renderMessage}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center">
              <View className="bg-gray-700 p-4 rounded-lg">
                <Text className="text-gray-100 font-semibold text-lg">
                  No messages yet! Start a conversation
                </Text>
              </View>
            </View>
          }
        />

        {/* Input Area */}
        <View className="flex-row items-center p-4 bg-gray-900">
          <TextInput
            className="flex-1 min-h-[40px] max-h-[100px] bg-[#364152] text-white px-3 py-4 rounded-full text-md"
            placeholder="Message EndVerse AI..."
            placeholderTextColor="#999"
            value={inputMessage}
            onChangeText={setInputMessage}
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            className="ml-2 bg-indigo-600 p-3 rounded-full"
          >
            <Ionicons name="send" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatDashboard;
