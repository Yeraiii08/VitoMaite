var bd;

function IniciarBaseDatos(){
    var solicitud = indexedDB.open("Base-De-Datos", 2);
    
    solicitud.addEventListener("error", MostrarError);
    solicitud.addEventListener("success", Comenzar);
    solicitud.addEventListener("upgradeneeded", CrearAlmacen);
}

function MostrarError(evento){
    alert("Tenemos un ERROR: " +evento.code + " / " + evento.message);
}

function Comenzar(evento){
    bd = evento.target.result;
    console.log("Función Comenzar");
    
    if(!comprobarSiEstaVacia("usuario")){
        console.log("La tabla usuario esta vacia");
        
        var transaccion = bd.transaction(["usuario"], "readwrite");
        var almacen = transaccion.objectStore("usuario");
        
        almacen.add({
            password: "ana123",
            altura: 175,
            email: "ana@gmail.com",
            nombre: "Ana",
            ciudad: "Donosti",
            edad: 22,
            foto: "aaa",
            genero: "Mujer"
        });
        
        almacen.add({
            password: "maria123",
            altura: 170,
            email: "maria@gmail.com",
            nombre: "Maria",
            ciudad: "Bilbao",
            edad: 29,
            foto: "bbb",
            genero: "Mujer"
        });
        
        almacen.add({
            password: "miren123",
            altura: 179,
            email: "miren@gmail.com",
            nombre: "Miren",
            ciudad: "Vitoria-Gasteiz",
            edad: 36,
            foto: "ccc",
            genero: "Mujer"
        });
        
        almacen.add({
            password: "carmen123",
            altura: 164,
            email: "carmen@gmail.com",
            nombre: "Carmen",
            ciudad: "Donosti",
            edad: 41,
            foto: "ddd",
            genero: "Mujer"
        });
        
        almacen.add({
            password: "june123",
            altura: 172,
            email: "june@gmail.com",
            nombre: "June",
            ciudad: "Bilbao",
            edad: 19,
            foto: "eee",
            genero: "Mujer"
        });
        
        almacen.add({
            password: "naroa123",
            altura: 160,
            email: "naroa@gmail.com",
            nombre: "Naroa",
            ciudad: "Vitoria-Gasteiz",
            edad: 44,
            foto: "fff",
            genero: "Mujer"
        });
        
        almacen.add({
            password: "alex123",
            altura: 178,
            email: "alex@gmail.com",
            nombre: "Alex",
            ciudad: "Vitoria-Gasteiz",
            edad: 37,
            foto: "eee",
            genero: "Hombre"
        });
        
        almacen.add({
            password: "yerai123",
            altura: 182,
            email: "yerai@gmail.com",
            nombre: "Yerai",
            ciudad: "Bilbao",
            edad: 20,
            foto: "ggg",
            genero: "Hombre"
        });
        
        almacen.add({
            password: "mikel123",
            altura: 170,
            email: "mikel@gmail.com",
            nombre: "Mikel",
            ciudad: "Donosti",
            edad: 31,
            foto: "hhh",
            genero: "Hombre"
        });
        
        almacen.add({
            password: "asier123",
            altura: 169,
            email: "asier@gmail.com",
            nombre: "Asier",
            ciudad: "Vitoria-Gasteiz",
            edad: 26,
            foto: "ggg",
            genero: "Hombre"
        });
        
        almacen.add({
            password: "iker123",
            altura: 171,
            email: "iker@gmail.com",
            nombre: "Iker",
            ciudad: "Bilbao",
            edad: 41,
            foto: "jjj",
            genero: "Hombre"
        });
        
        almacen.add({
            password: "jon123",
            altura: 190,
            email: "jon@gmail.com",
            nombre: "jon",
            ciudad: "Donosti",
            edad: 24,
            foto: "kkk",
            genero: "Hombre"
        });    
    }
    
    if(!comprobarSiEstaVacia("aficion")){
        console.log("La tabla aficion esta vacia");
        
        var transaccion = bd.transaction(["aficion"], "readwrite");
        var almacen = transaccion.objectStore("aficion");
        
        almacen.add({
            idAficion: 1,
            aficion: "Leer"
        });
        
        almacen.add({
            idAficion: 2,
            aficion: "Cocinar"
        });
        
        almacen.add({
            idAficion: 3,
            aficion: "Pintar"
        });
        
        almacen.add({
            idAficion: 4,
            aficion: "Deporte"
        });
        
        almacen.add({
            idAficion: 5,
            aficion: "Jardinería"
        });
        
        almacen.add({
            idAficion: 6,
            aficion: "Escribir"
        });
        
        almacen.add({
            idAficion: 7,
            aficion: "Viajar"
        });
        
        almacen.add({
            idAficion: 8,
            aficion: "Ver películas"
        });
        
        almacen.add({
            idAficion: 9,
            aficion: "Bailar"
        });
        
        almacen.add({
            idAficion: 10,
            aficion: "Pescar"
        });
        
        almacen.add({
            idAficion: 11,
            aficion: "Esuchar música"
        });
        
        almacen.add({
            idAficion: 12,
            aficion: "Tocar un instrumento"
        });
        
    }
    
    if(!comprobarSiEstaVacia("usuarioAficion")){
        console.log("La tabla usuarioAficion esta vacia");
        
        var transaccion = bd.transaction(["usuarioAficion"], "readwrite");
        var almacen = transaccion.objectStore("usuarioAficion");
        
        almacen.add({
            email: "alex@gmail.com",
            idAficion: 1
        });
        
        almacen.add({
            email: "alex@gmail.com",
            idAficion: 11
        });
        
        almacen.add({
            email: "alex@gmail.com",
            idAficion: 4
        });
        
        almacen.add({
            email: "ana@gmail.com",
            idAficion: 4
        });
        
        almacen.add({
            email: "ana@gmail.com",
            idAficion: 8
        });
        
        almacen.add({
            email: "yerai@gmail.com",
            idAficion: 1
        });
        
        almacen.add({
            email: "yerai@gmail.com",
            idAficion: 9
        });
        
        almacen.add({
            email: "yerai@gmail.com",
            idAficion: 10
        });
        
        almacen.add({
            email: "naroa@gmail.com",
            idAficion: 11
        });
        
        almacen.add({
            email: "naroa@gmail.com",
            idAficion: 1
        });
        
        almacen.add({
            email: "naroa@gmail.com",
            idAficion: 5
        });
        
        almacen.add({
            email: "mikel@gmail.com",
            idAficion: 6
        });
        
        almacen.add({
            email: "mikel@gmail.com",
            idAficion: 7
        });
        
        almacen.add({
            email: "mikel@gmail.com",
            idAficion: 8
        });
        
        almacen.add({
            email: "iker@gmail.com",
            idAficion: 9
        });
        
        almacen.add({
            email: "iker@gmail.com",
            idAficion: 11
        });
        
        almacen.add({
            email: "iker@gmail.com",
            idAficion: 2
        });
        
        almacen.add({
            email: "maria@gmail.com",
            idAficion: 3
        });
        
        almacen.add({
            email: "maria@gmail.com",
            idAficion: 4
        });
        
        almacen.add({
            email: "maria@gmail.com",
            idAficion: 5
        });
        
        almacen.add({
            email: "miren@gmail.com",
            idAficion: 10
        });
        
        almacen.add({
            email: "miren@gmail.com",
            idAficion: 2
        });
        
        almacen.add({
            email: "miren@gmail.com",
            idAficion: 7
        });
        
        almacen.add({
            email: "jon@gmail.com",
            idAficion: 1
        });
        
        almacen.add({
            email: "jon@gmail.com",
            idAficion: 3
        });
        
        almacen.add({
            email: "jon@gmail.com",
            idAficion: 5
        });
        
        almacen.add({
            email: "jon@gmail.com",
            idAficion: 7
        });
        
        almacen.add({
            email: "june@gmail.com",
            idAficion: 7
        });
        
        almacen.add({
            email: "june@gmail.com",
            idAficion: 4
        });
        
        almacen.add({
            email: "june@gmail.com",
            idAficion: 9
        });
    }
    
    if(!comprobarSiEstaVacia("meGusta")){
        console.log("La tabla meGusta esta vacia");
        
        var transaccion = bd.transaction(["meGusta"], "readwrite");
        var almacen = transaccion.objectStore("meGusta");
        
        almacen.add({
            email1: "alex@gmail.com",
            email2: "june@gmail.com"
        });
        
        almacen.add({
            email1: "june@gmail.com",
            email2: "alex@gmail.com"
        });
        
        almacen.add({
            email1: "alex@gmail.com",
            email2: "jon@gmail.com"
        });
        
        almacen.add({
            email1: "jon@gmail.com",
            email2: "alex@gmail.com"
        });
        
        almacen.add({
            email1: "jon@gmail.com",
            email2: "june@gmail.com"
        });
        
        almacen.add({
            email1: "june@gmail.com",
            email2: "jon@gmail.com"
        });
        
        almacen.add({
            email1: "maria@gmail.com",
            email2: "ana@gmail.com"
        });
        
        almacen.add({
            email1: "maria@gmail.com",
            email2: "alex@gmail.com"
        });
        
        almacen.add({
            email1: "iker@gmail.com",
            email2: "maria@gmail.com"
        });
        
        almacen.add({
            email1: "yerai@gmail.com",
            email2: "carmen@gmail.com"
        });
        
        almacen.add({
            email1: "naroa@gmail.com",
            email2: "jon@gmail.com"
        });
        
        almacen.add({
            email1: "mikel@gmail.com",
            email2: "naroa@gmail.com"
        });
        
    }
}

