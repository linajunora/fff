//theme toggle stuff
const themeToggleBtn = document.getElementById('themeToggleBtn');
let darkmode = localStorage.getItem('darkmode')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove ('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

themeToggleBtn.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
});

//quiz

const fieldsets = Array.from(document.querySelectorAll('form fieldset'));
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submit');
const form = document.getElementById('form-quiz');
const wrapper = document.getElementById('fieldset-wrapper');
const ulResults = document.getElementById('results');

//show one fieldset at a time
let currentIndex = 0;

const newFieldset = () => {
    wrapper.innerHTML = '';
    ulResults.style.display = "none";
    fieldsets.forEach((fieldset) => {
        if (form.contains(fieldset)) {
            form.removeChild(fieldset);
        }
    });
    wrapper.appendChild(fieldsets[currentIndex]);
}
//save answers
const answers = [];
const savedAnswers = () => {
    const currentQuestion = fieldsets[currentIndex];
    const checkedInputs = currentQuestion.querySelectorAll('input:checked');

    checkedInputs.forEach(input => {
        answers.push(input.getAttribute('data-correct') === "true");
    });
};

nextBtn.addEventListener('click', () => {
    savedAnswers();
    if (currentIndex < fieldsets.length -1){
        currentIndex++;
        newFieldset();
    }
    // show submit on last question
    if (currentIndex === fieldsets.length - 1){
        submitBtn.style.display = "block";
        nextBtn.style.display = "none";
    }
});
newFieldset();

//submit and show results

submitBtn.addEventListener("click", () => {
    savedAnswers();
    const totalScore = answers.filter(isCorrect => isCorrect).length;
    console.log("Total Score:", totalScore);

    //remove fieldset from view
    wrapper.innerHTML = "";
    submitBtn.style.display = "none";
    ulResults.style.display= "block";

    fieldsets.forEach((fieldset) => {
        let liQuestion = document.createElement('li');
        
        const questionh3 = fieldset.querySelector('h3').textContent;
        liQuestion.textContent = questionh3;
        ulResults.appendChild(liQuestion);

        const rightAnswer = fieldset.querySelectorAll('input[data-correct="true"]');
        rightAnswer.forEach(answer => {
            const label = fieldset.querySelector(`label[for=${value}"]`);
            console.log(label);
            if (label){
                let liRightAnswer = document.createElement('li');
                liRightAnswer.textContent = `Correct Answer: ${label.textContent}`;
                console.log(liRightAnswer);
                ulResults.appendChild(liRightAnswer);
            }
        });
    });
});