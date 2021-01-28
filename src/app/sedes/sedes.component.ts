import { Component, OnInit } from '@angular/core';
import { Sede } from './sede';
import { SedeService } from './sede.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-sese',
  templateUrl: './sedes.component.html',
})
export class SedesComponent implements OnInit {

  first:boolean=true;
  sedes: Sede[];
  dtOptions: DataTables.Settings = {};
  public loading= false;

  constructor( private sedeService: SedeService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.sedeService.getSedes().subscribe(
      sedes => {
        this.sedes = [];
        sedes.forEach(sede=>{
          if(sede.vigente){
            this.sedes.push(sede)
          }
          if(sede.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.sedes.push(sede);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  desactivar(sede: Sede): void {
    swal({
      title: `¿Esta seguro que desea desactivar la sede ${sede.nombre_sede}?`,
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
        this.sedeService.desactivar(sede).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivada!',
              'La sede ha sido desactivada',
              'success'
              )
          }
        )
      }
    })
  }

  activar(sede: Sede): void {
    swal({
      title: `Esta seguro que desea activar la sede ${sede.nombre_sede} ?`,
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
        this.sedeService.activar(sede).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activada!',
              'La sede ha sido activada',
              'success'
              )
          }
        )
      }
    })
  }
}
