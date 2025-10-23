import { startBtn , startScreen ,showResultsBtn} from "./modules/start-screen.js"
import { 
    quizScreen,
    startQuiz, 
    currentQuestion, 
    randomQuestions, 
    showCurrentQuestion, 
    nextBtn, 
    incrementNextQuextion,
    userAnswers, 
    resetQuiz } from "./modules/quiz-screen.js"

import { resultScreen , showResults , restartBtn} from "./modules/result-screen.js"
import {userAttemps , closeResults , clearResults , displayAllResults , clearAllResults} from "./modules/user-attemps.js"
startBtn.addEventListener("click", () => {
    startScreen.classList.remove("active")
    quizScreen.classList.add("active")
    startQuiz()
})
nextBtn.addEventListener('click' , () => {
    incrementNextQuextion()
    if (currentQuestion === randomQuestions.length) {
        quizScreen.classList.remove("active")
        resultScreen.classList.add("active")
        showResults(userAnswers)
    }
    else {
        if (currentQuestion === randomQuestions.length - 1) {
            nextBtn.textContent = "Finish Quiz"
        }
        showCurrentQuestion();
    }
})

restartBtn.addEventListener('click' , () => {
    resultScreen.classList.remove("active")
    startScreen.classList.add("active")
    resetQuiz()
})

showResultsBtn.addEventListener('click' , () => {
    startScreen.classList.remove("active")
    userAttemps.classList.add('active')
    displayAllResults()

})

closeResults.addEventListener('click' , () => {
    userAttemps.classList.remove('active')
    startScreen.classList.add("active")
})

clearResults.addEventListener('click' , () => {
    clearAllResults()
})