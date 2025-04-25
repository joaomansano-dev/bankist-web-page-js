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

btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();

  const section1Coords = section1.getBoundingClientRect();

  console.log(section1Coords);

  //   //Scrolling
  //   // window.scrollTo(
  //   // section1Coords.left + window.pageXOffset,
  //   // section1Coords.top + window.pageYOffset
  //   // )
  //   // });

  //   //Scrolling an object (old way plus behavior)
  //   // window.scrollTo({
  //   //   left: section1Coords.left + window.pageXOffset,
  //   //   top: section1Coords.top + window.pageYOffset,
  //   //   behavior: "smooth",
  //   // });

  //   //Modern way
  section1.scrollIntoView({ behavior: "smooth" });
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

document.querySelector(".nav__links").addEventListener("click", function (e) {
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

//Implementing Sticky Navegation
//Using scroll isn't the best option, so it's better to use the observerAPI
// const initialCoordsS1 = section1.getBoundingClientRect();
// console.log(initialCoordsS1);

// window.addEventListener("scroll", function () {
//   // console.log(this.window.scrollY);

//   if (this.window.scrollY > initialCoordsS1.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//Observer API
//The idea is to use it when the header intersection is 0, meaning that we want the ".nav" to be sticky
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNavHeader = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNavHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Revealing the sections

const allSections = document.querySelectorAll(".section");

//Callback function
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");

    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy Loading Images

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImage = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  //Replacing the source to the original image
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {});
  entry.target.classList.remove("lazy-img");

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  // rootMargin:'100px'
});

imgTargets.forEach((img) => imgObserver.observe(img));

//Slider Components
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  //Functions

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`) //selecting the slide and activating the dot
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slideIndex) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slideIndex)}%)`)
    );
  };

  //Next Slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activeDot(0);
  };
  init();

  //Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  //Adding key Events
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = Number(e.target.dataset.slide); //Getting the index of the slide position
      goToSlide(slide); //Going to the slide that is in the index of the dot
      activeDot(slide);
    }
  });
};
slider();
