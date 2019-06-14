"use strict";
function saludar(mi) {
    console.log(mi.hacerRuido());
}
var lista = new Array();
lista.push(new animal.Perro());
lista.push(new animal.Gato());
lista.forEach(saludar);
