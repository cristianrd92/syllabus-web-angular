import { RamoCarrera } from 'src/app/ramos_carreras/ramo_carrera';
import { Usuario } from '../../usuarios/usuario';

export class Planificacion {
  id: number;
  ruta: string;
  fecha_subida:string;
  usuario: Usuario;
  ramo: RamoCarrera;
}
 
