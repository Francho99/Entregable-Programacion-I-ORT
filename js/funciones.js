/* Nombres y numeros de estudiantes: -Esteban Blanco-241504 -Franco Choca-342991 */
let miSistema = new Sistema();

window.addEventListener("load", inicio);

function inicio(){
    document.getElementById("idAgregarTema").addEventListener("click", agregarTema);
    document.getElementById("idAgregarPregunta").addEventListener("click", agregarPregunta);
    document.getElementById("idAyuda").addEventListener("click", ayuda);
    document.getElementById("idJugar").addEventListener("click", aJugar);
    document.getElementById("idterminar").addEventListener("click", terminarJuego);
    //Declaramos radioButton y le asignamos 
    let radioButton = document.getElementsByName("ordenar");
    radioButton.forEach(function(radioButton){
        radioButton.addEventListener("change", radioButtonChangeHandler);
    })
    seleccion();
    consultarDatosPrueba();
    actualizarSelectorjugar();
}
// Genera un Handler para manejar los cambios en el Checkbox
function radioButtonChangeHandler(){
    if(this.checked){
         valor = this.value;
        if(valor === "cre"){
            miSistema.ordenarListaCreciente2();
        } else if(valor === "decre"){
            miSistema.ordenarListaDecreciente2();
        }
    }
    cargarListaPreguntas();
}   
//Inicializamos dos variables globales para llevar el conteo del puntaje de Jugar
let maximoPuntaje = 0;
let conteoGlobal = 0;
//Selector de sección
//Esta funcion es para manipular el DOM dependiendo que opcion en el NavBar seleccione el user
function seleccion() {
    document.getElementById("generalNavBar").addEventListener("click", () => mostrarSeccion("general"));
    document.getElementById("gestionNavBar").addEventListener("click", () => mostrarSeccion("gestion"));
    document.getElementById("jugarNavBar").addEventListener("click", () => mostrarSeccion("jugar"));
    document.getElementById("logo").addEventListener("click", mostrarTodo);
}

function mostrarSeccion(seccion) {
    document.getElementById("general").style.display = "none";
    document.getElementById("gestion").style.display = "none";
    document.getElementById("jugar").style.display = "none";
    document.getElementById("idJuego").style.display = "none";
    document.getElementById("idTemasJugar").disabled = false;
    document.getElementById("idJugar").style.display = "inline"; 
    document.getElementById("idNivelJugar").disabled = false;
    document.getElementById(seccion).style.display = "block";
}

