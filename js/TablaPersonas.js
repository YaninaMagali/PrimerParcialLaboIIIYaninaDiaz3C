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
    console.log(dataPersona[2].textContent);
    nombre = document.getElementById("id_input_nombre");
    apellido = document.getElementById("id_input_apellido");
    localidad = document.getElementById("id_select_localidad");
    sexo = document.getElementsByClassName("radio");
    nombre.value = dataPersona[0].textContent;
    apellido.value = dataPersona[1].textContent;
    //country.options[country.options.selectedIndex].selected = true;
    //localidad.options[dataPersona[2].textContent].selected = true;
    //localidad.value = dataPersona[2].textContent;
    //localidad.options['Barracas'].selected = true;

    sexo.value = dataPersona[3].textContent;
    if(sexo.value == 'Male')
    {
        document.getElementById("id_sexoM").checked = true;
    }
    else
    {
        document.getElementById("id_sexoF").checked = true;
    }



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
                    PrecargarDataPersonaEnForm(data); 
                    GetLocalidades();
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






