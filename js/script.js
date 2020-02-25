const arrows = document.querySelectorAll('.arrow');
const dots = document.querySelectorAll('.dot');  //to attach click event
const navBar = document.querySelector('#navbar');
const navBarItem = Array.from(document.querySelectorAll('.nav-link'));
const sections =  Array.from(document.querySelectorAll('section'));
const images =  Array.from(document.querySelectorAll('.img'));
const lightboxImg = Array.from(document.querySelectorAll('.lightbox-item'));
const exitButton = document.querySelector('.close-button');
const lightBox = document.querySelector('.lightbox-container');

const navToggler = document.querySelector('.navbar-toggler');
const toggleNavBar = document.querySelector('.navbar-collapse')

let index = 0, interval;
let items = [], dotElement = [];

function startAnimationOnLoad() {
    let temp = document.getElementById('home');

    clearCurrentItem(temp);

    index++;
    if(index > items.length-1) { index = 0; }

    if(items.length > 0) { items[index].classList.add('visible'); }
    if(dotElement.length > 0) { dotElement[index].classList.add('active'); }
}

function clearCurrentItem(temp) {
    items = Array.from(temp.querySelectorAll('.items-container .item'));
    dotElement = Array.from(temp.querySelectorAll('.dots .dot'));

    if(!items || items.length == 0) { return }

    return items.forEach(item => {
        if (item.classList.contains('visible')) {
            index = items.indexOf(item);
            item.classList.remove('visible');
            if(dotElement.length > 0) { dotElement[index].classList.remove('active'); }
        }
    });
}

function handleArrows() {
    let temp = this.parentElement.parentElement;
    if(temp.id == 'home') { clearInterval(interval); }

    clearCurrentItem(temp);

    if (this.id === "right-arrow") {
        index++;
        if(index > items.length-1) { index = 0; }
    } else if (this.id === "left-arrow") {
        index--;
        if(index < 0) { index = items.length-1; }
    }

    if(items.length > 0) { items[index].classList.add('visible'); }
    if(dotElement.length > 0) { dotElement[index].classList.add('active'); }
    if(temp.id == 'home') { interval = setInterval(startAnimationOnLoad, 3000); }
}


function handleDots() {
    let temp = this.parentElement.parentElement;
    if(temp.id == 'home') { clearInterval(interval); }

    clearCurrentItem(temp);
    
    index = dotElement.indexOf(this);
    if(items.length > 0) { items[index].classList.add('visible'); }
    this.classList.add('active');
 
    if(temp.id == 'home') { interval = setInterval(startAnimationOnLoad, 3000); }
}

//click on each nav link item ///////////////////
///*/////////
function  handleNavLinks() {
    let s1 = this.id;
    let s2 = s1.substr(1); 
    let id = document.getElementById(s2); 
    scrollTo(id);
    
    if (toggleNavBar.classList.contains('show')) {
        toggleNavBar.classList.remove('show');
        navToggler.classList.add('collapsed');
        navToggler.setAttribute('aria-expanded', false);
    }

    this.classList.add('selected');
    navBarItem.forEach(link => {
        if (link.classList.contains('selected')) {
            link.classList.remove('selected');
        }
    });
}

scrollTo = (element) => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop 
      });   
    console
  }


//menu on scroll//////////////////////////////////
///******************************************** */
function navbarOnScroll() {
    let scrollDistance = window.pageYOffset;
    let rect = sections[0].getBoundingClientRect();

    if(rect.y >= 0 && rect.y < 50) {
        navBarItem[0].classList.add('selected');
        cleanSelectedItem(navBarItem[0]);
    }

    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        let rectuno = sections[1].getBoundingClientRect();
        //console.log(rectuno.y);

        let y = parseInt(rect.y);
        if(y <= 0) {
            navBarItem[sections.indexOf(section)].classList.add('selected');
            let currentItem = navBarItem[sections.indexOf(section)];
            cleanSelectedItem(currentItem);
        } 
    });


    scrollDistance > 100 ? (
        navBar.classList.remove('menu-scrolled-down')
    ) : navBar.classList.add('menu-scrolled-down');

    scrollDistance > 600 ? (
        navBar.classList.add('menu-scrolled-down'),
        navBar.classList.add('scroll')
    ) : navBar.classList.remove('scroll');
}


function cleanSelectedItem(item) {
    navBarItem.forEach(link => {
        if (link.classList.contains('selected') && link != item) {
            link.classList.remove('selected');
        }
    });
}

//GAleria functions/////////////////////////////////
//****************************************************8 */

function handleClickOnItem() {
    let index = images.indexOf(this);
    lightBox.classList.add('active');

    lightboxImg[index].classList.add('visible');
}

function exitFunction() {
    lightBox.classList.remove('active');

    lightboxImg.forEach(lBox => {
        lBox.classList.remove('visible');
    });
}

function handleDirection() {
    let index = 0;
    lightboxImg.forEach(item => {
        if(item.classList.contains('visible')) {
            index = lightboxImg.indexOf(item);
            item.classList.remove('visible');
        }
    });

    if(this.id == 'right-arrow') {
        index++;
        if(index > lightboxImg.length - 1) { index = 0; }
    } else {
        index--;
        if(index < 0) { index = lightboxImg.length - 1; }
    }
    lightboxImg[index].classList.add('visible');
}


/////fin galeria functions///////
//************************************************** */

//adding events to elements
arrows.forEach(arrow => arrow.addEventListener('click', handleArrows));
dots.forEach(dot => dot.addEventListener('click', handleDots));
document.addEventListener('scroll', navbarOnScroll);
navBarItem.forEach(link => link.addEventListener('click', handleNavLinks));

images.forEach(img => img.addEventListener('click', handleClickOnItem));
exitButton.addEventListener('click', exitFunction);
//arrows.forEach(arrow => arrow.addEventListener('click', handleDirection));
document.addEventListener('DOMContentLoaded', () => {
    navBar.classList.add('menu-scrolled-down');
    interval = setInterval(startAnimationOnLoad, 3000);
});
