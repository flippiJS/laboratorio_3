var app = new function () {
    this.URL = 'http://localhost:3000/';
    this.materias = [];
    this.el = document.getElementById('tListado');

    // Metodo generico para reutilizar llamada
    this.httpService = function (path, method, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, this.URL + path, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send(data);
    };

    // Hacemos la llamada para obtener las materias
    this.ObtenerDatos = function () {
        that = this; // Guardamos scope
        MostrarCargando(true);
        this.httpService('materias', 'GET', null, function (err, data) {
            MostrarCargando(false);
            if (err === null) {
                that.materias = data;
                that.ArmarGrilla();
            }
        });
    };

    // Armamos la grilla con la lista de materias agregando cada uno de los elementos recibidos
    this.ArmarGrilla = function () {
        while (this.el.firstChild) {
            this.el.firstChild.remove();
        }
        if (this.materias.length > 0) {
            for (i = 0; i < this.materias.length; i++) {
                // Fila
                var trElemento = document.createElement("tr");
                // ID
                var tdId = document.createElement("td");
                var textId = document.createTextNode(this.materias[i].id);
                // Nombre
                var tdNombre = document.createElement("td");
                var textNombre = document.createTextNode(this.materias[i].nombre);
                // Cuatrimestre
                var tdCuatrimestre = document.createElement("td");
                var textCuatrimestre = document.createTextNode(this.materias[i].cuatrimestre);
                // Fecha final
                var tdfechaFinal = document.createElement("td");
                var textfechaFinal = document.createTextNode(this.materias[i].fechaFinal);
                // Turno
                var tdTurno = document.createElement("td");
                var textTurno = document.createTextNode(this.materias[i].turno);

                // Agregamos textos
                tdId.appendChild(textId);
                tdNombre.appendChild(textNombre);
                tdCuatrimestre.appendChild(textCuatrimestre);
                tdfechaFinal.appendChild(textfechaFinal);
                tdTurno.appendChild(textTurno);

                // Agregamos td al tr
                trElemento.appendChild(tdId);
                trElemento.appendChild(tdNombre);
                trElemento.appendChild(tdCuatrimestre);
                trElemento.appendChild(tdfechaFinal);
                trElemento.appendChild(tdTurno);

                // Evento on double click
                trElemento.setAttribute("ondblclick", 'app.OnAbrirPopUp(' + i + ')');

                // Push al dom
                this.el.appendChild(trElemento);
            }
        }
    };

    this.OnAbrirPopUp = function (item) {
        MostrarEditar();
        // Configuramos los botones
        document.getElementById("iBtnModificar").setAttribute("onclick", 'app.Modificar(' + this.materias[item].id + ',' + item + ')');
        document.getElementById("iBtnEliminar").setAttribute("onclick", 'app.Borrar(' + this.materias[item].id + ',' + item + ')');

        // Setemaos los datos de la materia
        document.getElementById("iNombre").value = this.materias[item].nombre;

        var select = document.getElementById("iCuatrimestre");
        select.options[this.materias[item].cuatrimestre].selected = true;

        document.getElementById("iCuatrimestre").disabled = true;
        document.getElementById("iMañana").checked = (this.materias[item].turno === 'Mañana');
        document.getElementById("iNoche").checked = (this.materias[item].turno === 'Noche');
        document.getElementById("iFecha").value = DateToHTMLFormat(StringToDate(this.materias[item].fechaFinal));
    }

    this.Modificar = function (id, i) {
        var iNombre = document.getElementById('iNombre');
        var iFecha = document.getElementById('iFecha');
        var iRadio = document.querySelector('input[name=nTurno]:checked').value;

        // Validaciones

        // Nombre debe tener más de 6 char
        if (iNombre.value.length < 6) {
            iNombre.classList.add("invalid");
        }

        // Fecha: debe ser mayor al dia de hoy
        if (!ValidarFecha(iFecha.value)) {
            iFecha.classList.add("invalid");
        }

        if (iNombre.value.length > 6 && iRadio !== null && ValidarFecha(iFecha.value)) {
            const request = {
                id: id,
                nombre: iNombre.value,
                cuatrimestre: this.materias[i].cuatrimestre,
                turno: iRadio,
                fechaFinal: FormatearFechaParaBack(iFecha.value)
            };

            // Impactamos
            that = this; // Guardamos scope
            MostrarCargando(true);
            this.httpService('editar', 'POST', JSON.stringify(request), function (err, res) {
                MostrarCargando(false);
                if (err === null) {
                    if (res.type === 'ok') {
                        that.materias[i] = request;
                        that.ArmarGrilla();
                        OcultarEditar();
                    }
                }
            });
        }

    };

    this.Borrar = function (id, i) {
        const request = {
            id: id
        }
        // Impactamos
        that = this; // Guardamos scope
        MostrarCargando(true);
        this.httpService('eliminar', 'POST', JSON.stringify(request), function (err, res) {
            if (err === null) {
                MostrarCargando(false);
                // Borramos el elemento
                console.log(res);
                if (res.type === 'ok') {
                    that.materias.splice(i, 1);
                    that.ArmarGrilla();
                    OcultarEditar();
                }
            }
        });
    };

}
// Inicializamos
app.ObtenerDatos();

function LimpiarInputs() {
    document.getElementById('spoiler').style.display = 'none';
}

function MostrarCargando(bool) {
    if (bool) {
        document.getElementById('cargando').style.display = 'block';

    } else {
        document.getElementById('cargando').style.display = 'none';

    }
}

function OcultarEditar() {
    document.getElementById('iPopUp').style.display = 'none';
}

function MostrarEditar() {
    document.getElementById('iPopUp').style.display = 'block';
}

function StringToDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[2], parts[1] - 1, parts[0])
}

function DateToHTMLFormat(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function ValidarFecha(date) {
    var varDate = new Date(date); //dd-mm-YYYY
    var today = new Date();

    return varDate > today;
}

function FormatearFechaParaBack(dateString){
    var p = dateString.split(/\D/g)
    return [p[1],p[2],p[0] ].join("/")
    }