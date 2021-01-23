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
  dtOptions: any = {};
  public loading:boolean=false

  constructor( private facultadService: FacultadService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.loading=true;
    this.facultadService.getFacultades().subscribe(
      facultades => {
        this.facultades = facultades;
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
  delete(facultad: Facultad): void {
    swal({
      title: `Esta seguro que desea eliminar la facultad ${facultad.nombre_facultad} ?`,
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
        this.facultadService.delete(facultad.id).subscribe(
          response => {
            this.facultades = this.facultades.filter(fac => fac !== facultad)
            this.loading=false;
            swal(
              'Borrado!',
              'La facultad ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
