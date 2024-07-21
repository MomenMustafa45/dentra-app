import { Image, View } from "react-native";
import React from "react";
import imgLogo from "../../assets/images/splashLogo.png";
type LogoHeaderProps = {
  classes?: string;
  imgStyle?: string;
};

const LogoHeader = ({ classes, imgStyle }: LogoHeaderProps) => {
  return (
    <View className={`w-3/4 h-[100px] mx-auto ${classes}`}>
      <Image source={imgLogo} className={`w-full h-[70px] ${imgStyle}`} />
    </View>
  );
};

export default LogoHeader;
