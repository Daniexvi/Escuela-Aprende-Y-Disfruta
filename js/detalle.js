$(document).ready(function () {
   //cargando los datos
  $.ajax({
    url: "info.json "
  }).done(async function (resultado) {
    //llenando la variable
    tarjetas = resultado.tarjetas;

    //obteniendo el id del url
    var id = await location.search.match(/id=(\d)*/)[1];

    tarjetas = tarjetas.find(function (element) {
      return element.id == id
    })
    
    //llenando dinamicamente los eventos
    var html = `
                <h2>${tarjetas.nombre}</h2>
                <p>${tarjetas.fecha}</p>
                <p>Lugar: ${tarjetas.lugar}</p
                <p>Descripción: ${tarjetas.descripcion}</p>
                <p>Costo: ${tarjetas.costo}</p>
                <p>Invitados: ${tarjetas.invitados}</p>
                `
    document.getElementById("evento").innerHTML = html
  });
});