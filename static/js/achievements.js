// Achievements page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Achievements page loaded');
    
    // Animate timeline items when they come into view
   animateTimelineItems();
    
    // Add scroll effects to achievement counters
    setupCounterAnimation();
    
    // Add ribbon animation to achievements page
    addRibbonAnimation();
});

// Function to animate timeline items when they come into view
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                entry.target.classList.add('animate__animated');
                
                // Add different animations based on position
                if (entry.target.offsetLeft === 0) {
                    entry.target.classList.add('animate__fadeInLeft');
                } else {
                    entry.target.classList.add('animate__fadeInRight');
                }
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each timeline item
    timelineItems.forEach(item => {
        // Set initial styles
        item.style.opacity = '1';
        item.style.transform = 'none';
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        // Add custom animation class
        if (item.offsetLeft === 0) {
            item.style.transform = 'translateX(-30px)';
        } else {
            item.style.transform = 'translateX(30px)';
        }
        
        observer.observe(item);
    });
}

// Function to animate medal counters
function setupCounterAnimation() {
    const medalCounters = document.querySelectorAll('.medal-count');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get target value
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, 0, target);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe each counter
    medalCounters.forEach(counter => {
        // Store original value
        const originalValue = counter.textContent;
        counter.setAttribute('data-target', originalValue);
        
        // Set initial value to 0
        counter.textContent = '0';
        
        observer.observe(counter);
    });
}

// Function to animate a counter from start to end
function animateCounter(element, start, end) {
    let current = start;
    const duration = 1000; // ms
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    
    const timer = setInterval(() => {
        current++;
        element.textContent = current;
        
        if (current >= end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Function to add ribbon animation to achievements page
function addRibbonAnimation() {
    const achievementsContainer = document.querySelector('.achievements-container');
    
    // Only proceed if we're on the achievements page
    if (achievementsContainer) {
        for (let i = 0; i < 3; i++) {
            createAnimatedRibbon(achievementsContainer);
        }
    }
}

// Function to create an animated ribbon
function createAnimatedRibbon(container) {
    const ribbon = document.createElement('div');
    ribbon.className = 'animated-ribbon';
    
    // Random position and size
    const startX = -150;
    const startY = Math.random() * window.innerHeight;
    const width = 100 + Math.random() * 50;
    const height = width * 0.6;
    
    // Style the ribbon
    ribbon.style.position = 'fixed';
    ribbon.style.left = `${startX}px`;
    ribbon.style.top = `${startY}px`;
    ribbon.style.width = `${width}px`;
    ribbon.style.height = `${height}px`;
    ribbon.style.background = 'url(/static/images/ribbon.svg) no-repeat center center / contain';
    ribbon.style.opacity = '0.6';
    ribbon.style.pointerEvents = 'none';
    ribbon.style.zIndex = '-1';
    ribbon.style.filter = 'hue-rotate(' + (Math.random() * 360) + 'deg)';
    
    // Append to container
    document.body.appendChild(ribbon);
    
    // Animate the ribbon
    const duration = 15 + Math.random() * 10;
    const delay = Math.random() * 5;
    
    ribbon.animate([
        { left: `${startX}px`, top: `${startY}px`, transform: 'rotate(0deg)' },
        { left: `${window.innerWidth + 150}px`, top: `${startY + (Math.random() * 200 - 100)}px`, transform: 'rotate(360deg)' }
    ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'linear',
        iterations: Infinity
    });
}
