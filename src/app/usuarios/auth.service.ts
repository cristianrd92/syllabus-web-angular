import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalComponent } from '../global.component';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario():Usuario{
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem("usuario")!=null){
      this._usuario = JSON.parse(sessionStorage.getItem("usuario")) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }
  public get token():string{
    if(this._token!=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem("token")!=null){
      this._token = sessionStorage.getItem("token");
      return this._token;
    }
    return null;
  }

  login(usuario:Usuario):Observable<any> {
    const urlEndpoint = GlobalComponent.apiURL+"oauth/token";
    const credenciales = btoa( "angularapp" + ":" + "solucionesra");
    const httpHeaders = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded;charset=utf-8",
  'Authorization':"Basic "+ credenciales});
    let params = new HttpParams()
    .set("grant_type","password")
    .set("username",usuario.username)
    .set("password",usuario.password)
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  guardarUsuario(accessToken: string):void{
    let payload = this.obtenerDatosToken(accessToken);
    console.log(payload)
    this._usuario = new Usuario();
    this._usuario.id = payload.ref;
    this._usuario.nombres = this.utf8Decode(payload.nombres);
    this._usuario.apellidos = this.utf8Decode(payload.apellidos);
    this._usuario.email = payload.email;
    this._usuario.first = payload.first;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    this._usuario.carrera = payload.carrera
    sessionStorage.setItem("usuario", JSON.stringify(this._usuario));
  }

   utf8Decode(utf8String: string) {
    if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
    const unicodeString = utf8String.replace(
        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, 
        function(c) {
            var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
            return String.fromCharCode(cc); }
    ).replace(
        /[\u00c0-\u00df][\u0080-\u00bf]/g,    
        function(c) {
            var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
            return String.fromCharCode(cc); }
    );
    return unicodeString;
  }

  guardarToken(accessToken: string):void{
    this._token = accessToken;
    sessionStorage.setItem("token", accessToken);
  }

  obtenerDatosToken(accessToken: string):any{
    if(accessToken!=null){
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload!=null && payload.user_name && payload.user_name.length>0){
      return true;
    }
    return false;
  }

  hasRole(role):boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }

  hasRoleObject(role):boolean{
    console.log(role)
    for(var x=0;x<role.length;x++){
      if(this.usuario.roles.includes(role[x])){
        console.log("Entro")
        return true
      }
    }
  }

  logout():void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
}
