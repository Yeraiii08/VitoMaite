
//3
var resultado = [];
const emailUsuario = JSON.parse(sessionStorage.getItem("email")).email;

document.addEventListener("DOMContentLoaded", function () {
    
        sessionStorage.removeItem("resultadosBusqueda");
    
        const saludoUsuario = document.getElementById("saludoUsuario");
        const nombreUsuario = JSON.parse(sessionStorage.getItem("email")).nombre;

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
        
        var transaccion = bd.transaction(["meGusta"], "readonly");
        var almacen = transaccion.objectStore("meGusta");
        
        const solicitud = almacen.openCursor();
        
        var emailsMeGusta = [];
        var resultado = [];
        
        solicitud.onsuccess = function(evento){
            
            const cursor = evento.target.result;
            
            if (cursor) {
                const meGusta = cursor.value;
                
                if(meGusta.email2 === emailUsuario){
                    emailsMeGusta.push(meGusta.email1);
                }
                
                cursor.continue();
            }
            else{
                var transaccion2 = bd.transaction(["usuario"], "readonly");
                var almacen2 = transaccion2.objectStore("usuario");
        
                const solicitud2 = almacen2.openCursor();
        
                solicitud2.onsuccess = function(evento){
            
                    const cursor2 = evento.target.result;
            
                    if (cursor2) {
                        const usuario = cursor2.value;
                
                        for(i=0; i<emailsMeGusta.length; i++){
                            if(emailsMeGusta[i] === usuario.email){
                                resultado.push(usuario);
                            }
                        }
                
                        cursor2.continue();
                    }
                    else{
                        console.log(resultado);
                        
                        
                        const cantMeGustas = resultado.length;
                        if(cantMeGustas === 0){
                            alert("No hay me gustas");
                        }
                        else{
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
            }
        };
    };
}