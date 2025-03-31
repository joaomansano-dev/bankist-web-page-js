'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies to improve our funconality and analitics';
message.innerHTML =
  'We use cookies to improve our funcionality and analitics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message);
// header.append(message);
// header.before(message);
// header.after(message);

message.style.backgroundColor = '#042d33';
//Delete element after the "got it"
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

  const btnScrollTo = document.querySelector('.btn--scroll-to');
  const section1 = document.querySelector('#section--1');

  btnScrollTo.addEventListener('.click', function(e){
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
    section1Coords.scrollIntoView({behavior: 'smooth'});

  });