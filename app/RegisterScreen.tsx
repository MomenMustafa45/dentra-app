import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";

import React, { useState } from "react";
import FormButton from "@/components/FormButton/FormButton";
import FormInput from "@/components/FormInput/FormInput";
import LogoHeader from "@/components/LogoHeader/LogoHeader";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/StackNavigation";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Users } from "@/utils/DummyData";

type RegisterScreenProp = StackNavigationProp<RootStackParamList, "Login">;

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

const RegisterScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigation = useNavigation<RegisterScreenProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);

    const isEmailExists = Users.find((user) => user.email == data.email);

    if (isEmailExists) {
      setShowModal(true);
      setErrorText("البريد الالكتروني موجود بالفعل");
    }
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "SelectLevel", params: { data } }],
      })
    );
  };

  // on submit error
  const onError = (errors: any) => {};

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

            <Controller
              control={control}
              rules={{
                required: { value: true, message: "يجب ادخال الاسم" },
                pattern: {
                  value: /^[\u0600-\u06FF]+$/,
                  message: "فقط اللغة العربية مسموح بها للكتابة",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeHolder="أسمك يا دكتور"
                  inputStyle="mt-5"
                />
              )}
              name="name"
            />
            <Text
              style={{ fontFamily: "TajwalReg" }}
              className="text-red-500 mr-5 mt-1 mb-2"
            >
              {errors.name && errors.name.message}
            </Text>

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "يجب ادخال البريد الالكتروني",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="email-address"
                  placeHolder="البريد الالكتروني"
                  inputStyle="mt-0"
                />
              )}
              name="email"
            />
            <Text
              style={{ fontFamily: "TajwalReg" }}
              className="text-red-500 mr-5 mt-1 mb-2"
            >
              {errors.email && errors.email.message}
            </Text>

            <Controller
              control={control}
              rules={{
                required: { value: true, message: "يجب ادخال رقم الهاتف" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="phone-pad"
                  placeHolder="رقم الهاتف الخاص بك"
                  inputStyle="mt-0"
                />
              )}
              name="phoneNumber"
            />
            <Text
              style={{ fontFamily: "TajwalReg" }}
              className="text-red-500 mr-5 mt-1 mb-2"
            >
              {errors.phoneNumber && errors.phoneNumber.message}
            </Text>

            <Controller
              control={control}
              rules={{
                required: { value: true, message: "يجب ادخال كلمة السر" },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeHolder="كلمة السر"
                  isPassword={true}
                />
              )}
              name="password"
            />
            <Text
              style={{ fontFamily: "TajwalReg" }}
              className="text-red-500 mr-5 mt-1"
            >
              {errors.password && errors.password.message}
            </Text>

            <FormButton
              onPress={handleSubmit(onSubmit, onError)}
              title="تسجيل حساب"
            />
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
      {/* error and message modal */}
      <Modal
        isVisible={showModal}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        animationOutTiming={500}
        backdropOpacity={0.9}
      >
        <View className="h-52 bg-white items-center justify-between py-4 rounded-lg shadow">
          <Text
            style={{ fontFamily: "TajwalReg" }}
            className="text-theme-quinary text-center text-lg"
          >
            {errorText}
          </Text>
          <TouchableOpacity
            className="bg-theme-primary px-6 py-1 rounded-lg"
            onPress={() => {
              setShowModal(false);
              setErrorText("");
            }}
          >
            <Text
              style={{ fontFamily: "TajwalBold" }}
              className="text-theme-quaternary text-center text-lg"
            >
              فهمت
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* error and message modal */}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
