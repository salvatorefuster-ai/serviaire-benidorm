document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');

            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                icon.style.color = '#1A1A1A';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.style.color = ''; // Reset to default
            }
        });
    }

    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.style.color = '';
            });
        });
    }

    // Reveal on Scroll Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load

    // Form Submission (Mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                alert('¡Gracias! Hemos recibido su solicitud. Nos pondremos en contacto pronto.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Cookies Banner Logic
    const cookiesBanner = document.getElementById('cookies-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');

    if (cookiesBanner && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookiesBanner.classList.add('show');
        }, 1000);
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookiesBanner.classList.remove('show');
        });
    }

    if (rejectCookies) {
        rejectCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'false');
            cookiesBanner.classList.remove('show');
        });
    }

    // Multi-step Modal Logic
    const modal = document.getElementById('quote-modal');
    const navBtn = document.getElementById('open-quote-modal-nav');
    const closeModal = document.querySelector('.close-modal');
    const QuoteForm = document.getElementById('quote-form');

    // Open Modal function
    const openQuoteModal = (e) => {
        if (e) e.preventDefault();
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    if (navBtn) {
        navBtn.addEventListener('click', openQuoteModal);
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Step Logic
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    let currentStep = 0;

    if (steps.length > 0) {
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Simple validation
                const currentStepEl = steps[currentStep];
                const inputs = currentStepEl.querySelectorAll('input[type="radio"]');
                let filled = true;
                if (inputs.length > 0) {
                    const checked = currentStepEl.querySelector('input:checked');
                    if (!checked) {
                        alert('Por favor, seleccione una opción.');
                        filled = false;
                    }
                }

                if (filled && currentStep < steps.length - 1) {
                    steps[currentStep].classList.remove('active');
                    currentStep++;
                    steps[currentStep].classList.add('active');
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 0) {
                    steps[currentStep].classList.remove('active');
                    currentStep--;
                    steps[currentStep].classList.add('active');
                }
            });
        });
    }

    if (QuoteForm) {
        QuoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = QuoteForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';

            setTimeout(() => {
                // Mock submission
                QuoteForm.innerHTML = `
                    <div class="text-center" style="padding: 2rem;">
                        <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: #25d366; margin-bottom: 1rem;"></i>
                        <h3>¡Solicitud Recibida!</h3>
                        <p>Uno de nuestros técnicos analizará su caso y le llamará en breve con su presupuesto estimado.</p>
                        <button class="btn btn-outline mt-4" onclick="document.querySelector('.modal').classList.remove('show'); document.body.style.overflow = ''; location.reload();">Cerrar</button>
                    </div>
                `;
            }, 1500);
        });
    }
});
