import { Component, OnInit } from '@angular/core';
import { Facultad } from './facultad';
import { FacultadService } from './facultad.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-sese',
  templateUrl: './facultades.component.html',
})
export class FacultadesComponent implements OnInit {

  facultades: Facultad[];

  constructor( private facultadService: FacultadService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.facultadService.getFacultades().subscribe(
      facultades => this.facultades = facultades
    );
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
        this.facultadService.delete(facultad.id).subscribe(
          response => {
            this.facultades = this.facultades.filter(fac => fac !== facultad)
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
