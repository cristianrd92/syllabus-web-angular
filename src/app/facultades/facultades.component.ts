import { Component, OnInit } from '@angular/core';
import { Facultad } from './facultad';
import { FacultadService } from './facultad.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-sese',
  templateUrl: './facultades.component.html',
})
export class FacultadesComponent implements OnInit {

  facultades: Facultad[];
  first:boolean=true;
  dtOptions: any = {};
  public loading:boolean=false

  constructor( private facultadService: FacultadService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.facultadService.getFacultades().subscribe(
      facultades => {
        this.facultades = [];
        facultades.forEach(facultad=>{
          if(facultad.vigente){
            this.facultades.push(facultad)
          }
          if(facultad.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.facultades.push(facultad);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables,
      // dom: 'Bfrtip',
      // buttons: [
      //   'copy',
      //   'print',
      //   'pdf',
      //   'excel',
      //   'csv'
      // ]
    };
  }
  
  desactivar(facultad: Facultad): void {
    swal({
      title: `¿Esta seguro que desea desactivar la facultad ${facultad.nombre_facultad}?`,
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
        this.facultadService.desactivar(facultad).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivada!',
              'La facultad ha sido desactivada',
              'success'
              )
          }
        )
      }
    })
  }

  activar(facultad: Facultad): void {
    swal({
      title: `¿Esta seguro que desea activar la facultad ${facultad.nombre_facultad}?`,
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
        this.facultadService.activar(facultad).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activada!',
              'La facultad ha sido activada',
              'success'
              )
          }
        )
      }
    })
  }

}
