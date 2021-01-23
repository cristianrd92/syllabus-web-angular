import { Component, OnInit } from '@angular/core';
import { MallaCurricular } from '../malla_curricular';
import { MallaCurricularService } from '../malla_curricular.service';
import swal from 'sweetalert2';
import { AuthService } from '../../usuarios/auth.service';
import { DatatablesEspaniol } from '../../helper/datatables.component';

@Component({
  selector: 'app-ciudades',
  templateUrl: './malla_carrera.component.html',
})
export class MallaCarreraComponent implements OnInit {

  mallas: MallaCurricular[];
  public loading:boolean = false;
  dtOptions: DataTables.Settings = {};

  constructor( private mallaService: MallaCurricularService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.loading=true;
    this.mallaService.getMallas().subscribe(
      mallas => {
        this.mallas = mallas;
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(malla: MallaCurricular): void {
    swal({
      title: `Esta seguro que desea eliminar la malla ${malla.descripcion_malla} ?`,
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
        this.mallaService.delete(malla.id).subscribe(
          response => {
            this.mallas = this.mallas.filter(mall => mall !== malla)
            this.loading=false;
            swal(
              'Borrado!',
              'La malla ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
