const themeToggleBtn = document.getElementById("themeToggleBtn");
const outerWrapper = document.querySelector(".outer-wrapper");
const footer = document.querySelector("footer");

//Check for saved theme in localStorage
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    outerWrapper.classList.add("dark-mode");
    footer.classList.add("dark-mode");
    themeToggleBtn.textContent = "Switch: Light Mode";
}

//Toggle theme on button click
themeToggleBtn.addEventListener("click", () => {
    const isDarkMode = outerWrapper.classList.toggle("dark-mode");
    footer.classList.toggle("dark-mode");

    //Update button text
    themeToggleBtn.textContent = isDarkMode ? "Switch: Light Mode" : "Switch: Dark Mode";

    //Save the current theme to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});
// //check if quiz button exist in DOM
// const ctaBtn = document.getElementById("ctaBtn");
// if (ctaBtn) {
// document.getElementById("ctaBtn").addEventListener("click", () => {
//     window.location.href = "quiz.html"; // Navigate to quiz.html
//   });
// }

//   //submit the quiz
//   document.querySelector("#submit").addEventListener("click", (event) => {
//     event.preventDefault();
//     let score = 0;

//     const radioInputs = document.querySelectorAll("input[type='radio']:checked");
//     radioInputs.forEach(input => {
//         if (input.dataset.correct === "true") {
//             score++;
//         }
//     });

//     const checkboxInputs = document.querySelectorAll("input[type='checkbox']");
//     const selectedCheckboxes = [...checkboxInputs].filter(input => input.checked && input.dataset.correct === "true");
//     const correctCheckboxes = [...checkboxInputs].filter(input => input.dataset.correct === "true");

//     //kollar så båda checkboxarna är checkade
//     if (selectedCheckboxes.length === correctCheckboxes.length && correctCheckboxes.every(cb => cb.checked)){
//         score++;
//     }
//     alert(`Your score: ${score}`);
//   });

document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("form-quiz");
    const questions = document.querySelectorAll(".question");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submit");

    let currentQuestionIndex = 0;

    // Start the quiz by showing the first question
    quizForm.style.display = "block";
    questions[currentQuestionIndex].classList.add("active");
    nextBtn.style.display = "block";

    // Show the next question
    nextBtn.addEventListener("click", () => {
        const currentQuestion = questions[currentQuestionIndex];
        const inputs = currentQuestion.querySelectorAll("input");

        // Ensure an answer is selected
        if (Array.from(inputs).some(input => input.checked)) {
            currentQuestion.classList.remove("active");
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                questions[currentQuestionIndex].classList.add("active");

                // If on the last question, hide "Next" button and show "Submit"
                if (currentQuestionIndex === questions.length - 1) {
                    nextBtn.style.display = "none";
                    submitBtn.style.display = "block";
                }
            }
        } else {
            alert("Please select an answer before proceeding.");
        }
    });

    // Handle the submission
    submitBtn.addEventListener("click", () => {
        alert("Quiz completed! Add score calculation here.");
    });
});