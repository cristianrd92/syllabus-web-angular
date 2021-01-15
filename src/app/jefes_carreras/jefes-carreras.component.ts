import { Component, OnInit } from '@angular/core';
import { JefeCarrera } from './jefe_carrera';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';
import { JefeCarreraService } from './jefe_carrera.service';

@Component({
  selector: 'app-jefe-carrera',
  templateUrl: './jefes-carreras.component.html',
})
export class JefesCarrerasComponent implements OnInit {

  jefes_carreras: JefeCarrera[];
  dtOptions: DataTables.Settings = {};

  constructor( private jefeCarreraService: JefeCarreraService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.jefeCarreraService.getJefesCarreras().subscribe(
      jefes_carreras => this.jefes_carreras = jefes_carreras
    );
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(jefe_carrera: JefeCarrera): void {
    swal({
      title: `Esta seguro que desea eliminar el director de escuela?`,
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
        this.jefeCarreraService.delete(jefe_carrera.id).subscribe(
          response => {
            this.jefes_carreras = this.jefes_carreras.filter(jef => jef !== jefe_carrera)
            swal(
              'Borrado!',
              'El director de escuela ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
