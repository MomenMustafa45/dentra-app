import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/StackNavigation";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Landing"
>;

const DrawerContent = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const signOutHandler = async () => {
    await AsyncStorage.removeItem("userId");
    navigation.navigate("Landing");
  };

  return (
    <View>
      <TouchableOpacity onPress={signOutHandler}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;
