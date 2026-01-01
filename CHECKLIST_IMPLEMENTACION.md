# ✅ CHECKLIST DE IMPLEMENTACIÓN - SERVIAIRE

## 📋 Guía de Uso

- [ ] = Pendiente
- [x] = Completado
- 🔴 = Crítico (hacer primero)
- 🟠 = Importante (hacer pronto)
- 🟡 = Recomendado (hacer cuando puedas)

---

## 🔴 SEMANA 1: SEGURIDAD Y LEGAL (CRÍTICO)

### Seguridad Web
- [ ] 🔴 Añadir Content Security Policy (CSP) en `<head>`
- [ ] 🔴 Añadir header X-Frame-Options
- [ ] 🔴 Añadir header X-Content-Type-Options
- [ ] 🔴 Añadir header Referrer-Policy
- [ ] 🔴 Configurar HTTPS forzado en servidor
- [ ] 🔴 Implementar tokens CSRF en formularios

**Archivo:** `index.html` líneas 7-20  
**Tiempo:** 1 hora  
**Código:** Ver `CORRECCIONES_CRITICAS.md` sección 1

---

### Cumplimiento RGPD
- [ ] 🔴 Crear página "Política de Privacidad" (`politica-privacidad.html`)
- [ ] 🔴 Crear página "Aviso Legal" (`aviso-legal.html`)
- [ ] 🔴 Crear página "Política de Cookies" (`politica-cookies.html`)
- [ ] 🔴 Actualizar banner de cookies (conforme RGPD)
- [ ] 🔴 Añadir botón "Configurar cookies"
- [ ] 🔴 Bloquear Google Maps hasta consentimiento
- [ ] 🔴 Actualizar enlaces del footer

**Archivos:** Crear nuevos HTML  
**Tiempo:** 3-4 horas  
**Código:** Ver `CORRECCIONES_CRITICAS.md` sección 6

---

### SEO Básico
- [ ] 🔴 Añadir meta keywords
- [ ] 🔴 Añadir meta author
- [ ] 🔴 Añadir meta robots
- [ ] 🔴 Añadir canonical URL
- [ ] 🔴 Añadir Open Graph tags (Facebook)
- [ ] 🔴 Añadir Twitter Card tags
- [ ] 🔴 Implementar Schema.org markup (LocalBusiness)

**Archivo:** `index.html` líneas 7-80  
**Tiempo:** 2 horas  
**Código:** Ver `CORRECCIONES_CRITICAS.md` sección 1

---

## 🟠 SEMANA 2: FUNCIONALIDAD (IMPORTANTE)

### Backend y Formularios
- [ ] 🟠 Elegir tecnología backend (Node.js/PHP/Python)
- [ ] 🟠 Configurar servidor (Netlify/Vercel/Railway)
- [ ] 🟠 Crear endpoint `/api/contact`
- [ ] 🟠 Integrar servicio de email (Resend/SendGrid/Nodemailer)
- [ ] 🟠 Añadir validación server-side
- [ ] 🟠 Implementar rate limiting (anti-spam)
- [ ] 🟠 Configurar base de datos (opcional)
- [ ] 🟠 Sistema de notificaciones (email/SMS)
- [ ] 🟠 Testing de formularios

**Archivos:** Crear carpeta `/api` o `/backend`  
**Tiempo:** 12-16 horas  
**Tecnologías sugeridas:**
- Node.js + Express + Resend
- PHP + PHPMailer
- Netlify Functions + SendGrid

---

### Validación Frontend
- [ ] 🟠 Añadir validación en tiempo real
- [ ] 🟠 Mensajes de error específicos
- [ ] 🟠 Estilos para campos con error
- [ ] 🟠 Prevenir envíos duplicados
- [ ] 🟠 Añadir captcha (opcional)

**Archivo:** `script.js` líneas 66-120  
**Tiempo:** 2-3 horas  
**Código:** Ver `CORRECCIONES_CRITICAS.md` sección 2

---

## 🟡 SEMANA 3: OPTIMIZACIÓN (RECOMENDADO)

