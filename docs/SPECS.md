# Especificaciones de Producto: KETO Tracker v1.0

## 1.0 Usuario Objetivo y Propuesta de Valor

### Perfil de Usuario: JuanCho

JuanCho es un hombre de 51 años que se encuentra en un punto de inflexión en su salud. Su principal motivación es combatir una diagnosticada resistencia a la insulina y recuperar su bienestar general a través de un estricto protocolo de cetosis y ayuno intermitente.

**Demografía:**
- Género: Hombre
- Edad: 51 años
- Peso Inicial: 90 kg
- Altura: 1.70 m

### 5 Problemas Clave a Resolver:

1. **Necesidad de Estructura y Claridad:** Sin un sistema claro, se siente abrumado por las decisiones diarias sobre qué comer y cuándo ayunar.

2. **Gestión de la Ansiedad y los Antojos:** Los primeros días de la cetosis pueden generar antojos y ansiedad. Necesita un sistema que le recuerde su progreso.

3. **Cumplimiento Riguroso de la Hidratación:** La hidratación es fundamental, pero fácil de olvidar. Requiere un método simple y visible para monitoreo.

4. **Adaptación a Eventos Sociales:** Necesita acceso inmediato a las reglas del plan para situaciones sociales sin desviarse del protocolo.

5. **Monitoreo Tangible de la Salud:** Para mantenerse motivado, necesita ver y registrar su progreso de manera cuantitativa.

### Propuesta de Valor Central

La PWA funciona como el "Comando Central" personal para la transformación de salud, eliminando la carga mental de decisiones diarias al proporcionar un plan de acción claro y preciso.

---

## 2.0 Métricas Clave de Seguimiento

### 1. Hidratación de Precisión
- **Objetivo:** 3.2 litros diarios = 13 vasos de 250ml
- **Cálculo:** (90 kg / 7) × 250 ml
- **Fuente:** Fórmula del plan de Alexia Suárez

### 2. Ayuno Dirigido por el Plan
- **Objetivo:** Cumplir ventanas específicas semanales
- **Progresión:**
  - Semana 1: 12/12 (adaptación)
  - Semana 2: 14/10 + ayunos 18h especiales
  - Semana 3: 16/8 + ayunos 18h (5 días consecutivos)
  - Semana 4: 18/6 + ayuno 24h + reto 20/4

### 3. Medidas Corporales
- **Métricas:** Cuello, Cintura, Cadera
- **Frecuencia:** Semanal (preferentemente lunes)
- **Fuente:** Tabla de "SEGUIMIENTOS" del plan

### 4. Macros Diarios
- **Distribución:**
  - Grasa: 70-75%
  - Proteína: 20-25%
  - Carbohidratos: 5-10% (<50g netos)
- **Objetivo:** Mantener cetosis

### 5. Peso
- **Frecuencia:** Semanal
- **Visualización:** Gráfica de tendencia desde 90kg
- **Fuente:** Tabla de "SEGUIMIENTOS"

### 6. Electrolitos
- **Fórmula:** Agua + Sal + Limón
- **Frecuencia:** Diaria (checkbox)
- **Fuente:** Sección "SÍNTOMAS DE CETOSIS"

### Pilares No Rastreados (v1.0)
- Exposición al sol
- Movimiento diario
- Descanso adecuado

*Nota: Estos se considerarán en versiones futuras*

---

## 3.0 Arquitectura de Información y Diseño de Pantallas

### 3.1 Home/Dashboard ("Centro de Comando")

**Función Principal:** Vista inmediata del estado diario y próxima acción crítica

**Componentes Visuales:**
- Anillo de Hidratación prominente (ej: 5/13 vasos)
- Tarjeta "Próxima Comida Programada"
- Temporizador "Ayuno Actual" (siempre en marcha)
- Checkbox diario "Electrolitos (Agua+Sal+Limón)"

**CTAs:**
- Botón grande [+1 Vaso de Agua]
- Botón [Comida Completada]

**Acción Principal:** Registro rápido de agua y verificación de próxima comida

### 3.2 Ayuno Inteligente

**Función Principal:** Visualizar y gestionar protocolo de ayuno intermitente

**Componentes Visuales:**
- Horario de ayuno semanal actual
- Indicador: "Ventana de alimentación" o "Ventana de ayuno"
- Temporizador detallado (tiempo transcurrido + restante)
- Historial de ayunos completados

**CTAs:**
- Inicio/fin automático basado en registro de comidas

**Acción Principal:** Consultar estado y duración del ayuno programado

### 3.3 Menú & Planificación

**Función Principal:** Mostrar plan de comidas exacto eliminando decisiones

**Componentes Visuales:**
- Calendario semanal con comidas pre-cargadas
- Tarjetas de comida por día (Desayuno, Almuerzo, Cena)
- Destacar eventos especiales (Chicharronada Semana 2, Parrillada Semana 3)

