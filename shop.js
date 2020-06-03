let products = PRODUCTS;
// * * * D O M * E L E M E N T S
let maxMinPrice = { from: "", to: "" };
let selectedCategories = [];
let selectedColors = [];
const cart =
  localStorage.getItem("cart") != null
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

let goBack = document.querySelector(".goBack");
const mainContainer = document.querySelector(".main_container");
let pageNumbersDiv = document.querySelector(".page_numbers");
let dropdownColourButton = document.querySelector(".dropdown_colour_btn");
let pDropDown = dropdownColourButton.querySelector(" p");
let ulListColors = document.querySelector(".color_dropdown");
let ulListCategory = document.querySelector(".category_dropdown");
const divProducts = document.querySelector(".products");
const ulProducts = document.querySelector(".products ul");
let categoryContainer = document.querySelector(`.category_dropdown`);
let filters = document.querySelector(".left_filters");
let colorContainer = document.querySelector(".color_dropdown");
let selectContainer = document.getElementsByClassName("custom-select");
let mainSection = document.querySelector(".mainContent");
let detailsContainer = document.querySelector(".container_details");
let previousButton = document.querySelector(`.prev`);
let nextButton = document.querySelector(`.next`);
let buttonAddToBucket = document.querySelector(".addToBucket");
let details = document.querySelector(".details");
let divDetails = document.querySelector(".dropdownDetails");
let h2Name = document.querySelector(".details_container h2");
let pDetails = document.querySelector(".details_container p");
let h4Price = document.querySelector(".details_container h4");
let h5Delivery = document.querySelector(".details_container h5");
let ulColors = document.querySelector(".details_container .colors");
let detailsPage = document.querySelector(".details_container");
let p1 = document.querySelector(".first");
let p2 = document.querySelector(".second");
let p3 = document.querySelector(".third");
let p4 = document.querySelector(".forth");
let p5 = document.querySelector(".fifth");
let p6 = document.querySelector(".sixth");
let cartDiv = document.querySelector(".cart_items");
let checkoutButton = document.querySelector(".checkout");
let burger = document.querySelector(`#btn`);

bucketNumber();

// * * * P A G I N A T I O N * * *
checkSize();
function checkSize() {
  if (burger.style.display === "block") {
    return true;
  } else {
    return false;
  }
}

let current_page = 1;
let rows = 6;

function displayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;
  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);
  let e = 1;

  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];
    const product = document.createElement("li");
    product.className = "product";
    ulProducts.appendChild(product);

    product.addEventListener(`click`, (e) => {
      console.log(event.target.value);
      selectProduct(paginatedItems[i]);
    });

    const productImageWrapper = document.createElement("div");
    productImageWrapper.className = "product_img_wrapper";
    product.appendChild(productImageWrapper);

    const productImage = document.createElement("img");
    productImageWrapper.appendChild(productImage);
    productImage.src = `./images/${e}.png`;
    e++;
    const productDetails = document.createElement("div");
    productDetails.className = "product_details";
    product.appendChild(productDetails);

    const nameProduct = document.createElement("h3");
    nameProduct.className = "name";
    productDetails.appendChild(nameProduct);
    nameProduct.innerText = item.name;

    const typeProduct = document.createElement("h4");
    typeProduct.className = "type";
    typeProduct.innerText = item.type;
    productDetails.appendChild(typeProduct);

    const priceProduct = document.createElement("h3");
    priceProduct.className = "price";
    let price = item.price;
    price = price.toFixed(2);
    priceProduct.innerText = `$${price}`;
    product.appendChild(priceProduct);

    const addImageWrapper = document.createElement("div");
    addImageWrapper.className = "add_img_wrapper";
    product.appendChild(addImageWrapper);

    const addImage = document.createElement("img");
    addImage.src = "./images/add.png";
    addImageWrapper.appendChild(addImage);
  }
}

