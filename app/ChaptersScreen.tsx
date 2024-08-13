import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ChapterCard from "@/components/ChapterCard/ChapterCard";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getChapters } from "@/services/chaptersService";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useNavigation } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAppSelector } from "@/hooks/reduxHooks";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import { RootNavigationParamList } from "@/navigation/StackNavigation";

type ChaptersScreenRouteProp = RouteProp<RootNavigationParamList, "Chapters">;
type ChapterScreenNavigationProp =
  DrawerNavigationProp<RootNavigationParamList>;

export type ChapterType = {
  chapId: string;
  chapterNumber: number;
  numOfQuizs: string;
  reward: string;
  title: string;
  isCompeleted: boolean;
};

const ChaptersScreen = () => {
  const [chapters, setChapters] = useState<ChapterType[]>([]);
  const [confirmStartModal, setConfirmStartModal] = useState(false);
  const [warnChapterSelect, setWarnChapterSelect] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [chapterItem, setChapterItem] = useState<ChapterType>(
    {} as ChapterType
  );

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
            isCompeleted: chapter.isCompleted,
          }))
          .sort((a, b) => a.chapterNumber - b.chapterNumber);
        setChapters(chaptersList);
        setIsloading(false);
      } else {
        setIsloading(false);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const onStartBtn = (item: ChapterType) => {
    setChapterItem(item);
    // console.log(item.chapId);
    const indexOfChap = chapters.findIndex(
      (chap) => item.chapId == chap.chapId
    );
    if (indexOfChap == 0) {
      // show modal w l donia tmm
      setConfirmStartModal(true);
    } else {
      if (
        userInfo.completedChapters.includes(chapters[indexOfChap - 1].chapId)
      ) {
        // show modal w l donia tmm
        setConfirmStartModal(true);
      } else {
        // not valid and should choose the prev chapters
        setWarnChapterSelect(true);
      }
    }
    // console.log(chapters.findIndex((chap) => item.chapId == chap.chapId));

    // console.log(chapters.indexOf(item));
    // console.log(item.isCompeleted, item.chapId);
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
        {/* confirm start exam modal */}
        <ModalMessage
          modalBtnTitle="نعم جاهز"
          modalTitle="رسالة تأكيد!"
          modalDesc="يرجى العلم أنه يتم احتساب النقاط في حالة الفوز في المحاولة الأولى فقط، هل أنت مستعد حقا للبدء؟"
          showModal={confirmStartModal}
          onPressBtn={() => {
            setConfirmStartModal(false);
            navigation.navigate("Quiz", {
              topicId,
              chapterId: chapterItem.chapId,
              chapterReward: chapterItem.reward,
            });
          }}
          modalBtnTitleTwo="ليس الآن"
          onPressBtnTwo={() => {
            setConfirmStartModal(false);
          }}
        />
        {/* confirm start exam modal */}
        <ModalMessage
          showModal={warnChapterSelect}
          modalBtnTitle="فهمت"
          modalDesc="يجب إجتياز الشابتر السابق اولا"
          modalTitle="تحذير"
          onPressBtn={() => {
            setWarnChapterSelect(false);
          }}
        />
      </View>
    </>
  );
};

export default ChaptersScreen;
