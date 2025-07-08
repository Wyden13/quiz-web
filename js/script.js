
// Create a new canvas element
const canvas = document.createElement('canvas');
const answersDisplay = document.querySelectorAll('.answer');
const questionDisplay = document.getElementById('question');
// const subject= document.getElementById('subject');
const subject_options = ['Docker','Python','Javascript','Github','Computer Network','Numpy','Logistic Regression'];

// Create a dropdown list
const dropdownButton = document.getElementById('dropdownButton');
const subjectsMenu = document.getElementById('subjectsMenu');
let selectedSubject = "";
let selectedAnswer = "";
let questionsData = {}; // Add this at the top
let correctedAnswer = "";


// Load subjects 
subject_options.forEach((subject)=>{
    let item = document.createElement('div');
    // item.textContent=subject;
    item.classList.add('subject-item');
    item.innerHTML = subject;
    subjectsMenu.appendChild(item);
})

// Toggle dropdown menu visibility
const dropdownSubjects = document.querySelectorAll(".subject-item");
dropdownButton.addEventListener("mouseover",()=>{
    if(subjectsMenu.style.display==="none"){
        subjectsMenu.style.display = "block";
    }
})

// Update the dropdown text and close the menu on item click
dropdownSubjects.forEach((subject)=>{
    subject.addEventListener("click", ()=>{
        console.log(subject.innerHTML);
        document.querySelector('.subject-text').innerHTML=`Course: ${subject.innerHTML}`;
        selectedSubject = subject.innerHTML;
        subjectsMenu.style.display="none";

        getRandomQuestion(questionsData,selectedSubject);
    })
})

// Close dropdown
document.addEventListener("mouseout", (event) => {
    if (!event.target.closest(".dropdown")) 
    {
        subjectsMenu.style.display = "none";
    }
});

// Load JSON file
async function fetchJSONData(){
    try{
        const response = await fetch('questions.json');
        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        questionsData=await response.json();
        console.log("Fetch:", questionsData);
    }catch(error){
        console.error("Failed to fetch data:", error);
    }
}
fetchJSONData().then(()=>{
    console.log(questionsData);
})

// Display question
function getRandomQuestion(data,subject){
    if (!data || !data[subject]){
        questionDisplay.textContent="Please select a subject first!";
        return;
    }
    let listOfQuestions = data[subject];
    console.log(listOfQuestions);
    let randomNumber = Math.floor(Math.random() * listOfQuestions.length);
    console.log(randomNumber);
    let question = listOfQuestions[randomNumber];
    console.log(question);
    questionDisplay.innerHTML = question["question"];
    
    let answers = question["answers"];
    answersDisplay.forEach((btn,idx)=>{
        btn.textContent= Object.values(answers)[idx];
    })
    correctedAnswer = question["correct_answer"];
}

// Handler answer click
function checkAnswer(selected,correct){
    if (!selected){
        return;
    }
    if(selected != correct){
        console.log("Answer is not correct!");

    }
}

answersDisplay.addEventListener('click',()=>{

})








// Set canvas ID
canvas.id = 'dotsCanvas';
// Set width and height


// Resize handler
window.addEventListener('resize',()=>{
    const viewportWidth = window.innerWidth;
    const main = document.getElementById('main-navigation');
    if (viewportWidth  <= 780) {
        main.classList.add('col');
    }else{
        main.classList.remove('col');
    }
})

