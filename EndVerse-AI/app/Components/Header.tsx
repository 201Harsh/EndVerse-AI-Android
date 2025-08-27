import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import AxiosInstance from "../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header({
  opacity,
  Showbtn,
}: {
  opacity: boolean;
  Showbtn: boolean;
}) {
  const Router = useRouter();

  const handleRedirect = () => {
    Router.push("/Pages/Register");
  };

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await AxiosInstance.post("/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        await AsyncStorage.clear();
        Router.push("./");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-800">
      {/* Left: Logo + Title */}
      <View className="flex flex-row items-center">
        <FontAwesome6 name="robot" size={28} color="#6366f1" />
        <Text className="ml-3 text-2xl font-extrabold text-white">
          EndVerse AI
        </Text>
      </View>

      {/* Right: Actions */}
      <View className="flex flex-row items-center">
        <TouchableOpacity
          onPress={handleRedirect}
          className={`px-4 py-2 rounded-lg bg-indigo-600 ${opacity ? "opacity-100" : "opacity-0"}`}
        >
          <Text className="text-white text-base font-medium">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          className={`px-4 py-2 rounded-lg bg-red-500 ${Showbtn ? "block" : "hidden"}`}
        >
          <Text className="text-white text-base font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