### Imágenes
- [ ] 🟡 Convertir `hero.png` a WebP
- [ ] 🟡 Convertir `vrv_commercial_roof.png` a WebP
- [ ] 🟡 Convertir `ac_bedroom_interior.png` a WebP
- [ ] 🟡 Convertir `technician_maintenance_close.png` a WebP
- [ ] 🟡 Añadir atributo `loading="lazy"` a todas las imágenes
- [ ] 🟡 Usar `<picture>` con fallback
- [ ] 🟡 Especificar width y height en todas las imágenes

**Herramientas:**
- https://squoosh.app/
- https://tinypng.com/
- `npm install -g sharp-cli`

**Tiempo:** 1-2 horas  
**Reducción esperada:** 70-80% del peso

---

### Favicons y PWA
- [ ] 🟡 Crear favicon 32x32
- [ ] 🟡 Crear favicon 16x16
- [ ] 🟡 Crear apple-touch-icon 180x180
- [ ] 🟡 Crear android-chrome-192x192
- [ ] 🟡 Crear android-chrome-512x512
- [ ] 🟡 Crear `site.webmanifest`
- [ ] 🟡 Añadir theme-color meta tag

**Herramientas:**
- https://realfavicongenerator.net/
- https://favicon.io/

**Tiempo:** 30 minutos

---

### SEO Avanzado
- [ ] 🟡 Crear `robots.txt`
- [ ] 🟡 Crear `sitemap.xml`
- [ ] 🟡 Registrar en Google Search Console
- [ ] 🟡 Registrar en Bing Webmaster Tools
- [ ] 🟡 Crear perfil Google My Business
- [ ] 🟡 Optimizar meta descriptions
- [ ] 🟡 Mejorar ALT texts de imágenes

**Tiempo:** 2-3 horas  
**Código:** Ver `CORRECCIONES_CRITICAS.md` archivos nuevos

---

### Analytics
- [ ] 🟡 Crear cuenta Google Analytics 4
- [ ] 🟡 Obtener ID de medición (G-XXXXXXXXXX)
- [ ] 🟡 Añadir script de GA4 en `<head>`
- [ ] 🟡 Configurar eventos personalizados
- [ ] 🟡 Configurar objetivos de conversión
- [ ] 🟡 Añadir consentimiento de cookies

**Tiempo:** 1 hora

---

## 🟢 SEMANA 4: ACCESIBILIDAD Y PULIDO

### Accesibilidad (WCAG 2.1)
- [ ] 🟡 Añadir atributos ARIA a navegación
- [ ] 🟡 Añadir aria-label a botones sin texto
- [ ] 🟡 Añadir aria-expanded a mobile toggle
- [ ] 🟡 Mejorar contraste de colores (var(--gray))
- [ ] 🟡 Añadir focus-visible styles
- [ ] 🟡 Implementar skip-to-main link
- [ ] 🟡 Asegurar navegación por teclado
- [ ] 🟡 Añadir aria-invalid a campos con error

**Archivo:** `index.html` y `style.css`  
**Tiempo:** 2-3 horas  
**Código:** Ver `CORRECCIONES_CRITICAS.md` secciones 3-4

---

### Testing
- [ ] 🟡 Test en Chrome
- [ ] 🟡 Test en Firefox
- [ ] 🟡 Test en Safari
- [ ] 🟡 Test en Edge
- [ ] 🟡 Test en móvil Android
- [ ] 🟡 Test en móvil iOS
- [ ] 🟡 Test con lector de pantalla
- [ ] 🟡 Test de velocidad (PageSpeed Insights)
- [ ] 🟡 Test de accesibilidad (WAVE)
- [ ] 🟡 Test de SEO (Lighthouse)

**Herramientas:**
- https://pagespeed.web.dev/
- https://wave.webaim.org/
- Chrome DevTools > Lighthouse

**Tiempo:** 2-3 horas

---

