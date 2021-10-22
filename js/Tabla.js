const idTabla = "id_tabla_personas";

function CrearTabla(idTabla, cabeceraData) 
{
    var tabla = document.getElementById(idTabla);

    if (tabla === null)
    {
        tabla = document.createElement("table");
        tabla.setAttribute("id", idTabla);
        tabla.setAttribute("class", "Tabla");
        let container = document.getElementById("id_div_tabla_personas");
        container.appendChild(tabla);
        let cabecera = CrearCabecera(cabeceraData);
        tabla.appendChild(cabecera);
    }
    return tabla;
}

function CrearCabecera(cabeceraData) 
{
    let fila = document.createElement("tr");

    cabeceraData.forEach(element => 
    {
        let col = document.createElement("th");
        let lbl = document.createTextNode(element);
        col.appendChild(lbl);
        fila.appendChild(col); 
    })
    return fila;
}

function AgregarFila(cabeceraParams, params) 
{
    var tabla = document.getElementById(idTabla);
    //console.log(params);

    if (tabla == null)
    {
        tabla = CrearTabla(idTabla, cabeceraParams);
    }

    if (params != null)
    {
        var fila = document.createElement("tr");
        fila.setAttribute("id", "id_fila");
        fila.setAttribute("name", "name_fila");

        params.forEach(element =>
        {
            var col = document.createElement("td");
            var lbl = document.createTextNode(element);
            col.appendChild(lbl);
            fila.appendChild(col);
        })
        tabla.appendChild(fila);
    }

}
