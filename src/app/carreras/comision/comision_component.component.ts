import { Component, OnInit } from '@angular/core';
import { Comision } from './comision';
import swal from 'sweetalert2';
import { DatatablesEspaniol } from '../../helper/datatables.component';
import { ComisionCarreraService } from './comision_carrera.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Carrera } from '../carrera';
import { CarreraService } from '../carrera.service';

@Component({
  selector: 'app-comision-carrera',
  templateUrl: './comision_carrera.component.html',
})
export class ComisionCarreraComponent implements OnInit {

  comisiones: Comision[];
  carrera: Carrera;
  dtOptions: DataTables.Settings = {};

  constructor( 
    private comisionService: ComisionCarreraService,
    private carreraService: CarreraService,
    public authService: AuthService,
    private activedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.carreraService.getCarrera(id).subscribe( (carrera) => this.carrera = carrera)
        this.comisionService.getComisiones(id).subscribe( (comisiones) => this.comisiones = comisiones)
      }
    })
    this.dtOptions = {
      language: DatatablesEspaniol.spanish_datatables
    };
  }

}
