import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

const Welcome = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const imagesArray: any[] = [images.tatra1, images.tatra2, images.tatra3, images.tatra4, images.tatra5];

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imagesArray.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ImageBackground
      source={imagesArray[imageIndex]}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <SafeAreaView className="bg-transparent h-full justify-end">
        <View className="w-full flex justify-center items-center px-4 pb-4 bg-black/50">  
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover the beauty of the Tatra Mountains thanks to the{' '}
              <Text className="text-secondary">Taternik</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-5 text-center">
            Your essential app in the Tatras - find a route for yourself, share your hikes, get to know these mountains even better
          </Text>

          <CustomButton
            title="Log in or register"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

          <CustomButton
            title="Continue without account"
            handlePress={() => router.push("/map")}
            containerStyles="w-full mt-3"
          />
        </View>
        <StatusBar 
          backgroundColor="transparent"
          style="dark"
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Welcome;