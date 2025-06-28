let questions = JSON.parse(localStorage.getItem("questions") || "[]");
const loggedin = JSON.parse(localStorage.getItem("loggedin"));

if (!loggedin) {
  alert("No user is logged in. Please login first.");
  window.location.href = "../Login/Login.html";
}

const StudentForm = document.getElementById("StudentForm");
const StudentText = document.getElementById("StudentText");
const output = document.getElementById("output");

StudentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = StudentText.value;
  if (text.trim()) {
    questions.unshift({ text, answer: null, owner: loggedin.usersemail });
    StudentForm.reset();
    localStorage.setItem("questions", JSON.stringify(questions));
    showStudentQuestion(output);
  } else {
    alert("can't send empty message");
  }
});

function showStudentQuestion(container) {
  container.innerHTML = "";
  const studentQuestions = questions.filter(
    (q) => q.owner === loggedin.usersemail
  );
  studentQuestions.forEach((q) => {
    const div = document.createElement("div");
    div.className = "List";

    let answerHTML = "";
    if (q.answer && q.answer.trim() !== "") {
      answerHTML = `
      <div class= "AnswerHolder">
      <p>${q.answer}</p>
      </div>
      `;
    } else {
      answerHTML = `
      <p>Not answered yet</p>
      `;
    }
    div.innerHTML = `
    <div class="QuestionHolder">
     <p class="qtext">Question:</p>
      <p>${q.text}</p>
    </div>
      <div class= "AnswerHolder">
      <p class="AnsText">Answer:</p>
      <p>${answerHTML}</p>
      </div>
    `;

    container.appendChild(div);
  });
}

window.addEventListener("storage", function (e) {
  if (e.key === "questions") {
    questions = JSON.parse(localStorage.getItem("questions") || "[]");
  }
  showStudentQuestion(output);
});
showStudentQuestion(output);


