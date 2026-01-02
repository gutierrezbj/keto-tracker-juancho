/* ========================================
   METRICS - Tracking de las 6 Métricas
   ======================================== */

const Metrics = {
    // Constantes
    DAILY_WATER_GOAL: 13, // vasos
    INITIAL_WEIGHT: 90, // kg
    HEIGHT: 1.70, // m
    
    // === MÉTRICA 1: HIDRATACIÓN ===
    water: {
        add() {
            const today = this.getTodayKey();
            const data = Storage.get(Storage.KEYS.WATER);
            
            if (!data[today]) data[today] = 0;
            
            if (data[today] < Metrics.DAILY_WATER_GOAL) {
                data[today]++;
                Storage.set(Storage.KEYS.WATER, data);
                this.updateUI();
            }
        },
        
        remove() {
            const today = this.getTodayKey();
            const data = Storage.get(Storage.KEYS.WATER);
            
            if (data[today] && data[today] > 0) {
                data[today]--;
                Storage.set(Storage.KEYS.WATER, data);
                this.updateUI();
            }
        },
        
        getCount() {
            const today = this.getTodayKey();
            const data = Storage.get(Storage.KEYS.WATER);
            return data[today] || 0;
        },
        
        updateUI() {
            const count = this.getCount();
            const percentage = Math.min((count / Metrics.DAILY_WATER_GOAL) * 100, 100);
            
            // Update counter
            const counter = document.getElementById('glasses-count');
            if (counter) counter.textContent = count;
            
            // Update remaining
            const remaining = document.getElementById('glasses-remaining');
            if (remaining) {
                const left = Math.max(0, Metrics.DAILY_WATER_GOAL - count);
                remaining.textContent = left === 0 ? '¡Meta alcanzada!' : `Faltan ${left}`;
            }
            
            // Update ring progress (SVG)
            const ring = document.getElementById('ring-progress');
            if (ring) {
                const circumference = 534; // 2 * PI * 85
                const offset = circumference - (percentage / 100) * circumference;
                ring.style.strokeDashoffset = offset;
            }
        },
        
        getTodayKey() {
            return new Date().toISOString().split('T')[0];
        }
    },
    
    // === MÉTRICA 2: COMIDAS ===
    meals: {
        complete(mealType) {
            const today = this.getTodayKey();
            const data = Storage.get(Storage.KEYS.MEALS);
            
            if (!data[today]) data[today] = {};
            
            data[today][mealType] = new Date().toISOString();
            Storage.set(Storage.KEYS.MEALS, data);
            
            // Si termina comida, reiniciar ayuno
            Fasting.end();
            Fasting.start();
        },
        
        isCompleted(mealType) {
            const today = this.getTodayKey();
            const data = Storage.get(Storage.KEYS.MEALS);
            return data[today] && data[today][mealType];
        },
        
        getTodayKey() {
            return new Date().toISOString().split('T')[0];
        }
    },
    
    // === MÉTRICA 3: ELECTROLITOS ===
    electrolytes: {
        toggle() {
            const today = this.getTodayKey();
            const data = Storage.get(Storage.KEYS.ELECTROLYTES);
            
            data[today] = !data[today];
            Storage.set(Storage.KEYS.ELECTROLYTES, data);
            this.updateUI();
        },
        
        isCompleted() {
            const today = this.getTodayKey();
            const data = Storage.get(Storage.KEYS.ELECTROLYTES);
            return data[today] || false;
        },
        
        updateUI() {
            const checkbox = document.getElementById('electrolytes-checkbox');
            if (checkbox) {
                checkbox.checked = this.isCompleted();
            }
        },
        
        getTodayKey() {
            return new Date().toISOString().split('T')[0];
        }
    },
    
    // === MÉTRICA 4 & 5: MEDIDAS CORPORALES ===
    measures: {
        add(weight, neck, waist, hips) {
            const data = Storage.get(Storage.KEYS.MEASURES);
            
            data.push({
                date: new Date().toISOString(),
                weight: parseFloat(weight),
                neck: parseFloat(neck),
                waist: parseFloat(waist),
                hips: parseFloat(hips),
                bmi: this.calculateBMI(weight)
            });
            
            Storage.set(Storage.KEYS.MEASURES, data);
            this.updateUI();
        },
        
        getLatest() {
            const data = Storage.get(Storage.KEYS.MEASURES);
            return data.length > 0 ? data[data.length - 1] : null;
        },
        
        getAll() {
            return Storage.get(Storage.KEYS.MEASURES);
        },
        
        calculateBMI(weight) {
            const bmi = weight / (Metrics.HEIGHT * Metrics.HEIGHT);
            return Math.round(bmi * 10) / 10;
        },
        
        updateUI() {
            const latest = this.getLatest();
            
            if (latest) {
                const currentWeight = document.getElementById('current-weight');
                if (currentWeight) currentWeight.textContent = latest.weight.toFixed(1) + ' kg';
                
                const weightLost = document.getElementById('weight-lost');
                if (weightLost) {
                    const lost = Metrics.INITIAL_WEIGHT - latest.weight;
                    weightLost.textContent = lost.toFixed(1) + ' kg';
                }
                
                const currentBMI = document.getElementById('current-bmi');
                if (currentBMI) currentBMI.textContent = latest.bmi;
            }
            
            this.renderTable();
        },
        
        renderTable() {
            const container = document.getElementById('records-table');
            if (!container) return;
            
            const data = this.getAll().slice().reverse(); // Más recientes primero
            
            if (data.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <p>Sin registros aún. Usa el botón "Registrar Medidas" para empezar.</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Peso</th>
                            <th>Cuello</th>
                            <th>Cintura</th>
                            <th>Cadera</th>
                            <th>IMC</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(record => {
                            const date = new Date(record.date).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short'
                            });
                            
                            return `
                                <tr>
                                    <td>${date}</td>
                                    <td>${record.weight.toFixed(1)}</td>
                                    <td>${record.neck.toFixed(1)}</td>
                                    <td>${record.waist.toFixed(1)}</td>
                                    <td>${record.hips.toFixed(1)}</td>
                                    <td>${record.bmi}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            `;
        }
    },
    
    // === MÉTRICA 6: PROGRESO GENERAL ===
    progress: {
        getDayNumber() {
            const startDate = new Date(Storage.get(Storage.KEYS.START_DATE) || '2026-01-05');
            const today = new Date();
            const diffTime = today - startDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            return Math.max(1, diffDays + 1);
        },
        
        getWeekNumber() {
            const day = this.getDayNumber();
            return Math.min(Math.ceil(day / 7), 4);
        },
        
        updateUI() {
            const dayEl = document.getElementById('day-number');
            if (dayEl) dayEl.textContent = this.getDayNumber();
            
            const weekEl = document.getElementById('week-number');
            if (weekEl) weekEl.textContent = this.getWeekNumber();
            
            const daysCompleted = document.getElementById('days-completed');
            if (daysCompleted) daysCompleted.textContent = Math.min(this.getDayNumber(), 28);
            
            const daysRemaining = document.getElementById('days-remaining');
            if (daysRemaining) daysRemaining.textContent = Math.max(0, 28 - this.getDayNumber());
        }
    },
    
    // Inicializar todas las métricas
    init() {
        this.water.updateUI();
        this.electrolytes.updateUI();
        this.measures.updateUI();
        this.progress.updateUI();
    }
};
