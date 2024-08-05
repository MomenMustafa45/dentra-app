import db from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getChapters = async (topicId: string, userInfo: any) => {
  try {
    // @ts-ignore

    const chaptersCollectionRef = collection(
      db,
      "universities",
      userInfo.universityId,
      "levels",
      userInfo.levelId,
      "topics",
      topicId,
      "chapters"
    );
    const chaptersSnapshot = await getDocs(chaptersCollectionRef);
    const chaptersData: object[] = chaptersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return chaptersData;
  } catch (error) {
    // console.log(error, "hello from chapt service");
  }
};
