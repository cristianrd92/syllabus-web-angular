import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Sede } from '../sedes/sede';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

import { formatDate, Location } from '@angular/common';
import { Revision } from '../ramos_docentes/revision';
import { ComisionCarreraService } from '../carreras/comision/comision_carrera.service';
import { Planificacion } from '../ramos_docentes/planificacion/planificacion';
import { RamosDocentesComponent } from '../ramos_docentes/ramos-docentes.component';
import { PlanificacionService } from '../ramos_docentes/planificacion/planificacion.service';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.comision.component.html',
})
export class FormComisionComponent implements OnInit {
  
  public revision: Revision = new Revision()
 
  sedes: Sede[];
  faFile = faFilePdf;
  planificacion: Planificacion;
  public titulo:string = "Revisión"
  public errores:string[]
  
  constructor(private comisionService: ComisionCarreraService,
    private planificacionService: PlanificacionService,
    private router: Router,
    private authService: AuthService,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarPlanificacion()
  }
  goBack(){
    this._location.back();
  }

  aprobar(){
    this.revision.id_planificacion = this.planificacion.id
    this.revision.id_usuario = this.authService.usuario.id
    this.revision.estado = "Aprobado"
    console.log(this.revision)
      this.comisionService.crearRevision(this.revision)
      .subscribe(revision => {
        this.router.navigate(['/syllabusPendientes'])
        swal("Revisión guardada", `La revisión se realizo con exito, se envio correo de confirmación`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[]
      }
      );
  }
  rechazar(){
    this.revision.id_planificacion = this.planificacion.id
    this.revision.id_usuario = this.authService.usuario.id
    this.revision.estado = "Rechazado"
    console.log(this.revision)
      this.comisionService.crearRevision(this.revision)
      .subscribe(revision => {
        this.router.navigate(['/syllabusPendientes'])
        swal("Revisión guardada", `La revisión se realizo con exito, se envio correo de confirmación`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[]
      }
      );
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
  cargarPlanificacion(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.comisionService.getPlanificacion(id).subscribe(planificacion=>{
          this.planificacion = planificacion;          
        })
      }
    })
  }

}
