import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { DatatablesEspaniol } from '../helper/datatables.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {

  first:boolean=true;
  usuarios: Usuario[];
  dtOptions: DataTables.Settings = {};
  public loading:boolean = false;

  constructor( private usuarioService: UsuarioService ,
    public authService: AuthService) { }

  ngOnInit() {
    if(this.first){
      this.loading=true;
    }
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = [];
        usuarios.forEach(usuario=>{
          if(usuario.vigente){
            this.usuarios.push(usuario)
          }
          if(usuario.vigente==false && this.authService.hasPerfil("ROLE_ADMIN")) {
            this.usuarios.push(usuario);
          }
        })
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  desactivar(usuario: Usuario): void {
    swal({
      title: `Esta seguro que desea desactivar el usuario ${usuario.username} ?`,
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
        this.usuarioService.desactivar(usuario).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Desactivado!',
              'El usuario ha sido desactivado',
              'success'
              )
          }
        )
      }
    })
  }

  activar(usuario: Usuario): void {
    swal({
      title: `Esta seguro que desea activar el usuario ${usuario.username} ?`,
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
        this.usuarioService.activar(usuario).subscribe(
          response => {
            this.loading=false;
            this.ngOnInit();
            swal(
              '¡Activado!',
              'El usuario ha sido activado',
              'success'
              )
          }
        )
      }
    })
  }
}
