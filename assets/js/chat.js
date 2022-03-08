import {
  db,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  Timestamp,
} from "./app.js";

async function getInformation(db) {
  try {
    const getData = await collection(db, "Chats");
    const getDocument = await getDocs(getData);
    const document = getDocument.docs.map((doc) => doc.data());
    console.log(document);
    return document;
  } catch (error) {
    console.log(`something is wrong ${error}`);
  }
}
getInformation(db);
