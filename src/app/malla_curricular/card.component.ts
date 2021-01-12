import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ramo } from '../ramos/ramo';
import { AuthService } from '../usuarios/auth.service';
import { MallaCurricular } from './malla_curricular';
import { MallaCurricularService } from './malla_curricular.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styles: [`
    :host {
      display: block;
      padding: 32px;
      border: 1px solid black;
      border-radius: 8px;
    }
    `]
  })
  export class CardComponent implements OnInit {
    
    ramos: Ramo[];
    malla: MallaCurricular;

    constructor( private mallaService: MallaCurricularService ,
        public authService: AuthService,
        private activedRoute: ActivatedRoute,
        ) { }
    ngOnInit(): void {
        this.cargarRamos()
     }

    cargarRamos(): void {
        this.activedRoute.params.subscribe(params=> {
          let id = params['id']
          this.malla = JSON.parse(localStorage.getItem('malla_obj'));
          this.mallaService.getRamosMalla(this.malla).subscribe(
              ramos => { 
                  this.ramos = ramos 
                });
        });
    }

  }