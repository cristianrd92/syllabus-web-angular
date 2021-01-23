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

  usuarios: Usuario[];
  dtOptions: DataTables.Settings = {};
  public loading:boolean = false;

  constructor( private usuarioService: UsuarioService ,
    public authService: AuthService) { }

  ngOnInit() {
    this.loading=true;
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
        this.loading=false;
      });
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }
  delete(usuario: Usuario): void {
    swal({
      title: `Esta seguro que desea eliminar el usuario ${usuario.username} ?`,
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
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(use => use !== usuario);
            this.loading=false;
            swal(
              'Borrado!',
              'El usuario ha sido borrada',
              'success'
              )
          }
        )
      }
    })
  }
}
