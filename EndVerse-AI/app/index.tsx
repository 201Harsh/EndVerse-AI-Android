import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
