/**
 * EKRAS YAPI A.S. - MAIN JAVASCRIPT
 * Pixel-perfect clone of ekrasyapi.com
 * All interactions, animations, and dynamic behavior
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. HEADER SCROLL EFFECT
    // ============================================================
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // ============================================================
    // 2. HERO SLIDER
    // ============================================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const slider = document.getElementById('slider');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds
    const totalSlides = slides.length;

    /**
     * Show a specific slide by index
     * @param {number} index - Slide index to show
     */
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    }

    /**
     * Go to next slide
     */
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }

    /**
     * Go to previous slide
     */
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }

    /**
     * Start auto-play
     */
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    /**
     * Stop auto-play
     */
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    // Event listeners for arrows
    nextBtn.addEventListener('click', function() {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', function() {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Start auto-play initially
    startAutoPlay();

    // ============================================================
    // 3. MOBILE HAMBURGER MENU
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('open');
        
        // Prevent scrolling when menu is open
        if (navMobile.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMobile.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ============================================================
    // 4. SMOOTH SCROLLING WITH HEADER OFFSET
    // ============================================================
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .nav-mobile-link[href^="#"], .footer-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================================
    // 5. BACK TO TOP BUTTON
    // ============================================================
    const backToTopBtn = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================================
    // 6. LEAFLET MAP INTEGRATION
    // ============================================================
    const mapContainer = document.getElementById('map');
    
    if (mapContainer && typeof L !== 'undefined') {
        // Initialize map centered on Başiskele, Kocaeli, Turkey
        const map = L.map('map').setView([40.764, 29.946], 14);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Add custom marker
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background: #c9a84c; width: 30px; height: 30px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-building" style="color: #fff; font-size: 12px;"></i></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });

        const marker = L.marker([40.764, 29.946], { icon: customIcon }).addTo(map);

        // Add popup
        marker.bindPopup(
            '<strong style="font-size: 16px; color: #1a1a1a;">Ekras Yapı A.Ş.</strong><br>' +
            '<span style="color: #555;">Fatih mahallesi Hacı Mahmut caddesi no:153</span><br>' +
            '<span style="color: #555;">Başiskele / Kocaeli</span>',
            { offset: [0, -10] }
        );

        // Open popup on load
        marker.openPopup();
    }

    // ============================================================
    // 7. CONTACT FORM VALIDATION & SUBMISSION
    // ============================================================
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const nameInput = contactForm.querySelector('input[name="name"]');
        const phoneInput = contactForm.querySelector('input[name="phone"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const consentInput = contactForm.querySelector('input[name="consent"]');

        let isValid = true;

        // Reset previous states
        [nameInput, phoneInput, emailInput].forEach(input => {
            input.classList.remove('error', 'success');
        });

        // Validate name
        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            isValid = false;
        } else {
            nameInput.classList.add('success');
        }

        // Validate phone
        if (!phoneInput.value.trim()) {
            phoneInput.classList.add('error');
            isValid = false;
        } else {
            phoneInput.classList.add('success');
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('error');
            isValid = false;
        } else {
            emailInput.classList.add('success');
        }

        // Validate consent
        if (!consentInput.checked) {
            isValid = false;
        }

        if (isValid) {
            showToast('Mesajınız başarıyla gönderildi! Teşekkür ederiz.');
            contactForm.reset();
            [nameInput, phoneInput, emailInput].forEach(input => {
                input.classList.remove('success');
            });
        } else {
            showToast('Lütfen tüm alanları doğru şekilde doldurun.', 'error');
        }
    });

    // ============================================================
    // 8. TOAST NOTIFICATION SYSTEM
    // ============================================================
    
    /**
     * Show a toast notification
     * @param {string} message - Message to display
     * @param {string} type - 'success' or 'error'
     */
    function showToast(message, type = 'success') {
        // Remove existing toasts
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        if (type === 'error') {
            toast.style.background = '#dc3545';
        }

        document.body.appendChild(toast);

        // Show toast
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Hide after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }

    // ============================================================
    // 9. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL
    // ============================================================
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link');

    function highlightNavLink() {
        const scrollPos = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                desktopNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ============================================================
    // 10. SCROLL-REVEAL ANIMATIONS
    // ============================================================
    
    /**
     * IntersectionObserver callback for revealing elements on scroll
     */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all cards and grid items for reveal animation
    const revealElements = document.querySelectorAll(
        '.project-card, .service-card, .gallery-item, .about-text, .about-image, .contact-info-item'
    );

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Add revealed styles dynamically
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);

    // ============================================================
    // 11. PROJECT CARD CLICK HANDLER
    // ============================================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.project-title').textContent;
            showToast(`"${title}" projesi detay sayfasına yönlendiriliyorsunuz...`);
        });
    });

    // ============================================================
    // 12. GALLERY ITEM LIGHTBOX (Simple)
    // ============================================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt');

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <button class="lightbox-close" aria-label="Kapat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            // Add lightbox styles
            const lightboxStyle = document.createElement('style');
            lightboxStyle.textContent = `
                .lightbox {
                    position: fixed;
                    inset: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .lightbox-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.9);
                    cursor: pointer;
                }
                .lightbox-content {
                    position: relative;
                    z-index: 1;
                    max-width: 90vw;
                    max-height: 90vh;
                }
                .lightbox-content img {
                    max-width: 100%;
                    max-height: 85vh;
                    object-fit: contain;
                    display: block;
                }
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    width: 35px;
                    height: 35px;
                    background: transparent;
                    color: #fff;
                    font-size: 24px;
                    cursor: pointer;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `;
            document.head.appendChild(lightboxStyle);
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close handlers
            const closeLightbox = () => {
                lightbox.remove();
                lightboxStyle.remove();
                document.body.style.overflow = '';
            };

            lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            
            // Close on Escape key
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        });
    });

    // ============================================================
    // 14. DROPDOWN MENU ACCESSIBILITY
    // ============================================================
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (navDropdown && dropdownMenu) {
        // Keyboard navigation for dropdown
        navDropdown.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdownMenu.style.opacity = dropdownMenu.style.opacity === '1' ? '0' : '1';
                dropdownMenu.style.visibility = dropdownMenu.style.visibility === 'visible' ? 'hidden' : 'visible';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!navDropdown.contains(e.target)) {
                dropdownMenu.style.opacity = '';
                dropdownMenu.style.visibility = '';
            }
        });
    }

    // ============================================================
    // 15. TOUCH/SWIPE SUPPORT FOR MOBILE SLIDER
    // ============================================================
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - next slide
                nextSlide();
            } else {
                // Swiped right - previous slide
                prevSlide();
            }
        }
    }

    // ============================================================
    // 16. PARALLAX EFFECT FOR HERO SLIDER
    // ============================================================
    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrollY < heroHeight) {
            const activeSlide = document.querySelector('.slide.active');
            if (activeSlide) {
                activeSlide.style.backgroundPositionY = (scrollY * 0.4) + 'px';
            }
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ============================================================
    // 17. COUNTER ANIMATION FOR STATS (if needed)
    // ============================================================
    
    /**
     * Animate a number counter
     * @param {HTMLElement} element - Element to animate
     * @param {number} target - Target number
     * @param {number} duration - Animation duration in ms
     */
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // ============================================================
    // 18. LAZY LOADING FOR IMAGES
    // ============================================================
    const lazyImages = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                // If image is already cached
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px'
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ============================================================
    // 19. SOCIAL MEDIA LINK HANDLERS
    // ============================================================
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label');
            showToast(`${platform} sayfamıza yönlendiriliyorsunuz...`);
        });
    });

    // ============================================================
    // 20. SCROLL ANIMATION (Fade-in for sections)
    // ============================================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        scrollObserver.observe(section);
    });

    // ============================================================
    // 21. CONSOLE WELCOME MESSAGE
    // ============================================================
    console.log('%c Ekras Yapı A.S. ', 'background: #D4AF37; color: #0B0F2B; font-size: 20px; font-weight: bold; padding: 12px 24px; border-radius: 8px;');
    console.log('%c www.ekrasyapi.com ', 'background: #0B0F2B; color: #D4AF37; font-size: 14px; padding: 6px 24px; border-radius: 4px;');

}); // End DOMContentLoaded
