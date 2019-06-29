"use strict";
var listaDeVehiculos = new Array();
// BKP
var listaDeVehiculosClone = new Array();
$(document).ready(function () {
    // Obtenemos la lista
    obtenerLista();
    $("#fGuardar").click(function () {
        agregar();
        $('#exampleModal').modal('hide');
    });
    $("#fLimpiar").click(function () {
        limpiarData();
        listar();
    });
    $("#fTipo").change(function () {
        var tipo = String($(this).val());
        mostrarOpcionVehiculo(tipo);
    });
    $("#fBtnPromedio").click(function () {
        obtenerPromedio();
    });
    $("#fFiltro").change(function () {
        var tipo = String($(this).val());
        filtrar(tipo);
    });
    // Campos amostrar
    $("#fMostrarId").change(function () {
        if ($(this).is(':checked')) {
            $('th:nth-child(1)').show();
            $('td:nth-child(1)').show();
        }
        else {
            $('th:nth-child(1)').hide();
            $('td:nth-child(1)').hide();
        }
    });
    $("#fMostrarMarca").change(function () {
        if ($(this).is(':checked')) {
            $('th:nth-child(2)').show();
            $('td:nth-child(2)').show();
        }
        else {
            $('th:nth-child(2)').hide();
            $('td:nth-child(2)').hide();
        }
    });
    $("#fMostrarModelo").change(function () {
        if ($(this).is(':checked')) {
            $('th:nth-child(3)').show();
            $('td:nth-child(3)').show();
        }
        else {
            $('th:nth-child(3)').hide();
            $('td:nth-child(3)').hide();
        }
    });
    $("#fMostrarPrecio").change(function () {
        if ($(this).is(':checked')) {
            $('th:nth-child(4)').show();
            $('td:nth-child(4)').show();
        }
        else {
            $('th:nth-child(4)').hide();
            $('td:nth-child(4)').hide();
        }
    });
});
function obtenerLista() {
    // buscamos la lista si existe
    if (localStorage.length > 0) {
        listaDeVehiculos = JSON.parse(localStorage.getItem('listaVehiculos'));
        listaDeVehiculosClone = listaDeVehiculos.slice();
        listar();
    }
    else {
        localStorage.setItem('listaVehiculos', JSON.stringify(listaDeVehiculos));
    }
}
function agregar() {
    var id = obtenerUltimoId();
    var marca = String($('#fMarca').val());
    var modelo = String($('#fModelo').val());
    var precio = Number($('#fPrecio').val());
    var tipo = String($('#fTipo').val());
    if (marca != '' && modelo != '' && precio) {
        if (tipo === 'C') {
            var cuatroXCuatro = Boolean($('#fCuatroXCuatro').val());
            listaDeVehiculos.push(new app.Camioneta(id, marca, modelo, precio, cuatroXCuatro));
        }
        if (tipo === 'A') {
            var cantPuertas = Number($('#fCantPuertas').val());
            listaDeVehiculos.push(new app.Auto(id, marca, modelo, precio, cantPuertas));
        }
    }
    limpiarInput();
    listar();
    guardarData();
}
function mostrarOpcionVehiculo(tipo) {
    if (tipo === 'C') {
        $("#fCantPuertasDiv").hide();
        $("#fCuatroXCuatroDiv").show();
    }
    if (tipo === 'A') {
        $("#fCuatroXCuatroDiv").hide();
        $("#fCantPuertasDiv").show();
    }
}
function borrar(e) {
    var id = $(e).data("id");
    if (listaDeVehiculos[id]) {
        listaDeVehiculos.splice(id, 1);
        listar();
        guardarData();
    }
}
function listar() {
    $("#tListado tr").remove();
    for (var i = 0; i < listaDeVehiculos.length; i++) {
        var template = "<tr>\n            <td>" + listaDeVehiculos[i].id + "</td>\n            <td>" + listaDeVehiculos[i].marca + "</td>\n            <td>" + listaDeVehiculos[i].modelo + "</td>\n            <td>$ " + listaDeVehiculos[i].precio + "</td>\n            <td>" + (listaDeVehiculos[i].hasOwnProperty('cantidadPuertas') ? listaDeVehiculos[i].cantidadPuertas + ' puertas' : (listaDeVehiculos[i].cuatroXcuatro ? '4x4' : 'No 4x4')) + "</td>            \n            <td>\n            <button type=\"button\" class=\"btn btn-danger\" data-id=\"" + i + "\" onclick=\"borrar(this)\" id=\"iBorrar\">Eliminar</button>\n            </td>';\n        </tr>";
        $("#tListado").append(template);
    }
    obtenerPromedio();
}
function filtrar(tipo) {
    listaDeVehiculos = listaDeVehiculosClone.slice();
    if (tipo !== 'Todos') {
        var key_1 = (tipo === 'Auto') ? 'cantidadPuertas' : 'cuatroXcuatro';
        listaDeVehiculos = listaDeVehiculos.filter(function (vehiculo) { return vehiculo.hasOwnProperty(key_1); });
    }
    listar();
}
function obtenerUltimoId() {
    var ultimoId = listaDeVehiculos.reduce(function (max, lista) { return (lista.id > max ? lista.id : max); }, 0);
    return ultimoId + 1;
}
function obtenerPromedio() {
    var promedio = listaDeVehiculos.reduce(function (sum, value) { return sum + value.precio; }, 0);
    if (promedio > 0)
        $('#fPromedio').val(promedio);
    else
        $('#fPromedio').val(0);
}
function limpiarInput() {
    $('#fMarca').val('');
    $('#fModelo').val('');
    $('#fPrecio').val('');
    $('#fCuatroXCuatro').val('');
    $('#fCantPuertas').val('');
    $('#fTipo').val('C');
}
function guardarData() {
    listaDeVehiculosClone = listaDeVehiculos.slice();
    localStorage.setItem('listaVehiculos', JSON.stringify(listaDeVehiculos));
}
function limpiarData() {
    localStorage.clear();
    listar();
}
