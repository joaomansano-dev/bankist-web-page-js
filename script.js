"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = 'We use cookies to improve our funconality and analitics';
message.innerHTML =
  'We use cookies to improve our funcionality and analitics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message);
// header.append(message);
// header.before(message);
// header.after(message);

message.style.backgroundColor = "#042d33";
//Delete element after the "got it"
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener(".click", function (e) {
  e.preventDefault();

  const section1Coords = section1.getBoundingClientRect();

  console.log(section1Coords);

  //Scrolling
  // window.scrollTo(
  // section1Coords.left + window.pageXOffset,
  // section1Coords.top + window.pageYOffset
  // )
  // });

  //Scrolling an object (old way plus behavior)
  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //Modern way
  section1Coords.scrollIntoView({ behavior: "smooth" });
});

// One way of doing it (not efficient one)
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log("LINK");

//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

document.querySelector(".nav__links").addEventListener("s click", function (e) {
  e.preventDefault();

  //Just the clicks on the buttons will work
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    console.log(e.target.getAttribute("href"));

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

tabsContainer.addEventListener("click", function (n) {
  const clicked = n.target.closest(".operations__tab"); //select the class even if the user clicks at the number

  //Guard clause that it's used to avoid doing sth if the user clicks at a non-button
  if (!clicked) return;

  //Remove active classes
  tabs.forEach((l) => l.classList.remove("operations__tab--active"));
  tabsContent.forEach((m) => m.classList.remove("operations__content--active"));

  //Active tab
  clicked.classList.add("operations__tab--active");

  //Adding the content of the active tab
  console.log(clicked.dataset.tab);

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logoImage = link.closest(".nav").querySelector("img");

    siblings.forEach((element) => {
      if (element !== link) {
        element.style.opacity = this;
      }
      logoImage.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));
