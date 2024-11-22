const slideIndices = {
    showing: 0,
    upcoming: 0
};

function moveSlide(sliderName, direction) {
    const slider = document.querySelector(`.${sliderName}-slider .slider`);
    const slides = document.querySelectorAll(`.${sliderName}-slider .movie-slide`);

    const slideWidth = slides[0].offsetWidth;

    // Calculate number of visible slides based on container width
    const visibleSlides = Math.floor(slider.parentElement.offsetWidth / slideWidth);
    const maxIndex = slides.length - visibleSlides; // Max index for boundary

    // Update slide index for looping behavior
    slideIndices[sliderName] += direction;
    if (slideIndices[sliderName] < 0) {
        slideIndices[sliderName] = maxIndex; // Loop back to the last slide
    } else if (slideIndices[sliderName] > maxIndex) {
        slideIndices[sliderName] = 0; // Loop back to the first slide
    }

    // Move the slider
    slider.style.transform = `translateX(-${slideWidth * slideIndices[sliderName]}px)`;
}

// Optional: Auto-resize slider on window resize
window.addEventListener('resize', () => {
    moveSlide('showing', 0); // Recalculate visible slides and adjust position
    moveSlide('upcoming', 0); // Recalculate visible slides and adjust position
});