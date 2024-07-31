import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootDrawerParamList } from "@/navigation/DrawerNavigation";

type ChapterCardProp = {
  item: { name: string; questionsNum: number; finished: boolean };
  index: number;
};

type ChapterCardNavigationProp = NavigationProp<RootDrawerParamList>;

const ChapterCard = ({ item, index }: ChapterCardProp) => {
  const navigation = useNavigation<ChapterCardNavigationProp>();

  const startQuiz = () => {
    navigation.navigate("Quiz");
  };

  return (
    <View className="my-2 rounded py-3 px-3 shadow-xl bg-theme-quaternary shadow-slate-950 border-theme-quinary border-[1px]">
      <Text
        className="text-theme-quinary text-lg"
        style={{ fontFamily: "TajwalBold" }}
      >
        Chapter {index + 1}: {item.name}
      </Text>
      <View className="flex-row justify-between items-center">
        <Text
          className="text-xs text-theme-quinary"
          style={{ fontFamily: "TajwalBold" }}
        >
          Number of questions: {item.questionsNum}
        </Text>
        <TouchableOpacity
          onPress={startQuiz}
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
