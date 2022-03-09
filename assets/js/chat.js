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
          displayChat(change.doc.data());
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

/* show chats on the window */

const displayChat = (data) => {
  const Container = document.querySelector("#messages-list");

  /* Create li for new Message  */
  const newMessages = document.createElement("li");
  newMessages.classList.add("message");
  /* Message name */
  const messagesName = document.createElement("span");
  messagesName.classList.add("message-username");
  messagesName.textContent = `${data.username} says :`;
  /* Message text */
  const messagesText = document.createElement("span");
  messagesText.classList.add("message-text");
  messagesText.textContent = data.message;
  /* Message time */
  const messagesTime = document.createElement("span");
  messagesTime.classList.add("message-time");
  messagesTime.textContent = time(data.created_at);

  /* append all */
  newMessages.append(messagesName, messagesText, messagesTime);
  Container.appendChild(newMessages);

  function time(data) {
    let hour = new Date(data * 1000).getHours();
    let minutes = new Date(data * 1000).getMinutes();
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour}:${minutes}`;
  }
};

getInformationLive(db);
