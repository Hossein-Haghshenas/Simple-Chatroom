const userField = document.querySelector("#Username");
const submitBtn = document.querySelector("#submit-btn");

/* save username in local storage */

submitBtn.addEventListener("click", () => {
  const username = userField.value;
  localStorage.setItem("username", username);
});
