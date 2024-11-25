/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const btnNuevaBusqueda = document.getElementById("btn-cambioBusqueda");
const btnNuevaPagina = document.getElementById("btn-siguientePagina");

const perfiles = document.getElementsByClassName("content-resultNoLogueado--hijo");
const cantPerfiles = perfiles.length;

for(i=0; i<cantPerfiles; i++){
    perfiles[i].addEventListener("click", function(event){
        alert("Registrate para ver mas informacion de los perfiles");
    });
}

btnNuevaBusqueda.addEventListener("click", function(event){
   window.location.href = "BusquedaNoLogueado.html"; 
});

btnNuevaPagina.addEventListener("click", function(event){
   alert("Registrate para ver mas perfiles");
});

const resultBusqueda = JSON.parse(localStorage.getItem("resultadosBusqueda"));

console.log("resultado de la busqueda: " + resultBusqueda);

const longitudBusqueda = resultBusqueda.length;

console.log("longitud de la busqueda: " + longitudBusqueda);

if(longitudBusqueda === 0){
    alert("No se han encontrado personas con esas caracteristicas");
}
else{
    
    for(i=0; i<12; i++){
        
        console.log("iterador: " + i);
        
        if(resultBusqueda[i] != null){
            console.log("entra en el if con i = " + i)
            crearResultado(i);
        }
    }
}

function crearResultado(numero){
    var hijo = document.getElementById("hijo-" + (numero+1));
    
    console.log("hijo de la i = " + numero + ": " + hijo);
    
    hijo.style.visibility = "visible";
    
    var nombre = document.getElementById("hijo" + (numero+1) + "-nombre");
    var sexo = document.getElementById("hijo" + (numero+1) + "-sexo");
    var edad = document.getElementById("hijo" + (numero+1) + "-edad");
    var ciudad = document.getElementById("hijo" + (numero+1) + "-ciudad");
    
    console.log(resultBusqueda[numero].nombre);
    console.log(nombre);
    
    
    
    nombre.innerHTML = "Nombre: " + resultBusqueda[numero].nombre;
    sexo.innerHTML = "Sexo: " + resultBusqueda[numero].genero;
    edad.innerHTML = "Edad: " + resultBusqueda[numero].edad;
    ciudad.innerHTML = "Ciudad: " + resultBusqueda[numero].ciudad;
}

