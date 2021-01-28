import { Component, OnInit } from '@angular/core';
import { Carrera } from './carrera';
import { CarreraService } from './carrera.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-carrera',
  templateUrl: './carreras.component.html',
})
export class CarrerasComponent implements OnInit {

  first:boolean=true;
  carreras: Carrera[];
  dtOptions: DataTables.Settings = {};
  public loading:boolean=false;

  constructor( private carreraService: CarreraService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.carreraService.getCarreras().subscribe(
      carreras => {
        this.carreras = [];
        carreras.forEach(carrera=>{
          if(carrera.vigente){
            this.carreras.push(carrera)
          }
          if(carrera.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.carreras.push(carrera);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  desactivar(carrera: Carrera): void {
    swal({
      title: `Esta seguro que desea desactivar la carrera ${carrera.nombre_carrera} ?`,
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
        this.carreraService.desactivar(carrera).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivada!',
              'La carrera ha sido desactivada',
              'success'
              )
          }
        )
      }
    })
  }

  activar(carrera: Carrera): void {
    swal({
      title: `Esta seguro que desea activar la carrera ${carrera.nombre_carrera} ?`,
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
        this.carreraService.activar(carrera).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activada!',
              'La carrera ha sido activada',
              'success'
              )
          }
        )
      }
    })
  }
}
