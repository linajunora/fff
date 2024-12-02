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
//check if quiz button exist in DOM
const ctaBtn = document.getElementById("ctaBtn");
if (ctaBtn) {
document.getElementById("ctaBtn").addEventListener("click", () => {
    window.location.href = "quiz.html"; // Navigate to quiz.html
  });
}

  //submit the quiz
  document.querySelector("#submit").addEventListener("click", (event) => {
    event.preventDefault();
    let score = 0;

    const radioInputs = document.querySelectorAll("input[type='radio']:checked");
    radioInputs.forEach(input => {
        if (input.dataset.correct === "true") {
            score++;
        }
    });

    const checkboxInputs = document.querySelectorAll("input[type='checkbox']");
    const selectedCheckboxes = [...checkboxInputs].filter(input => input.checked && input.dataset.correct === "true");
    const correctCheckboxes = [...checkboxInputs].filter(input => input.dataset.correct === "true");

    //kollar så båda checkboxarna är checkade
    if (selectedCheckboxes.length === correctCheckboxes.length && correctCheckboxes.every(cb => cb.checked)){
        score++;
    }
    alert(`Your score: ${score}`);
  });