document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: false
        });
    }

    // Add active class for current section in navigation
    const addActiveClassToNav = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links on scroll
    window.addEventListener('scroll', addActiveClassToNav);
    
    // Run immediately to set active class on page load
    addActiveClassToNav();

    // Add dark theme aesthetic enhancements
    const addDarkThemeEnhancements = () => {
        // Add neon text effect to section titles
        document.querySelectorAll('.section-title').forEach(title => {
            title.classList.add('neon-text');
        });
        
        // Add glow animation to logo
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.classList.add('glow-animation');
        }
        
        // Add parallax effect to sections
        document.querySelectorAll('.hero, .contact').forEach(section => {
            section.classList.add('parallax');
        });
    };
    
    // Apply dark theme enhancements
    addDarkThemeEnhancements();

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });

            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const galleryFullscreenLinks = document.querySelectorAll('.gallery-fullscreen');

    if (lightbox && lightboxImg && lightboxCaption) {
        galleryFullscreenLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const imgSrc = link.getAttribute('href');
                const galleryInfo = link.closest('.gallery-info');
                const title = galleryInfo.querySelector('h3').textContent;
                const description = galleryInfo.querySelector('p').textContent;

                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = `${title} - ${description}`;
                lightbox.style.display = 'block';

                document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
            });
        });

        // Close lightbox
        const lightboxClose = document.querySelector('.lightbox-close');

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            });
        }

        // Also close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Apply float animation to certain elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('float-animation');
    }

    // Add hover-scale class to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .hobby-card, .about-image');
    interactiveElements.forEach(element => {
        element.classList.add('hover-scale');
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call with timeout
            setTimeout(() => {
                alert('Message sent successfully!');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});
