// * * * C A R O U S E L * * *

const img_carousel = document.querySelector(".img_wrapper img");
const liQuantity = document.querySelectorAll(`.carousel li`);
let liImg = document.querySelector(`.carousel li img`);
const buttonPrev = document.querySelector(`#previous`);
const buttonNext = document.querySelector(`#next`);

let sliderIndex = 1;
showSlides(sliderIndex);

function plusSlides(n) {
  showSlides((sliderIndex += n));
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    sliderIndex = 1;
  }
  if (n < 1) {
    sliderIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[sliderIndex - 1].style.display = "block";
}

const body = document.querySelector(`body`);

const navSlide = () => {
  const burger = document.querySelector(`#btn`);
  const cancel = document.querySelector(`#cancel`);

  burger.addEventListener("click", () => {
    burger.setAttribute("style", "color: white;");
    cancel.setAttribute("style", "color: white;");
    body.setAttribute("style", "background-color: black;");
  });

  cancel.addEventListener("click", () => {
    burger.setAttribute("style", "color: black;");
    cancel.setAttribute("style", "color: black;");
    body.removeAttribute("style", "background-color: black;");
  });
};

navSlide();
