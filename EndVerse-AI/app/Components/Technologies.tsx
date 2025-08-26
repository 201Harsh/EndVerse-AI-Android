import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView } from "react-native";

export default function Technologies() {
  const techs = [
    {
      name: "EndGaming AI",
      description:
        "Proprietary neural architecture for contextual understanding",
      icon: "🧠",
      color: "from-purple-500 to-indigo-600",
    },
    {
      name: "Transformers",
      description: "State-of-the-art language processing models",
      icon: "⚡",
      color: "from-green-800 to-emerald-400",
    },
    {
      name: "Diffusion Models",
      description: "Advanced image generation technology",
      icon: "🎨",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Neural Search",
      description: "Semantic understanding for precise responses",
      icon: "🔍",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Reinforcement Learning",
      description: "Continuous improvement from user interactions",
      icon: "🔄",
      color: "from-green-400 to-emerald-600",
    },
  ];

  return (
    <>
      <View className="mt-4">
        <MaskedView
          maskElement={
            <Text className="mt-6 text-center font-bold text-3xl">
              Technologies Powering EndVerse AI
            </Text>
          }
        >
          <LinearGradient
            className="h-32 w-full"
            colors={["#22c55e", "#0ea5e9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text className="text-3xl font-bold text-center opacity-0">
              Technologies Powering EndVerse AI
            </Text>
          </LinearGradient>
        </MaskedView>
        <Text className="text-gray-400 text-center text-base leading-6 max-w-xl self-center">
          EndVerse AI combines the most advanced AI technologies to deliver
          unparalleled performance
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-gray-900 px-6"
      >
        {/* Section Heading */}

        {/* Tech Cards (Vertical Scroll) */}
        <View className="flex-col space-y-6">
          {techs.map((tech, i) => (
            <View
              key={i}
              className="bg-gray-900 rounded-lg shadow-sm px-4 py-2 items-center"
            >
              <View
                className={`w-16 h-16 rounded-xl items-center justify-center bg-gradient-to-br ${tech.color}`}
              >
                <Text className="text-3xl">{tech.icon}</Text>
              </View>
              <Text className="text-white font-bold text-center text-lg mb-2">
                {tech.name}
              </Text>
              <Text className="text-gray-400 text-center text-sm leading-5">
                {tech.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
