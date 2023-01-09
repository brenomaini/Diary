const formSendButton = document.getElementById("CreateUser");
const error = document.getElementById("Error");
const password = document.getElementById("Password");
const cpassword = document.getElementById("CPassword");

cpassword.addEventListener("keyup", () => {
  if (cpassword.value != password.value) {
    error.textContent = "Password not match";
  } else {
    error.textContent = "";
  }
});

formSendButton.addEventListener("click", (e) => {
  if (password.value != cpassword.value) {
    e.preventDefault();
    error.textContent = "Password not match";

    return;
  }
});
