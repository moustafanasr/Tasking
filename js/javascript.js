// Select the necessary elements
const svgPath = document.querySelector('.div-line .line_set svg path');
const svg = document.querySelector('.div-line .line_set svg');

// Function to calculate the curve value based on mouse distance
function calculateCurve(mouseY, pathY, maxCurve) {
  const distance = Math.abs(mouseY - pathY); // Distance between mouse and path
  const maxDistance = 50; // Maximum range for proximity effect (100px)

  // Normalize proximity to [0, 1]: Closer mouse -> proximity = 1, farther -> proximity = 0
  const proximity = Math.max(0, Math.min(1, 1 - distance / maxDistance));
  console.log('Proximity:', proximity);

  // Return curve value decreasing from maxCurve (30) to 0
  return maxCurve * proximity;
}

// Function to animate the curve value transition
function animateCurveValue(startValue, targetValue, duration, onUpdate, onComplete) {
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Clamp progress to [0, 1]

    // Interpolate the curve value
    const currentValue = startValue + (targetValue - startValue) * progress;

    // Call the update callback with the interpolated value
    onUpdate(currentValue);

    if (progress < 1) {
      requestAnimationFrame(animate); // Continue animation
    } else if (onComplete) {
      onComplete(); // Call the completion callback if provided
    }
  }

  requestAnimationFrame(animate);
}

// Function to handle mouse movement
function handleMouseMove1(event) {
  const mouseX = event.clientX; // Mouse X position
  const mouseY = event.clientY; // Mouse Y position
  const pathY = svg.getBoundingClientRect().top; // Y position of the path

  // Only show and update the path if mouse Y position is less than 200
  if (mouseY < 160) {
    svg.style.display = 'block'
    // Calculate the target curve value dynamically based on mouse proximity
    let targetCurveValue = calculateCurve(mouseY, pathY, 10); // Maximum curve = 30

    // Add 20 to targetCurveValue if mouse Y position is greater than 95
    if (mouseY > 95) {
      targetCurveValue += 20;
    }

    console.log('Target Curve Value:', targetCurveValue);

    // Get the current curve value from the `d` attribute
    const currentD = svgPath.getAttribute('d');
    const match = currentD.match(/C 60 (-?\d+\.?\d*), 60 (-?\d+\.?\d*),/); // Extract curve value
    const currentCurveValue = match ? parseFloat(match[1]) || 0 : 0;

    // Animate the curve transition
    animateCurveValue(
      currentCurveValue,
      targetCurveValue,
      500, // Duration of the animation in milliseconds
      (animatedValue) => {
        // Update the path's `d` attribute with the animated curve value
        const d = `M 0 30 C 60 ${animatedValue}, 60 ${animatedValue}, 120 30`;
        svgPath.setAttribute('d', d);
      }
    );

    // Position the SVG relative to the mouse's X position
    svg.style.transform = `translate(${mouseX - 60}px, -97%)`;

    // Make the path visible with updated attributes
    svgPath.style.display = 'block';
    svgPath.style.opacity = '1';
  } else {
    // Hide the path if the mouse's Y position is 200 or greater
    hidePath();
  }
}

// Function to hide the path with a smooth transition
function hidePath() {
  svgPath.style.opacity = '0'; // Gradually fade out the path
  setTimeout(() => {
    if (svgPath.style.opacity === '0') {
      svgPath.style.display = 'none'; // Hide completely after fading out
      svg.style.display = 'none'
    }
  }, 1000); // Matches the fade-out transition duration
}

// Function to handle mouse leave
function handleMouseLeave1() {
  hidePath(); // Hide the path when the mouse leaves the window
}

// Add event listeners
window.addEventListener('mousemove', handleMouseMove1);
window.addEventListener('mouseleave', handleMouseLeave1);




// Function to handle mouse movement
function logMousePosition(event) {
  const mouseX = event.clientX; // Get the X position of the mouse
  const mouseY = event.clientY; // Get the Y position of the mouse

  // Log the position to the console
  console.log(`Mouse Position: X=${mouseX}, Y=${mouseY}`);
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
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
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
const line1Bottom = document.querySelector('header .div-nav .div-button .list5 .line1 .bottom');
const line2Top = document.querySelector('header .div-nav .div-button .list5 .line2 .top');
const line3Bottom = document.querySelector('header .div-nav .div-button .list5 .line3 .bottom');

// Function to reverse animation when it reaches the max value
function reverseAnimation() {
  // Check if the transform of the line1Bottom has reached 200% (end of the animation)
  if (line1Bottom.style.transform === 'translateY(200%)') {
    line1Bottom.style.animation = 'move-bottom-reverse 1s forwards'; // Apply reverse animation for line1
  }

  // Check if the transform of the line2Top has reached -195% (end of the animation)
  if (line2Top.style.transform === 'translateY(-195%)') {
    line2Top.style.animation = 'move-top-reverse 1s forwards'; // Apply reverse animation for line2
  }

  // Check if the transform of the line3Bottom has reached 200% (end of the animation)
  if (line3Bottom.style.transform === 'translateY(200%)') {
    line3Bottom.style.animation = 'move-bottom-reverse 1s forwards'; // Apply reverse animation for line3
  }
}

// Listen for when the animation ends
line1Bottom.addEventListener('animationend', reverseAnimation);
line2Top.addEventListener('animationend', reverseAnimation);
line3Bottom.addEventListener('animationend', reverseAnimation);

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
