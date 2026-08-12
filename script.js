/* ========================================
   KARTHICK PORTFOLIO — VANILLA JS
   Red Gradient + Exciting Text Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Navbar Scroll ==========
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ========== Mobile Menu ==========
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ========== Sana Floating Voice Module ==========
    const sanaBtn = document.getElementById('sana-voice-btn');
    const sanaAudio = document.getElementById('sana-audio');
    const sanaPlayIcon = document.getElementById('sana-play-icon');
    const sanaPauseIcon = document.getElementById('sana-pause-icon');
    const sanaWave = document.getElementById('sana-wave');
    const sanaPanel = document.getElementById('sana-player-panel');
    const sanaPlayPause = document.getElementById('sana-play-pause');
    const sanaStatus = document.getElementById('sana-status-text');
    let isPlaying = false;
    let panelOpen = false;

    if (sanaBtn && sanaPanel) {
        sanaBtn.addEventListener('click', () => {
            panelOpen = !panelOpen;
            if (panelOpen) {
                sanaPanel.classList.remove('hidden');
            } else {
                sanaPanel.classList.add('hidden');
            }
        });

        if (sanaPlayPause && sanaAudio) {
            sanaPlayPause.addEventListener('click', (e) => {
                e.stopPropagation();
                if (isPlaying) {
                    sanaAudio.pause();
                    sanaPlayIcon.classList.remove('hidden');
                    sanaPauseIcon.classList.add('hidden');
                    sanaWave.classList.remove('active');
                    sanaBtn.classList.remove('playing');
                    sanaStatus.textContent = 'Paused';
                    isPlaying = false;
                } else {
                    sanaAudio.play();
                    sanaPlayIcon.classList.add('hidden');
                    sanaPauseIcon.classList.remove('hidden');
                    sanaWave.classList.add('active');
                    sanaBtn.classList.add('playing');
                    sanaStatus.textContent = 'Playing voice...';
                    isPlaying = true;
                }
            });

            sanaAudio.addEventListener('ended', () => {
                sanaPlayIcon.classList.remove('hidden');
                sanaPauseIcon.classList.add('hidden');
                sanaWave.classList.remove('active');
                sanaBtn.classList.remove('playing');
                sanaStatus.textContent = 'Click to play again';
                isPlaying = false;
            });
        }

        document.addEventListener('click', (e) => {
            const module = document.getElementById('sana-voice-module');
            if (panelOpen && module && !module.contains(e.target)) {
                panelOpen = false;
                sanaPanel.classList.add('hidden');
            }
        });
    }

    // ========== Typewriter Effect ==========
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        '"Artificial Intelligence"',
        '"Backend Systems"',
        '"Python & FastAPI"',
        '"Tool-Based AI Agents"',
        '"Retrieval Augmented Generation"',
        '"System Automation"',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    if (typewriterEl) {
        typeWriter();
    }

    // ========== Particles (red palette) ==========
    const particlesContainer = document.getElementById('particles-container');

    function createParticle() {
        if (!particlesContainer) return;

        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;

        const colors = [
            'rgba(200, 165, 90, 0.15)',
            'rgba(255, 255, 255, 0.06)',
            'rgba(200, 165, 90, 0.1)',
            'rgba(255, 255, 255, 0.04)',
            'rgba(219, 192, 122, 0.08)',
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            left: ${x}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }

    for (let i = 0; i < 25; i++) {
        setTimeout(() => createParticle(), i * 200);
    }

    // ========== Intersection Observer — ALL ANIMATION CLASSES ==========
    // This observer triggers ALL animation types on scroll
    const animationSelectors = [
        '.anim-reveal-up',
        '.anim-glow-in',
        '.anim-slide-right',
        '.anim-slide-left',
        '.anim-blur-in',
        '.anim-scale-rotate',
        '.anim-bounce-up',
        '.anim-flip-in',
        '.anim-stagger',
        '.anim-gradient-sweep',
        '.anim-typewrite',
        '.anim-zoom-blur',
    ];

    const allAnimElements = document.querySelectorAll(animationSelectors.join(','));

    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get delay from class (delay-1 through delay-8)
                const el = entry.target;
                let delayMs = 0;
                for (let i = 1; i <= 8; i++) {
                    if (el.classList.contains('delay-' + i)) {
                        delayMs = i * 100;
                        break;
                    }
                }

                setTimeout(() => {
                    el.classList.add('animated');
                }, delayMs);

                animObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
    });

    allAnimElements.forEach(el => animObserver.observe(el));

    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    });

    // ========== Skill Card Tilt Effect ==========
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========== Card Glow Effect ==========
    document.querySelectorAll('.achieve-card, .project-card, .contact-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(200,165,90,0.03), transparent 40%), var(--black, #000)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ========== Console Easter Egg ==========
    console.log(
        '%c✨ Karthick\'s Portfolio',
        'font-size: 24px; font-weight: bold; color: #c8a55a;'
    );
    console.log(
        '%cBuilding AI tools & backend systems — crafted with care',
        'font-size: 14px; color: #777;'
    );
});
