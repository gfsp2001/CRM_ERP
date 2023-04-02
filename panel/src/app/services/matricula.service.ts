import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {


  public url = GLOBAL.url;

  constructor(
    //creamos una instancia de hhtpCliente para hacer peticiones a nuestro backend
    private _http: HttpClient) {
  }

  generar_matricula_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'generar_matricula_admin', data, { headers: headers });
  }

  enviar_matriculas_hoy(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'enviar_matriculas_hoy', { headers: headers });
  }

  enviar_matriculas_fechas(inicio: any, hasta: any, asesor: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'enviar_matriculas_fechas/' + inicio + '/' + hasta + '/' + asesor, { headers: headers });
  }

  send_invoice(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'send_invoice/' + id, { headers: headers });
  }

  obtener_matriculas_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_matriculas_admin/' + id, { headers: headers });
  }

  firmar_matricula_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'firmar_matricula_admin/' + id, data, { headers: headers });
  }

  cancelar_matricula_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'cancelar_matricula_admin/' + id, { headers: headers });
  }

  obtener_comentarios_matricula_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_comentarios_matricula_admin/' + id, { headers: headers });
  }


}
