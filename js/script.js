// =============================================
// EJERCICIOS JAVASCRIPT
// =============================================

/**
 * 1. Detector de Palíndromos
 * Verifica si una cadena es un palíndromo (se lee igual al derecho y al revés)
 */
function esPalindromo(cadena) {
    if (!cadena || cadena.trim() === '') {
        return false;
    }
    
    // Limpiar la cadena: eliminar espacios, signos de puntuación y convertir a minúsculas
    const cadenaLimpia = cadena.toLowerCase().replace(/[^a-z0-9áéíóúñ]/g, '');
    
    // Verificar si la cadena limpia está vacía
    if (cadenaLimpia.length === 0) {
        return false;
    }
    
    // Comparar con la cadena invertida
    const cadenaInvertida = cadenaLimpia.split('').reverse().join('');
    
    return cadenaLimpia === cadenaInvertida;
}

function verificarPalindromo() {
    const input = document.getElementById('palindromo-input').value;
    const resultado = document.getElementById('palindromo-resultado');
    
    if (!input) {
        resultado.textContent = 'Por favor, ingresa una palabra o frase';
        resultado.className = 'resultado resultado-error';
        return;
    }
    
    if (esPalindromo(input)) {
        resultado.textContent = `"${input}" ✓ ES un palíndromo`;
        resultado.className = 'resultado resultado-positivo';
    } else {
        resultado.textContent = `"${input}" ✗ NO es un palíndromo`;
        resultado.className = 'resultado resultado-negativo';
    }
}

/**
 * 2. Comparador de Números
 * Compara dos números y determina cuál es mayor o si son iguales
 */
function compararNumeros() {
    const num1 = parseFloat(document.getElementById('numero1').value);
    const num2 = parseFloat(document.getElementById('numero2').value);
    const resultado = document.getElementById('comparacion-resultado');
    
    if (isNaN(num1) || isNaN(num2)) {
        resultado.textContent = '❌ Por favor, ingresa números válidos en ambos campos';
        resultado.className = 'resultado resultado-error';
        return;
    }
    
    if (num1 > num2) {
        resultado.textContent = `✅ El número ${num1} es MAYOR que ${num2}`;
        resultado.className = 'resultado resultado-positivo';
    } else if (num2 > num1) {
        resultado.textContent = `✅ El número ${num2} es MAYOR que ${num1}`;
        resultado.className = 'resultado resultado-positivo';
    } else {
        resultado.textContent = `🔵 Los números son IGUALES (${num1})`;
        resultado.className = 'resultado resultado-positivo';
    }
}

/**
 * 3. Detector de Vocales
 * Encuentra y muestra las vocales únicas que aparecen en una frase
 */
function encontrarVocales() {
    const frase = document.getElementById('frase-vocales').value;
    const resultado = document.getElementById('vocales-resultado');
    
    if (!frase) {
        resultado.textContent = 'Por favor, ingresa una frase';
        resultado.className = 'resultado resultado-error';
        return;
    }
    
    // Encontrar todas las vocales (incluyendo acentuadas)
    const vocalesEncontradas = frase.match(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/g);
    
    if (vocalesEncontradas && vocalesEncontradas.length > 0) {
        // Obtener vocales únicas y ordenarlas
        const vocalesUnicas = [...new Set(vocalesEncontradas)].sort();
        resultado.textContent = `Vocales encontradas: ${vocalesUnicas.join(', ').toUpperCase()}`;
        resultado.className = 'resultado resultado-positivo';
    } else {
        resultado.textContent = 'No se encontraron vocales en la frase';
        resultado.className = 'resultado resultado-negativo';
    }
}

/**
 * 4. Contador de Vocales
 * Cuenta cuántas veces aparece cada vocal en una frase
 */
function contarVocales() {
    const frase = document.getElementById('frase-contar-vocales').value.toLowerCase();
    const resultado = document.getElementById('contador-vocales-resultado');
    
    if (!frase) {
        resultado.textContent = 'Por favor, ingresa una frase';
        resultado.className = 'resultado resultado-error';
        return;
    }
    
    // Objeto para contar cada tipo de vocal
    const contador = {
        'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0,
        'á': 0, 'é': 0, 'í': 0, 'ó': 0, 'ú': 0
    };
    
    // Contar cada vocal
    for (let letra of frase) {
        if (contador.hasOwnProperty(letra)) {
            contador[letra]++;
        }
    }
    
    // Crear el HTML del resultado
    let resultadoHTML = '<div class="contador-vocales">';
    let totalVocales = 0;
    
    // Agrupar vocales normales y acentuadas
    const grupos = {
        'a': ['a', 'á'],
        'e': ['e', 'é'],
        'i': ['i', 'í'],
        'o': ['o', 'ó'],
        'u': ['u', 'ú']
    };
    
    for (let vocal in grupos) {
        let totalGrupo = 0;
        let detalles = [];
        
        grupos[vocal].forEach(v => {
            if (contador[v] > 0) {
                totalGrupo += contador[v];
                detalles.push(`${v.toUpperCase()}: ${contador[v]}`);
            }
        });
        
        if (totalGrupo > 0) {
            totalVocales += totalGrupo;
            resultadoHTML += `
                <div class="vocal-grupo">
                    <strong>${vocal.toUpperCase()}:</strong> ${totalGrupo} total
                    ${detalles.length > 1 ? ` (${detalles.join(', ')})` : ''}
                </div>
            `;
        }
    }
    
    resultadoHTML += `<div class="total-vocales"><strong>Total de vocales:</strong> ${totalVocales}</div>`;
    resultadoHTML += '</div>';
    
    resultado.innerHTML = resultadoHTML;
    resultado.className = 'resultado resultado-positivo';
}

