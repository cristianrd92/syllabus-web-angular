import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from "sweetalert2";
import { Router } from '@angular/router';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap, faBookOpen, faBookReader, faUserLock, faUser, faTable, faHourglass } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title: string = 'Syllabus Web';
  // Se deben declarar todos los iconos que se usaran en el header
  faCity = faCity;
  faHourglass = faHourglass;
  faUserLock = faUserLock;
  faUser = faUser
  faBuilding= faBuilding;
  faTable = faTable;
  faUniversity= faUniversity;
  faCalendarAlt= faCalendarAlt;
  faHome= faHome;
  faGraduationCap = faGraduationCap;
  faBookOpen = faBookOpen;
  faBookReader = faBookReader;
  
  
  constructor(public authService:AuthService, private router: Router){}
  logout():void{
    swal("Logout","Has cerrado sesión con éxito","success");
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
