const canvas = document.createElement('canvas');
const subject_options = ['Docker', 'Python', 'Javascript', 'Github', 'Computer Network', 'Numpy', 'Logistic Regression'];

// Create a dropdown list
const dropdownButton = document.getElementById('dropdownButton');
const subjectsMenu = document.getElementById('subjectsMenu');
const answerBoxes = document.querySelectorAll('.answer-box');
const questionDisplay = document.getElementById('question');

let selectedSubject = "";
let questionsData = {};
let correctedAnswer = "";
let currentQuestion = "";


// Load subjects 
subject_options.forEach((subject) => {
    const item = document.createElement('div');
    item.classList.add('subject-item');
    item.innerHTML = subject;
    item.addEventListener('click', () => {
        document.querySelector('.subject-text').innerHTML = `Course: ${subject}`;
        selectedSubject = subject;
        console.log(selectedSubject);
        subjectsMenu.style.display = "none";
        loadNewQuestion();
    });
    subjectsMenu.appendChild(item);
})

// Show/hide dropdown menu on hover
dropdownButton.addEventListener("click", () => {
       subjectsMenu.style.display = subjectsMenu.style.display === "block" ? "none" : "block";
})

// Close dropdown
document.addEventListener("mouseout", (event) => {
    if (!event.target.closest(".dropdown")) {
        subjectsMenu.style.display = "none";
    }
});

// Load JSON file
async function fetchJSONData() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        questionsData = await response.json();
        console.log("Fetch:", questionsData);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}
fetchJSONData().then(() => {
    console.log(questionsData);
})

// Display question
function loadNewQuestion() {
    resetAnswers();
    if (!questionsData[selectedSubject]) {
        questionDisplay.textContent = "Please select a subject first!";
        answerBoxes.forEach(box => box.textContent = "");
        return;
    }

    let questions = questionsData[selectedSubject];
    console.log(questions);
    let randomNumber = Math.floor(Math.random() * questions.length);
    console.log(randomNumber);
    currentQuestion = questions[randomNumber];
    console.log(currentQuestion);
    questionDisplay.innerHTML = currentQuestion.question;

    const answers = currentQuestion.answers;
    console.log(answers);
    // answerBoxes.forEach((btn,idx)=>{
    //     btn.textContent= `${Object.keys(answers)[idx]}.  ${Object.values(answers)[idx]}` ;
    // })
    Object.entries(answers).forEach(([key, value], idx) => {
        if (answerBoxes[idx]) {
            answerBoxes[idx].textContent = `${key}. ${value}`;
            answerBoxes[idx].dataset.answerKey = key; // For checking
        }
    });
}

// Handler answer click
function resetAnswers() {
    answerBoxes.forEach(item => {
        item.classList.remove('correct', 'false');
    })
}
answerBoxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (!currentQuestion) return;

        if (box.classList.contains('correct') || box.classList.contains('false')) return;
        resetAnswers();

        const selectedAnswer = box.textContent;
        // console.log(`selected answer: ${selectedAnswer[0]}`);
        // console.log(`Correct answer: ${correctedAnswer}`);
        // let check = checkAnswer(selectedAnswer[0], correctedAnswer);
        const selectedKey = box.dataset.answerKey;

        if (selectedKey === currentQuestion.correct_answer) {
            box.classList.add('correct');
        } else {
            box.classList.add('false');
            const correctBox = [...answerBoxes].find(b => b.dataset.answerKey === currentQuestion.correct_answer);
            if (correctBox) correctBox.classList.add('correct');
        }
        // Wait 1s, then load the next question
        setTimeout(() => {
            loadNewQuestion();
        }, 1000);

    })
})






// Set canvas ID
canvas.id = 'dotsCanvas';
// Set width and height


// Resize handler
window.addEventListener('resize', () => {
    const viewportWidth = window.innerWidth;
    const main = document.getElementById('main-navigation');
    if (viewportWidth <= 780) {
        main.classList.add('col');
    } else {
        main.classList.remove('col');
    }
})

