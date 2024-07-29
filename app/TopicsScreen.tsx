import { View, Text, Image, FlatList } from "react-native";
import dentalanatomyImg from "../assets/images/dentalanatomy.png";
import anatomyImg from "../assets/images/anatomy.png";
import physoilogyImg from "../assets/images/physoilogy.png";
import histologyImg from "../assets/images/histology.png";
import biochemistryImg from "../assets/images/biochemistry.png";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const topics = [
  { title: "Dental Anatomy", img: dentalanatomyImg },
  { title: "Anatomy", img: anatomyImg },
  { title: "Physiology", img: physoilogyImg },
  { title: "Histology", img: histologyImg },
  { title: "Biochemistry", img: biochemistryImg },
];

const TopicsScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 px-4">
      <View className="flex-1 items-center justify-center">
        <FlatList
          data={topics}
          renderItem={({ item }) => (
            <View className="mx-2 flex items-center">
              <View className="w-[150px] h-[150px] rounded-full overflow-hidden">
                <Image source={item.img} className="w-full h-full" />
              </View>
              <Text
                style={{ fontFamily: "TajwalBold" }}
                className="text-theme-quinary text-xl mt-2"
              >
                {item.title}
              </Text>
            </View>
          )}
          numColumns={2}
          contentContainerStyle={{
            paddingVertical: 30,
            rowGap: 20,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
        />
      </View>
    </View>
  );
};

export default TopicsScreen;
