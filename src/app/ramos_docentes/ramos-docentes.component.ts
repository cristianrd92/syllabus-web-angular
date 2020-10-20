import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoDocenteService } from './ramo_docente.service';
import { AuthService } from '../usuarios/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from "../ramos_docentes/planificacion/modal.service";
import { PlanificacionService } from './planificacion/planificacion.service';

@Component({
  selector: 'app-ramo-docente',
  templateUrl: './ramos-docentes.component.html',
})
export class RamosDocentesComponent implements OnInit {

  ramos_carreras: RamoCarrera[];
  planificaciones: Object[];
  ramoSeleccionado: RamoCarrera;
  estado:string;
  constructor( private ramoCarreraService: RamoDocenteService ,
    private modalService: ModalService,
    public authService: AuthService,
    public planificacionService: PlanificacionService, ) { }

  ngOnInit() {
    this.ramoCarreraService.getRamosCarreras().subscribe(
      ramos_carreras => this.ramos_carreras = ramos_carreras
    ),
    this.planificacionService.getPlanificacionesEstado().subscribe(
      planificaciones => this.planificaciones = planificaciones
    );
  }

  verficarEstado(id_ramo){
    this.planificaciones.forEach(element => {
      if(element[3]==id_ramo && element[7]==null){
        this.estado= "Esperando aprobacion"
      }else if(element[3]==id_ramo && element[7]!=null){
        this.estado="Se imprime estado de planificacion"
      }else{
        this.estado="No Subido"
        return true
      }
    });
    return true
  }

  abrirModal(ramo: RamoCarrera){
    this.ramoSeleccionado = ramo;
    this.modalService.abrirModal();
  }
}
