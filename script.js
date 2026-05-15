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
    
    body.innerHTML = `
        <h2 style="color: #ff4d4d; text-align: center;">${maquina.nombre}</h2>
        <div class="modal-media-container">
            ${maquina.foto ? `<img src="${maquina.foto}">` : ''}
            ${maquina.video ? `<iframe height="315" src="${maquina.video}" frameborder="0" allowfullscreen></iframe>` : ''}
        </div>
        <div style="margin-top: 20px; padding: 15px; background: #222; border-radius: 10px; border-left: 5px solid #ff4d4d;">
            <h4 style="margin: 0 0 10px 0; color: #ff4d4d;">🔍 INFORME DE MECÁNICA</h4>
            <p style="margin: 0; line-height: 1.5;">${maquina.consejo}</p>
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