import { Component, OnInit } from '@angular/core';
import { Ciudad } from './ciudad';
import { CiudadService } from './ciudad.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public ciudad: Ciudad = new Ciudad()
  public titulo:string = "Crear Ciudad"
  public errores:string[]

  constructor(private ciudadService: CiudadService,
    private router: Router,
    private activedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarCiudad()
  }

  cargarCiudad(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.ciudadService.getCiudad(id).subscribe( (ciudad) => this.ciudad = ciudad)
      }
    })
  }

  create(): void{
    this.ciudadService.create(this.ciudad)
    .subscribe(ciudad => {
      this.router.navigate(['/ciudades'])
      swal("Nueva ciudad", `Ciudad creada ${ciudad.nombre_ciudad} con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.ciudadService.update(this.ciudad)
    .subscribe(ciudad => {
      this.router.navigate(['/ciudades'])
      swal("Ciudad actualizada", `Ciudad ${ciudad.nombre_ciudad} actualizada con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }
}
