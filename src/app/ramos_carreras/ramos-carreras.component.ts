import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoCarreraService } from './ramo_carrera.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-ramo-carrera',
  templateUrl: './ramos-carreras.component.html',
})
export class RamosCarrerasComponent implements OnInit {

  ramos_carreras: RamoCarrera[];

  constructor( private ramoCarreraService: RamoCarreraService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.ramoCarreraService.getRamosCarreras().subscribe(
      ramos_carreras => this.ramos_carreras = ramos_carreras
    );
  }
  delete(ramo_carrera: RamoCarrera): void {
    swal({
      title: `Esta seguro que desea eliminar el ramo carrera ?`,
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
        this.ramoCarreraService.delete(ramo_carrera.id).subscribe(
          response => {
            this.ramos_carreras = this.ramos_carreras.filter(ram_car => ram_car !== ramo_carrera)
            swal(
              'Borrado!',
              'El ramo carrera ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
