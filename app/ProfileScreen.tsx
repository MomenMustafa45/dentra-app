import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import { resetUserScore } from "@/services/userServices";
import { withdrawReg } from "@/services/withdrawServices";
import {
  useForm,
  Controller,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";

type WithdrawFormData = {
  phoneNumber: string;
};

const ProfileScreen = () => {
  const [isLoading, setIsloading] = useState(false);
  const [showModalNotice, setShowModalNotice] = useState(false);
  const [showModalLimit, setShowModalLimit] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [pounds, setPounds] = useState(0);
  const userInfo = useAppSelector((state) => state.userInfo.unserInfo);
  const dispatch = useAppDispatch();
  // form for phone number
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawFormData>();
  // const onSubmit = (data) => console.log(data);

  function pointsToPounds(points: string) {
    const conversionRate = 50 / 1000;

    const pounds = parseInt(points) * conversionRate;
    setPounds(pounds);
  }

  useEffect(() => {
    pointsToPounds(userInfo.score);
  }, [userInfo.score]);

  const withdrawReqHandler: SubmitHandler<WithdrawFormData> = async (
    dataInput
  ) => {
    if (userInfo.score < "1000") {
      setShowModalLimit(true);
      return;
    }
    setIsloading(true);
    await withdrawReg(
      userInfo.id,
      userInfo.name,
      userInfo.score,
      pounds.toString(),
      dataInput.phoneNumber
    );
    await resetUserScore(userInfo.id, dispatch);
    setShowModalSuccess(true);
    setIsloading(false);
  };

  return (
    <View className="flex-1">
      {isLoading && <LoadingIcon />}
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
                className="text-center text-2xl text-theme-quinary"
              >
                نقاطك الحالية:
              </Text>
              <Text
                style={{ fontFamily: "TajwalReg" }}
                className="text-center text-6xl text-theme-primary my-3"
              >
                {userInfo.score}
              </Text>
            </View>
            {/*  */}
            <View className="my-5">
              <Text
                style={{ fontFamily: "TajwalReg" }}
                className="text-center text-2xl text-theme-quinary"
              >
                يعادل بالجنيه:
              </Text>
              <Text
                style={{ fontFamily: "TajwalReg" }}
                className="text-center text-6xl text-theme-primary mt-3"
              >
                {pounds}
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
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: "يجب إدخال رقم الهاتف" },
                  pattern: {
                    value: /^01[0-2,5]{1}\d{8}$/,
                    message: "رقم الهاتف غير صحيح",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="ادخل رقم المحفظة"
                    className=" bg-theme-secondry text-center w-3/4 mx-auto py-2 rounded-full text-lg"
                    keyboardType="number-pad"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phoneNumber"
              />
              <Text
                style={{ fontFamily: "TajwalReg", lineHeight: 20 }}
                className="text-red-500 text-center w-3/4 mx-auto mt-1"
              >
                {errors.phoneNumber && errors.phoneNumber.message}
              </Text>

              <TouchableOpacity
                className="bg-theme-primary  w-1/2 my-5 mx-auto py-2 rounded-full"
                onPress={handleSubmit(withdrawReqHandler)}
              >
                <Text
                  style={{ fontFamily: "TajwalReg" }}
                  className="text-white text-lg text-center"
                >
                  طلب سحب
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-theme-primary w-40 mx-auto py-2 rounded-full"
                onPress={() => setShowModalNotice(true)}
              >
                <Text
                  style={{ fontFamily: "TajwalReg" }}
                  className="text-white text-sm text-center"
                >
                  مهم جدًا قبل الطلب
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="h-20 justify-center items-center bg-slate-500">
        <Text>Advertisement</Text>
      </View>
      {/* Modal text */}
      <ModalMessage
        modalTitle="عزيزي المستخدم"
        modalDesc="تم ارسال طلبك بنجاح!"
        modalBtnTitle="فهمت"
        showModal={showModalSuccess}
        onPressBtn={() => setShowModalSuccess(false)}
      />
      {/* Modal text */}
      {/* Modal text */}
      <ModalMessage
        modalTitle="عزيزي المستخدم"
        modalDesc="الحد الأدني للسحب هو 50 جنيه"
        modalBtnTitle="فهمت"
        showModal={showModalLimit}
        onPressBtn={() => setShowModalLimit(false)}
      />
      {/* Modal text */}
      {/* Modal text */}
      <ModalMessage
        modalTitle="عزيزي المستخدم"
        modalDesc="يرجى العلم بأن استخدام أي طرق غش أو تحايل داخل التطبيق يعتبر انتهاكًا صارخًا لشروط الاستخدام. نحن نتابع جميع الأنشطة على التطبيق، وفي حال اكتشاف أي استخدام غير قانوني أو مخالف للقواعد، سيتم إغلاق حسابك بشكل دائم ودون سابق إنذار.
كما نود أن نوضح أنه في حال إغلاق الحساب بسبب استخدام طرق غير مشروعة، لن تتم إعادة أي أموال أو نقاط مكتسبة. نرجو منك الالتزام بقواعد الاستخدام لضمان تجربة آمنة وعادلة للجميع.
شكرًا لتفهمك وتعاونك."
        modalBtnTitle="فهمت"
        showModal={showModalNotice}
        onPressBtn={() => setShowModalNotice(false)}
      />
      {/* Modal text */}
    </View>
  );
};

export default ProfileScreen;
