/* ========================================
   APP - Orquestador Principal
   ======================================== */

const App = {
    currentScreen: 'home',
    
    // Inicialización
    init() {
        console.log('🔥 KETO Tracker v1.0 - Iniciando...');
        
        // Inicializar módulos
        Storage.init();
        Metrics.init();
        Fasting.init();
        
        // Setup navegación
        this.setupNavigation();
        
        // Setup eventos
        this.setupEvents();
        
        // Cargar datos iniciales
        this.loadHomeData();
        
        // Actualizar botones de ayuno según estado
        this.updateFastingButtons();
        
        console.log('✅ App inicializada correctamente');
    },
    
    // Setup navegación entre pantallas
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const screen = btn.dataset.screen;
                this.navigateTo(screen);
            });
        });
    },
    
    // Navegar a una pantalla
    navigateTo(screenName) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        
        // Mostrar pantalla seleccionada
        const screen = document.getElementById(screenName);
        if (screen) screen.classList.add('active');
        
        // Actualizar navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.screen === screenName) {
                btn.classList.add('active');
            }
        });
        
        // Cargar datos específicos de la pantalla
        this.loadScreenData(screenName);
        
        this.currentScreen = screenName;
    },
    
    // Cargar datos de la pantalla actual
    loadScreenData(screenName) {
        switch(screenName) {
            case 'home':
                this.loadHomeData();
                break;
            case 'fasting':
                Fasting.renderHistory();
                Fasting.renderSchedule();
                break;
            case 'menu':
                this.loadMenuData();
                break;
            case 'shopping':
                this.loadShoppingData();
                break;
            case 'progress':
                Charts.renderAll();
                Metrics.measures.renderTable();
                break;
            case 'settings':
                this.loadSettingsData();
                break;
        }
    },
    
    // Cargar datos del home/dashboard
    loadHomeData() {
        // Actualizar métricas
        Metrics.progress.updateUI();
        Metrics.water.updateUI();
        Metrics.electrolytes.updateUI();
        
        // Cargar menú del día completo
        const menu = Menus.getMenuForToday();
        if (menu) {
            const container = document.getElementById('today-meals');
            if (container) {
                const meals = [
                    { type: 'desayuno', icon: '🍳', label: 'Desayuno', data: menu.meals.desayuno },
                    { type: 'almuerzo', icon: '😋', label: 'Almuerzo', data: menu.meals.almuerzo },
                    { type: 'cena', icon: '🌙', label: 'Cena', data: menu.meals.cena }
                ];
                
                container.innerHTML = meals.map(meal => {
                    const isCompleted = Metrics.meals.isCompleted(meal.type);
                    return `
                        <div class="meal-item ${isCompleted ? 'completed' : ''}" data-meal="${meal.type}">
                            <span class="meal-item-icon">${meal.icon}</span>
                            <div class="meal-item-content">
                                <div class="meal-item-header">
                                    <span class="meal-item-name">${meal.label}</span>
                                    <span class="meal-item-time">${meal.data.hora}</span>
                                </div>
                                <div class="meal-item-description">${meal.data.comida}</div>
                            </div>
                        </div>
                    `;
                }).join('');
                
                // Agregar eventos de click
                container.querySelectorAll('.meal-item').forEach(item => {
                    if (!item.classList.contains('completed')) {
                        item.style.cursor = 'pointer';
                        item.addEventListener('click', () => {
                            const mealType = item.dataset.meal;
                            if (confirm(`¿Marcar ${item.querySelector('.meal-item-name').textContent} como completada?`)) {
                                Metrics.meals.complete(mealType);
                                this.loadHomeData(); // Recargar
                            }
                        });
                    }
                });
            }
        }
    },
    
    // Cargar datos del menú
    loadMenuData() {
        const week = Menus.getCurrentWeek();
        this.renderWeekMenu(week);
        
        // Setup selector de semana
        this.setupWeekSelector();
    },
    
    // Renderizar menú de una semana específica
    renderWeekMenu(weekNumber) {
        const menu = Menus.getMenuForWeek(weekNumber);
        
        if (!menu) return;
        
        const container = document.getElementById('menu-calendar');
        const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
        const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        
        container.innerHTML = days.map((day, index) => {
            const dayData = menu.dias[day];
            const isSpecial = dayData.especial || false;
            
            return `
                <div class="day-card ${isSpecial ? 'special' : ''}">
                    <div class="day-header">
                        <span class="day-name">${dayNames[index]}</span>
                        ${isSpecial ? '<span class="day-date">⭐ Especial</span>' : ''}
                    </div>
                    <div class="day-meals">
                        <div class="day-meal">
                            <span class="day-meal-icon">🍳</span>
                            <div class="day-meal-content">
                                <div class="day-meal-name">Desayuno (${dayData.desayuno.hora})</div>
                                <div class="day-meal-description">${dayData.desayuno.comida}</div>
                            </div>
                        </div>
                        <div class="day-meal">
                            <span class="day-meal-icon">😋</span>
                            <div class="day-meal-content">
                                <div class="day-meal-name">Almuerzo (${dayData.almuerzo.hora})</div>
                                <div class="day-meal-description">${dayData.almuerzo.comida}</div>
                            </div>
                        </div>
                        <div class="day-meal">
                            <span class="day-meal-icon">🌙</span>
                            <div class="day-meal-content">
                                <div class="day-meal-name">Cena (${dayData.cena.hora})</div>
                                <div class="day-meal-description">${dayData.cena.comida}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // Setup selector de semanas en menú
    setupWeekSelector() {
        const weekButtons = document.querySelectorAll('.week-btn');
        
        weekButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const week = parseInt(btn.dataset.week);
                
                // Actualizar active
                weekButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Renderizar menú de esa semana
                this.renderWeekMenu(week);
            });
        });
    },
    
    // Cargar lista de compras
    loadShoppingData() {
        const container = document.getElementById('shopping-list');
        
        // Por ahora, lista básica de ejemplo
        // En v1.1 se puede expandir con datos reales del plan
        container.innerHTML = `
            <div class="shopping-category">
                <h3>🥩 Proteínas</h3>
                <div class="shopping-items">
                    <div class="shopping-item">
                        <input type="checkbox" id="protein-1">
                        <label for="protein-1">Pollo (2kg)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="protein-2">
                        <label for="protein-2">Carne de res (1.5kg)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="protein-3">
                        <label for="protein-3">Salmón (500g)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="protein-4">
                        <label for="protein-4">Huevos (24 unidades)</label>
                    </div>
                </div>
            </div>
            
            <div class="shopping-category">
                <h3>🥬 Vegetales</h3>
                <div class="shopping-items">
                    <div class="shopping-item">
                        <input type="checkbox" id="veg-1">
                        <label for="veg-1">Lechuga (2 unidades)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="veg-2">
                        <label for="veg-2">Brócoli (1kg)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="veg-3">
                        <label for="veg-3">Espárragos (500g)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="veg-4">
                        <label for="veg-4">Aguacate (6 unidades)</label>
                    </div>
                </div>
            </div>
            
            <div class="shopping-category">
                <h3>🧀 Lácteos & Grasas</h3>
                <div class="shopping-items">
                    <div class="shopping-item">
                        <input type="checkbox" id="dairy-1">
                        <label for="dairy-1">Mantequilla (500g)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="dairy-2">
                        <label for="dairy-2">Queso (400g)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="dairy-3">
                        <label for="dairy-3">Aceite de oliva (1L)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="dairy-4">
                        <label for="dairy-4">Aceite de coco (500ml)</label>
                    </div>
                </div>
            </div>
            
            <div class="shopping-category">
                <h3>🌿 Extras</h3>
                <div class="shopping-items">
                    <div class="shopping-item">
                        <input type="checkbox" id="extra-1">
                        <label for="extra-1">Sal del Himalaya</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="extra-2">
                        <label for="extra-2">Limones (6 unidades)</label>
                    </div>
                    <div class="shopping-item">
                        <input type="checkbox" id="extra-3">
                        <label for="extra-3">Café (500g)</label>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Cargar configuración
    loadSettingsData() {
        const settings = Storage.get(Storage.KEYS.SETTINGS);
        
        document.getElementById('reminder-water').checked = settings.reminderWater;
        document.getElementById('reminder-meals').checked = settings.reminderMeals;
        document.getElementById('reminder-measures').checked = settings.reminderMeasures;
        document.getElementById('reminder-electrolytes').checked = settings.reminderElectrolytes;
    },
    
    // Setup eventos de botones y acciones
    setupEvents() {
        // Botón +1 Vaso de Agua
        const btnAddWater = document.getElementById('btn-add-water');
        if (btnAddWater) {
            btnAddWater.addEventListener('click', () => {
                Metrics.water.add();
            });
        }
        
        // Botones de control de ayuno
        const btnStartFasting = document.getElementById('btn-start-fasting');
        const btnEndFasting = document.getElementById('btn-end-fasting');
        
        if (btnStartFasting) {
            btnStartFasting.addEventListener('click', () => {
                Fasting.start();
                btnStartFasting.style.display = 'none';
                btnEndFasting.style.display = 'block';
                alert('⏱️ Ayuno iniciado. ¡Buena suerte!');
            });
        }
        
        if (btnEndFasting) {
            btnEndFasting.addEventListener('click', () => {
                const duration = Fasting.end();
                btnStartFasting.style.display = 'block';
                btnEndFasting.style.display = 'none';
                alert(`✅ Ayuno finalizado. Duración: ${duration.toFixed(1)} horas`);
            });
        }
        
        // Actualizar visibilidad de botones según estado
        this.updateFastingButtons();
        
        // Checkbox Electrolitos
        const checkElectrolytes = document.getElementById('electrolytes-checkbox');
        if (checkElectrolytes) {
            checkElectrolytes.addEventListener('change', () => {
                Metrics.electrolytes.toggle();
            });
        }
        
        // Botón Registrar Medidas
        const btnLogMeasures = document.getElementById('btn-log-measures');
        if (btnLogMeasures) {
            btnLogMeasures.addEventListener('click', () => {
                this.openMeasuresModal();
            });
        }
        
        // Modal Medidas
        this.setupMeasuresModal();
        
        // Botones de Settings
        const btnExport = document.getElementById('btn-export-data');
        if (btnExport) {
            btnExport.addEventListener('click', () => {
                Storage.export();
            });
        }
        
        const btnReset = document.getElementById('btn-reset-data');
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                Storage.clear();
            });
        }
        
        // Toggles de recordatorios
        document.querySelectorAll('.toggle input').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const settings = Storage.get(Storage.KEYS.SETTINGS);
                const key = e.target.id.replace('reminder-', 'reminder') + e.target.id.split('-')[1].charAt(0).toUpperCase() + e.target.id.split('-')[1].slice(1);
                settings[key] = e.target.checked;
                Storage.set(Storage.KEYS.SETTINGS, settings);
            });
        });
    },
    
    // Setup modal de medidas
    setupMeasuresModal() {
        const modal = document.getElementById('modal-measures');
        const closeBtn = modal.querySelector('.modal-close');
        const form = document.getElementById('form-measures');
        
        // Cerrar modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Cerrar al hacer click fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Submit formulario
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const weight = document.getElementById('input-weight').value;
            const neck = document.getElementById('input-neck').value;
            const waist = document.getElementById('input-waist').value;
            const hips = document.getElementById('input-hips').value;
            
            Metrics.measures.add(weight, neck, waist, hips);
            Charts.renderAll();
            
            modal.classList.remove('active');
            form.reset();
            
            alert('✅ Medidas registradas correctamente');
        });
    },
    
    // Abrir modal de medidas
    openMeasuresModal() {
        const modal = document.getElementById('modal-measures');
        modal.classList.add('active');
        
        // Pre-llenar con último peso si existe
        const latest = Metrics.measures.getLatest();
        if (latest) {
            document.getElementById('input-weight').value = latest.weight;
        }
    },
    
    // Actualizar visibilidad de botones de ayuno
    updateFastingButtons() {
        const btnStart = document.getElementById('btn-start-fasting');
        const btnEnd = document.getElementById('btn-end-fasting');
        
        if (btnStart && btnEnd) {
            if (Fasting.isActive()) {
                btnStart.style.display = 'none';
                btnEnd.style.display = 'block';
            } else {
                btnStart.style.display = 'block';
                btnEnd.style.display = 'none';
            }
        }
    }
};

// Inicializar app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
