document.addEventListener('DOMContentLoaded',()=>{
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const NextBtn = document.getElementById("next-btn");
    const resultContainer = document.getElementById("result-container");
    const Score = document.getElementById("score");
    const Marks = document.getElementById("marks");
    const restartQuiz = document.getElementById("restart-quiz");
    const startQuiz = document.getElementById("start-quiz");

    const questions = [
        {
            question:"What is the Capital of India?",
            choices:["New Delhi", "Mumbai", "Kolkata", "Indore"],
            answer:"New Delhi",
            marks:5,
        },
        {
            question:"Which is the largest planet?",
            choices:["Mars","Earth","Jupiter","Mercury"],
            answer:"Jupiter",
            marks:5,
        },
        {
            question:"Who is the Captain of CSK?",
            choices:["Ruturaj Gaikwad","MS Dhoni","Shivam Dube","Sanju Samson"],
            answer:"Ruturaj Gaikwad",
            marks:10,
        },
    ];
    let currQuesIndex = 0;
    let totalScore = 0;
    let totalMarks = 0;
    NextBtn.addEventListener('click', ()=>{
        currQuesIndex++;
        if(currQuesIndex<questions.length){
            showQuestion();
        }
        else{
            showResult();
        }
    })
    
    startQuiz.addEventListener('click', QuizBegin);
    restartQuiz.addEventListener('click', ()=>{
        currQuesIndex = 0;
        totalMarks = 0;
        totalScore = 0;
        QuizBegin();
    });
    function QuizBegin (){
        startQuiz.classList.add('hidden'); 
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
    }
    function showQuestion (){
        NextBtn.classList.add('hidden');
        questionText.textContent = questions[currQuesIndex].question;
        choicesList.textContent = "";
        questions[currQuesIndex].choices.forEach((choice)=>{
           const li =  document.createElement("li");
           li.textContent = choice;
           choicesList.appendChild(li);
           li.addEventListener('click', ()=>selectAnswer(choice));
        })
    }
    function selectAnswer(choice) {
        let correctAns = questions[currQuesIndex].answer;
        if(choice===correctAns){
            totalScore++;
            totalMarks+=questions[currQuesIndex].marks;
            NextBtn.classList.remove("hidden");
            document.getElementById("statement").classList.add("hidden");
        }
        else{
            NextBtn.classList.add("hidden");
           setTimeout(()=>{
                document.getElementById("statement").classList.remove("hidden")
           },2000); 
        }
    }
    function showResult (){
        resultContainer.classList.remove("hidden");
        questionContainer.classList.add("hidden");
        Score.innerHTML = `Your score is ${totalScore}`;
        Marks.innerHTML = `Obtained marks is ${totalMarks} out of ${totalMarks}`;
        restartQuiz.classList.remove("hidden");
    }
})