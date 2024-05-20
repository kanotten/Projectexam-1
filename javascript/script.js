document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.querySelector("#nextButton");
  const prevButton = document.querySelector("#prevButton");
  const slides = document.querySelectorAll(".mySlides");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  function showSlide(index) {
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }
    slides.forEach((slide, i) => {
      slide.style.display = i === currentIndex ? "block" : "none";
    });
    dots.forEach((dot, i) => {
      dot.className = dot.className.replace(" active", "");
      if (i === currentIndex) {
        dot.className += " active";
      }
    });
  }

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1);
  });

  prevButton.addEventListener("click", () => {
    showSlide(currentIndex - 1);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
    });
  });

  showSlide(currentIndex);
});
