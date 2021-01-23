import { Component, OnInit } from '@angular/core';
import { Carrera } from './carrera';
import { CarreraService } from './carrera.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-carrera',
  templateUrl: './carreras.component.html',
})
export class CarrerasComponent implements OnInit {

  carreras: Carrera[];
  dtOptions: DataTables.Settings = {};
  public loading:boolean=false;

  constructor( private carreraService: CarreraService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.loading=true;
    this.carreraService.getCarreras().subscribe(
      carreras => {
        this.carreras = carreras;
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(carrera: Carrera): void {
    swal({
      title: `Esta seguro que desea eliminar la carrera ${carrera.nombre_carrera} ?`,
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
        this.carreraService.delete(carrera.id).subscribe(
          response => {
            this.carreras = this.carreras.filter(car => car !== carrera)
            this.loading=false;
            swal(
              'Borrado!',
              'La carrera ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
