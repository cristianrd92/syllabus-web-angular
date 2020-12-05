import { Component, OnInit } from '@angular/core';
import { MallaCurricular } from './malla_curricular';
import { MallaCurricularService } from './malla_curricular.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormMallaCurricularComponent implements OnInit {
  public malla: MallaCurricular = new MallaCurricular()
  public titulo:string = "Crear Malla"
  public errores:string[]

  constructor(private mallaService: MallaCurricularService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarMalla()
  }
  goBack(){
    this._location.back();
  }

  cargarMalla(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.mallaService.getMalla(id).subscribe( (malla) => this.malla = malla)
      }
    })
  }

  create(): void{
    this.mallaService.create(this.malla)
    .subscribe(malla => {
      this.router.navigate(['/mallas'])
      swal("Nueva malla", `Malla creada ${malla.descripcion_malla} con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.mallaService.update(this.malla)
    .subscribe(malla => {
      this.router.navigate(['/mallas'])
      swal("Malla actualizada", `Malla ${malla.descripcion_malla} actualizada con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }
}
