import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const dashboard = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // mark as mounted
  }, []);

  useEffect(() => {
    if (mounted) {
      router.replace("/(protected)/(tabs)/ChatDashboard");
    }
  }, [mounted]);

  return null;
};

export default dashboard;
