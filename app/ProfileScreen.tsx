import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";

const ProfileScreen = () => {
  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 py-5 flex-col  justify-center">
            <Text
              style={{ fontFamily: "TajwalReg" }}
              className="text-center text-theme-primary text-lg "
            >
              الحد الادني للسحب هو 50 جنيه
            </Text>
            {/*  */}
            <View className="my-5">
              <Text
                style={{ fontFamily: "TajwalReg" }}
                className="text-center text-2xl font-bold text-theme-quinary"
              >
                نقاطك الحالية:
              </Text>
              <Text
                style={{ fontFamily: "TajwalReg" }}
                className="text-center text-6xl font-bold text-theme-primary my-3"
              >
                1000
              </Text>
            </View>
            {/*  */}
            <View className="my-5">
              <Text
                style={{ fontFamily: "TajwalReg" }}
                className="text-center text-2xl font-bold text-theme-quinary"
              >
                يعادل بالجنيه:
              </Text>
              <Text
                style={{ fontFamily: "TajwalReg" }}
                className="text-center text-6xl font-bold text-theme-primary mt-3"
              >
                50
              </Text>
              <Text
                style={{ fontFamily: "TajwalReg" }}
                className="text-center -mt-2 text-theme-primary text-lg"
              >
                جـــنيــــه
              </Text>
            </View>
            {/*  */}
            <View>
              <TextInput
                placeholder="ادخل رقم المحفظة"
                className=" bg-theme-secondry text-center w-3/4 mx-auto py-2 rounded-full text-lg"
                keyboardType="number-pad"
              />
              <TouchableOpacity className="bg-theme-primary  w-1/2 my-5 mx-auto py-2 rounded-full">
                <Text
                  style={{ fontFamily: "TajwalReg" }}
                  className="text-white text-lg text-center font-bold"
                >
                  طلب سحب
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="h-20 justify-center items-center bg-slate-500">
        <Text>Advertisement</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
