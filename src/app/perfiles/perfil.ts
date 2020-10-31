import { Role } from '../roles/rol';
import { Sede } from '../sedes/sede';

export class Perfil {
  id: number;
  name: string;
  descripcion: string;
  roles: Role[]
}
