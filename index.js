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
//checkboxes limit 2
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

        if (checkedBoxes.length > 2){
            checkbox.checked = false;
            alert("You can only select two options");
        }
    });
})

nextBtn.addEventListener('click', () => {
    const currentFieldset = fieldsets[currentIndex];
    const isAnyChecked = currentFieldset.querySelector('input:checked') !==null;

    if (!isAnyChecked){
        return;
    }
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

    // Remove fieldsets from view
    wrapper.innerHTML = "";
    submitBtn.style.display = "none";
    ulResults.style.display = "block";

    fieldsets.forEach((fieldset) => {
        let liQuestion = document.createElement('li');
        const questionh3 = fieldset.querySelector('h3').textContent;
        liQuestion.textContent = `Question: ${questionh3}`;
        ulResults.appendChild(liQuestion);

        // Loop inputs
        const inputs = fieldset.querySelectorAll('input');
        inputs.forEach(input => {
            const label = fieldset.querySelector(`label[for="${input.id}"]`);
            if (label) {
                let liAnswer = document.createElement('li');
                liAnswer.textContent = label.textContent;
                if (input.checked) {
                    if (input.getAttribute('data-correct') === "true") {
                        liAnswer.style.color = "#00b451";
                    } else {
                        liAnswer.style.color = "#FF4747";
                    }
                }
                ulResults.appendChild(liAnswer);
            }
        });

        const correctAnswers = fieldset.querySelectorAll('input[data-correct="true"]');
        correctAnswers.forEach(correctInput => {
            const correctLabel = fieldset.querySelector(`label[for="${correctInput.id}"]`);
            if (correctLabel) {
                let liCorrectAnswer = document.createElement('li');
                liCorrectAnswer.textContent = `Correct Answer: ${correctLabel.textContent}`;
                // liCorrectAnswer.style.color = "green"; 
                ulResults.appendChild(liCorrectAnswer);
            }
        });
    });
});