





let listaDeVehiculos: Array<app.Vehiculo> = new Array<app.Vehiculo>();
// BKP
let listaDeVehiculosClone: Array<app.Vehiculo> = new Array<app.Vehiculo>();

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
        } else {
            $('th:nth-child(1)').hide();
            $('td:nth-child(1)').hide();
        }
    });

    $("#fMostrarMarca").change(function () {
        if ($(this).is(':checked')) {
            $('th:nth-child(2)').show();
            $('td:nth-child(2)').show();
        } else {
            $('th:nth-child(2)').hide();
            $('td:nth-child(2)').hide();
        }
    });

    $("#fMostrarModelo").change(function () {
        if ($(this).is(':checked')) {
            $('th:nth-child(3)').show();
            $('td:nth-child(3)').show();
        } else {
            $('th:nth-child(3)').hide();
            $('td:nth-child(3)').hide();
        }
    });

    $("#fMostrarPrecio").change(function () {
        if ($(this).is(':checked')) {
            $('th:nth-child(4)').show();
            $('td:nth-child(4)').show();
        } else {
            $('th:nth-child(4)').hide();
            $('td:nth-child(4)').hide();
        }
    });

});


function obtenerLista() {
    // buscamos la lista si existe
    if (localStorage.length > 0) {
        listaDeVehiculos = JSON.parse(localStorage.getItem('listaVehiculos'));
        listaDeVehiculosClone = [...listaDeVehiculos];
        listar();
    } else {
        localStorage.setItem('listaVehiculos', JSON.stringify(listaDeVehiculos));
    }
}

function agregar() {
    let id: number = obtenerUltimoId();
    let marca: string = String($('#fMarca').val());
    let modelo: string = String($('#fModelo').val());
    let precio: number = Number($('#fPrecio').val());
    let tipo: string = String($('#fTipo').val());
    if (marca != '' && modelo != '' && precio) {
        if (tipo === 'C') { // Es Camioneta
            let cuatroXCuatro: boolean = Boolean($('#fCuatroXCuatro').val());
            listaDeVehiculos.push(new app.Camioneta(id, marca, modelo, precio, cuatroXCuatro));
        }
        if (tipo === 'A') { // Es Auto
            let cantPuertas: number = Number($('#fCantPuertas').val());
            listaDeVehiculos.push(new app.Auto(id, marca, modelo, precio, cantPuertas));
        }
    }
    limpiarInput();
    listar();
    guardarData();
}


function mostrarOpcionVehiculo(tipo: string) {
    if (tipo === 'C') { // Es Camioneta
        $("#fCantPuertasDiv").hide();
        $("#fCuatroXCuatroDiv").show();
    }
    if (tipo === 'A') { // Es Auto
        $("#fCuatroXCuatroDiv").hide();
        $("#fCantPuertasDiv").show();
    }
}

function borrar(e: any) {
    let id = $(e).data("id");
    if (listaDeVehiculos[id]) {
        listaDeVehiculos.splice(id, 1);
        listar();
        guardarData();
    }
}

function listar() {
    $("#tListado tr").remove();
    for (var i = 0; i < listaDeVehiculos.length; i++) {
        let template = `<tr>
            <td>${listaDeVehiculos[i].id}</td>
            <td>${listaDeVehiculos[i].marca}</td>
            <td>${listaDeVehiculos[i].modelo}</td>
            <td>$ ${listaDeVehiculos[i].precio}</td>
            <td>${listaDeVehiculos[i].hasOwnProperty('cantidadPuertas') ? listaDeVehiculos[i].cantidadPuertas + ' puertas' : (listaDeVehiculos[i].cuatroXcuatro ? '4x4' : 'No 4x4')}</td>            
            <td>
            <button type="button" class="btn btn-danger" data-id="${i}" onclick="borrar(this)" id="iBorrar">Eliminar</button>
            </td>';
        </tr>`;
        $("#tListado").append(template);
    }
    obtenerPromedio();
}

function filtrar(tipo: string) {
    listaDeVehiculos = [...listaDeVehiculosClone];
    if (tipo !== 'Todos') {
        const key = (tipo === 'Auto') ? 'cantidadPuertas' : 'cuatroXcuatro';
        listaDeVehiculos = listaDeVehiculos.filter(vehiculo => vehiculo.hasOwnProperty(key));
    }
    listar();
}


function obtenerUltimoId(): number {
    const ultimoId = listaDeVehiculos.reduce((max, lista) => (lista.id > max ? lista.id : max), 0);
    return ultimoId + 1;
}

function obtenerPromedio() {
    const promedio = listaDeVehiculos.reduce((sum, value) => { return sum + value.precio; }, 0);
    if (promedio > 0) $('#fPromedio').val(promedio)
    else $('#fPromedio').val(0);
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
    listaDeVehiculosClone = [...listaDeVehiculos];
    localStorage.setItem('listaVehiculos', JSON.stringify(listaDeVehiculos));
}

function limpiarData() {
    localStorage.clear();
    listar();
}
