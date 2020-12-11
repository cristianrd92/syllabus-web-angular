import { Ramo } from '../ramos/ramo';
import { Semestre } from '../semestres/semestre';
import { MallaCurricular } from './malla_curricular';

export class DetalleMallaCurricular {
  id: number;
  malla_curricular: MallaCurricular;
  ramo:Ramo;
  semestre:Semestre;
}
