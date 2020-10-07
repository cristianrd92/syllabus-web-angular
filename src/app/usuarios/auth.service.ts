import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLSearchParams } from 'url';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario:Usuario):Observable<any> {
    const urlEndpoint = "http://localhost:8080/oauth/token";
    const credenciales = btoa( "angularapp" + ":" + "solucionesra");
    const httpHeaders = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded",
  'Authorization':"Basic "+ credenciales});
    let params = new HttpParams()
    .set("grant_type","password")
    .set("username",usuario.username)
    .set("password",usuario.password)
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});

  }
}
