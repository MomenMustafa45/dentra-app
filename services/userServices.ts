import db, { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const registerUser = async (value: {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  universityId: string;
  levelId: string;
}) => {
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

  console.log(res);
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
