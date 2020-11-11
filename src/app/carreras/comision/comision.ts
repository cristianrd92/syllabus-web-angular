import { Usuario } from 'src/app/usuarios/usuario';
import { Carrera } from '../carrera';

export class Comision {
  id: number;
  usuario: Usuario;
  carrera: Carrera;
}
