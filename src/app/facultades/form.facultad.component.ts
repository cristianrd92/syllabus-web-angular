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
  public titulo:string = "Crear Facultad";
  public loading:boolean=false;
  public errores:string[];
  
  constructor(private facultadService: FacultadService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarSedes(),
    this.cargarFacultad()
  }
  goBack(){
    this._location.back();
  }

  cargarSedes(): void {
    this.loading=true;
    this.facultadService.getSedes().subscribe(sedes => { 
      this.sedes = sedes;
      this.loading=false;
    });
  }

  cargarFacultad(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.titulo = "Editar facultad"
        this.facultadService.getFacultad(id).subscribe( (facultad) => {
          this.facultad = facultad;
          this.loading=false;
        })
      }
    })
  }

  create(): void{
    this.loading=true;
    this.facultadService.create(this.facultad)
    .subscribe(facultad => {
      this.router.navigate(['/facultades'])
      this.loading=false;
      swal("Nueva facultad", `Facultad creada ${facultad.nombre_facultad} con exito`, 'success')
    },
    err => {
      this.loading=false;
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.loading=true;
    this.facultadService.update(this.facultad)
    .subscribe(facultad => {
      this.router.navigate(['/facultades'])
      this.loading=false;
      swal("Facultad actualizada", `Facultad ${facultad.nombre_facultad} actualizada con exito`, 'success')
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
