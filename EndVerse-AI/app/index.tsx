import { Image, Text, TouchableOpacity, View } from "react-native";
import Welcome from "./Components/Welcome";
import ChatDashboard from "./(tabs)/ChatDashboard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true); // mark as mounted
  // }, []);

  // useEffect(() => {
  //   if (mounted) {
  //     router.replace("/(tabs)/ChatDashboard");
  //   }
  // }, [mounted]);

  // return null;
  return (
    <>
      <View className="flex-1 bg-gray-900">
        <Welcome />
      </View>
    </>
  );
}
