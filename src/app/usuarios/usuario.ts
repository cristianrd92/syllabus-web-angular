import { Carrera } from '../carreras/carrera';
import { Perfil } from '../perfiles/perfil';

export class Usuario {
    id:number;
    username:string;
    password:string;
    nombres:string;
    apellidos:string;
    email:string;
    perfiles:Perfil[];
    carrera:Carrera;
    roles:string[]=[];
}
