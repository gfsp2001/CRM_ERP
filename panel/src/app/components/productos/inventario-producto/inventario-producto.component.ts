import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
declare var $: any;
@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public token = localStorage.getItem('token');
  public inventario: any = {
    producto: '',
    variedad: ''
  };

  public productos: Array<any> = [];
  public variedades: Array<any> = [];
  public inventario_producto: Array<any> = [];
  public inventario_producto_const: Array<any> = [];
  public load_productos = true;
  public load_inventario = true;
  public filtro_producto = '';
  public fecha_inicio = '';
  public fecha_fin = '';

  public ganancia_producto = 0;


  public page = 1;
  public pageSize = 10;
  public url = GLOBAL.url;
  constructor(
    private _productoService: ProductoService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.selectpicker').selectpicker();
    }, 150);
    this.init_productos();
    this.init_inventario();
    this.obtener_configuraciones();
  }

  init_productos() {
    this.load_productos = true;
    this._productoService.listar_productos_titulo_admin(this.token).subscribe(
      response => {
        this.productos = response.data;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 150);
        this.load_productos = false;
      })
  }

  select_producto() {
    this._productoService.obtener_variedades_producto_admin(this.inventario.producto, this.token).subscribe(
      response => {
        this.variedades = response.data;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 150)
      })
  }

  save() {
    if (!this.inventario.producto) {
      $.notify('Seleccione el producto.', {
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
    } else if (!this.inventario.variedad) {
      $.notify('Seleccione la variedad.', {
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
    } else if (!this.inventario.costo_unidad) {
      $.notify('Ingrese un costo.', {
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
    } else if (this.inventario.costo_unidad <= 0) {
      $.notify('Ingrese un costo valido.', {
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
    } else if (!this.inventario.cantidad) {
      $.notify('Ingrese una cantidad.', {
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
    } else if (this.inventario.cantidad <= 0) {
      $.notify('Ingrese una cantidad valida.', {
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
      this.inventario.ganancia_producto = this.ganancia_producto;
      this._productoService.registrar_inventario_admin(this.inventario, this.token).subscribe(
        response => {
          $.notify('Se a registro el producto en el inventario.', {
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
          $('#modalInventario').modal('hide');
          this.init_inventario();

        })

    }

  }

  init_inventario() {
    this.load_inventario = true;
    this._productoService.listar_inventario_admin(this.token).subscribe(
      response => {
        this.inventario_producto = response.data;
        this.inventario_producto_const = this.inventario_producto;
        this.load_inventario = false;
      })
  }

  filtrar_data() {
    if (!this.fecha_inicio && !this.fecha_fin && this.filtro_producto != '') {

      let term = new RegExp(this.filtro_producto, 'i');
      this.inventario_producto = [];
      for (var item of this.inventario_producto_const) {
        if (term.test(item.producto.titulo)) {
          this.inventario_producto.push(item);
        }
      }

    } else if (!this.fecha_inicio && !this.fecha_fin && this.filtro_producto == '') {
      this.init_inventario();
    } else if (!this.fecha_inicio) {
      $.notify('Ingrese la fecha de inicio.', {
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
    } else if (!this.fecha_fin) {
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
    } else {
      let tt_inicio = Date.parse(this.fecha_inicio + 'T00:00:00') / 1000;
      let tt_fin = Date.parse(this.fecha_fin + 'T23:59:59') / 1000;

      let term = new RegExp(this.filtro_producto, 'i');

      this.inventario_producto = [];
      for (var item of this.inventario_producto_const) {
        let tt_fecha = Date.parse(item.createdAt) / 1000;
        if (tt_fecha >= tt_inicio && tt_fecha <= tt_fin) {
          if (term.test(item.producto.titulo)) {
            this.inventario_producto.push(item);
          }
        }
      }

    }

  }

  obtener_configuraciones() {
    this._productoService.obtener_configuraciones().subscribe(
      response => {
        this.ganancia_producto = response.ganancia_producto;
      })
  }


}
