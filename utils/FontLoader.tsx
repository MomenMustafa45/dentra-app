// FontLoader.js
import React, { ReactNode } from "react";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";

interface FontLoaderProps {
  children: ReactNode;
}

const FontLoader = ({ children }: FontLoaderProps) => {
  let [fontsLoaded] = useFonts({
    // prettier-ignore
    "TajwalReg": require("../assets/fonts/Tajawal-Regular.ttf"),
    // prettier-ignore
    "TajwalBold": require("../assets/fonts/Tajawal-Bold.ttf"),
    // prettier-ignore
    "TajwalExtraBold": require("../assets/fonts/Tajawal-ExtraBold.ttf"),
    // prettier-ignore
    "TajwalBlack": require("../assets/fonts/Tajawal-Black.ttf"),
    // prettier-ignore
    "TajwalMed": require("../assets/fonts/Tajawal-Medium.ttf"),
    // prettier-ignore
    "TajwalLight": require("../assets/fonts/Tajawal-Light.ttf"),
    // prettier-ignore
    "TajwalExtraLight": require("../assets/fonts/Tajawal-ExtraLight.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return children;
};

export default FontLoader;
