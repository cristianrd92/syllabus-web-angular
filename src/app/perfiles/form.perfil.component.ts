import { Component, OnInit } from '@angular/core';
import { Perfil } from './perfil';
import { PerfilService } from './perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Role } from '../roles/rol';
import { RolService } from '../roles/rol.service';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.perfil.component.html',
})
export class FormPerfilComponent implements OnInit {
  public perfil: Perfil = new Perfil()
  public titulo:string = "Crear Perfil"
  roles: Role[];
  public errores:string[]
  checkboxes={};
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  constructor(private perfilService: PerfilService,
    private roleService: RolService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

    html:string;

  ngOnInit(): void {
    this.cargarPerfiles(),
    this.cargarRoles()
  }
  goBack(){
    this._location.back();
  }

  cargarPerfiles(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.perfilService.getPerfil(id).subscribe( (perfil) => {
          this.perfil = perfil;
          console.log(this.checkboxes)
          console.log(perfil)
        } )
      }
    })
  }

  cargarRoles(): void {
    this.roleService.getRoles().subscribe(roles => { this.roles = roles });
  }

  create(): void{
    this.perfilService.create(this.perfil)
    .subscribe(perfil => {
      this.router.navigate(['/perfiles'])
      swal("Nuevo perfil", `Perfil creado ${perfil.name} con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    );
  }

  update(): void{
    this.perfilService.update(this.perfil)
    .subscribe(perfil => {
      this.router.navigate(['/perfiles'])
      swal("Perfil actualizado", `Perfil ${perfil.name} actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[]
    }
    )
  }

}
