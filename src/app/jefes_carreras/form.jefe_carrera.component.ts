import { Component, OnInit } from '@angular/core';
import { JefeCarrera } from './jefe_carrera';
import { JefeCarreraService } from './jefe_carrera.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';

import { Carrera } from '../carreras/carrera';
import { Usuario } from '../usuarios/usuario';


@Component({
  selector: 'app-form',
  templateUrl: './form.jefe_carrera.component.html',
})
export class FormJefeCarreraComponent implements OnInit {
  public jefe_carrera: JefeCarrera = new JefeCarrera()
  
  usuarios: Usuario[];
  carreras: Carrera[];


  public titulo:string = "Crear Jefe Carrera"
  public errores:string[]

  constructor(private jefeCarreraService: JefeCarreraService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarJefeCarrera(),
    this.cargarUsuarios(),
    this.cargarCarreras()
  }

  cargarUsuarios(): void {
    this.jefeCarreraService.getUsuarios().subscribe(usuarios => { this.usuarios = usuarios });
  }
  cargarCarreras(): void {
    this.jefeCarreraService.getCarreras().subscribe(carreras => { this.carreras = carreras });
  }

  cargarJefeCarrera(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.titulo ="Editar Jefe Carrera";
        this.jefeCarreraService.getJefeCarrera(id).subscribe( (jefe_carrera) => {
          console.log(jefe_carrera)
          this.jefe_carrera = jefe_carrera;
        })
      }
    })
  }

  create(): void{
    this.jefeCarreraService.create(this.jefe_carrera)
    .subscribe(jefe_carrera => {
      this.router.navigate(['/jefesCarreras'])
      swal("Nuevo jefe carrera", `Jefe carrera creado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.jefeCarreraService.update(this.jefe_carrera)
    .subscribe(carrera => {
      this.router.navigate(['/jefesCarreras'])
      swal("Jefe carrera actualizada", `Jefe carrera actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }
  goBack(){
    this._location.back();
  }
  compararUsuario(o1:Usuario, o2:Usuario): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
  compararCarrera(o1:Carrera, o2:Carrera): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
}
