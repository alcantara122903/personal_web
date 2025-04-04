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

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Typing animation for hero section
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        
        const textArray = [
            "Web Developer", 
            "Gym Enthusiast", 
            "Night Driver", 
            "Photography Lover"
        ];
        
        let textArrayIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1000);
            }
        }
        
        setTimeout(type, newTextDelay + 250);
    }

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

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.padding = '';
            header.style.boxShadow = '';
        }
    });
});
