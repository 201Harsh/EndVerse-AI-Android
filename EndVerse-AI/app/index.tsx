import {View } from "react-native";
import Welcome from "./Components/Welcome";

export default function Index() {

  return (
    <>
      <View className="flex-1 bg-gray-900">
        <Welcome />
      </View>
    </>
  );
}
