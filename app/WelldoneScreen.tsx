import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Foundation from "@expo/vector-icons/Foundation";
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function WelldoneScreen() {
  const navigate = useNavigation();

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
      <TouchableOpacity
        className="items-center justify-center bg-theme-primary w-12 h-12 rounded-full mt-6"
        onPress={() => {
          navigate.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: "Topics" }] })
          );
        }}
      >
        <Foundation name="play" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
