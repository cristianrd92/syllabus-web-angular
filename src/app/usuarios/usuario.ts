import { Carrera } from '../carreras/carrera';
import { Perfil } from '../perfiles/perfil';

export class Usuario {
    id:number;
    username:string;
    password:string;
    nombres:string;
    rut_usuario:string;
    apellidos:string;
    email:string;
    first:boolean;
    nombre_corto:string;
    perfiles:Perfil[];
    perfil:Perfil[];
    carrera:number;
    roles:string[]=[];
}
