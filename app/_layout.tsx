import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "react-redux";
import { setAccessToken } from "@rnmapbox/maps";
import store from "@/store";
import '@/constants/global.css'

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  useEffect(() => {
    const setAccessTokenAndHideSplash = async () => {
      await setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_API_KEY!);
      SplashScreen.hideAsync();
    };
    setAccessTokenAndHideSplash();
  }, []);

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded || (!fontsLoaded && !error)) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(auth)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="components/templates/TrailSearchTemplate" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
