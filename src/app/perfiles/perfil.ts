import { Permiso } from '../roles/rol';
import { Sede } from '../sedes/sede';

export class Perfil {
  id: number;
  name: string;
  descripcion: string;
  permisos: Permiso[];
  temporales: any[];
}
