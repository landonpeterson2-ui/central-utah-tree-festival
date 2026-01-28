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
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const totalSlides = slides.length;

    function updateCarousel() {
        const offset = -currentSlide * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function moveCarousel(direction) {
        currentSlide += direction;

        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }

        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    // Carousel navigation button listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => moveCarousel(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => moveCarousel(1));
    }

    // Carousel dot listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

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
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Get full-size image path from responsive image path
    function getFullSizeSrc(src) {
        return src.replace(/-\d+w\.webp$/, '.webp');
    }

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = getFullSizeSrc(galleryImages[currentImageIndex].src);
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function changeImage(direction) {
        currentImageIndex += direction;

        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }

        lightboxImg.src = getFullSizeSrc(galleryImages[currentImageIndex].src);
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    }

    // Gallery image click listeners
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });

    // Lightbox navigation listeners
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            changeImage(-1);
        });
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            changeImage(1);
        });
    }
    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    // Close lightbox when clicking backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
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
