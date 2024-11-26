// Select the necessary elements
const svgPath = document.querySelector('.div-line .line_set svg path');
const svg = document.querySelector('.div-line .line_set svg');

// Function to change the path color
function changePathColor(color) {
  svgPath.setAttribute('stroke', color);
  svgPath.setAttribute('stroke-width', '2');
}

// Function to calculate the curve value based on mouse distance
function calculateCurve(mouseY, pathY, startValue, endValue) {
  const distance = Math.abs(mouseY - pathY);
  const maxDistance = 450;
  const proximity = Math.max(0, Math.min(1, 1 - distance / maxDistance));
  return startValue + (endValue - startValue) * proximity;
}

// Update the path dynamically with Cubic Bezier Curves
function handleMouseMove1(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const pathY = svg.getBoundingClientRect().top;

  if (mouseY < 130) {
    svg.style.display = 'block';

    // Change color and stroke width based on mouse position
    if (mouseY < 87 && mouseY > 1) {
      changePathColor('rgba(255, 255, 255, 0.575)');
      svgPath.setAttribute('stroke-width', '1.5');

    } else {
      changePathColor('rgba(255, 255, 255, 0.275)');
    }

    // Calculate dynamic curve values
    let targetC1y2 = calculateCurve(mouseY, pathY, 22, 0);
    let targetC1y = calculateCurve(mouseY, pathY, 22, 0);
    let targetC2y1 = calculateCurve(mouseY, pathY, 22, 0);

    // Adjust the control points based on mouseY range
    if (mouseY > 60 && mouseY < 70) {
      const offset = Math.floor((mouseY / 10) + 6);
      targetC1y2 += offset;
      targetC1y += offset;
      targetC2y1 += offset;
    }
    if (mouseY > 70) {
      const offset = Math.floor((mouseY / 10) + 7);
      targetC1y2 += offset;
      targetC1y += offset;
      targetC2y1 += offset;
    }

    // Construct the path 'd' dynamically with updated control points
    const d = `
      M0 22
      C61 22 85 ${targetC1y2}
      115 ${targetC1y}
      170 ${targetC2y1}
      153 22 300 22
    `;
    svgPath.setAttribute('d', d);

    // Apply z-index for the path to ensure it appears on top
    // svgPath.style.zIndex = '1000';
    // svg.style.zIndex = '10';

    // Smoothly translate the SVG element based on mouse position
    svg.style.transition = 'all .3s';
    svg.style.transform = `translate(${mouseX - 120}px, -90%)`;
    svgPath.style.transition = 'all 0.3s linear';

    // Ensure the path is visible
    svgPath.style.display = 'block';
    svgPath.style.opacity = '1';
  } else {
    hidePath();
  }
}

// Function to hide the path with a smooth transition
function hidePath() {
  svgPath.style.opacity = '0';
  setTimeout(() => {
    if (svgPath.style.opacity === '0') {
      svg.style.display = 'none';
    }
  }, 0);
  setTimeout(() => {
    if (svgPath.style.opacity === '0') {
      svg.style.display = 'none';
      svgPath.style.display = 'none';
    }
  }, 800);
}

// Function to handle mouse leave
function handleMouseLeave1() {
  changePathColor('rgba(255, 255, 255, 0.295)');
  hidePath();
}

// Add event listeners
window.addEventListener('mousemove', handleMouseMove1);
window.addEventListener('mouseleave', handleMouseLeave1);


// Function to handle mouse movement
function logMousePosition(event) {
  const mouseX = event.clientX; // Get the X position of the mouse
  const mouseY = event.clientY; // Get the Y position of the mouse

  // Log the position to the console
  // console.log(`Mouse Position: X=${mouseX}, Y=${mouseY}`);
}

// Add an event listener to track mouse movement
window.addEventListener('mousemove', logMousePosition);






const reelCircle = document.querySelector('.reel-circle-set');

// Function to handle mouse movement over the element
function handleMouseMove(event) {
  const rect = reelCircle.getBoundingClientRect(); // Get the element's position
  const xPercent = ((event.clientX - rect.left) / rect.width) * 2 - 1; // Range: -1 to 1
  const yPercent = ((event.clientY - rect.top) / rect.height) * 2 - 1; // Range: -1 to 1

  const xTranslate = xPercent * 2; // Scale to -2em to 2em
  const yTranslate = yPercent * 2; // Scale to -2em to 2em

  reelCircle.style.transform = `translate(${xTranslate}em, ${yTranslate}em)`;
}

// Add event listeners for hover and movement
reelCircle.addEventListener('mouseenter', () => {
  reelCircle.addEventListener('mousemove', handleMouseMove);
});

reelCircle.addEventListener('mouseleave', () => {
  // Reset the position and remove the mousemove listener
  reelCircle.style.transform = `translate(0%, 0%)`;
  reelCircle.removeEventListener('mousemove', handleMouseMove);
});





// Detect when the element is in the viewport
const elements = document.querySelectorAll('.morse-static');

function isElementInView(el) {
  return el.getBoundingClientRect();
}

function handleScroll() {
  elements.forEach((el) => {
    if (isElementInView(el)) {
      el.classList.add('inview');
    }
  });
}

// Initial check
handleScroll();

// Listen for scroll events
window.addEventListener('scroll', handleScroll);





// Select the elements for the lines
// const line1Bottom = document.querySelector('header .div-nav .div-button .list5 .line1 .bottom');
// const line2Top = document.querySelector('header .div-nav .div-button .list5 .line2 .top');
// const line3Bottom = document.querySelector('header .div-nav .div-button .list5 .line3 .bottom');

// // Function to reverse animation when it reaches the max value
// function reverseAnimation() {
//   // Check if the transform of the line1Bottom has reached 200% (end of the animation)
//   if (line1Bottom.style.transform === 'translateY(200%)') {
//     line1Bottom.style.animation = 'move-bottom-reverse 1s forwards'; // Apply reverse animation for line1
//   }

//   // Check if the transform of the line2Top has reached -195% (end of the animation)
//   if (line2Top.style.transform === 'translateY(-195%)') {
//     line2Top.style.animation = 'move-top-reverse 1s forwards'; // Apply reverse animation for line2
//   }

//   // Check if the transform of the line3Bottom has reached 200% (end of the animation)
//   if (line3Bottom.style.transform === 'translateY(200%)') {
//     line3Bottom.style.animation = 'move-bottom-reverse 1s forwards'; // Apply reverse animation for line3
//   }
// }

// // Listen for when the animation ends
// line1Bottom.addEventListener('animationend', reverseAnimation);
// line2Top.addEventListener('animationend', reverseAnimation);
// line3Bottom.addEventListener('animationend', reverseAnimation);

// Keyframes for the "move-bottom-reverse" animation (reverse animation for line1 and line3)
// @keyframes move-bottom-reverse {
//   0% {
//     transform: translateY(200%);
//   }
//   100% {
//     transform: translateY(0%);
//   }
// }

// Keyframes for the "move-top-reverse" animation (reverse animation for line2)
// @keyframes move-top-reverse {
//   0% {
//     transform: translateY(-195%);
//   }
//   100% {
//     transform: translateY(0%);
//   }
// }
