import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <View className="flex-1 bg-gray-900">
      <Tabs
        screenOptions={{
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#111827",
          },
          tabBarStyle: {
            height: 48,
            overflow: "hidden",
            backgroundColor: "#111827",
          },
        }}
      >
        <Tabs.Screen
          name="ChatDashboard"
          options={{
            headerShown: false,
            title: "Chat",
          }}
        />
        <Tabs.Screen
          name="ImageDashboard"
          options={{
            headerShown: false,
            title: "Images",
          }}
        />
        <Tabs.Screen
          name="VideoDashboard"
          options={{
            headerShown: false,
            title: "Videos",
          }}
        />
        <Tabs.Screen
          name="CodeDashboard"
          options={{
            headerShown: false,
            title: "Code",
          }}
        />
      </Tabs>
    </View>
  );
};

export default Layout;
