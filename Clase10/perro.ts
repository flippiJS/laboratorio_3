namespace animal {
    export class Perro implements Animal {

        nombre: string = '';
        constructor(nombre?: string) {
            if (nombre) {
                this.nombre = nombre;
            }
        }
        hacerRuido(): string {
            return 'Guau';
        }
        getNombre(): string {
            return  this.nombre;
        }
        getTipo(): string {
            return this.constructor.name;
        }                
    }
}
