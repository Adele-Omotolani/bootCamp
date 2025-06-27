
const SignUpForm = document.getElementById("SignUpForm");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const userRole = document.getElementById("role");

const users = JSON.parse(localStorage.getItem("users") || "[]");

SignUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const usersName = userName.value;
  const usersPass = password.value;
  const usersemail = email.value;
  const usersRole = userRole.value;

  if (!usersName.trim() || !usersPass.trim() || !usersemail.trim() || !usersRole.trim()) {
    return alert("All field required");
  }
  const existingusers = users.some((user) => user.usersemail === usersemail);

  if (existingusers) {
    return alert("user already exist");
  }
  userData = {
    usersName,
    usersPass,
    usersRole,
    usersemail,
  };
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  alert("sign up successful");

  setTimeout(() => {
    window.location.href = "../Login/Login.html";
  }, 1500);
});
