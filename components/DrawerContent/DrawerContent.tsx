import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootNavigationParamList } from "@/navigation/StackNavigation";

type SplashScreenNavigationProp = DrawerNavigationProp<RootNavigationParamList>;

const DrawerContent = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const [activeRoute, setActiveRoute] = React.useState<number | undefined>(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      const route = e.data.state.routes[e.data.state.index].state?.index;

      setActiveRoute(route);
    });

    return unsubscribe;
  }, [navigation]);

  const signOutHandler = () => {
    navigation.navigate("Landing");
  };

  return (
    <View className="px-3 py-10 flex justify-between flex-1">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Topics")}
          className={`${activeRoute == 0 ? "bg-theme-tertiary" : ""} p-2 my-2`}
        >
          <Text style={{ fontFamily: "TajwalBold" }}>Topics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${activeRoute == 1 ? "bg-theme-tertiary" : ""} p-2 my-2`}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text style={{ fontFamily: "TajwalBold" }}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={signOutHandler} className="p-2 my-2">
          <Text style={{ fontFamily: "TajwalBold" }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerContent;
