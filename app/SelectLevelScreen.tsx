import { View, Text } from "react-native";
import React from "react";
import DropdownList, { Data } from "@/components/DropdownList";
import FormButton from "@/components/FormButton";

const emojisWithIcons: Data[] = [
  { title: "جامعة الجاهرة", value: "option 1" },
  { title: "جامعة الازهر", value: "option 2" },
  { title: "جامعة بني سويف الاهلية", value: "option 3" },
  { title: "جامعهة عين شمس", value: "option 4" },
  { title: "جامعة حلوان", value: "option 5" },
  { title: "جامعة اسوان", value: "option 6" },
  { title: "جامعة اسيوط", value: "option 7" },
];

const SelectLevelScreen = () => {
  return (
    <View className="flex-1 px-4">
      <View className=" flex-1 pt-20">
        <View className="my-5">
          <DropdownList
            data={emojisWithIcons}
            dropdownTitle="في أي جامعة تدرس؟"
            dropdownPlaceHolder="أختر الجامعة"
          />
        </View>
        {/*  */}
        <View className=" my-5">
          <DropdownList
            data={emojisWithIcons}
            dropdownTitle="في اي مستوي مقيد؟"
            dropdownPlaceHolder="أختر المستوي"
          />
        </View>
      </View>
      <FormButton title="لنبدأ" />
    </View>
  );
};

export default SelectLevelScreen;
