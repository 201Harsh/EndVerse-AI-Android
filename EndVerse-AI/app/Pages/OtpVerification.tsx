import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import AxiosInstance from "../Config/Axios";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [activeInput, setActiveInput] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Properly type the ref to an array of TextInput or null
  const inputRefs = useRef<(TextInput | null)[]>(Array(4).fill(null));

  const navigation = useNavigation();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);

    if (text && index < 3) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpResend = async () => {
    const Useremail = await AsyncStorage.getItem("email");
    try {
      const response = await AxiosInstance.post("/users/resend-otp", {
        email: Useremail,
      });
      if (response.status === 200) {
        Alert.alert("Success", response.data.msg);
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.error || "Failed to resend OTP"
      );
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const otpCode = otp.join("");
    const Useremail = await AsyncStorage.getItem("email");

    try {
      const res = await AxiosInstance.post("/users/verify-email", {
        email: Useremail,
        otp: otpCode,
      });

      if (res.status === 200) {
        Alert.alert("Success", res.data.message);
        await AsyncStorage.setItem("token", res.data.token);
        await AsyncStorage.setItem("name", res.data.user.name);
        navigation.navigate("Dashboard" as never);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) =>
          Alert.alert("Error", err.msg)
        );
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-900 justify-center items-center p-4"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="w-full max-w-md bg-gray-800/50 rounded-xl border border-gray-700 p-6">
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center mb-6"
        >
          <Text className="text-gray-400 text-base">← Back</Text>
        </TouchableOpacity>

        {/* Icon & Title */}
        <Text className="text-5xl text-center mb-4">🤖</Text>
        <Text className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent">
          Verify Your Account
        </Text>
        <Text className="text-gray-400 mt-2 text-sm text-center">
          We've sent a 4-digit code to your email
        </Text>

        {/* OTP Inputs */}
        <View className="flex-row justify-center mt-6 mb-6 space-x-3">
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={`w-16 h-16 text-2xl text-center text-white bg-gray-700/50 border rounded-lg focus:border-indigo-500 ${
                activeInput === index ? "border-indigo-500" : "border-gray-600"
              }`}
              keyboardType="numeric"
              maxLength={1}
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setActiveInput(index)}
              editable={!isSubmitting}
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={otp.some((digit) => digit === "") || isSubmitting}
          className={`w-full py-3 rounded-lg font-medium ${
            otp.some((digit) => digit === "") || isSubmitting
              ? "bg-indigo-600/50"
              : "bg-indigo-600"
          }`}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Verify OTP
            </Text>
          )}
        </TouchableOpacity>

        {/* Resend OTP */}
        <View className="mt-6 flex-row justify-center">
          <Text className="text-gray-400 text-sm">Didn't receive code? </Text>
          <TouchableOpacity onPress={handleOtpResend}>
            <Text className="text-indigo-400 font-medium">Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPVerification;
