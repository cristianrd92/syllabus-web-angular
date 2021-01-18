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
  public loading = false;
  
  tabla = '';

  constructor(private perfilService: PerfilService,
    private roleService: RolService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location,
    private sanitized: DomSanitizer){ }

  ngOnInit(): void {
    this.cargarPerfiles()
  }
  goBack(){
    this._location.back();
  }

  tablaPermisos(permisos){
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
        let words = element.descripcion.split(" ")
        let nombre_p = ""
        for(let i = 1; i<words.length; i++){
           nombre_p+= words[i]+" "
        }
        this.tabla+='<tr><th>'+nombre_p.toLocaleUpperCase()+'</th>';
      }
      this.tabla+='<th><input type="checkbox" name="permiso" value="'+element.id+'"></th>'
    }
    this.tabla+='</tr>'
    this.tabla+='</tbody></table>'
    //this.html = this.sanitized.bypassSecurityTrustHtml(this.tabla);
  }

  tablaPermisosEditar(permisos,perfil:Perfil){
    console.log("Editando")
    console.log(perfil.permisos)
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
        let words = element.descripcion.split(" ")
        let nombre_p = ""
        for(let i = 1; i<words.length; i++){
           nombre_p+= words[i]+" "
        }
        this.tabla+='<tr><th>'+nombre_p.toLocaleUpperCase()+'</th>';
      }
      let estaElPermiso = perfil.permisos.some( vendor => vendor.id === element.id )
      if(estaElPermiso){
        this.tabla+='<th><input type="checkbox" checked name="permiso" value="'+element.id+'"></th>'
      }else{
        this.tabla+='<th><input type="checkbox" name="permiso" value="'+element.id+'"></th>'
      }
    }
    this.tabla+='</tr>'
    this.tabla+='</tbody></table>'
    //this.html = this.sanitized.bypassSecurityTrustHtml(this.tabla);
  }

  imprimir(){
    console.log("Cambio")
  }

  bind(): void {
    document.addEventListener("input", function (e) {
      alert(this);
    });
  }

  cargarPerfiles(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.perfilService.getPerfil(id).subscribe( (perfil) => {
          this.perfil = perfil;
          this.cargarPermisosEditar(perfil);
        } )
      }else{
        this.cargarPermisos()
      }
    })
  }

  cargarPermisos(): void {
    this.roleService.getRoles().subscribe(permisos => { 
      delete(permisos[0])
      delete(permisos[1])
      delete(permisos[2])
      var filtered = permisos.filter(function (el) {
        return el != null;
      });
      this.tablaPermisos(filtered);
      this.permisos = permisos;
    });
  }
  cargarPermisosEditar(perfil): void {
    this.roleService.getRoles().subscribe(permisos => { 
      delete(permisos[0])
      delete(permisos[1])
      delete(permisos[2])
      var filtered = permisos.filter(function (el) {
        return el != null;
      });
      this.tablaPermisosEditar(filtered,perfil);
      this.permisos = permisos;
    });
  }

 
   validar() {
    var checkboxes = document.querySelectorAll('input[name="permiso"]:checked'), values = [];
    Array.prototype.forEach.call(checkboxes, function(el) {
      if(parseInt(el.value) > 5 && parseInt(el.value) < 9){
        values.push(el.value)
          if(!values.includes(5)){
            values.push(5)
          }
      }else if(parseInt(el.value) > 9 && parseInt(el.value) < 13){
        values.push(el.value)
          if(!values.includes(9)){
            values.push(9)
          }
      }else if(parseInt(el.value) > 13 && parseInt(el.value) < 17){
        values.push(el.value)
          if(!values.includes(13)){
            values.push(13)
          }
      } else if(parseInt(el.value) > 17 && parseInt(el.value) < 21){
        values.push(el.value)
          if(!values.includes(17)){
            values.push(17)
          }
      }else if(parseInt(el.value) > 21 && parseInt(el.value) < 25){
        values.push(el.value)
          if(!values.includes(21)){
            values.push(21)
          }
      }else if(parseInt(el.value) > 25 && parseInt(el.value) < 29){
        values.push(el.value)
          if(!values.includes(25)){
            values.push(25)
          }
      }else if(parseInt(el.value) > 29 && parseInt(el.value) < 33){
        values.push(el.value)
          if(!values.includes(29)){
            values.push(29)
          }
      }else if(parseInt(el.value) > 33 && parseInt(el.value) < 37){
        values.push(el.value)
          if(!values.includes(33)){
            values.push(33)
          }
      }else if(parseInt(el.value) > 37 && parseInt(el.value) < 41){
        values.push(el.value)
          if(!values.includes(37)){
            values.push(37)
          }
      }else if(parseInt(el.value) > 41 && parseInt(el.value) < 45){
        values.push(el.value)
          if(!values.includes(41)){
            values.push(41)
          }
      }else if(parseInt(el.value) > 45 && parseInt(el.value) < 49){
        values.push(el.value)
          if(!values.includes(45)){
            values.push(45)
          }
      }else if(parseInt(el.value) > 49 && parseInt(el.value) < 53){
        values.push(el.value)
          if(!values.includes(49)){
            values.push(49)
          }
      }else if(parseInt(el.value) > 53 && parseInt(el.value) < 57){
        values.push(el.value)
          if(!values.includes(53)){
            values.push(53)
          }
      }
    });
    return values; 
  }

  create(): void{
    if(this.validar().length==0){
      swal("Campos Vacios","Debe seleccionar al menos un permiso para continuar","error");
    }else{
      this.loading = true;
      this.perfil.temporales = this.validar()
      this.perfilService.create(this.perfil)
      .subscribe(perfil => {
        this.loading = false;
        this.router.navigate(['/perfiles'])
        swal("Nuevo perfil", `Perfil creado con exito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[]
      }
      );
    }
  }

  update(): void{
    if(this.validar().length==0){
      swal("Campos Vacios","Debe seleccionar al menos un permiso para continuar","error");
    }else{
      this.loading = true;
      this.perfil.temporales = this.validar()
      this.perfilService.update(this.perfil)
      .subscribe(perfil => {
        this.loading = false;
        this.router.navigate(['/perfiles'])
        swal("Perfil actualizado", `Perfil actualizado con exito`, 'success')
      },
      err => {
        this.loading = false;
        this.errores = err.error.errors as string[]
      }
      )
    }
  }
}
