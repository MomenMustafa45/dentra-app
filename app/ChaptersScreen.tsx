import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ChapterCard from "@/components/ChapterCard/ChapterCard";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootDrawerParamList } from "@/navigation/DrawerNavigation";
import { getChapters } from "@/services/chaptersService";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useNavigation } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAppSelector } from "@/hooks/reduxHooks";

type ChaptersScreenRouteProp = RouteProp<RootDrawerParamList, "Chapters">;
type ChapterScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export type ChapterType = {
  chapId: string;
  chapterNumber: number;
  numOfQuizs: string;
  reward: string;
  title: string;
};

const ChaptersScreen = () => {
  const [chapters, setChapters] = useState<ChapterType[]>([]);
  const [isLoading, setIsloading] = useState(false);

  const userInfo = useAppSelector((state) => state.userInfo.unserInfo);

  const navigation = useNavigation<ChapterScreenNavigationProp>();
  const route = useRoute<ChaptersScreenRouteProp>();

  const { topicId } = route.params;

  const chaptersData = async () => {
    try {
      setIsloading(true);
      const data = await getChapters(topicId, userInfo);
      if (data) {
        const chaptersList: ChapterType[] = data
          .map((chapter: any) => ({
            chapId: chapter.chapId,
            chapterNumber: chapter.chapterNumber,
            numOfQuizs: chapter.numOfQuizs,
            reward: chapter.reward,
            title: chapter.title,
          }))
          .sort((a, b) => a.chapterNumber - b.chapterNumber);
        setChapters(chaptersList);
        setIsloading(false);
      } else {
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onStartBtn = (item: ChapterType) => {
    navigation.navigate("Quiz", {
      topicId,
      chapterId: item.chapId,
      chapterReward: item.reward,
    });
  };

  useEffect(() => {
    chaptersData();
  }, [topicId]);
  return (
    <>
      {isLoading && <LoadingIcon />}
      <View className="px-4 flex-1 py-5">
        <FlatList
          data={chapters}
          keyExtractor={(item) => item.chapId}
          renderItem={({ item, index }) => {
            return (
              <ChapterCard
                item={item}
                index={index}
                onStartBtn={() => onStartBtn(item)}
              />
            );
          }}
        />
      </View>
    </>
  );
};

export default ChaptersScreen;
