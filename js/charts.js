/* ========================================
   CHARTS - Gráficas con Canvas API
   ======================================== */

const Charts = {
    // Gráfica de peso
    renderWeight() {
        const canvas = document.getElementById('weight-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = Metrics.measures.getAll();
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (data.length === 0) {
            ctx.fillStyle = '#6b7280';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Sin datos aún', canvas.width / 2, canvas.height / 2);
            return;
        }
        
        // Config
        const padding = 40;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;
        
        // Extraer pesos
        const weights = data.map(d => d.weight);
        const minWeight = Math.min(...weights) - 1;
        const maxWeight = Math.max(...weights) + 1;
        
        // Dibujar ejes
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Dibujar línea de objetivo (80kg)
        const targetY = canvas.height - padding - ((80 - minWeight) / (maxWeight - minWeight)) * chartHeight;
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(padding, targetY);
        ctx.lineTo(canvas.width - padding, targetY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Label objetivo
        ctx.fillStyle = '#10b981';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('Meta: 80kg', canvas.width - padding - 5, targetY - 5);
        
        // Dibujar línea de datos
        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
            const y = canvas.height - padding - ((point.weight - minWeight) / (maxWeight - minWeight)) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Dibujar punto
            ctx.fillStyle = '#ff6b35';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
            
            // Label del peso
            ctx.fillStyle = '#1f2937';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${point.weight.toFixed(1)}`, x, y - 10);
        });
        
        ctx.stroke();
        
        // Labels de ejes
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${maxWeight.toFixed(0)}kg`, padding - 5, padding + 5);
        ctx.fillText(`${minWeight.toFixed(0)}kg`, padding - 5, canvas.height - padding + 5);
    },
    
    // Gráfica de medidas (cintura)
    renderMeasures() {
        const canvas = document.getElementById('measures-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = Metrics.measures.getAll();
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (data.length === 0) {
            ctx.fillStyle = '#6b7280';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Sin datos aún', canvas.width / 2, canvas.height / 2);
            return;
        }
        
        // Config
        const padding = 40;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;
        
        // Extraer medidas
        const waists = data.map(d => d.waist);
        const minWaist = Math.min(...waists) - 2;
        const maxWaist = Math.max(...waists) + 2;
        
        // Dibujar ejes
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Dibujar línea de datos (cintura)
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((point, index) => {
            const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
            const y = canvas.height - padding - ((point.waist - minWaist) / (maxWaist - minWaist)) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Dibujar punto
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
            
            // Label de la medida
            ctx.fillStyle = '#1f2937';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`${point.waist.toFixed(1)}`, x, y - 10);
        });
        
        ctx.stroke();
        
        // Labels de ejes
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${maxWaist.toFixed(0)}cm`, padding - 5, padding + 5);
        ctx.fillText(`${minWaist.toFixed(0)}cm`, padding - 5, canvas.height - padding + 5);
        
        // Título
        ctx.fillStyle = '#3b82f6';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Cintura (cm)', canvas.width / 2, 20);
    },
    
    // Renderizar todas las gráficas
    renderAll() {
        this.renderWeight();
        this.renderMeasures();
    }
};