// =============================================
// EJERCICIOS AJAX
// =============================================

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    // Ejercicio AJAX 1: Establecer la URL actual como valor por defecto
    document.getElementById('url-input').value = window.location.href;
    
    // Agregar event listeners para Enter en los inputs
    agregarEventListeners();
});

/**
 * Agrega event listeners para mejorar la UX
 */
function agregarEventListeners() {
    // Permitir Enter en los inputs de JavaScript
    document.getElementById('palindromo-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') verificarPalindromo();
    });
    
    document.getElementById('frase-vocales').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') encontrarVocales();
    });
    
    document.getElementById('frase-contar-vocales').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') contarVocales();
    });
    
    document.getElementById('url-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') realizarPeticionAJAX();
    });
}

/**
 * Ejercicio AJAX 2: Realizar petición AJAX y mostrar contenidos
 */
function realizarPeticionAJAX() {
    const url = document.getElementById('url-input').value.trim();
    
    if (!url) {
        alert('Por favor, ingresa una URL válida');
        return;
    }
    
    const xhr = new XMLHttpRequest();
    
    // Configurar la petición
    try {
        xhr.open('GET', url, true);
    } catch (e) {
        mostrarErrorAJAX('Error: URL no válida');
        return;
    }
    
    // Configurar timeout
    xhr.timeout = 10000; // 10 segundos
    
    // Manejar cambios de estado (Ejercicio AJAX 3)
    xhr.onreadystatechange = function() {
        actualizarEstadoPeticion(xhr.readyState);
        
        if (xhr.readyState === 4) { // Completada
            // Ejercicio AJAX 4: Mostrar cabeceras
            mostrarCabecerasRespuesta(xhr);
            
            // Ejercicio AJAX 5: Mostrar código de estado
            mostrarCodigoEstado(xhr);
            
            if (xhr.status >= 200 && xhr.status < 300) {
                // Éxito
                document.getElementById('contenido-respuesta').textContent = xhr.responseText;
            } else {
                // Error HTTP
                document.getElementById('contenido-respuesta').textContent = 
                    `Error ${xhr.status}: ${xhr.statusText}\n\n${xhr.responseText}`;
            }
        }
    };
    
    // Manejar errores de red
    xhr.onerror = function() {
        mostrarErrorAJAX('Error de red: No se pudo completar la petición');
    };
    
    // Manejar timeout
    xhr.ontimeout = function() {
        mostrarErrorAJAX('Error: Timeout - La petición tardó demasiado tiempo');
    };
    
    // Enviar la petición
    try {
        xhr.send();
    } catch (e) {
        mostrarErrorAJAX('Error al enviar la petición: ' + e.message);
    }
}

/**
 * Ejercicio AJAX 3: Actualizar el estado de la petición
 */
function actualizarEstadoPeticion(readyState) {
    const estados = {
        0: '🟡 No iniciada (UNSENT)',
        1: '🟠 Conexión establecida (OPENED) - Enviando petición...',
        2: '🔵 Petición recibida (HEADERS_RECEIVED) - Procesando...',
        3: '🟣 Procesando (LOADING) - Descargando respuesta...',
        4: '🟢 Completada (DONE) - Petición finalizada'
    };
    
    const estadoElement = document.getElementById('estado-peticion');
    estadoElement.textContent = estados[readyState] || '⚪ Estado desconocido';
    estadoElement.className = 'estado';
}

/**
 * Ejercicio AJAX 4: Mostrar cabeceras HTTP de la respuesta
 */
function mostrarCabecerasRespuesta(xhr) {
    const cabecerasContainer = document.getElementById('cabeceras-respuesta');
    
    try {
        const cabeceras = xhr.getAllResponseHeaders();
        
        if (cabeceras && cabeceras.trim() !== '') {
            const lineas = cabeceras.trim().split(/[\r\n]+/);
            let htmlCabeceras = '';
            
            lineas.forEach(linea => {
                const partes = linea.split(': ');
                const nombre = partes[0];
                const valor = partes.slice(1).join(': ');
                
                htmlCabeceras += `
                    <div class="cabecera-item">
                        <strong>${nombre}:</strong> ${valor}
                    </div>
                `;
            });
            
            cabecerasContainer.innerHTML = htmlCabeceras;
        } else {
            cabecerasContainer.innerHTML = '<div class="cabecera-item">No se recibieron cabeceras</div>';
        }
    } catch (e) {
        cabecerasContainer.innerHTML = `<div class="cabecera-item">Error al leer cabeceras: ${e.message}</div>`;
    }
}

/**
 * Ejercicio AJAX 5: Mostrar código y texto de estado
 */
function mostrarCodigoEstado(xhr) {
    const codigoContainer = document.getElementById('codigo-estado');
    
    if (xhr.status >= 200 && xhr.status < 300) {
        codigoContainer.innerHTML = `
            <span class="estado-exitoso">${xhr.status} - ${xhr.statusText} ✅</span>
        `;
    } else if (xhr.status >= 400) {
        codigoContainer.innerHTML = `
            <span class="estado-error">${xhr.status} - ${xhr.statusText} ❌</span>
        `;
    } else {
        codigoContainer.innerHTML = `
            <span>${xhr.status} - ${xhr.statusText}</span>
        `;
    }
}

/**
 * Función auxiliar para mostrar errores AJAX
 */
function mostrarErrorAJAX(mensaje) {
    document.getElementById('contenido-respuesta').textContent = mensaje;
    document.getElementById('codigo-estado').innerHTML = 
        '<span class="estado-error">Error ❌</span>';
}
