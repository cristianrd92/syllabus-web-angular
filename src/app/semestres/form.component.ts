import { Component, OnInit } from '@angular/core';
import { Semestre } from './semestre';
import { SemestreService } from './semestre.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormSemestreComponent implements OnInit {
  public semestre: Semestre = new Semestre();
  public titulo:string = "Crear Semestre";
  public loading:boolean=false;
  public errores:string[];

  constructor(private semestreService: SemestreService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    this.cargarSemestre()
  }
  goBack(){
    this._location.back();
  }

  cargarSemestre(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.titulo="Editar Semestre";
        this.loading=true;
        this.semestreService.getSemestre(id).subscribe( (semestre) => {
          this.semestre = semestre;
          this.loading=false; 
        })
      }
    })
  }

  create(): void{
    this.loading=true;
    this.semestreService.create(this.semestre)
    .subscribe(semestre => {
      this.router.navigate(['/semestres'])
      this.loading=false;
      swal("Nuevo semestre", `Semestre creado ${semestre.descripcion_semestre} con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      this.loading=false;
    });
  }

  update(): void{
    this.loading=true;
    this.semestreService.update(this.semestre)
    .subscribe(semestre => {
      this.router.navigate(['/semestres'])
      this.loading=false;
      swal("Semestre actualizado", `Semestre ${semestre.descripcion_semestre} actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      this.loading=false;
    })
  }
}
