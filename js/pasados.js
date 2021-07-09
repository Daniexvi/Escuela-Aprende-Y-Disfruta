//Define las variables que necesites
$(document).ready(function () {
  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "info.json",
  }).done(function (d) {
    //Guarda el resultado en variables
    let fechaActual = obtenerFecha(d.fechaActual);
    let eventos = d.tarjetas;
    //Selecciona los eventos que sean anteriores a la fecha actual del JSON
    var pasados = Object.entries(eventos.filter(function (f) { return obtenerFecha(f.fecha) < fechaActual; }));
    //Ordena los eventos segun la fecha (los mas recientes primero)
    let pasadosOrdenados = pasados.sort(([, a], [, b]) =>{ return obtenerFecha(a.fecha) < obtenerFecha(b.fecha) }).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    //Crea un string que contenga el HTML que describe el detalle del evento
    var html = ``
    //Recorre el arreglo y concatena el HTML para cada evento
    let pasadosTamaño = Object.keys(pasadosOrdenados).length;
    console.log(pasadosOrdenados[0].fecha);
    for (let i = 0; i < pasadosTamaño; i++) {
      html += `      <div class="cards">
        <a href="detalle.html?id=${pasadosOrdenados[i].id}">${pasadosOrdenados[i].nombre}</a>
        <p id="fechaevento"> ${pasadosOrdenados[i].fecha} </p>
        <p id="descripcion"> ${pasadosOrdenados[i].descripcion} </p>
        <p id="costo">Costo: ${pasadosOrdenados[i].costo}</p>
      </div>\n`
    };
    //Modifica el DOM agregando el html generado
    document.getElementById('pasados').innerHTML = html;
  }); // Final de done
});
function obtenerFecha(fechaStr) {
  let partes = fechaStr.split("/");
  return new Date(partes[2], partes[1] - 1, partes[0]).getTime();
}