document.addEventListener("DOMContentLoaded", function () {
    sessionStorage.clear();
});

const boton = document.getElementById("boton-inicioSesion");
boton.addEventListener("click", function(event){
    const usuario = document.getElementById("correo").value;
    const password = document.getElementById("contraseña").value;
    
    console.log("correo: " + usuario + ". Contraseña: " + password);
    
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
        const indiceCorreo = almacen.index("email");
        
        const solicitudCorreo = indiceCorreo.get(usuario);
        
        solicitudCorreo.onsuccess = function(event){
            const usuarioIntroducido = event.target.result;
            
            if(usuarioIntroducido == null){
                alert("El usuario introducido no existe");
            }
            else{
                const passwordUsuario = usuarioIntroducido.password;
                if(passwordUsuario === password){
                    console.log("Inicio de sesion correcto");
                    
                    const password = usuarioIntroducido.password;
                    const altura = usuarioIntroducido.altura;
                    const email = usuarioIntroducido.email;
                    const nombre = usuarioIntroducido.nombre;
                    const ciudad = usuarioIntroducido.ciudad;
                    const edad = usuarioIntroducido.edad;
                    const foto = usuarioIntroducido.foto;
                    const genero = usuarioIntroducido.genero;
                    
                    
                    const datos = {
                        password: password,
                        altura: altura,
                        email: email,
                        nombre: nombre,
                        ciudad: ciudad,
                        edad: edad,
                        foto: foto,
                        genero: genero
                    };
                    
                    sessionStorage.setItem(email, datos);
                    
                    window.location.href = "BusquedaLogueado.html";
                }
                else{
                    alert("Usuario o contraseña incorrectos");
                }
            }
            
        };
    };
}
