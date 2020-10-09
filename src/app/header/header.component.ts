import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from "sweetalert2";
import { Router } from '@angular/router';
import { faCity } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title: string = 'Syllabus Web';
  faCity = faCity;
  constructor(public authService:AuthService, private router: Router){}
  logout():void{
    swal("Logout","Has cerrado sesión con éxito","success");
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
