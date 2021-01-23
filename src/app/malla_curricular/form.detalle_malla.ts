import { Component, OnInit } from '@angular/core';
import { MallaCurricular } from './malla_curricular';
import { MallaCurricularService } from './malla_curricular.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Ramo } from '../ramos/ramo';
import { SemestreService } from '../semestres/semestre.service';
import { Semestre } from '../semestres/semestre';
import { DetalleMallaCurricular } from './detalle_malla_curricular';

@Component({
  selector: 'app-form',
  templateUrl: './form.detalle_malla.html',
})
export class FormDetalleMallaComponent implements OnInit {
  public detalle_malla: DetalleMallaCurricular = new DetalleMallaCurricular()
  public titulo:string = "Agregar ramo a malla";
  public errores:string[];

  constructor(public authService:AuthService,
    private semestreService: SemestreService,
    private mallaService: MallaCurricularService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

    private malla_id;
    ramos: Ramo[];
    malla: MallaCurricular;
    public loading:boolean=false;

    semestres: Semestre[];

  ngOnInit(): void {
    this.cargarDetalleMalla(),
    this.cargarRamos(),
    this.cargarSemestres()
  }
  goBack(){
    this._location.back();
  }

  cargarDetalleMalla(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.mallaService.getMalla(id).subscribe( (malla) => {
          this.malla = malla;
          this.loading=false;
        })
      }
    })
  }

  cargarRamos(): void {
      this.activedRoute.params.subscribe(params=> {
        let id = params['id']
        this.malla_id=id;
        this.malla = JSON.parse(localStorage.getItem('malla_obj'));
        this.mallaService.getRamosMalla(this.malla).subscribe(ramos => { 
          this.ramos = ramos 
        });
      });
  }
  cargarSemestres(): void {
    this.semestreService.getSemestres().subscribe(semestres =>{
      this.semestres = semestres;
    })
  }


  create(): void{
    this.loading=true;
    this.malla = JSON.parse(localStorage.getItem('malla_obj'));
    this.detalle_malla.malla_curricular = this.malla;
    this.mallaService.crearDetalle(this.detalle_malla)
    .subscribe(malla => {
      this.router.navigate(['/mallas/ramos/'+this.malla.id])
      this.loading=false;
      swal("Ramo asignado", `Ramo asignado con exito a la malla`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      this.loading=false;
    }
    );
  }
}
