export const userAttemps = document.getElementById('user-attemps')
export const closeResults = document.getElementById('close-results')
export const clearResults = document.getElementById('clear-results')
const resultsList = document.getElementById('results-list')

export function saveResultToLocalStorage(score,total) {    
    let results = JSON.parse(localStorage.getItem('quizResults')) || []

    const newResult = {
        score: score,
        total: total,
        date: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        attemptNumber: results.length + 1
    }
    results.push(newResult)

    localStorage.setItem('quizResults' , JSON.stringify(results))
}

export function displayAllResults() {

    let results = JSON.parse(localStorage.getItem('quizResults')) || []

    resultsList.innerHTML = ''

    if (results.length === 0) {
        resultsList.innerHTML = '<li style="text-align: center; color: #666; font-style: italic;">No attempts yet. Take the quiz to see your results here!</li>'
        return;
    }

    results.forEach( (result) => {
        const percentage = (result.score / result.total) * 100 

        const li = document.createElement('li')
        li.innerHTML = `
        <strong>Attempt ${result.attemptNumber}:</strong> 
        ${result.score} / ${result.total} 
        <span style="color: #667eea;">(${percentage.toFixed(0)}%)</span> 
        <br>
        <small style="color: #999;">${result.date}</small>
        `
        resultsList.appendChild(li)
    });
}

export function clearAllResults() {
    localStorage.removeItem('quizResults')
    displayAllResults()
}