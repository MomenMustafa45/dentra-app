import AsyncStorage from "@react-native-async-storage/async-storage";
import db, { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { setUserInfo } from "@/store/userInfoSlice/userInfoSlice";

type ValueType = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  universityId: string;
  levelId: string;
};

export const getUserById = async (userId: string, dispatch: any) => {
  const snap = await getDoc(doc(db, "users", userId));
  const dataUser: any = snap.data();
  dispatch(
    setUserInfo({
      id: userId,
      ...dataUser,
    })
  );
};

export const loginUser = async (
  value: { email: string; password: string },
  dispatch: any
) => {
  try {
    const data = await signInWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    const snap = await getDoc(doc(db, "users", data.user.uid));

    // @ts-ignore
    const dataUser: any = snap.data();

    const userInfo = JSON.stringify({
      id: data.user.uid,
      university: dataUser.universityId,
      level: dataUser.levelId,
    });

    dispatch(
      setUserInfo({
        id: data.user.uid,
        ...dataUser,
      })
    );

    await AsyncStorage.setItem("userInfo", userInfo);
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const registerUser = async (value: ValueType, dispatch: any) => {
  try {
    const data = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );

    await setDoc(doc(db, "users", data.user.uid), {
      id: data.user.uid,
      name: value.name,
      email: value.email,
      phoneNumber: value.phoneNumber,
      universityId: value.universityId,
      levelId: value.levelId,
      score: "0",
      completedChapters: [],
    });

    const snap = await getDoc(doc(db, "users", data.user.uid));
    const dataUser: any = snap.data();

    const objStorage = JSON.stringify({
      id: data.user.uid,
      university: value.universityId,
      level: value.levelId,
    });

    dispatch(
      setUserInfo({
        id: data.user.uid,
        ...dataUser,
        universityId: value.universityId,
        levelId: value.levelId,
        score: "0",
        completedChapters: [],
      })
    );

    await AsyncStorage.setItem("userInfo", objStorage);
  } catch (error) {
    // console.log(error);
  }
};

export const getUniversities = async () => {
  const querySnapshot = await getDocs(collection(db, "universities"));
  const universities = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const subCollectionRef = collection(db, "universities", doc.id, "levels");
      const subCollectionSnapshot = await getDocs(subCollectionRef);
      const levels = subCollectionSnapshot.docs.map((subDoc) => ({
        ...subDoc.data(),
        id: subDoc.id,
      }));

      return { ...data, id: doc.id, levels };
    })
  );

  return universities;
};

export const resetUserScore = async (userId: string, dispatch: any) => {
  try {
    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      score: "0",
    });

    const snap = await getDoc(doc(db, "users", userId));
    const dataUser: any = snap.data();
    dispatch(
      setUserInfo({
        id: userId,
        ...dataUser,
      })
    );
    console.log("Field updated successfully!", dataUser);
  } catch (error) {
    console.error("Error updating field: ", error);
  }
};
