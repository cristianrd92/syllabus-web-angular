import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoDocenteService } from './ramo_docente.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-ramo-docente',
  templateUrl: './ramos-docentes.component.html',
})
export class RamosDocentesComponent implements OnInit {

  ramos_carreras: RamoCarrera[];

  constructor( private ramoCarreraService: RamoDocenteService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.ramoCarreraService.getRamosCarreras().subscribe(
      ramos_carreras => this.ramos_carreras = ramos_carreras
    );
  }
}
