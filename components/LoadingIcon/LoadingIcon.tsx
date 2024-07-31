import { View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const LoadingIcon = () => {
  return (
    <View className="flex-1 items-center justify-normal absolute w-full h-full bg-[#00000051] z-10">
      <LottieView
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
          backgroundColor: "transparent",
        }}
        source={require("../../assets/animations/loadingIcon.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingIcon;
