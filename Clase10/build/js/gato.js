"use strict";
var animal;
(function (animal) {
    var Gato = /** @class */ (function () {
        function Gato(nombre) {
            this.nombre = '';
            if (nombre) {
                this.nombre = nombre;
            }
        }
        Gato.prototype.hacerRuido = function () {
            return 'Miau';
        };
        Gato.prototype.getNombre = function () {
            return this.nombre;
        };
        Gato.prototype.getTipo = function () {
            return this.constructor.name;
        };
        return Gato;
    }());
    animal.Gato = Gato;
})(animal || (animal = {}));
