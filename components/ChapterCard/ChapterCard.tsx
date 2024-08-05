import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChapterType } from "@/app/ChaptersScreen";

type ChapterCardProp = {
  item: ChapterType;
  index: number;
  onStartBtn: () => void;
};

const ChapterCard = ({ item, onStartBtn }: ChapterCardProp) => {
  return (
    <View className="my-2 rounded py-3 px-3 shadow-xl bg-theme-quaternary shadow-slate-950 border-theme-quinary border-[1px]">
      <Text
        className="text-theme-quinary text-lg"
        style={{ fontFamily: "TajwalBold" }}
      >
        {item.title}
      </Text>
      <View className="flex-row justify-between items-center">
        <Text
          className="text-xs text-theme-quinary"
          style={{ fontFamily: "TajwalBold" }}
        >
          Number of questions: {item.numOfQuizs}
        </Text>
        <TouchableOpacity
          onPress={onStartBtn}
          className="bg-theme-primary py-1 px-8 rounded-full"
        >
          <Text
            style={{ fontFamily: "TajwalBold" }}
            className="text-theme-quaternary text-base"
          >
            Start
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChapterCard;
