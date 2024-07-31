import AsyncStorage from "@react-native-async-storage/async-storage";
import db, { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

type ValueType = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  universityId: string;
  levelId: string;
};

export const loginUser = async (value: { email: string; password: string }) => {
  try {
    const data = await signInWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    const snap = await getDoc(doc(db, "users", data.user.uid));

    // @ts-ignore
    const { universityId, levelId } = snap.data();

    const userInfo = JSON.stringify({
      id: data.user.uid,
      university: universityId,
      level: levelId,
    });

    await AsyncStorage.setItem("userInfo", userInfo);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const registerUser = async (value: ValueType) => {
  try {
    const data = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );

    const res = await setDoc(doc(db, "users", data.user.uid), {
      id: data.user.uid,
      name: value.name,
      email: value.email,
      phoneNumber: value.phoneNumber,
      universityId: value.universityId,
      levelId: value.levelId,
    });

    const objStorage = JSON.stringify({
      id: data.user.uid,
      university: value.universityId,
      level: value.levelId,
    });

    await AsyncStorage.setItem("userInfo", objStorage);
  } catch (error) {
    console.log(error);
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
