```javascript
const quizQuestions = [

    {
        question:"What does CPU stand for?",
        options:[
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer:0
    },

    {
        question:"Which of the following is an operating system?",
        options:[
            "Microsoft Word",
            "Windows",
            "Google",
            "HTML"
        ],
        answer:1
    },

    {
        question:"Which language is used to create the structure of a webpage?",
        options:[
            "CSS",
            "HTML",
            "Python",
            "SQL"
        ],
        answer:1
    },

    {
        question:"Which language is mainly used to style a webpage?",
        options:[
            "HTML",
            "CSS",
            "Java",
            "C"
        ],
        answer:1
    },

    {
        question:"Which language is used to add interactivity to websites?",
        options:[
            "JavaScript",
            "HTML",
            "CSS",
            "SQL"
        ],
        answer:0
    },

    {
        question:"Which device is used to store data permanently?",
        options:[
            "RAM",
            "Keyboard",
            "Hard Disk",
            "Monitor"
        ],
        answer:2
    },

    {
        question:"What does URL stand for?",
        options:[
            "Uniform Resource Locator",
            "Universal Record Link",
            "User Resource Location",
            "Uniform Reference Link"
        ],
        answer:0
    },

    {
        question:"Which of these is a programming language?",
        options:[
            "Python",
            "Chrome",
            "Windows",
            "Google"
        ],
        answer:0
    },

    {
        question:"Which symbol is used for a comment in JavaScript?",
        options:[
            "//",
            "##",
            "<!-- -->",
            "**"
        ],
        answer:0
    },

    {
        question:"Which HTML tag is used to display an image?",
        options:[
            "<image>",
            "<picture>",
            "<img>",
            "<photo>"
        ],
        answer:2
    }

];


let current = 0;
let score = 0;
let answers = Array(quizQuestions.length).fill(null);

let time = 600;
let timerInterval;


const question = document.getElementById("question");
const questionNumber = document.getElementById("questionNumber");
const options = document.getElementById("options");
const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");

const questionButtons =
document.getElementById("questionButtons");

const progressBar =
document.getElementById("progressBar");

const progressText =
document.getElementById("progressText");

const timer =
document.getElementById("timer");


/* CREATE QUESTION BUTTONS */

function createQuestionButtons(){

    questionButtons.innerHTML = "";

    quizQuestions.forEach((q,index)=>{

        const button =
        document.createElement("button");

        button.className = "qbtn";

        button.textContent = index + 1;

        button.onclick = ()=>{

            current = index;

            loadQuestion();

        };

        questionButtons.appendChild(button);

    });

}


/* LOAD QUESTION */

function loadQuestion(){

    const q = quizQuestions[current];

    questionNumber.textContent =
    `Question ${current + 1} of ${quizQuestions.length}`;

    question.textContent = q.question;

    progressBar.style.width =
    `${((current + 1) / quizQuestions.length) * 100}%`;

    progressText.textContent =
    `${Math.round(((current + 1) / quizQuestions.length) * 100)}%`;

    options.innerHTML = "";

    feedback.textContent = "";


    q.options.forEach((option,index)=>{

        const button =
        document.createElement("button");

        button.className = "option";

        button.textContent =
        `${String.fromCharCode(65 + index)}. ${option}`;

        button.onclick = ()=>{

            selectAnswer(index);

        };

        options.appendChild(button);

    });


    updateButtons();

    updateNavigation();

}


/* SELECT ANSWER */

function selectAnswer(selected){

    if(answers[current] !== null)
        return;


    answers[current] = selected;

    const correct =
    quizQuestions[current].answer;


    const buttons =
    document.querySelectorAll(".option");


    buttons.forEach((button,index)=>{

        button.disabled = true;

        if(index === correct){

            button.classList.add("correct");

        }

        if(index === selected &&
           selected !== correct){

            button.classList.add("wrong");

        }

    });


    if(selected === correct){

        score++;

        scoreDisplay.textContent = score;

        feedback.textContent =
        "✓ Correct Answer!";

        feedback.style.color =
        "#34d399";

    }

    else{

        feedback.textContent =
        "✗ Wrong Answer!";

        feedback.style.color =
        "#f87171";

    }


    updateNavigation();

}


/* UPDATE BUTTONS */

function updateNavigation(){

    const buttons =
    document.querySelectorAll(".qbtn");


    buttons.forEach((button,index)=>{

        button.classList.remove(
            "current",
            "answered"
        );


        if(index === current){

            button.classList.add("current");

        }

        else if(answers[index] !== null){

            button.classList.add("answered");

        }

    });

}


/* NEXT */

document.getElementById("next").onclick = ()=>{

    if(current < quizQuestions.length - 1){

        current++;

        loadQuestion();

    }

    else{

        showResult();

    }

};


/* PREVIOUS */

document.getElementById("previous").onclick = ()=>{

    if(current > 0){

        current--;

        loadQuestion();

    }

};


/* BUTTON STATE */

function updateButtons(){

    const previous =
    document.getElementById("previous");

    previous.disabled = current === 0;


    const next =
    document.getElementById("next");


    if(current === quizQuestions.length - 1){

        next.textContent =
        "Finish Quiz ✓";

    }

    else{

        next.textContent =
        "Next Question →";

    }

}


/* TIMER */

function startTimer(){

    timerInterval =
    setInterval(()=>{

        time--;


        const minutes =
        Math.floor(time / 60);

        const seconds =
        time % 60;


        timer.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;


        if(time <= 0){

            clearInterval(timerInterval);

            showResult();

        }

    },1000);

}


/* RESULT */

function showResult(){

    clearInterval(timerInterval);


    const total =
    quizQuestions.length;

    const wrong =
    total - score;

    const percentage =
    Math.round((score / total) * 100);


    document.getElementById("finalScore")
    .textContent = score;

    document.getElementById("correct")
    .textContent = score;

    document.getElementById("wrong")
    .textContent = wrong;

    document.getElementById("percentage")
    .textContent = percentage + "%";


    document.getElementById("result")
    .style.display = "flex";

}


/* RESTART */

function restart(){

    current = 0;

    score = 0;

    time = 600;

    answers =
    Array(quizQuestions.length).fill(null);


    scoreDisplay.textContent = "0";


    document.getElementById("result")
    .style.display = "none";


    clearInterval(timerInterval);


    loadQuestion();

    startTimer();

}


/* START */

createQuestionButtons();

loadQuestion();

startTimer();
```
