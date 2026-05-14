// Datos controlados por ti (Tu "backend" manual)
const database = [
    {
        nombre: "SEGA UFO CATCHER 9",
        lugar: "C.C. Magic",
        ciudad: "Badalona",
        tipo: "Habilidad",
        consejo: "La pinza tiene fuerza constante. Usa el retroceso para empujar el premio."
    },
    {
        nombre: "MÁQUINA XL PREMIUM",
        lugar: "Diagonal Mar",
        ciudad: "Barcelona",
        tipo: "Azar",
        consejo: "Suele tener fuerza cada 15-20 jugadas. Observa si el premio resbala."
    },
    {
        nombre: "CORTE DE CUERDA",
        lugar: "La Maquinista",
        ciudad: "Barcelona",
        tipo: "Habilidad",
        consejo: "El botón tiene un ligero retraso de 0.1s. Suelta un poco antes."
    }
];

const grid = document.getElementById('machine-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

// Función para renderizar el contenido
function render(data) {
    // 1. Mandamos las actuales al hoyo
    const currentCards = document.querySelectorAll('.card');
    currentCards.forEach(card => card.classList.add('exit'));

    // 2. Esperamos a que caigan y dibujamos las nuevas
    setTimeout(() => {
        grid.innerHTML = '';
        data.forEach((m, i) => {
            const card = document.createElement('div');
            card.className = 'card entry';
            card.style.animationDelay = `${i * 0.1}s`;
            
            card.innerHTML = `
                <h3>${m.nombre}</h3>
                <p>📍 <strong>${m.lugar}</strong> (${m.ciudad})</p>
                <p style="color: #e94560; font-weight: bold;">MODO: ${m.tipo.toUpperCase()}</p>
                <div class="tip">💡 ${m.consejo}</div>
            `;
            grid.appendChild(card);
        });
    }, 400);
}

function handleFilter() {
    const text = searchInput.value.toLowerCase();
    const activeType = document.querySelector('.filter-btn.active').dataset.type;

    const filtered = database.filter(m => {
        // Buscamos la "m" en el nombre, el lugar y la ciudad
        const matchesText = 
            m.nombre.toLowerCase().includes(text) || 
            m.lugar.toLowerCase().includes(text) || 
            m.ciudad.toLowerCase().includes(text);
            
        const matchesType = activeType === 'all' || m.tipo === activeType;
        
        return matchesText && matchesType;
    });

    render(filtered);
}

// Eventos de usuario
searchInput.addEventListener('input', handleFilter);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Pequeño retraso para que la garra del botón "apriete" antes de caer
        setTimeout(handleFilter, 150);
    });
});

// Carga inicial
render(database);