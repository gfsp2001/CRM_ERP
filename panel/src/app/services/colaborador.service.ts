import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  public url = GLOBAL.url;

  constructor(
    //creamos una instancia de hhtpCliente para hacer peticiones a nuestro backend
    private _http: HttpClient) {
  }

  //creamos nuestro servicio y lo colocamos como tipo observable y será de tipo any
  //un observable esta a la espera hasta que nosotros hagamos una subscripción
  login_admin(data: any): Observable<any> {
    //creamos las cabeceras de autentificacion de esta peticion
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login_admin', data, { headers: headers });
  }

  registro_colaborador_admin(data: any, token: any): Observable<any> {
    //creamos las cabeceras de autentificacion de esta peticion
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'registro_colaborador_admin', data, { headers: headers });
  }

  listar_colaboradores_admin(token: any): Observable<any> {
    //creamos las cabeceras de autentificacion de esta peticion
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'listar_colaboradores_admin', { headers: headers });
  }

  listar_asesores_admin(token: any): Observable<any> {
    //creamos las cabeceras de autentificacion de esta peticion
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'listar_asesores_admin', { headers: headers });
  }

  cambiar_estado_colaborador_admin(id: any, data: any, token: any): Observable<any> {
    //creamos las cabeceras de autentificacion de esta peticion
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'cambiar_estado_colaborador_admin/' + id, data, { headers: headers });
  }

  obtener_datos_colaborador_admin(id: any, token: any): Observable<any> {
    //creamos las cabeceras de autentificacion de esta peticion
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_datos_colaborador_admin/' + id, { headers: headers });
  }

  editar_colaborador_admin(id: any, data: any, token: any): Observable<any> {
    //creamos las cabeceras de autentificacion de esta peticion
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'editar_colaborador_admin/' + id, data, { headers: headers });
  }

  listar_docentes_admin(token: any): Observable<any> {
    //creamos las cabeceras de autentificacion de esta peticion
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'listar_docentes_admin', { headers: headers });
  }


}
