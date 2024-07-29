import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
import { Noop } from "react-hook-form";

type FormInputProps = {
  placeHolder: string;
  isPassword?: boolean;
  inputStyle?: string;
  keyboardType?: KeyboardTypeOptions;
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: string;
};

const FormInput = ({
  placeHolder,
  isPassword,
  inputStyle,
  keyboardType = "default",
  onChange,
  onBlur,
  value,
}: FormInputProps) => {
  return (
    <TextInput
      onChangeText={onChange}
      onBlur={onBlur}
      value={value}
      keyboardType={keyboardType}
      secureTextEntry={isPassword}
      placeholder={placeHolder}
      className={`px-4 py-4 bg-theme-secondry rounded-full text-base text-theme-quinary ${inputStyle}`}
      style={{ fontFamily: "TajwalReg", textAlign: "right" }}
    />
  );
};

export default FormInput;
