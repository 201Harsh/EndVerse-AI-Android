import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Header from "../Components/Header";
import { Link, useRouter } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import Toast from "react-native-toast-message";
import AxiosInstance from "../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const PasswordRef = useRef<TextInput>(null);

  const Router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    setErrors({});
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Email is required",
        position: "bottom",
      });
      return;
    }

    if (!password.trim()) {
      Toast.show({
        type: "error",
        text1: "Password is required",
        position: "bottom",
      });
      return;
    }

    try {
      const response = await AxiosInstance.post("/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("name", response.data.user.name);
        AsyncStorage.setItem("email", response.data.user.email);
        Toast.show({
          type: "success",
          text1: response.data.message,
          position: "bottom",
        });
        Router.push("../dashboard");
      }

      setEmail("");
      setPassword("");
    } catch (error: any) {
      AsyncStorage.clear();
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? error.response.data.errors.map((err: any) => err.msg).join(", ")
          : "Something went wrong");

      Toast.show({
        type: "error",
        text1: errorMessage,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <View className="flex-1 bg-gray-900">
        <Header Showbtn={false} opacity={false} />
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
                <Text className="text-4xl font-bold text-center mb-2">
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

            <Text className="text-gray-400 text-center mb-6">
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
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onSubmitEditing={() => PasswordRef.current?.focus()}
                  className="rounded-lg px-4 py-3 text-white border-2 border-gray-600 bg-gray-800 focus:border-indigo-500"
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Password */}
              <View className="mt-4 relative">
                <Text className="text-white font-semibold mb-2">Password</Text>
                <TextInput
                  ref={PasswordRef}
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onSubmitEditing={handleSubmit}
                  autoCapitalize="none"
                  className="rounded-lg px-4 py-3 text-white border-2 border-gray-600 bg-gray-800 focus:border-indigo-500"
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  className="absolute right-4 top-[60%]"
                  style={{ transform: [{ translateY: -5 }] }}
                >
                  <Entypo
                    name={showPassword ? "eye-with-line" : "eye"}
                    size={20}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.password}
                </Text>
              )}

              {/* Forgot Password */}
              <TouchableOpacity className="self-end mt-2">
                <Text className="text-indigo-400 text-sm">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-indigo-600 py-3 rounded-lg items-center mt-6"
              >
                <Text className="text-white font-semibold text-lg">Log In</Text>
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
      </View>
    </>
  );
}
