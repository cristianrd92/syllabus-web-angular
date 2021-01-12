import { Component, ElementRef, OnInit } from '@angular/core';
import { Perfil } from './perfil';
import { PerfilService } from './perfil.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Permiso } from '../roles/rol';
import { RolService } from '../roles/rol.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-form',
  templateUrl: './form.perfil.component.html',
})
export class FormPerfilComponent implements OnInit {
  public perfil: Perfil = new Perfil()
  public titulo:string = "Crear Perfil"
  permisos: Permiso[];
  public errores:string[];
  public elementos: ElementRef;
  
  tabla = '';

  constructor(private perfilService: PerfilService,
    private roleService: RolService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location,
    private sanitized: DomSanitizer){ }

    html:SafeHtml;

  ngOnInit(): void {
    this.cargarRoles(),
    this.cargarPerfiles()
  }
  goBack(){
    this._location.back();
  }

  checkedTickets = [];

  onCheck(evt) {
    if (!this.checkedTickets.includes(evt)) {
      this.checkedTickets.push(evt);
    } else {
      var index = this.checkedTickets.indexOf(evt);
      if (index > -1) {
        this.checkedTickets.splice(index, 1);
      }
    }
    console.log(this.checkedTickets);
  }
  

  cargarPermisos(permisos){
    this.tabla+='<table class="table table-responsive table-dark">';
    this.tabla+='<thead>'
    this.tabla+='<tr><th scope="col">Nombre</th>'    
    this.tabla+='<th scope="col">Ver</th>' 
    this.tabla+='<th scope="col">Crear</th>' 
    this.tabla+='<th scope="col">Modificar</th>' 
    this.tabla+='<th scope="col">Eliminar</th></tr>' 
    this.tabla+='</thead>'
    this.tabla+='<tbody>'
    for (let index = 0; index < permisos.length; index++) {
      const element = permisos[index];
      if(index%4==0){
        this.tabla+='<tr><th>'+element.descripcion+'</th>';
      }
      this.tabla+='<th><input type="checkbox" (change)="onCheck('+element.id+')" [(NgModel)]="perfil.permisos" [value]="'+element.id+'"></th>'
    }
    this.tabla+='</tr>'
    this.tabla+='</tbody></table>'
    //this.html = this.sanitized.bypassSecurityTrustHtml(this.tabla);
  }

  cargarPerfiles(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.perfilService.getPerfil(id).subscribe( (perfil) => {
          this.perfil = perfil;
          console.log(perfil)
        } )
      }
    })
  }

  cargarRoles(): void {
    this.roleService.getRoles().subscribe(permisos => { 
      this.cargarPermisos(permisos);
      this.permisos = permisos;
    });
  }

  create(): void{
    console.log(this.perfil)
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