function mostrarTodo() {
    document.getElementById("general").style.display = "block";
    document.getElementById("gestion").style.display = "block";
    document.getElementById("jugar").style.display = "block";
    document.getElementById("idJuego").style.display = "none";
    document.getElementById("idTemasJugar").disabled = false;
    document.getElementById("idJugar").style.display = "inline"; 
    document.getElementById("idNivelJugar").disabled = false;

}
//Se muestra en pantalla un "confirm", en caso de confirmar se cargan los datos de prueba
function consultarDatosPrueba(){
    let cargarPreguntas = confirm("¿Deseas cargar datos?");
        if (cargarPreguntas) {
            //cargarPreguntasDesdeArchivo();
            miSistema.agregarPreguntasPrueba(preguntas);
            actualizar();
        }
}
//Actualiza informacion del DOM, esta funcion se llama dentro de todas las que hagan algun cambio en el Arrays que se muestren por DOM
function actualizar(){
    cargarListaTemas();
    actualizarSelectorjugar();
    actualizarSelectorTemas();
    cargarListaPreguntas();
    cargarListaTemasSinPreguntas(); 
    contadores();
}
//Testea si se alcanzo el maximo puntaje Historico
function maximo(){
    if(conteoGlobal > maximoPuntaje){
        maximoPuntaje = conteoGlobal;
    }
}
//Cada vez que se ejecuta suma al resultado de la partida actual
function llevarConteo(resultado){
    conteoGlobal = conteoGlobal + resultado;
}
//Toma el formulario "idFormularioTema", y ejectua el constructor para agregar un tema con los imputs del form
function agregarTema(){
    let formulario = document.getElementById("idFormularioTema");
    if(formulario.reportValidity()){
        let nombre = document.getElementById("idNombre").value;
        let descripcion = document.getElementById("idDescripcion").value;    
        let temas = miSistema.darTemas(); 
        temas.forEach((tema) => {
            if(tema.nombre == nombre){
                alert("Este tema ya existe")
            } else { 
                let unTema = new Tema(nombre, descripcion);
                miSistema.agregarUnTema(unTema);
                formulario.reset();
            }
        })
    }
         
        actualizar();
}
//Muestra en el DOM los promedios y totales de Temas y Preguntas
function contadores(){ 
    document.getElementById("totalTemas").textContent = miSistema.listaTemas.length;
    document.getElementById("idPromedio").textContent = (miSistema.listaPreguntas.length / miSistema.listaTemas.length).toFixed(2);
    document.getElementById("idTotalPreguntas").textContent = miSistema.listaPreguntas.length;
    
    if(conteoGlobal >= 0){
        document.getElementById("idContadorPuntos").textContent = conteoGlobal;
    }
   // maximo();
    document.getElementById("idResultado").textContent = maximoPuntaje.toString();
}
//Recibe la lista de temas mediante el metodo darTemas y lo imprime en el DOM
function cargarListaTemas(){
    let lista = document.getElementById("Idlista");
    let datos = miSistema.darTemas();
    lista.innerHTML = "";
    for(let t of datos){
        let nodo = document.createElement("li");
        let nodoT = document.createTextNode(t);
        nodo.appendChild(nodoT);
        lista.appendChild(nodo);
    }
    
}
//Recibe la lista de temas sin preguntas mediante el metodo temasSinPreguntas y li imprime en el DOM
function cargarListaTemasSinPreguntas(){
    let lista = document.getElementById("idLisaTemasSinPreguntas");
    let datos = miSistema.temasSinPreguntas();
    lista.innerHTML = "";
    if(datos.length == 0){
        let nodo = document.createElement("li");
        let nodoT = document.createTextNode("SIN DATOS");
        nodo.appendChild(nodoT);
        lista.appendChild(nodo);
    } else {
        for(let t of datos){
        let nodo = document.createElement("li");
        let nodoT = document.createTextNode(t);
        nodo.appendChild(nodoT);
        lista.appendChild(nodo);
    }}
}
//Actualiza el Select de Tema
function actualizarSelectorTemas(){
    let selector = document.getElementById("idSelecTema");
    selector.innerHTML = "";
    let dato = miSistema.darTemas();
    
    for(let o of dato){
        let option = document.createElement("option");
        let optionT = document.createTextNode(o.nombre);
        option.appendChild(optionT);
        option.value = o.nombre;
        selector.add(option);
    }
}
//Toma la informacion de "idFormularioPregunta" y ejecuta el constructor de Pregunta
function agregarPregunta(){
    let formularioPreguntas = document.getElementById("idFormularioPregunta");
    if(formularioPreguntas.reportValidity()){
        
        let nTema = document.getElementById("idSelecTema").value;
        let objTema = miSistema.objetoTema(nTema);
        let nNivel = document.getElementById("idNivel").value ;
        let nTexto = document.getElementById("idTexto").value;
        let nRespCorrecta = document.getElementById("idRespCorrecta").value ;
        let nRespIncorrecta = document.getElementById("idRespIncorrecta").value;
        if (nRespIncorrecta.split(",").includes(nRespCorrecta)){
            alert("La respuesta correcta no puede estar incluida en las respuestas incorrectas")
        } else {
        let unaPregunta = new Pregunta(objTema, nNivel, nTexto, nRespCorrecta, nRespIncorrecta); 
        miSistema.agregarUnaPregunta(unaPregunta);
        document.getElementById("idTotalPreguntas").textContent = miSistema.listaPreguntas.length;
        formularioPreguntas.reset();
        miSistema.temasSinPreguntas()
        }
    }
    cargarListaTemas()
    actualizar();
}
//Toma la informacion de la lista de preguntas y la imprime en la tabla utilizando metodos de la clase Sistema para aplicarles color
function cargarListaPreguntas(){
    let tabla = document.getElementById("idTablaPreguntas");
    tabla.innerHTML = "";
    let datos = miSistema.darPreguntas();
    let coloresT = miSistema.coloresPorTema();
    for(let p of datos){
        let fila = tabla.insertRow();
        let id = miSistema.colorID(p.tema.nombre);
        fila.style.backgroundColor = coloresT[id]; 
        let celdaTema = fila.insertCell();
        let celdaNivel = fila.insertCell();
        let celdaTexto = fila.insertCell();
        let celdaRespCorrecta = fila.insertCell();
        let celdaRespIncorrectas = fila.insertCell();
        celdaTema.innerHTML = p.tema.nombre;
        celdaNivel.innerHTML = p.nivel;
        celdaTexto.innerHTML = p.texto;
        celdaRespCorrecta.innerHTML = p.respuestaCorrecta;
        celdaRespIncorrectas.innerHTML = p.respuestasIncorrectas;
    }
}
//Actualiza el selector de Temas en la seccion Jugar
function actualizarSelectorjugar() {
    let selector = document.getElementById("idTemasJugar");
    selector.innerHTML = "";
    let dato = miSistema.darTemas();
    let sinPregunta = miSistema.temasSinPreguntas();  
    for(let o of dato){
        if(!sinPregunta.includes(o)){
        let option = document.createElement("option");
        let optionT = document.createTextNode(o.nombre);
        option.appendChild(optionT);
        selector.add(option);
        }
    }
}
function desordenarLista(array) {
    let nuevo = array;
    return nuevo.sort(function() {
        return 0.5 - Math.random();
  });
}
function listaFiltrada(){
    let form = document.getElementById("formularioAJugar");
    let temaSelect = document.getElementById("idTemasJugar").value;
    let nivelSelect = parseInt(document.getElementById("idNivelJugar").value);
    let listaFilt = miSistema.obtenerPreguntasPorTemaYNivel(temaSelect, nivelSelect);
    
    return listaFilt;        
}
//Obtiene Tema y Nivel que se va a Jugar
function temaYNivelAJugar(){
    let tema;
    let nivel;
    let form = document.getElementById("formularioAJugar");
    if(form.reportValidity()){
        tema = document.getElementById("idTemasJugar").value;
        nivel = document.getElementById("idNivelJugar").value;
    }
    let ret = {tema, nivel};
    return ret;
}
//Obtiene preguntas usando la funcion temaYnivelAJugar y el metodo obtenerpreguntas
function setDePreguntas(){
    let temaYNivel = temaYNivelAJugar();
    let tema = temaYNivel.tema;
    let nivel = parseInt(temaYNivel.nivel);
    let preguntas = miSistema.obtenerPreguntasPorTemaYNivel(tema, nivel);
    return preguntas;
}
//Establece la funcionalidad del boton ayuda
function ayuda() {
    let primerLetra =""  ;
    let botones = document.querySelectorAll(".cuadroNaranja2");
    botones.forEach(boton => {
    if (boton.value == "correcto"){
        primerLetra = boton.textContent.charAt(0);
        alert("La primera letra de la respuesta es... "+primerLetra);
    }
    })
}
//Genera los botones de respuesta y establece su funcionalidad
function botonesJugar(boton, respC){
    let audioGanaste = document.getElementById("idGanaste");
    let audioPerdiste = document.getElementById("idPerdiste");
    let resultado = 0;
    let botones = document.querySelectorAll(".cuadroNaranja2");
    if (boton.textContent == respC) {
        boton.style.backgroundColor = "rgb(0, 128, 0)";
        resultado = resultado + 10; 
        botones.forEach(butt => butt.disabled = true);
        llevarConteo(resultado);
        audioGanaste.play();
    } else {
        boton.style.backgroundColor = "rgb(255, 0, 0)";
        resultado = resultado - 1;
        boton.disabled = true;
        llevarConteo(resultado);
        audioPerdiste.play();
    }
    contadores();
    return resultado;
}
//Muestra la pregunta indexada en el array tomando listaFiltrada() y la variable i que se establece en aJugar()
function mostrarPregunta(i) {
    let preguntas = listaFiltrada();
    if(i < preguntas.length){
        let acaVa = document.getElementById("acaPreguntas");
        let preguntaEnI = preguntas[i];
        let textoP = preguntaEnI.texto;
        let respC = preguntaEnI.respuestaCorrecta;
        let respuestas = preguntaEnI.respuestasIncorrectas;
        if(!respuestas.includes(respC)){
            respuestas.push(respC);
        }
        let coloresT = miSistema.coloresPorTema();
        let id = miSistema.colorID(preguntaEnI.tema.nombre);
        let txtP = document.getElementById("textoPreg");
        txtP.classList.add("cuadroNaranja1");
        txtP.textContent = textoP;
        txtP.style.backgroundColor = coloresT[id];
        acaVa.innerHTML = ""; 
        let ordenBotones = desordenarLista(respuestas);
        for (let b = 0; b < ordenBotones.length; b++) {
            let boton = document.createElement("button");
            boton.textContent = ordenBotones[b];
            if(boton.textContent == respC){
                boton.value = "correcto";
            }
            boton.classList.add("cuadroNaranja2");
            boton.style.backgroundColor = coloresT[id];
            boton.addEventListener("click", () => botonesJugar(boton, respC));
            acaVa.appendChild(boton); 
        }
    }
}
//Establece parte de la funcionalidad del boton Terminar
function terminarJuego(){
    maximo();
    alert("¡Tu puntaje final es: " + conteoGlobal);
    conteoGlobal = 0;
    juegoTerminado = true;
    actualizarSelectorjugar();
    actualizar();
}
//Establece las funciones principales de la seccion A jugar  
function aJugar() {
    let formulario = document.getElementById("formularioAJugar");
    if(formulario.reportValidity()){
        let preguntas = listaFiltrada();
        if(preguntas.length != 0){
            document.getElementById("idJuego").style.display = "block";
            let selectTema = document.getElementById("idTemasJugar");
            selectTema.disabled = true;
            let botonJugar = document.getElementById("idJugar");     
            botonJugar.style.display = "none"; 
            let campoNivel = document.getElementById("idNivelJugar");
            campoNivel.disabled = true;
            let acaVa = document.getElementById("acaPreguntas");
            let txtP = document.getElementById("textoPreg");            
            let botonSiguiente = document.getElementById("idSiguiente");
            let botonAyuda = document.getElementById("idAyuda");
            let botonTerminar = document.getElementById("idterminar");
            let i = 0;
            mostrarPregunta(i); 

            if (preguntas.length == 1) {
                botonSiguiente.disabled = true;
            }
            botonSiguiente.addEventListener("click", () => {
                i++; 
                if (i <= preguntas.length) {
                    mostrarPregunta(i);
                }
                if (i == preguntas.length - 1) {
                    botonSiguiente.disabled = true;
                }
            });
            botonTerminar.addEventListener("click", () => {
                if (selectTema) {
                    selectTema.disabled = false; 
                }
                txtP.innerHTML="";
                txtP.classList.remove("cuadroNaranja1");
                acaVa.innerHTML = "";
                botonSiguiente.disabled = false;
                botonJugar.style.display = "inline";  
                campoNivel.disabled = false;
                document.getElementById("idJuego").style.display = "none";
                actualizar()
            });   
        }
    } 
}