### Correcciones Finales
- [ ] 🟡 Minificar CSS (`style.min.css`)
- [ ] 🟡 Minificar JS (`script.min.js`)
- [ ] 🟡 Configurar caché del navegador
- [ ] 🟡 Añadir preload para recursos críticos
- [ ] 🟡 Revisar todos los enlaces
- [ ] 🟡 Corregir errores de consola
- [ ] 🟡 Optimizar fuentes (font-display: swap)

**Tiempo:** 1-2 horas

---

## 📊 PROGRESO GENERAL

### Resumen por Prioridad

**🔴 CRÍTICO (Semana 1)**
- [ ] Seguridad (6 tareas)
- [ ] RGPD (7 tareas)
- [ ] SEO Básico (7 tareas)

**Total:** 20 tareas | Tiempo: 6-7 horas

---

**🟠 IMPORTANTE (Semana 2)**
- [ ] Backend (9 tareas)
- [ ] Validación (5 tareas)

**Total:** 14 tareas | Tiempo: 14-19 horas

---

**🟡 RECOMENDADO (Semanas 3-4)**
- [ ] Imágenes (7 tareas)
- [ ] Favicons (7 tareas)
- [ ] SEO Avanzado (7 tareas)
- [ ] Analytics (6 tareas)
- [ ] Accesibilidad (8 tareas)
- [ ] Testing (10 tareas)
- [ ] Correcciones (7 tareas)

**Total:** 52 tareas | Tiempo: 9-14 horas

---

## 🎯 PROGRESO TOTAL

```
[ ] 0/86 tareas completadas (0%)

Crítico:     [ ] 0/20 (0%)
Importante:  [ ] 0/14 (0%)
Recomendado: [ ] 0/52 (0%)
```

---

## 💡 CONSEJOS

### Orden Recomendado
1. **Día 1-2:** Seguridad y headers (2h)
2. **Día 3-4:** Páginas legales (4h)
3. **Día 5-7:** SEO básico (2h)
4. **Semana 2:** Backend completo (16h)
5. **Semana 3:** Optimización (5h)
6. **Semana 4:** Testing y pulido (4h)

### Atajos
- Usa generadores online para favicons
- Copia plantillas de políticas legales
- Usa Netlify Functions para backend rápido
- Automatiza optimización de imágenes

### Recursos Útiles
- **Legal:** https://www.iubenda.com/es/
- **Imágenes:** https://squoosh.app/
- **SEO:** https://search.google.com/search-console
- **Analytics:** https://analytics.google.com/
- **Testing:** https://web.dev/measure/

---

## 🏁 CRITERIOS DE ÉXITO

### Mínimo Viable (MVP)
- [x] Seguridad básica implementada
- [x] Páginas legales creadas
- [x] Formularios funcionales
- [x] Imágenes optimizadas

### Óptimo
- [x] Todo lo anterior +
- [x] SEO completo
- [x] Analytics configurado
- [x] Accesibilidad WCAG AA
- [x] PageSpeed > 90

### Excelente
- [x] Todo lo anterior +
- [x] PWA funcional
- [x] Chat en vivo
- [x] Sistema de reseñas
- [x] Blog integrado

---

## 📞 ¿NECESITAS AYUDA?

### Recursos Gratuitos
- MDN Web Docs: https://developer.mozilla.org/
- W3C Validator: https://validator.w3.org/
- Can I Use: https://caniuse.com/

### Comunidades
- Stack Overflow
- Reddit r/webdev
- Discord de desarrolladores

### Servicios Recomendados
- **Hosting:** Netlify, Vercel, Cloudflare Pages
- **Email:** Resend, SendGrid, Mailgun
- **Analytics:** Google Analytics, Plausible
- **Legal:** Iubenda, Termly

---

**Última actualización:** 01/01/2026  
**Versión:** 1.0

---

## 🎉 CELEBRA TUS LOGROS

Cada vez que completes una sección, ¡celébralo! 🎊

- ✅ Semana 1 completada → Toma un café ☕
- ✅ Semana 2 completada → Sal a cenar 🍕
- ✅ Semana 3 completada → Día libre 🏖️
- ✅ Semana 4 completada → ¡FIESTA! 🎉

**¡Mucho éxito con la implementación!** 💪
