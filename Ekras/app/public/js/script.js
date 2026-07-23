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
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    // Pause on hover
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
    }

    // Start auto-play initially
    startAutoPlay();

    // ============================================================
    // 3. MOBILE HAMBURGER MENU
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('nav-mobile');

    if (hamburger && navMobile) {
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
    }

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMobile) {
                hamburger.classList.remove('active');
                navMobile.classList.remove('open');
                document.body.style.overflow = '';
            }
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
                const headerHeight = header ? header.offsetHeight : 0;
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
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================================
    // 6. LEAFLET MAP INTEGRATION
    // ============================================================
    const mapContainer = document.getElementById('map');
    
    if (mapContainer && typeof L !== 'undefined') {
        const map = L.map('map').setView([40.764, 29.946], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background: #c9a84c; width: 30px; height: 30px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-building" style="color: #fff; font-size: 12px;"></i></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });

        const marker = L.marker([40.764, 29.946], { icon: customIcon }).addTo(map);

        marker.bindPopup(
            '<strong style="font-size: 16px; color: #1a1a1a;">Ekras Yapı A.Ş.</strong><br>' +
            '<span style="color: #555;">Fatih mahallesi Hacı Mahmut caddesi no:153</span><br>' +
            '<span style="color: #555;">Başiskele / Kocaeli</span>',
            { offset: [0, -10] }
        );

        marker.openPopup();
    }

    // ============================================================
    // 7. CONTACT FORM VALIDATION & WHATSAPP REDIRECT
    // ============================================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
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
                if (input) input.classList.remove('error', 'success');
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
                // Mesajın gideceği telefon numarası
                const targetPhone = "905XXXXXXXXX"; 

                // Form verilerini alıyoruz
                const name = nameInput.value.trim();
                const phone = phoneInput.value.trim();
                const email = emailInput.value.trim();

                // WhatsApp Mesaj Metni
                const messageText = `Merhaba Ekras Yapı, web sitenizden yeni bir iletişim formu dolduruldu:\n\n` +
                                    `👤 *Ad Soyad:* ${name}\n` +
                                    `📞 *Telefon:* ${phone}\n` +
                                    `✉️ *E-Posta:* ${email}`;

                // URL formatına dönüştürme
                const encodedMessage = encodeURIComponent(messageText);
                const whatsappUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodedMessage}`;

                // Doğrudan WhatsApp'ı yeni sekmede aç ve formu sıfırla
                window.open(whatsappUrl, '_blank');
                contactForm.reset();
                [nameInput, phoneInput, emailInput].forEach(input => {
                    input.classList.remove('success');
                });

            } else {
                showToast('Lütfen tüm alanları doğru şekilde doldurun.', 'error');
            }
        });
    }

    // ============================================================
    // 8. TOAST NOTIFICATION SYSTEM
    // ============================================================
    function showToast(message, type = 'success') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        if (type === 'error') {
            toast.style.background = '#dc3545';
        }

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

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
        const scrollPos = window.scrollY + (header ? header.offsetHeight : 0) + 100;

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

    const revealElements = document.querySelectorAll(
        '.project-card, .service-card, .gallery-item, .about-text, .about-image, .contact-info-item'
    );

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);

    // ============================================================
    // 13. GALLERY ITEM LIGHTBOX (Simple)
    // ============================================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;
            const imgSrc = img.getAttribute('src');
            const imgAlt = img.getAttribute('alt');

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

            const closeLightbox = () => {
                lightbox.remove();
                lightboxStyle.remove();
                document.body.style.overflow = '';
            };

            lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            
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
        navDropdown.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdownMenu.style.opacity = dropdownMenu.style.opacity === '1' ? '0' : '1';
                dropdownMenu.style.visibility = dropdownMenu.style.visibility === 'visible' ? 'hidden' : 'visible';
            }
        });

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

    if (slider) {
        slider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
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
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroHeight = hero.offsetHeight;
            if (scrollY < heroHeight) {
                const activeSlide = document.querySelector('.slide.active');
                if (activeSlide) {
                    activeSlide.style.backgroundPositionY = (scrollY * 0.4) + 'px';
                }
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