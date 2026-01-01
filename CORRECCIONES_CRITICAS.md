# 🔧 CORRECCIONES CRÍTICAS IMPLEMENTABLES

## Archivo: index.html - Mejoras de Seguridad y SEO

### 1. Añadir en el `<head>` (después de la línea 6):

```html
<!-- Security Headers -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://www.google.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; 
               font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; 
               img-src 'self' data: https:; 
               frame-src https://www.google.com;
               connect-src 'self';">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
<meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">

<!-- SEO Mejorado -->
<meta name="keywords" content="aire acondicionado Benidorm, climatización Benidorm, VRV Benidorm, instalación aire acondicionado, mantenimiento climatización, Daikin Benidorm, Mitsubishi Benidorm, Marina Alta">
<meta name="author" content="Serviaire Benidorm">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.serviairebenidorm.es/">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.serviairebenidorm.es/">
<meta property="og:title" content="Serviaire - Expertos en Climatización y Aire Acondicionado en Benidorm">
<meta property="og:description" content="Líderes en instalación, mantenimiento y reparación de aire acondicionado y sistemas VRV. Servicio profesional en toda la Marina Alta.">
<meta property="og:image" content="https://www.serviairebenidorm.es/hero.png">
<meta property="og:locale" content="es_ES">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://www.serviairebenidorm.es/">
<meta name="twitter:title" content="Serviaire - Expertos en Climatización en Benidorm">
<meta name="twitter:description" content="Líderes en instalación, mantenimiento y reparación de aire acondicionado y sistemas VRV.">
<meta name="twitter:image" content="https://www.serviairebenidorm.es/hero.png">

<!-- Favicons -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#EF5012">

<!-- Preload Critical Resources -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" as="style">
<link rel="preload" href="./hero.png" as="image">

<!-- Schema.org Markup -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Serviaire Benidorm",
  "image": "https://www.serviairebenidorm.es/hero.png",
  "description": "Expertos en climatización, instalación y mantenimiento de aire acondicionado en Benidorm y Marina Alta",
  "telephone": "+34663036070",
  "email": "serviaireventas@telefonica.net",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avd. Alfonso Puchades, 9, Local 7",
    "addressLocality": "Benidorm",
    "addressRegion": "Alicante",
    "postalCode": "03501",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.5414848,
    "longitude": -0.1345474
  },
  "url": "https://www.serviairebenidorm.es",
  "priceRange": "€€",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/serviairebenidorm",
    "https://www.instagram.com/serviairebenidorm"
  ]
}
</script>
```

---

## 2. Mejorar Imágenes (Líneas 225, 232, 239)

```html
<!-- ANTES -->
<img src="./vrv_commercial_roof.png" alt="Instalación VRV Industrial" class="project-img">

<!-- DESPUÉS -->
<picture>
    <source srcset="./vrv_commercial_roof.webp" type="image/webp">
    <img src="./vrv_commercial_roof.png" 
         alt="Técnico de Serviaire instalando sistema VRV de climatización en azotea de hotel en Benidorm" 
         class="project-img"
         loading="lazy"
         width="400"
         height="250">
</picture>
```

---

## 3. Mejorar Accesibilidad del Header (Línea 43)

```html
<!-- ANTES -->
<button class="mobile-toggle" aria-label="Menu">
    <i class="fa-solid fa-bars"></i>
</button>

<!-- DESPUÉS -->
<button class="mobile-toggle" 
        aria-label="Abrir menú de navegación" 
        aria-expanded="false"
        aria-controls="mobile-menu">
    <i class="fa-solid fa-bars" aria-hidden="true"></i>
</button>
```

---

## 4. Mejorar Mobile Menu (Línea 49)

```html
<!-- ANTES -->
<div class="mobile-menu">

<!-- DESPUÉS -->
<nav id="mobile-menu" 
     class="mobile-menu" 
     aria-label="Menú de navegación móvil"
     role="navigation">
```

---

## 5. Mejorar Google Maps con Lazy Load (Línea 369)

```html
<!-- ANTES -->
<iframe src="https://www.google.com/maps/embed?pb=..." 
        width="100%" height="250" style="border:0;" 
        allowfullscreen="" loading="lazy"></iframe>

<!-- DESPUÉS -->
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3122.656799052069!2d-0.1345474!3d38.5414848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6205739812674f%3A0xe677569921470404!2sAv.%20Alfonso%20Puchades%2C%209%2C%2003501%20Benidorm%2C%20Alicante!5e0!3m2!1sen!2ses!4v1709220000000!5m2!1sen!2ses" 
        width="100%" 
        height="250" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Ubicación de Serviaire Benidorm en Google Maps"
        aria-label="Mapa de ubicación de Serviaire en Avd. Alfonso Puchades, 9, Benidorm"></iframe>
```

---

## 6. Mejorar Banner de Cookies RGPD (Línea 425-435)

