import { saveResultToLocalStorage } from "./user-attemps.js"

export const resultScreen = document.getElementById('results-screen')
const scoreCounter = document.getElementById('score')
const scoreMessage = document.getElementById('score-message')
const questionsContainer = document.getElementById('answers-list')
export const restartBtn = document.getElementById('restart-btn')

export function showResults(userAnswers) {
    let correctAnswers = 0;
    userAnswers.forEach((question) => {
        if(question.userAnswer == question.question.correct) {
            correctAnswers++;
        }
    });
    scoreCounter.textContent = correctAnswers;
    const percentage = (correctAnswers / userAnswers.length) * 100  
    if (percentage === 100) {
        scoreMessage.textContent = "Perfect! Outstanding work!"
    }
    else if (percentage >= 80) {
        scoreMessage.textContent = "Excellent! Great job!"
    }
    else if (percentage >= 60) {
        scoreMessage.textContent = "Great work! keep it up!"
    }
    else {
        scoreMessage.textContent = "Keep practicing! you'll get better!"
    }
    showAnswers(userAnswers)    
    saveResultToLocalStorage( correctAnswers, userAnswers.length )
}
function showAnswers(userAnswers) {
    questionsContainer.innerHTML = ""
    userAnswers.forEach((answer,idx) => {
        const isCorrect = answer.userAnswer == answer.question.correct 
        questionsContainer.innerHTML += `
        <div class="answer-item ${isCorrect ? "correct" : "incorrect"}">
            <div class="answer-text">
                <strong>Q${idx + 1}:</strong>${answer.question.question}<br>
                <small>Your answer: ${answer.question.options[answer.userAnswer]}</small><br>
                <small>Correct answer: ${answer.question.options[answer.question.correct]}</small>
            </div>
            <div class="answer-status ${isCorrect ? "correct" : "incorrect"}">${isCorrect ? "Correct" : "In Correct"}</div>
        </div>
        `
    });
}