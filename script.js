"use strict";
// --------------------------------------------------------------
// Position Fix
// --------------------------------------------------------------
$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
        $('.navTrigger').addClass('affix');
    } else {
        $('.nav').removeClass('affix');
        $('.navTrigger').removeClass('affix');
    }
});

// --------------------------------------------------------------
// Hamburger
// --------------------------------------------------------------
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});

// --------------------------------------------------------------
// Carousel
// --------------------------------------------------------------
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i.arrow");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; 
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    // if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; 
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
// autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
// wrapper.addEventListener("mouseleave", autoPlay);

// --------------------------------------------------------------
// Modal - Send a message
// --------------------------------------------------------------
const sendMessageModal = document.getElementById('sendMessageModal')
var messageTextArea = document.getElementById('message-text');
var sendButton = document.getElementsByClassName('btn-send')[0];
let recipient = "";
let plantName = "";

sendMessageModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget;
  recipient = button.getAttribute('data-to-owner');
  plantName = button.getAttribute('data-plant-name');

  const modalTitle = sendMessageModal.querySelector('.modal-title')
  modalTitle.textContent = `New message to ${recipient}`
  messageTextArea.value = "";
})

sendButton.addEventListener('click', function() {
    sendMail(recipient, plantName);
})

function sendMail(recipient,plantName) {
    var message = document.getElementById("message-text").value;
    let subject = "Message à propos de votre plante " + plantName 
    var mailtoLink = "mailto:"+recipient+"?subject="+subject+"&body=" + encodeURIComponent(message);
    window.location.href = mailtoLink;
}

// --------------------------------------------------------------
// Modal - Upload
// --------------------------------------------------------------
const uploadModal = document.getElementById('uploadModal')
uploadModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget
  const owner = button.getAttribute('data-bs-owner-id')
  const modalTitle = uploadModal.querySelector('.modal-title')

  modalTitle.textContent = `Uploader les plantes (${owner})`
})

// --------------------------------------------------------------
// Tooltip
// --------------------------------------------------------------
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// --------------------------------------------------------------
// Display uploading Image
// --------------------------------------------------------------
function readFile() {
    if (!this.files || !this.files[0]) return;
    const FR = new FileReader();
    FR.addEventListener("load", function(evt) {
      document.querySelector("#img").src         = evt.target.result;
    }); 
    FR.readAsDataURL(this.files[0]);
  }
  
  document.querySelector("#inp").addEventListener("change", readFile);