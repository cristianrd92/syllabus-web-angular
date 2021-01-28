import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoCarreraService } from './ramo_carrera.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-ramo-carrera',
  templateUrl: './ramos-carreras.component.html',
})
export class RamosCarrerasComponent implements OnInit {

  ramos_carreras: RamoCarrera[];
  public loading:boolean=false;
  first:boolean=true;
  dtOptions: DataTables.Settings = {};

  constructor( private ramoCarreraService: RamoCarreraService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.ramoCarreraService.getRamosCarreras().subscribe(
      ramos_carreras => {
        this.ramos_carreras = [];
        ramos_carreras.forEach(ramo_carrera=>{
          if(ramo_carrera.vigente){
            this.ramos_carreras.push(ramo_carrera)
          }
          if(ramo_carrera.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.ramos_carreras.push(ramo_carrera);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  desactivar(ramo_carrera: RamoCarrera): void {
    swal({
      title: `¿Esta seguro que desea desactivar el ramo ${ramo_carrera.ramo.nombre_ramo} de la carrera ${ramo_carrera.carrera.nombre_carrera}?`,
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
        this.ramoCarreraService.desactivar(ramo_carrera).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivado!',
              'El ramo carrera ha sido desactivado',
              'success'
              )
          }
        )
      }
    })
  }

  activar(ramo_carrera: RamoCarrera): void {
    swal({
      title: `¿Esta seguro que desea activar el ramo ${ramo_carrera.ramo.nombre_ramo} de la carrera ${ramo_carrera.carrera.nombre_carrera}?`,
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
        this.ramoCarreraService.activar(ramo_carrera).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activado!',
              'El ramo carrera ha sido activado',
              'success'
              )
          }
        )
      }
    })
  }
}
