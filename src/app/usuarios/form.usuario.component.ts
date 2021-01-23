import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { Perfil } from '../perfiles/perfil';
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { PerfilService } from '../perfiles/perfil.service';
import { Carrera } from '../carreras/carrera';

@Component({
  selector: 'app-form',
  templateUrl: './form.usuario.component.html',
})
export class FormUsuarioComponent implements OnInit {
  public usuario: Usuario = new Usuario()
  perfiles: Perfil[];
  perfil: Perfil[];
  carreras: Carrera[];
  public titulo:string = "Crear Usuario"
  public errores:string[]
  public loading:boolean = false;
  // esJefe:boolean;

  constructor(private usuarioService: UsuarioService,private perfilService: PerfilService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _location: Location){ }

  ngOnInit(): void {
    // this.esJefe=false;
    this.cargarUsuario(),
    this.cargarPerfiles()
  }
  // esJefeF(e) {
  //   this.esJefe = e.target.checked;
  // }
  
  cargarPerfiles(): void {
    this.loading=true;
    this.perfilService.getPerfiles().subscribe(perfiles => { 
      delete(perfiles[0])
      delete(perfiles[2])
      var filtered = perfiles.filter(function (el) {
        return el != null;
      });
      this.perfiles = filtered ;
      this.loading=false;
    });
  }

  imprimirErrores(error){
    console.log(error);
  }

  cargarUsuario(): void {
    this.activedRoute.params.subscribe(params=> {
      let id = params['id']
      if (id){
        this.loading=true;
        this.titulo = "Editar Usuario";
        this.usuarioService.getUsuario(id).subscribe( (usuario) => {
          this.usuario = usuario;
          this.loading=false;
        })
      }
    })
  }

  create(): void{
    this.loading=true;
    this.usuario.perfiles = this.usuario.perfil
    this.usuario.username = this.usuario.rut_usuario.slice(0,-1);
    this.usuarioService.create(this.usuario)
    .subscribe(usuario => {
      this.router.navigate(['/usuarios'])
      this.loading=false;
      swal("Nuevo usuario", `Usuario creado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      this.loading=false;
    }
    );
  }

  update(): void{
    this.loading=true;
    this.usuario.perfiles = this.usuario.perfil
    this.usuario.username = this.usuario.rut_usuario.slice(0,-1);
    this.usuarioService.update(this.usuario)
    .subscribe(usuario => {
      this.router.navigate(['/usuarios'])
      this.loading=false;
      swal("Usuario actualizado", `Usuario actualizado con exito`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      this.loading=false;
    })
  }
  goBack(){
    this._location.back();
  }
  compararPerfil(o1:Perfil, o2:Perfil): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 == null || o2== null ? false: o1.id===o2.id;
  }
}
