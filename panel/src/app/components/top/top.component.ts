import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
declare var KTLayoutAside: any;
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  public token = localStorage.getItem('token');
  public user: any = {};
  public background = '';
  constructor(
    private _configuracionesService: ConfiguracionService,
    private _router: Router
  ) {
    let str_user: any = localStorage.getItem('user');
    this.user = JSON.parse(str_user);
    this.init_configuraciones();
  }

  ngOnInit(): void {
    setTimeout(() => {
      KTLayoutAside.init('kt_aside');
    }, 50);
  }

  init_configuraciones() {
    this._configuracionesService.obtener_configuracion_general_admin(this.token).subscribe(
      response => {
        this.background = response.data.background;
      })
  }

  logout() {
    localStorage.clear();
    //window.location.reload();
    this._router.navigate(['']);
  }

}
