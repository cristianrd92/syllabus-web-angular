import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(public authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

}
