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
        return Gato;
    }());
    animal.Gato = Gato;
})(animal || (animal = {}));
