import { Ramo } from "../ramos/ramo";
import { Usuario } from "../usuarios/usuario";
import { Planificacion } from "./planificacion/planificacion";

export class Revision{
    //PROPIAS DE LA CLASE
    id:number;
    comentarios:string;
    estado:string;
    fecha_subida:string;
    planificacion:Planificacion;
    usuario:Usuario;
    //ADICIONALES PARA FUNCIONAR REVISION
    id_planificacion:number;
    id_ramo:number;
    id_usuario:number;
    nombre_archivo:string;
    r_id:number;
    r_estado:string;
    r_comentarios:string;
    r_fecha_subida:string;
}