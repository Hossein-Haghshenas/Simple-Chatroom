import { deleteMessage } from "./chat.js";

/* show chats on the window */

const displayChat = (data, id) => {
  const Container = document.querySelector("#messages-list");

  /* Create li for new Message  */
  const newMessages = document.createElement("li");
  newMessages.classList.add("message");
  newMessages.setAttribute("data-id", id);

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

  /* Create time format*/

  function time(data) {
    let hour = new Date(data * 1000).getHours();
    let minutes = new Date(data * 1000).getMinutes();
    hour = hour < 10 ? `0${hour}` : hour;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour}:${minutes}`;
  }

  /* delete message function */
  deleteMessage(newMessages);
};

export { displayChat };
