
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMAÑIO_CELDA = 25;
    
    const PERSONAJE_X = 1;
    const PERSONAJE_Y = 1;
    const SERPIENTE =[
      {X:0,Y:10},
      {X:0,Y:11},
      {X:0,Y:12},
      {X:1,Y:12},
      {X:2,Y:12},
      {X:4,Y:5},
      {X:10,Y:10},
      {X:8,Y:0},
      {X:0,Y:0},
      {X:1,Y:0},
      {X:2,Y:0},
      {X:0,Y:12},
      {X:9,Y:12},
      {X:10,Y:12},
      {X:11,Y:12},
      {X:12,Y:12},
      {X:12,Y:13},

    ]
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
    
    function pintarSerpiente(){
      let cabeza = SERPIENTE[0];
      let cuadroX = cabeza.X * TAMAÑIO_CELDA;
      let cuadroY = cabeza.Y * TAMAÑIO_CELDA;
      ctx.fillStyle = "#f32626";
      ctx.fillRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);
      ctx.strokeStyle = "#ff52d9";
      ctx.strokeRect(cuadroX, cuadroY, TAMAÑIO_CELDA, TAMAÑIO_CELDA);

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



