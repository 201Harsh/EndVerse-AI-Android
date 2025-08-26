import { Stack } from "expo-router";
import "./global.css";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: "light",
        }}
      />
    </SafeAreaView>
  );
}
