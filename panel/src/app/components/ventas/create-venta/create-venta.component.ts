import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { VentaService } from 'src/app/services/venta.service';
declare var $: any;

@Component({
  selector: 'app-create-venta',
  templateUrl: './create-venta.component.html',
  styleUrls: ['./create-venta.component.css']
})
export class CreateVentaComponent implements OnInit {

  public token = localStorage.getItem('token');
  public url = GLOBAL.url;
  public filtro_variedad = '';
  public load_data = false;
  public load_variedades = true;
  public load_btn = false;


  public venta: any = {
    canal: '',
    origen: 'Interno',
    estado: 'Procesando',
  };

  public filtro_cliente = '';
  public total = 0;

  public clientes: Array<any> = [];
  public variedades: Array<any> = [];
  public variedades_const: Array<any> = [];
  public detalles: Array<any> = [];
  public canales: Array<any> = [];

  public variedad_selected: any = {};


  constructor(
    private _clienteService: ClienteService,
    private _ventaService: VentaService,
    private _configuracionesService: ConfiguracionService,
    private _router: Router
  ) {
    this.init_config();
  }

  ngOnInit(): void {
    this.init_clientes();
    this.init_variedades();
  }

  init_clientes() {
    this.load_data = true;
    this._clienteService.listar_clientes_ultimos30_admin(this.token).subscribe(response => {
      this.clientes = response.data;
      this.load_data = false;
    })
  }

  seleccionar_cliente(item: any) {
    this.venta.cliente = item._id;
    $('#inp_cliente').val(item.fullnames);
    $('#modalCliente').modal('hide');
  }


  filtrar_cliente() {
    if (this.filtro_cliente) {
      this.load_data = true;
      this._clienteService.listar_clientes_modal_admin(this.filtro_cliente, this.token).subscribe(response => {
        this.clientes = response.data;
        this.load_data = false;
      })
    } else {
      this.clientes = [];
      this.init_clientes();
    }
  }

  init_config() {
    this._configuracionesService.obtener_configuracion_general_admin(this.token).subscribe(
      response => {
        let canales = response.data.canales.split(',');
        for (var item of canales) {
          this.canales.push(item.trim());
        }
      })
  }

  init_variedades() {
    this.load_variedades = true;
    this.variedades = [];
    this._ventaService.obtener_variedades_admin(this.token).subscribe(
      response => {

        for (var item of response.data) {
          item.cantidad_detalle = 0;
          if (item.producto.precio >= 1) {
            this.variedades.push(item);
          }
        }

        this.variedades_const = this.variedades;
        this.load_variedades = false;
      });
  }

  filtrar_variedades() {
    if (this.filtro_variedad) {
      var term = new RegExp(this.filtro_variedad, 'i');
      this.variedades = this.variedades_const.filter(item => term.test(item.producto.titulo));
    } else {
      this.variedades = this.variedades_const;
    }
  }

  aumentar(idx: any) {
    this.variedades[idx].cantidad_detalle = this.variedades[idx].cantidad_detalle + 1;
  }

  disminuir(idx: any) {
    if (this.variedades[idx].cantidad_detalle >= 1) {
      this.variedades[idx].cantidad_detalle = this.variedades[idx].cantidad_detalle - 1;
    } else {
      $.notify('cantidad menor a 0.', {
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
    }
  }

  seleccionar_variedad(item: any, idx: any) {
    if (item.cantidad_detalle >= 1) {
      if (item.cantidad_detalle <= item.stock) {

        $('.fila-variedad').removeClass('bg-gris');
        $('#variedad-' + idx).addClass('bg-gris');
        this.variedad_selected = item;

      } else {
        $.notify('La cantidad excede el stock actual.', {
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
      }
    } else {
      $.notify('cantidad menor a 0.', {
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
    }

  }

  agregar_detalle() {
    if (!this.variedad_selected._id) {
      $.notify('Debe seleccionar un producto.', {
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
      this.detalles.push({
        producto: this.variedad_selected.producto._id,
        variedad: this.variedad_selected._id,
        titulo_v: this.variedad_selected.titulo,
        titulo: this.variedad_selected.producto.titulo,
        portada: this.variedad_selected.producto.portada,
        cantidad: this.variedad_selected.cantidad_detalle,
        precio: this.variedad_selected.producto.precio,
      });
      $('.fila-variedad').removeClass('bg-gris');
      let subtotal = this.variedad_selected.cantidad_detalle * this.variedad_selected.producto.precio;
      this.total = this.total + subtotal;
    }

  }

  eliminar_detalle(idx: any, subtotal: any) {
    this.detalles.splice(idx, 1);
    this.total = this.total - subtotal;
  }

  ingresar_venta() {
    this.venta.detalles = this.detalles;
    this.venta.monto = this.total;
    if (!this.venta.cliente) {
      $.notify('Seleccione al cliente.', {
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
    } else if (!this.venta.canal) {
      $.notify('Seleccione el canal', {
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
    } else if (this.detalles.length == 0) {
      $.notify('Agregue un producto en la venta.', {
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
    } else if (!this.venta.metodo) {
      $.notify('Seleccione un metodo de venta.', {
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
    } else if (!this.venta.banco) {
      $.notify('Seleccione un banco.', {
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
      this.load_btn = true;
      this._ventaService.generar_venta_admin(this.venta, this.token).subscribe(
        response => {
          this.load_btn = false;
          $.notify('Se ingreso la venta.', {
            type: 'success',
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
          this._router.navigate(['/ventas']);
        })
    }
  }

  select_metodo(item: any) {
    $("#dropdownMetodo").text(item);
    this.venta.metodo = item;
  }

  select_banco(item: any) {
    $("#dropdownBanco").text(item);
    this.venta.banco = item;
  }

}
