// Language management with browser preference detection and localStorage
let currentLang = 'en';

// Initialize language on page load
function initializeLanguage() {
    // 1. Check localStorage first (user's previous preference)
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
    } else {
        // 2. Check browser language preference
        const browserLang = navigator.language || navigator.userLanguage;
        // Check if browser prefers Georgian (ka)
        if (browserLang.startsWith('ka')) {
            currentLang = 'ka';
        }
    }
    
    // Apply the language
    updateLanguage();
    updateLanguageButton();
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Language toggle button
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'ka' : 'en';
        // Save preference to localStorage
        localStorage.setItem('preferredLanguage', currentLang);
        updateLanguage();
        updateLanguageButton();
    });
}

function updateLanguageButton() {
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = currentLang === 'en' ? 'KA' : 'EN';
    }
}

function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (text) {
            if (el.classList.contains('price')) {
                const priceMatch = el.textContent.match(/\d+/);
                if (currentLang === 'ka') {
                    el.textContent = (priceMatch ? priceMatch[0] : '') + text;
                } else {
                    el.textContent = text + (priceMatch ? priceMatch[0] : '');
                }
            } else {
                el.textContent = text;
            }
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Add staggered animation delay to service cards and gallery items
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLanguage);
} else {
    initializeLanguage();
}