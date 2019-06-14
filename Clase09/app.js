"use strict";
/*let a:number = 5;

console.log(a);*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Persona = /** @class */ (function () {
    function Persona(nombre, apellido, edad) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
    }
    Object.defineProperty(Persona.prototype, "Nombre", {
        get: function () {
            return this._nombre;
        },
        set: function (v) {
            this._nombre = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "Apellido", {
        get: function () {
            return this._apellido;
        },
        set: function (v) {
            this._apellido = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "Edad", {
        get: function () {
            return this._edad;
        },
        set: function (v) {
            this._edad = v;
        },
        enumerable: true,
        configurable: true
    });
    Persona.prototype.presentarse = function () {
        console.log("Hola soy " + this.Nombre + " " + this.Apellido);
    };
    return Persona;
}());
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado(nombre, apellido, edad, sueldo) {
        var _this = _super.call(this, nombre, apellido, edad) || this;
        _this.sueldo = sueldo;
        return _this;
    }
    Empleado.prototype.presentarse = function () {
        _super.prototype.presentarse.call(this);
    };
    return Empleado;
}(Persona));
var p1 = new Persona("Facundo", "Gauto", 40);
var emp1 = new Empleado("Jorge", "Perez", 45, 1551);
p1.presentarse();
