import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import LogoHeader from "@/components/LogoHeader";

const RegisterScreen = () => {
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
              انشاء حساب جديد
            </Text>

            <FormInput placeHolder="أسمك يا دكتور" inputStyle="mt-5" />
            <FormInput placeHolder="رقم الهاتف الخاص بك" inputStyle="my-4" />
            <FormInput placeHolder="كلمة السر" isPassword={true} />

            <FormButton title="تسجيل حساب" />
          </View>

          <View className="flex flex-row justify-center">
            <TouchableOpacity>
              <Text
                style={{ fontFamily: "TajwalBold" }}
                className="text-theme-primary mr-2"
              >
                تسجيل الدخول
              </Text>
            </TouchableOpacity>
            <Text
              style={{ fontFamily: "TajwalBold" }}
              className="text-theme-quinary"
            >
              لديك حساب؟
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
