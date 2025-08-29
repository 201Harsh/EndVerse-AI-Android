// app/(tabs)/ImageDashboard.tsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ImageDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [userName, setuserName] = useState<any>("");

  useEffect(() => {
    const getuserName = async () => {
      const Name = await AsyncStorage.getItem("name");
      setuserName(Name);
    };
    getuserName();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-6">
      {showWelcome ? (
        // Welcome screen
        <View className="items-center">
          <View className="mb-6">
            <View className="w-20 h-20 rounded-full bg-purple-600 items-center justify-center">
              <Ionicons name="image" size={28} color="#fff" />
            </View>
          </View>

          <Text className="text-4xl font-bold mb-2 text-purple-500">
            Welcome, {userName}!
          </Text>

          <Text className="text-xl text-gray-500">
            Image Dashboard is loading...
          </Text>
        </View>
      ) : (
        // Coming soon screen
        <View className="items-center max-w-md">
          <View className="mb-8">
            <View className="w-24 h-24 rounded-full bg-blue-500 items-center justify-center">
              <Ionicons name="image" size={36} color="#fff" />
            </View>
          </View>

          <Text className="text-4xl font-bold mb-4 text-purple-500">
            Coming Soon
          </Text>

          <Text className="text-xl text-gray-500 mb-8 text-center">
            Sorry! Our image dashboard is under construction. We're working hard to
            bring you an amazing experience!
          </Text>

          <View className="px-6 py-3 rounded-full bg-purple-600 shadow-lg">
            <Text className="text-white font-semibold">Stay Tuned!</Text>
          </View>

          <View className="mt-8">
            <Text className="text-gray-400 text-sm">
              In the meantime, enjoy our other features! Like chat, code, and video.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ImageDashboard;
