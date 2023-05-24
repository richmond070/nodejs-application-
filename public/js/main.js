const primaryNav = document.querySelector(".primary-navigation");
const navToggle =  document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute("data-visible");

    if(visibility === "false") {
        primaryNav.setAttribute("data-visible", true);
    } else if (visibility === "true"){
        primaryNav.setAttribute("data-visible", false);  
    }
}) 

const prevButton = document.querySelector('.prev-slide');
const nextButton = document.querySelector('.next-slide');
const slider = document.querySelector('.card-slider');

let scrollPos = 0;
const cardWidth = slider.querySelector('.card').offsetWidth;
const numCards = slider.querySelectorAll('.card').length;

prevButton.addEventListener('click', () => {
  if (scrollPos > 0) {
    scrollPos -= cardWidth + 30;
    slider.scrollTo({
      left: scrollPos,
      behavior: 'smooth'
    });
  }
});

nextButton.addEventListener('click', () => {
  if (scrollPos < (numCards - 1) * (cardWidth + 30)) {
    scrollPos += cardWidth + 30;
    slider.scrollTo({
      left: scrollPos,
      behavior: 'smooth'
    });
  }
});



