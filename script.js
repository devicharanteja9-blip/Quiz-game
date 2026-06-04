let questions = [

    {
        question:"What does HTML stand for?",
        answers:[
            {text:"Hyper Text Markup Language", correct:true},
            {text:"High Transfer Machine Language", correct:false},
            {text:"Hyperlinks Text Management Language", correct:false},
            {text:"Home Tool Markup Language", correct:false}
        ]
    },

    {
        question:"Which language is used for styling webpages?",
        answers:[
            {text:"HTML", correct:false},
            {text:"CSS", correct:true},
            {text:"Python", correct:false},
            {text:"C++", correct:false}
        ]
    },

    {
        question:"Which language is used for webpage functionality?",
        answers:[
            {text:"Java", correct:false},
            {text:"Python", correct:false},
            {text:"JavaScript", correct:true},
            {text:"C", correct:false}
        ]
    },

    {
        question:"Which tag is used for images in HTML?",
        answers:[
            {text:"<img>", correct:true},
            {text:"<image>", correct:false},
            {text:"<pic>", correct:false},
            {text:"<src>", correct:false}
        ]
    },

    {
        question:"Which company developed JavaScript?",
        answers:[
            {text:"Google", correct:false},
            {text:"Microsoft", correct:false},
            {text:"Netscape", correct:true},
            {text:"Apple", correct:false}
        ]
    }

];

let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");

let resultContainer = document.getElementById("result");
let scoreElement = document.getElementById("score");
let restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){

    currentQuestionIndex = 0;
    score = 0;

    resultContainer.classList.add("hide");

    nextButton.style.display = "none";

    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText =
    `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(function(answer){

        let button = document.createElement("button");

        button.innerText = answer.text;

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });

}

function resetState(){

    nextButton.style.display = "none";

    while(answerButtons.firstChild){

        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event){

    let selectedBtn = event.target;

    let correct = selectedBtn.dataset.correct === "true";

    if(correct){

        selectedBtn.classList.add("correct");

        score++;
    }

    else{

        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(function(button){

        if(button.dataset.correct === "true"){

            button.classList.add("correct");
        }

        button.disabled = true;

    });

    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", function(){

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){

        showQuestion();
    }

    else{

        showScore();
    }

});

function showScore(){

    document.getElementById("quiz").classList.add("hide");

    resultContainer.classList.remove("hide");

    scoreElement.innerText =
    `You scored ${score} out of ${questions.length}`;

}

restartButton.addEventListener("click", function(){

    document.getElementById("quiz").classList.remove("hide");

    startQuiz();

});

startQuiz();
