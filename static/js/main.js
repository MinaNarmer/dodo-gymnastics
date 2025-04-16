// Main JavaScript file for Diana Mina's Gymnastics World Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Welcome to Diana Mina\'s Gymnastics World!');
    
    // Add animation class to elements with data-animate attribute
    animateElements();
    
    // Add sparkle effect on hover for specific elements
    setupSparkleEffect();
    
    // Add hover effects for timeline items
    setupTimelineHover();
});

// Function to animate elements when they come into view
function animateElements() {
    const elementsToAnimate = document.querySelectorAll('.fun-fact-card, .hobby-card, .medal-counter, .award-card');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Setup initial styles and add observer
    elementsToAnimate.forEach(element => {
        // Set initial styles
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Observe element
        observer.observe(element);
    });
}

// Function to add sparkle effect on hover for specific elements
function setupSparkleEffect() {
    const sparkleElements = document.querySelectorAll('.btn, .navbar-brand, .page-title');
    
    sparkleElements.forEach(element => {
        element.addEventListener('mouseover', function(e) {
            createSparkle(e.target);
        });
    });
}

// Function to create a sparkle effect
function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.className = 'dynamic-sparkle';
    
    // Position sparkle randomly within the element
    const rect = element.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.position = 'absolute';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.boxShadow = '0 0 10px 2px #FFD166';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.opacity = '0';
    
    // Append sparkle to element
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(sparkle);
    
    // Animate sparkle
    setTimeout(() => {
        sparkle.style.transition = 'all 0.5s ease-out';
        sparkle.style.opacity = '1';
        sparkle.style.transform = 'scale(1.5)';
        
        setTimeout(() => {
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0)';
            
            // Remove sparkle after animation
            setTimeout(() => {
                element.removeChild(sparkle);
            }, 500);
        }, 300);
    }, 10);
}

// Function to add hover effects for timeline items
function setupTimelineHover() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-content').style.transform = 'scale(1.03)';
            this.querySelector('.timeline-content').style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-content').style.transform = 'scale(1)';
            this.querySelector('.timeline-content').style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Function to create and animate floating elements
function createFloatingElement(type, parent) {
    const element = document.createElement('img');
    element.src = `/static/images/${type}.svg`;
    element.className = `floating-${type}`;
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Style the element
    element.style.position = 'absolute';
    element.style.left = `${x}%`;
    element.style.top = `${y}%`;
    element.style.width = `${type === 'ribbon' ? 60 : 30}px`;
    element.style.height = `${type === 'ribbon' ? 60 : 30}px`;
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '-1';
    
    // Animation
    const duration = 5 + Math.random() * 10;
    const delay = Math.random() * 5;
    
    element.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
    
    // Add to parent
    parent.appendChild(element);
    
    return element;
}
