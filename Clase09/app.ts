/*let a:number = 5;

console.log(a);*/

// namespace ---> /// <reference path=""/>
/*
namespace
export class
*/
class Persona{
    private _nombre:string;
    private _apellido:string;
    private _edad:number;
    
    constructor(nombre:string,apellido:string,edad:number){
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
    }

    public set Nombre(v : string) {
        this._nombre = v;
    }
    
    public set Apellido(v : string) {
        this._apellido = v;
    }
    public set Edad(v : number) {
        this._edad = v;
    }

    public get Nombre() : string {
        return this._nombre;
    }
    
    public get Apellido() : string {
        return this._apellido;
    }

    public get Edad() : number {
        return this._edad;
    }

    public presentarse(){
        console.log(`Hola soy ${this.Nombre} ${this.Apellido}`);
    }
}

class Empleado extends Persona{

    public sueldo: number;
    constructor(nombre:string,apellido:string,edad:number,sueldo:number){
        super(nombre,apellido,edad);
        this.sueldo = sueldo;
    }

    public presentarse(){
        super.presentarse();
    }
    
}


let p1 = new Persona("Facundo","Gauto",40); 

let emp1 = new Empleado("Jorge","Perez",45,1551);

p1.presentarse();
