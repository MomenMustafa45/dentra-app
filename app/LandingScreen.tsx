import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import React from "react";
import imageOne from "../assets/images/landingImage1.png";
import imageTwo from "../assets/images/landingImage2.png";

import { TouchableOpacity } from "react-native-gesture-handler";

import LogoHeader from "@/components/LogoHeader/LogoHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootNavigationParamList } from "@/navigation/StackNavigation";

type LandingScreenNavigationProp = StackNavigationProp<
  RootNavigationParamList,
  "Register",
  "Login"
>;

const LandingScreen = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();
  const width = Dimensions.get("window").width;

  return (
    <View className="flex-1 px-5 py-10">
      <LogoHeader />
      <View className="flex-1 rounded-lg overflow-hidden shadow-lg">
        <Carousel
          loop
          width={width * 0.9}
          data={[
            {
              img: imageOne,
              text: "مع دنترا, كل سؤال هو فرصة لك لتوسيع معرفتك وكسب المال!",
            },
            {
              img: imageTwo,
              text: "أجب على الأسئلة بطريقة صحيحة واربح أموال حقيقة",
            },
          ]}
          scrollAnimationDuration={3000}
          renderItem={({ index, item }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginHorizontal: 10,
              }}
              className="py-12"
            >
              <View className="rounded-xl overflow-hidden">
                <Image source={item.img} className="w-full h-full" />
              </View>
              <Text
                className="text-xl text-center text-theme-quinary w-full mx-auto mt-5"
                style={{ fontFamily: "TajwalReg" }}
              >
                {item.text}
              </Text>
            </View>
          )}
          style={{ gap: 20 }}
        />
      </View>
      {/*  */}
      <View className="mt-6">
        {/* register btn */}
        <TouchableOpacity
          className="items-center bg-theme-primary rounded-3xl p-3 my-5"
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            className="text-theme-quaternary text-xl"
            style={{ fontFamily: "TajwalReg" }}
          >
            إنشاء حساب جديد
          </Text>
        </TouchableOpacity>
        {/* Sign in Btn */}
        <TouchableOpacity
          className="items-center bg-transparent rounded-3xl p-3"
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            className="text-theme-primary text-xl"
            style={{ fontFamily: "TajwalReg" }}
          >
            تسجيل دخول
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;
