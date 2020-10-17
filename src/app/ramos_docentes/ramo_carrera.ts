import { Carrera } from '../carreras/carrera';
import { Periodo } from '../periodos/periodo';
import { Ramo } from '../ramos/ramo';
import { Usuario } from '../usuarios/usuario';

export class RamoCarrera {
  id: number;
  creditos: number;
  usuario: Usuario;
  carrera: Carrera;
  ramo: Ramo;
  periodo: Periodo;
}
 