function pageNumbers(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";
  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = paginationButton(i, items);
    pageNumbersDiv.appendChild(btn);
  }
}

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.innerHTML = page;
  if (current_page == page) {
    button.className = "active";
  }

  button.addEventListener("click", function () {
    current_page = page;
    displayList(items, ulProducts, rows, current_page);
    let current_btn = document.querySelector(".page_numbers .active");
    current_btn.classList.remove("active");
    button.classList.add("active");
  });
  return button;
}

displayList(products, ulProducts, rows, current_page);
pageNumbers(products, pageNumbersDiv, rows);
// * * * E N D * P A G I N A T I O N * * *

// * * * F I L T E R * C O L O U R S * * *

let array = [];
for (let i = 0; i < products.length; i++) {
  for (let e = 0; e < products[i].colors.length; e++) {
    array.push(products[i].colors[e]);
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

let unique = array.filter(onlyUnique);

for (let i = 0; i < unique.length; i++) {
  let li = document.createElement("li");
  ulListColors.appendChild(li);

  let inputCheckbox = document.createElement("input");
  inputCheckbox.setAttribute("type", "checkbox");
  inputCheckbox.value = unique[i];
  inputCheckbox.name = "color";
  li.appendChild(inputCheckbox);

  let labelColor = document.createElement("label");
  labelColor.innerText = unique[i];
  labelColor.setAttribute("for", "color");
  li.appendChild(labelColor);

  // let p = document.createElement("p");
  // p.innerText = unique[i];
  // li.appendChild(p);
}

dropdownColourButton.addEventListener("click", function () {
  if (ulListColors.style.display === "none") {
    ulListColors.style.display = "block";
    ulListCategory.style.display = "none";
    pDropDown.setAttribute("style", "transform: rotate(90deg);");
    dropdown_category_btnP.setAttribute("style", "transform: rotate(270deg);");
  } else if (ulListColors.style.display === "block") {
    ulListColors.style.display = "none";

    pDropDown.setAttribute("style", "transform: rotate(270deg);");
  }
});

//  * * * E N D * F I L T E R * C O L O R S * * *

// * * *  C A T E G O R Y * F I L T E R * * *

let arrayCategory = [];
for (let i = 0; i < products.length; i++) {
  arrayCategory.push(products[i].type);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

let uniqueCategory = arrayCategory.filter(onlyUnique);

const createCategories = (uniqueCategory) => {
  uniqueCategory.forEach((category) => {
    let liCategory = document.createElement("li");
    ulListCategory.appendChild(liCategory);

    let inputCheckboxCategory = document.createElement("input");
    inputCheckboxCategory.setAttribute("type", "checkbox");
    inputCheckboxCategory.value = category;
    inputCheckboxCategory.name = "category";
    liCategory.appendChild(inputCheckboxCategory);

    let labelCategory = document.createElement("label");
    labelCategory.innerText = category;
    labelCategory.setAttribute("for", "category");
    liCategory.appendChild(labelCategory);
  });
};

createCategories(uniqueCategory);

let dropdown_category_btn = document.querySelector(".dropdown_category_btn");
let dropdown_category_btnP = dropdown_category_btn.querySelector("p");

dropdown_category_btn.addEventListener("click", function () {
  if (ulListCategory.style.display === "none") {
    ulListCategory.style.display = "block";
    ulListColors.style.display = "none";
    pDropDown.setAttribute("style", "transform: rotate(270deg);");
    dropdown_category_btnP.setAttribute("style", "transform: rotate(90deg);");
  } else if (ulListCategory.style.display === "block") {
    ulListCategory.style.display = "none";
    dropdown_category_btnP.setAttribute("style", "transform: rotate(270deg);");
  }
});

// * * * P R I C E  * R A N G E * S L I D E R * * *

function getVals() {
  // Get slider values
  let parent = this.parentNode;
  let slides = parent.getElementsByTagName("input");
  let slide1 = parseFloat(slides[0].value);
  let slide2 = parseFloat(slides[1].value);

  if (slide1 > slide2) {
    let tmp = slide2;
    slide2 = slide1;
    slide1 = tmp;
  }
  let minValue = document.querySelector(".min");
  let maxValue = document.querySelector(".max");
  minValue.innerText = `$${slide1}`;
  maxValue.innerText = `$${slide2}`;

  maxMinPrice.from = slide1;
  maxMinPrice.to = slide2;
}

window.onload = function () {
  // Initialize Sliders
  var sliderSections = document.getElementsByClassName("range-slider");
  for (let x = 0; x < sliderSections.length; x++) {
    var sliders = sliderSections[x].getElementsByTagName("input");
    for (var y = 0; y < sliders.length; y++) {
      if (sliders[y].type === "range") {
        sliders[y].oninput = getVals;
        // Manually trigger event first time to display values
        sliders[y].oninput();
      }
    }
  }
};

filters.addEventListener("change", () => {
  selectedCategories.splice(0, selectedCategories.length);
  selectedColors.splice(0, selectedColors.length);

  let checked = categoryContainer.querySelectorAll("input:checked");
  for (let i = 0; i < checked.length; i++) {
    selectedCategories.push(checked[i].value);
  }

  let checkedColors = colorContainer.querySelectorAll("input:checked");
  for (let i = 0; i < checkedColors.length; i++) {
    selectedColors.push(checkedColors[i].value);
  }

  let filterProducts = products
    .filter((product) => {
      let colorArray = product.colors;
      for (let i = 0; i < colorArray.length; i++) {
        if (
          selectedColors.length == 0 ||
          selectedColors.includes(colorArray[i])
        ) {
          return product;
        } else {
          return false;
        }
      }
    })
    .filter((product) => {
      if (
        selectedCategories.length == 0 ||
        selectedCategories.includes(product.type)
      ) {
        return true;
      } else {
        return false;
      }
    })
    .filter((product) => {
      if (
        product.price >= maxMinPrice.from &&
        product.price <= maxMinPrice.to
      ) {
        return true;
      } else {
        return false;
      }
    });

  let current_page = 1;
  let rows = 6;

  displayList(filterProducts, ulProducts, rows, current_page);
  pageNumbers(filterProducts, pageNumbersDiv, rows);
});

// * * * S O R T * B Y * * *

/*look for any elements with the class "custom-select":*/

let divSortBy = document.querySelector(".custom-select");

divSortBy.addEventListener("click", (event) => {
  for (let i = 0; i < selectContainer.length; i++) {
    let selected = selectContainer[i].getElementsByTagName("select")[0];
    let selectedOption = selected.options[selected.selectedIndex].value;
    console.log(selectedOption);
    if (selectedOption == 1) {
      products.sort((a, b) => {
        return a[0] - b[20];
      });
      console.log(products);
      let current_page = 1;
      let rows = 6;

      displayList(products, ulProducts, rows, current_page);
      pageNumbers(products, pageNumbersDiv, rows);
    } else if (selectedOption == 2) {
      products.sort((a, b) => {
        return a.price - b.price;
      });
      let current_page = 1;
      let rows = 6;

      displayList(products, ulProducts, rows, current_page);
      pageNumbers(products, pageNumbersDiv, rows);
    } else if (selectedOption == 3) {
      products.sort((a, b) => {
        return b.price - a.price;
      });
      let current_page = 1;
      let rows = 6;

      displayList(products, ulProducts, rows, current_page);
      pageNumbers(products, pageNumbersDiv, rows);
    }
  }
});

for (let i = 0; i < selectContainer.length; i++) {
  let selected = selectContainer[i].getElementsByTagName("select")[0];

  let div = document.createElement("DIV");
  div.setAttribute("class", "select-selected");
  div.innerHTML = selected.options[selected.selectedIndex].innerHTML;
  selectContainer[i].appendChild(div);

  let selectItems = document.createElement("DIV");
  selectItems.setAttribute("class", "select-items select-hide");
  for (let j = 1; j < selected.length; j++) {
    let selectedDiv = document.createElement("DIV");
    selectedDiv.innerHTML = selected.options[j].innerHTML;

    selectedDiv.addEventListener("click", function (e) {
      let select = this.parentNode.parentNode.querySelector("select");
      let prevSibling = this.parentNode.previousSibling;

      for (let i = 0; i < select.length; i++) {
        if (select.options[i].innerHTML == this.innerHTML) {
          select.selectedIndex = i;
          prevSibling.innerHTML = this.innerHTML;
          let sameAsSelected = this.parentNode.getElementsByClassName(
            "same-as-selected"
          );
          for (let k = 0; k < sameAsSelected.length; k++) {
            sameAsSelected[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      prevSibling.click();
    });

    selectItems.appendChild(selectedDiv);
  }
  selectContainer[i].appendChild(selectItems);

  div.addEventListener("click", function (e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(element) {
  let arrayNo = [];
  let selectItems = document.getElementsByClassName("select-items");
  let selectSelected = document.getElementsByClassName("select-selected");
  for (let i = 0; i < selectSelected.length; i++) {
    if (element == selectSelected[i]) {
      arrayNo.push(i);
    } else {
      selectSelected[i].classList.remove("select-arrow-active");
    }
  }
  for (let i = 0; i < selectItems.length; i++) {
    if (arrayNo.indexOf(i)) {
      selectItems[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);

// * * * D T A I L S * P A G E * * * function

const selectProduct = (product) => {
  console.log("selected product", product);
  mainSection.style.display = "none";
  detailsContainer.style.display = "block";

  let sliderImage;
  h2Name.innerHTML = product.name;
  pDetails.innerHTML = product.description;
  h4Price.innerHTML = `$${product.price.toFixed(2)}`;
  h5Delivery.innerHTML = `DISPATCHED IN 4-5 WEEKS <span>1 left</span>`;

  for (let i = 0; i < product.colors.length; i++) {
    let liColor = document.createElement("li");
    liColor.style.backgroundColor = product.colors[i];
    ulColors.appendChild(liColor);
  }
  p1.innerHTML = ` - Dimensions: W: ${product.dimensions.w}cm D:${product.dimensions.d}cm H: ${product.dimensions.h}cm`;
  p2.innerHTML = ` - Seat dimensions: W: ${product.seat_dimensions.w}cm D:${product.seat_dimensions.d}cm H: ${product.seat_dimensions.h}cm`;
  p3.innerHTML = ` - Weight: ${product.weight}kg`;
  p4.innerHTML = ` - Materials: ${product.materials} `;
  p5.innerHTML = ` - Filling Materials: ${product.filling_materials} `;
  p6.innerHTML = ` - Comfort level: ${product.comfort_level} `;

  buttonAddToBucket.onclick = () => {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    buttonAddToBucket.style.display = "none";
    checkoutButton.style.display = "block";
    bucketNumber();
  };
};

// * * * * C A R O U S E L * * *

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  let slides = document.querySelectorAll(".mySlides");
  let dots = document.querySelectorAll(".demo");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

nextButton.onclick = () => {
  plusSlides(1);
};

previousButton.onclick = () => {
  plusSlides(-1);
};

let currentImage = document.querySelectorAll(".demo .cursor");

for (let i = 0; i < currentImage.length; i++) {
  currentImage[i].onclick = () => {
    currentSlide(`${i}+1`);
  };
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
// * * * * * * * * * *

details.addEventListener("click", function () {
  if (divDetails.style.display == "none") {
    divDetails.style.display = "block";
  } else if (divDetails.style.display == "block") {
    divDetails.style.display = "none";
  }
});

function bucketNumber() {
  let number = cart.length;
  if (number > 0) {
    cartDiv.style.display = "block";
    cartDiv.innerHTML = number;
  } else {
    cartDiv.style.display = "none";
  }
}

function mobileFilter() {
  let filterButton = document.querySelector(`.dropdown_filter_btn`);
  let footer = document.querySelector(`.footer_nav_container`);
  let searchContainer = document.querySelector(`.search_container`);
  const body = document.querySelector(`body`);

  filterButton.addEventListener("click", () => {
    searchContainer.style.display = "none";
    filters.style.display = "block";
    divProducts.style.display = "none";
    footer.style.display = "none";
    body.setAttribute("style", "background-color: black;");
  });
}
mobileFilter();
