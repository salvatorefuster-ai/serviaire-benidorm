document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Date & Experience Logic
    const currentYear = new Date().getFullYear();
    const foundationYear = 2008;
    const yearsOfExp = currentYear - foundationYear;

    document.querySelectorAll('.current-year').forEach(el => el.textContent = currentYear);
    document.querySelectorAll('.years-exp').forEach(el => {
        const target = yearsOfExp;
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        const updateCount = () => {
            if (count < target) {
                count += increment;
                el.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target;
            }
        };

        // Trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(el);
            }
        }, { threshold: 0.5 });
        observer.observe(el);
    });

    // Scroll Logic: Header & Progress Bar & Back to Top
    const header = document.getElementById('header');
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'scroll-progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    scrollContainer.appendChild(progressBar);
    document.body.appendChild(scrollContainer);

    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        // Header scrolled state
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";

        // Back to top visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');

            // Update ARIA
            mobileToggle.setAttribute('aria-expanded', !isExpanded);

            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                icon.style.color = '#1A1A1A';
                document.body.style.overflow = 'hidden'; // Prevent scroll
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.style.color = '';
                document.body.style.overflow = '';
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

    // --- FORMSPREE CONFIGURATION ---
    // REPLACE 'YOUR_FORM_ID' WITH YOUR ACTUAL FORMSPREE ID FROM https://formspree.io
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdzdnan';

    // Helper function for form submission
    const handleFormSubmit = async (form, btn, successCallback) => {
        const originalText = btn.innerHTML;
        const formData = new FormData(form);

        // Validation (Basic)
        let valid = true;
        form.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) valid = false;
        });

        if (!valid) {
            alert('Por favor, rellene todos los campos obligatorios.');
            return;
        }

        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
        btn.disabled = true;

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                window.location.href = 'success.html';
            } else {
                // Error from Formspree
                const data = await response.json();
                const errorMessage = data.errors ? data.errors.map(error => error.message).join(", ") : 'Hubo un error al enviar el formulario.';
                showToast(errorMessage, 'error');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            // Network error
            console.error('Error:', error);
            showToast('Hubo un problema de conexión. Por favor, intente de nuevo.', 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    };

    // Contact Form Submission & Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (!input.checkValidity()) {
                    input.classList.add('error');
                    input.setAttribute('aria-invalid', 'true');
                } else {
                    input.classList.remove('error');
                    input.setAttribute('aria-invalid', 'false');
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate all fields before sending
            let isValid = true;
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.classList.add('error');
                    isValid = false;
                }
            });

            if (!isValid) {
                showToast('Por favor, complete todos los campos correctamente.', 'error');
                return;
            }

            const btn = contactForm.querySelector('button');

            // Use the shared handler but we've already validated
            handleFormSubmit(contactForm, btn, () => {
                showToast('¡Mensaje enviado con éxito! Contactaremos con usted pronto.', 'success');
                contactForm.reset();
                inputs.forEach(i => i.classList.remove('error')); // Clear errors
                btn.innerHTML = btn.getAttribute('data-original-text') || 'Enviar Mensaje';
                btn.disabled = false;
            });
        });
    }

    // Quote Modal Submission
    const QuoteForm = document.getElementById('quote-form');
    if (QuoteForm) {
        // Load persisted data
        const savedData = JSON.parse(localStorage.getItem('quoteFormData') || '{}');
        Object.keys(savedData).forEach(key => {
            const input = QuoteForm.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'radio') {
                    if (input.value === savedData[key]) input.checked = true;
                } else {
                    input.value = savedData[key];
                }
            }
        });

        // Persist on change
        QuoteForm.addEventListener('input', () => {
            const formData = new FormData(QuoteForm);
            const data = Object.fromEntries(formData.entries());
            localStorage.setItem('quoteFormData', JSON.stringify(data));
        });

        QuoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = QuoteForm.querySelector('button[type="submit"]');

            handleFormSubmit(QuoteForm, submitBtn, () => {
                localStorage.removeItem('quoteFormData'); // Clear on success
                QuoteForm.innerHTML = `
                    <div class="text-center" style="padding: 2rem;">
                        <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: #25d366; margin-bottom: 1rem;"></i>
                        <h3>¡Solicitud Recibida!</h3>
                        <p>Hemos recibido sus datos correctamente.</p>
                        <p class="text-muted">Uno de nuestros técnicos analizará su caso y le llamará en breve con su presupuesto.</p>
                        <button class="btn btn-primary mt-4" onclick="location.reload()">Cerrar</button>
                    </div>
                `;
            });
        });
    }

    // Helper: Simple Toast Notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);

        // Style toast with JS if not in CSS yet
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%) translateY(100px)',
            background: type === 'success' ? '#10B981' : '#EF4444',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '100px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            zIndex: '10000',
            transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            fontSize: '0.95rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            whiteSpace: 'nowrap'
        });

        // Animate in
        setTimeout(() => toast.style.transform = 'translateX(-50%) translateY(0)', 10);

        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(150px)';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // --- MODAL LOGIC (ADDED) ---
    const modal = document.getElementById('quote-modal');
    const openBtn = document.getElementById('open-quote-modal-nav');
    const closeBtn = document.querySelector('.close-modal');
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    let currentStep = 1;

    // Open Modal
    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    // Close Modal
    const closeModal = () => {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            // Reset form logic could go here if needed
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Steps Logic
    const updateSteps = () => {
        steps.forEach(step => {
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    };

    if (nextBtns) {
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Validate current step
                const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
                if (!currentStepEl) return;

                const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
                let valid = true;
                inputs.forEach(input => {
                    if (!input.checkValidity()) {
                        valid = false;
                        input.reportValidity();
                    }
                });

                if (valid) {
                    if (currentStep < 3) { // Max 3 steps
                        currentStep++;
                        updateSteps();
                    }
                }
            });
        });
    }

    if (prevBtns) {
        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateSteps();
                }
            });
        });
    }

    // Cookies Banner Logic
    // Cookies Banner Logic with GDPR Compliance
    const cookiesBanner = document.getElementById('cookies-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');
    const configureCookies = document.getElementById('configure-cookies');

    // Check if user has already made a choice
    const cookiesPreference = localStorage.getItem('cookiesAccepted');

    if (cookiesBanner && cookiesPreference === null) {
        setTimeout(() => {
            cookiesBanner.classList.add('show');
        }, 1000);
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'all');
            cookiesBanner.classList.remove('show');
            initAnalytics();
        });
    }

    // Initialize Analytics if consent exists
    function initAnalytics() {
        if (localStorage.getItem('cookiesAccepted') === 'all') {
            // Check if gtag is already loaded
            if (!window.gtag) {
                const script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
                document.head.appendChild(script);

                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX', { 'anonymize_ip': true });
                console.log('Analytics Initialized');
            }
        }
    }

    initAnalytics(); // Try on load

    if (rejectCookies) {
        rejectCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'necessary');
            cookiesBanner.classList.remove('show');
        });
    }

    if (configureCookies) {
        configureCookies.addEventListener('click', () => {
            window.location.href = 'politica-cookies.html';
        });
    }

    // --- GOOGLE MAPS CONSENT LOGIC ---
    const loadMapBtn = document.getElementById('load-map-btn');
    const googleMap = document.getElementById('google-map');
    const mapConsentContent = document.getElementById('map-consent-content');
    const mapConsentContainer = document.getElementById('map-consent-container');

    const loadMap = () => {
        if (googleMap && googleMap.dataset.src) {
            if (mapConsentContent) {
                mapConsentContent.innerHTML = '<div class="spinner" style="margin: 0 auto 1rem;"></div><p>Cargando mapa interactivo...</p>';
            }
            googleMap.src = googleMap.dataset.src;
            googleMap.onload = () => {
                googleMap.style.display = 'block';
                if (mapConsentContent) mapConsentContent.style.display = 'none';
                if (mapConsentContainer) mapConsentContainer.style.padding = '0';
            };
        }
    };

    if (loadMapBtn) {
        loadMapBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'all'); // Consent given
            if (cookiesBanner) cookiesBanner.classList.remove('show');
            loadMap();
        });
    }

    // Auto-load map if cookies already accepted
    if (localStorage.getItem('cookiesAccepted') === 'all') {
        loadMap();
    }

    // --- CALCULATOR LOGIC ---
    const calcForm = document.getElementById('calc-form');
    if (calcForm) {
        calcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const area = parseFloat(document.getElementById('calc-area').value);
            const exposure = document.getElementById('calc-exposure').value;
            const resultDiv = document.getElementById('calc-result');

            if (isNaN(area) || area <= 0) return;

            // Basic calculation: 100-150 frigorías per m2
            let factor = 100;
            if (exposure === 'high') factor = 140;
            if (exposure === 'low') factor = 80;

            const frigorias = Math.round(area * factor);
            const kw = (frigorias / 860).toFixed(2); // 1 kW ≈ 860 frigorías

            resultDiv.innerHTML = `
                <div class="calc-output fade-in" style="background: var(--white); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--primary); margin-top: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                    <p style="margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; text-transform: uppercase; color: var(--gray); letter-spacing: 0.05em;">Resultado Estimado</p>
                    <div style="font-size: 2rem; font-weight: 800; color: var(--secondary); line-height: 1;">${frigorias.toLocaleString()} <span style="font-size: 1rem; font-weight: 600;">Frig/h</span></div>
                    <p style="margin-top: 0.5rem; color: var(--gray); font-size: 0.95rem;">Equivalente a aprox. <strong>${kw} kW</strong> de potencia térmica.</p>
                    <p style="margin-top: 1rem; font-size: 0.85rem; font-style: italic; color: #64748B;">*Este cálculo es orientativo. Un técnico debe verificar cargas térmicas reales (aislamiento, ventanas, etc.)</p>
                </div>
            `;
        });
    }

    // --- SERVICE WORKER REGISTRATION (PWA) ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js');
        });
    }

    // --- EMAIL OBFUSCATION ---
    const emailPlaceholders = document.querySelectorAll('.obf-email');
    emailPlaceholders.forEach(el => {
        const user = 'serviaireventas';
        const domain = 'telefonica.net';
        el.href = `mailto:${user}@${domain}`;
        if (el.textContent === 'Email de contacto') {
            // keep current text
        } else {
            el.textContent = `${user}@${domain}`;
        }
    });

    // --- BACK TO TOP BUTTON ---
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- LIVE CHAT PLACEHOLDER ---
    // Para activar, descomenta las líneas de abajo y pon tu ID de Tawk.to
    /*
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/YOUR_ID/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    */

    console.log('Serviaire Web Core Loaded');
});
