document.getElementById('searchButton').addEventListener('click', function() {
    const interest = document.getElementById('interestInput').value;
    const token = document.getElementById('apiTokenInput').value;

    if (!interest || !token) {
        alert('Por favor, completa ambos campos.');
        return;
    }

    // Mostrar el spinner y limpiar la tabla de resultados mientras se carga la búsqueda
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('resultsTableBody').innerHTML = ''; // Limpiar la tabla de resultados

    // URL de búsqueda de intereses
    const apiUrl = `https://graph.facebook.com/search?type=adinterest&q=["${interest}"]&limit=200&locale=es_ES&access_token=${token}`;

    // Hacer la solicitud de búsqueda de intereses
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            mostrarData(data);
            // Ocultar el spinner cuando se complete la carga
            document.getElementById('loadingSpinner').style.display = 'none';
        })
        .catch(error => {
            console.error('Error al hacer la solicitud:', error);
            alert('Hubo un problema al hacer la solicitud. Revisa el token de API e inténtalo de nuevo.');
            document.getElementById('loadingSpinner').style.display = 'none';
        });
});

// Función para mostrar los datos en la tabla
const mostrarData = (data) => {
    const tableBody = document.getElementById('resultsTableBody');
    tableBody.innerHTML = '';

    if (data.data && data.data.length > 0) {
        data.data.forEach((item, index) => {
            const row = `<tr>
                <td>${index + 1}</td>
                <td>${item.name || 'N/A'}</td>
                <td>${item.topic || 'N/A'}</td>
                <td>${item.audience_size_lower_bound || 'N/A'}</td>
                <td>${item.audience_size_upper_bound || 'N/A'}</td>
                <td>${item.path ? item.path.join(' > ') : 'N/A'}</td>
                <td>${item.description || 'N/A'}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } else {
        const row = `<tr><td colspan="7" class="text-center">No se encontraron resultados</td></tr>`;
        tableBody.innerHTML += row;
    }
};