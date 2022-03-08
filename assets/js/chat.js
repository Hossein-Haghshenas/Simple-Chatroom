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

class chatRoom {
  constructor(username, room) {
    this.username = username;
    this.room = room;
  }
  async addChat(message) {
    const time = new Date();
    const chatData = {
      message,
      username: this.username,
      room: this.room,
      created_at: Timestamp.fromDate(time),
    };
    await setDoc(doc(db, "Chats", "grgdfgfdgfdgfdg"), chatData);
  }
}

const data1 = new chatRoom("hassan", "gaming");
