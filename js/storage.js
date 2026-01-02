/* ========================================
   STORAGE - Gestión de LocalStorage
   ======================================== */

const Storage = {
    // Claves de almacenamiento
    KEYS: {
        WATER: 'keto_water',
        MEALS: 'keto_meals',
        FASTING: 'keto_fasting',
        ELECTROLYTES: 'keto_electrolytes',
        MEASURES: 'keto_measures',
        SETTINGS: 'keto_settings',
        START_DATE: 'keto_start_date'
    },

    // Obtener datos
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error al leer de localStorage:', error);
            return null;
        }
    },

    // Guardar datos
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
            return false;
        }
    },

    // Eliminar datos
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error al eliminar de localStorage:', error);
            return false;
        }
    },

    // Limpiar todo (PELIGROSO)
    clear() {
        if (confirm('⚠️ ¿Estás seguro? Se borrarán TODOS tus datos y no se pueden recuperar.')) {
            if (confirm('🚨 ÚLTIMA CONFIRMACIÓN: ¿Borrar todo definitivamente?')) {
                try {
                    Object.values(this.KEYS).forEach(key => {
                        localStorage.removeItem(key);
                    });
                    alert('✅ Datos reiniciados correctamente');
                    location.reload();
                    return true;
                } catch (error) {
                    console.error('Error al limpiar localStorage:', error);
                    return false;
                }
            }
        }
        return false;
    },

    // Inicializar datos por defecto
    init() {
        // Fecha de inicio (5 de enero 2026)
        if (!this.get(this.KEYS.START_DATE)) {
            this.set(this.KEYS.START_DATE, '2026-01-05');
        }

        // Agua (objeto con fechas como claves)
        if (!this.get(this.KEYS.WATER)) {
            this.set(this.KEYS.WATER, {});
        }

        // Comidas completadas
        if (!this.get(this.KEYS.MEALS)) {
            this.set(this.KEYS.MEALS, {});
        }

        // Historial de ayunos
        if (!this.get(this.KEYS.FASTING)) {
            this.set(this.KEYS.FASTING, {
                currentStart: null,
                history: []
            });
        }

        // Electrolitos
        if (!this.get(this.KEYS.ELECTROLYTES)) {
            this.set(this.KEYS.ELECTROLYTES, {});
        }

        // Medidas corporales
        if (!this.get(this.KEYS.MEASURES)) {
            this.set(this.KEYS.MEASURES, []);
        }

        // Configuración
        if (!this.get(this.KEYS.SETTINGS)) {
            this.set(this.KEYS.SETTINGS, {
                reminderWater: true,
                reminderMeals: true,
                reminderMeasures: true,
                reminderElectrolytes: true
            });
        }
    },

    // Exportar datos como JSON
    export() {
        const data = {};
        Object.entries(this.KEYS).forEach(([name, key]) => {
            data[name] = this.get(key);
        });
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `keto-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        alert('✅ Datos exportados correctamente');
    }
};

// Inicializar al cargar
Storage.init();
