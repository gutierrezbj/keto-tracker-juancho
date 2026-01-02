# 🔥 KETO Tracker - Centro de Comando Personal

> **Progressive Web App para transformación de salud mediante protocolo cetogénico**

[![Made for JuanCho](https://img.shields.io/badge/Made%20for-JuanCho-ff6b35)](https://github.com)
[![PWA](https://img.shields.io/badge/PWA-Enabled-blue)](https://web.dev/progressive-web-apps/)
[![Offline Ready](https://img.shields.io/badge/Offline-Ready-green)](https://web.dev/offline-cookbook/)

---

## 👤 Perfil de Usuario

**Nombre:** JuanCho  
**Edad:** 51 años  
**Peso Inicial:** 90 kg  
**Altura:** 1.70 m  
**IMC Inicial:** 31.1 (Obesidad Grado I)  

### 🎯 Objetivo Principal
Combatir la resistencia a la insulina diagnosticada mediante un protocolo estricto de cetosis y ayuno intermitente durante 4 semanas.

### 💪 Meta de Transformación
- **Peso objetivo:** 80-82 kg
- **Reducción esperada:** 8-10 kg en 28 días
- **IMC objetivo:** 27.7 (Sobrepeso - camino a peso saludable)
- **Cintura objetivo:** Reducción mínima 8-10 cm

---

## 🎯 Propósito de la Aplicación

Esta PWA funciona como el **"Centro de Comando"** personal para la transformación de salud de JuanCho. La aplicación elimina la carga mental de las decisiones diarias al proporcionar:

- ✅ Plan de acción claro y preciso
- ✅ Tracking automático de métricas críticas
- ✅ Menús pre-cargados de 4 semanas
- ✅ Sistema de ayuno inteligente
- ✅ Visualización de progreso en tiempo real

---

## 📊 6 Métricas Clave de Seguimiento

### 1. 💧 Hidratación de Precisión
- **Objetivo:** 3.2 litros diarios (13 vasos de 250ml)
- **Cálculo:** (90 kg / 7) × 250 ml
- **Tracking:** Contador con anillo de progreso

### 2. ⏱️ Ayuno Intermitente
- **Semana 1:** 12/12 (adaptación)
- **Semana 2:** 14/10 base + 18h especiales
- **Semana 3:** 16/8 base + 18h (5 días consecutivos)
- **Semana 4:** 18/6 base + ayuno 24h + reto 20/4
- **Tracking:** Timer automático y ventanas programadas

### 3. 📏 Medidas Corporales
- **Frecuencia:** Semanal (preferentemente lunes)
- **Métricas:** Cuello, Cintura, Cadera
- **Visualización:** Gráficas de tendencia

### 4. 🥑 Macronutrientes
- **Grasa:** 70-75%
- **Proteína:** 20-25%
- **Carbohidratos:** 5-10% (<50g netos)
- **Tracking:** Validación por comida

### 5. ⚖️ Peso Corporal
- **Frecuencia:** Semanal
- **Inicio:** 90 kg
- **Visualización:** Gráfica de progreso con tendencia

### 6. ⚡ Electrolitos
- **Fórmula:** Agua + Sal + Limón
- **Frecuencia:** Diaria
- **Tracking:** Checkbox simple

---

## 📱 Arquitectura de 6 Pantallas

### 🏠 1. Home/Dashboard ("Centro de Comando")
Vista principal con estado diario inmediato:
- Anillo de hidratación prominente
- Próxima comida programada
- Temporizador de ayuno actual
- Checkbox de electrolitos
- Botón rápido [+1 Vaso]

### ⏱️ 2. Ayuno Inteligente
Gestión del protocolo de ayuno:
- Visualización del horario semanal
- Indicador: "Ventana activa" o "Ayuno activo"
- Temporizador detallado
- Historial de ayunos completados

### 🍽️ 3. Menú & Planificación
Plan de comidas exacto:
- Calendario semanal completo
- 4 semanas pre-cargadas
- Eventos especiales destacados (Chicharronada, Parrillada)
- Vista de solo lectura (adherencia estricta)

### 🛒 4. Lista de Compras
Simplificación de compras:
- Listas por semana (1-4)
- Checkboxes para marcar comprado
- Categorización por tipo de alimento

### 📈 5. Progreso y Biometría
Registro y visualización:
- Gráficas de peso y medidas
- Tabla histórica completa
- Formulario "Lunes de Medidas"
- Tendencias y proyecciones

### ⚙️ 6. Ajustes
Personalización:
- Perfil completo visible
- Recordatorios y notificaciones
- Configuración de horarios

---

## 🔄 Flujo Diario (8 Pasos)

1. **Despertar** → Abrir app, ver Dashboard
2. **Electrolitos** → Marcar checkbox "Agua+Sal+Limón"
3. **Verificar Ayuno** → Revisar tiempo restante hasta próxima comida
4. **Consultar Menú** → Ver detalles del almuerzo programado
5. **Hidratación** → Registrar vasos de agua durante el día
6. **Registrar Comida** → Marcar comida [Completada] (reinicia timer)
7. **Cerrar Día** → Confirmar metas cumplidas
8. **Anticipar** → Ver menú del día siguiente

---

## 🎨 Diseño y UX

### Look & Feel
- **Estilo:** Panel de Control de Salud
- **Paleta:** Alto contraste, legibilidad óptima
- **Tipografía:** Sans-serif clara, sin adornos
- **Componentes:** Botones grandes, tarjetas definidas, gráficas simples

### Tono de Voz
- **Directo y factual:** "Meta de agua alcanzada"
- **De apoyo:** "Ayuno de 18 horas completado"
- **Sin ambigüedades:** "Próxima comida: Pollo frito a las 14:00"

---

## 🛠️ Stack Tecnológico

```
Frontend:
├── HTML5 (estructura semántica)
├── CSS3 (diseño responsive mobile-first)
├── Vanilla JavaScript (sin frameworks - máxima performance)
└── LocalStorage (persistencia de datos)

PWA:
├── Service Worker (funcionalidad offline)
├── Web App Manifest (instalación en home screen)
└── Cache API (recursos estáticos)

Visualización:
└── Canvas API (gráficas de progreso custom)
```

---

## 📦 Estructura del Proyecto

```
keto-juancho/
├── README.md                 # Este archivo
├── LICENSE                   # MIT License
├── .gitignore               # Exclusiones Git
├── index.html               # App principal
├── manifest.json            # Configuración PWA
├── service-worker.js        # Service worker para offline
├── css/
│   ├── main.css            # Estilos base y variables
│   ├── dashboard.css       # Estilos del dashboard
│   ├── components.css      # Componentes reutilizables
│   └── responsive.css      # Media queries
├── js/
│   ├── app.js              # Inicialización y routing
│   ├── metrics.js          # Tracking de las 6 métricas
│   ├── menus.js            # Data de menús 4 semanas
│   ├── fasting.js          # Lógica de ayuno
│   ├── charts.js           # Gráficas con Canvas
│   └── storage.js          # Gestión de LocalStorage
├── assets/
│   └── icons/              # Iconos PWA (192x192, 512x512)
└── docs/
    └── SPECS.md            # Especificaciones completas
```

---

## 🚀 Instalación y Uso

### Para Móvil (Recomendado)

1. **Abrir en el navegador:**
   ```
   https://tu-dominio.vercel.app
   ```

2. **Instalar la PWA:**
   - iOS Safari: Toca "Compartir" → "Añadir a pantalla de inicio"
   - Android Chrome: Toca "..." → "Instalar aplicación"

3. **¡Listo!** El icono 🔥 aparecerá en tu pantalla de inicio

### Para Desktop (Opcional)

1. Abrir en Chrome/Edge
2. Click en el icono de instalación (barra de direcciones)
3. Click "Instalar"

---

## 📋 Roadmap

### v1.0 - MVP (Actual)
- [x] 6 métricas core implementadas
- [x] 4 semanas de menús pre-cargados
- [x] Sistema de ayuno inteligente
- [x] PWA funcional offline
- [x] Gráficas básicas de progreso

### v1.1 - Mejoras (Futuro)
- [ ] Notificaciones push (recordatorios)
- [ ] Exportar datos a PDF
- [ ] Modo oscuro
- [ ] Integración con wearables (opcional)
- [ ] Recetas detalladas con fotos

### v2.0 - Expansión (A considerar)
- [ ] Tracking de ejercicio
- [ ] Tracking de sueño
- [ ] Community features (opcional)
- [ ] AI para ajustes personalizados

---

## 📄 Licencia

MIT License - Libre para uso personal

---

## 🙏 Créditos

**Diseñado y desarrollado específicamente para JuanCho**  
Enero 2026

**Basado en:**
- Protocolo KETO de Alexia Suárez
- Especificaciones técnicas custom
- Principios de salud holística

---

## 📞 Soporte

Para cualquier problema o sugerencia, revisar:
- Documentación completa en `/docs/SPECS.md`
- Issues en el repositorio
- Feedback directo al desarrollador

---

<div align="center">

### 💪 ¡Tu Transformación Comienza Aquí! 🔥

**28 días | 6 métricas | 1 objetivo**

*"La herramienta no hace el resultado, pero el resultado es imposible sin la herramienta correcta."*

</div>
