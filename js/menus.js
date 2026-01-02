/* ========================================
   MENUS - Data de 4 Semanas Completas
   HORARIOS ESPAÑOLES: 9:30am inicio
   ======================================== */

const Menus = {
    semana1: {
        meta: {
            titulo: "Semana 1 - Adaptación a Cetosis",
            ayuno: "12h/12h (9:30am-9:30pm)",
            fechas: "5-11 Enero 2026",
            objetivo: "Entrada suave en cetosis"
        },
        dias: {
            lunes: {
                fecha: "2026-01-05",
                desayuno: { hora: "09:30", comida: "☕ Bulletproof Coffee + 3 huevos revueltos con mantequilla" },
                almuerzo: { hora: "15:00", comida: "🍗 Pechuga de pollo a la plancha con ensalada verde" },
                cena: { hora: "21:30", comida: "🐟 Tortitas de atún con vegetales salteados" }
            },
            martes: {
                fecha: "2026-01-06",
                desayuno: { hora: "09:30", comida: "🍳 Omelette de 3 huevos con queso y champiñones" },
                almuerzo: { hora: "15:00", comida: "🥩 Carne molida con puré de coliflor" },
                cena: { hora: "21:30", comida: "🐟 Salmón al horno con espárragos" }
            },
            miercoles: {
                fecha: "2026-01-07",
                desayuno: { hora: "09:30", comida: "🥑 Huevos benedictinos keto" },
                almuerzo: { hora: "15:00", comida: "🍕 Pizza Keto (receta especial)" },
                cena: { hora: "21:30", comida: "🥩 Costillas de cerdo con ensalada" }
            },
            jueves: {
                fecha: "2026-01-08",
                desayuno: { hora: "09:30", comida: "☕ Bulletproof Coffee + 2 salchichas + aguacate" },
                almuerzo: { hora: "15:00", comida: "🍛 Pollo al curry con arroz de coliflor" },
                cena: { hora: "21:30", comida: "🍔 Hamburguesa sin pan con queso" }
            },
            viernes: {
                fecha: "2026-01-09",
                desayuno: { hora: "09:30", comida: "🥞 Crepe keto con queso crema" },
                almuerzo: { hora: "15:00", comida: "🥩 Filete de res con mantequilla de ajo" },
                cena: { hora: "21:30", comida: "🍲 Sopa de pollo cremosa" }
            },
            sabado: {
                fecha: "2026-01-10",
                desayuno: { hora: "09:30", comida: "🍳 Huevos rancheros keto" },
                almuerzo: { hora: "15:00", comida: "🍗 Pollo asado con vegetales" },
                cena: { hora: "21:30", comida: "🐟 Atún sellado con ensalada" }
            },
            domingo: {
                fecha: "2026-01-11",
                desayuno: { hora: "09:30", comida: "🥞 Pancakes keto con mantequilla" },
                almuerzo: { hora: "15:00", comida: "🎉 Día especial libre (dentro de keto)" },
                cena: { hora: "21:30", comida: "🥗 Ensalada grande con proteína" }
            }
        }
    },

    semana2: {
        meta: {
            titulo: "Semana 2 - Quema de Grasa Acelerada",
            ayuno: "14h/10h base (9:30am-7:30pm) + 18h especiales (Mié, Jue, Dom)",
            fechas: "12-18 Enero 2026",
            objetivo: "Intensificar cetosis y ayuno"
        },
        dias: {
            lunes: {
                fecha: "2026-01-12",
                desayuno: { hora: "09:30", comida: "🍳 Huevos con tocino y aguacate" },
                almuerzo: { hora: "15:00", comida: "🍗 Alitas de pollo al horno con salsa buffalo" },
                cena: { hora: "19:30", comida: "🐟 Filete de pescado con vegetales" }
            },
            martes: {
                fecha: "2026-01-13",
                desayuno: { hora: "09:30", comida: "🍳 Omelette de jamón y queso" },
                almuerzo: { hora: "15:00", comida: "🥩 Carne asada con ensalada" },
                cena: { hora: "19:30", comida: "🍄 Champiñones rellenos de queso" }
            },
            miercoles: {
                fecha: "2026-01-14",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO 18H - Solo agua/café/té" },
                almuerzo: { hora: "15:00", comida: "🍗 Pollo al limón con espárragos" },
                cena: { hora: "15:30", comida: "🥩 Costillas BBQ keto (última comida)" }
            },
            jueves: {
                fecha: "2026-01-15",
                especial: true,
                desayuno: { hora: "09:30", comida: "⚡ AYUNO 18H - Solo líquidos sin calorías" },
                almuerzo: { hora: "15:00", comida: "🐟 Hamburguesas de salmón" },
                cena: { hora: "15:30", comida: "🎉 CHICHARRONADA ESPECIAL (última comida)" }
            },
            viernes: {
                fecha: "2026-01-16",
                desayuno: { hora: "09:30", comida: "🍳 Revuelto de huevos con chorizo" },
                almuerzo: { hora: "15:00", comida: "🥩 Filete con mantequilla compound" },
                cena: { hora: "19:30", comida: "🍲 Sopa de mariscos" }
            },
            sabado: {
                fecha: "2026-01-17",
                desayuno: { hora: "09:30", comida: "🍳 Huevos estrellados con jamón serrano" },
                almuerzo: { hora: "15:00", comida: "🍗 Pechuga rellena de espinacas y queso" },
                cena: { hora: "19:30", comida: "🐟 Atún en escabeche keto" }
            },
            domingo: {
                fecha: "2026-01-18",
                especial: true,
                desayuno: { hora: "09:30", comida: "⚡ AYUNO 18H - Preparación para parrillada" },
                almuerzo: { hora: "15:00", comida: "🎉 PARRILLADA FAMILIAR ESPECIAL" },
                cena: { hora: "15:30", comida: "🥗 Ligera - Ensalada con proteína (última comida)" }
            }
        }
    },

    semana3: {
        meta: {
            titulo: "Semana 3 - Cetosis Profunda",
            ayuno: "16h/8h base (9:30am-5:30pm) + 18h (Mié-Dom, hasta 3:30pm)",
            fechas: "19-25 Enero 2026",
            objetivo: "Autofagia y cetosis profunda"
        },
        dias: {
            lunes: {
                fecha: "2026-01-19",
                desayuno: { hora: "09:30", comida: "🍳 Huevos con aguacate y bacon" },
                almuerzo: { hora: "15:00", comida: "🍗 Pollo al horno con vegetales rostizados" },
                cena: { hora: "17:30", comida: "🍲 Sopa de res con vegetales" }
            },
            martes: {
                fecha: "2026-01-20",
                desayuno: { hora: "09:30", comida: "🍳 Omelette con champiñones y queso" },
                almuerzo: { hora: "15:00", comida: "🐟 Filete de atún sellado" },
                cena: { hora: "17:30", comida: "🥩 Hígado de res encebollado" }
            },
            miercoles: {
                fecha: "2026-01-21",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO ANCESTRAL" },
                almuerzo: { hora: "15:00", comida: "🍗 Pechuga rellena de espinacas" },
                cena: { hora: "15:30", comida: "🐟 Salmón con espárragos (última comida)" }
            },
            jueves: {
                fecha: "2026-01-22",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO ANCESTRAL" },
                almuerzo: { hora: "15:00", comida: "🥩 Carne molida con puré de brócoli" },
                cena: { hora: "15:30", comida: "🍖 Menudencia variada (última comida)" }
            },
            viernes: {
                fecha: "2026-01-23",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO ANCESTRAL" },
                almuerzo: { hora: "15:00", comida: "🦐 Mariscos salteados" },
                cena: { hora: "15:30", comida: "🥩 Costillas de cerdo al horno (última comida)" }
            },
            sabado: {
                fecha: "2026-01-24",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO ANCESTRAL" },
                almuerzo: { hora: "15:00", comida: "🍛 Pollo al curry cremoso" },
                cena: { hora: "15:30", comida: "🥗 Ensalada césar con pollo (última comida)" }
            },
            domingo: {
                fecha: "2026-01-25",
                especial: true,
                desayuno: { hora: "09:30", comida: "⚡ AYUNO ANCESTRAL" },
                almuerzo: { hora: "15:00", comida: "🎉 PARRILLADA ESPECIAL" },
                cena: { hora: "15:30", comida: "🍲 Ligera - Caldo de huesos (última comida)" }
            }
        }
    },

    semana4: {
        meta: {
            titulo: "Semana 4 - Máxima Transformación",
            ayuno: "18h/6h base (9:30am-3:30pm) + 20/4 (Jue-Vie) + 24h (Mar-Mié)",
            fechas: "26 Enero - 1 Febrero 2026",
            objetivo: "Consolidar resultados y celebrar"
        },
        dias: {
            lunes: {
                fecha: "2026-01-26",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO 18 HORAS" },
                almuerzo: { hora: "15:00", comida: "🥩 Filete de res con mantequilla" },
                cena: { hora: "15:30", comida: "🍗 Pollo al limón con vegetales (última comida)" }
            },
            martes: {
                fecha: "2026-01-27",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO preparación 24h" },
                almuerzo: { hora: "15:00", comida: "🐟 Salmón con espárragos" },
                cena: { hora: "15:30", comida: "🥗 ÚLTIMA COMIDA antes de ayuno 24h" }
            },
            miercoles: {
                fecha: "2026-01-28",
                especial: true,
                desayuno: { hora: "09:30", comida: "⚡ AYUNO 24H COMPLETO - Solo agua" },
                almuerzo: { hora: "15:00", comida: "🍲 ROMPER AYUNO: Caldo + Pollo suave" },
                cena: { hora: "15:30", comida: "🍳 Ligera - Huevos revueltos (última comida)" }
            },
            jueves: {
                fecha: "2026-01-29",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO 20H - Mini Reto 20/4" },
                almuerzo: { hora: "13:30", comida: "🥩 Costillas BBQ keto" },
                cena: { hora: "14:00", comida: "🍔 Hamburguesa gourmet sin pan (última comida)" }
            },
            viernes: {
                fecha: "2026-01-30",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO 20H - Mini Reto 20/4" },
                almuerzo: { hora: "13:30", comida: "🐟 Atún sellado con ensalada" },
                cena: { hora: "14:00", comida: "🍕 Pizza Keto (tu favorita - última comida)" }
            },
            sabado: {
                fecha: "2026-01-31",
                desayuno: { hora: "09:30", comida: "⚡ AYUNO 18 HORAS" },
                almuerzo: { hora: "15:00", comida: "🍗 Alitas de pollo al horno" },
                cena: { hora: "15:30", comida: "🦐 Filete con camarones Surf & Turf (última comida)" }
            },
            domingo: {
                fecha: "2026-02-01",
                especial: true,
                desayuno: { hora: "09:30", comida: "🎉 BRUNCH ESPECIAL LIBRE" },
                almuerzo: { hora: "15:00", comida: "🎉 DÍA LIBRE - ¡LO LOGRASTE!" },
                cena: { hora: "21:30", comida: "🎉 CELEBRACIÓN - 28 días completados" }
            }
        }
    },

    // Funciones helpers
    getCurrentWeek() {
        const startDate = new Date(Storage.get(Storage.KEYS.START_DATE) || '2026-01-05');
        const today = new Date();
        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weekNumber = Math.min(Math.ceil((diffDays + 1) / 7), 4);
        return weekNumber > 0 ? weekNumber : 1;
    },

    getCurrentDay() {
        const today = new Date();
        const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        return days[today.getDay()];
    },

    getMenuForToday() {
        const week = this.getCurrentWeek();
        const day = this.getCurrentDay();
        const weekKey = `semana${week}`;
        
        if (this[weekKey] && this[weekKey].dias[day]) {
            return {
                week,
                day,
                meta: this[weekKey].meta,
                meals: this[weekKey].dias[day]
            };
        }
        
        return null;
    },

    getMenuForWeek(weekNumber) {
        const weekKey = `semana${weekNumber}`;
        return this[weekKey] || null;
    }
};
