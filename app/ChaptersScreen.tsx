import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import ChapterCard from "@/components/ChapterCard/ChapterCard";

const chapters = [
  { id: 1, name: "title of chapter", questionsNum: 50, finished: false },
  { id: 2, name: "title of chapter", questionsNum: 50, finished: false },
  { id: 3, name: "title of chapter", questionsNum: 50, finished: false },
  { id: 4, name: "title of chapter", questionsNum: 50, finished: false },
  { id: 5, name: "title of chapter", questionsNum: 50, finished: false },
  { id: 6, name: "title of chapter", questionsNum: 50, finished: false },
];

const ChaptersScreen = () => {
  return (
    <View className="px-4 flex-1 py-5">
      <FlatList
        data={chapters}
        renderItem={({ item, index }) => {
          return <ChapterCard item={item} index={index} />;
        }}
      />
    </View>
  );
};

export default ChaptersScreen;
