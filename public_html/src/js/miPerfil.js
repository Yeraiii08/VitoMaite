document.addEventListener("DOMContentLoaded", function () {
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
        
        cargarDatos();
});

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const altura = document.getElementById("altura");
const ciudad = document.getElementById("ciudad");
const edad = document.getElementById("edad");
const genero = document.getElementById("genero");


function cargarDatos() {
    const solicitudBD = indexedDB.open("Base-De-Datos", 3);
    solicitudBD.onsuccess = function (event){
        const datosUsuarios = JSON.parse(sessionStorage.getItem("email"));
        
        nombre.innerHTML = datosUsuarios.nombre;
        email.innerHTML = datosUsuarios.email;
        altura.innerHTML = datosUsuarios.altura;
        ciudad.innerHTML = datosUsuarios.ciudad;
        edad.innerHTML = datosUsuarios.edad;
        genero.innerHTML = datosUsuarios.genero;
    };
}