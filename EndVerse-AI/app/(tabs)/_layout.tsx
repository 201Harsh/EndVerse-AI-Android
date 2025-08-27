import { Image, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function IconsImg({ focused, icon, title }: any) {
  if (focused) {
    return (
      <>
        <View className="flex justify-center items-center mt-3 rounded-full bg-blue-600 px-3 py-2 mb-2">
          <Image source={icon} tintColor="#fff" className="size-6" />
        </View>
      </>
    );
  }

  return (
    <View className="justify-center items-center mt-5 mb-4 rounded-full">
      <Image source={icon} tintColor="#fff" className="size-6" />
    </View>
  );
}

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
            height: 52,
            overflow: "hidden",
            backgroundColor: "#111827",
            paddingTop: 5,
          },
        }}
      >
        <Tabs.Screen
          name="ChatDashboard"
          options={{
            headerShown: false,
            title: "Chat",
            tabBarIcon: ({ focused }) => (
              <IconsImg
                focused={focused}
                icon={require("../../assets/icons/chat.png")}
                title="Chat"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ImageDashboard"
          options={{
            headerShown: false,
            title: "Images",
            tabBarIcon: ({ focused }) => (
              <IconsImg
                focused={focused}
                icon={require("../../assets/icons/image.png")}
                title="Images"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="VideoDashboard"
          options={{
            headerShown: false,
            title: "Videos",
            tabBarIcon: ({ focused }) => (
              <IconsImg
                focused={focused}
                icon={require("../../assets/icons/video.png")}
                title="Videos"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="CodeDashboard"
          options={{
            headerShown: false,
            title: "Code",
            tabBarIcon: ({ focused }) => (
              <IconsImg
                focused={focused}
                icon={require("../../assets/icons/code.webp")}
                title="Code"
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default Layout;
