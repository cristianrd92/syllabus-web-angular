import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoDocenteService } from './ramo_docente.service';
import { AuthService } from '../usuarios/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from "../ramos_docentes/planificacion/modal.service";

@Component({
  selector: 'app-ramo-docente',
  templateUrl: './ramos-docentes.component.html',
})
export class RamosDocentesComponent implements OnInit {

  ramos_carreras: RamoCarrera[];
  ramoSeleccionado: RamoCarrera;
  constructor( private ramoCarreraService: RamoDocenteService ,
    private modalService: ModalService,
    public authService: AuthService) { }

  ngOnInit() {
    this.ramoCarreraService.getRamosCarreras().subscribe(
      ramos_carreras => this.ramos_carreras = ramos_carreras
    );
  }

  abrirModal(ramo: RamoCarrera){
    this.ramoSeleccionado = ramo;
    this.modalService.abrirModal();
  }
}
