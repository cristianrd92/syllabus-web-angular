import { Component, OnInit } from '@angular/core';
import { Carrera } from './carrera';
import { CarreraService } from './carrera.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Facultad } from '../facultades/facultad';

@Component({
  selector: 'app-form',
  templateUrl: './form.carrera.component.html',
})
export class FormCarreraComponent implements OnInit {
  public carrera: Carrera = new Carrera()
  facultades: Facultad[];
  public titulo:string = "Crear Facultad"
  public errores:string[]

  constructor(private carreraService: CarreraService,
    private router: Router,
    private activedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarCarrera(),
    this.cargarFacultades()
  }

  cargarFacultades(): void {
    this.carreraService.getFacultades().subscribe(facultades => { this.facultades = facultades });
  }

  cargarCarrera(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.carreraService.getCarrera(id).subscribe( (carrera) => this.carrera = carrera)
      }
    })
  }

  create(): void{
    this.carreraService.create(this.carrera)
    .subscribe(carrera => {
      this.router.navigate(['/carreras'])
      swal("Nueva carrera", `Carrera creada ${carrera.nombre_carrera} con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.carreraService.update(this.carrera)
    .subscribe(carrera => {
      this.router.navigate(['/carreras'])
      swal("Carrera actualizada", `Carrera ${carrera.nombre_carrera} actualizada con exito`, 'success')
    },
    err => {
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
