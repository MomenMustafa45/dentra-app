import { Image, View } from "react-native";
import React from "react";
import imgLogoTwo from "../../assets/images/dentra-512.png";
type LogoHeaderProps = {
  classes?: string;
  imgStyle?: string;
};

const LogoHeader = ({ classes, imgStyle }: LogoHeaderProps) => {
  return (
    <View className={`w-full h-[100px] mx-auto ${classes} px-6`}>
      <Image source={imgLogoTwo} className={`w-full h-full ${imgStyle}`} />
    </View>
  );
};

export default LogoHeader;
