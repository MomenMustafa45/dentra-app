import db from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";

export const withdrawReg = async (
  userId: string,
  userName: string,
  userScore: string,
  userMoney: string,
  phoneNumber: string
) => {
  try {
    const withdrawRequestsRef = collection(db, "withdrawRequests");
    await addDoc(withdrawRequestsRef, {
      userId,
      userName,
      userScore,
      userMoney,
      phoneNumber,
    });
    console.log("Withdraw request added successfully!");
  } catch (error) {
    console.error("Error adding withdraw request: ", error);
  }
};
