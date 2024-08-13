import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RootNavigationParamList } from "./StackNavigation";
import DrawerContent from "@/components/DrawerContent/DrawerContent";
import ProfileScreen from "@/app/ProfileScreen";
import TopicsScreen from "@/app/TopicsScreen";
import ScreenHeader from "@/components/ScreenHeader/ScreenHeader";
import WelldoneScreen from "@/app/WelldoneScreen";
import ChaptersScreen from "@/app/ChaptersScreen";
import QuizScreen from "@/app/QuizScreen";
import AboutDentra from "@/app/AboutDentra";
import CommonQestions from "@/app/CommonQestions";
import PoliticsScreen from "@/app/PoliticsScreen";
import { I18nManager } from "react-native";

const Drawer = createDrawerNavigator<RootNavigationParamList>();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Topics"
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        header: () => <ScreenHeader />,
        drawerPosition: I18nManager.isRTL ? "right" : "left",
      }}
    >
      <Drawer.Screen name="Topics" component={TopicsScreen} />

      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "User",
          title: "overview",
        }}
        component={ProfileScreen}
      />
      <Drawer.Screen name="WellDone" component={WelldoneScreen} />
      <Drawer.Screen name="Chapters" component={ChaptersScreen} />
      <Drawer.Screen name="Quiz" component={QuizScreen} />
      <Drawer.Screen name="AboutUs" component={AboutDentra} />
      <Drawer.Screen name="CommonQuizs" component={CommonQestions} />
      <Drawer.Screen name="Politics" component={PoliticsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
