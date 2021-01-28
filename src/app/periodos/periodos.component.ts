import { Component, OnInit } from '@angular/core';
import { Periodo } from './periodo';
import { PeriodoService } from './periodo.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from "../helper/datatables.component";

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
})
export class PeriodosComponent implements OnInit {

  periodos: Periodo[];
  first:boolean=true;
  dtOptions: DataTables.Settings = {};
  public loading:boolean=false;


  constructor( private periodoService: PeriodoService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.periodoService.getPeriodos().subscribe(
      periodos => {
        this.periodos = [];
        periodos.forEach(periodo=>{
          if(periodo.vigente){
            this.periodos.push(periodo)
          }
          if(periodo.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.periodos.push(periodo);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }

  desactivar(periodo: Periodo): void {
    swal({
      title: `¿Esta seguro que desea desactivar el periodo ${periodo.nombre_periodo}?`,
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
        this.periodoService.desactivar(periodo).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivado!',
              'El periodo ha sido desactivado',
              'success'
              )
          }
        )
      }
    })
  }

  activar(periodo: Periodo): void {
    swal({
      title: `¿Esta seguro que desea activar el periodo ${periodo.nombre_periodo}?`,
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
        this.periodoService.activar(periodo).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activado!',
              'El periodo ha sido activado',
              'success'
              )
          }
        )
      }
    })
  }

}
