import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import DropdownList, { Data } from "@/components/DropdownList/DropdownList";
import FormButton from "@/components/FormButton/FormButton";
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { User, Users, universities as uniTest } from "@/utils/DummyData";
import { StackNavigationProp } from "@react-navigation/stack";
import db from "@/config/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { getUniversities, registerUser } from "@/services/userServices";

type RootStackParamList = {
  SelectLevel: { data: FormData };
};

type SelectLevelRouteProp = RouteProp<RootStackParamList, "SelectLevel">;
type RegisterScreenProp = StackNavigationProp<RootStackParamList>;

const SelectLevelScreen = () => {
  const [showModal, setShowModal] = useState(false);
  // universities
  const [universities, setUniversities] = useState<any>([]);

  // levels index
  const [currentIdx, setCurrentIdx] = useState(0);

  // // uni
  // const [university, setUnversity] = useState({});

  //
  const route = useRoute<SelectLevelRouteProp>();
  const navigation = useNavigation<RegisterScreenProp>();

  // getting the univs
  useEffect(() => {
    const getUnis = async () => {
      try {
        const universities = await getUniversities();
        setUniversities([...universities]);
      } catch (error) {
        console.error("Error fetching universities: ", error);
      }
    };

    getUnis();
  }, []);

  const { data } = route.params;
  // object of university and level select
  const [level, setLevel] = useState(null);
  const [univs, setUnivs] = useState(null);

  const onUniversityChangeHandler = (univ: Data) => {
    // @ts-ignore
    setUnivs({ ...univ });

    const indxOfUni = universities.findIndex(
      (u: any) => u.id.toString() == univ.id?.toString()
    );
    setCurrentIdx(indxOfUni);
  };

  const onLevelChangeHandler = (lvl: Data) => {
    console.log(lvl);
    // level = lvl;
    // @ts-ignore
    setLevel({ ...lvl });
  };

  const startBtnHandler = async () => {
    try {
      if (univs && level) {
        // @ts-ignore
        const { email, name, phoneNumber, password } = data;

        await registerUser({
          email,
          password,
          name,
          phoneNumber,
          universityId: universities[currentIdx].id,
          // @ts-ignore
          levelId: level?.id,
        });

        navigation.dispatch(
          CommonActions.reset({ index: 0, routes: [{ name: "Home" }] })
        );
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
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
            data={universities[currentIdx]?.levels}
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