```html
<!-- REEMPLAZAR TODO EL BLOQUE -->
<div id="cookies-banner" class="cookies-banner" role="dialog" aria-labelledby="cookies-title" aria-describedby="cookies-desc">
    <div class="cookies-content">
        <div>
            <h3 id="cookies-title" style="margin-bottom: 0.5rem; font-size: 1.1rem;">🍪 Uso de Cookies</h3>
            <p id="cookies-desc" style="margin: 0;">
                Utilizamos cookies propias y de terceros para analizar el tráfico web y mejorar su experiencia. 
                Puede aceptar todas las cookies, rechazarlas o configurarlas individualmente. 
                <a href="/politica-cookies.html" style="color: var(--primary); text-decoration: underline;">Más información</a>
            </p>
        </div>
        <div class="cookies-buttons">
            <button id="configure-cookies" class="btn btn-outline btn-sm" style="border-color: #ddd; color: #333;">
                Configurar
            </button>
            <button id="reject-cookies" class="btn btn-outline btn-sm" style="border-color: #ddd; color: #333;">
                Rechazar
            </button>
            <button id="accept-cookies" class="btn btn-primary btn-sm">
                Aceptar Todas
            </button>
        </div>
    </div>
</div>
```

---

## Archivo: style.css - Mejoras de Accesibilidad

### 1. Añadir después de la línea 34:

```css
/* Accesibilidad - Focus Visible */
*:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
    border-radius: 4px;
}

/* Skip to main content link */
.skip-to-main {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
}

.skip-to-main:focus {
    top: 0;
}

/* Mejorar contraste de textos grises */
:root {
    --gray: #475569; /* Antes: #64748B - Mejor contraste */
}
```

---

## Archivo: script.js - Mejoras de Funcionalidad

### 1. Mejorar Mobile Menu Toggle (Línea 18-33)

```javascript
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
```

### 2. Mejorar Validación de Formularios (Línea 66-83)

```javascript
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

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('error');
                isValid = false;
            }
        });

        if (!isValid) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
        btn.disabled = true;

        // TODO: Replace with real API call
        try {
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         name: contactForm.querySelector('#name').value,
            //         email: contactForm.querySelector('#email').value,
            //         phone: contactForm.querySelector('#phone').value,
            //         message: contactForm.querySelector('#message').value
            //     })
            // });

            setTimeout(() => {
                alert('✅ ¡Gracias! Hemos recibido su solicitud. Nos pondremos en contacto pronto.');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        } catch (error) {
            alert('❌ Error al enviar el mensaje. Por favor, inténtelo de nuevo o llámenos directamente.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}
```

### 3. Mejorar Cookies con Configuración (Línea 102-125)

```javascript
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
        // Initialize analytics here
        // initializeGoogleAnalytics();
    });
}

if (rejectCookies) {
    rejectCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'necessary');
        cookiesBanner.classList.remove('show');
        // Only necessary cookies
    });
}

if (configureCookies) {
    configureCookies.addEventListener('click', () => {
        // Open cookie configuration modal
        alert('Configuración de cookies:\n\n✅ Necesarias (siempre activas)\n⬜ Analíticas\n⬜ Marketing\n\n(Implementar modal de configuración)');
    });
}
```

---

## Archivos Nuevos a Crear

### 1. `robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://www.serviairebenidorm.es/sitemap.xml
```

### 2. `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.serviairebenidorm.es/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.serviairebenidorm.es/#servicios</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.serviairebenidorm.es/#proyectos</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.serviairebenidorm.es/#contacto</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

### 3. `site.webmanifest`

```json
{
  "name": "Serviaire Benidorm - Climatización",
  "short_name": "Serviaire",
  "description": "Expertos en climatización y aire acondicionado en Benidorm",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#EF5012",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## Comandos para Optimizar Imágenes

```bash
# Instalar herramientas (si no las tienes)
npm install -g sharp-cli

# Convertir imágenes a WebP
sharp -i hero.png -o hero.webp --webp
sharp -i vrv_commercial_roof.png -o vrv_commercial_roof.webp --webp
sharp -i ac_bedroom_interior.png -o ac_bedroom_interior.webp --webp
sharp -i technician_maintenance_close.png -o technician_maintenance_close.webp --webp

# O usar herramientas online:
# - https://squoosh.app/
# - https://tinypng.com/
# - https://imageoptim.com/
```

---

## CSS Adicional para Validación de Formularios

```css
/* Form Validation Styles */
input.error,
textarea.error {
    border-color: #ef4444 !important;
    background-color: #fef2f2;
}

input:valid:not(:placeholder-shown),
textarea:valid:not(:placeholder-shown) {
    border-color: #10b981;
}

input:invalid:not(:placeholder-shown),
textarea:invalid:not(:placeholder-shown) {
    border-color: #ef4444;
}

.form-error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: none;
}

input.error + .form-error-message,
textarea.error + .form-error-message {
    display: block;
}
```

---

## Prioridad de Implementación

### 🔴 CRÍTICO (Hoy)
1. ✅ Añadir meta tags de seguridad (CSP, X-Frame-Options)
2. ✅ Implementar Schema.org markup
3. ✅ Mejorar banner de cookies RGPD
4. ✅ Añadir atributos ARIA básicos

### 🟠 IMPORTANTE (Esta semana)
5. ✅ Crear robots.txt y sitemap.xml
6. ✅ Optimizar imágenes a WebP
7. ✅ Añadir favicons
8. ✅ Mejorar validación de formularios

### 🟡 RECOMENDADO (Este mes)
9. ⏳ Implementar backend real para formularios
10. ⏳ Añadir Google Analytics
11. ⏳ Crear páginas legales (privacidad, cookies, aviso legal)
12. ⏳ Implementar PWA con Service Worker

---

**Nota:** Todas estas correcciones son compatibles con el código actual y se pueden implementar sin romper la funcionalidad existente.