function CrearAlmacen(evento){
    var baseDatos = evento.target.result;
    
    if (!baseDatos.objectStoreNames.contains("usuario")) {
        const usuarioStore = baseDatos.createObjectStore("usuario", { keyPath: "email" });
        usuarioStore.createIndex("email", "email", { unique: true });
        usuarioStore.createIndex("password", "password", { unique: false });
        usuarioStore.createIndex("nombre", "nombre", { unique: false });
        usuarioStore.createIndex("ciudad", "ciudad", { unique: false });
        usuarioStore.createIndex("edad", "edad", { unique: false });
        usuarioStore.createIndex("genero", "genero", { unique: false });
        usuarioStore.createIndex("altura", "altura", { unique: false });
        usuarioStore.createIndex("foto", "foto", { unique: false });
    }
    
    if (!baseDatos.objectStoreNames.contains("aficion")) {
        const aficionStore = baseDatos.createObjectStore("aficion", { keyPath: "idAficion" });
        aficionStore.createIndex("idAficion", "idAficion", { unique: true });
        aficionStore.createIndex("aficion", "aficion", { unique: false });
    }
    
    if (!baseDatos.objectStoreNames.contains("usuarioAficion")) {
        const aficionUsuarioStore = baseDatos.createObjectStore("usuarioAficion", { keyPath: ["email", "idAficion" ]});
        aficionUsuarioStore.createIndex("email", "email", { unique: false });
        aficionUsuarioStore.createIndex("idAficion", "idAficion", { unique: false });
    }
    
    if (!baseDatos.objectStoreNames.contains("meGusta")) {
        const meGustaStore = baseDatos.createObjectStore("meGusta", { keyPath: ["email1", "email2" ]});
        meGustaStore.createIndex("email1", "email1", { unique: false });
        meGustaStore.createIndex("email2", "email2", { unique: false });
    }
    
}

function comprobarSiEstaVacia(nombreTabla) {
    
    const transaccion = bd.transaction(nombreTabla, "readonly");
    const store = transaccion.objectStore(nombreTabla);
    
    
    const solicitud = store.openCursor();
    
    solicitud.onsuccess = function(evento) {
        const cursor = evento.target.result;
        
        if (cursor) {
            
            return true;
        } else {
            
            return false;
        }
    };
    
    solicitud.onerror = function(evento) {
        console.error("Error al comprobar si la tabla está vacía: ", evento.target.error);
    };
}

function EliminarBaseDeDatos() {
    var solicitud = indexedDB.deleteDatabase("Base-De-Datos");

    solicitud.onsuccess = function(evento) {
        console.log("Base de datos eliminada exitosamente.");
        alert("Base de datos eliminada correctamente.");
    };

    solicitud.onerror = function(evento) {
        console.error("Error al eliminar la base de datos: ", evento.target.error);
        alert("Error al eliminar la base de datos.");
    };

    solicitud.onblocked = function(evento) {
        console.warn("La base de datos está bloqueada, no se puede eliminar.");
        alert("La base de datos está bloqueada y no se puede eliminar.");
    };
}

window.addEventListener("load", IniciarBaseDatos);

