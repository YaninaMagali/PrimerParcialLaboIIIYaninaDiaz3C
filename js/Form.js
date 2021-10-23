function AgregarOptionADropdown(opciones)
{
    var dropdown = document.getElementById("id_select_localidad");
    opciones.forEach(element => {
        var opt = document.createElement('option');
        opt.value = [element.nombre];
        opt.innerHTML = [element.nombre];
        dropdown.appendChild(opt);
    })
}
function GetFormData(elementId) 
{
    return document.getElementById(elementId).value;
}

function GetPersonaData()
{
    var nombre = GetFormData("id_input_nombre");
    var apellido  = GetFormData("id_input_apellido");
    var localidad = GetFormData("id_select_localidad");
    var sexo = GetFormData("id_sexoM");

    return [nombre, apellido, localidad, sexo];
}

function ValidarNombre()
{
    var validacion = true;
    var nombre = GetFormData("id_input_nombre")
    if(nombre.length<4)
    {
        document.getElementById('id_input_nombre').style.borderColor = "red";
        validacion = false;
    }
    return validacion;
}

function ValidarApellido()
{
    var validacion = true;
    var nombre = GetFormData("id_input_apellido")
    if(nombre.length<4)
    {
        console.log("ValidarApellido");
        document.getElementById('id_input_apellido').style.borderColor = "red";
        var validacion = false;
    }
    return validacion;
}

function ValidarData()
{
    var resultado = true;

    if(!ValidarNombre() || !ValidarApellido())
    {
        resultado = false;
    }
         
    return resultado;
}

function GetLocalidades()
{
    var http = new XMLHttpRequest();
    http.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var auxData = this.response;
            var localidades = JSON.parse(auxData);
            AgregarOptionADropdown(localidades);
        }
    }
    http.open("GET", "http://localhost:3000/localidades", true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
}


function PostModificarPersona()
{
    var persona = GetPersonaData();
    if(persona != null)
    {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                if(ValidarData())
                {
                    OcultarModal();
                }
            }
            
        }
        http.open("POST", "http://localhost:3000/editar", true);
        var auxData = {'nombre': persona[0], 'apellido': persona[1], 'localidad': persona[2], 'sexo': persona[3]};
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify(auxData));
}}