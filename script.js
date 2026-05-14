const database = [
    // --- ZONA BADALONA Y BARCELONA CENTRO ---
    {
        nombre: "E-Claw Cosmic",
        marca: "Elaut",
        lugar: "C.C. Màgic",
        ciudad: "Badalona",
        tipo: "Azar",
        consejo: "¡Cuidado! Es una Elaut. La garra tiene fuerza de subida pero se abre al llegar arriba gracias a su sistema de control de voltaje. Solo ganarás si la máquina ha recaudado lo suficiente.",
        foto: "https://www.udc.co.uk/image/cache/catalog/product_images/cranes/elaut/eclaw_cosmic_cyan_1600px_png24-1600x1600.png",
        video: "https://www.youtube.com/embed/52zQtLg-o0E" 
    },
    {
        nombre: "SEGA UFO CATCHER 9",
        marca: "Sega",
        lugar: "C.C. Màgic",
        ciudad: "Badalona",
        tipo: "Habilidad",
        consejo: "La pinza de dos brazos tiene fuerza constante. No busques 'agarrar' el peluche por el centro, usa el retroceso de los brazos para empujar el premio hacia el agujero.",
        foto: "https://segaarcade.com/wp-content/uploads/2019/07/UFO-Catcher-9-Cabinet.jpg",
        video: "https://www.youtube.com/embed/Ssh39L_X2_Q"
    },
    {
        nombre: "MÁQUINA XL PREMIUM",
        marca: "Falgás",
        lugar: "Diagonal Mar",
        ciudad: "Barcelona",
        tipo: "Azar",
        consejo: "Suele tener el 'payout' configurado cada 15-20 jugadas. Observa si el premio resbala inmediatamente o si al menos lo levanta un par de centímetros.",
        foto: "", 
        video: ""
    },
    {
        nombre: "Toy Soldier",
        marca: "Coastal Amusements",
        lugar: "SOM Multiespai (New Park)",
        ciudad: "Barcelona",
        tipo: "Azar",
        consejo: "Mecánica algo anticuada pero traicionera. La pinza suele girar unos grados al bajar. Fíjate en la torsión del cable antes de pulsar el botón de bajada.",
        foto: "https://www.coastalamusements.com/wp-content/uploads/2015/09/Toy-Soldier-web.png",
        video: ""
    },

    // --- ZONA CORNELLÀ Y BAIX LLOBREGAT ---
    {
        nombre: "The Big One (Gigante)",
        marca: "Elaut",
        lugar: "C.C. Splau (Ilusiona)",
        ciudad: "Cornellà de Llobregat",
        tipo: "Azar",
        consejo: "Máquina para peluches XXL. La garra pesa muchísimo, a veces el propio peso de la garra empuja los peluches hacia abajo en vez de agarrarlos. Apunta a las cabezas.",
        foto: "https://www.udc.co.uk/image/cache/catalog/product_images/cranes/elaut/big_one_1600px_png24-1600x1600.png",
        video: ""
    },
    {
        nombre: "Grab N Go",
        marca: "ICE Games",
        lugar: "La Farga",
        ciudad: "L'Hospitalet de Llobregat",
        tipo: "Habilidad",
        consejo: "Es una de las pocas grúas americanas que se ven por aquí. Tiene un modo 'play till you win' (juega hasta ganar) en algunos locales, pero si es pago normal, la fuerza de cierre es bastante decente.",
        foto: "https://www.icegame.com/images/thumbs/000/0001053_grab-n-go-3-player.png",
        video: "https://www.youtube.com/embed/0m9zR0mD-bI"
    },

    // --- ZONA VALLÈS Y MARESME ---
    {
        nombre: "Barber Cut Lite",
        marca: "Namco",
        lugar: "Parc Vallès",
        ciudad: "Terrassa",
        tipo: "Azar",
        consejo: "No es de garra, es de cortar un hilo. Aunque parece 100% habilidad (alinear las tijeras), la máquina está programada para que la cuchilla no avance lo suficiente hasta alcanzar el bote de dinero.",
        foto: "https://primetimeamusements.com/wp-content/uploads/2015/04/barbercutlite.jpg",
        video: ""
    },
    {
        nombre: "Grúa Clásica Redonda",
        marca: "Falgás",
        lugar: "Mataró Parc",
        ciudad: "Mataró",
        tipo: "Azar",
        consejo: "El cristal curvo distorsiona la profundidad. Mírala siempre desde el lateral antes de soltar la pinza. Fuerza muy baja, diseñada para vaciar bolsillos.",
        foto: "",
        video: ""
    }
];

