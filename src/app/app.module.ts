import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { CiudadService } from './ciudades/ciudad.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './ciudades/form.component';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es-CL';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { SedeService } from './sedes/sede.service';
import { SedesComponent } from './sedes/sedes.component';
import { FormSedeComponent } from './sedes/form.sede.component';


registerLocaleData(localeEs, 'es-CL');

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'ciudades', component:CiudadesComponent},
  {path: 'ciudades/form', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ciudades/form/:id', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'login', component:LoginComponent},
  {path: 'sedes', component:SedesComponent},
  {path: 'sedes/form', component:FormSedeComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'sedes/form/:id', component:FormSedeComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CiudadesComponent,
    SedesComponent,
    FormComponent,
    FormSedeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [CiudadService, SedeService, {provide: LOCALE_ID, useValue: 'es-CL'}, 
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
