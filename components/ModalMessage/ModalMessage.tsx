import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";

type ModalMessageProp = {
  showModal: boolean;
  onPressBtn: (...item: any) => void;
  modalTitle: string;
  modalDesc: string;
  modalBtnTitle: string;
};

const ModalMessage = ({
  showModal,
  onPressBtn,
  modalTitle,
  modalDesc,
  modalBtnTitle,
}: ModalMessageProp) => {
  return (
    <Modal
      isVisible={showModal}
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      animationOutTiming={500}
      backdropOpacity={0.9}
    >
      <View className="h-52 bg-white items-center justify-between py-4 rounded-lg shadow">
        <Text
          style={{ fontFamily: "TajwalBold" }}
          className="text-theme-quinary text-center text-3xl"
        >
          {modalTitle}
        </Text>
        <Text
          style={{ fontFamily: "TajwalReg" }}
          className="text-theme-quinary text-center text-lg"
        >
          {modalDesc}
        </Text>
        <TouchableOpacity
          className="bg-theme-primary px-6 py-1 rounded-lg"
          onPress={() => {
            onPressBtn();
          }}
        >
          <Text
            style={{ fontFamily: "TajwalBold" }}
            className="text-theme-quaternary text-center text-lg"
          >
            {modalBtnTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalMessage;
