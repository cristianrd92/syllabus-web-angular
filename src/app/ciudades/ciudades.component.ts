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

  ciudades: Ciudad[];
  dtOptions: DataTables.Settings = {};

  constructor( private ciudadService: CiudadService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.ciudadService.getCiudades().subscribe(
      ciudades => this.ciudades = ciudades
    );
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(ciudad: Ciudad): void {
    swal({
      title: `Esta seguro que desea eliminar la ciudad ${ciudad.nombre_ciudad} ?`,
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
        this.ciudadService.delete(ciudad.id).subscribe(
          response => {
            this.ciudades = this.ciudades.filter(ciu => ciu !== ciudad)
            swal(
              'Borrado!',
              'La ciudad ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
