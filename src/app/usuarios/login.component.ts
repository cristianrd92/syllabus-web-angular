import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from "sweetalert2";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo:string = "Por favor Inicie Sesión";
  usuario:Usuario;

  constructor(public authService: AuthService, private router: Router) { 
    this.usuario= new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal("Login", "Ya te encuentras autenticado!", "info");
      this.router.navigate(['/home']);
    }
  }

  login():void {
    if(this.usuario.username==null || this.usuario.password==null){
      swal("Error Login","Usuario o contraseña vacias!","error");
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(["/home"]);
      swal("Login", "Hola "+ usuario.username +" has inicado sesián con éxito", "success");
    },err => {
      if(err.status == 400){
        swal("Error Login", "Usuario o clave incorrecta!","error");
      }
    }
   );  
  }

}
