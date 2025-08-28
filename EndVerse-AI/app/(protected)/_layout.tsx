import { Stack } from "expo-router";
import DashboardProtector from "../Hooks/DashboardProtector";
import { View } from "react-native";

export default function ProtectedLayout() {
  return (
    <>
      <View className="flex-1 h-full w-full bg-gray-900">
        <DashboardProtector>
          <Stack screenOptions={{ headerShown: false }} />
        </DashboardProtector>
      </View>
    </>
  );
}
