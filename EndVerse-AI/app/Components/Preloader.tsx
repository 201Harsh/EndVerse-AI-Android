import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

type PreloaderProps = {
  onComplete: () => void;
};

type ServerStatus = {
  aiEngine: boolean;
  database: boolean;
  api: boolean;
  auth: boolean;
};

type ServerStatusItemProps = {
  name: string;
  icon: React.ReactNode;
  isReady: boolean;
};

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    aiEngine: false,
    database: false,
    api: false,
    auth: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => (old >= 100 ? 100 : old + 1));
    }, 30);

    const checks = {
      aiEngine: setTimeout(() => updateServerStatus("aiEngine"), 1200),
      database: setTimeout(() => updateServerStatus("database"), 1800),
      api: setTimeout(() => updateServerStatus("api"), 2200),
      auth: setTimeout(() => updateServerStatus("auth"), 2800),
    };

    return () => {
      clearInterval(timer);
      Object.values(checks).forEach(clearTimeout);
    };
  }, []);

  const updateServerStatus = (service: keyof ServerStatus) => {
    setServerStatus((prev) => ({ ...prev, [service]: true }));
  };

  const allServicesReady = Object.values(serverStatus).every(Boolean);

  return (
    <View className="flex-1 bg-gray-900 items-center justify-center px-4">
      {/* Main Robot */}
      <View className="w-32 h-32 mb-8 items-center justify-center rounded-full border border-gray-700">
        <FontAwesome name="android" size={70} color="#818cf8" />
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold mb-2 text-indigo-400">
        EndVerse AI
      </Text>

      {/* SubText */}
      <Text className="text-gray-400 mb-6">
        {allServicesReady ? "All systems ready!" : "Initializing systems..."}
      </Text>

      {/* Status List */}
      <View className="w-64 mb-6">
        <ServerStatusItem
          name="AI Engine"
          icon={<Feather name="cpu" size={20} color="#60a5fa" />}
          isReady={serverStatus.aiEngine}
        />
        <ServerStatusItem
          name="Database"
          icon={<Feather name="database" size={20} color="#34d399" />}
          isReady={serverStatus.database}
        />
        <ServerStatusItem
          name="API Service"
          icon={<Feather name="code" size={20} color="#c084fc" />}
          isReady={serverStatus.api}
        />
        <ServerStatusItem
          name="Authentication"
          icon={<Feather name="server" size={20} color="#22d3ee" />}
          isReady={serverStatus.auth}
        />
      </View>

      {/* Progress Bar */}
      <View className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
        <View
          style={{ width: `${progress}%` }}
          className="h-full bg-indigo-500 rounded-full"
        />
      </View>

      <Text className="text-sm text-gray-500 mb-8">{progress}% complete</Text>

      {/* Powered by EndGaming AI */}
      {allServicesReady && (
        <MaskedView
          maskElement={
            <Text className="mt-2 text-center font-bold text-2xl">
              Powered by EndGaming AI
            </Text>
          }
        >
          <LinearGradient
            colors={["#3FD2F0", "#C6F139"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-10 w-full items-center justify-center"
          >
            {/* Invisible text just to maintain size */}
            <Text className="text-2xl font-bold text-center opacity-0">
              Powered by EndGaming AI
            </Text>
          </LinearGradient>
        </MaskedView>
      )}
    </View>
  );
};

const ServerStatusItem: React.FC<ServerStatusItemProps> = ({
  name,
  icon,
  isReady,
}) => {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-row items-center">
        <View className="mr-3">{icon}</View>
        <Text className="text-gray-300">{name}</Text>
      </View>
      {isReady ? (
        <FontAwesome name="check" size={18} color="#4ade80" />
      ) : (
        <FontAwesome name="spinner" size={18} color="#facc15" />
      )}
    </View>
  );
};

export default Preloader;
