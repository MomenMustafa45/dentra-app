import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "@/app/ProfileScreen";
import TopicsScreen from "@/app/TopicsScreen";
import ScreenHeader from "@/components/ScreenHeader/ScreenHeader";
import SelectLevelScreen from "@/app/SelectLevelScreen";
import WelldoneScreen from "@/app/WelldoneScreen";
import ChaptersScreen from "@/app/ChaptersScreen";
import QuizScreen from "@/app/QuizScreen";

export type RootDrawerParamList = {
  Profile: undefined;
  Topics: undefined;
  SelectLevel: undefined;
  WellDone: undefined;
  Chapters: undefined;
  Quiz: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Quiz"
      screenOptions={{
        header: () => <ScreenHeader />,
      }}
    >
      <Drawer.Screen
        name="SelectLevel"
        component={SelectLevelScreen}
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "User",
          title: "overview",
        }}
        component={ProfileScreen}
      />
      <Drawer.Screen name="Topics" component={TopicsScreen} />
      <Drawer.Screen name="WellDone" component={WelldoneScreen} />
      <Drawer.Screen name="Chapters" component={ChaptersScreen} />
      <Drawer.Screen name="Quiz" component={QuizScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
