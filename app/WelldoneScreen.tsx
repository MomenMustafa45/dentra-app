import { View, Text } from "react-native";
import React from "react";
import Foundation from "@expo/vector-icons/Foundation";

export default function WelldoneScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text
        style={{ fontFamily: "TajwalBold" }}
        className="text-6xl text-theme-primary"
      >
        أحسنت!
      </Text>
      <Text
        style={{ fontFamily: "TajwalBold" }}
        className="text-theme-primary text-xl max-w-[80%] text-center"
      >
        لقد اجتزت الإختبار وحصلت علي 50 نقطة
      </Text>
      <View className="items-center justify-center bg-theme-primary w-12 h-12 rounded-full mt-6">
        <Foundation name="play" size={30} color="white" />
      </View>
    </View>
  );
}
