import { Component, OnInit } from '@angular/core';
import { RamoCarrera } from './ramo_carrera';
import { RamoCarreraService } from './ramo_carrera.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';

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
  public loading:boolean=false;
  public titulo:string = "Crear Ramo Carrera";
  public errores:string[];
  public cont=0;

  constructor(private ramoCarreraService: RamoCarreraService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarUsuarios(),
    this.cargarRamos(),
    this.cargarCarreras(),
    this.cargarPeriodos(),
    this.cargarRamoCarrera()
  }

  cargarUsuarios(): void {
    this.loading=true;
    this.ramoCarreraService.getUsuarios().subscribe(usuarios => { 
      this.usuarios = usuarios;
      this.cont++;
      if(this.cont==4){
        this.loading=false;
      }
    });
  }
  cargarRamos(): void {
    this.loading=true;
    this.ramoCarreraService.getRamos().subscribe(ramos => { 
      this.ramos = ramos;
      this.cont++;
      if(this.cont==4){
        this.loading=false;
      }
    });
  }
  cargarPeriodos(): void {
    this.loading=true;
    this.ramoCarreraService.getPeriodos().subscribe(periodos => { 
      this.periodos = periodos;
      this.cont++;
      if(this.cont==4){
        this.loading=false;
      }
    });
  }
  cargarCarreras(): void {
    this.loading=true;
    this.ramoCarreraService.getCarreras().subscribe(carreras => { 
      this.carreras = carreras;
      this.cont++;
      if(this.cont==4){
        this.loading=false;
      }
    });
  }

  cargarRamoCarrera(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.titulo = "Editar Ramo Carrera"
        this.ramoCarreraService.getRamoCarrera(id).subscribe( (ramo_carrera) => {
          this.ramo_carrera = ramo_carrera;
          this.loading=false;
        })
      }
    })
  }

  create(): void{
    this.loading=true;
    this.ramoCarreraService.create(this.ramo_carrera)
    .subscribe(ramo_carrera => {
      this.router.navigate(['/ramosCarreras']);
      this.loading=false;
      swal("Nuevo ramo carrera", `Ramo carrera creado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      this.loading=false;
    });
  }

  update(): void{
    this.loading=true;
    this.ramoCarreraService.update(this.ramo_carrera)
    .subscribe(carrera => {
      this.router.navigate(['/ramosCarreras'])
      this.loading=false;
      swal("Ramo carrera actualizada", `Ramo carrera actualizado con exito`, 'success')
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
    this.cont++;
    if(o1===undefined && o2===undefined){
      return true;
    }
    if(this.cont==4){
      this.loading=false;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
  compararRamo(o1:Ramo, o2:Ramo): boolean{
    this.cont++;
    if(o1===undefined && o2===undefined){
      return true;
    }
    if(this.cont==4){
      this.loading=false;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
  compararPeriodo(o1:Periodo, o2:Periodo): boolean{
    this.cont++;
    if(o1===undefined && o2===undefined){
      return true;
    }
    if(this.cont==4){
      this.loading=false;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
  compararCarrera(o1:Carrera, o2:Carrera): boolean{
    this.cont++;
    if(o1===undefined && o2===undefined){
      return true;
    }
    if(this.cont==4){
      this.loading=false;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
}
