import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from './services/configuracion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'panel';

  constructor(
    private _configuracionService: ConfiguracionService,
    private _router: Router
  ) { }


  ngOnInit(): void {
    this._configuracionService.verificar_token_admin(localStorage.getItem('token')).subscribe(
      response => {
      },
      error => {
        localStorage.clear();
        this._router.navigate(['']);
      }
    )
  }
}
