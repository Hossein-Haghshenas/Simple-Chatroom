import {
  db,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  Timestamp,
  onSnapshot,
  query,
  where,
} from "./app.js";

/* connect to the database */

/* async function getInformation(db) {
  try {
    const getData = await collection(db, "Chats");
    const getDocument = await getDocs(getData);
     const document = getDocument.docs.map((doc) => displayChat(doc.data())); 

    return document;
  } catch (error) {
    console.log(`something is wrong ${error}`);
  }
} */

/* live Connect to the database */

async function getInformationLive(db) {
  try {
    const q = query(collection(db, "Chats"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
        }
        if (change.type === "modified") {
        }
        if (change.type === "removed") {
        }
      });
    });
  } catch (error) {
    console.log(`something is wrong ${error}`);
  }
}

/* Create uid */

const uidMaker = () => {
  const partOne = Date.now().toString(36);
  const partTwo = Math.random().toString(36).substring(6);
  return partTwo.concat(partOne);
};

/* chatroom class */
class chatRoom {
  constructor(username, room) {
    this.username = username;
    this.room = room;
    this.id = uidMaker();
  }
  async addChat(message) {
    const time = new Date();
    const chatData = {
      message,
      username: this.username,
      room: this.room,
      created_at: Timestamp.fromDate(time),
    };
    await setDoc(doc(db, "Chats", `${this.id}`), chatData);
  }
}

getInformationLive(db);
