
// Cuadrado de lado = 2
//Radio de la circunferencia = 1


const num_pi = Math.PI;
let x, y;        //variables que voy a utilizar como coordenadas
let iteracion = 0;        //contador total
let diana = 0;    //contador dentro de la 


// creando los array para guardar los datos
let num_iteraciones = [];
let resultado = [];
let num_circunferencia = [];





//                IMPORTANTE                  //
//CAMBIAR NÚMEROS DE TIROS ACÁ 
let tiros = 10000000; 





// Funcion que determina si cae dentro de la diana
function dentro(x,y){
    if( ((x-1)*(x-1) + (y-1)*(y-1)) > 1) 
        return 0;
    else
        return 1;
}


// funcion generar tablas//
function generarTabla(filas, columnas) {
    var tabla = document.getElementById("tabla"); // referenciamos el id
    for (var i = 0; i < filas; i++) {
      var fila = document.createElement("tr"); //fila
      for (var j = 0; j < columnas; j++) {
        var celda = document.createElement("td");//columna
        
        //Condicionales
        if(j == 0 && i == 0 ){
          //inserto el contenido en celda
          celda.innerHTML = "Número de simulación";
        }
        if(j == 1){
          celda.innerHTML = "Número total de dardos";
        }
        if(j == 2){
          celda.innerHTML = "Dardos en la circunferencia";
        }   
        if(j == 3){
          celda.innerHTML = "aproximación de pi";
        }       
        if(j == 0  && i != 0){// si está en la primera columna pero no en la primera fila
          celda.innerHTML =  i;
        }
        if(j == 1  && i != 0){// si está en la segunda columna pero no en la primera fila
          celda.innerHTML =  num_iteraciones[i-1];
        }
        if(j == 2  && i != 0){// si está en la tercera columna pero no en la primera fila
          celda.innerHTML =  num_circunferencia[i-1];
        }
        if(j == 3  && i != 0){// si está en la cuarta columna pero no en la primera fila
          celda.innerHTML =  resultado[i-1];
        }
        fila.appendChild(celda);
      } // cierre del for de las columnas     
      tabla.appendChild(fila);
    }// cierre del for de las filas
  }

  
//bucle do while para simular los n tiros
do{
  iteracion++;
     //Genero las coordenadas de una tirada (que no sean mayores a 2)
    x = Math.random()*2;
    y = Math.random()*2;

   
    //compruebo si está dentro de la diana
    if(dentro(x,y)) {
      diana++;
    }

    //calcular pi
    let pi = 4*(diana/iteracion);
    
    //calculo pi cada n de iteraciones
    if(Math.floor(iteracion % (tiros/10)) == 0){
      //Guardando los valores necesarios para la tabla de Datos
      resultado.push(pi.toFixed(6));
      num_iteraciones.push(iteracion);
      num_circunferencia.push(diana);
    } else 
        if(iteracion == tiros){
          resultado.push(pi.toFixed(6));
          num_iteraciones.push(iteracion);
          num_circunferencia.push(diana);
        } 

}while(iteracion<tiros); //Hasta n iteraciones

// una vez hecha la simulación genero la tabla
generarTabla(11, 4); //(filas,columnas)



  
// Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#grafica");
  
// Las etiquetas son las que van en el eje X. 
var datos = [];
var etiquetas = [];
var pi = [];
var pi2 = [];
var pi3 = [];
for (var i = 0; i < 10; i++) {
  //creo las listas que utilizaré en los graficos
  datos.push(parseFloat(resultado[i]));
  etiquetas.push("Simulación " + (i + 1));
  pi.push(num_pi);
  pi2.push(num_pi+0.002);
  pi3.push(num_pi-0.002);
}
//Creo varios conjuntos de datos
const aproximacion_PI = {
    label: "Aproximiaciones de PI",
    data: datos, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    borderColor: 'blue', // Color del borde
    backgroundColor: 'transparent',
    borderWidth: 2,// Ancho del borde
};
const valor_PI = {
    label: "PI",
    data: pi, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    borderColor: 'orange',// Color del borde
    backgroundColor: 'transparent',
    borderWidth: 2,// Ancho del borde
};
  
const valor_PI2 = {
  label: "PI + 0.002",
  data: pi2, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
  borderColor: 'black',// Color del borde
  backgroundColor: 'transparent',
  borderWidth: 2,// Ancho del borde
};
const valor_PI3 = {
  label: "PI - 0.002",
  data: pi3, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
  borderColor: 'black',// Color del borde
  backgroundColor: 'transparent',
  borderWidth: 2,// Ancho del borde
};
  
new Chart($grafica, {
    type: 'line',// Tipo de gráfica
    data: {
        labels: etiquetas,
        datasets: [
            aproximacion_PI,
            valor_PI,
            valor_PI2,
            valor_PI3,
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }],
        },
    }
});
// }

