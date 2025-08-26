import { Stack } from "expo-router";
import "./global.css";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-gray-900">
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: "light",
        }}
      />
    </View>
  );
}
