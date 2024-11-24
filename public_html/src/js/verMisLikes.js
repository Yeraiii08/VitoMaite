document.addEventListener("DOMContentLoaded", function () {
        const saludoUsuario = document.getElementById("saludoUsuario");
        const nombreUsuario = localStorage.getItem("nombreUsuario");

        if (nombreUsuario) {
            saludoUsuario.textContent = `Hola, ${nombreUsuario}`;
        } else {
            saludoUsuario.textContent = "";
        }
    });