import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import Animated, { ZoomOut } from "react-native-reanimated";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AnimatedSplashScreen = ({
  onAnimationFinish = (isCancelled) => {},
}: {
  onAnimationFinish?: (isCancelled: boolean) => void;
}) => {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        exiting={ZoomOut}
        ref={animation}
        onAnimationFinish={onAnimationFinish}
        loop={false}
        autoPlay
        style={{
          width: "80%",
          height: 400,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@assets/lottie/weather.json")}
      />
      <Text style={styles.title}>MY WEATHER APP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 20,
  },
});

export default AnimatedSplashScreen;
