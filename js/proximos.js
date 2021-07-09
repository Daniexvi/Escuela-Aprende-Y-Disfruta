//Define las variables que necesites
$(document).ready(function () {
  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "info.json",
  }).done(function (d) {
    //Guarda el resultado en variables
    let fechaActual = obtenerFecha(d.fechaActual);
    let eventos = d.tarjetas;
    //Selecciona los eventos que sean posteriores a la fecha actual del JSON
    var proximos = Object.entries(eventos.filter(function (f) { return obtenerFecha(f.fecha) > fechaActual; }));
    //Ordena los eventos segun la fecha (los mas cercanos primero)
    let proximosOrdenados = proximos.sort(([, a], [, b]) =>{ return obtenerFecha(a.fecha) > obtenerFecha(b.fecha) }).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    //Crea un string que contenga el HTML que describe el detalle del evento
    var html = ``
    //Recorre el arreglo y concatena el HTML para cada evento
    let proximosTamaño = Object.keys(proximosOrdenados).length;
    console.log(proximosOrdenados[0].fecha);
    for (let i = 0; i < proximosTamaño; i++) {
      html += `      <div class="cards">
        <a href="detalle.html?id=${proximosOrdenados[i].id}">${proximosOrdenados[i].nombre}</a>
        <p id="fechaevento"> ${proximosOrdenados[i].fecha} </p>
        <p id="descripcion"> ${proximosOrdenados[i].descripcion} </p>
        <p id="costo">Costo: ${proximosOrdenados[i].costo}</p>
      </div>\n`
    };
    //Modifica el DOM agregando el html generado dentro del div con id=evento
    document.getElementById('proximos').innerHTML = html;
  });
});
function obtenerFecha(fechaStr) {
  let partes = fechaStr.split("/");
  return new Date(partes[2], partes[1] - 1, partes[0]).getTime();
}