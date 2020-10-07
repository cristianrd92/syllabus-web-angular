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

  constructor(private authService: AuthService, private router: Router) { 
    this.usuario= new Usuario();
  }

  ngOnInit(): void {
  }

  login():void {
    console.log(this.usuario);
    if(this.usuario.username==null || this.usuario.password==null){
      swal("Error Login","Usuario o contraseña vacias!","error");
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      this.router.navigate(["/ciudades"]);
      swal("Login", "Hola "+ this.usuario.username +" has inicado sesion con exito", "success");
    });  

  }

}
