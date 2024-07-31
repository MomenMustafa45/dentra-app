import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
} from "react-native";
import Modal from "react-native-modal";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import LogoHeader from "@/components/LogoHeader/LogoHeader";
import FormButton from "@/components/FormButton/FormButton";
import FormInput from "@/components/FormInput/FormInput";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/StackNavigation";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Users } from "@/utils/DummyData";
import { loginUser } from "@/services/userServices";
import LottieView from "lottie-react-native";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register",
  "Topics"
>;

export type Inputs = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  // on submit
  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    const error = await loginUser(data);
    if (error) {
      setErrorText("البريد الإلكتروني او الرقم السري غير صحيح");
      setShowModal(true);
      setIsLoading(false);
    } else {
      navigation.navigate("Home");
      setIsLoading(false);
    }
  };

  // on submit error
  const onError = (errors: any) => {
    // console.error("Form Errors:", errors);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {isLoading && <LoadingIcon />}
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

            <Controller
              control={control}
              rules={{
                maxLength: 50,
                required: {
                  value: true,
                  message: "البريد الالكتروني يجب ادخاله",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  placeHolder="البريد إلالكتروني"
                  inputStyle="my-4"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            <Text
              style={{ fontFamily: "TajwalBold" }}
              className="-mt-4 mb-4 flex items-start"
            >
              {errors.email && "هناك خطأ في البريد الالكتروني"}
            </Text>

            <Controller
              control={control}
              rules={{
                maxLength: 50,
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                // <TextInput
                //   placeholder="Last name"
                //   onBlur={onBlur}
                //   onChangeText={onChange}
                //   value={value}
                // />
                <FormInput
                  placeHolder="كلمة السر"
                  isPassword={true}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="password"
            />

            <TouchableOpacity className="my-3 items-start ml-2">
              <Text
                style={{ fontFamily: "TajwalBold" }}
                className="text-theme-quinary"
              >
                نسيت كلمة السر ؟
              </Text>
            </TouchableOpacity>

            <FormButton
              onPress={handleSubmit(onSubmit, onError)}
              title="تسجيل الدخول"
            />
          </View>

          <View className="flex flex-row justify-center">
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{ fontFamily: "TajwalBold" }}
                className="text-theme-primary mr-2"
              >
                إنشاء حساب
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
            onPress={() => setShowModal(false)}
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

export default LoginScreen;
