
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMAÑIO_CELDA = 25;
    const sonidoComer = new Audio("Audio_3_m4a_20260730_000703.m4a");

    const sonidoGameOver = new Audio("Audio_2_m4a_20260730_000617.m4a");

sonidoComer.volume = 0.7;

sonidoGameOver.volume = 0.8;
    const musica = new Audio("Audio_1_m4a_20260729_231723.m4a");

musica.loop = true;      // Se repetirá indefinidamente

musica.volume = 0.4;     // Volumen entre 0 y 1
    
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
    let velocidadSerpiente = 900;
    let tiempo = 60;
    let intervaloTiempo ;


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
  // Si va a la derecha, no puede ir a la izquierda
  if (direccionActual === "derecha" && direccion === "izquierda") {
    return;
  }
  // Si va a la izquierda, no puede ir a la derecha
  if (direccionActual === "izquierda" && direccion === "derecha") {
    return;
  }
  // Si va arriba, no puede ir abajo
  if (direccionActual === "arriba" && direccion === "abajo") {
    return;
  }
  // Si va abajo, no puede ir arriba
  if (direccionActual === "abajo" && direccion === "arriba") {
    return;
    }
  direccionActual = direccion;
    
}

function iniciarJuego(){
  musica.play();
  clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(restarTiempo, 1000);
  clearInterval(intervaloSerpiente);
  document.getElementById("estado").innerText = "Jugando";

  document.getElementById("mensaje").innerText = "¡come todo lo que puedas!";
  generarComida();
  dibujarTodo();
  /*"setInterval" repite una fincion Continuamente, solo nececita
  los siguiente valore (nombre de la funcion y el tiempo en milisegundos)*/
intervaloSerpiente = setInterval(moverSerpiente,velocidadSerpiente);
}

function pausarJuego(){
  musica.pause();
clearInterval(intervaloSerpiente);
clearInterval(intervaloTiempo);
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
    musica.pause();

musica.currentTime = 0;

sonidoGameOver.currentTime = 0;

sonidoGameOver.play();
    clearInterval(intervaloSerpiente);

    document.getElementById("estado").innerText = "GAME OVER";
    document.getElementById("mensaje").innerText =
      "💀 Game Over. demasiado lento para moverte.";

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
    moverDerecha(false);
  }else if( direccionActual === 'izquierda'){
    moverIzquierda(false);
  }else if( direccionActual === 'arriba'){
    moverArriba(false);
  }else if( direccionActual === 'abajo'){
    moverAbajo(false);
  };
  dibujarTodo();
  if(crecer){

    sonidoComer.currentTime = 0;

    sonidoComer.play();
    generarComida();
    puntaje ++;
    document.getElementById("puntaje").innerText = puntaje;  
  }
  if(puntaje == 1){
    cambiarVelocidad(800);
  }
  if(puntaje == 2){
    cambiarVelocidad(700);
  }
  if(puntaje >= 3){
    moverComida();
    document.getElementById("mensajeLevel").innerText = "NIVEL 2";
    document.getElementById("mensajeLevelMENSAJE").innerText = "ATARPA LA COMIDA";
}
  if(puntaje == 3){
    cambiarVelocidad(600);
    
  }
  if(puntaje == 4){
    cambiarVelocidad(500);
  }
  if(puntaje == 5){
    cambiarVelocidad(400);
  }
}

function cambiarVelocidad(nuevaVelocidad){
    clearInterval(intervaloSerpiente);
    velocidadSerpiente=nuevaVelocidad;
    intervaloSerpiente = setInterval(moverSerpiente,velocidadSerpiente);
}

function generarComida(){
    let posicionValida = false;
    while(!posicionValida){
        comidaX = Math.floor(Math.random() * (canvas.width / TAMAÑIO_CELDA));
        comidaY = Math.floor(Math.random() * (canvas.height / TAMAÑIO_CELDA));
        posicionValida = true;
        for(let parte of SERPIENTE){
            if(parte.X === comidaX && parte.Y === comidaY){
                posicionValida = false;
                break;
            }
        }
    }
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
  clearInterval(intervaloSerpiente)
  puntaje = 0;
  clearInterval(intervaloTiempo);
  tiempo = 60
  document.getElementById("tiempoRest").innerText = tiempo;
  document.getElementById("estado").innerText = "Listo";
  document.getElementById("puntaje").innerText = 0;
  document.getElementById("mensajeLevel").innerText = "NIVEL 1";
  document.getElementById("mensaje").innerText =
      "¡preparado para jugar!? 😈🎮";
  direccionActual = 'derecha';
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
  
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida()
  

}

function restarTiempo(){
    tiempo--;
        document.getElementById("tiempoRest").innerText = tiempo;
        if (tiempo == 0) {
          clearInterval(intervaloSerpiente);
         clearInterval(intervaloTiempo); 
         alert("¡GAME OVER! Puntos obtenidos: " + puntaje);
    }
        
}
function moverComida(){

    comidaX++;

    // Si llegó a la pared derecha

    if(comidaX >= canvas.width / TAMAÑIO_CELDA){

      generarComida();

    }

}