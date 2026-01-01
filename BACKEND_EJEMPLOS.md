# 💻 BACKEND EJEMPLO - SERVIAIRE

## Opción 1: Netlify Functions (Recomendado - Más Fácil)

### Estructura de Archivos
```
SERVIAIRE/
├── netlify/
│   └── functions/
│       └── contact.js
├── index.html
├── style.css
├── script.js
└── netlify.toml
```

### 1. Crear `netlify.toml`

```toml
[build]
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### 2. Crear `netlify/functions/contact.js`

```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Validación básica
    if (!data.name || !data.email || !data.phone || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Todos los campos son obligatorios' })
      };
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email inválido' })
      };
    }

    // Configurar transporter (usando Gmail como ejemplo)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // tu-email@gmail.com
        pass: process.env.EMAIL_PASS  // contraseña de aplicación
      }
    });

    // Email al cliente (confirmación)
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: '✅ Hemos recibido su solicitud - Serviaire',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #EF5012;">¡Gracias por contactarnos!</h2>
          <p>Hola ${data.name},</p>
          <p>Hemos recibido su solicitud y nos pondremos en contacto con usted lo antes posible.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Resumen de su solicitud:</h3>
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Teléfono:</strong> ${data.phone}</p>
            <p><strong>Mensaje:</strong> ${data.message}</p>
          </div>

          <p>Si tiene alguna pregunta urgente, puede llamarnos al <strong>663 036 070</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">
            Serviaire Benidorm - Climatización<br>
            Avd. Alfonso Puchades, 9, Local 7<br>
            03501 Benidorm (Alicante)<br>
            Tel: 663 036 070
          </p>
        </div>
      `
    };

    // Email a Serviaire (notificación)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'serviaireventas@telefonica.net',
      subject: `🔔 Nueva solicitud de ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #EF5012;">Nueva Solicitud de Contacto</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Teléfono:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>

          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
          
          <div style="margin-top: 20px;">
            <a href="tel:${data.phone}" style="background: #EF5012; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              📞 Llamar Ahora
            </a>
            <a href="mailto:${data.email}" style="background: #333; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-left: 10px;">
              ✉️ Responder Email
            </a>
          </div>
        </div>
      `
    };

    // Enviar ambos emails
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(adminMailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email enviado correctamente' 
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error al enviar el email',
        details: error.message 
      })
    };
  }
};
```

### 3. Crear `package.json`

```json
{
  "name": "serviaire-backend",
  "version": "1.0.0",
  "dependencies": {
    "nodemailer": "^6.9.7"
  }
}
```

### 4. Variables de Entorno en Netlify

En Netlify Dashboard → Site settings → Environment variables:

```
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion
```

**Cómo obtener contraseña de aplicación de Gmail:**
1. Ir a https://myaccount.google.com/security
2. Activar verificación en 2 pasos
3. Ir a "Contraseñas de aplicaciones"
4. Generar nueva contraseña para "Correo"

### 5. Actualizar `script.js`

```javascript
// Reemplazar la función de envío del formulario (línea 66)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
        btn.disabled = true;

        const formData = {
            name: contactForm.querySelector('#name').value,
            email: contactForm.querySelector('#email').value,
            phone: contactForm.querySelector('#phone').value,
            message: contactForm.querySelector('#message').value
        };

        try {
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('✅ ¡Gracias! Hemos recibido su solicitud. Nos pondremos en contacto pronto.');
                contactForm.reset();
            } else {
                throw new Error(result.error || 'Error al enviar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error al enviar el mensaje. Por favor, inténtelo de nuevo o llámenos al 663 036 070.');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}
```

### 6. Deploy en Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## Opción 2: Resend (Más Moderno y Fácil)

### 1. Crear cuenta en Resend
- Ir a https://resend.com
- Crear cuenta gratis (100 emails/día)
- Obtener API Key

### 2. Crear `netlify/functions/contact.js`

