import { Component, OnInit } from '@angular/core';
import { Carrera } from './carrera';
import { CarreraService } from './carrera.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Facultad } from '../facultades/facultad';

@Component({
  selector: 'app-form',
  templateUrl: './form.carrera.component.html',
})
export class FormCarreraComponent implements OnInit {
  public carrera: Carrera = new Carrera();
  facultades: Facultad[];
  public titulo:string = "Crear Carrera";
  public errores:string[];
  public loading:boolean=false;


  constructor(private carreraService: CarreraService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarCarrera(),
    this.cargarFacultades()
  }
  
  goBack(){
    this._location.back();
  }

  cargarFacultades(): void {
    this.loading=true;
    this.carreraService.getFacultades().subscribe(facultades => { 
      this.facultades = facultades;
       this.loading=false;
    });
  }

  cargarCarrera(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.titulo = "Editar Carrera"
        this.carreraService.getCarrera(id).subscribe( (carrera) => {
          this.carrera = carrera;
          this.loading=false;
        })
      }
    })
  }

  create(): void{
    this.loading=true;
    this.carreraService.create(this.carrera)
    .subscribe(carrera => {
      this.router.navigate(['/carreras'])
      this.loading=false;
      swal("Nueva carrera", `Carrera creada ${carrera.nombre_carrera} con exito`, 'success')
    },
    err => {
      this.loading=false;
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.loading=true;
    this.carreraService.update(this.carrera)
    .subscribe(carrera => {
      this.router.navigate(['/carreras'])
      this.loading=false;
      swal("Carrera actualizada", `Carrera ${carrera.nombre_carrera} actualizada con exito`, 'success')
    },
    err => {
      this.loading=false;
      this.errores = err.error.errors as string[]
    }
    )
  }

  compararFacultad(o1:Facultad, o2:Facultad): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
}
