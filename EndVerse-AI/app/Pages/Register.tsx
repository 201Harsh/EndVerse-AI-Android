import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import Header from "../Components/Header";
import { Link, useRouter } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import Toast from "react-native-toast-message";
import AxiosInstance from "../Config/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const EmailRef = useRef<TextInput>(null);
  const PasswdRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Router = useRouter();

  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "protonmail.com",
    "aol.com",
    "mail.com",
    "zoho.com",
    "yandex.com",
  ];

  const blockedEmailPatterns: (string | RegExp)[] = [
    "tempmail.com",
    "mailinator.com",
    "10minutemail.com",
    "guerrillamail.com",
    "yopmail.com",
    "trashmail.com",
    "fakeinbox.com",
    "throwawaymail.com",
    "temp-mail.org",
    "maildrop.cc",
    "getnada.com",
    "dispostable.com",
    "mailnesia.com",
    "mytemp.email",
    "sharklasers.com",
    "mail.tm",
    "tempail.com",
    "emailondeck.com",
    "tempinbox.com",
    "mailmoat.com",
    "temp-mail.io",
    "mailbox.in.ua",
    "inboxbear.com",
    "tmpmail.org",
    "temp-mail.net",
    "throwawayemail.com",
    "mailcatch.com",
    "tempemail.net",
    "mailmetrash.com",
    "trashmailer.com",
    "mailnull.com",
    "ofacer.com",
    "tempmail.pro",

    // Regex patterns for disposable emails
    /^[a-z0-9._%+-]+@(temp|trash|fake|throwaway|disposable)/i,
    /^[a-z0-9._%+-]+@(mailinator|yopmail|guerrillamail)/i,
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(xyz|top|club|site|online)$/i,
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(tk|ml|ga|cf|gq)$/i,
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(test|example|demo)$/i,
  ];

  const showToast = (msg: string) => {
    Toast.show({
      type: "error",
      text1: msg,
      position: "bottom",
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. Check email format
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address");
      return false;
    }

    // 2. Extract domain
    const domain = email.split("@")[1].toLowerCase();

    // 3. Allowed domains only
    if (!allowedDomains.includes(domain)) {
      showToast("Emails from Gmail, Yahoo,etc. are allowed");
      return false;
    }

    // 4. Block disposable / temp mails
    const fullEmail = email.toLowerCase();
    const isBlocked = blockedEmailPatterns.some((pattern) => {
      if (typeof pattern === "string") {
        return domain === pattern || domain.endsWith(`.${pattern}`);
      } else if (pattern instanceof RegExp) {
        return pattern.test(fullEmail);
      }
      return false;
    });

    if (isBlocked) {
      showToast("Disposable email addresses are not allowed");
      return false;
    }

    return true;
  };

  const handleEmailBlur = () => {
    if (email) {
      validateEmail(email);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Name is required",
        position: "bottom",
      });
      return;
    }
    if (!validateEmail(email)) {
      return;
    }

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
      setLoading(true);
      const response = await AxiosInstance.post("/users/register", {
        name,
        email,
        password,
      });
      console.log(response.data.tempUser);
      if (response.status === 201) {
        AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.setItem("name", response.data.tempUser.name);
        AsyncStorage.setItem("email", response.data.tempUser.email);
        Toast.show({
          type: "success",
          text1: response.data.message,
          position: "bottom",
        });
      }

      Router.push("/Pages/OtpVerification");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      await AsyncStorage.clear();
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
    } finally {
      setLoading(false);
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
                  autoCapitalize="none"
                  onSubmitEditing={() => EmailRef.current?.focus()}
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
                  onSubmitEditing={() => PasswdRef.current?.focus()}
                  ref={EmailRef}
                  onBlur={handleEmailBlur}
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
                  autoCapitalize="none"
                  ref={PasswdRef}
                  onSubmitEditing={handleSubmit}
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
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white font-semibold text-lg">
                    Create Account
                  </Text>
                )}
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
      </View>
    </>
  );
}
