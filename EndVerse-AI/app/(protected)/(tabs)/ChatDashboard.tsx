import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/app/Components/Header";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
};

const ChatDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [UserName, setUserName] = useState<any>("");
  const flatListRef = useRef<FlatList<Message>>(null);

  const getTimestamp = () => {
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
                  How can I help you today?
                </Text>
              </View>
            </View>
          }
        />

        {/* Input Area */}
        <View className="flex-row items-center p-4 bg-gray-900">
          <TextInput
            className="flex-1 w-full min-h-[50px] max-h-[100px] bg-[#364152] text-white px-5 py-4 rounded-full text-[15px] overflow-hidden"
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
