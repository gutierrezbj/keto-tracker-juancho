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
        
        // Iniciar ayuno si no está activo
        if (!Fasting.isActive()) {
            Fasting.start();
        }
        
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
        
        // Cargar próxima comida
        const menu = Menus.getMenuForToday();
        if (menu) {
            const now = new Date();
            const currentHour = now.getHours();
            
            let nextMeal = null;
            
            // Determinar próxima comida
            if (currentHour < 8) {
                nextMeal = { type: 'desayuno', data: menu.meals.desayuno, icon: '🍳' };
            } else if (currentHour < 14) {
                nextMeal = { type: 'almuerzo', data: menu.meals.almuerzo, icon: '😋' };
            } else if (currentHour < 20) {
                nextMeal = { type: 'cena', data: menu.meals.cena, icon: '🌙' };
            } else {
                // Después de las 20h, mostrar desayuno del día siguiente
                nextMeal = { type: 'desayuno', data: { hora: '08:00', comida: 'Próximo desayuno' }, icon: '🍳' };
            }
            
            if (nextMeal) {
                const mealTimeEl = document.getElementById('next-meal-time');
                const mealEl = document.getElementById('next-meal');
                
                if (mealTimeEl) mealTimeEl.textContent = nextMeal.data.hora;
                
                if (mealEl) {
                    const mealName = nextMeal.type.charAt(0).toUpperCase() + nextMeal.type.slice(1);
                    mealEl.innerHTML = `
                        <div class="meal-icon">${nextMeal.icon}</div>
                        <div class="meal-info">
                            <div class="meal-name">${mealName}</div>
                            <div class="meal-description">${nextMeal.data.comida}</div>
                        </div>
                    `;
                }
            }
        }
    },
    
    // Cargar datos del menú
    loadMenuData() {
        const week = Menus.getCurrentWeek();
        const menu = Menus.getMenuForWeek(week);
        
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
        
        // Setup selector de semana
        this.setupWeekSelector();
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
                
                // Cargar menú de esa semana
                const menu = Menus.getMenuForWeek(week);
                // ... renderizar menú (similar al código anterior)
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
        
        // Botón Comida Completada
        const btnMealCompleted = document.getElementById('btn-meal-completed');
        if (btnMealCompleted) {
            btnMealCompleted.addEventListener('click', () => {
                Metrics.meals.complete('current');
                alert('✅ Comida registrada. Timer de ayuno reiniciado.');
            });
        }
        
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
    }
};

// Inicializar app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