const grid = document.getElementById('machine-grid');
const searchInput = document.getElementById('search-input');

function render(data) {
    grid.innerHTML = '';
    data.forEach(maquina => {
        const card = document.createElement('div');
        card.className = 'machine-card';
        card.innerHTML = `
            <h3>${maquina.nombre}</h3>
            <p>📍 ${maquina.lugar} (${maquina.ciudad})</p>
            <p class="tag-${maquina.tipo.toLowerCase()}">MODO: ${maquina.tipo.toUpperCase()}</p>
            <p>💡 ${maquina.consejo}</p>
        `;
        card.onclick = () => abrirDetalle(maquina);
        grid.appendChild(card);
    });
}

function abrirDetalle(maquina) {
    const modal = document.getElementById('modal-maquina');
    const body = document.getElementById('modal-body');
    
    if (!body) return;

    // Generamos el enlace de Google Maps usando el lugar y la ciudad
    const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(maquina.lugar + ' ' + maquina.ciudad)}`;

    body.innerHTML = `
        <h2 style="color: #ff00ff; text-shadow: 0 0 10px #ff00ff; text-align: center;">${maquina.nombre}</h2>
        
        <!-- BOTÓN CÓMO LLEGAR -->
        <div style="text-align: center; margin-bottom: 15px;">
            <a href="${mapaUrl}" target="_blank" style="background: #4285F4; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 8px;">
                📍 Cómo llegar (Google Maps)
            </a>
        </div>

        <p style="text-align: center; color: #00ffff;"><strong>Fabricante:</strong> ${maquina.marca}</p>
        
        <div class="modal-media-container" style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
            ${maquina.foto ? `<img src="${maquina.foto}" style="width:100%; border: 2px solid #00ffff; border-radius: 10px;">` : ''}
            ${maquina.video ? `
                <div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0;">
                    <iframe src="${maquina.video}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 10px; border: 2px solid #ff00ff;" frameborder="0" allowfullscreen></iframe>
                </div>` : ''}
        </div>

        <div class="tech-info" style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; margin-top: 20px; border-left: 4px solid #ff00ff;">
            <h4 style="margin-top: 0; color: #ff00ff;">🔍 Informe de Mecánica</h4>
            <p style="line-height: 1.6;">${maquina.consejo}</p>
        </div>
    `;
    
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

// Función para cerrar el modal de forma limpia
function cerrarModal() {
    const modal = document.getElementById('modal-maquina');
    modal.style.display = "none";
    document.getElementById('modal-body').innerHTML = ""; // Limpia el video para que deje de sonar
    document.body.style.overflow = "auto"; // LIBERA el scroll al cerrar
}

// Eventos de cierre
document.querySelector('.close-button').onclick = cerrarModal;

window.onclick = (event) => {
    const modal = document.getElementById('modal-maquina');
    if (event.target === modal) {
        cerrarModal();
    }
};

// Filtros y búsqueda
searchInput.oninput = () => {
    const val = searchInput.value.toLowerCase();
    render(database.filter(m => m.nombre.toLowerCase().includes(val) || m.ciudad.toLowerCase().includes(val)));
};

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        const activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) activeBtn.classList.remove('active');
        btn.classList.add('active');
        
        const type = btn.dataset.type;
        const tarjetasActuales = document.querySelectorAll('.machine-card');
        
        tarjetasActuales.forEach(card => card.classList.add('ganado'));

        setTimeout(() => {
            const filtrados = type === 'all' 
                ? database 
                : database.filter(m => m.tipo === type);
            render(filtrados);
        }, 500); 
    };
});

// Render inicial
render(database);