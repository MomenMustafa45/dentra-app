import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "@/app/SplashScreen";
import LandingScreen from "@/app/LandingScreen";
import LoginScreen from "@/app/LoginScreen";
import RegisterScreen from "@/app/RegisterScreen";
import DrawerNavigation from "./DrawerNavigation";
import SelectLevelScreen from "@/app/SelectLevelScreen";

export type RootNavigationParamList = {
  Landing: undefined;
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  SelectLevel: undefined;
  Home: undefined;
  Profile: undefined;
  Topics: undefined;
  WellDone: undefined;
  Chapters: { topicId: string };
  Quiz: { topicId: string; chapterId: string; chapterReward: string };
  AboutUs: undefined;
  CommonQuizs: undefined;
  Politics: undefined;
};

const Stack = createStackNavigator<RootNavigationParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="SelectLevel"
        component={SelectLevelScreen}
        options={{
          headerShown: true,
          headerTitle: "الجامعة والمستوي",
          headerTitleStyle: { fontFamily: "TajwalBold" },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="Home" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
