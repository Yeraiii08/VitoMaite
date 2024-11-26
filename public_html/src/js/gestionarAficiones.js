document.addEventListener("DOMContentLoaded", function () {
    
        sessionStorage.removeItem("resultadosBusqueda");
    
        const saludoUsuario = document.getElementById("saludoUsuario");
        const imagenPerfil = document.getElementById("imagen-perfil");
        
        const nombreUsuario = JSON.parse(sessionStorage.getItem("email")).nombre;
        const fotoUsuario = JSON.parse(sessionStorage.getItem("email")).foto;

        if (nombreUsuario) {
            saludoUsuario.textContent = `Hola, ${nombreUsuario}`;
            imagenPerfil.src = fotoUsuario;
        } else {
            saludoUsuario.textContent = "";
        }
    });

const output = document.getElementById("output");

const verAficiones = document.getElementById("btn-verAficiones");

const datosUsuario = JSON.parse(sessionStorage.getItem("email"));

const solicitudBD = indexedDB.open("Base-De-Datos", 3);
        
        var idResultado = [];
        
        var tieneAficiones = [];
        var noTieneAficiones = [];
        
        solicitudBD.onsuccess = function (event){
            const bd = event.target.result;
           
            const transaccion = bd.transaction(["usuarioAficion"], "readonly");
            const almacen = transaccion.objectStore("usuarioAficion");
        
            const solicitud = almacen.openCursor();
        
            solicitud.onsuccess = function (event){
                const cursor = event.target.result;
            
                if(cursor){
                    
                    const usuarioAficion = cursor.value;
                
                    if(datosUsuario.email === usuarioAficion.email){
                        idResultado.push(usuarioAficion.idAficion);
                    }
                    
                    cursor.continue();
                }else{
                    const transaccion2 = bd.transaction(["aficion"], "readonly");
                    const almacen2 = transaccion2.objectStore("aficion");
        
                    const solicitud2 = almacen2.openCursor();
        
                    solicitud2.onsuccess = function (event){
                        const cursor2 = event.target.result;
            
                        if(cursor2){
                    
                            const aficion = cursor2.value;
                
                            for(let i=0; i<idResultado.length; i++){
                                if(idResultado[i] === aficion.idAficion){
                                    tieneAficiones.push(aficion.aficion);
                                }
                                else{
                                    var encontrado = false;
                                    for(let j=0; j<noTieneAficiones.length; j++){
                                        if(noTieneAficiones[j] === aficion.aficion){
                                            encontrado = true;
                                        }
                                    }
                                    if(!encontrado){
                                        var encontrado2 = false;
                                        for(let j=0; j<tieneAficiones.length; j++){
                                            if(tieneAficiones[j] === aficion.aficion){
                                                encontrado2 = true;
                                            }
                                        }
                                        
                                        if(!encontrado2){
                                            noTieneAficiones.push(aficion.aficion);
                                        }
                                    }
                                    
                                }
                            }
                    
                            cursor2.continue();
                        }else{
                            console.log(tieneAficiones);
                            console.log(noTieneAficiones);
                        }
                    };
                }
            
                
            };
        };
        
verAficiones.addEventListener("click", () => {
    output.innerHTML = `<h2>Tus Aficiones</h2>`;
    
    tieneAficiones.forEach((aficion) => {
        output.innerHTML += `<p>${aficion}</p>`;
    });
});

const anadirAficiones = document.getElementById("btn-anadirAficiones");
        
anadirAficiones.addEventListener("click", () => {
    output.innerHTML = `<h2>Añadir Aficiones</h2>`;
    noTieneAficiones.forEach((aficion) => {
            output.innerHTML += `
            <label>
            <input type="checkbox" class="add-checkbox" value="${aficion}">
            ${aficion}
            </label><br>`;
    });
    output.innerHTML += `<button id="confirm-add">Confirmar</button>`;
    
    document.getElementById("confirm-add").addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".add-checkbox:checked");
        checkboxes.forEach((checkbox) => {
            tieneAficiones.push(checkbox.value);
            noTieneAficiones = noTieneAficiones.filter(
                (af) => af !== checkbox.value
            );
        });
            alert("Aficiones añadidas exitosamente");
            output.innerHTML = "";
    });
});

const eliminarAficiones = document.getElementById("btn-eliminarAficiones");

eliminarAficiones.addEventListener("click", () => {
    output.innerHTML = `<h2>Eliminar Aficiones</h2>`;
    tieneAficiones.forEach((aficion) => {
        output.innerHTML += `
        <label>
        <input type="checkbox" class="delete-checkbox" value="${aficion}">
        ${aficion}
        </label><br>`;
    });
    output.innerHTML += `<button id="confirm-delete">Confirmar</button>`;

    document.getElementById("confirm-delete").addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".delete-checkbox:checked");
        checkboxes.forEach((checkbox) => {
            noTieneAficiones.push(checkbox.value);
            tieneAficiones = tieneAficiones.filter(
                (af) => af !== checkbox.value
            );
        });
        alert("Aficiones eliminadas exitosamente");
        output.innerHTML = "";
    });
});
