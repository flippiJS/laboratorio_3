var app = new function () {
    this.el = document.getElementById('tListado');
    this.personas = [];
    this.mostrarAgregar = document.getElementById('tListado');

    this.ObtenerDatos = function () {
        // Segunda forma
        while (this.el.firstChild) {
            this.el.firstChild.remove();
        }
        if (this.personas.length > 0) {
            for (i = 0; i < this.personas.length; i++) {
                var trElemento = document.createElement("tr");
                var tdNombre = document.createElement("td");
                var textNombre = document.createTextNode(this.personas[i].nombre);
                var tdApellido = document.createElement("td");
                var textApellido = document.createTextNode(this.personas[i].apellido);
                var tdAcciones = document.createElement("td");
                var btnEditar = document.createElement("button");
                var btnBorrar = document.createElement("button");

                btnEditar.setAttribute("class", "btn btn-primary");
                btnEditar.setAttribute("onclick", 'app.Editar(' + i + ')');
                btnEditar.innerHTML = "Editar";

                btnBorrar.setAttribute("class", "btn btn-danger");
                btnBorrar.setAttribute("onclick", 'app.Borrar(' + i + ')');
                btnBorrar.innerHTML = "Borrar";

                tdNombre.appendChild(textNombre);
                tdApellido.appendChild(textApellido);
                tdAcciones.appendChild(btnEditar);
                tdAcciones.appendChild(btnBorrar);

                trElemento.appendChild(tdNombre);
                trElemento.appendChild(tdApellido);
                trElemento.appendChild(tdAcciones);

                this.el.appendChild(trElemento);

                /*  
                Primera forma

                 data += '<tr>';
                 data += '<td>' + this.personas[i].nombre + '</td>';
                 data += '<td>' + this.personas[i].apellido + '</td>';
                 data += '<td><button class="btn btn-primary" onclick="app.Editar(' + i + ')">Editar</button>';
                 data += '<button class="btn btn-danger" onclick="app.Borrar(' + i + ')">Borrar</button></td>';
                 data += '</tr>'; */
            }
        }
    };
    this.Agregar = function () {
        var iNombre = document.getElementById('iNombre');
        var iApellido = document.getElementById('iApellido');
        if (iNombre.value && iApellido.value) {
            const persona = {
                nombre: iNombre.value,
                apellido: iApellido.value
            }
            // Agregamos a la persona
            this.personas.push(persona);
            // Borramos los inputs
            iNombre.value = '';
            iApellido.value = '';
            // Refrescamos la tabla
            this.ObtenerDatos();
            OcultarAgregar();
        }
    };
    this.Editar = function (item) {
        var el = document.getElementById('edit-name');
        // Mostramos el
        el.value = this.personas[item];
        // Mostramos para editar
        document.getElementById('valuespoiler').style.display = 'block';
        self = this;
        document.getElementById('saveEdit').onsubmit = function () {
            // Obtenemos a la persona
            var country = el.value;
            if (country) {
                // Modificamos el valor
                self.personas.splice(item, 1, country.trim());
                // Actualizamos la tabla
                self.ObtenerDatos();
                // Hide fields
                CloseInput();
            }
        }
    };
    this.Borrar = function (item) {
        // Borramos el elemento
        this.personas.splice(item, 1);
        // Actualizamos la lista
        this.ObtenerDatos();
    };

}
// Inicializamos
app.ObtenerDatos();

function LimpiarInputs() {
    document.getElementById('spoiler').style.display = 'none';
}

function OcultarAgregar() {
    document.getElementById('iAgregar').style.display = 'none';
    document.getElementById('btnAgregar').style.display = 'block';
}

function MostrarAgregar() {
    document.getElementById('btnAgregar').style.display = 'none';
    document.getElementById('iAgregar').style.display = 'block';
}