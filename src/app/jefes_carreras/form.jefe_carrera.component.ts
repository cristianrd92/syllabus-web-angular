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


  public titulo:string = "Asignar director de escuela";
  public errores:string[];
  public loading:boolean = false;
  public cont:number=0;
 
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
    this.loading=true;
    this.jefeCarreraService.getUsuarios().subscribe(usuarios => { 
      this.usuarios = usuarios;
      this.cont++;
      if(this.cont==2){
        this.loading=false;
      } 
    });
  }
  cargarCarreras(): void {
    this.loading=true;
    this.jefeCarreraService.getCarreras().subscribe(carreras => { 
      this.carreras = carreras 
      this.cont++;
      if(this.cont==2){
        this.loading=false;
      } 
    });
  }

  cargarJefeCarrera(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.titulo ="Editar director de escuela";
        this.jefeCarreraService.getJefeCarrera(id).subscribe( (jefe_carrera) => {
          this.jefe_carrera = jefe_carrera;
          this.loading=false;
        })
      }
    })
  }

  create(): void{
    this.loading=true;
    this.jefeCarreraService.create(this.jefe_carrera)
    .subscribe(jefe_carrera => {
      this.router.navigate(['/jefesCarreras'])
      this.loading=false;
      swal("Nuevo director de escuela", `Director de escuela asignado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      this.loading=false;
    });
  }

  update(): void{
    this.loading=true;
    this.jefeCarreraService.update(this.jefe_carrera)
    .subscribe(carrera => {
      this.router.navigate(['/jefesCarreras'])
      this.loading=false;
      swal("Director de escuela actualizado", `Director de escuela actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      this.loading=false;
    })
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
