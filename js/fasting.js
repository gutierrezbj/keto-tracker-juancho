/* ========================================
   FASTING - Lógica de Ayuno Intermitente
   ======================================== */

const Fasting = {
    timer: null,

    // Iniciar ayuno
    start() {
        const data = Storage.get(Storage.KEYS.FASTING);
        data.currentStart = new Date().toISOString();
        Storage.set(Storage.KEYS.FASTING, data);
        this.startTimer();
    },

    // Terminar ayuno
    end() {
        const data = Storage.get(Storage.KEYS.FASTING);
        if (data.currentStart) {
            const start = new Date(data.currentStart);
            const end = new Date();
            const duration = (end - start) / (1000 * 60 * 60); // horas
            
            // Agregar al historial
            data.history.push({
                start: data.currentStart,
                end: end.toISOString(),
                duration: Math.round(duration * 10) / 10 // 1 decimal
            });
            
            data.currentStart = null;
            Storage.set(Storage.KEYS.FASTING, data);
            
            this.stopTimer();
            return duration;
        }
        return 0;
    },

    // Verificar si está en ayuno
    isActive() {
        const data = Storage.get(Storage.KEYS.FASTING);
        return data.currentStart !== null;
    },

    // Obtener tiempo transcurrido en segundos
    getElapsed() {
        const data = Storage.get(Storage.KEYS.FASTING);
        if (data.currentStart) {
            const start = new Date(data.currentStart);
            const now = new Date();
            return Math.floor((now - start) / 1000);
        }
        return 0;
    },

    // Formatear segundos a HH:MM:SS
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },

    // Obtener objetivo de ayuno para hoy
    getTodayTarget() {
        const menu = Menus.getMenuForToday();
        if (!menu) return 12;
        
        const week = menu.week;
        
        // Semana 1: 12h
        if (week === 1) return 12;
        
        // Semana 2: 14h base, 18h especiales
        if (week === 2) {
            const day = menu.day;
            if (['miercoles', 'jueves', 'domingo'].includes(day)) return 18;
            return 14;
        }
        
        // Semana 3: 16h base, 18h desde miércoles
        if (week === 3) {
            const day = menu.day;
            if (['miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].includes(day)) return 18;
            return 16;
        }
        
        // Semana 4: 18h base, 24h martes-miércoles, 20h jueves-viernes
        if (week === 4) {
            const day = menu.day;
            if (day === 'martes' || day === 'miercoles') return 24;
            if (day === 'jueves' || day === 'viernes') return 20;
            return 18;
        }
        
        return 12;
    },

    // Actualizar UI del timer
    updateUI() {
        const elapsed = this.getElapsed();
        const formatted = this.formatTime(elapsed);
        
        // Update timers
        const timers = document.querySelectorAll('#fasting-timer, #fasting-timer-detail');
        timers.forEach(timer => {
            if (timer) timer.textContent = formatted;
        });
        
        // Update progress
        const target = this.getTodayTarget();
        const percentage = Math.min((elapsed / (target * 3600)) * 100, 100);
        
        const progressBar = document.getElementById('fasting-progress-bar');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
        
        const progressText = document.getElementById('fasting-progress-text');
        if (progressText) {
            progressText.textContent = `${Math.round(percentage)}% completado (Meta: ${target}h)`;
        }
        
        // Update status
        const status = document.getElementById('fasting-status');
        if (status) {
            status.textContent = this.isActive() ? 'En progreso' : 'Completado';
        }
        
        const stateText = document.getElementById('state-text');
        if (stateText) {
            stateText.textContent = this.isActive() ? 'Ventana de Ayuno' : 'Ventana de Alimentación';
        }
        
        // Update target
        const targetEl = document.getElementById('fasting-target');
        if (targetEl) {
            targetEl.textContent = `Meta de hoy: ${target} horas`;
        }
    },

    // Iniciar timer de actualización
    startTimer() {
        this.stopTimer();
        this.updateUI();
        this.timer = setInterval(() => this.updateUI(), 1000);
    },

    // Detener timer
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    // Renderizar historial
    renderHistory() {
        const container = document.getElementById('fasting-history');
        if (!container) return;
        
        const data = Storage.get(Storage.KEYS.FASTING);
        const history = data.history.slice().reverse(); // Más recientes primero
        
        if (history.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Sin ayunos completados aún</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = history.map(item => {
            const date = new Date(item.end).toLocaleDateString('es-ES', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
            });
            
            return `
                <div class="history-item">
                    <span class="history-date">${date}</span>
                    <span class="history-duration">${item.duration}h</span>
                </div>
            `;
        }).join('');
    },

    // Renderizar horario semanal
    renderSchedule() {
        const container = document.getElementById('fasting-schedule');
        if (!container) return;
        
        const week = Menus.getCurrentWeek();
        const menu = Menus.getMenuForWeek(week);
        
        if (!menu) return;
        
        const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
        
        container.innerHTML = days.map(day => {
            const dayData = menu.dias[day];
            let hours = '12h';
            
            // Calcular horas según semana y día
            if (week === 1) hours = '12h';
            else if (week === 2) {
                hours = ['miercoles', 'jueves', 'domingo'].includes(day) ? '18h' : '14h';
            }
            else if (week === 3) {
                hours = ['miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].includes(day) ? '18h' : '16h';
            }
            else if (week === 4) {
                if (day === 'martes' || day === 'miercoles') hours = '24h';
                else if (day === 'jueves' || day === 'viernes') hours = '20h';
                else hours = '18h';
            }
            
            const dayName = day.charAt(0).toUpperCase() + day.slice(1);
            
            return `
                <div class="schedule-day">
                    <span class="schedule-day-name">${dayName}</span>
                    <span class="schedule-day-hours">${hours}</span>
                </div>
            `;
        }).join('');
    },

    // Inicializar
    init() {
        if (this.isActive()) {
            this.startTimer();
        }
        this.renderHistory();
        this.renderSchedule();
    }
};
