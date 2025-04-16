// Gallery page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery page loaded');
    
    // Setup lightbox
    setupLightbox();
    
    // Setup category filtering
    setupCategoryFiltering();
});

// Setup lightbox options
function setupLightbox() {
    // Check if lightbox is available
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 300,
            'wrapAround': true,
            'fadeDuration': 300,
            'albumLabel': "Photo %1 of %2",
            'positionFromTop': 50
        });
    } else {
        console.log('Lightbox library not loaded yet');
    }
}

// Setup category filtering functionality
function setupCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.btn-category');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const noItemsMessage = document.querySelector('.no-items-message');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            let visibleItems = 0;
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    visibleItems++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide "no items" message
            if (visibleItems === 0) {
                noItemsMessage.classList.remove('d-none');
            } else {
                noItemsMessage.classList.add('d-none');
            }
        });
    });
}

// Function to add hover animations to gallery cards
document.addEventListener('DOMContentLoaded', function() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Create random sparkle effects in the gallery
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Only proceed if we're on the gallery page
    if (galleryContainer) {
        // Add occasional sparkles
        setInterval(() => {
            addRandomSparkle(galleryContainer);
        }, 2000);
    }
});

// Add a random sparkle to the container
function addRandomSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'random-sparkle';
    
    // Random position within the container
    const containerRect = container.getBoundingClientRect();
    const x = Math.random() * containerRect.width;
    const y = Math.random() * containerRect.height;
    
    // Set sparkle styles
    sparkle.style.position = 'absolute';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = '8px';
    sparkle.style.height = '8px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.boxShadow = '0 0 8px 2px rgba(255, 209, 102, 0.8)';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10';
    sparkle.style.opacity = '0';
    
    // Add to container
    container.appendChild(sparkle);
    
    // Animate sparkle
    setTimeout(() => {
        sparkle.style.transition = 'all 1.5s ease-out';
        sparkle.style.opacity = '1';
        sparkle.style.transform = 'scale(1.5) translateY(-20px)';
        
        setTimeout(() => {
            sparkle.style.opacity = '0';
            
            // Remove sparkle after animation
            setTimeout(() => {
                container.removeChild(sparkle);
            }, 1500);
        }, 1000);
    }, 10);
}
