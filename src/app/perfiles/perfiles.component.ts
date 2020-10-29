import { Component, OnInit } from '@angular/core';
import { Perfil } from './perfil';
import { PerfilService } from './perfil.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfiles.component.html',
})
export class PerfilesComponent implements OnInit {

  perfiles: Perfil[];
  dtOptions: DataTables.Settings = {};

  constructor( private perfilService: PerfilService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.perfilService.getPerfiles().subscribe(
      perfiles => this.perfiles = perfiles
    );
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(perfil: Perfil): void {
    swal({
      title: `Esta seguro que desea eliminar el perfil de usuario ${perfil.name} ?`,
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
        this.perfilService.delete(perfil.id).subscribe(
          response => {
            this.perfiles = this.perfiles.filter(per => per !== perfil)
            swal(
              'Borrado!',
              'El perfil ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
