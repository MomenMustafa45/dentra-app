import db from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getTopics = async (userInfo: any) => {
  try {
    // @ts-ignore
    const { university, level } = userInfo;

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
    // console.log(error);
  }
};
