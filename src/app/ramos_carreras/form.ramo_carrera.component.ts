import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoCarreraService } from './ramo_carrera.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

import { Carrera } from '../carreras/carrera';
import { Usuario } from '../usuarios/usuario';
import { Periodo } from '../periodos/periodo';
import { Ramo } from '../ramos/ramo';


@Component({
  selector: 'app-form',
  templateUrl: './form.ramo_carrera.component.html',
})
export class FormRamoCarreraComponent implements OnInit {
  public ramo_carrera: RamoCarrera = new RamoCarrera()
  
  usuarios: Usuario[];
  ramos: Ramo[];
  periodos: Periodo[];
  carreras: Carrera[];


  public titulo:string = "Crear Ramo Carrera"
  public errores:string[]

  constructor(private ramoCarreraService: RamoCarreraService,
    private router: Router,
    private activedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarRamoCarrera(),
    this.cargarUsuarios(),
    this.cargarRamos(),
    this.cargarCarreras(),
    this.cargarPeriodos()
  }

  cargarUsuarios(): void {
    this.ramoCarreraService.getUsuarios().subscribe(usuarios => { this.usuarios = usuarios });
  }
  cargarRamos(): void {
    this.ramoCarreraService.getRamos().subscribe(ramos => { this.ramos = ramos });
  }
  cargarPeriodos(): void {
    this.ramoCarreraService.getPeriodos().subscribe(periodos => { this.periodos = periodos });
  }
  cargarCarreras(): void {
    this.ramoCarreraService.getCarreras().subscribe(carreras => { this.carreras = carreras });
  }

  cargarRamoCarrera(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.ramoCarreraService.getRamoCarrera(id).subscribe( (ramo_carrera) => this.ramo_carrera = ramo_carrera)
      }
    })
  }

  create(): void{
    this.ramoCarreraService.create(this.ramo_carrera)
    .subscribe(ramo_carrera => {
      this.router.navigate(['/ramosCarreras'])
      swal("Nuevo ramo carrera", `Ramo carrera creado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.ramoCarreraService.update(this.ramo_carrera)
    .subscribe(carrera => {
      this.router.navigate(['/ramosCarreras'])
      swal("Ramo carrera actualizada", `Ramo carrera actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }

  compararUsuario(o1:Usuario, o2:Usuario): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
  compararRamo(o1:Ramo, o2:Ramo): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
  compararPeriodo(o1:Periodo, o2:Periodo): boolean{
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
