import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "@/app/SplashScreen";
import LandingScreen from "@/app/LandingScreen";
import ScreenHeader from "@/components/ScreenHeader";
import LoginScreen from "@/app/LoginScreen";
import RegisterScreen from "@/app/RegisterScreen";
import SelectLevelScreen from "@/app/SelectLevelScreen";

export type RootStackParamList = {
  Landing: undefined;
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  SelectLevel: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectLevel"
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
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SelectLevel" component={SelectLevelScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
