import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Preloader from "../Components/Preloader";
import AxiosInstance from "../Config/Axios";

const DashboardProtector = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          router.replace("/"); // navigate to welcome/login
          return;
        }

        const res = await AxiosInstance.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setTimeout(() => {
            setIsLoading(false);
          }, 3500);
        } else {
          await AsyncStorage.clear();
          router.replace("/");
        }
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Authentication Failed",
          text2: error?.response?.data?.message || "Something went wrong",
          position: "top",
          visibilityTime: 4000,
        });
        await AsyncStorage.clear();
        router.replace("/");
      }
    };

    checkUser();
  }, [router]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <Preloader onComplete={() => {}} />
      </View>
    );
  }

  return <>{children}</>;
};

export default DashboardProtector;
