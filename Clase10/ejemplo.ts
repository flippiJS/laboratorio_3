
let lista: Array<animal.Animal> = new Array<animal.Animal>();

$(document).ready(function () {
    $("#iGuardar").click(function () {
        agregar();
        $('#exampleModal').modal('hide');
    });
});

function agregar() {
    let nombre: string = String($('#iNombre').val());
    let tipo: string = String($('#iTipo').val());
    if (nombre != '') {
        if (tipo === 'P') { // Es perro
            lista.push(new animal.Perro(nombre));
        }
        if (tipo === 'G') { // Es Gato
            lista.push(new animal.Gato(nombre));
        }
    }
    limpiarInput();
    listar();
}

function modificar(e) {
    $('#exampleModal').modal('show');
    let idElemento = $(e).data("id");
}

function borrar(e) {
console.log(e);
}

function listar() {
    $("#tListado tr").remove();
    for (var i = 0; i < lista.length; i++) {
        let template = `<tr>
            <td>${lista[i].getNombre()}</td>
            <td>${lista[i].getTipo()}</td>
            <td><button type="button" class="btn btn-primary" data-id="${i}" onclick="modificar(this)" id="iEditar">Editar</button>
            <button type="button" class="btn btn-danger" data-id="${i}" onclick="borrar(this)" id="iBorrar">Borrar</button>
            </td>';
        </tr>`;
        $("#tListado").append(template);
    }
}

function limpiarInput() {
    $('#iNombre').val('');
    $('#iTipo').val('P');
}