import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoDocenteService } from './ramo_docente.service';
import { AuthService } from '../usuarios/auth.service';
import { ModalService } from "../ramos_docentes/planificacion/modal.service";
import { PlanificacionService } from './planificacion/planificacion.service';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { RamoCarreraEstado } from './ramo_carrera_estado';

@Component({
  selector: 'app-ramo-docente',
  templateUrl: './ramos-docentes.component.html',
})
export class RamosDocentesComponent implements OnInit {

  ramos_carreras: RamoCarrera[];
  faFile = faFilePdf;
  planificaciones: RamoCarreraEstado[];
  ramoSeleccionado: RamoCarrera;
  ramoEstado: RamoCarreraEstado;
  estado: boolean = false;

  constructor( private ramoCarreraService: RamoDocenteService ,
    private modalService: ModalService,
    public authService: AuthService,
    private planificacionService: PlanificacionService, ) { }

  ngOnInit() {
    //this.cargarRamos();
    this.cargarPlanificacion()
  }

  cargarRamos(){
    this.ramoCarreraService.getRamosCarreras().subscribe(
      ramos_carreras => this.ramos_carreras = ramos_carreras
    );
  }
  
  cargarPlanificacion(){
    this.planificacionService.getPlanificacionesEstado().subscribe(
      planificaciones => this.planificaciones = planificaciones
    );
  }

  abrirModal(ramo: RamoCarrera){
    this.ramoSeleccionado = ramo;
    this.modalService.abrirModal();
  }

  abrirModalDetalles(ramo: RamoCarreraEstado){
    this.ramoEstado = ramo;
    this.modalService.abrirModal();
  }

  showPDF(nombre_archivo): void {
    this.planificacionService.getPDF(nombre_archivo)
        .subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            link.download = nombre_archivo;
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            setTimeout(function () {
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
  }
}
