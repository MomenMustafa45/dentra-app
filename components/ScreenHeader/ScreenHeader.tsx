import { View, Text } from "react-native";
import React from "react";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "@/navigation/DrawerNavigation";
type ScreenHeaderDrawerProp = DrawerNavigationProp<RootDrawerParamList>;

const ScreenHeader = () => {
  const navigation = useNavigation<ScreenHeaderDrawerProp>();

  return (
    <View className="bg-theme-primary flex flex-row justify-between px-4 py-4">
      <View className="flex-row">
        <TouchableOpacity
          className="mr-4"
          onPress={() => navigation.toggleDrawer()}
        >
          <Entypo name="menu" size={30} color="white" />
        </TouchableOpacity>
        <View className="bg-theme-quaternary rounded-full p-1 ">
          <MaterialIcons name="attach-money" size={25} color="#2ecd71" />
        </View>
      </View>
      {/*  */}
      <View className="flex flex-row items-center">
        <Text
          className="text-theme-quaternary text-lg mr-2"
          style={{
            fontFamily: "TajwalBold",
          }}
        >
          دكتور أحمد السيد
        </Text>
        <View className=" overflow-hidden bg-theme-quaternary rounded-full p-1 ">
          <Ionicons name="person" size={24} color="#C7C4BF" />
        </View>
      </View>
    </View>
  );
};

export default ScreenHeader;
