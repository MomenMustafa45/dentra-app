import { View, Text } from "react-native";
import React from "react";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

const ScreenHeader = () => {
  return (
    <View className="bg-theme-primary flex flex-row justify-between px-4 py-4">
      <View className="flex-row">
        <View className="mr-4">
          <Entypo name="menu" size={30} color="white" />
        </View>
        <View className="bg-theme-quaternary rounded-full p-1 shadow-xl shadow-slate-950">
          <MaterialIcons name="attach-money" size={25} color="#2ecd71" />
        </View>
      </View>
      {/*  */}
      <View className="flex flex-row items-center">
        <Text
          className="text-theme-quaternary text-lg mr-2"
          style={{
            fontFamily: "TajwalBold",
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 5,
          }}
        >
          دكتور أحمد السيد
        </Text>
        <View className=" overflow-hidden bg-theme-quaternary rounded-full p-1 shadow-xl shadow-slate-950">
          <Ionicons name="person" size={24} color="#C7C4BF" />
        </View>
      </View>
    </View>
  );
};

export default ScreenHeader;
