import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";
import Animated, { FadeIn } from "react-native-reanimated";
import {
  useFonts,
  Inter_400Regular,
  Inter_900Black,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  AmaticSC_400Regular,
  AmaticSC_700Bold,
} from "@expo-google-fonts/amatic-sc";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBlack: Inter_900Black,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
  });
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) setAppReady(true);
  }, [fontsLoaded, fontError]);

  if (!appReady || !splashAnimationFinished)
    return (
      <AnimatedSplashScreen
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) setSplashAnimationFinished(true);
        }}
        isAppReady={appReady}
      />
    );

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn}>
      <Stack />
    </Animated.View>
  );
}
