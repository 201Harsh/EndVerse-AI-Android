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

export default function Login() {
  const [formData, setFormData] = useState({
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
              <Text className="text-4xl font-bold text-center text-indigo-300 mb-2">
                Welcome Back to EndVerse AI
              </Text>
            }
          >
            <LinearGradient
              className="h-12 w-full"
              colors={["#60a5fa", "#a78bfa"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-4xl opacity-0 font-bold text-center text-indigo-300 mb-2">
                Welcome Back to EndVerse AI
              </Text>
            </LinearGradient>
          </MaskedView>

          <Text className="text-gray-400 text-center mb-8">
            Sign in to continue your AI conversations
          </Text>

          {/* Form */}
          <View className="space-y-6">
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
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                value={formData.password}
                onChangeText={(val) => handleChange("password", val)}
                secureTextEntry={true}
                className="rounded-lg px-4 py-3 text-white border-2 border-gray-600 bg-gray-800 focus:border-indigo-500"
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mt-2">
              <Text className="text-indigo-400 text-sm">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity className="bg-indigo-600 py-3 rounded-lg items-center mt-6">
              <Text className="text-white font-semibold text-lg">Sign In</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text className="text-center text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link href={"/Pages/Register"} style={{ color: "#308df7" }}>
                Register
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
