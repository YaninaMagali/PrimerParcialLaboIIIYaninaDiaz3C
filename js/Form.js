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