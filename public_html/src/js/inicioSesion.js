/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const boton = document.getElementById("boton-inicioSesion");
boton.addEventListener("click", function(event){
    const usuario = document.getElementById("nombre").value;
    const password = document.getElementById("contraseña").value;
    
    console.log("usurio: " + usuario + ". Contraseña: " + password);
    
    if(usuario === "" || password === ""){
        console.log("faltan datos");
    }
    else{
        console.log("datos introducidos");
        verificarValoresIntroducidos(usuario, password);
    }
    
});

function verificarValoresIntroducidos(usuario, password){
    const solicitudBD = indexedDB.open("Base-De-Datos", 2);
    
    solicitudBD.onsuccess = function (event){
        const bd = event.target.result;
        const transaccion = bd.transaction(["usuario"], "readonly");
        const almacen = transaccion.objectStore("usuario");
        const indiceNombre = almacen.index("nombre");
        
        const solicitudNombre = indiceNombre.get(usuario);
        
        solicitudNombre.onsuccess = function(event){
            const usuarioIntroducido = event.target.result;
            
            if(usuarioIntroducido == null){
                alert("El usuario introducido no existe");
            }
            else{
                const passwordUsuario = usuarioIntroducido.password;
                if(passwordUsuario === password){
                    console.log("Inicio de sesion correcto");
                    window.location.href = "BusquedaLogueado.html";
                }
                else{
                    alert("Usuario o contraseña incorrectos");
                }
            }
            
        };
    };
}
