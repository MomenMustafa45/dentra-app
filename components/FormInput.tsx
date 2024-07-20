import { View, Text, TextInput } from "react-native";
import React from "react";

type FormInputProps = {
  placeHolder: string;
  isPassword?: boolean;
  inputStyle?: string;
};

const FormInput = ({ placeHolder, isPassword, inputStyle }: FormInputProps) => {
  return (
    <TextInput
      secureTextEntry={isPassword}
      placeholder={placeHolder}
      className={`px-4 py-4 bg-theme-secondry rounded-full text-base text-theme-quinary ${inputStyle}`}
      style={{ fontFamily: "TajwalReg", textAlign: "right" }}
    />
  );
};

export default FormInput;
