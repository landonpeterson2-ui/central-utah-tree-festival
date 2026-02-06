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
    // Gallery images from all festivals
    const galleryImages = [
        // 2025 Festival (81 images)
        ...Array.from({ length: 81 }, (_, i) => `tree-2025-${i + 1}`),
        // 2024 Festival (42 images)
        ...Array.from({ length: 42 }, (_, i) => `tree-2024-${i + 1}`)
    ];

    // Shuffle array using Fisher-Yates algorithm
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Select random images for the carousel
    const numSlides = 9;
    const selectedImages = shuffleArray(galleryImages).slice(0, numSlides);

    // Populate carousel slides
    selectedImages.forEach((imageName, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        const img = document.createElement('img');
        img.src = `images/${imageName}-800w.webp`;
        img.srcset = `images/${imageName}-400w.webp 400w, images/${imageName}-800w.webp 800w, images/${imageName}-1200w.webp 1200w`;
        img.sizes = '(max-width: 768px) 100vw, 400px';
        img.alt = `Decorated Christmas tree from the Central Utah Tree Festival`;
        img.loading = index === 0 ? 'eager' : 'lazy';
        img.width = 400;
        img.height = 706;

        slide.appendChild(img);
        carouselContainer.appendChild(slide);
    });

    // Populate carousel dots
    const dotsContainer = document.getElementById('carouselDots');
    if (dotsContainer) {
        selectedImages.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dotsContainer.appendChild(dot);
        });
    }

    // Now initialize carousel with the dynamically created elements
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const totalSlides = slides.length;
    let carouselInterval = null;

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

    function startAutoAdvance() {
        // Clear any existing interval first
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            carouselInterval = setInterval(() => {
                moveCarousel(1);
            }, 5000);
        }
    }

    function stopAutoAdvance() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    // Carousel navigation button listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            moveCarousel(-1);
            stopAutoAdvance();
            startAutoAdvance(); // Restart auto-advance after user interaction
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            moveCarousel(1);
            stopAutoAdvance();
            startAutoAdvance(); // Restart auto-advance after user interaction
        });
    }

    // Carousel dot listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoAdvance();
            startAutoAdvance(); // Restart auto-advance after user interaction
        });
    });

    // Start auto-advance
    startAutoAdvance();

    // Clean up interval when page is unloaded
    window.addEventListener('beforeunload', stopAutoAdvance);
}

// Gallery Page Tabs (only runs if tab elements exist)
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryContents = document.querySelectorAll('.gallery-content');

if (galleryTabs.length > 0) {
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active states
            galleryTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            galleryContents.forEach(c => c.classList.remove('active'));

            // Activate clicked tab
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const targetId = tab.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Photo Gallery Lightbox (only runs if lightbox elements exist)
const lightbox = document.getElementById('lightbox');
// Support both carousel images and photo grid images
const galleryImages = document.querySelectorAll('.carousel-slide img, .photo-grid img');

if (lightbox && galleryImages.length > 0) {
    let currentImageIndex = 0;
    let lastFocusedElement = null; // Track which element opened the lightbox
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Get largest image path from responsive image path (use 1200w for lightbox)
    function getFullSizeSrc(src) {
        return src.replace(/-\d+w\.webp$/, '-1200w.webp');
    }

    function openLightbox(index) {
        // Store the element that opened the lightbox for focus restoration
        lastFocusedElement = document.activeElement;

        currentImageIndex = index;
        lightboxImg.src = getFullSizeSrc(galleryImages[currentImageIndex].src);
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Set focus to close button for keyboard accessibility
        if (lightboxClose) {
            lightboxClose.focus();
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';

        // Restore focus to the element that opened the lightbox
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
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

// Back to Top Button with debounced scroll
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
    let scrollTimeout;

    // Debounce function to limit scroll event frequency
    function handleScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }, 100); // Check scroll position every 100ms instead of every frame
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Event Countdown Timer
const countdownElement = document.getElementById('countdown');
if (countdownElement) {
    // Read the event date from the data attribute (set via site.json in the template)
    const eventDateStr = countdownElement.dataset.eventDate;
    const festivalDate = new Date(eventDateStr + ' 00:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const messageEl = document.getElementById('countdown-message');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = festivalDate - now;

        // If countdown is finished
        if (distance < 0) {
            countdownElement.style.display = 'none';
            messageEl.textContent = 'The festival is happening now!';
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    // Update countdown immediately
    updateCountdown();

    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Clean up interval on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(countdownInterval);
    });
}
