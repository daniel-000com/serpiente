
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMAÑIO_CELDA = 25;

    
    
    const PERSONAJE_X = 1;
    const PERSONAJE_Y = 1;
    const SERPIENTE =[
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
    let direccionActual = derecha;


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

    function pintarParte(lineaX, lineaY){
      let cuadroX = lineaX* TAMAÑIO_CELDA;
      let cuadroY = lineaY* TAMAÑIO_CELDA;
      ctx.fillStyle = "blue";
      ctx.fillRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);
      ctx.strokeStyle = "#ff52d9";
      ctx.strokeRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);

    }
    
    function pintarSerpiente(){
      //dibujar cabeza
      let cabeza = SERPIENTE[0];
      let cuadroX = cabeza.X * TAMAÑIO_CELDA;
      let cuadroY = cabeza.Y * TAMAÑIO_CELDA;
      // color distintivo para ubicar la cabeza
      ctx.fillStyle = "#f32626";
      ctx.fillRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);
      ctx.strokeStyle = "#ff52d9";
      ctx.strokeRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);

      //dibujar cuerpo
      for(let i =1; i< SERPIENTE.length; i++){
        let cuadroX = SERPIENTE[i].X * TAMAÑIO_CELDA;
      let cuadroY = SERPIENTE[i].Y* TAMAÑIO_CELDA;
      ctx.fillStyle = "blue";
      ctx.fillRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);
      ctx.strokeStyle = "#ff52d9";
      ctx.strokeRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);
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
 
    }

    function moverDerecha(){
      // crear nuevo objeto a la derecha de la cabeza
      let nvCabeza = { 
        X: SERPIENTE[0].X +1 ,
        Y: SERPIENTE[0].Y 
        };
      // reemplaza la pocicion 0 por el nuevo objeto y desplaza el resto
        SERPIENTE.unshift(nvCabeza);
      // elimina el ultimo objeto
        SERPIENTE.pop();       
}

function moverIzquierda(){
      let nvCabeza = { 
        X: SERPIENTE[0].X -1 ,
        Y: SERPIENTE[0].Y 
        };
        SERPIENTE.unshift(nvCabeza);
        SERPIENTE.pop();    
}

function moverArriba(){
      let nvCabeza = { 
        X: SERPIENTE[0].X,
        Y: SERPIENTE[0].Y -1
        };
        SERPIENTE.unshift(nvCabeza);
        SERPIENTE.pop();    
}

function moverAbajo(){
      let nvCabeza = { 
        X: SERPIENTE[0].X,
        Y: SERPIENTE[0].Y +1 
        };
        SERPIENTE.unshift(nvCabeza);
        SERPIENTE.pop();    
}

function cambiarDireccion(direccion){
  direccionActual = derecha;
    
}

function iniciarJuego(){
  /*"setInterval" repite una fincion Continuamente, solo nececita
  los siguiente valore (nombre de la funcion y el tiempo en milisegundos)*/
intervaloSerpiente = setInterval(moverSerpiente,1000);
}

function pausarJuego(){
clearInterval =(intervaloSerpiente);
}

function moverSerpiente(){
  console.log("movimiento");
  if( direccionActual === 'derecha'){
    moverDerecha();
  }else if( direccionActual === 'izquierda'){
    moverIzquierda();
  }else if( direccionActual === 'arriba'){
    moverArriba();
  }else if( direccionActual === 'abajo'){
    moverAbajo();
  };
  dibujarTodo();
}

function pintarComida(){
  let comizaX =Math.floor(Math.random() * canvas.width/TAMAÑIO_CELDA);
  let comidaY =Math.floor(Math.random() *canvas.height/TAMAÑIO_CELDA);
  ctx.strokeStyle = "#ae0afa";

  pintarParte(comizaX, comidaY);
}