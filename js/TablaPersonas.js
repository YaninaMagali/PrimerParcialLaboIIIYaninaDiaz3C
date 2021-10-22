const cabeceraParams = ["Nombre", "Apellido", "Localidad", "Sexo"];

function CrearModal()
{
    modal = document.getElementById('id_div_modal');
    modal.setAttribute("style", "display: block");
}

function OcultarModal() 
{
    modal = document.getElementById('id_div_modal');
    modal.setAttribute("style", "display: none");  
}

function ObtenerDataPorFila(event)
{
    t = event.currentTarget;
    return t.childNodes;
}

function PrecargarDataPersonaEnForm(dataPersona) 
{
    //GetLocalidades();
    nombre = document.getElementById("id_input_nombre");
    apellido = document.getElementById("id_input_apellido");
    localidad = document.getElementById("id_select_localidad");
    sexo = document.getElementsByClassName("radio");
    nombre.value = dataPersona[0].textContent;
    apellido.value = dataPersona[1].textContent;
    localidad.value = dataPersona[2].textContent;
    sexo.value = dataPersona[3].textContent;
}

function AgregarTablaPersonasGet()
{
    var http = new XMLHttpRequest();
    http.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var auxData = this.response;
            AgregarFilasATablaPersonas(JSON.parse(auxData));

            var table = document.getElementById("id_tabla_personas");
            for (var i = 0, row; row = table.rows[i]; i++)
            {
                var r = row;
                r.addEventListener("click", (e)=>{
                    CrearModal();
                    var data = ObtenerDataPorFila(e);
                    GetLocalidades();
                    PrecargarDataPersonaEnForm(data); 
                });
            }

        }
    }
    http.open("GET", "http://localhost:3000/personas", true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
}

function AgregarFilasATablaPersonas(params)
{
    params.forEach(element => {
        params = [element.nombre, element.apellido, element.localidad.nombre, element.sexo]
        AgregarFila(cabeceraParams, params);
    })

}


window.addEventListener("load", AgregarTablaPersonasGet);






