// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Photo Gallery Carousel (only runs if carousel elements exist)
const carouselContainer = document.getElementById('carouselContainer');
if (carouselContainer) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const totalSlides = slides.length;

    function updateCarousel() {
        const offset = -currentSlide * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    window.moveCarousel = function(direction) {
        currentSlide += direction;

        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        updateCarousel();
    };

    window.goToSlide = function(index) {
        currentSlide = index;
        updateCarousel();
    };

    // Auto-advance carousel every 5 seconds (unless user prefers reduced motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        setInterval(() => {
            moveCarousel(1);
        }, 5000);
    }
}

// Photo Gallery Lightbox (only runs if lightbox elements exist)
const lightbox = document.getElementById('lightbox');
const galleryImages = document.querySelectorAll('.carousel-slide img');

if (lightbox && galleryImages.length > 0) {
    let currentImageIndex = 0;

    // Get full-size image path from responsive image path
    function getFullSizeSrc(src) {
        return src.replace(/-\d+w\.webp$/, '.webp');
    }

    window.openLightbox = function(index) {
        currentImageIndex = index;
        const lightboxImg = document.getElementById('lightbox-img');

        lightboxImg.src = getFullSizeSrc(galleryImages[currentImageIndex].src);
        lightboxImg.alt = galleryImages[currentImageIndex].alt;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    window.closeLightbox = function(event) {
        if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    window.changeImage = function(direction) {
        currentImageIndex += direction;

        // Loop around if at the beginning or end
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }

        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = getFullSizeSrc(galleryImages[currentImageIndex].src);
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    };

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navigate with arrow keys
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
