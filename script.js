// Position Fix
$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
    } else {
        $('.nav').removeClass('affix');
    }
});

var plant_section = document.querySelector(".plant"); 

window.addEventListener('scroll',() => {

    const {scrollTop, clientHeight} = document.documentElement;

    const topElementToTopViewport = plant_section.getBoundingClientRect().top;
    
    if(scrollTop > topElementToTopViewport){
        plant_section.classList.add('fix-my-plants')
    }
    else{
        plant_section.classList.remove('fix-my-plants')

    }
     
})
// Hamburger
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});

// Carousel
const carousel = document.querySelector(".custom-carousel")
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i")


let isDragStart = false, isDragging=false, prevPageX, prevScrollLeft, positionDiff;
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

const showHideIcons = () => {
    arrowIcons[0].style.display = carousel.scrollLeft == 0? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth? "none" : "block";

}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        let firstImgWidth= firstImg.clientWidth + 14; //+margin-left

        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(),60);
    });
})

// const autoSlide = () => {
//     if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

//     positionDiff= Math.abs(positionDiff);
//     let firstImgWidth = firstImg.clientWidth + 14; //+margin-left
//     let valDifference = firstImgWidth - positionDiff;

//     if(carousel.scrollLeft > prevScrollLeft){
//         // scrolling to the right
//         return carousel.scrollLeft+= positionDiff >firstImgWidth /3 ? valDifference: -positionDiff

//     }
//     // scrolling to the left
//     carousel.scrollLeft-= positionDiff >firstImgWidth /3 ? valDifference: -positionDiff
// }

// const dragStart = (e) => {
//     isDragStart = true;
//     prevPageX = e.pageX || e.touches[0].pageX;
//     prevScrollLeft = carousel.scrollLeft;
// }

// const dragging = (e) => {
//     if(!isDragStart) return;
//     e.preventDefault();
//     isDragging = true;
//     positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
//     carousel.scrollLeft = prevScrollLeft - positionDiff;
//     showHideIcons();
// }

// const dragStop = (e) => {
//     isDragStart = false;
//     carousel.classList.remove("dragging")

//     if(!isDragging) return;
//     isDragging = false;
//     autoSlide()
// }

// carousel.addEventListener("mousedown", dragStart);
// carousel.addEventListener("mousemove", dragging);
// carousel.addEventListener("mouseup", dragStop);
// carousel.addEventListener("mouseleave", dragStop);

// carousel.addEventListener("touchstart", dragStart);
// carousel.addEventListener("touchmove", dragging);
// carousel.addEventListener("touchend", dragStop);
