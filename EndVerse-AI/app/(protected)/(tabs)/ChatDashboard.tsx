import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/app/Components/Header";
import AxiosInstance from "@/app/Config/Axios";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
};

const ChatDashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [UserName, setUserName] = useState<string | null>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  const getTimestamp = (): string => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const getuserName = async () => {
      const Name = await AsyncStorage.getItem("name");
      setUserName(Name);
    };
    getuserName();
  }, []);

  // --- Filter AI response before showing ---
  const filterAIResponse = (text: string): string => {
    if (!text) return "";

    let cleanedText = text;

    // Remove signature like: ***EndVerse AI vX.X (Powered by EndGaming AI)***
    const signatureRegex =
      /\*{0,3}EndVerse AI v[\d.]+ ?\(Powered by EndGaming AI\)\*{0,3}/gi;
    cleanedText = cleanedText.replace(signatureRegex, "");

    // Remove emojis (extended unicode ranges)
    cleanedText = cleanedText.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2600-\u26FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g,
      ""
    );

    // Trim extra spaces
    return cleanedText.trim();
  };

  const handleSend = async () => {
    const token = await AsyncStorage.getItem("token");
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
      setIsTyping(true);

      try {
        const res = await AxiosInstance.post(
          "/ai/chat",
          { prompt: inputMessage },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const botMessage: Message = {
          id: Date.now().toString(),
          text:
            filterAIResponse(res.data?.answer) || "🤖 I couldn't process that.",
          sender: "bot",
          timestamp: getTimestamp(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching AI reply:", error);

        const errorMessage: Message = {
          id: Date.now().toString(),
          text: "⚠️ Sorry, I couldn’t connect to the AI.",
          sender: "bot",
          timestamp: getTimestamp(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
        // Auto scroll to bottom
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
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

  // Typing Indicator (3 pulsing dots)
  const TypingIndicator: React.FC = () => (
    <View className="flex-row space-x-2 gap-1 bg-gray-700 px-4 py-3 rounded-xl self-start rounded-bl-none">
      <View className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></View>
      <View className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></View>
      <View className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></View>
    </View>
  );

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
          showsVerticalScrollIndicator={false}
          data={
            isTyping
              ? [
                  ...messages,
                  { id: "typing", text: "", sender: "bot", timestamp: "" },
                ]
              : messages
          }
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          renderItem={({ item }) =>
            item.id === "typing" ? <TypingIndicator /> : renderMessage({ item })
          }
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center">
              <View className="p-2">
                <MaskedView
                  maskElement={
                    <Text className="text-5xl text-center font-bold mb-1 text-gray-200">
                      Hello{" "}
                      <Text className="leading-tight font-bold">
                        {UserName}!
                      </Text>
                    </Text>
                  }
                >
                  <LinearGradient
                    className="h-13 w-full"
                    colors={["#D61DEE", "#84E3F1"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text className="text-5xl opacity-0 font-bold mb-1 text-gray-200">
                      Hello{" "}
                      <Text className="leading-tight font-bold">
                        {UserName}!
                      </Text>
                    </Text>
                  </LinearGradient>
                </MaskedView>
                <Text className="text-xl mb-8 text-gray-400">
                  How can{" "}
                  <Text className="font-bold text-emerald-400">
                    EndVerse AI
                  </Text>{" "}
                  Assist you today?
                </Text>
              </View>
            </View>
          }
        />

        {/* Input Area */}
        <View className="flex-row items-center p-4 bg-gray-900">
          <TextInput
            className="flex-1 w-full min-h-[50px] max-h-[100px] bg-[#364152] text-white px-5 py-4 rounded-full text-[15px] overflow-hidden"
            placeholder={
              isTyping ? "EndVerse is typing..." : "Message EndVerse AI..."
            }
            placeholderTextColor="#999"
            value={inputMessage}
            onChangeText={setInputMessage}
            editable={!isTyping}
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={isTyping}
            className={`ml-2 p-3 rounded-full ${
              isTyping ? "bg-gray-500" : "bg-indigo-600"
            }`}
          >
            {isTyping ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="send" size={22} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatDashboard;
