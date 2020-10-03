import { Component, OnInit } from '@angular/core';
import { Docente } from './docente';
import { DocenteService } from './docente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
})
export class DocentesComponent implements OnInit {

  docentes: Docente[];

  constructor( private docenteService: DocenteService ) { }

  ngOnInit() {
    this.docenteService.getDocentes().subscribe(
      docentes => this.docentes = docentes
    );
  }
  delete(docente: Docente): void {
    swal({
      title: `Esta seguro que desea eliminar al docente ${docente.nombre} ${docente.apellido}?`,
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
        this.docenteService.delete(docente.id).subscribe(
          response => {
            this.docentes = this.docentes.filter(doc => doc !== docente)
            swal(
              'Borrado!',
              'El docente ha sido borrado',
              'success'
              )
          }
        )
      }
    })
  }
}
