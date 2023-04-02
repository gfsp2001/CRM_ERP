import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { VentaService } from 'src/app/services/venta.service';
declare var $: any;
@Component({
  selector: 'app-index-venta',
  templateUrl: './index-venta.component.html',
  styleUrls: ['./index-venta.component.css']
})
export class IndexVentaComponent implements OnInit {

  public inicio = '';
  public hasta = '';
  public asesor = 'Todos';
  public load_data = true;
  public token = localStorage.getItem('token');

  public ventas: Array<any> = [];
  public ventas_const: Array<any> = [];
  public asesores: Array<any> = [];

  public page = 1;
  public pageSize = 10;

  constructor(
    private _ventaService: VentaService,
    private _colaboradorService: ColaboradorService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      $('.selectpicker').selectpicker();
    }, 150);
    this.init_asesores();
    this._route.queryParams.subscribe(
      (params: Params) => {
        this.inicio = params['inicio'];
        this.hasta = params['hasta'];
        this.asesor = params['asesor'];
        if (this.inicio && this.hasta && this.asesor) {
          this.init_ventas_fechas();
        } else {
          this.asesor = 'Todos';
          this.init_ventas_hoy();
        }
      });
  }

  init_ventas_hoy() {
    this.load_data = true;
    this._ventaService.enviar_ventas_hoy(this.token).subscribe(
      response => {
        this.ventas = response.data;
        this.ventas_const = this.ventas;
        this.load_data = false;
      });
  }

  init_asesores() {
    this._colaboradorService.listar_asesores_admin(this.token).subscribe(
      response => {
        this.asesores = response.data;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 150);
      })
  }

  filtrar() {
    if (!this.inicio) {
      $.notify('Ingrese la fecha inicio.', {
        type: 'danger',
        spacing: 10,
        timer: 1000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 500,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    } else if (!this.hasta) {
      $.notify('Ingrese la fecha de fin.', {
        type: 'danger',
        spacing: 10,
        timer: 1000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 500,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    } else if (!this.asesor) {
      $.notify('Seleccione el asesor.', {
        type: 'danger',
        spacing: 10,
        timer: 1000,
        placement: {
          from: 'top',
          align: 'right'
        },
        delay: 500,
        animate: {
          enter: 'animated ' + 'bounce',
          exit: 'animated ' + 'bounce'
        }
      });
    } else {
      this._router.navigate(['/ventas'], { queryParams: { inicio: this.inicio, hasta: this.hasta, asesor: this.asesor } })
    }
  }

  init_ventas_fechas() {

    this.load_data = true;
    this._ventaService.enviar_ventas_fechas(this.inicio, this.hasta, this.asesor, this.token).subscribe(
      response => {
        this.ventas = response.data;
        this.ventas_const = this.ventas;
        this.load_data = false;
      });

  }
}
