import { Text, TouchableOpacity } from "react-native";
import React from "react";

type FormButtonProps = {
  title: string;
  btnStyle?: string;
  onPress: () => void;
};

const FormButton = ({ title, btnStyle, onPress }: FormButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      className={`items-center bg-theme-primary rounded-3xl p-3 my-5 ${btnStyle}`}
    >
      <Text
        className="text-theme-quaternary text-xl"
        style={{ fontFamily: "TajwalReg" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;
