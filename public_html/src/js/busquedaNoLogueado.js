/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const btn = document.getElementById("boton-busquedaNoLogueado");

btn.addEventListener("click", function(event){
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
        window.location.href = "resultadosBusquedaNoLogueado.html";
    }
});