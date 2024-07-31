import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import img from "../assets/images/dentra-512.png";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/StackNavigation";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;

const SplashScreen = (): JSX.Element => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const opacityAnimation = useSharedValue(0);

  const config = {
    duration: 2000,
  };

  const style = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimation.value,
    };
  });

  const handleUserId = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "Landing" }] })
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "Home" }] })
      );
    }
  };

  useEffect(() => {
    opacityAnimation.value = withTiming(1, config);
    const autoNavigate = setTimeout(() => {
      handleUserId();
    }, 3100);
    return () => clearTimeout(autoNavigate);
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        className="z-10  w-2/4 flex justify-center items-center"
        style={style}
      >
        <Image source={img} className="w-full h-[65px]" />
      </Animated.View>
      <LottieView
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        source={require("../assets/animations/splashLoading.json")}
        autoPlay
        loop={false}
        resizeMode="cover"
        duration={3000}
      />
    </View>
  );
};

export default SplashScreen;
