"use strict";
var app;
(function (app) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        return Vehiculo;
    }());
    app.Vehiculo = Vehiculo;
})(app || (app = {}));
