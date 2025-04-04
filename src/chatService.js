import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// Function to save chat messages
export const saveChatMessage = async (message, userId) => {
  try {
    await addDoc(collection(db, "chats"), {
      message: message,
      userId: userId,
      timestamp: serverTimestamp(),
    });
    console.log("Message sent!");
  } catch (error) {
    console.error("Error saving message:", error);
  }
};
