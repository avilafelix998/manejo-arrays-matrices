document.getElementById('iniciar').addEventListener('click', function() {
    const numPersonas = parseInt(document.getElementById('numPersonas').value);
    
    if (isNaN(numPersonas) || numPersonas <= 0) {
        alert('Por favor ingrese un número válido de personas.');
        return;
    }

    // Muestra el formulario para ingresar datos
    document.getElementById('formulario').style.display = 'block';

    let personas = [];
    let count = 0;

    document.getElementById('guardar').addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const nota = document.getElementById('nota').value;

        // Validar que los campos no estén vacíos
        if (!nombre || !edad || !nota) {
            alert('Por favor complete todos los campos.');
            return;
        }

        // Guardar la persona en la lista
        personas.push([nombre, parseInt(edad), parseFloat(nota)]);
        count++;

        // Limpiar los campos para el siguiente ingreso
        document.getElementById('nombre').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('nota').value = '';

        // Verificar si ya se ingresaron todas las personas
        if (count >= numPersonas) {
            mostrarResultados(personas);
        }
    });

    function mostrarResultados(personas) {
        // Mostrar los resultados originales
        let resultadoOriginal = '<h3>Listado Original</h3><ul>';
        personas.forEach(persona => {
            resultadoOriginal += `<li>${persona[0]} - Edad: ${persona[1]}, Nota: ${persona[2]}</li>`;
        });
        resultadoOriginal += '</ul>';
        document.getElementById('resultadosOriginales').innerHTML = resultadoOriginal;

        // Ordenar las personas por nota (de mayor a menor)
        const personasOrdenadas = personas.sort((a, b) => b[2] - a[2]);

        // Mostrar el listado ordenado por nota
        let resultadoOrdenado = '<h3>Listado Ordenado por Nota (Mayor a Menor)</h3><ul>';
        personasOrdenadas.forEach(persona => {
            resultadoOrdenado += `<li>${persona[0]} - Edad: ${persona[1]}, Nota: ${persona[2]}</li>`;
        });
        resultadoOrdenado += '</ul>';
        document.getElementById('resultadosOrdenados').innerHTML = resultadoOrdenado;

        // Ocultar el formulario
        document.getElementById('formulario').style.display = 'none';
    }
});
