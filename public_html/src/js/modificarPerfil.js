document.addEventListener("DOMContentLoaded", function(){
    var imagenInput = document.getElementById("imagen");
    var dropArea = document.getElementById("dropArea");
    var preview = document.getElementById("preview");
    var ciudadInput = document.getElementById("ciudad");
    var boton = document.getElementById("button");
    
    //Inicializar indexedDB
    const solicitudBD = indexedDB.open("Base-De-Datos", 3);
    
    const datosUsuario = JSON.parse(sessionStorage.getItem("email"));
    
    imagenInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Obtiene el archivo seleccionado

        if (file) {
            // Crear una URL para previsualizar la imagen
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result; // Establece la URL como fuente de la imagen
                preview.style.display = 'block'; // Muestra la imagen de previsualización
            };

            reader.readAsDataURL(file); // Lee el archivo como una URL de datos
        }
    });
    
    //manejo de drag and drop
    dropArea.addEventListener("drop", (e) =>{
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        if(file){
            cargarImagen(file);
        }
    });
    
    imagenInput.addEventListener("change", (e) => {
       var file = e.target.files[0];
       if(file){
           cargarImagen(file);
       }
    });
    
    function cargarImagen(file){
        var reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
    
    //Validación de formulario
    boton.addEventListener("click", function (e) {
        var ciudad = ciudadInput.value;
        if(!preview.src || ciudad === "") {
            alert("Por favor, rellena todos los datos");
        }
       
        var perfilActualizado = {
            id:1,
            imagen: preview.src,
            ciudad: ciudad
        };
       
        const solicitudBD = indexedDB.open("Base-De-Datos", 2);
        solicitudBD.onsuccess = function(event) {
            
            console.log("Hola0");
            
            const db = event.target.result;
            const transaccion = db.transaction(["usuario"], "readwrite");
            const almacen = transaccion.objectStore("usuario");

            // Usar el email guardado en sessionStorage para buscar el usuario
            const solicitud = almacen.get(datosUsuario.email);
            
            solicitud.onsuccess = function(event) {
                
                console.log("Hola1");
                
                const usuario = event.target.result;
                if (usuario) {
                    
                    console.log("Hola2");
                    
                    // Modificar los datos del usuario
                    usuario.ciudad = perfilActualizado.ciudad;
                    usuario.foto = perfilActualizado.imagen;

                    // Actualizar el registro
                    const actualizar = almacen.put(usuario);
                    actualizar.onsuccess = function() {
                        alert("Perfil actualizado con éxito.");
                    };
                    actualizar.onerror = function() {
                        alert("Hubo un error al actualizar el perfil.");
                    };
                    
                    window.location.href = "miPerfil.html";
                } else {
                    alert("No se encontró el usuario.");
                }
            };
            
            solicitud.onerror = function() {
                alert("Error al recuperar los datos del usuario.");
            };
        };

        solicitudBD.onerror = function() {
            alert("Error al abrir la base de datos.");
        };
    });
});