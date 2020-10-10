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
import { FormFacultadComponent } from './facultades/form.sede.component';
import { FacultadesComponent } from './facultades/facultades.component';
import { FacultadService } from './facultades/facultad.service';
import { CarrerasComponent } from './carreras/carreras.component';
import { FormCarreraComponent } from './carreras/form.carrera.component';
import { CarreraService } from './carreras/carrera.service';
import { PeriodosComponent } from './periodos/periodos.component';
import { FormPeriodoComponent } from './periodos/form.periodo.component';
import { PeriodoService } from './periodos/periodo.service';
import { RamosComponent } from './ramos/ramos.component';
import { FormRamoComponent } from './ramos/form.ramo.component';
import { RamoService } from './ramos/ramo.service';
import { RamosCarrerasComponent } from './ramos_carreras/ramos-carreras.component';
import { FormRamoCarreraComponent } from './ramos_carreras/form.ramo_carrera.component';
import { RamoCarreraService } from './ramos_carreras/ramo_carrera.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';


registerLocaleData(localeEs, 'es-CL');

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'ciudades', component:CiudadesComponent},
  {path: 'ciudades/form', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ciudades/form/:id', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'sedes', component:SedesComponent},
  {path: 'sedes/form', component:FormSedeComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'sedes/form/:id', component:FormSedeComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'facultades', component:FacultadesComponent},
  {path: 'facultades/form', component:FormFacultadComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'facultades/form/:id', component:FormFacultadComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'carreras', component:CarrerasComponent},
  {path: 'carreras/form', component:FormCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'carreras/form/:id', component:FormCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'periodos', component:PeriodosComponent},
  {path: 'periodos/form', component:FormPeriodoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'periodos/form/:id', component:FormPeriodoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ramos', component:RamosComponent},
  {path: 'ramos/form', component:FormRamoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ramos/form/:id', component:FormRamoComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ramosCarreras', component:RamosCarrerasComponent},
  {path: 'ramosCarreras/form', component:FormRamoCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},
  {path: 'ramosCarreras/form/:id', component:FormRamoCarreraComponent, canActivate: [AuthGuard, RoleGuard], data: {role:"ROLE_ADMIN"}},

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CiudadesComponent,
    SedesComponent,
    FacultadesComponent,
    CarrerasComponent,
    PeriodosComponent,
    RamosComponent,
    RamosCarrerasComponent,
    FormComponent,
    FormSedeComponent,
    FormFacultadComponent,
    FormCarreraComponent,
    FormPeriodoComponent,
    FormRamoComponent,
    FormRamoCarreraComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [CiudadService, SedeService, FacultadService, CarreraService, PeriodoService, 
              RamoService, RamoCarreraService, 
  {provide: LOCALE_ID, useValue: 'es-CL'}, 
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
