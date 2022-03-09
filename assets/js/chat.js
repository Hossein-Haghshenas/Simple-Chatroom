// Import the functions from the app.js

import {
  db,
  collection,
  doc,
  setDoc,
  deleteDoc,
  Timestamp,
  onSnapshot,
  query,
} from "./app.js";

import { displayChat } from "./ui.js";

/* live Connect to the database */

async function getInformationLive(db) {
  try {
    const q = query(collection(db, "Chats"));
    await onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          displayChat(change.doc.data(), change.doc.id);
        }
      });
    });
  } catch (error) {
    console.log(`something is wrong ${error}`);
  }
}

getInformationLive(db);

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
    await setDoc(doc(db, "Chats", this.id), chatData);
  }
  async deleteChat(id) {
    await deleteDoc(doc(db, "Chats", id));
  }
}

/* Create and send new Message */

const newMessage = () => {
  const sendForm = document.querySelector("form");
  const messageText = document.querySelector("#message-input");
  const messageDisplay = document.querySelector(".message-display");

  sendForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data1 = new chatRoom("Hossein", "gaming");
    data1.addChat(messageText.value);
    messageText.value = "";
    setTimeout(() => {
      messageDisplay.scrollTo(0, messageDisplay.scrollHeight);
    }, 100);
  });
};

newMessage();

/* delete Message  */

const deleteMessage = (Messages) => {
  Messages.addEventListener("click", function (e) {
    const data1 = new chatRoom("Hossein", "gaming");
    data1.deleteChat(this.getAttribute("data-id"));
    this.remove();
  });
};

export { deleteMessage };
