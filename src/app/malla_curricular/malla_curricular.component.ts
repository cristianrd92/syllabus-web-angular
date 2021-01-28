import { Component, OnInit } from '@angular/core';
import { MallaCurricular } from './malla_curricular';
import { MallaCurricularService } from './malla_curricular.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-ciudades',
  templateUrl: './malla_curricular.component.html',
})
export class MallaCurricularComponent implements OnInit {

  mallas: MallaCurricular[];
  dtOptions: DataTables.Settings = {};
  public loading:boolean = false;
  first:boolean=true;

  constructor( private mallaService: MallaCurricularService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.mallaService.getMallas().subscribe(
      mallas => {
        this.mallas = [];
        mallas.forEach(malla=>{
          if(malla.vigente){
            this.mallas.push(malla)
          }
          if(malla.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.mallas.push(malla);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  desactivar(malla: MallaCurricular): void {
    swal({
      title: `¿Esta seguro que desea desactivar la malla ${malla.descripcion_malla}?`,
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
        this.mallaService.desactivar(malla).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivada!',
              'La malla ha sido desactivada',
              'success'
              )
          }
        )
      }
    })
  }

  activar(malla: MallaCurricular): void {
    swal({
      title: `¿Esta seguro que desea activar la malla ${malla.descripcion_malla}?`,
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
        this.mallaService.activar(malla).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activada!',
              'La malla ha sido activada',
              'success'
              )
          }
        )
      }
    })
  }
}