**CTAs:**
- Vista de solo lectura (sin modificación)

**Acción Principal:** Consultar comidas programadas

### 3.4 Lista de Compras

**Función Principal:** Simplificar compra de insumos

**Componentes Visuales:**
- Listas organizadas por semanas (1-4)
- Checkboxes por ítem
- Ítems extraídos de secciones "COMPRAS SEMANA X"

**CTAs:**
- Selector [Semana 1] [Semana 2] [Semana 3] [Semana 4]

**Acción Principal:** Usar lista pre-generada para compras semanales

### 3.5 Progreso y Biometría

**Función Principal:** Registrar y visualizar progreso físico

**Componentes Visuales:**
- Gráficas de tendencia (Peso, Cintura)
- Tabla histórica de registros semanales

**CTAs:**
- Botón [Registrar Lunes de Medidas]
- Formulario: Peso (kg), Cuello (cm), Cintura (cm), Cadera (cm)

**Acción Principal:** Ingresar medidas cada lunes y revisar gráficas

### 3.6 Ajustes

**Función Principal:** Gestionar perfil y preferencias

**Componentes Visuales:**
- Perfil visible (Nombre: JuanCho, Edad: 51, Peso: 90kg, Altura: 1.70m)
- Configuración de recordatorios y notificaciones

**CTAs:**
- Switches para activar/desactivar recordatorios

**Acción Principal:** Personalizar notificaciones

---

## 4.0 Flujo Principal de Usuario (Rutina Diaria)

### Secuencia de 8 Pasos:

1. **Despertar y Abrir** → Aterriza en Dashboard
2. **Registrar Electrolitos** → Marcar checkbox "Agua+Sal+Limón"
3. **Verificar Estado del Ayuno** → Ver tiempo restante hasta próxima comida
4. **Consultar Almuerzo** → Ir a Menú & Planificación
5. **Registrar Hidratación** → Pulsar [+1 Vaso] durante el día
6. **Registrar Comida** → Marcar [Completada] (reinicia timer ayuno)
7. **Cerrar el Día** → Verificar metas cumplidas
8. **Verificar Plan Siguiente** → Ver menú del día siguiente

---

## 5.0 Estilo Visual y Tono de Voz

### 5.1 Look & Feel

- **Estilo General:** Funcional, serio pero motivador
- **Inspiración:** Panel de Control de Salud / Dashboard de datos
- **Paleta:** Alto contraste para legibilidad óptima
- **Tipografía:** Clara, sans-serif, sin adornos

### 5.2 Tono de Voz

- **Tono:** Directo, de apoyo, factual
- **Estilo:** Coach digital que informa sin ambigüedades

**Ejemplos de Microcopy:**
- "Meta de agua alcanzada"
- "Ayuno de 18 horas completado"
- "Próxima comida: Pollo frito"

### 5.3 Componentes de UI Clave

**Botones:**
- Grandes y de fácil acceso
- Diseñados para registro rápido (un toque)

**Tarjetas:**
- Bordes definidos y espaciado claro
- Encapsular información de manera ordenada

**Gráficas:**
- Simples y limpias
- Mostrar tendencias de un vistazo
- Sin complejidad innecesaria

---

## 6.0 Stack Tecnológico

### Frontend
- HTML5 (semántico)
- CSS3 (responsive, mobile-first)
- Vanilla JavaScript (performance máxima)

### Persistencia
- LocalStorage (datos locales)

### PWA
- Service Worker (funcionalidad offline)
- Web App Manifest (instalación home screen)
- Cache API (recursos estáticos)

### Visualización
- Canvas API (gráficas custom)

---

## 7.0 Criterios de Éxito

### Métricas de Usabilidad
- Registro de agua: <3 segundos
- Navegación entre pantallas: <1 segundo
- Carga inicial: <2 segundos
- Funcionalidad offline: 100%

### Métricas de Producto
- Adherencia diaria: >90%
- Retención 28 días: 100% (usuario único)
- Registros completos: >95%

### Métricas de Salud (Usuario Final)
- Pérdida de peso: 8-10 kg
- Reducción de cintura: 8-10 cm
- Mejora de resistencia a insulina: Por validar con médico

---

## 8.0 Roadmap

### v1.0 - MVP (Actual)
- Todas las 6 métricas implementadas
- 4 semanas de menús
- Sistema de ayuno
- PWA funcional

### v1.1 - Mejoras
- Notificaciones push
- Exportar datos PDF
- Modo oscuro

### v2.0 - Expansión
- Tracking de ejercicio
- Tracking de sueño
- AI para ajustes

---

*Documento de especificaciones versión 1.0*  
*Última actualización: Enero 2026*
