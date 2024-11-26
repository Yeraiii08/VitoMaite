//2
const ciudadUsuario = JSON.parse(sessionStorage.getItem("email")).ciudad;
const nombreUsuario = JSON.parse(sessionStorage.getItem("email")).nombre;

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
    
    cargarUsuarios();
    
});

function cargarUsuarios(){
    var resultado = [];
    
    const solicitudBD = indexedDB.open("Base-De-Datos", 3);
    solicitudBD.onsuccess = function (event){
        const bd = event.target.result;
        
        var transaccion = bd.transaction(["usuario"], "readonly");
        var almacen = transaccion.objectStore("usuario");
        
        const solicitud = almacen.openCursor();
        
        solicitud.onsuccess = function(evento){
            const cursor = evento.target.result;
            
            if(cursor){
                
                const usuario = cursor.value;
                
                if(usuario.ciudad == ciudadUsuario && usuario.nombre!=nombreUsuario){
                    
                    resultado.push(usuario);
                }
                cursor.continue();
            } else {
                if(resultado.length < 1) {
                    alert("No hay candidatos en tu ciudad");
                } else {
                    for(i=0; i<12; i++){
        
                                console.log("iterador: " + i);
        
                                if(resultado[i] != null){
                                    console.log("entra en el if con i = " + i);
                                    
                                    
                                    
                                    var hijo = document.getElementById("hijo-" + (i+1));
    
                                    console.log("hijo de la i = " + i + ": " + hijo);
    
                                    hijo.style.visibility = "visible";
    
                                    var nombre = document.getElementById("hijo" + (i+1) + "-nombre");
                                    var sexo = document.getElementById("hijo" + (i+1) + "-sexo");
                                    var edad = document.getElementById("hijo" + (i+1) + "-edad");
                                    var ciudad = document.getElementById("hijo" + (i+1) + "-ciudad");
    
                                    console.log(resultado[i].nombre);
                                    console.log(nombre);
    
    
    
                                    nombre.innerHTML = "Nombre: " + resultado[i].nombre;
                                    sexo.innerHTML = "Sexo: " + resultado[i].genero;
                                    edad.innerHTML = "Edad: " + resultado[i].edad;
                                    ciudad.innerHTML = "Ciudad: " + resultado[i].ciudad;  
                                }
                            }
                }
            }
        };
    };
}
