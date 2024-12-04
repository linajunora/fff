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
console.log(fieldsets)
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submit');
const form = document.getElementById('form-quiz');
const wrapper = document.getElementById('fieldset-wrapper');

let currentIndex = 0;

const newFieldset = () => {
    wrapper.innerHTML = '';
    fieldsets.forEach((fieldset) => {
        if (form.contains(fieldset)) {
            form.removeChild(fieldset);
        }
    });
    wrapper.appendChild(fieldsets[currentIndex]);
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < fieldsets.length -1){
        currentIndex++;
        newFieldset();
    }
});

newFieldset();