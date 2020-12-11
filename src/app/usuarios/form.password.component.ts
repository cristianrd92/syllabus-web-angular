import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ChangePasswordForm } from './change.password';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.password.component.html',
})
export class FormPasswordComponent implements OnInit {
  public change: ChangePasswordForm = new ChangePasswordForm()
  public titulo:string = "Cambiar contraseña"
  public errores:string[];
  private _usuario: Usuario;
  showPassword: boolean;
  showPasswordNew: boolean;
  showPasswordCon: boolean;

  constructor(private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private _location: Location){ }
    
  ngOnInit(): void {
    this.showPassword = false;
    this.showPasswordNew = false;
    this.showPasswordCon = false;
  }
  showHidePassword(e) {
    this.showPassword = e.target.checked;
  }
  mostrarClavesNuevas(e) {
    this.showPasswordNew = e.target.checked;
    this.showPasswordCon = e.target.checked;
  }

  cambiarPassword(): void{
    this.change.username = sessionStorage.getItem("usuario")
    this._usuario = JSON.parse(sessionStorage.getItem("usuario")) as Usuario;
    
    this.change.username = this._usuario.username
    this.change.id = 1;

    this.usuarioService.cambiarPassword(this.change)
    .subscribe(change => {
      this.authService.logout()
      swal("Contraseña Cambiada", `Se ha cambiado la contraseña con exito, vuelva a iniciar sesión`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
      console.log(this.errores)
    }
    );
  }

  imprimirErrores(error){
    console.log(error);
  }

  goBack(){
    this._location.back();
  }

}
