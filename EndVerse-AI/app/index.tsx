import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        router.replace("/dashboard"); // ✅ route to app/dashboard.tsx
      } else {
        router.replace("./Components/Welcome"); // ✅ route to app/welcome.tsx
      }
    };

    checkLogin();
  }, [router]);

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
