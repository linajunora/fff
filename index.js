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

    //check if two options are selected
    const dataCorrectOptions = currentFieldset.querySelectorAll('input[data-correct="true"]');
    const checkedOptions = currentFieldset.querySelectorAll('input:checked');

    if (dataCorrectOptions.length === 2) {
        if (checkedOptions.length !==2){

            alert('pick two options');
            return;
        }
    }

    //check if its not the last one
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
    let scoreh4 = document.createElement('h4');
    scoreh4.textContent = `Score: ${totalScore}/17`;

    // Remove fieldsets from view
    wrapper.innerHTML = "";
    submitBtn.style.display = "none";
    wrapper.appendChild(scoreh4);
    ulResults.style.display = "block";

    //grade result
    const maxScore = 17
    let h4Grade = document.createElement('h4');
    if (totalScore < 0.5 * maxScore) {
        h4Grade.textContent = "You shall not pass"
        wrapper.appendChild(h4Grade);
    } else if (totalScore >= 0.5 * maxScore && totalScore <= 0.75 * maxScore) {
        h4Grade.textContent = "You shall pass"
        wrapper.appendChild(h4Grade);
    } else if (totalScore > 0.75 * maxScore) { 
        h4Grade.textContent = "You kicked the balrogs butt back into oblivion AND lvld up"
        wrapper.appendChild(h4Grade);
    }

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
                ulResults.appendChild(liCorrectAnswer);
            }
        });
    });
});