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

document.getElementById("ctaBtn").addEventListener("click", () => {
    window.location.href = "quiz.html"; // Navigate to quiz.html
  });