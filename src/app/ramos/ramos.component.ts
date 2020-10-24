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

  constructor( private ramoService: RamoService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.ramoService.getRamos().subscribe(
      ramos => this.ramos = ramos
    );
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(ramo: Ramo): void {
    swal({
      title: `Esta seguro que desea eliminar el ramo ${ramo.nombre_ramo} ?`,
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
        this.ramoService.delete(ramo.id).subscribe(
          response => {
            this.ramos = this.ramos.filter(ram => ram !== ramo)
            swal(
              'Borrado!',
              'El ramo ha sido borrado',
              'success'
              )
          }
        )
      }
    })
  }
}
