document.addEventListener("DOMContentLoaded", function () {
    const verAficionesBtn = document.getElementById("verAficiones");
    const añadirAficionesBtn = document.getElementById("añadirAficiones");
    const eliminarAficionesBtn = document.getElementById("eliminarAficiones");
    const resultadoDiv = document.getElementById("resultado");

    // Iniciar IndexedDB
    const dbManager = new IndexedDBManager("Base-De-Datos", "aficiones");
    dbManager.init();

    function mostrarAficiones() {
        const aficiones = dbManager.getAllItems();
        resultadoDiv.innerHTML = "<h2>Mis Aficiones</h2>";
        if (aficiones.length === 0) {
            resultadoDiv.innerHTML += "<p>No tienes aficiones actualmente.</p>";
        } else {
            resultadoDiv.innerHTML += "<ul>";
            aficiones.forEach((aficion) => {
                resultadoDiv.innerHTML += `<li>${aficion.nombre}</li>`;
            });
            resultadoDiv.innerHTML += "</ul>";
        }
    }

    function añadirAficiones() {
        resultadoDiv.innerHTML = `
            <h2>Añadir Aficiones</h2>
            <form id="añadirForm">
                <input type="text" id="nuevaAficion" placeholder="Escribe una nueva afición" required>
                <button type="submit">Añadir</button>
            </form>
        `;
        const añadirForm = document.getElementById("añadirForm");
        añadirForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nuevaAficion = document.getElementById("nuevaAficion").value.trim();
            if (nuevaAficion) {
                dbManager.addItem({ nombre: nuevaAficion });
                alert("Afición añadida correctamente.");
                mostrarAficiones();
            } else {
                alert("El campo de afición no puede estar vacío.");
            }
        });
    }

    function eliminarAficiones() {
        const aficiones = dbManager.getAllItems();

        if (aficiones.length === 0) {
            resultadoDiv.innerHTML = "<p>No tienes aficiones para eliminar.</p>";
            return;
        }

        resultadoDiv.innerHTML = `
            <h2>Eliminar Aficiones</h2>
            <form id="eliminarForm">
                <div id="listaAficiones">
                    ${aficiones
                        .map(
                            (aficion) =>
                                `<label>
                                    <input type="checkbox" value="${aficion.id}"> ${aficion.nombre}
                                </label><br>`
                        )
                        .join("")}
                </div>
                <button type="submit">Eliminar Seleccionadas</button>
            </form>
        `;

        const eliminarForm = document.getElementById("eliminarForm");
        eliminarForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const checkboxes = document.querySelectorAll("#listaAficiones input[type='checkbox']:checked");
            if (checkboxes.length === 0) {
                alert("Por favor, selecciona al menos una afición para eliminar.");
                return;
            }

            const idsToDelete = Array.from(checkboxes).map((checkbox) => parseInt(checkbox.value));
            for (const id of idsToDelete) {
                dbManager.deleteItem(id);
            }

            alert("Aficiones eliminadas correctamente.");
            mostrarAficiones();
        });
    }

    verAficionesBtn.addEventListener("click", mostrarAficiones);
    añadirAficionesBtn.addEventListener("click", añadirAficiones);
    eliminarAficionesBtn.addEventListener("click", eliminarAficiones);
});