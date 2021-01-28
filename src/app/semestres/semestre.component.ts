import { Component, OnInit } from '@angular/core';
import { Semestre } from './semestre';
import { SemestreService } from './semestre.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-ciudades',
  templateUrl: './semestre.component.html',
})
export class SemestreComponent implements OnInit {

  semestres: Semestre[];
  public loading:boolean=false;
  dtOptions: DataTables.Settings = {};
  first:boolean=true;

  constructor( private semestreService: SemestreService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.semestreService.getSemestres().subscribe(
      semestres => {
        this.semestres = [];
        semestres.forEach(semestre=>{
          if(semestre.vigente){
            this.semestres.push(semestre)
          }
          if(semestre.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.semestres.push(semestre);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }

  desactivar(semestre: Semestre): void {
    swal({
      title: `¿Esta seguro que desea desactivar el semestre ${semestre.descripcion_semestre}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, desactivar",
      cancelButtonText: "No, cancelar",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) =>{
      if (result.value){
        this.loading=true;
        this.first=false;
        this.semestreService.desactivar(semestre).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivado!',
              'El semestre ha sido desactivado',
              'success'
              )
          }
        )
      }
    })
  }

  activar(semestre: Semestre): void {
    swal({
      title: `¿Esta seguro que desea activar el semestre ${semestre.descripcion_semestre}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, activar",
      cancelButtonText: "No, cancelar",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) =>{
      if (result.value){
        this.loading=true;
        this.first=false;
        this.semestreService.activar(semestre).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activado!',
              'El semestre ha sido activado',
              'success'
              )
          }
        )
      }
    })
  }
}
