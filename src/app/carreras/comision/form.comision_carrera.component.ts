import { Component, OnInit } from '@angular/core';
import { Comision } from './comision';
import { ComisionCarreraService } from './comision_carrera.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Usuario } from '../../usuarios/usuario';
import { Carrera } from '../carrera';

@Component({
  selector: 'app-form',
  templateUrl: './form.comision_carrera.component.html',
})

export class FormComisionCarreraComponent implements OnInit {

  public comision: Comision = new Comision();
  public usuarios: Usuario[];
  public titulo:string = "Asignar a carrera";
  public errores:string[];
  public carrera_id:number;
  public carrera: Carrera;

  constructor(private comisionService: ComisionCarreraService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarUsuariosSinComision()
  }
  
  goBack(){
    this._location.back();
  }

  cargarUsuariosSinComision(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      this.carrera_id=id;
      this.comisionService.getUsuarios(id).subscribe(usuarios => { 
      this.usuarios = usuarios 
      });
    });
  }

  create(): void{
    this.carrera = JSON.parse(localStorage.getItem('carrera_obj'));
    this.comision.carrera = this.carrera;
    this.comisionService.create(this.comision)
    .subscribe(comision => {
      this.router.navigate(['/carreras/comision/'+this.carrera_id])
      swal("Nuevo usuario a comisión", `Usuario agregado a comision con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    });
  }
}
