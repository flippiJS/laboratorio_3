var app = new function () {
    this.el = document.getElementById('tListado');
    this.personas = [];

    this.ObtenerDatos = function () {
        var data = '';
        if (this.personas.length > 0) {
            for (i = 0; i < this.personas.length; i++) {
                data += '<tr>';
                data += '<td>' + this.personas[i].nombre + '</td>';
                data += '<td>' + this.personas[i].apellido + '</td>';
                data += '<td><button class="btn btn-primary" onclick="app.Editar(' + i + ')">Editar</button>';
                data += '<button class="btn btn-danger" onclick="app.Borrar(' + i + ')">Borrar</button></td>';
                data += '</tr>';
            }
        }
        return this.el.innerHTML = data;
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