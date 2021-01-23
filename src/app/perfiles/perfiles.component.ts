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
  public loading:boolean = false;

  constructor( private perfilService: PerfilService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.loading=true;
    this.perfilService.getPerfiles().subscribe(perfiles => { 
      delete(perfiles[0])
      delete(perfiles[1])
      delete(perfiles[2])
      delete(perfiles[3])
      var filtered = perfiles.filter(function (el) {
        return el != null;
      });
      this.perfiles = filtered 
      this.loading=false;
    });
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
        this.loading=true;
        this.perfilService.delete(perfil.id).subscribe(
          response => {
            this.perfiles = this.perfiles.filter(per => per !== perfil)
            this.loading=false;
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
