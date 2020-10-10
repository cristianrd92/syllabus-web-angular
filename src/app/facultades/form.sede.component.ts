import { Component, OnInit } from '@angular/core';
import { Facultad } from './facultad';
import { FacultadService } from './facultad.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Sede } from '../sedes/sede';
import { Location } from '@angular/common';


@Component({
  selector: 'app-form',
  templateUrl: './form.facultad.component.html',
})
export class FormFacultadComponent implements OnInit {
  public facultad: Facultad = new Facultad()
  sedes: Sede[];
  public titulo:string = "Crear Facultad"
  public errores:string[]

  constructor(private facultadService: FacultadService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarFacultad(),
    this.cargarSedes()
  }
  goBack(){
    this._location.back();
  }

  cargarSedes(): void {
    this.facultadService.getSedes().subscribe(sedes => { this.sedes = sedes });
  }

  cargarFacultad(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.facultadService.getFacultad(id).subscribe( (facultad) => this.facultad = facultad)
      }
    })
  }

  create(): void{
    this.facultadService.create(this.facultad)
    .subscribe(facultad => {
      this.router.navigate(['/facultades'])
      swal("Nueva facultad", `Facultad creada ${facultad.nombre_facultad} con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.facultadService.update(this.facultad)
    .subscribe(facultad => {
      this.router.navigate(['/facultades'])
      swal("Facultad actualizada", `Facultad ${facultad.nombre_facultad} actualizada con exito`, 'success')
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
