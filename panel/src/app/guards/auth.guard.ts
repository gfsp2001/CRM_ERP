import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfiguracionService } from '../services/configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _configuracionService: ConfiguracionService
  ) { }

  canActivate(): any {
    // aca llamamos a nuestro metodo el cual nos devuelve un true o false
    let access: any = this._configuracionService.IsAuthenticate();

    //validamos si nos devuelve un false redireccionamos a una ruta
    if (!access) {
      // redireccion para usuarios no permitidos
      this._router.navigate(['']);
    }

    // si el metodo devuelve un true llegara aqui, en este punto el acceso a la ruta será permitida
    return true;
  }



}
