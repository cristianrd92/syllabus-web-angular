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
  first:boolean=true;
  public loading:boolean = false;

  constructor( private perfilService: PerfilService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.perfilService.getPerfiles().subscribe(perfiles => { 
      this.perfiles = [];
      delete(perfiles[0])
      delete(perfiles[1])
      delete(perfiles[2])
      delete(perfiles[3])
      perfiles.forEach(perfil=>{
        if(perfil.vigente){
          this.perfiles.push(perfil)
        }
        if(perfil.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
          this.perfiles.push(perfil);
        }
      })
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
  desactivar(perfil: Perfil): void {
    swal({
      title: `¿Esta seguro que desea desactivar el perfil ${perfil.name}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, desactivar",
      cancelButtonText: "No, cancelar",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) =>{
      if (result.value){
        this.loading=true;
        this.first=false;
        this.perfilService.desactivar(perfil).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivado!',
              'El perfil ha sido desactivado',
              'success'
              )
          }
        )
      }
    })
  }

  activar(perfil: Perfil): void {
    swal({
      title: `¿Esta seguro que desea activar el perfil ${perfil.name}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, activar",
      cancelButtonText: "No, cancelar",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) =>{
      if (result.value){
        this.loading=true;
        this.first=false;
        this.perfilService.activar(perfil).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activado!',
              'El perfil ha sido activado',
              'success'
              )
          }
        )
      }
    })
  }
}
