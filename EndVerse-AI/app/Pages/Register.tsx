import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    console.log({ name, email, password });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <Header opacity={false} />
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 40,
            flexGrow: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
          className="px-6"
        >
          {/* Title */}
          <MaskedView
            maskElement={
              <Text className="text-4xl font-bold text-center">
                Register To EndVerse AI
              </Text>
            }
          >
            <LinearGradient
              className="h-12 w-full"
              colors={["#60a5fa", "#a78bfa"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-4xl opacity-0 font-bold text-center">
                Register To EndVerse AI
              </Text>
            </LinearGradient>
          </MaskedView>

          <Text className="text-gray-400 text-center mb-6">
            Join EndVerse AI and unlock the power of AI conversations
          </Text>

          {/* Form */}
          <View className="space-y-6">
            {/* Name */}
            <View className="mt-4">
              <Text className="text-white font-semibold mb-2">Full Name</Text>
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
                className="rounded-lg px-4 py-3 text-white border-2 border-gray-600 bg-gray-800 focus:border-indigo-500"
              />
            </View>

            {/* Email */}
            <View className="mt-4">
              <Text className="text-white font-semibold mb-2">Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="rounded-lg px-4 py-3 text-white border-2 border-gray-600 bg-gray-800 focus:border-indigo-500"
              />
            </View>

            {/* Password */}
            <View className="mt-4 relative">
              <Text className="text-white font-semibold mb-2">Password</Text>
              <TextInput
                placeholder="Create a password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="rounded-lg px-4 py-3 text-white border-2 border-gray-600 bg-gray-800 focus:border-indigo-500"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="absolute right-4 top-[66%]"
                style={{ transform: [{ translateY: -8 }] }}
              >
                <Entypo
                  name={showPassword ? "eye-with-line" : "eye"}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-indigo-600 py-3 rounded-lg items-center mt-6"
            >
              <Text className="text-white font-semibold text-lg">
                Create Account
              </Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text className="text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <Link href={"/Pages/Login"} style={{ color: "#308df7" }}>
                Login
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
