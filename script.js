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
                successCallback();
            } else {
                // Error from Formspree
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.');
                }
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            // Network error
            console.error('Error:', error);
            alert('Hubo un problema de conexión. Por favor, verifique su internet e inténtelo de nuevo.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    };

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');

            handleFormSubmit(contactForm, btn, () => {
                alert('¡Mensaje enviado con éxito! Contactaremos con usted pronto.');
                contactForm.reset();
                btn.innerHTML = btn.getAttribute('data-original-text') || 'Enviar Mensaje';
                btn.disabled = false;
            });
        });
    }

    // Quote Modal Submission
    if (QuoteForm) {
        QuoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = QuoteForm.querySelector('button[type="submit"]');

            handleFormSubmit(QuoteForm, submitBtn, () => {
                QuoteForm.innerHTML = `
                    <div class="text-center" style="padding: 2rem;">
                        <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: #25d366; margin-bottom: 1rem;"></i>
                        <h3>¡Solicitud Recibida!</h3>
                        <p>Hemos recibido sus datos correctamente.</p>
                        <p class="text-muted">Uno de nuestros técnicos analizará su caso y le llamará en breve con su presupuesto.</p>
                        <button class="btn btn-outline mt-4" onclick="document.querySelector('.modal').classList.remove('show'); document.body.style.overflow = ''; location.reload();">Cerrar</button>
                    </div>
                `;
            });
        });
    }
});
