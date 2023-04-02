import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  public url = GLOBAL.url;

  constructor(
    private _http: HttpClient) {
  }

  obtener_configuracion_general_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_configuracion_general_admin', { headers: headers });
  }

  actualizar_configuracion_general_admin(data: any, token: any): Observable<any> {
    if (data.logo != undefined) {
      //creamos las cabeceras de autentificacion de esta peticion
      let headers = new HttpHeaders({ 'Authorization': token });
      const fd = new FormData();
      fd.append('razon_social', data.razon_social);
      fd.append('slogan', data.slogan);
      fd.append('background', data.background);
      fd.append('canales', data.canales);
      fd.append('categorias', data.categorias);
      fd.append('logo', data.logo);
      return this._http.put(this.url + 'actualizar_configuracion_general_admin', fd, { headers: headers });

    } else {
      //creamos las cabeceras de autentificacion de esta peticion
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
      return this._http.put(this.url + 'actualizar_configuracion_general_admin', data, { headers: headers });
    }

  }

  actualizar_configuracion_finanza_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'actualizar_configuracion_finanza_admin', data, { headers: headers });
  }

  obtener_configuracion_finanza_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_configuracion_finanza_admin', { headers: headers });
  }

  verificar_token_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'verificar_token_admin', { headers: headers });
  }

  IsAuthenticate() {
    const token: any = localStorage.getItem('token');
    try {
      //creamos la instancia del paquete
      const helper = new JwtHelperService();
      //usamos el metodo decodeToken para decodificar el token
      var decodedToken = helper.decodeToken(token);

      //validamos si tenemos el token en el localstorage
      if (!token) {
        localStorage.clear();
        return false;
      }

      //validamos si el token es incorrecto es decirm no cumple conn el estandar de las 3 partes
      // header, payload, firma = 3 partes
      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
      // validamos si el token expiró
      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }

    } catch (error) {
      localStorage.clear();
      return false;
    }

    return true;
  }


}
