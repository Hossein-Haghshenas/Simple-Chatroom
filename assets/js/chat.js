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

import { displayChat, deleteChat } from "./ui.js";

/* live Connect to the database */

async function getInformationLive(db) {
  try {
    const q = query(collection(db, "Chats"));
    await onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          displayChat(change.doc.data(), change.doc.id);
        } else if (change.type === "removed") {
          deleteChat(change.doc.data(), change.doc.id);
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
    this.room = document.querySelector(".room-active").id;
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

  sendForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data1 = new chatRoom("Hossein");
    data1.addChat(messageText.value);
    messageText.value = "";
  });
};

newMessage();

/* delete Message  */

const deleteMessage = (Messages) => {
  Messages.addEventListener("click", function (e) {
    const data1 = new chatRoom("Hossein");
    data1.deleteChat(this.getAttribute("data-id"));
  });
};

/* rooms */

function filterByRoom(message) {
  const rooms = document.querySelectorAll(".room-btn");

  for (const room of rooms) {
    room.addEventListener("click", function (e) {
      rooms.forEach((elem) => {
        elem.classList.remove("room-active");
      });
      e.target.classList.add("room-active");

      const activeRoom = document.querySelector(".room-active").id;

      if (message.getAttribute("data-room") !== activeRoom) {
        message.classList.add("d-none");
      } else {
        message.classList.remove("d-none");
      }
    });
  }
}

export { deleteMessage, filterByRoom };
