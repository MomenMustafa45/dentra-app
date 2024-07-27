import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "@/app/SplashScreen";
import LandingScreen from "@/app/LandingScreen";
import LoginScreen from "@/app/LoginScreen";
import RegisterScreen from "@/app/RegisterScreen";
import DrawerNavigation from "./DrawerNavigation";

export type RootStackParamList = {
  Landing: undefined;
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  SelectLevel: undefined;
  Topics: undefined;
  Home: undefined;
  WellDone: undefined;
  Quiz: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Screen name="Home" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
