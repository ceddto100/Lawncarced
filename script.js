// ===================================
// Smooth Scrolling & Navigation
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // ===================================
    // Sticky Navigation & Scroll Effects
    // ===================================

    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add shadow on scroll
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });

    // ===================================
    // Mobile Menu Toggle
    // ===================================

    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // ===================================
    // Quote Modal
    // ===================================

    const modal = document.getElementById('quoteModal');
    const quoteBtn = document.getElementById('quoteBtn');
    const modalClose = document.getElementById('modalClose');
    const quoteBtns = document.querySelectorAll('.btn-primary, .cta-nav');

    // Open modal when clicking any "Get Quote" button
    quoteBtns.forEach(btn => {
        if (btn.textContent.includes('Quote') || btn.classList.contains('cta-nav')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
    });

    if (quoteBtn) {
        quoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===================================
    // Form Submission
    // ===================================

    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData);

            // In a real application, you would send this to a server
            console.log('Form submitted:', data);

            // Show success message
            showSuccessMessage();

            // Reset form and close modal
            quoteForm.reset();
            setTimeout(() => {
                closeModal();
            }, 2000);
        });
    }

    function showSuccessMessage() {
        const formContainer = quoteForm.parentElement;
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4CAF50;
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10;
        `;
        successMessage.innerHTML = `
            <h3 style="margin-bottom: 0.5rem;">Thank You!</h3>
            <p style="margin: 0; color: white;">We'll contact you shortly with your free quote.</p>
        `;

        formContainer.style.position = 'relative';
        formContainer.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 2000);
    }

    // ===================================
    // Scroll Reveal Animations
    // ===================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll reveal
    const revealElements = document.querySelectorAll(`
        .trust-item,
        .service-card,
        .why-item,
        .process-step,
        .testimonial-card
    `);

    revealElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;

        // Observe for reveal
        observer.observe(el);
    });

    // ===================================
    // Active Navigation Link Highlighting
    // ===================================

    const sections = document.querySelectorAll('section[id]');
    const navLinksForHighlight = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksForHighlight.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===================================
    // Parallax Effect for Hero
    // ===================================

    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroContent = hero.querySelector('.hero-content');

            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    // ===================================
    // Service Card Tilt Effect (Advanced UX)
    // ===================================

    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ===================================
    // Testimonial Carousel (Auto-rotate)
    // ===================================

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function highlightTestimonial() {
        testimonialCards.forEach((card, index) => {
            if (index === currentTestimonial) {
                card.style.border = '3px solid var(--color-accent)';
                card.style.transform = 'scale(1.02)';
            } else {
                card.style.border = 'none';
                card.style.transform = '';
            }
        });

        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }

    // Highlight first testimonial initially
    if (testimonialCards.length > 0) {
        setTimeout(() => {
            highlightTestimonial();
            setInterval(highlightTestimonial, 5000);
        }, 2000);
    }

    // ===================================
    // Count-up Animation for Stats (Future Enhancement)
    // ===================================

    function animateCount(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ===================================
    // Loading State & Performance
    // ===================================

    // Add loaded class to body for CSS transitions
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Preload critical images
    const criticalImages = [
        'https://picsum.photos/seed/lawn1/600/400',
        'https://picsum.photos/seed/landscape2/600/400'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // ===================================
    // Console Message (Easter Egg)
    // ===================================

    console.log('%c🌱 GreenEdge Lawn Care', 'font-size: 20px; font-weight: bold; color: #2D5F3F;');
    console.log('%cLooking for a career in web development? Check out our opportunities!', 'font-size: 14px; color: #3A7D54;');
});
