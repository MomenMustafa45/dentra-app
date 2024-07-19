import { Image, View } from "react-native";
import React from "react";
import imgLogo from "../assets/images/splashLogo.png";

const LogoHeader = () => {
  return (
    <View className="w-3/4 h-[100px] mx-auto">
      <Image source={imgLogo} className="w-full h-[70px]" />
    </View>
  );
};

export default LogoHeader;
