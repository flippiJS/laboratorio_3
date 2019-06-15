"use strict";
var lista = new Array();
$(document).ready(function () {
    $("#iGuardar").click(function () {
        agregar();
        $('#exampleModal').modal('hide');
    });
});
function agregar() {
    var nombre = String($('#iNombre').val());
    var tipo = String($('#iTipo').val());
    if (nombre != '') {
        if (tipo === 'P') {
            lista.push(new animal.Perro(nombre));
        }
        if (tipo === 'G') {
            lista.push(new animal.Gato(nombre));
        }
    }
    limpiarInput();
    listar();
}
function modificar(e) {
    $('#exampleModal').modal('show');
    var idElemento = $(e).data("id");
}
function borrar(e) {
    console.log(e);
}
function listar() {
    $("#tListado tr").remove();
    for (var i = 0; i < lista.length; i++) {
        var template = "<tr>\n            <td>" + lista[i].getNombre() + "</td>\n            <td>" + lista[i].getTipo() + "</td>\n            <td><button type=\"button\" class=\"btn btn-primary\" data-id=\"" + i + "\" onclick=\"modificar(this)\" id=\"iEditar\">Editar</button>\n            <button type=\"button\" class=\"btn btn-danger\" data-id=\"" + i + "\" onclick=\"borrar(this)\" id=\"iBorrar\">Borrar</button>\n            </td>';\n        </tr>";
        $("#tListado").append(template);
    }
}
function limpiarInput() {
    $('#iNombre').val('');
    $('#iTipo').val('P');
}
