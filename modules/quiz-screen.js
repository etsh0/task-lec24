import { questionBank } from "./question-bank.js";

export const quizScreen = document.getElementById("quiz-screen")
const currentQuestionCounter = document.getElementById("current-question")
const questionTitle = document.getElementById("question-text")  
const optionsContainer = document.getElementById("options-container")
export const nextBtn = document.getElementById('next-btn')
const progressBar = document.getElementById('progress')



export let randomQuestions = [] 
export let currentQuestion = 0;
export let userAnswers = []

export function startQuiz() {
    // to replace questions  
    for (let i = 0 ; i < questionBank.length ; i++) {

        const firstIdx = Math.floor( Math.random() * 10 )
        const secondIdx = Math.floor( Math.random() * 10 )

        let temp = questionBank[firstIdx]
        questionBank[firstIdx] = questionBank[secondIdx]
        questionBank[secondIdx] = temp 
    }
    // to get 5 random questions 
    randomQuestions = questionBank.slice(0,5);
    showCurrentQuestion()
}

// to change content of question 
export function showCurrentQuestion () {

    const currentQuestionObj = randomQuestions[currentQuestion]
    currentQuestionCounter.textContent = currentQuestion + 1;

    progressBar.style.width = `${((currentQuestion + 1) / randomQuestions.length) * 100}%`
    questionTitle.textContent = currentQuestionObj.question;

    optionsContainer.innerHTML = ""
    currentQuestionObj.options.forEach((option , index) => {
        // optionsContainer.innerHTML += `
        // <button class="option">${option}</button>
        // `
        const optionBtn = document.createElement('button')
        optionBtn.className = 'option'
        optionBtn.textContent = option;

        optionsContainer.appendChild(optionBtn)

        optionBtn.addEventListener('click' , () => {
            handelOptionClick(index , currentQuestionObj)
        })
    })
    nextBtn.disabled = true;
}

function handelOptionClick(optionIdx , questionObj) {
    const optionsEle = optionsContainer.querySelectorAll('.option')
    optionsEle.forEach( (ele , index) => {
        ele.disabled = true
        if (index == questionObj.correct) {
            ele.classList.add('correct')
        }
        else if (index == optionIdx) {
            // not understand !!!!
            ele.classList.add('incorrect')
        }
    })
    userAnswers.push({
        question: questionObj ,
        userAnswer: optionIdx 
    })
    nextBtn.disabled = false
}

export function incrementNextQuextion() {
    currentQuestion++
}

export function resetQuiz() {
    currentQuestion = 0 
    userAnswers = []
    randomQuestions = []
    nextBtn.textContent = "Next Question"
}