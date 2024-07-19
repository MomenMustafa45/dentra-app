import { Dimensions, Image, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import React from "react";
import imageOne from "../assets/images/landingImage1.png";
import imageTwo from "../assets/images/landingImage2.png";
import imgLogo from "../assets/images/splashLogo.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

const LandingScreen = () => {
  const width = Dimensions.get("window").width;

  return (
    <View className="flex-1 px-5 py-10">
      <View className="w-3/4 h-[100px] mx-auto">
        <Image source={imgLogo} className="w-full h-[70px]" />
      </View>
      <View className="flex-1 rounded-lg overflow-hidden shadow-lg">
        <Carousel
          loop
          width={width * 0.9}
          autoPlay={true}
          data={[imageOne, imageTwo]}
          scrollAnimationDuration={3000}
          renderItem={({ index, item }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Image source={item} className="w-full h-full" />
            </View>
          )}
        />
      </View>
      {/*  */}
      <View className="mt-6">
        <Text
          className="font-bold text-xl text-center text-theme-quinary"
          style={{ fontFamily: "TajwalReg" }}
        >
          مع دنترا, كل سؤال هو فرصة لك لتوسيع معرفتك وكسب المال!
        </Text>
        {/* register btn */}
        <TouchableOpacity className="items-center bg-theme-primary rounded-3xl p-3 my-5">
          <Text
            className="font-bold text-theme-quaternary text-xl"
            style={{ fontFamily: "TajwalReg" }}
          >
            أنشاء حساب جديد
          </Text>
        </TouchableOpacity>
        {/* Sign in Btn */}
        <TouchableOpacity className="items-center bg-transparent rounded-3xl p-3">
          <Text
            className="font-bold text-theme-primary text-xl"
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
