let questions = JSON.parse(localStorage.getItem("questions") || "[]");
const output = document.getElementById("output");
const users = JSON.parse(localStorage.getItem("users") || "[]");

function showQandA(showQandABox) {
  showQandABox.innerHTML = "";
  if(questions.length === 0){
    showQandABox.innerHTML = `
        <h1 class= "Noquest">No Question Yet</h1>
    `;
    return;
  }
  
    questions.forEach((q, i) => {
      const div = document.createElement("div");
      div.className = "ListT";
      let questionHTML = "";
      questionHTML = `
      <div class="QuestionHolderT">
     <p class="qtext">Question:</p>
      <p>${q.text}</p>
    </div>
    
  `;

      let answerHTML = "";
      if (q.answer && q.answer.trim() !== "") {
        answerHTML = `
         <div class="AnswerHolder" style="display: flex";>
             <p class="AnsText">Answer:</p>
            <p>${q.answer}</p>
           </div>
        `;
      } else {
        answerHTML = `
          <textarea id="replyValue${i}" placeholder="Type your answer here...."></textarea>
          <button onclick = "reply(${i})">Submit</button>
        `;
      }
      div.innerHTML = questionHTML + answerHTML;
      showQandABox.appendChild(div);
    });
  }
   
  
  



function reply(i) {

  const replyValue = document.getElementById("replyValue" + i);
  const answerText = replyValue.value;
  if (answerText.trim() === "") {
    return alert("can't send empty message");
  }
  questions[i].answer = answerText;
  localStorage.setItem("questions", JSON.stringify(questions));
  alert("answer Sent");
  showQandA(output);
}

window.addEventListener("storage", function (e) {
  if (e.key === "questions") {
    questions = JSON.parse(localStorage.getItem("questions") || "[]");
    showQandA(output);
  }
});
showQandA(output);


function logout() {

  const loggedin = JSON.parse(localStorage.getItem("loggedin") || "[]");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("No user currently logged in.");
    return;
  }
  const updatedLoggedin = loggedin.filter(
    (user) => user.usersemail !== currentUser.usersemail
  );

  localStorage.setItem("loggedin", JSON.stringify(updatedLoggedin));
  localStorage.removeItem("currentUser"); 

  setTimeout(() => {
    window.location.href = "../Login/Login.html";
  }, 1500);
}
