import { Component, OnInit } from '@angular/core';
import { Sede } from './sede';
import { SedeService } from './sede.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Ciudad } from '../ciudades/ciudad';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.sede.component.html',
})
export class FormSedeComponent implements OnInit {
  public sede: Sede = new Sede()
  ciudades: Ciudad[];
  public titulo:string = "Crear Sede"
  public errores:string[]

  constructor(private sedeService: SedeService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarSede(),
    this.cargarCiudades()
  }

  cargarCiudades(): void {
    this.sedeService.getCiudades().subscribe(ciudades => { this.ciudades = ciudades });
  }

  cargarSede(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.sedeService.getSede(id).subscribe( (sede) => this.sede = sede)
      }
    })
  }

  create(): void{
    this.sedeService.create(this.sede)
    .subscribe(sede => {
      this.router.navigate(['/sedes'])
      swal("Nueva sede", `Sede creada ${sede.nombre_sede} con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.sedeService.update(this.sede)
    .subscribe(sede => {
      this.router.navigate(['/sedes'])
      swal("Sede actualizada", `Sede ${sede.nombre_sede} actualizada con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }
  goBack(){
    this._location.back();
  }
  compararCiudad(o1:Ciudad, o2:Ciudad): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
}