```javascript
const { Resend } = require('resend');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Validación
    if (!data.name || !data.email || !data.phone || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Todos los campos son obligatorios' })
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Enviar email
    const { data: emailData, error } = await resend.emails.send({
      from: 'Serviaire Web <onboarding@resend.dev>', // Cambiar cuando verifiques dominio
      to: ['serviaireventas@telefonica.net'],
      replyTo: data.email,
      subject: `🔔 Nueva solicitud de ${data.name}`,
      html: `
        <h2>Nueva Solicitud de Contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${data.message}</p>
        <hr>
        <p>Fecha: ${new Date().toLocaleString('es-ES')}</p>
      `
    });

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: emailData.id })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### 3. `package.json`

```json
{
  "name": "serviaire-backend",
  "version": "1.0.0",
  "dependencies": {
    "resend": "^3.0.0"
  }
}
```

### 4. Variable de Entorno

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
```

---

## Opción 3: PHP Simple (Hosting Tradicional)

### 1. Crear `send-email.php`

```php
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// Validación
if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos los campos son obligatorios']);
    exit;
}

// Sanitizar datos
$name = htmlspecialchars($data['name']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($data['phone']);
$message = htmlspecialchars($data['message']);

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

// Configurar email
$to = 'serviaireventas@telefonica.net';
$subject = '🔔 Nueva solicitud de ' . $name;
$headers = "From: noreply@serviairebenidorm.es\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$body = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; }
    </style>
</head>
<body>
    <div class='container'>
        <h2>Nueva Solicitud de Contacto</h2>
        <div class='field'>
            <span class='label'>Nombre:</span> $name
        </div>
        <div class='field'>
            <span class='label'>Email:</span> <a href='mailto:$email'>$email</a>
        </div>
        <div class='field'>
            <span class='label'>Teléfono:</span> <a href='tel:$phone'>$phone</a>
        </div>
        <div class='field'>
            <span class='label'>Mensaje:</span><br>
            <p>$message</p>
        </div>
        <hr>
        <p>Fecha: " . date('d/m/Y H:i:s') . "</p>
    </div>
</body>
</html>
";

// Enviar email
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email enviado correctamente']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al enviar el email']);
}
?>
```

### 2. Actualizar `script.js`

```javascript
const response = await fetch('/send-email.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});
```

---

## 🔒 Seguridad Adicional

### Rate Limiting (Netlify)

```javascript
// En contact.js, añadir al inicio
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const limit = 5; // 5 requests
  const window = 60000; // por minuto

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip).filter(time => now - time < window);
  
  if (requests.length >= limit) {
    return false;
  }

  requests.push(now);
  rateLimitMap.set(ip, requests);
  return true;
}

// Usar en handler
const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'];
if (!checkRateLimit(ip)) {
  return {
    statusCode: 429,
    headers,
    body: JSON.stringify({ error: 'Demasiadas solicitudes. Intente más tarde.' })
  };
}
```

### Honeypot (Anti-Bot)

```html
<!-- Añadir en formulario (invisible para humanos) -->
<input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
```

```javascript
// Validar en backend
if (data.website) {
  // Es un bot
  return {
    statusCode: 400,
    headers,
    body: JSON.stringify({ error: 'Spam detected' })
  };
}
```

---

## 📊 Comparación de Opciones

| Característica | Netlify + Nodemailer | Netlify + Resend | PHP |
|----------------|---------------------|------------------|-----|
| **Dificultad** | Media | Fácil | Fácil |
| **Coste** | Gratis | Gratis (100/día) | Gratis |
| **Configuración** | Gmail app password | API Key | Hosting PHP |
| **Fiabilidad** | Media | Alta | Media |
| **Escalabilidad** | Buena | Excelente | Limitada |
| **Recomendado** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |

**Recomendación:** Usar **Resend** para máxima simplicidad y fiabilidad.

---

## 🚀 Pasos para Implementar

1. **Elegir opción** (Resend recomendado)
2. **Crear cuenta** en servicio elegido
3. **Copiar código** de este documento
4. **Configurar variables** de entorno
5. **Instalar dependencias** (`npm install`)
6. **Probar localmente** (`netlify dev`)
7. **Deploy** (`netlify deploy --prod`)
8. **Probar en producción**

---

**¡Listo para implementar!** 🎉
