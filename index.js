// * * * C A R O U S E L * * *

const img_carousel = document.querySelector(".img_wrapper img");
const liQuantity = document.querySelectorAll(`.carousel li`);
let liImg = document.querySelector(`.carousel li img`);
const buttonPrev = document.querySelector(`#previous`);
const buttonNext = document.querySelector(`#next`);

// let detailsButton = document.querySelector(".details");
// let dropdownDetails = document.querySelector(".dropdownDetails");

// detailsButton.addEventListener("click", function () {
//   if (dropdownDetails.style.display == "none") {
//     dropdownDetails.style.display = "block";
//   } else if (dropdownDetails.style.display == "block") {
//     dropdownDetails.style.display = "none";
//   }
// });

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
