import db from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getQuizs = async (
  topicId: string,
  chapterId: string,
  userInfo: any
) => {
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
      "chapters",
      chapterId,
      "questions"
    );
    const questionsSnapshot = await getDocs(chaptersCollectionRef);
    const questionsData: object[] = questionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return questionsData;
  } catch (error) {
    console.log(error, "hello from questions service");
  }
};
