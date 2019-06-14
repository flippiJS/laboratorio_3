
function saludar(mi: animal.Animal) {
    console.log(mi.hacerRuido());
}

let lista: Array<animal.Animal> = new Array<animal.Animal>();
lista.push(new animal.Perro());
lista.push(new animal.Gato());

lista.forEach(saludar);