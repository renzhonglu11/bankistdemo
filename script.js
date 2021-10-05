"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const msg = document.createElement("div");
msg.classList.add("cookie-message");
msg.innerHTML =
  'we use cookie for improving functionality <button class="btn btn--close--cookie">Got it</button>';

const header = document.querySelector(".header");
// header.append(msg);

// document
//   .querySelector(".btn--close--cookie")
//   .addEventListener("click", function () {
//     // msg.remove();
//     // 没有remove()时
//     msg.parentElement.removeChild(msg);
//   });

// scrolling
btnScroll.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log("x/y: ", window.scrollX, window.scrollY);
  console.log(s1coords);
  //scrolling
  window.scrollTo({
    top: s1coords.top + window.scrollY,
    left: s1coords.left + window.scrollX,
    behavior: "smooth",
  });

  section1.scrollIntoView({ behavior: "smooth" });
});
// page navigation
// document.querySelectorAll('.nav__link').forEach(
//     function(el){
//         el.addEventListener('click',function(e){
//             e.preventDefault();
//             const id = this.getAttribute('href');
//             document.querySelector(id).scrollIntoView({
//                 behavior:'smooth'
//             });

//         });
//     }
// );

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains("nav__link")) {
    // e.target 是最底层被hit中的，然后往上进行bubble phase
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

// TAB components
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContents = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove("operations__tab--active"));

  clicked.classList.add("operations__tab--active");

  // content area
  const tabNum = clicked.dataset.tab;
  console.log(tabNum);

  const content = document.querySelector(`.operations__content--${tabNum}`);
  tabContents.forEach(c => c.classList.remove("operations__content--active"));
  content.classList.add("operations__content--active");
});

// menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const links = e.target.closest(".nav").querySelectorAll(".nav__link");
    const logo = e.target.closest(".nav").querySelector("#logo");

    console.log(logo);

    links.forEach(el => {
      if (el !== e.target) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// sticky navigation
// window.addEventListener('scroll',function(e){
//   // console.log(window.scrollY);
//   // const s1 = section1.getBoundingClientRect();
//   // if(window.scrollY > s1.top) nav.classList.add('sticky');
//   // else nav.classList.remove('sticky');
//   const navHeight = nav.getBoundingClientRect();
//   console.log(navHeight);
// });

// const obsCallBack=function(entries,observer){
//   entries.forEach(entry=>{
//     console.log(entry);
//   });
// };
// const obsOptions={
//   root:null,
//   threshold:[0,0.2]
// };

// const observer = new IntersectionObserver(obsCallBack,obsOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// reveal sections
const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
  // console.log(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  // executing a callback function
  // you provide whenever the visibility of the target element changes
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (targets, observer) {
  const entry = targets[0];
  if (!entry.isIntersecting) return;
  // replace src with date-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img');

  // after finish loading
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-150px",
});

imgTargets.forEach(img => imgObserver.observe(img));

// slider
const slider = function(){
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const leftBtn = document.querySelector(".slider__btn--left");
const rightBtn = document.querySelector(".slider__btn--right");
let currentSlide = 0;

// slider.style.transform = "scale(0.8) translateX(-1300px)";
// slider.style.overflow = "visible";

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${i * 100 - slide * 100}%)`;
    // console.log(`translateX(${i * 100 - slide * 100}%)`);
  });
  // console.log("---------------");
};

// slides.forEach((s,i)=>{
//   s.style.transform = `translateX(${i*100}%)`;
// });

const nextSlide = function () {
  if (currentSlide >= slides.length - 1) currentSlide = 0;
  else currentSlide++;
  activateDot(currentSlide);
  goToSlide(currentSlide);
};

rightBtn.addEventListener("click", nextSlide);
// -100%, 0 , 100, 200

const prevSlide = function () {
  if (currentSlide <= 0) currentSlide = slides.length - 1;
  else currentSlide--;
  activateDot(currentSlide);
  goToSlide(currentSlide);
};
// 0,100,200,300
leftBtn.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  console.log(e);
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && prevSlide();
});

// create dots
const dotContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function(slide){
  
  document.querySelectorAll('.dots__dot').forEach(dot=>{
    
    dot.classList.remove('dots__dot--active');
  });
  document.querySelector(`.dots__dot[data-slide="${slide}"`)
  .classList.add('dots__dot--active');
}

const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);
}
init()

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const currentSlide = e.target.dataset.slide;
    console.log(currentSlide);
    activateDot(currentSlide);
    goToSlide(currentSlide);
  }
});

};
slider();



/////////////////////////////////////////////////
////////////////////////////////////////////////
// styles
// msg.style.backgroundColor = '#37384d';
// msg.style.width = '130%';

// console.log(msg.style.width);

// date arrtibute
// const logo = document.querySelector('#logo')
// console.log(logo.dataset.versionNumber);

// classes

// const h1 = document.querySelector("h1");
const alertH1 = function (e) {
  //   alert("addEvent");
};

// h1.addEventListener("mouseenter", alertH1);

// h1.onmouseenter = function(e){
//     alert('addEvent');

// };

// setTimeout(() => {
//   h1.removeEventListener("mouseenter", alertH1);
// }, 3000);

const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK',e.target);

//   // stop propagation
// //   e.stopPropagation();
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER',e.target);

// //   console.log('current:',e.currentTarget);
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV',e.target);
//   });

// const h1 = document.querySelector('h1');
// console.log(h1.parentNode);
