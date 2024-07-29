import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import DropdownList, { Data } from "@/components/DropdownList/DropdownList";
import FormButton from "@/components/FormButton/FormButton";
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { levels, universities, User, Users } from "@/utils/DummyData";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  SelectLevel: { data: FormData };
};

type SelectLevelRouteProp = RouteProp<RootStackParamList, "SelectLevel">;
type RegisterScreenProp = StackNavigationProp<RootStackParamList>;

const SelectLevelScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const route = useRoute<SelectLevelRouteProp>();
  const navigation = useNavigation<RegisterScreenProp>();

  // object of university and level select
  let university: { university: Data } | null = null;
  let level: { level: Data } | null = null;

  const { data } = route.params;

  const onUniversityChangeHandler = (univ: Data) => {
    university = { university: univ };
  };

  const onLevelChangeHandler = (lvl: Data) => {
    level = { level: lvl };
  };

  const startBtnHandler = () => {
    if (university?.university && level?.level) {
      // @ts-ignore
      const user: User = {
        ...data,
        ...level,
        ...university,
        score: 0,
        id: Users.length + 1,
      };
      Users.push(user);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    } else {
      setShowModal(true);
    }
  };

  return (
    <View className="flex-1 px-4">
      <View className=" flex-1 pt-20">
        <View className="my-5">
          <DropdownList
            data={universities}
            dropdownTitle="في أي جامعة تدرس؟"
            dropdownPlaceHolder="اختر الجامعة"
            onChange={onUniversityChangeHandler}
          />
        </View>
        {/*  */}
        <View className=" my-5">
          <DropdownList
            data={levels}
            dropdownTitle="في أي مستوى مقيد؟"
            dropdownPlaceHolder="اختر المستوى"
            onChange={onLevelChangeHandler}
          />
        </View>
      </View>
      <FormButton onPress={startBtnHandler} title="لنبدأ" />
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
            يجب اختيار الجامعة والمستوي
          </Text>
          <TouchableOpacity
            className="bg-theme-primary px-6 py-1 rounded-lg"
            onPress={() => {
              setShowModal(false);
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
    </View>
  );
};

export default SelectLevelScreen;
