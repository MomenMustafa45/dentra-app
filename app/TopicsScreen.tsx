import { View, Text, Image, FlatList } from "react-native";
import DENTALBIOMATERIALS from "../assets/images/DENTALBIOMATERIALS.png";
import GENERALPHARMACOLOGY from "../assets/images/GENERALPHARMACOLOGY.png";
import ORALHISTOLOGY from "../assets/images/ORALHISTOLOGY.png";
import GENERALPATHOLOGY from "../assets/images/GENERALPATHOLOGY.png";
import ORALPATHOLOGY from "../assets/images/ORALPATHOLOGY.png";
import GENERALMICROBIOLOGY from "../assets/images/GENERALMICROBIOLOGY.png";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "@/navigation/StackNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootDrawerParamList } from "@/navigation/DrawerNavigation";
const topics = [
  { title: "DENTAL BIOMATERIALS", img: DENTALBIOMATERIALS },
  { title: "GENERAL PHARMACOLOGY", img: GENERALPHARMACOLOGY },
  { title: "ORAL HISTOLOGY", img: ORALHISTOLOGY },
  { title: "GENERAL PATHOLOGY", img: GENERALPATHOLOGY },
  { title: "ORAL PATHOLOGY", img: ORALPATHOLOGY },
  { title: "GENERAL MICROBIOLOGY", img: GENERALMICROBIOLOGY },
];

type TopicsScreenNavigationProp = StackNavigationProp<
  RootDrawerParamList,
  "Chapters"
>;

const TopicsScreen = () => {
  const navigation = useNavigation<TopicsScreenNavigationProp>();

  const onTopicPressHandler = () => {
    navigation.navigate("Chapters");
  };

  return (
    <View className="flex-1 px-4">
      <View className="flex-1 items-center justify-center">
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={topics}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={onTopicPressHandler}
              className="mx-2 items-center min-w-[120px] max-w-[150px]"
            >
              <View className="w-[120px] h-[120px] rounded-full overflow-hidden">
                <Image source={item.img} className="w-full h-full" />
              </View>
              <Text
                style={{ fontFamily: "TajwalBold", maxWidth: 120 }}
                className="text-theme-quinary text-lg mt-2 text-center"
              >
                {item.title}
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
  );
};

export default TopicsScreen;
