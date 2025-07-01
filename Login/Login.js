const usersemail = document.getElementById("email");
const usersPass = document.getElementById("password");
const LoginForm = document.getElementById("LoginForm");

const users = JSON.parse(localStorage.getItem("users") || "[]");


LoginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailValue = usersemail.value.trim();
  const passwordValue = usersPass.value.trim();

  if (!emailValue || !passwordValue) {
    return alert("All fields are required");
  }

  const foundUser = users.find((user) => user.usersemail === emailValue);

  if (!foundUser || !users.some((user) => user.usersPass === passwordValue)) {
    return alert("Incorrect credentials");
  }

  if (!foundUser) {
    return alert("Incorrect Email");
  }

  if (foundUser.usersPass !== passwordValue) {
    return alert("Incorrect password");
  }

  const loggedin = JSON.parse(localStorage.getItem("loggedin") || "[]");
  const isAlreadyLoggedIn = loggedin.some(
    (user) => user.usersemail === emailValue
  );

  alert("Login successful!");
  if (!isAlreadyLoggedIn) {
    loggedin.push(foundUser);
    localStorage.setItem("loggedin", JSON.stringify(loggedin));
  }
  localStorage.setItem("currentUser", JSON.stringify(foundUser));

  if (foundUser.usersRole === "Student") {
    setTimeout(() => {
      window.location.href = "../Student/student.html";
    }, 2000);
  } else if (foundUser.usersRole === "Teacher") {
    setTimeout(() => {
      window.location.href = "../Teacher/teacher.html";
    }, 2000);
  } else {
    alert("Role not selected");
  }
});
