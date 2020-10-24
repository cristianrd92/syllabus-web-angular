import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoDocenteService } from './ramo_docente.service';
import { AuthService } from '../usuarios/auth.service';
import { ModalService } from "../ramos_docentes/planificacion/modal.service";
import { PlanificacionService } from './planificacion/planificacion.service';
import { faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ramo-docente',
  templateUrl: './ramos-docentes.component.html',
})
export class RamosDocentesComponent implements OnInit {

  ramos_carreras: RamoCarrera[];
  faFile = faFile;
  planificaciones: Object[];
  ramoSeleccionado: RamoCarrera;
  estado:string;
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
      // function(planificaciones){
      //   this.planificaiones = planificaciones
      //   console.log(planificaciones)
      // }
    );
  }
  imprimir(){
    console.log(this.planificaciones)
  }
  abrirModal(ramo: RamoCarrera){
    this.ramoSeleccionado = ramo;
    this.modalService.abrirModal();
  }

  showPDF(nombre_archivo): void {
    this.planificacionService.getPDF(nombre_archivo)
        .subscribe(x => {
            // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            var newBlob = new Blob([x], { type: "application/pdf" });
            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }
            // For other browsers: 
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            link.download = nombre_archivo;
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
  }
}
