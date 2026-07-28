
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMAÑIO_CELDA = 25;

    
    
    const PERSONAJE_X = 1;
    const PERSONAJE_Y = 1;
    let SERPIENTE =[
      {X:3,Y:10},
      {X:3,Y:11},
      {X:3,Y:12},
      {X:3,Y:13},
      {X:3,Y:14},
      {X:3,Y:15},
      {X:4,Y:15},
      {X:5,Y:15},
      {X:6,Y:15} 

    ]
    let lineaX = 0;
    let lineaY = 0;
    let direccionActual = 'derecha';
    let comidaX;
    let comidaY;
    let puntaje = 0;
    let intervaloSerpiente;


    function dibujarTablero(){
      /*ctx.strokeStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(25,25);
      ctx.lineTo(25,475);
      ctx.stroke();*/

      for(let i =0; i<=canvas.width; i+=TAMAÑIO_CELDA ){
        ctx.strokeStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,canvas.height);
      ctx.stroke();
      }
      for(let i =0; i<=canvas.height; i+=TAMAÑIO_CELDA ){
        ctx.strokeStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(0,i);
      ctx.lineTo(canvas.width,i);
      ctx.stroke();
      }
      /*[[[[[[ aplicar un setInterva para generar movimiendo de 
       las lineas en futuros juegos ]]]]]*/
    }

    function pintarParte(lineaX, lineaY, color){
      let cuadroX = lineaX* TAMAÑIO_CELDA;
      let cuadroY = lineaY* TAMAÑIO_CELDA;
      ctx.fillStyle = color;
      ctx.fillRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);
      ctx.strokeStyle = "#ae0afa";
      ctx.strokeRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);

    }
    
    function pintarSerpiente(){
      //dibujar cabeza
      let cabeza = SERPIENTE[0];
      // color distintivo para ubicar la cabeza
       
      pintarParte(cabeza.X,cabeza.Y,"#f32626")

      //dibujar cuerpo
      for(let i =1; i< SERPIENTE.length; i++){
      pintarParte(SERPIENTE[i].X, SERPIENTE[i].Y, "blue");

}
}

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarSerpiente();
      pintarComida()
 
    }

    function moverDerecha(crecer){
      // crear nuevo objeto a la derecha de la cabeza
      let nvCabeza = { 
        X: SERPIENTE[0].X +1 ,
        Y: SERPIENTE[0].Y 
        };
      // reemplaza la pocicion 0 por el nuevo objeto y desplaza el resto
        SERPIENTE.unshift(nvCabeza);
        if(!crecer){ //si crecer es true se desactiva .pop()
          // elimina el ultimo objeto
        SERPIENTE.pop();
        } 
             
}

function moverIzquierda(crecer){
      let nvCabeza = { 
        X: SERPIENTE[0].X -1 ,
        Y: SERPIENTE[0].Y 
        };
        SERPIENTE.unshift(nvCabeza);
        if(!crecer){
        SERPIENTE.pop(); 
        }   
}

function moverArriba(crecer){
      let nvCabeza = { 
        X: SERPIENTE[0].X,
        Y: SERPIENTE[0].Y -1
        };
        SERPIENTE.unshift(nvCabeza);
        if(!crecer){
        SERPIENTE.pop(); 
        }   
}

function moverAbajo(crecer){
      let nvCabeza = { 
        X: SERPIENTE[0].X,
        Y: SERPIENTE[0].Y +1 
        };
        SERPIENTE.unshift(nvCabeza);
        if(!crecer){
        SERPIENTE.pop(); 
        }    
}


function cambiarDireccion(direccion){
  direccionActual = direccion;
    
}

function iniciarJuego(){
  document.getElementById("estado").innerText = "Jugando";

  document.getElementById("mensaje").innerText = "¡come todo lo que puedas";
  generarComida();
  dibujarTodo();
  /*"setInterval" repite una fincion Continuamente, solo nececita
  los siguiente valore (nombre de la funcion y el tiempo en milisegundos)*/
intervaloSerpiente = setInterval(moverSerpiente,1000);
}

function pausarJuego(){
clearInterval(intervaloSerpiente);
document.getElementById("estado").innerText = "Pausado";
}

function GameOver() {
  let nuevaX = SERPIENTE[0].X;
  let nuevaY = SERPIENTE[0].Y;

  // Calculamos hacia dónde irá la cabeza
  if (direccionActual === "derecha") {
    nuevaX++;
  } else if (direccionActual === "izquierda") {
    nuevaX--;
  } else if (direccionActual === "arriba") {
    nuevaY--;
  } else if (direccionActual === "abajo") {
    nuevaY++;
  }

  // Validar bordes
  if (
    nuevaX < 0 ||
    nuevaX >= canvas.width / TAMAÑIO_CELDA ||
    nuevaY < 0 ||
    nuevaY >= canvas.height / TAMAÑIO_CELDA
  ) {
    clearInterval(intervaloSerpiente);

    document.getElementById("estado").innerText = "GAME OVER";
    document.getElementById("mensaje").innerText =
      "💀 Game Over. demaciado lento para moverte.";

    return true;
  }

  return false;
}

function moverSerpiente(){
    // Verificar si la siguiente posición sale del tablero

  if(GameOver()){

    return;

  }
  let crecer =atraparComida();
  if( direccionActual === 'derecha'){
    moverDerecha(crecer);
  }else if( direccionActual === 'izquierda'){
    moverIzquierda(crecer);
  }else if( direccionActual === 'arriba'){
    moverArriba(crecer);
  }else if( direccionActual === 'abajo'){
    moverAbajo(crecer);
  };
  dibujarTodo();
  if(crecer){
    generarComida();
    puntaje ++;
    document.getElementById("puntaje").innerText = puntaje;
    
  }
}
function generarComida(){
  comidaX =Math.floor(Math.random() * (canvas.width/TAMAÑIO_CELDA));
  comidaY =Math.floor(Math.random() * (canvas.height/TAMAÑIO_CELDA));

}

function pintarComida(){ 
//agrega el color directamente en el parametro 
  pintarParte(comidaX, comidaY, "#b60afa");
}

function atraparComida(){
  if(SERPIENTE[0].X === comidaX && SERPIENTE[0].Y ===comidaY){
    return true;
  }else{
    return false;
  }
}
function reiniciarJuego(){
  direccionActual = 'derecha';
  puntaje = 0
  SERPIENTE =[
      {X:3,Y:10},
      {X:3,Y:11},
      {X:3,Y:12},
      {X:3,Y:13},
      {X:3,Y:14},
      {X:3,Y:15},
      {X:4,Y:15},
      {X:5,Y:15},
      {X:6,Y:15} 
    ]
  generarComida();
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida()
  

}
