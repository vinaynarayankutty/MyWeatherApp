import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplashScreen from "@/components/AnimatedSplashScreen";
import Animated, { FadeIn } from "react-native-reanimated";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  useEffect(() => {
    setAppReady(true);
  }, []);

  if (!appReady || !splashAnimationFinished)
    return (
      <AnimatedSplashScreen
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) setSplashAnimationFinished(true);
        }}
      />
    );

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn}>
      <Stack />
    </Animated.View>
  );
}
