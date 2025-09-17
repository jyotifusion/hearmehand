document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current navigation item
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Initialize animations with Intersection Observer
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Add loading animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                this.classList.add('loading');
                // Simulate loading
                setTimeout(() => {
                    this.classList.remove('loading');
                    // Add your form submission or redirect logic here
                    console.log('CTA button clicked!');
                }, 1500);
            }
        });
    }

    // Image hover effect
    const imagePlaceholder = document.querySelector('.image-placeholder');
    if (imagePlaceholder) {
        imagePlaceholder.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = imagePlaceholder.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            imagePlaceholder.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-5px)`;
            imagePlaceholder.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(0, 0, 0, 0.3)`;
        });

        imagePlaceholder.addEventListener('mouseleave', () => {
            imagePlaceholder.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(-5px)';
            imagePlaceholder.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
    }

    // Initialize functions
    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', animateOnScroll);
    setActiveLink(); // Run once on page load

    // Add animation class to hero content after a short delay
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 300);

    // Add animation to navigation items
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });

    // Add animation to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'fadeIn 0.8s ease-out forwards';
    }
});

// Add a simple console greeting
console.log('%c👋 Welcome to Hear Me Hand!', 'font-size: 18px; color: #4a90e2; font-weight: bold;');
console.log('%c🚀 Website is running smoothly!', 'font-size: 14px; color: #2ecc71;');

// Add a simple service worker registration (for PWA capabilities in the future)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}