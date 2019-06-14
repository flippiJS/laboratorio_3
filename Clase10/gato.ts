namespace animal {
    export class Gato implements Animal {

        nombre: string = '';
        constructor(nombre?: string) {
            if (nombre) {
                this.nombre = nombre;
            }
        }
        hacerRuido(): string {
            return 'Miau';
        }
    }
}