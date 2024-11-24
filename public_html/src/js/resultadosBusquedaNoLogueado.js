/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const btnNuevaBusqueda = document.getElementById("btn-cambioBusqueda");
const btnNuevaPagina = document.getElementById("btn-siguientePagina");

btnNuevaBusqueda.addEventListener("click", function(event){
   window.location.href = "BusquedaNoLogueado.html"; 
});

btnNuevaPagina.addEventListener("click", function(event){
   window.location.href = "resultadosBusquedaNoLogueado.html"; 
});