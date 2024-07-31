import db from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs } from "firebase/firestore";

export const getTopics = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");

    // @ts-ignore
    const { university, level } = JSON.parse(userInfo);

    const topicsCollectionRef = collection(
      db,
      "universities",
      university,
      "levels",
      level,
      "topics"
    );
    const topicsSnapshot = await getDocs(topicsCollectionRef);
    const topicsData: object[] = topicsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return topicsData;
  } catch (error) {
    console.log(error);
  }
};
