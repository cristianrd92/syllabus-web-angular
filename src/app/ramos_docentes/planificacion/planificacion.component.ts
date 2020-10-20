import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Planificacion } from './planificacion';
import sw from "sweetalert2";
import { PlanificacionService } from './planificacion.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';


@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css'],
})
export class PlanificacionComponent implements OnInit {

  @Input() planificacion: Planificacion;
  titulo: "Subida de Syllabus";
  archivoSeleccionado: File;
  nombre_archivo: "";
  progreso: number = 0;
  ramo_id: number = 0; 
  constructor( public authService: AuthService, 
    public planificacionService: PlanificacionService, 
    public modalService: ModalService) { }

  ngOnInit() { 
    
  }

  selecionarArchivo(event){
    this.progreso = 0;
    this.archivoSeleccionado = event.target.files[0];
    this.nombre_archivo = event.target.files[0].name
    if(this.archivoSeleccionado.type.indexOf("pdf")<0){
      sw("Error","Archivo selecionado no valido");
      this.archivoSeleccionado=null;
    }
  }

  subirArchivo(){
    if(!this.archivoSeleccionado){
      swal("Error","Debe seleccionar un archivo");
    }else{
    this.planificacionService.subirArchivo(this.archivoSeleccionado, 
      this.authService.usuario.id, this.planificacion.ramo.id).subscribe(event=>{
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100)
        }else if(event.type === HttpEventType.Response){
          this.cerrarModal();
          swal("Exito!", "El archivo fue cargado con exito");
        }
      });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.archivoSeleccionado= null;
    this.progreso=0;
  }
}
