var resultado = [];
const emailUsuario = localStorage.getItem("emailUsuario");

document.addEventListener("DOMContentLoaded", function () {
        const saludoUsuario = document.getElementById("saludoUsuario");
        const nombreUsuario = localStorage.getItem("nombreUsuario");
        
        alert(emailUsuario);

        if (nombreUsuario) {
            saludoUsuario.textContent = `Hola, ${nombreUsuario}`;
        } else {
            saludoUsuario.textContent = "";
        }
        
        cargarLikes();
        
        mostrarEnPantalla();
});

function cargarLikes(){
    
    const solicitudBD = indexedDB.open("Base-De-Datos", 2);
    solicitudBD.onsuccess = function (event){
        const bd = event.target.result;
        
        var transaccion = bd.transaction("meGusta", "readonly");
        var almacen = transaccion.objectStore("meGusta");
        var solicitud = almacen.index("email2").openCursor(IDBKeyRange.only(emailUsuario));
        
        
        solicitud.onsuccess = function(evento){
            
            const cursor = evento.target.result;
            
            if (cursor) {
                resultado.push(cursor.value.email1.toString());
                cursor.continue();
            }
        };
    
    };
}

function mostrarEnPantalla(){
    
    const solicitudBD = indexedDB.open("Base-De-Datos", 2);
    
    solicitudBD.onsuccess = function (event){
        const bd = event.target.result;
        
        var transaccion = bd.transaction("usuario", "readonly");
        var almacen = transaccion.objectStore("usuario");
        const indiceUsuario = almacen.index("email");
        
        for(i = 0; i<=resultado.length; i++){
            
            console.log(resultado);
            console.log(resultado[i]);
        }
    };
}

function crearResultado(numero, usuario){
    var hijo = document.getElementById("hijo-" + (numero+1));
    
    console.log("hijo de la i = " + numero + ": " + hijo);
    
    hijo.style.visibility = "visible";
    
    var nombre = document.getElementById("hijo" + (numero+1) + "-nombre");
    var sexo = document.getElementById("hijo" + (numero+1) + "-sexo");
    var edad = document.getElementById("hijo" + (numero+1) + "-edad");
    var ciudad = document.getElementById("hijo" + (numero+1) + "-ciudad");
    
    console.log(resultBusqueda[numero].nombre);
    console.log(nombre);
    
    
    
    nombre.innerHTML = "Nombre: " + usuario[numero].nombre;
    sexo.innerHTML = "Sexo: " + usuario[numero].genero;
    edad.innerHTML = "Edad: " + usuario[numero].edad;
    ciudad.innerHTML = "Ciudad: " + usuario[numero].ciudad;
}
