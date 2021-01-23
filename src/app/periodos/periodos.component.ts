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
  dtOptions: DataTables.Settings = {};
  public loading:boolean=false;


  constructor( private periodoService: PeriodoService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.loading=true;
    this.periodoService.getPeriodos().subscribe(
      periodos => {
        this.periodos = periodos
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(periodo: Periodo): void {
    swal({
      title: `Esta seguro que desea eliminar el periodo ${periodo.nombre_periodo} ?`,
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
        this.periodoService.delete(periodo.id).subscribe(
          response => {
            this.periodos = this.periodos.filter(per => per !== periodo)
            this.loading=false;
            swal(
              'Borrado!',
              'El periodo ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
