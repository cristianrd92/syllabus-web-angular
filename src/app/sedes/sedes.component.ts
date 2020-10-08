import { Component, OnInit } from '@angular/core';
import { Sede } from './sede';
import { SedeService } from './sede.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-sese',
  templateUrl: './sedes.component.html',
})
export class SedesComponent implements OnInit {

  sedes: Sede[];

  constructor( private sedeService: SedeService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.sedeService.getSedes().subscribe(
      sedes => this.sedes = sedes
    );
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
        this.sedeService.delete(sede.id).subscribe(
          response => {
            this.sedes = this.sedes.filter(sed => sed !== sede)
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
