import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "@/app/SplashScreen";
import LandingScreen from "@/app/LandingScreen";
import { Text } from "react-native";
import ScreenHeader from "@/components/ScreenHeader";

export type RootStackParamList = {
  Landing: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        header: () => <ScreenHeader />,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
