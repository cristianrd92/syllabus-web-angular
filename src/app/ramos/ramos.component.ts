import { Component, OnInit } from '@angular/core';
import { Ramo } from './ramo';
import { RamoService } from './ramo.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-ramos',
  templateUrl: './ramos.component.html',
})
export class RamosComponent implements OnInit {

  ramos: Ramo[];
  dtOptions: DataTables.Settings = {};
  public loading:boolean=false;
  first:boolean=true;

  constructor( private ramoService: RamoService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.ramoService.getRamos().subscribe(
      ramos => {
        this.ramos = [];
        ramos.forEach(ramo=>{
          if(ramo.vigente){
            this.ramos.push(ramo)
          }
          if(ramo.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.ramos.push(ramo);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }

  desactivar(ramo: Ramo): void {
    swal({
      title: `¿Esta seguro que desea desactivar el ramo ${ramo.nombre_ramo}?`,
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
        this.ramoService.desactivar(ramo).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivado!',
              'El ramo ha sido desactivado',
              'success'
              )
          }
        )
      }
    })
  }

  activar(ramo: Ramo): void {
    swal({
      title: `¿Esta seguro que desea activar el ramo ${ramo.nombre_ramo}?`,
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
        this.ramoService.activar(ramo).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activado!',
              'El ramo ha sido activado',
              'success'
              )
          }
        )
      }
    })
  }
}
