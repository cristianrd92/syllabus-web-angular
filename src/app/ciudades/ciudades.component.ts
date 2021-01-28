import { Component, OnInit } from '@angular/core';
import { Ciudad } from './ciudad';
import { CiudadService } from './ciudad.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
})
export class CiudadesComponent implements OnInit {

  first:boolean=true;
  ciudades: Ciudad[];
  dtOptions: DataTables.Settings = {};

  constructor( private ciudadService: CiudadService ,
    public authService: AuthService) { }
    public loading:boolean = false;

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.ciudadService.getCiudades().subscribe(
      ciudades => {
        this.ciudades = [];
        ciudades.forEach(ciudad=>{
          if(ciudad.vigente){
            this.ciudades.push(ciudad)
          }
          if(ciudad.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.ciudades.push(ciudad);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  desactivar(ciudad: Ciudad): void {
    swal({
      title: `Esta seguro que desea desactivar la ciudad ${ciudad.nombre_ciudad} ?`,
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
        this.ciudadService.desactivar(ciudad).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivada!',
              'La ciudad ha sido desactivada',
              'success'
              )
          }
        )
      }
    })
  }

  activar(ciudad: Ciudad): void {
    swal({
      title: `Esta seguro que desea activar la ciudad ${ciudad.nombre_ciudad} ?`,
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
        this.ciudadService.activar(ciudad).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activada!',
              'La ciudad ha sido activada',
              'success'
              )
          }
        )
      }
    })
  }
}
