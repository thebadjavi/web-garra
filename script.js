let database = []; // Empezamos vacío

// FUNCIÓN ASÍNCRONA (Programación no bloqueante)
async function cargarDatosDeFirebase() {
    try {
        const querySnapshot = await window.getDocs(window.collection(window.db, "maquinas"));
         
        database = [];
        querySnapshot.forEach((doc) => {
            database.push(doc.data());
        });
        
        // Una vez tenemos los datos, cargamos la web
        const primerBoton = document.querySelector('.filter-btn');
        filtrar('Todas', primerBoton);
        
    } catch (error) {
        console.error("Error cargando Firebase:", error);
    }
}

// Sustituimos el window.onload antiguo por la llamada a Firebase
window.onload = cargarDatosDeFirebase;

// Leer base de datos desde Firestore
async function cargarMaquinas() {
    const querySnapshot = await getDocs(collection(db, "maquinas"));
    const maquinas = [];
    querySnapshot.forEach((doc) => {
        maquinas.push(doc.data());
    });
    render(maquinas); // Tu función de dibujar tarjetas de siempre
}
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
            <img src="${maquina.foto || 'placeholder.jpg'}" alt="Foto de la máquina" style="width:100%; border-radius:10px;">
        
${maquina.video ? `<a href="${maquina.video}" target="_blank" class="video-link">📺 Ver video de la máquina</a>` : ''}            <p style="font-size: 0.9em; line-height: 1.4; color: #ccc; margin-top: 15px;">💡 ${maquina.consejo}</p>
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


/*  
// AL CARGAR LA WEB
window.onload = () => {
    const primerBoton = document.querySelector('.filter-btn');
    // Solo filtramos, NO abrimos el detalle al inicio
    filtrar('Todas', primerBoton);
};
*/