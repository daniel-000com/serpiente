
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMAÑIO_CELDA = 25;
    
    const PERSONAJE_X = 1;
    const PERSONAJE_Y = 1;
    let lineaX = 0;
    let lineaY = 0;




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
      pintarParte(5,1);
      pintarParte(5,5);
      pintarParte(10,2);
      pintarParte(15,23);
      pintarParte(23,15);
      pintarParte(0,15);
      pintarParte(23,0);
      pintarParte(0,3);

    }



