const hero = document.querySelector(".hero");
const slider = document.querySelector(".slider");
const logo = document.querySelector("#logo");
const hamburger = document.querySelector(".hamburger");
const headline = document.querySelector(".headline");
const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');



const tl = new TimelineMax();
tl.fromTo(hero, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut })
.fromTo(hero , 1.2 , { width: "100%" }, { width: "80%", ease: Power2.easeInOut })
.fromTo(slider , 0.8 , {x:"-100%"} , {x:"0%", ease:Power2.easeInOut})



openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-100%';
}