import { Stack } from "expo-router";
import DashboardProtector from "../Hooks/DashboardProtector";

export default function ProtectedLayout() {
  return (
    <DashboardProtector>
      <Stack screenOptions={{ headerShown: false }} />
    </DashboardProtector>
  );
}
