/* Nombres y numeros de estudiantes: -Esteban Blanco-241504 -Franco Choca-342991 */

//Constructor de clase tema y sus metodos
class Tema{
    constructor (nombre, descripcion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
}
toString() {
    return this.nombre+": "+this.descripcion;
}
}
//Constructor de clase Pregunta y sus metodos
class Pregunta{
    constructor(unTema, nivel, texto, respuestaCorrecta, respuestasIncorrectas) {    
    this.tema = unTema;                                                              
    this.nivel = nivel;
    this.texto = texto;
    this.respuestaCorrecta = respuestaCorrecta;
    this.respuestasIncorrectas = respuestasIncorrectas.split(",");
}
toString() {
    return "Nombre de tema "+this.nombre+" nivel: "+this.nivel+" pregunta"+ this.texto+"respuesta correcta"+this.respuestaCorrecta+""+this.respuestasIncorrectas ;
}

compararTemaCreciente(otro) {
    let dif = this.tema.nombre.localeCompare(otro.tema.nombre);
    if (dif == 0){
        dif = this.nivel - otro.nivel;
    }
    return dif;
}

compararTemaDecreciente(otro) {
    let dif = otro.tema.nombre.localeCompare(this.tema.nombre);
    if (dif == 0){
        dif = this.nivel - otro.nivel;
    }
    return dif;
}
}

class Sistema {
    constructor(){
        this.listaTemas = [];
        this.listaPreguntas =[];
    }

    agregarUnTema(unTema){
        let temaRepetido = false;
        let i = 0;
        while (i < this.listaTemas.length && !temaRepetido) {
            if (this.listaTemas[i].nombre === unTema.nombre) {
                temaRepetido = true;
                }    
            i++;
            }      
        if (!temaRepetido) {
            this.listaTemas.push(unTema);
        }
    }

    darTemas(){
        return this.listaTemas;
    }

    agregarUnaPregunta(unaPregunta){
        let textoRepetido = false;
        let i = 0;
        while (i < this.listaPreguntas.length && !textoRepetido) {
            if (this.listaPreguntas[i].texto === unaPregunta.texto) {
                textoRepetido = true;
                alert("Ya se ingreso esta pregunta!");
                }
            i++;
        }
            
        if (!textoRepetido) {
            this.listaPreguntas.push(unaPregunta);
        }
        this.listaPreguntas.sort(function(pregunta1, pregunta2){
            return pregunta1.compararTemaCreciente(pregunta2);    
        })
    }  

    darPreguntas(){                             
        return this.listaPreguntas;             
    }

    obtenerPreguntasPorTemaYNivel(tema, nivel) {
        let preguntasFiltradas = [];
        preguntasFiltradas = this.listaPreguntas.filter(pregunta => pregunta.tema.nombre == tema && pregunta.nivel == nivel);
        return preguntasFiltradas;
    }

    temasSinPreguntas(){
        let retTemaSin = [];
        for (let tem of this.listaTemas){
            let tieneTema = false;
            for(let preg of this.listaPreguntas){
                if(preg.tema == tem){
                    tieneTema = true; 
                }
                
            }
            if(!tieneTema){
                retTemaSin.push(tem);
            }
        }
        return retTemaSin
        }    
          
       
    objetoTema(nombre) {
        let elTema;
        for(let tem of this.listaTemas) { 
            if(tem.nombre == nombre) {
                elTema = tem;
            }
        }
        return elTema;
    }
      
    coloresPorTema(){
        let listaColores = ['rgb(255,255,153)','rgb(255,255,102)','rgb(255,255,51)','rgb(255,230,128)','rgb(255,204,102)','rgb(255,187,51)','rgb(230,184,128)','rgb(204,153,51)','rgb(179,128,0)','rgb(153,102,0)','rgb(153,153,102)','rgb(133,94,66)','rgb(121,85,72)','rgb(102,68,34)','rgb(88,66,37)','rgb(80,64,43)','rgb(72,60,50)','rgb(59,51,45)','rgb(51,34,17)','rgb(43,27,23)'];
        return listaColores;
    }
        
    colorID(tema){
        let objT =  this.objetoTema(tema);
        let colorId = this.listaTemas.indexOf(objT);
        return colorId;
    }

    preguntasPorTyN(tema, nivel){  
        let objT =  this.objetoTema(tema); 
        let retorno = [];
        for(let t of this.listaTemas){
            if(objT === t){
               for(let p of this.listaPreguntas){
                    if(p.nivel == nivel && objT == p.tema){
                    retorno.push(p)
                    }    
                }
            }
        }
        return retorno;
    }

    agregarPreguntasPrueba(preg){ 
        let pregunta;
        let tema;
        for(let i = 0; i < preg.length; i++){ 
            //Definimos y agregamos tema
            let tem = preg[i].tema;
            let name = tem.nombre;
            let desc = tem.descripcion; 
            tema = new Tema(name, desc);  
            this.agregarUnTema(tema);
            //Lo mismo pero para las preguntas
            let nivel = preg[i].nivel;
            let texto = preg[i].texto; 
            let respuestaCorrecta = preg[i].respuestaCorrecta;
            let respuestasIncorrectas =preg[i].respuestasIncorrectas.toString();
            pregunta = new Pregunta(tema, nivel, texto, respuestaCorrecta, respuestasIncorrectas);
            this.agregarUnaPregunta(pregunta);                
        }
        return tema;
    }

    ordenarListaCreciente2(){
        this.listaPreguntas.sort(function(pregunta1, pregunta2){
        return pregunta1.compararTemaCreciente(pregunta2);    
        })
    }

    ordenarListaDecreciente2(){
        this.listaPreguntas.sort(function(pregunta1, pregunta2){
        return pregunta1.compararTemaDecreciente(pregunta2);})
    }
}