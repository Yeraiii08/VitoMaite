//2


const boton = document.getElementById("boton-busquedaLogueado");

console.log(boton);

document.addEventListener("DOMContentLoaded", function () {
    
        sessionStorage.removeItem("resultadosBusqueda");
    
        const saludoUsuario = document.getElementById("saludoUsuario");
        
        const nombreUsuario = sessionStorage.getItem("nombreUsuario");

        if (nombreUsuario) {
            saludoUsuario.textContent = `Hola, ${nombreUsuario}`;
        } else {
            saludoUsuario.textContent = "";
        }
    });

boton.addEventListener("click", function(event){
    const sexo = document.getElementById("sexo").value;
    const edadMin = document.getElementById("edad-min").value;
    const edadMax = document.getElementById("edad-max").value;
    const ciudad = document.getElementById("ciudad").value;
    
    console.log(sexo);
    console.log(edadMin);
    console.log(edadMax);
    console.log(ciudad);
    
    if(sexo === "" || edadMin === "" || edadMax === "" || ciudad === ""){
        alert("algunos campos estan si rellenar");
    }
    else{
        
        const solicitudBD = indexedDB.open("Base-De-Datos", 2);
        
        var resultado = [];
        
        solicitudBD.onsuccess = function (event){
            const bd = event.target.result;
           
            const transaccion = bd.transaction(["usuario"], "readonly");
            const almacen = transaccion.objectStore("usuario");
        
            const solicitud = almacen.openCursor();
        
            solicitud.onsuccess = function (event){
                const cursor = event.target.result;
            
                if(cursor){
                    
                    console.log("usuraio:");
                    
                    
                    const usuario = cursor.value;
                    
                    console.log(usuario);
                
                    var seCumpleSexo = false;
                    var seCumpleEdad = false;
                    var seCumpleCiudad = false;
                
                    //comprobacion del sexo
                    if(sexo === "Ambos"){
                        seCumpleSexo = true;
                    }
                    else if(sexo === usuario.genero){
                        seCumpleSexo = true;
                    }
                
                    //comprobacion de la edad
                    if(usuario.edad >= edadMin && usuario.edad <= edadMax){
                        seCumpleEdad = true;
                    }
                
                    //comprobacion de la ciudad
                    if(ciudad === usuario.ciudad){
                        seCumpleCiudad = true;
                    }
                
                    //Comprobacion de que coincidan todos los parametros de busqueda
                    if(seCumpleCiudad && seCumpleEdad && seCumpleSexo){
                        console.log("Entro en el if. Deberia hacer puesh a resultado")
                        resultado.push(usuario);
                        console.log(resultado);
                    }
                    
                    console.log("resultado de la busqueda en bd:");
                    console.log(resultado);
                    
                    cursor.continue();
                }else{
                    console.log(resultado);
                    sessionStorage.setItem("resultadosBusqueda", JSON.stringify(resultado));
                    window.location.href = "resultadosBusquedaLogueado.html";
                }
            
                
            };
        };
    }
});