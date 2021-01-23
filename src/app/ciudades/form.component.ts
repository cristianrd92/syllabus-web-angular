import { Component, OnInit } from '@angular/core';
import { Ciudad } from './ciudad';
import { CiudadService } from './ciudad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public ciudad: Ciudad = new Ciudad();
  public titulo:string = "Crear Ciudad";
  public errores:string[];
  public loading:boolean=false;

  constructor(private ciudadService: CiudadService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarCiudad()
  }
  goBack(){
    this._location.back();
  }

  cargarCiudad(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading = true
        this.titulo = "Editar ciudad"
        this.ciudadService.getCiudad(id).subscribe( (ciudad) => {
          this.ciudad = ciudad
          this.loading= false;
        })
      }
    })
  }

  create(): void{
    this.loading=true;
    this.ciudadService.create(this.ciudad)
    .subscribe(ciudad => {
      this.loading=false;
      this.router.navigate(['/ciudades']);
      swal("Nueva ciudad", `Ciudad creada ${ciudad.nombre_ciudad} con exito`, 'success');
    },
    err => {
      this.loading=false;
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.loading=true;
    this.ciudadService.update(this.ciudad)
    .subscribe(ciudad => {
      this.loading=false;
      this.router.navigate(['/ciudades'])
      swal("Ciudad actualizada", `Ciudad ${ciudad.nombre_ciudad} actualizada con exito`, 'success')
    },
    err => {
      this.loading=false;
      this.errores = err.error.errors as string[]
    }
    )
  }
}
