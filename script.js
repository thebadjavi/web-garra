const database = [
    {
        nombre: "E-Claw Cosmic",
        lugar: "C.C. Màgic",
        ciudad: "Badalona",
        tipo: "Azar",
        consejo: "¡Cuidado! Es una Elaut. La garra tiene fuerza de subida pero se abre al llegar arriba gracias a su sistema de control de voltaje. Solo ganarás si la máquina ha recaudado lo suficiente.",
        foto: "https://www.udc.co.uk/image/cache/catalog/product_images/cranes/elaut/eclaw_cosmic_cyan_1600px_png24-1600x1600.png",
        video: "https://www.youtube.com/embed/52zQtLg-o0E" 
    },
    {
        nombre: "SEGA UFO CATCHER 9",
        lugar: "C.C. Màgic",
        ciudad: "Badalona",
        tipo: "Habilidad",
        consejo: "La pinza de dos brazos tiene fuerza constante. No busques 'agarrar' el peluche por el centro, usa el retroceso de los brazos para empujar el premio hacia el agujero.",
        foto: "https://segaarcade.com/wp-content/uploads/2019/07/UFO-Catcher-9-Cabinet.jpg",
        video: "https://www.youtube.com/embed/Ssh39L_X2_Q"
    },
    {
        nombre: "MÁQUINA XL PREMIUM",
        lugar: "Diagonal Mar",
        ciudad: "Barcelona",
        tipo: "Azar",
        consejo: "Suele tener el 'payout' configurado cada 15-20 jugadas. Observa si el premio resbala inmediatamente o si al menos lo levanta un par de centímetros.",
        foto: "", 
        video: ""
    }
    // ... añade aquí el resto de tus máquinas
];

function render(data) {
    const grid = document.getElementById('grid-maquinas');
    grid.innerHTML = '';
    data.forEach((maquina, index) => {
        const card = document.createElement('div');
        card.className = 'machine-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <h3>${maquina.nombre}</h3>
            <p style="color: #ff00ff; font-weight: bold;">📍 ${maquina.lugar} (${maquina.ciudad})</p>
            <p style="color: #00ffff; font-size: 0.85em;">MODO: ${maquina.tipo.toUpperCase()}</p>
            <p style="font-size: 0.9em; line-height: 1.4; color: #ccc; margin-top: 15px;">💡 ${maquina.consejo}</p>
        `;
        card.onclick = () => abrirDetalle(maquina);
        grid.appendChild(card);
    });
}

// BUSCADOR INTELIGENTE: Ignora tildes y mayúsculas
document.getElementById('buscador').addEventListener('input', (e) => {
    // Función para quitar acentos: convierte 'Màgic' en 'Magic'
    const normalizar = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    const textoUsuario = normalizar(e.target.value);
    
    const filtrados = database.filter(maquina => {
        const nombre = normalizar(maquina.nombre);
        const ciudad = normalizar(maquina.ciudad);
        const lugar = normalizar(maquina.lugar);
        
        return nombre.includes(textoUsuario) || 
               ciudad.includes(textoUsuario) || 
               lugar.includes(textoUsuario);
    });

    // Reset de botones visual
    const botones = document.querySelectorAll('.filter-btn');
    botones.forEach(btn => btn.classList.remove('active'));

    render(filtrados);
});


function filtrar(tipo, elemento) {
    const botones = document.querySelectorAll('.filter-btn');
    botones.forEach(btn => btn.classList.remove('active'));
    if (elemento) elemento.classList.add('active');

    if (tipo === 'Todas') {
        render(database);
    } else {
        render(database.filter(m => m.tipo === tipo));
    }
}

function abrirDetalle(maquina) {
    const modal = document.getElementById('modal-maquina');
    const body = document.getElementById('modal-body');
    
    // Generamos el enlace de Google Maps con el lugar y la ciudad
    const direccionMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(maquina.lugar + ' ' + maquina.ciudad)}`;

    body.innerHTML = `
        <h2 style="color: #ff4d4d; text-align: center; text-transform: uppercase; letter-spacing: 2px;">${maquina.nombre}</h2>
        
        <div style="text-align: center; margin-bottom: 20px;">
            <a href="${direccionMaps}" target="_blank" style="display: inline-block; background: #4285F4; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.2s;">
                📍 CÓMO LLEGAR (MAPS)
            </a>
        </div>

        <div class="modal-media-container">
            ${maquina.foto ? `<img src="${maquina.foto}" style="border: 2px solid #555;">` : ''}
            ${maquina.video ? `
                <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-top:15px;">
                    <iframe src="${maquina.video}" style="position:absolute; top:0; left:0; width:100%; height:100%; border-radius:10px;" frameborder="0" allowfullscreen></iframe>
                </div>` : ''}
        </div>

        <div style="margin-top: 25px; padding: 15px; background: #222; border-radius: 10px; border-left: 5px solid #ff4d4d; box-shadow: inset 0 0 10px #000;">
            <h4 style="margin: 0 0 10px 0; color: #ff4d4d; font-size: 1.1em;">🔍 INFORME DE MECÁNICA</h4>
            <p style="margin: 0; line-height: 1.6; color: #eee; font-size: 0.95em;">${maquina.consejo}</p>
        </div>
    `;
    
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function cerrarModal() {
    document.getElementById('modal-maquina').style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = (e) => {
    if (e.target.id === 'modal-maquina') cerrarModal();
};

// AL CARGAR LA WEB
window.onload = () => {
    const primerBoton = document.querySelector('.filter-btn');
    // Solo filtramos, NO abrimos el detalle al inicio
    filtrar('Todas', primerBoton);
};