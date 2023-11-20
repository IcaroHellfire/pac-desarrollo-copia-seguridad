$(document).ready(function () {
  let plantas = [];
  let techoAltura = 0;

  $("#pintaPlantas").hide();
  $("#Reiniciar").hide();
  $(".ranking").hide();
  $("h2").hide();

  function plantasElegidas() {
    $("#Iniciar").show();
    $("#Reiniciar").hide();
    $("h2").hide();
    $(".resultados").empty();
    $("#pintaPlantas").empty();

    let numero = parseInt($("#numeroPlantas").val());

    plantas = [];
    for (let i = 0; i < numero; i++) {
      let nImg = i + 1;
      let plantaHTML = `<img id=${nImg} src='img/planta${nImg}.png' class='planta'>`;
      plantas[i] = {
        id: i + 1,
        img: plantaHTML,
        crecimiento: 0,
        velocidad: 0, // Agregamos velocidad al objeto planta
      };

      $("#pintaPlantas").append(`<td>${plantas[i].img}</td>`);
    }

    $("#pintaPlantas").show();
  }

  function correr() {
    $("#Iniciar").hide();
    $("#Reiniciar").show();

    techoAltura = $("#techoInvernadero").offset().top; // Obtener la posición del techo

    for (let i = 0; i < plantas.length; i++) {
      let vel = Math.random() * 3000;
      plantas[i].velocidad = vel;
      let id = `#${i + 1}`;
      $(id).animate(
        { top: techoAltura },
        {
          duration: vel,
          step: function (now, fx) {
            // Verificar colisión con el techo durante la animación
            if (fx.prop === "top" && now <= techoAltura) {
              $(this).stop(); // Detener la animación si colisiona con el techo
            }
          },
        }
      );
    }

    plantas.sort(function (a, b) {
      return a.velocidad - b.velocidad;
    });

    setTimeout(crearTablaPosiciones, 3000);
  }

  function crearTablaPosiciones() {
    for (let i = 0; i < plantas.length; i++) {
      $(".ranking .resultados").append(
        `<div class='tabla'><h3>Posición ${i + 1}</h3>${plantas[i].img}</div>`
      );
    }
    $("h2").show();
    $(".ranking").show();
  }

  function reiniciar() {
    $("#Reiniciar").hide();
    $("#Iniciar").show();
    $("h2").hide();
    $(".resultados").empty();
  
    for (let i = 0; i < plantas.length; i++) {
      let id = `#${i + 1}`;
      $(id).css("top", "100%"); // Asegurar que la posición inicial sea en la parte inferior
      $(id).stop(true, false).animate({ top: "0" }, 2000);
    }
  
    plantas.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  $("#numeroPlantas").change(plantasElegidas);
  $("#Iniciar").click(correr);
  $("#Reiniciar").click(reiniciar);
});
