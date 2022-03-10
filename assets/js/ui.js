import { deleteMessage, filterByRoom } from "./chat.js";

/* show chats on the window */

const displayChat = (data, id) => {
  const Container = document.querySelector("#messages-list");
  const messageDisplay = document.querySelector(".message-display");

  /* Create li for new Message  */
  const newMessages = document.createElement("li");
  /* set class and animation class */
  newMessages.classList.add(
    "message",
    "animate__animated",
    "animate__fadeInLeft"
  );

  newMessages.setAttribute("data-id", id);
  newMessages.setAttribute("data-room", data.room);

  /* filter by room */
  data.room !== document.querySelector(".room-active").id ? newMessages.classList.add("d-none") : null;
  filterByRoom(newMessages);

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
  messageDisplay.scrollTo(0, messageDisplay.scrollHeight);
  /* Create time format*/

  function time(data) {
    let hour = new Date(data * 1000).getHours();
    let minutes = new Date(data * 1000).getMinutes();
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour}:${minutes}`;
  }

  /* delete message from database function */
  deleteMessage(newMessages);
};

/* delete chats from ui  */

const deleteChat = (chat, id) => {
  const chats = document.querySelectorAll(".message");
  chats.forEach((elem) => {
    if (elem.getAttribute("data-id") === id) {
      /* set nimation class */
      elem.classList.replace("animate__fadeInLeft", "animate__fadeOutRightBig");
      /* remove */
      setTimeout(() => {
        elem.remove();
      }, 100);
    } else {
      elem;
    }
  });
};

export { displayChat, deleteChat };
