import { Component, OnInit } from '@angular/core';
import { Semestre } from './semestre';
import { SemestreService } from './semestre.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-ciudades',
  templateUrl: './semestre.component.html',
})
export class SemestreComponent implements OnInit {

  semestres: Semestre[];
  public loading:boolean=false;
  dtOptions: DataTables.Settings = {};

  constructor( private semestreService: SemestreService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.loading=true;
    this.semestreService.getSemestres().subscribe(
      semestres => {
        this.semestres = semestres;
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(semestre: Semestre): void {
    swal({
      title: `Esta seguro que desea eliminar el semestre ${semestre.descripcion_semestre} ?`,
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
        this.semestreService.delete(semestre.id).subscribe(
          response => {
            this.semestres = this.semestres.filter(mall => mall !== semestre)
            this.loading=false;
            swal(
              'Borrado!',
              'El semestre ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
