import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootNavigationParamList } from "@/navigation/StackNavigation";
import ModalMessage from "../ModalMessage/ModalMessage";

type SplashScreenNavigationProp = DrawerNavigationProp<RootNavigationParamList>;

const DrawerContent = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const [activeRoute, setActiveRoute] = React.useState<number | undefined>(0);
  const [confirmExitModal, setConfirmExitModal] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      const route = e.data.state.routes[e.data.state.index].state?.index;

      setActiveRoute(route);
    });

    return unsubscribe;
  }, [navigation]);

  const signOutHandler = () => {
    setConfirmExitModal(true);
  };

  return (
    <View className="px-3 py-10 flex justify-between flex-1">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("AboutUs")}
          className={`${activeRoute == 5 ? "bg-theme-tertiary" : ""} p-2 my-2`}
        >
          <Text style={{ fontFamily: "TajwalBold" }}>ما هو دنترا؟</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${activeRoute == 7 ? "bg-theme-tertiary" : ""} p-2 my-2`}
          onPress={() => {
            navigation.navigate("Politics");
          }}
        >
          <Text style={{ fontFamily: "TajwalBold" }}>سياسة الخصوصية</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${activeRoute == 6 ? "bg-theme-tertiary" : ""} p-2 my-2`}
          onPress={() => {
            navigation.navigate("CommonQuizs");
          }}
        >
          <Text style={{ fontFamily: "TajwalBold" }}>أسئلة شائعة</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${activeRoute == 1 ? "bg-theme-tertiary" : ""} p-2 my-2`}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text style={{ fontFamily: "TajwalBold" }}>الرصيد</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={signOutHandler} className="p-2 my-2">
          <Text style={{ fontFamily: "TajwalBold" }}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
      {/* confirm exit modal */}
      <ModalMessage
        modalBtnTitle="نعم"
        modalTitle="تنبيه!"
        modalDesc="هل انت متأكد من الخروج من الحساب؟"
        showModal={confirmExitModal}
        onPressBtn={() => {
          setConfirmExitModal(false);
          navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: "Landing" }] })
          );
        }}
        modalBtnTitleTwo="لأ"
        onPressBtnTwo={() => {
          setConfirmExitModal(false);
        }}
      />
      {/* confirm exit modal */}
    </View>
  );
};

export default DrawerContent;
