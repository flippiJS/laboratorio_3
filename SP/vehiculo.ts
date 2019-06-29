namespace app {
    export abstract class Vehiculo {
        id: number;
        marca: string;
        modelo: string;
        precio: number;

        constructor(id: number, marca: string, modelo: string, precio: number) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }

        abstract getTipo(): string;
    }

}