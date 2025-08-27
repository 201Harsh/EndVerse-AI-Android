import { Stack } from "expo-router";
import "./global.css";
import Toast from "react-native-toast-message";
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
      <Toast />
    </SafeAreaView>
  );
}
