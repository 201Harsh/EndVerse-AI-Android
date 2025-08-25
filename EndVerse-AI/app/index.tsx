import { Image, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Header from "./Components/Header";
import Technologies from "./Components/Technologies";
import { useRouter } from "expo-router";

export default function Index() {
  const users = [1, 2, 3];
  const Router = useRouter()

  const handleRedirect = ()=>{
    Router.push("/Pages/Register")
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray-900">
        <Header opacity={true} />
        <View className="flex-1 items-center px-6 mt-10">
          {/* App Tag */}
          <View className="px-5 py-2 rounded-full bg-indigo-900/40 flex-row items-center gap-2">
            <FontAwesome6 name="robot" size={18} color="#7D86FF" />
            <Text className="text-indigo-300 font-medium">
              EndVerse AI v3.4
            </Text>
          </View>
          {/* Gradient Heading */}
          <MaskedView
            maskElement={
              <Text className="mt-10 text-center font-bold text-5xl">
                The Future of AI Conversations
              </Text>
            }
          >
            <LinearGradient
              className="h-32 w-full"
              colors={["#F53384", "#4CF0A1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-5xl font-bold text-center opacity-0">
                The Future of AI Conversations
              </Text>
            </LinearGradient>
          </MaskedView>
          {/* Tagline */}
          <Text className="mt-4 text-gray-400 text-center text-lg leading-6">
            Your AI companion for meaningful conversations, breathtaking images,
            immersive videos, and powerful code generation — all in one place.
            Experience the future of AI Today.
          </Text>
          {/* CTA Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-10 w-56 rounded-xl"
            style={{ borderRadius: 8 }}
          >
            <LinearGradient
              colors={["#6366f1", "#ec4899"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 8 }}
              className="py-3 rounded-lg flex-row items-center justify-center space-x-2 shadow-lg"
            >
              <Text onPress={handleRedirect} className="text-white text-xl font-semibold">
                Get Started
              </Text>
              <AntDesign name="arrowright" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
          {/* User Avatars */}
          <View className="flex-row flex items-center justify-center mt-5 w-full">
            {users.map((i, index) => (
              <Image
                key={i}
                source={{
                  uri: `https://randomuser.me/api/portraits/${
                    i % 2 === 0 ? "men" : "women"
                  }/${i + 11}.jpg`,
                }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: "#1f2937",
                  marginLeft: index === 0 ? 0 : -8,
                }}
              />
            ))}
            {/* Text */}
            <Text className="ml-1 text-sm text-white">
              Join <Text className="text-white font-semibold">99+</Text> Users
            </Text>
          </View>
          <Technologies />
        </View>
      </SafeAreaView>
    </>
  );
}
