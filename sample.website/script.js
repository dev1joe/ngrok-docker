const projectsCountElement = document.getElementById('project-count');
const clientSatCountElement = document.getElementById('client-sat-count');
const experienceCountElement = document.getElementById('experience-count');

const observerOptions = {
    root: null, // The viewport is the root
    rootMargin: '0px',
    threshold: 0.5 // Triggers when at least 50% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is in view, start the animation
            animateCount(entry.target, entry.target.dataset.count);

            // Stop observing after the animation has started
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing elements
observer.observe(projectsCountElement);
observer.observe(clientSatCountElement);
observer.observe(experienceCountElement);

// Duration of the animation in milliseconds
function animateCount(element, finalNumber, duration = 10000) {
    let currentNumber = 0; // Starting number
    const increment = Math.ceil(finalNumber / (duration / 10)); // Increment calculated for a smooth count
    // This calculates how much to add in each step to reach the final number within the duration.

    const timer = setInterval(() => {
        currentNumber += increment;

        // Stop the animation if the current number exceeds the final number
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }

        // Update the text content of the element
        element.textContent = currentNumber + '+'; // Adds the plus sign
    }, 10); // Interval for each step
}