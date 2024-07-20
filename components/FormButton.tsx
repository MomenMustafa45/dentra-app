import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type FormButtonProps = {
  title: string;
  btnStyle?: string;
};

const FormButton = ({ title, btnStyle }: FormButtonProps) => {
  return (
    <TouchableOpacity
      className={`items-center bg-theme-primary rounded-3xl p-3 my-5 ${btnStyle}`}
    >
      <Text
        className="font-bold text-theme-quaternary text-xl"
        style={{ fontFamily: "TajwalReg" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;
