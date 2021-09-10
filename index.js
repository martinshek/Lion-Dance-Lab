//////// Carousel ////////
let sliderImages = document.querySelectorAll('.slide'),
  arrowLeft = document.querySelector('#arrow-left'),
  arrowRight = document.querySelector('#arrow-right'),
  current = 0;

// Clear All Images
function reset() {
  for (let i = 0; i < sliderImages.length; i++) {
    sliderImages[i].style.display = 'none';
  }
}

// Initialize Slider
function startSlide() {
  reset();
  sliderImages[0].style.display = "block";
}

//Show Previous
function slideLeft() {
  reset();
  sliderImages[current - 1].style.display = "block";
  current--;
}

//Show Next
function slideRight() {
  reset();
  sliderImages[current + 1].style.display = "block";
  current++;
}

//Left Arrow Click
arrowLeft.addEventListener('click', function() {
  if (current === 0) {
    current = sliderImages.length;
  }
  slideLeft();
});

//Right Arrow Click
arrowRight.addEventListener('click', function() {
  if (current === sliderImages.length - 1) {
    current = -1;
  }
  slideRight();
});

startSlide();

//////// Select Shapes ////////
const overlays = [];
document.querySelectorAll(".area").forEach(function(path) {
  path.onclick = chooseArea;
})

function chooseArea(e) {
  overlays.push(e.target);
  overlays.forEach((overlay) => overlay.classList.add('highlight'));
}

//////// Remove highlight when clicking outside of image ////////
var removeHighlight = function(e) {
  var areas = document.querySelectorAll('.area');

  if (!e.target.classList.contains('area') && !e.target.classList.contains('color')) {
    overlays.length = 0;
    document.querySelectorAll('.area').forEach(function(prod) {
      prod.classList.remove('highlight');
    });
  }
}
document.onclick = removeHighlight;

//////// Remove highlight of a specific shape ////////
function chooseArea(e) {
  for (let i = 0; i < overlays.length; i += 1) {
    let currentOverlay = overlays[i];
    if (currentOverlay.isSameNode(e.target)) {
      overlays.splice(i, 1);
      e.target.classList.remove('highlight')
      return;
    }
  }
  overlays.push(e.target);
  overlays.forEach((overlay) => overlay.classList.add("highlight"));
}

//////// Get and Set Colors ////////

// Click on a color
var el = document.getElementsByClassName("color");
for (var i = 0; i < el.length; i++) {
  el[i].onclick = changeColor;
}

function changeColor(e) {
  // get the hex color
  let hex = e.target.getAttribute("data-hex");
  // set the hex color
  overlays.forEach((overlay) => overlay.style.fill = hex);
}
