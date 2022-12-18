const scrollBtn = document.querySelector(".scroll-to-top");

const refreshButtonVisibility = () => {
  if (document.documentElement.scrollTop <= 150) {
    scrollBtn.style.display = "none";
  } else {
    scrollBtn.style.display = "block";
  }
};
refreshButtonVisibility();

scrollBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

document.addEventListener("scroll", (e) => {
  refreshButtonVisibility();
});

//new
const menuToggle = document.querySelector(".toggle");
const showcase = document.querySelector(".showcase");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  showcase.classList.toggle("active");
});

//preloader
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});
