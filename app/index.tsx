import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.tatrasWelcome}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover the beauty of the Tatra Mountains thanks to the{' '}
              <Text className="text-secondary">Taternik</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
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
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#1F4529" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;