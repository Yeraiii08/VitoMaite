const btn = document.getElementById("boton-busquedaAficiones");

document.addEventListener("DOMContentLoaded", function () {
        const saludoUsuario = document.getElementById("saludoUsuario");
        const nombreUsuario = localStorage.getItem("nombreUsuario");

        if (nombreUsuario) {
            saludoUsuario.textContent = `Hola, ${nombreUsuario}`;
        } else {
            saludoUsuario.textContent = "";
        }
    });
    
btn.addEventListener("click", function(event){
    const checkboxes = document.getElementsByTagName("input");
   
    var aficionesSeleccionadas = [];
   
    for(let i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            aficionesSeleccionadas.push(checkboxes[i].value);
        }
    }
   
    console.log("aficiones seleccionadas:");
    console.log(aficionesSeleccionadas);
   
    const solicitudBD = indexedDB.open("Base-De-Datos", 2);
   
    var idAficionesSeleccionadas = [];
    
    var emailsUsuariosBuscados = [];
    
    var resultado = [];
    
   
    solicitudBD.onsuccess = function (event){
        const bd = event.target.result;
       
        const transaccion = bd.transaction(["aficion"], "readonly");
        const almacen = transaccion.objectStore("aficion");
       
        const solicitudCursor = almacen.openCursor();
       
        solicitudCursor.onsuccess = function (event){
            const cursor = event.target.result;
           
            if(cursor){
                const aficion = cursor.value;
                
                for(let i=0; i<aficionesSeleccionadas.length; i++){
                    if(aficionesSeleccionadas[i] === aficion.aficion){
                        
                        var idAficionEncontrada = false;
                        for(let i=0; i<idAficionesSeleccionadas.length; i++){
                            if(idAficionesSeleccionadas[i] === aficion.idAficion){
                                idAficionEncontrada = true;
                                break;
                            }
                        }
                        
                        if(!idAficionEncontrada){
                            idAficionesSeleccionadas.push(aficion.idAficion);
                        }
                    }
                }
                cursor.continue();
            }
            else{
                
                // Mirar a que email corresponde el id de la aficion y guardar los que coincidad
                const transaccion2 = bd.transaction(["usuarioAficion"], "readonly");
                const almacen2 = transaccion2.objectStore("usuarioAficion");
       
                const solicitudCursor2 = almacen2.openCursor();
       
                solicitudCursor2.onsuccess = function (event){
                    const cursor2 = event.target.result;
           
                    if(cursor2){
                        const usuarioAficion = cursor2.value;
                        
                        console.log("1");
                        
                        for(let i=0; i<idAficionesSeleccionadas.length; i++){
                            if(idAficionesSeleccionadas[i] === usuarioAficion.idAficion){
                        
                                var emailUsuarioEncontrado = false;
                                for(let i=0; i<emailsUsuariosBuscados.length; i++){
                                    if(emailsUsuariosBuscados[i] === usuarioAficion.email){
                                        emailUsuarioEncontrado = true;
                                        break;
                                    }
                                }
                        
                                if(!emailUsuarioEncontrado){
                                    emailsUsuariosBuscados.push(usuarioAficion.email);
                                }
                            }
                        }
                        
                        console.log("2");
                        
                        cursor2.continue();
                    }
                    else{
                        
                        // Mirar a que usuario corresponde el email de la aficion y guardar los que coincidad
                        const transaccion3 = bd.transaction(["usuario"], "readonly");
                        const almacen3 = transaccion3.objectStore("usuario");
       
                        const solicitudCursor3 = almacen3.openCursor();
                        
                        console.log("3");
       
                        solicitudCursor3.onsuccess = function (event){
                            const cursor3 = event.target.result;
           
                            if(cursor3){
                                const usuario = cursor3.value;
                        
                                for(let i=0; i<emailsUsuariosBuscados.length; i++){
                                    if(emailsUsuariosBuscados[i] === usuario.email){
                                        
                                        resultado.push(usuario);
                                        
                                    }
                                }
                                
                                console.log("4");
                        
                                cursor3.continue();
                            }
                            else{
                                console.log("5");
                                localStorage.setItem("resultadosBusqueda", JSON.stringify(resultado));
                                window.location.href = "resultadosBusquedaAficiones.html";
                            }
                        };
                    }
                };
            }
        };
    };
   
   
});