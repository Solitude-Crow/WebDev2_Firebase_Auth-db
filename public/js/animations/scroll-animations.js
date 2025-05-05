// Add scroll event listener to animate elements as they come into view
document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(".animate__animated");
  
    function checkIfInView() {
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (elementTop < windowHeight - 100) {
          if (
            element.classList.contains("animate__fadeIn") ||
            element.classList.contains("animate__fadeInUp") ||
            element.classList.contains("animate__fadeInDown") ||
            element.classList.contains("animate__fadeInLeft") ||
            element.classList.contains("animate__fadeInRight")
          ) {
            element.style.visibility = "visible";
            element.style.animationPlayState = "running";
          }
        }
      });
    }
  
    // Initialize visibility state
    animatedElements.forEach((element) => {
      if (
        !element.classList.contains("animate__delay-1s") &&
        !element.classList.contains("animate__delay-2s") &&
        !element.classList.contains("animate__delay-3s")
      ) {
        element.style.visibility = "hidden";
      }
    });
  
    // Check elements on initial load
    checkIfInView();
  
    // Check elements on scroll
    window.addEventListener("scroll", checkIfInView);
  });