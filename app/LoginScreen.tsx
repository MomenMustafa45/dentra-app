import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import LogoHeader from "@/components/LogoHeader";
import { TextInput } from "react-native-gesture-handler";
import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 py-10 px-5">
          <LogoHeader />
          <View className="flex-1 justify-center">
            <Text
              style={{ fontFamily: "TajwalBold" }}
              className="text-theme-quinary text-xl"
            >
              تسجيل الدخول
            </Text>

            <FormInput placeHolder="رقم الهاتف الخاص بك" inputStyle="my-4" />
            <FormInput placeHolder="كلمة السر" isPassword={true} />

            <TouchableOpacity className="my-3 items-start ml-2">
              <Text
                style={{ fontFamily: "TajwalBold" }}
                className="text-theme-quinary"
              >
                نسيت كلمة السر ؟
              </Text>
            </TouchableOpacity>

            <FormButton title="تسجيل الدخول" />
          </View>

          <View className="flex flex-row justify-center">
            <TouchableOpacity>
              <Text
                style={{ fontFamily: "TajwalBold" }}
                className="text-theme-primary mr-2"
              >
                انشاء حساب
              </Text>
            </TouchableOpacity>
            <Text
              style={{ fontFamily: "TajwalBold" }}
              className="text-theme-quinary"
            >
              ليس لديك حساب؟
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
