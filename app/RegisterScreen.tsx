import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import FormButton from "@/components/FormButton/FormButton";
import FormInput from "@/components/FormInput/FormInput";
import LogoHeader from "@/components/LogoHeader/LogoHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/StackNavigation";
import { useNavigation } from "@react-navigation/native";

type RegisterScreenProp = StackNavigationProp<RootStackParamList, "Login">;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenProp>();
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
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
