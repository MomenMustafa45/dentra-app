import { View, Text, I18nManager } from "react-native";
import React from "react";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RootNavigationParamList } from "@/navigation/StackNavigation";
type ScreenHeaderDrawerProp = DrawerNavigationProp<RootNavigationParamList>;

const ScreenHeader = () => {
  const unserInfo = useAppSelector((state) => state.userInfo.unserInfo);
  const navigation = useNavigation<ScreenHeaderDrawerProp>();

  return (
    <View
      className="bg-theme-primary flex flex-row justify-between px-4 py-4"
      style={{
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      <View
        className="flex-row gap-x-2"
        style={{ flexDirection: I18nManager.isRTL ? "row-reverse" : "row" }}
      >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Entypo name="menu" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-theme-quaternary rounded-full p-1 "
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <MaterialIcons name="attach-money" size={25} color="#2ecd71" />
        </TouchableOpacity>
      </View>
      {/*  */}
      <View
        className="flex flex-row items-center gap-x-2"
        style={{ flexDirection: I18nManager.isRTL ? "row-reverse" : "row" }}
      >
        <Text
          className="text-theme-quaternary text-lg mr-2"
          style={{
            fontFamily: "TajwalBold",
          }}
        >
          دكتور {unserInfo.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Topics");
          }}
          className=" overflow-hidden bg-theme-quaternary rounded-full p-1"
        >
          <Ionicons name="person" size={24} color="#C7C4BF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScreenHeader;
