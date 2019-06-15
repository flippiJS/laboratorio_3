"use strict";
var animal;
(function (animal) {
    var Perro = /** @class */ (function () {
        function Perro(nombre) {
            this.nombre = '';
            if (nombre) {
                this.nombre = nombre;
            }
        }
        Perro.prototype.hacerRuido = function () {
            return 'Guau';
        };
        Perro.prototype.getNombre = function () {
            return this.nombre;
        };
        Perro.prototype.getTipo = function () {
            return this.constructor.name;
        };
        return Perro;
    }());
    animal.Perro = Perro;
})(animal || (animal = {}));
