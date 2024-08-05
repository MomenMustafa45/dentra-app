import { View, Text, Image, FlatList, BackHandler } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { getTopics } from "@/services/topicService";
import { useAppSelector } from "@/hooks/reduxHooks";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import { RootNavigationParamList } from "@/navigation/StackNavigation";

type TopicsScreenNavigationProp = StackNavigationProp<
  RootNavigationParamList,
  "Chapters"
>;
type TopicType = { id: string; img: string; name: string };

const TopicsScreen = () => {
  const userInfo = useAppSelector((state) => state.userInfo.unserInfo);
  const [isLoading, setIsloading] = useState(false);
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [exitConfirmModal, setExitConfirmModal] = useState<boolean>(false);

  const navigation = useNavigation<TopicsScreenNavigationProp>();

  const onTopicPressHandler = (item: TopicType) => {
    navigation.navigate("Chapters", { topicId: item.id });
  };

  const topicsData = async () => {
    try {
      setIsloading(true);
      const res: any = await getTopics(userInfo);

      if (res) setTopics(res);
      setIsloading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    topicsData();
  }, []);

  // exit handler

  const handleExitApp = () => {
    setExitConfirmModal(false);
    BackHandler.exitApp();
  };

  const confirmExitApp = () => {
    setExitConfirmModal(true);
    return true;
  };
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", confirmExitApp);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", confirmExitApp);
      };
    }, [])
  );

  return (
    <>
      {isLoading && <LoadingIcon />}
      <View className="flex-1 px-4">
        <View className="flex-1 items-center justify-center">
          <FlatList
            style={{ flex: 1, width: "100%" }}
            data={topics}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onTopicPressHandler(item);
                }}
                className="mx-2 items-center min-w-[120px] max-w-[150px]"
              >
                <View className="w-[120px] h-[120px] rounded-full overflow-hidden">
                  <Image source={{ uri: item.img }} className="w-full h-full" />
                </View>
                <Text
                  style={{ fontFamily: "TajwalBold", maxWidth: 120 }}
                  className="text-theme-quinary text-lg mt-2 text-center"
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={2}
            contentContainerStyle={{
              paddingVertical: 30,
              rowGap: 20,
            }}
            columnWrapperStyle={{
              justifyContent: "space-evenly",
            }}
          />
        </View>
        {/* Modal confirm exit */}
        <ModalMessage
          showModal={exitConfirmModal}
          modalBtnTitle="نعم"
          modalDesc="هل أنت متأكد انك تريد الخروج من التطبيق؟"
          modalTitle="تنبيه!"
          onPressBtn={handleExitApp}
          modalBtnTitleTwo="لا"
          onPressBtnTwo={() => {
            setExitConfirmModal(false);
          }}
        />
      </View>
    </>
  );
};

export default TopicsScreen;
