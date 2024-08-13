import { View, Text, Image, FlatList, BackHandler, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { getTopics } from "@/services/topicService";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import { RootNavigationParamList } from "@/navigation/StackNavigation";
import AdBanner from "@/components/AdBanner/AdBanner";
import AdInterstitial from "@/components/AdInterstitial/AdInterstitial";
import { getUserById } from "@/services/userServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TopicsScreenNavigationProp = StackNavigationProp<
  RootNavigationParamList,
  "Chapters"
>;
type TopicType = { id: string; img: string; name: string };

const TopicsScreen = () => {
  const [isLoading, setIsloading] = useState(false);
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [exitConfirmModal, setExitConfirmModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const navigation = useNavigation<TopicsScreenNavigationProp>();

  const onTopicPressHandler = (item: TopicType) => {
    navigation.navigate("Chapters", { topicId: item.id });
  };

  const topicsData = async () => {
    try {
      setIsloading(true);

      const user = await AsyncStorage.getItem("userInfo");
      if (user) {
        getUserById(JSON.parse(user).id, dispatch);
        console.log(JSON.parse(user));

        const res: any = await getTopics(JSON.parse(user));
        if (res) setTopics(res);
      }
      setIsloading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    topicsData();
  }, []);

  const confirmExitApp = () => {
    Alert.alert("تنبيه!", "هل أنت متأكد انك تريد الخروج من التطبيق؟", [
      {
        text: "لا",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "نعم",
        onPress: () => {
          BackHandler.exitApp();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Splash" }],
            })
          );
        },
      },
    ]);
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
      </View>
      {/* <View className="bg-[#995353] min-h-[50px]">
        <AdInterstitial />
      </View> */}
      {/* <AdBanner /> */}
    </>
  );
};

export default TopicsScreen;
