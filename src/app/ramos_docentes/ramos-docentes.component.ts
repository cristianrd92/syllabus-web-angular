import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoDocenteService } from './ramo_docente.service';
import { AuthService } from '../usuarios/auth.service';
import { ModalService } from "../ramos_docentes/planificacion/modal.service";
import { PlanificacionService } from './planificacion/planificacion.service';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { RamoCarreraEstado } from './ramo_carrera_estado';
import { DatatablesEspaniol } from '../helper/datatables.component';
import swal from 'sweetalert2';
import { Planificacion } from './planificacion/planificacion';

@Component({
  selector: 'app-ramo-docente',
  templateUrl: './ramos-docentes.component.html',
})
export class RamosDocentesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  faFile = faFilePdf;
  planificaciones: RamoCarreraEstado[];
  ramoSeleccionado: RamoCarrera;
  ramoEstado: RamoCarreraEstado;
  public loading:boolean=false;

  constructor( private ramoCarreraService: RamoDocenteService ,
    private modalService: ModalService,
    public authService: AuthService,
    private planificacionService: PlanificacionService, ) { }

  ngOnInit() {
    this.loading=true;
    this.planificacionService.getPlanificacionesEstado().subscribe(
      planificaciones => {
        console.log(planificaciones)
        this.planificaciones = planificaciones;
        this.loading=false;
      }
    );
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  ngOnInitModal() {
    this.planificacionService.getPlanificacionesEstado().subscribe(
      planificaciones => {
        this.planificaciones = planificaciones;
      }
    );
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }

  abrirModal(ramo: RamoCarrera){
    this.ramoSeleccionado = ramo;
    this.modalService.abrirModal();
  }

  abrirModalDetalles(ramo: RamoCarreraEstado){
    this.ramoEstado = ramo;
    this.modalService.abrirModalD();
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

  delete(id: number): void {
    swal({
      title: `¿Está seguro que desea eliminar el syllabus?`,
      text: "Esto no se podrá revertir",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "No, cancelar",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) =>{
      if (result.value){
        this.loading=true;
        this.planificacionService.delete(id).subscribe(
          response => {
            this.ngOnInitModal();
            this.loading=false;
            swal(
              'Borrado!',
              'El syllabus ha sido borrado con éxito',
              'success'
              )
          }
        )
      }
    })
  }
}
