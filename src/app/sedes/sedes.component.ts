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

  sedes: Sede[];
  dtOptions: DataTables.Settings = {};
  public loading= false;

  constructor( private sedeService: SedeService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.loading=true;
    this.sedeService.getSedes().subscribe(
      sedes => {
        this.sedes = sedes;
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(sede: Sede): void {
    swal({
      title: `Esta seguro que desea eliminar la sede ${sede.nombre_sede} ?`,
      text: "Esto no se podra revertir",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No, cancelar!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) =>{
      if (result.value){
        this.loading=true;
        this.sedeService.delete(sede.id).subscribe(
          response => {
            this.sedes = this.sedes.filter(sed => sed !== sede)
            this.loading=false;
            swal(
              'Borrado!',
              'La sede ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
