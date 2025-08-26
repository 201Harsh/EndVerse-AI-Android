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

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
              <Text className="text-4xl font-bold text-center text-indigo-300">
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
              <Text className="text-4xl opacity-0 font-bold text-center text-indigo-300">
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
                value={formData.name}
                onChangeText={(val) => handleChange("name", val)}
                className="rounded-lg px-4 py-3 text-white border-2 border-gray-600 bg-gray-800 focus:border-indigo-500"
              />
            </View>

            {/* Email */}
            <View className="mt-4">
              <Text className="text-white font-semibold mb-2">Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                value={formData.email}
                onChangeText={(val) => handleChange("email", val)}
                keyboardType="email-address"
                autoCapitalize="none"
                className="rounded-lg px-4 py-3 text-white border-2 border-gray-600 bg-gray-800 focus:border-indigo-500"
              />
            </View>

            {/* Password */}
            <View className="mt-4">
              <Text className="text-white font-semibold mb-2">Password</Text>
              <TextInput
                placeholder="Create a password"
                placeholderTextColor="#9ca3af"
                value={formData.password}
                onChangeText={(val) => handleChange("password", val)}
                secureTextEntry={true}
                className="rounded-lg px-4 py-3 text-white border-2 border-gray-600 bg-gray-800 focus:border-indigo-500"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity className="bg-indigo-600 py-3 rounded-lg items-center mt-6">
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
